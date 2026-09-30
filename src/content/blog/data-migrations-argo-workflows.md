> **TL;DR:** Treat a large data migration as a pipeline, not a script. Split the data into chunks, make every chunk idempotent and checkpointed, orchestrate the chunks as an Argo Workflows DAG with bounded parallelism and retries, and finish with automated verification. That turns "the migration failed at 73%" from a crisis into a retry.

Every system eventually has to move a lot of data: a new schema, a new database, merging two products, backfilling a derived column. The naive version is a script run from a laptop or a single long-running job. It works on the test dataset and then fails in production four hours in, leaving you unsure what was written.

Running migrations as **Argo Workflows** on Kubernetes gives you the missing pieces: a DAG of steps, per-step retries, parallelism limits, logs and artifacts per step, and a UI showing exactly which parts succeeded.

## Principles before tools

Whatever orchestrator you use, the migration itself must follow a few rules.

### 1. Chunk everything

Never migrate "all rows" in one unit of work. Split by a stable key range or time window:

```text
customers  id 1–100k, 100k–200k, …
events     2024-01, 2024-02, …
```

Chunks give you parallelism, retries of small units, and a natural progress metric.

### 2. Make each chunk idempotent

Running a chunk twice must produce the same result as running it once. Use upserts keyed by a stable ID instead of inserts, or write to a staging location and swap atomically.

```sql
INSERT INTO target_customers (id, name, email, migrated_at)
SELECT id, name, lower(email), now()
FROM   source_customers
WHERE  id >= $1 AND id < $2
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name, email = EXCLUDED.email, migrated_at = EXCLUDED.migrated_at;
```

Idempotency is what makes retries safe. Without it, retries are how you create duplicates.

### 3. Checkpoint progress

Record completed chunks in a small control table (`migration_id, chunk, status, rows, checksum`). On restart, skip chunks already marked done. You can resume from the point of failure instead of starting over.

### 4. Separate extract, transform and load

Keep transformations as pure functions of the input chunk. That makes them testable offline and lets you re-run the load step without re-extracting.

### 5. Verify automatically

A migration isn't done when the writes finish; it's done when verification passes: row counts per chunk, checksums of key columns, and spot checks of sampled records compared field by field.

## Why Argo Workflows fits

Argo Workflows is a Kubernetes-native workflow engine: each step runs as a pod, and a workflow is a YAML-defined DAG. For migrations that means:

- **Isolation:** each chunk runs in its own container with its own resource limits.
- **Retries** with backoff per step, not per workflow.
- **Parallelism controls** so you don't overwhelm the source database.
- **Visibility:** the UI shows every chunk's status, logs and duration.
- **Re-runs:** you can retry failed steps without re-running succeeded ones.

## A migration as a DAG

The overall shape:

```text
plan-chunks ──▶ migrate-chunk (fan-out, N parallel) ──▶ verify ──▶ report
```

A trimmed workflow:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: customers-migration-
spec:
  entrypoint: main
  parallelism: 8                    # cap concurrent pods across the workflow
  templates:
    - name: main
      dag:
        tasks:
          - name: plan
            template: plan-chunks
          - name: migrate
            dependencies: [plan]
            template: migrate-chunk
            arguments:
              parameters:
                - name: range
                  value: "{{item}}"
            withParam: "{{tasks.plan.outputs.result}}"   # JSON list of ranges
          - name: verify
            dependencies: [migrate]
            template: verify

    - name: plan-chunks
      script:
        image: ghcr.io/acme/migrator:1.4.0
        command: [python]
        source: |
          import json
          step = 100_000
          print(json.dumps([f"{i}:{i+step}" for i in range(0, 5_000_000, step)]))

    - name: migrate-chunk
      inputs:
        parameters:
          - name: range
      retryStrategy:
        limit: 5
        retryPolicy: OnError
        backoff: { duration: "30s", factor: 2, maxDuration: "15m" }
      container:
        image: ghcr.io/acme/migrator:1.4.0
        args: ["migrate", "--range", "{{inputs.parameters.range}}"]
        resources:
          requests: { cpu: "500m", memory: "512Mi" }
          limits:   { cpu: "1",    memory: "1Gi" }

    - name: verify
      container:
        image: ghcr.io/acme/migrator:1.4.0
        args: ["verify", "--all"]
```

`withParam` fans the migrate step out over every chunk the planner emitted. `parallelism` protects the source database, and `retryStrategy` retries a failing chunk with exponential backoff, while successful chunks stay done.

## Protecting the source system

Production databases are usually still serving traffic during a migration. Be a polite reader:

- **Throttle** with workflow-level `parallelism`, and rate-limit inside the migrator.
- **Read from a replica** when possible.
- **Use keyset pagination** (`WHERE id > last_id ORDER BY id LIMIT n`) rather than `OFFSET`, which gets slower the deeper you go.
- **Schedule heavy phases** for low-traffic windows with a CronWorkflow.
- **Watch source metrics** (CPU, replication lag, lock waits), and be ready to lower parallelism mid-run.

## Backfills and live data

Most migrations must handle data that keeps changing while you copy it. A common strategy:

1. **Dual write:** new writes go to both old and new stores (or events feed the new store).
2. **Backfill history** in chunks with the workflow above.
3. **Catch up** the window between backfill start and dual-write start, which is why idempotent upserts matter.
4. **Verify**, then **switch reads** to the new store behind a feature flag.
5. **Stop dual writes** and retire the old path once you're confident.

For backfills of derived data (a new column computed from existing rows), a chunked workflow plus idempotent updates is usually enough; no dual write required.

## Verification step, concretely

```python
def verify_chunk(lo: int, hi: int) -> None:
    src = source.scalar("SELECT count(*), sum(hashtext(email)) FROM customers WHERE id >= %s AND id < %s", lo, hi)
    dst = target.scalar("SELECT count(*), sum(hashtext(email)) FROM target_customers WHERE id >= %s AND id < %s", lo, hi)
    if src != dst:
        raise MismatchError(f"chunk {lo}:{hi} source={src} target={dst}")
```

Run it for every chunk, plus random record-level comparisons. Fail the workflow loudly on mismatch, because a silent "mostly right" migration is worse than a failed one.

## Operational checklist

- [ ] Dry-run mode that reads and transforms but doesn't write
- [ ] Rehearsal on a production-sized copy, with timings recorded
- [ ] Chunk control table with status, row count and checksum
- [ ] Idempotent writes, safe to retry any chunk
- [ ] Parallelism and rate limits tuned against source metrics
- [ ] Verification gate before switching reads
- [ ] Rollback plan: the old path stays readable until sign-off
- [ ] A short runbook: how to pause, resume, retry a chunk, and roll back

## Closing thought

The orchestration tool matters less than the discipline: small idempotent units, checkpoints, verification and visibility. Argo Workflows makes that discipline cheap on Kubernetes, since retries, fan-out, limits and a UI come built in, so the migration you run at scale looks like the one you tested.
