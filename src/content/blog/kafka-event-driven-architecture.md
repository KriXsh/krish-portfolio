> **TL;DR:** Kafka gives you ordering only *within a partition*, delivery *at least once* by default, and parallelism capped by partition count. Design around those three facts: pick partition keys deliberately, make every consumer idempotent, send poison messages to a dead-letter topic instead of blocking, and treat event schemas as a public API.

Event-driven architecture sounds simple: services publish facts ("order placed", "payment captured") and other services react. Kafka makes the plumbing reliable and fast. But the guarantees Kafka *actually* provides are narrower than many teams assume, and the gap between assumption and reality is where production incidents live.

## The mental model: a log, not a queue

A Kafka **topic** is split into **partitions**. Each partition is an append-only log. Producers append records; consumers read from an **offset** (a position in the log) and move forward.

```text
topic: orders
  partition 0: [o1][o4][o7][o9] ...
  partition 1: [o2][o5][o8] ...
  partition 2: [o3][o6] ...
```

Two consequences follow immediately:

1. **Messages aren't deleted when consumed.** They stay until retention expires. Many consumers can read the same topic independently, and you can **replay** history by resetting offsets.
2. **Order exists only inside a partition.** Across partitions, there is no global order.

## Partition keys decide your ordering

When you produce a record with a **key**, Kafka hashes the key to choose the partition. Same key, same partition, strict order.

```js
await producer.send({
  topic: "orders",
  messages: [{ key: order.customerId, value: JSON.stringify(event) }],
});
```

Choose the key by asking: *which events must be processed in order relative to each other?*

- Events for one order must stay ordered → key by `orderId`.
- Events for one account's balance must stay ordered → key by `accountId`.

Watch for **hot keys**. If one key (a huge tenant, a default value like `"unknown"`) carries most traffic, its partition becomes a bottleneck no matter how many partitions exist. And never produce with a `null` key if you need ordering: records get spread across partitions.

## Consumer groups: how you scale reads

Consumers with the same `group.id` form a **consumer group**. Kafka assigns each partition to exactly one consumer in the group.

- 6 partitions, 3 consumers → each consumer handles 2 partitions.
- 6 partitions, 8 consumers → 2 consumers sit idle.

**Partition count is your parallelism ceiling.** Plan it for future throughput. Adding partitions later is possible, but it changes which partition a key hashes to, which breaks per-key ordering during the transition.

When consumers join, leave or crash, the group **rebalances** and partitions move. Keep processing per poll short (or tune `max.poll.interval.ms`), otherwise a slow consumer gets kicked out, triggering rebalance storms.

## Delivery semantics: plan for duplicates

The common setup (commit offsets *after* processing) gives **at-least-once** delivery. If a consumer processes a message and crashes before committing, the next owner of that partition processes it again.

So the rule is simple: **every consumer must be idempotent.** Processing the same event twice must have the same effect as processing it once.

Practical ways to get there:

- **Natural idempotency:** "set status = SHIPPED" is safe to repeat; "increment counter" is not.
- **Dedup table:** store processed event IDs, and skip ones you've seen.
- **Upserts keyed by event or entity ID** instead of blind inserts.

```sql
-- Inside the same transaction as the business write
INSERT INTO processed_events (event_id) VALUES ($1)
ON CONFLICT (event_id) DO NOTHING
RETURNING event_id;   -- no row returned → duplicate, skip the side effect
```

Kafka also offers **idempotent producers** (no duplicate writes on producer retries) and **transactions** for read-process-write flows *within Kafka*. They're valuable, but they don't make your database writes or HTTP calls exactly-once. Idempotent consumers are still required.

## Getting events out reliably: the outbox pattern

A classic bug: a service writes to its database, then publishes to Kafka. If the publish fails after the commit, the event is lost; if it publishes first and the DB write fails, you've announced something that didn't happen.

The **transactional outbox** fixes this. Write the event to an `outbox` table *in the same transaction* as the business change. A separate relay (a poller, or change-data-capture with a tool like Debezium) publishes outbox rows to Kafka and marks them sent.

```text
BEGIN
  UPDATE orders SET status = 'PAID' WHERE id = 42;
  INSERT INTO outbox (id, topic, key, payload) VALUES (...);
COMMIT
        │
        ▼  relay / CDC
   Kafka topic "orders"
```

Now the database and the event stream can't disagree.

## Poison messages and dead-letter topics

Sooner or later, a message arrives that your consumer can't handle: malformed JSON, a schema you don't recognise, a reference to a record that doesn't exist. Because consumption is ordered per partition, **one poison message blocks everything behind it** if you keep retrying.

A robust pattern:

1. **Retry transient errors** (timeouts, 503s) a few times with backoff.
2. For persistent failures, publish the message plus error details to a **dead-letter topic** (`orders.DLQ`), commit the offset and move on.
3. Alert on DLQ volume, and build a small tool to inspect and **replay** DLQ messages after fixing the bug.

For retries that need long delays, use separate retry topics (`orders.retry.1m`, `orders.retry.10m`) rather than sleeping inside the consumer, which would stall the partition.

## Schemas are a contract

Events outlive the code that produced them: consumers you've never met will read them, and replay means old events get processed by new code. Treat schemas as a public API:

- Use a schema format with evolution rules (Avro, Protobuf or JSON Schema) and a **schema registry** to enforce compatibility.
- Add fields as optional; never repurpose or remove a field consumers depend on.
- Put an `eventId`, `eventType`, `occurredAt` and `version` in every event envelope.

```json
{
  "eventId": "7d1f…",
  "eventType": "order.paid",
  "version": 2,
  "occurredAt": "2026-09-30T10:15:00Z",
  "data": { "orderId": "42", "amount": 1999, "currency": "INR" }
}
```

## Observability: watch the lag

The single most useful Kafka metric is **consumer lag**: how far a consumer group is behind the end of the log, per partition. Rising lag means consumers can't keep up (scale out, up to the partition count), a partition is stuck on a poison message, or a downstream dependency is slow. Alert on lag *growth*, not just absolute values.

Also trace events end to end: propagate a correlation ID in message headers so one user action can be followed through every service that reacted to it.

## When not to use Kafka

Kafka shines for high-throughput streams, fan-out to many consumers, and replayable history. It's overkill for a simple job queue with a handful of workers, where a managed queue or Redis-based queue is easier to run. And if a caller needs an immediate answer, a synchronous API call is clearer than request/response over topics.

## Checklist

- [ ] Partition key chosen for the ordering you actually need; no hot keys
- [ ] Partition count sized for future parallelism
- [ ] Every consumer idempotent (dedup table or upserts)
- [ ] Outbox or CDC for publishing alongside DB writes
- [ ] Retry with backoff for transient errors, DLQ for the rest, plus a replay tool
- [ ] Versioned schemas with compatibility checks
- [ ] Consumer-lag alerts and correlation IDs in headers

Get these right and Kafka becomes a boring, dependable backbone, which is exactly what infrastructure should be.
