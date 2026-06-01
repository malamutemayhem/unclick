# Connector standard

The single target every UnClick connector is built and hardened to. The
connector depth ladder (`docs/connector-depth-ladder.md`) grades every connector
against this document, worst first. If a connector meets a rung here, the ladder
moves it up; the markers below are exactly what the grader looks for.

## Principle: copy the idea, ship it better, in our style

Mature public MCP servers already exist for many of these APIs. Read them for
what they teach (auth refresh quirks, pagination, rate-limit headers, the edge
cases that bite), then write our own version in one house style. Do not paste
their code:

- **License.** GPL and AGPL are viral, and code with no license is
  all-rights-reserved by default. Either can poison the commercial / open-core
  plan. Learning from how a server behaves carries no such risk.
- **Consistency is the product.** 180 connectors that behave identically beat
  180 copied from 180 different authors. The aggregation is the moat, and it
  only holds if every connector shares the same conventions.
- **We own what we write.** Our own code we can test, harden, stamp, and
  maintain when the upstream API changes.

So the rule is: steal the idea, ship it better, keep it in our style.

## Baseline conventions (every connector, no exceptions)

- **Credentials from a documented environment variable** (for example
  `PTV_API_KEY`). Never hardcode a key in source. A real key once shipped inside
  a public tarball because it was a hardcoded fallback; that must not recur.
- **Informative errors, two clear lanes.** Throw an informative `Error` for
  transport and upstream failures (timeout, network, non-2xx with the response
  body) - the dispatcher catches and classifies these via the bug pipeline - and
  `return { error: "<plain message>" }` for input validation. Never throw a bare
  error or emit `HTTP ${status}` with no body. Read the upstream error body and
  surface the useful part, plus the fix when known (for example
  "set SPOTIFY_CLIENT_ID"). PTV (`ptv-tool.ts`) is the reference.
- **Every network call has a timeout** (`AbortController`) and **handles rate
  limits** (`429`) with a clear message or a bounded retry / backoff.
- **Every connector has a colocated test.**

These four are the L2 bar. Most connectors fail them today, which is why L1 is
crowded.

## The five rungs

Each rung lists the requirement, the source marker the ladder detects, and the
reference implementation to copy the pattern from.

### L1 Wrapper
A callable endpoint, nothing more. The starting point for all 180.

### L2 Reliable (the hardening bar)
Requirement: timeout + rate-limit/retry handling + informative error handling +
no bare status errors + a test.

| Need | Marker the ladder looks for |
|------|------------------------------|
| Timeout | `AbortController` / `AbortSignal` / `signal:` / `setTimeout` |
| Rate limits | `429` or `rate limit`, or `retry` / `backoff` |
| Error handling | throws an `Error` and/or returns `{ error: ... }` (the two-lane pattern; both is fine) |
| No bare errors | zero occurrences of `` `HTTP ${...}` `` |
| Test | a colocated `*-tool.test.ts` (or in `__tests__`) |

### L3 Memory-aware
Requirement: fill missing args from UnClick memory defaults so the agent can say
"next train" without repeating its home stop.

- Marker: `__unclick_memory_defaults` and `defaults_used`.
- Reference: `packages/mcp-server/src/ptv-tool.ts` (`ptv_departures` reads
  `args.__unclick_memory_defaults` and falls back to env defaults, recording
  which defaults were used).

### L4 Proactive
Requirement: emit a signal when something the user cares about changes (a
disruption, a price spike, a status change), instead of only answering on demand.

- Marker: `emitSignal(` / `wakeSignal` / `scheduledCheck` / `proactiveCheck`.
- Reference: the signal surface used by the bug pipeline (`emitSignal`), pointed
  at a user-facing change rather than a tool failure.

### L5 Agentic
Requirement: stamp every response with where it came from and how fresh it is,
and hand the agent its next step.

- Marker: a `source:` plus `fetched_at:` (or `retrieved_at` / `as_of`) stamp, and
  a `next_steps:` hint.
- Reference: `addPtvMeta` in `ptv-tool.ts` (adds `source`, `fetched_at`,
  `defaults_used`, and `next_steps`).

Depth and hardening are separate axes. A connector can reach L5 in capability and
still fail the L2 bar; the ladder flags that as `not-hardened` (PTV does today).
Aim to be both deep and hardened.

### When L2 is the ceiling (capped by design)

L5 stamps a **data read**: a source, a freshness timestamp, and a next-step
handoff the agent consumes. That contract does not apply to every connector, so
some legitimately top out at L2. These are listed in `L2_CAPPED_BY_DESIGN` in
`scripts/connector-depth-ladder.mjs` and render under "Capped at L2 by design"
in the ladder, with their gap cell reading `L2 by design (...)` rather than
`no-source-stamp`. They are excluded from the "L5-reachable" denominator so the
percentage measures real work, not impossible work.

| Archetype | Why L2 is the ceiling | Examples |
|-----------|-----------------------|----------|
| **write/send** | The result is a delivery receipt, not retrieved data. There is no freshness to stamp and no downstream tool to hand off to. | `resend`, `sendgrid`, `postmark`, `telegram`, `whatsapp`, `line`, `pushover` |
| **generation** | Returns model-generated content. Provenance is the model + params already in the response, not a fetched source. | `perplexity` |
| **action-multiplexer** | One tool routes many read *and* write actions through a single `switch`. There is no one result surface to stamp; per-branch stamping is possible but deferred as low-value against the cost of unwrapping the dispatcher. | `stripe`, `shopify`, `xero`, `notion`, `slack`, `github` |

Two consequences worth stating plainly:

- A capped row is **done**, not a backlog item. Do not "fix" its
  `no-source-stamp` gap by stamping a send receipt or a switch branch.
- A row leaves the cap only when its **shape** changes. If an
  action-multiplexer is split into discrete read tools (the way `asana` and
  `monday` expose `list_*`/`get_*` functions), those read tools can and should
  climb to L5, and the base should be removed from `L2_CAPPED_BY_DESIGN`.

## What "do better" means

The differentiators that make an UnClick connector beat a typical public wrapper,
and that no single-vendor server can match:

- **Consistent** across all 180 (one auth convention, one error shape).
- **Memory-aware** (remembers your defaults).
- **Source and freshness stamped** ("live from PTV at 18:42").
- **Guided** (tells the agent the next useful tool).
- **Resilient** (timeout, rate-limit handling, clean errors).
- **Self-tested** (a test proves the schema and a real call work).
- **Bundled with memory and 180 siblings in one install.**

## How to harden a connector (the loop)

1. `cd packages/mcp-server && node scripts/connector-depth-ladder.mjs --stdout`
   to see the worst-first list and each connector's gaps.
2. Pick one, read its gaps row.
3. Implement the next rung using the markers above, with PTV as the reference.
4. Add or extend its colocated test.
5. Re-run the ladder; the connector should move up, and `--check` keeps the
   scorecard honest in CI.

Perfect one pattern, then run it across the 180 we already own.
