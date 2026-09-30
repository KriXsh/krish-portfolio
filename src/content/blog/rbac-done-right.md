> **TL;DR:** Check **permissions** in code, not role names. Keep access tokens short-lived and rotate refresh tokens with reuse detection. Scope every query by tenant or owner, not just by role. And map application roles to cloud IAM with least privilege, so a compromised service can do as little as possible.

Almost every application starts with a boolean: `isAdmin`. Then a "manager" appears, then a "read-only auditor", then "admin, but only for their own team". Without a design, authorization logic spreads across the codebase as `if (user.role === "admin" || user.role === "manager")` checks, and every new role means hunting them all down.

Role-based access control (RBAC) done well keeps that complexity in one place.

## Roles are bundles; permissions are what you check

The core idea: **users have roles, roles grant permissions, and code checks permissions.**

```text
user ──has──▶ role ──grants──▶ permission
alice          admin            invoices:read, invoices:write, users:manage
bob            viewer           invoices:read
```

```ts
const ROLE_PERMISSIONS = {
  super_admin: ["*"],
  admin: ["invoices:read", "invoices:write", "users:read", "users:manage"],
  member: ["invoices:read", "invoices:write"],
  viewer: ["invoices:read"],
} as const satisfies Record<string, readonly string[]>;

type Role = keyof typeof ROLE_PERMISSIONS;

export function can(role: Role, permission: string) {
  const granted: readonly string[] = ROLE_PERMISSIONS[role];
  return granted.includes("*") || granted.includes(permission);
}
```

Now `if (can(user.role, "invoices:write"))` reads as intent. Adding a role means adding one entry, not editing fifty call sites. Name permissions `resource:action`; it scales and reads well in logs.

## Enforce in one layer, on the server

Authorization belongs on the server, as close to the data as practical. Hiding a button in the UI is UX, not security.

```ts
export function requirePermission(permission: string) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "unauthenticated" });
    if (!can(req.user.role, permission)) return res.status(403).json({ error: "forbidden" });
    next();
  };
}

router.post("/invoices", requirePermission("invoices:write"), createInvoice);
```

Return **401** when the caller isn't authenticated, and **403** when they are but lack permission. Log denied attempts, because they're a useful security signal.

## RBAC isn't enough: scope every query

The most common access-control bug isn't a missing role check. It's **insecure direct object reference**: a user with a legitimate `invoices:read` permission requests `/invoices/123`, which belongs to *another* customer.

Roles answer "can this kind of user read invoices?" You also need "can this user read *this* invoice?" Scope queries by tenant or ownership, every time:

```ts
// ❌ role check only
const invoice = await db.invoice.findUnique({ where: { id } });

// ✅ role check + tenant scope
const invoice = await db.invoice.findFirst({ where: { id, tenantId: req.user.tenantId } });
if (!invoice) return res.status(404).end(); // don't reveal that it exists
```

For multi-tenant systems, consider enforcing tenancy at the database level too (for example Postgres row-level security), so a forgotten `where` clause can't leak data.

When rules depend on attributes ("managers can approve expenses under a limit, in their own department"), you're moving into attribute-based access control. Keep simple RBAC for coarse rules and add a small policy function, or a policy engine, for the attribute-based ones.

## JWTs: short-lived access, rotating refresh

A common, solid setup:

- **Access token:** a JWT, short-lived (minutes), sent with each request. It contains the user ID, tenant and role or permissions.
- **Refresh token:** long-lived, opaque (random, not a JWT), stored server-side as a hash, and sent only to the refresh endpoint.

```text
login ──▶ access JWT (15 min) + refresh token (httpOnly cookie, 7–30 days)
request ──▶ Authorization: Bearer <access JWT>
401 expired ──▶ POST /auth/refresh ──▶ new access JWT + NEW refresh token (old one revoked)
```

**Rotate refresh tokens on every use**, and implement **reuse detection**: if a refresh token that was already rotated is presented again, someone has a stolen copy, so revoke the whole token family and force re-login.

```ts
async function refresh(presented: string) {
  const record = await tokens.findByHash(sha256(presented));
  if (!record) throw new Unauthorized();
  if (record.revokedAt) {
    await tokens.revokeFamily(record.familyId);   // reuse → assume theft
    throw new Unauthorized();
  }
  await tokens.revoke(record.id);
  const next = await tokens.issue({ userId: record.userId, familyId: record.familyId });
  return { accessToken: signAccess(record.userId), refreshToken: next.raw };
}
```

JWT hygiene that prevents real incidents:

- Pin the **algorithm** when verifying; never accept `alg: none`.
- Validate `exp`, `iss` and `aud`.
- Don't put secrets or personal data in the payload, since it's only base64-encoded, not encrypted.
- Store refresh tokens in **httpOnly, Secure, SameSite** cookies, not `localStorage`, where any XSS can read them.
- Remember that a role change doesn't affect already-issued access tokens until they expire. Short expiry keeps that window small; for instant revocation, check a token version or deny-list on sensitive operations.

## Least privilege in the cloud

Application RBAC protects your API. **Cloud IAM** protects everything around it: storage buckets, queues, databases and secrets. The same principle applies: grant each workload only what it needs.

- **One role per service**, not one shared "app" user with broad access.
- **Scope to specific resources and actions**: read from one bucket prefix, not `s3:*` on `*`.
- **Prefer temporary credentials**, such as instance or workload roles, over long-lived access keys in environment variables.
- **Use pre-signed URLs** for file access, so clients get time-limited access to one object instead of credentials.

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::app-uploads/tenants/*"
}
```

Map application roles to infrastructure access deliberately. An "admin" in your app shouldn't automatically mean admin rights on the cloud account; operators get those through separate, audited roles.

## Test authorization like a feature

Authorization bugs rarely show up in happy-path tests. Build a matrix test that tries every role against every protected endpoint, including cross-tenant access:

```ts
for (const role of ROLES) {
  for (const route of PROTECTED_ROUTES) {
    test(`${role} → ${route.method} ${route.path}`, async () => {
      const res = await call(route, asUser(role, { tenant: "A" }), { resourceTenant: "B" });
      expect(res.status).toBe(route.allowed(role) ? 404 : 403); // never 200 across tenants
    });
  }
}
```

## Checklist

- [ ] Code checks permissions (`resource:action`), not role names
- [ ] Authorization enforced server-side in one middleware or policy layer
- [ ] Every query scoped by tenant or owner, not just by role
- [ ] Short-lived access JWTs, pinned algorithm, validated claims
- [ ] Opaque, hashed, rotating refresh tokens with reuse detection
- [ ] Refresh tokens in httpOnly cookies
- [ ] Per-service cloud roles with resource-scoped policies; temporary credentials
- [ ] A role × endpoint × tenant test matrix in CI

RBAC isn't glamorous, but it's where a small design decision early saves you from a very bad day later.
