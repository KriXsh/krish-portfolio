> **TL;DR:** Start with cache-aside and sensible TTLs. Add jitter so keys don't expire together, protect hot keys from stampedes with a lock or stale-while-revalidate, and invalidate by deleting keys on writes (or by versioning keys). Measure hit rate and latency, and remember the cache is an optimisation: the system must still work, more slowly, when Redis is unavailable.

Redis is the first tool many teams reach for when an API gets slow, and for good reason: an in-memory lookup is far faster than a database query or an external API call. But caching introduces a new problem, keeping two copies of data consistent, plus a few failure modes that only appear under load.

## Pattern 1: cache-aside (lazy loading)

The application checks the cache first; on a miss it loads from the source of truth, then populates the cache.

```ts
async function getProduct(id: string): Promise<Product> {
  const key = `product:v1:${id}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const product = await db.product.findUniqueOrThrow({ where: { id } });
  await redis.set(key, JSON.stringify(product), "EX", ttlWithJitter(300));
  return product;
}
```

Why it's the default:

- Only data that's actually requested gets cached.
- If Redis is down, you can fall back to the database.
- It's easy to reason about.

The cost: the first request after a miss (or expiry) pays the full latency, and data can be stale for up to the TTL.

## Pattern 2: write-through and write-behind

- **Write-through:** every write updates the database *and* the cache. Reads stay warm, but writes get slower, and you may cache data nobody reads.
- **Write-behind:** writes go to the cache and are flushed to the database asynchronously. Very fast writes, but you risk losing data if the cache fails before flushing. Rarely the right choice for business-critical data.

For most web APIs, **cache-aside for reads plus delete-on-write** is the sweet spot.

## Choosing TTLs

A TTL is a statement about how stale you can tolerate being:

- Product catalogue: minutes.
- User profile: seconds to minutes, invalidated on update.
- Exchange rates or prices: seconds, or tied to the upstream refresh interval.
- Anything security-relevant (permissions, sessions): short, and invalidated explicitly.

**Add jitter.** If you cache 10,000 keys at startup with the same TTL, they all expire in the same second, and your database takes the full load at once.

```ts
const ttlWithJitter = (base: number) => base + Math.floor(Math.random() * base * 0.1);
```

## The cache stampede

When a **hot key** expires, every in-flight request misses at the same moment, and they all hit the database to rebuild the same value. At high traffic this can overload the database right when the cache stops helping. This is also called the thundering herd or dog-piling.

### Fix 1: a rebuild lock

Only one caller rebuilds; others wait briefly and re-read, or serve slightly stale data.

```ts
async function getWithLock<T>(key: string, ttl: number, load: () => Promise<T>): Promise<T> {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);

  const lockKey = `lock:${key}`;
  const gotLock = await redis.set(lockKey, "1", "PX", 5000, "NX");  // atomic "set if not exists"
  if (gotLock) {
    try {
      const value = await load();
      await redis.set(key, JSON.stringify(value), "EX", ttlWithJitter(ttl));
      return value;
    } finally {
      await redis.del(lockKey);
    }
  }

  // Someone else is rebuilding: wait briefly, then retry the cache.
  await new Promise((r) => setTimeout(r, 50));
  return getWithLock(key, ttl, load);
}
```

(In production, bound the retries, and only delete a lock you still own by storing a unique token and deleting with a check.)

### Fix 2: stale-while-revalidate

Store a *soft* expiry inside the value and a longer *hard* TTL on the key. When the soft expiry passes, serve the stale value immediately and refresh it in the background. Users never wait for the rebuild.

```ts
type Entry<T> = { value: T; freshUntil: number };

async function getSWR<T>(key: string, freshMs: number, load: () => Promise<T>) {
  const raw = await redis.get(key);
  if (raw) {
    const entry: Entry<T> = JSON.parse(raw);
    if (Date.now() > entry.freshUntil) void refreshInBackground(key, freshMs, load); // guarded by a lock
    return entry.value;
  }
  return refresh(key, freshMs, load);
}
```

### Fix 3: probabilistic early expiration

Each request has a small, increasing chance of refreshing the value *before* it expires, so refreshes spread out instead of piling up at the deadline. It's elegant for very hot keys.

## Invalidation: the hard part

The two strategies that hold up:

**Delete on write.** After the database write commits, delete the cache key. The next read repopulates it.

```ts
await db.product.update({ where: { id }, data });
await redis.del(`product:v1:${id}`);
```

Delete rather than update: updating the cache from the write path invites race conditions where an older value overwrites a newer one.

**Versioned keys.** Include a version in the key (`product:v1:…`, or a per-entity version number). Changing the version makes old entries unreachable, and they simply expire. This is great for deploys that change the cached shape: bump `v1` to `v2` and you never read incompatible data.

For lists and aggregates ("top products", "user's orders"), invalidation gets complicated fast. Prefer short TTLs for those, or cache the IDs and resolve items individually from their own keys.

## Don't cache these carelessly

- **Per-user data under shared keys.** Always include the user or tenant ID in the key; a missing ID leaks one user's data to another.
- **Errors and empty results.** Caching "not found" (negative caching) protects the database from repeated misses, but give it a short TTL.
- **Huge values.** Big blobs make Redis slow for everyone. Cache what the endpoint needs, not entire object graphs.

## Operate it like a dependency

- **Set a `maxmemory` limit and eviction policy** (for a pure cache, `allkeys-lru` or `allkeys-lfu`).
- **Use timeouts on Redis calls** and treat a cache error as a miss, not as a failed request.
- **Monitor** hit rate, p95 latency, memory, evictions and the number of keys per prefix.
- **Avoid `KEYS *`** in production; it blocks the server. Use `SCAN` if you must iterate.

```ts
async function safeGet(key: string) {
  try {
    return await withTimeout(redis.get(key), 50); // ms
  } catch {
    metrics.increment("cache.error");
    return null; // behave like a miss
  }
}
```

## Checklist

- [ ] Cache-aside with delete-on-write for entities
- [ ] TTLs chosen per data type, with jitter
- [ ] Stampede protection (lock or stale-while-revalidate) on hot keys
- [ ] Keys include tenant or user ID and a version
- [ ] Negative caching with short TTLs
- [ ] Redis failures degrade to "slower", never "broken"
- [ ] Hit rate, latency and eviction dashboards

A cache is a promise to be fast most of the time, and correct all of the time. Design for the second half first.
