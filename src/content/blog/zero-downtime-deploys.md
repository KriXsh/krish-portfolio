> **TL;DR:** Zero-downtime deploys need three things: new instances that only receive traffic once they're **ready**, old instances that **drain** in-flight requests before exiting, and database changes that stay **compatible** with both versions during the rollout. Kubernetes gives you the first two with readiness probes and graceful termination; on a single VM, PM2 cluster reloads behind Nginx get you most of the way.

"We deploy at 2 a.m. so nobody notices the downtime" is a process smell. Users are in every time zone, and a deploy that drops requests trains teams to deploy less often, which makes every deploy bigger and riskier. The goal is deploys so boring they can happen in the middle of the working day.

## Why deploys drop requests

A request fails during a deploy for one of a few reasons:

1. **Traffic arrives before the new version is ready**, while it's still loading config, warming caches or connecting to the database.
2. **The old version is killed mid-request**, so in-flight requests get connection resets.
3. **The load balancer still routes to a terminating instance** for a few seconds after it starts shutting down.
4. **The new code and the old database schema disagree**, or the old code can't handle the new schema.

Every strategy below is about closing those four gaps.

## Rollout strategies

**Rolling update:** replace instances a few at a time. Cheap, no extra capacity, and the default in Kubernetes. Old and new versions serve traffic simultaneously during the rollout, so they must be compatible.

**Blue-green:** run the full new version (green) alongside the old (blue), test it, then switch traffic over in one step. Instant rollback by switching back. It costs double capacity during the switch.

**Canary:** send a small percentage of traffic to the new version, watch error rates and latency, then gradually increase. It catches problems that only real traffic reveals, and it needs good metrics and traffic-splitting support.

## Kubernetes: getting it right

### Readiness vs liveness probes

- **Readiness** answers "should I receive traffic right now?" A failing readiness probe removes the pod from Service endpoints without restarting it.
- **Liveness** answers "am I stuck and in need of a restart?"

Mixing them up is a classic outage: a liveness probe that checks the database will restart every pod when the database blips, turning a partial degradation into a full outage. Keep liveness shallow ("the process can respond"); make readiness meaningful ("I can serve requests").

```yaml
readinessProbe:
  httpGet: { path: /healthz/ready, port: 3000 }
  periodSeconds: 5
  failureThreshold: 3
livenessProbe:
  httpGet: { path: /healthz/live, port: 3000 }
  periodSeconds: 10
  failureThreshold: 6
startupProbe:                  # gives slow starters time before liveness kicks in
  httpGet: { path: /healthz/live, port: 3000 }
  periodSeconds: 5
  failureThreshold: 30
```

### A conservative rolling update

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0   # never drop below desired capacity
    maxSurge: 25%       # add new pods before removing old ones
minReadySeconds: 10     # a new pod must stay ready this long before counting as available
```

### Graceful shutdown

When Kubernetes terminates a pod, it sends `SIGTERM` and, around the same time, starts removing the pod from Service endpoints. Those happen in parallel, so for a moment traffic can still arrive at a pod that's shutting down.

The fix has two parts. First, a short `preStop` delay so endpoint removal propagates before the app stops accepting connections:

```yaml
lifecycle:
  preStop:
    exec: { command: ["sleep", "10"] }
terminationGracePeriodSeconds: 45
```

Second, the application must handle `SIGTERM`: stop accepting new connections, finish in-flight requests, close database pools, then exit.

```ts
const server = app.listen(3000);

process.on("SIGTERM", () => {
  server.close(async () => {          // stops new connections, waits for in-flight ones
    await db.$disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 30_000).unref(); // hard stop before the grace period ends
});
```

Also add a **PodDisruptionBudget** so node drains and cluster upgrades never take too many replicas down at once.

## A single VM: PM2 + Nginx

Not everything runs on Kubernetes, and one well-configured VM can still deploy without downtime.

**Run the app in PM2 cluster mode** so there are multiple processes:

```js
// ecosystem.config.js
module.exports = {
  apps: [{
    name: "web",
    script: "dist/server.js",
    instances: "max",          // one process per CPU core
    exec_mode: "cluster",
    wait_ready: true,          // wait for process.send("ready") before routing traffic
    listen_timeout: 10000,
    kill_timeout: 15000,       // time allowed for graceful shutdown
  }],
};
```

In the app, signal readiness only once initialisation is done:

```ts
app.listen(3000, () => process.send?.("ready"));
```

Then deploy with a **reload**, not a restart:

```bash
git pull && npm ci && npm run build
pm2 reload ecosystem.config.js --update-env   # replaces workers one by one
```

`pm2 reload` starts a new worker, waits for it to be ready, then gracefully stops an old one, one at a time. `pm2 restart` stops everything at once.

**Nginx in front** handles TLS and retries, and can serve a friendly maintenance page if every upstream fails:

```nginx
upstream app { server 127.0.0.1:3000; keepalive 32; }

server {
  listen 443 ssl http2;
  server_name example.com;

  location / {
    proxy_pass http://app;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_next_upstream error timeout http_502 http_503;
    proxy_next_upstream_tries 2;
  }
}
```

For bigger changes on a single VM, you can do blue-green by running two copies on different ports and switching the Nginx upstream, followed by `nginx -s reload`, which is itself graceful.

## Database changes: expand, then contract

Code rolls out gradually; schema changes are instant. During a rollout, old and new code run at the same time, so the schema must work for both. Use **expand/contract** (also called parallel change):

1. **Expand:** add the new column or table, nullable or with a default. Old code ignores it.
2. **Deploy code that writes both** old and new shapes and reads the new shape with a fallback.
3. **Backfill** existing rows.
4. **Deploy code that uses only the new shape.**
5. **Contract:** drop the old column in a later release.

Never rename or drop a column in the same deploy as the code change that stops using it.

## Make rollback cheap

- Keep the previous build artefact or image ready; rolling back should be one command.
- Use feature flags to separate *deploying* code from *releasing* features.
- Automate rollback on bad signals: error rate, latency or failing health checks after a deploy.

## Checklist

- [ ] Readiness probe reflects the ability to serve; liveness stays shallow
- [ ] `maxUnavailable: 0` rolling updates, or blue-green/canary for risky changes
- [ ] `preStop` delay plus `SIGTERM` handling that drains in-flight requests
- [ ] PodDisruptionBudget for replicated services
- [ ] PM2 cluster mode with `wait_ready` and `pm2 reload` on VMs
- [ ] Expand/contract for every schema change
- [ ] One-command rollback and post-deploy health gates

When deploys stop being events, teams ship smaller changes more often, and that's the real reliability win.
