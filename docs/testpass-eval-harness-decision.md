# Eval Harness with CI Gates: Minimum Test Pack Decision

Job: `f73dc833-746c-4822-8ffd-d692e996607e` (Worker 14, TestPass and evals lane)
Status: decision packet / ScopePack. This job's brief is "start with minimum
test pack decision", so this is the decision, not a full harness build.

## The ask

Stand up an eval harness with a CI gate that runs a ~20-test minimum on prompt
commits, originally floated as Langfuse or Braintrust.

## What the repo already has (audited 2026-06-02)

- `@unclick/sloppass` ships a vendored `promptfoo-lite` engine:
  `packages/sloppass/src/vendor/promptfoo-lite/`. README describes it as "a
  deliberately small promptfoo-derived engine" with a deterministic evaluation
  runner, a provider abstraction, a test schema, and a report surface. It is
  already a dependency-light, in-repo eval primitive.
- `@unclick/testpass` plus `.github/workflows/testpass-pr-check.yml` already run
  pack-based checks against the MCP server on pull requests, with a token gate
  and a Vercel-preview wait. That is an existing CI-gated test-pack pattern.
- Root `ci.yml` already runs `npm test` (vitest over `src/**` and `api/**`) as a
  blocking gate on every PR.

## Decision

Do NOT adopt Langfuse or Braintrust for the minimum pack. Reasons, ranked:

1. Both are external SaaS. They need an API key in CI and they send prompts and
   outputs off-platform. The Worker contract requires reversible, secret-free,
   redacted work, and the fleet already prefers in-house Pass engines over new
   third-party surfaces.
2. The repo already owns the primitive (`promptfoo-lite` via sloppass) and an
   existing CI-gated pack runner (`testpass-pr-check.yml`). Adding a SaaS would
   duplicate capability and add a network and billing dependency.
3. Observability tracing (the genuine Langfuse strength) is a separate concern
   from a blocking pre-merge eval gate, and is already tracked by the Agent
   Observability job (`4ce58c4f`). Keep them separate.

Recommendation: build the ~20-test minimum as a `promptfoo-lite` / sloppass eval
pack, run it through a deterministic, mockable provider in `ci.yml` so it gates
without live model calls, and keep a thin adapter seam so a hosted tracer can be
attached later if real telemetry is ever needed. Revisit a SaaS only if hosted
tracing/regression-history across runs becomes a hard requirement.

## Minimum ~20-test pack (first cut)

Scope the first pack to the prompt-bearing surfaces that already exist, so the
gate protects real behavior. Suggested split:

- Memory protocol prompts (6): load-first ordering honored; save_fact triggers
  on a preference statement; save_session triggers at wrap-up; no fabricated
  prior context when memory is empty; Boardroom-only naming in user-facing
  copy; em-dash-free output.
- Boardroom / orchestrator prompts (5): receipt-first log-read-decide-reply
  ordering; ACK carries proof; fake-done rejected; handoff names a fallback
  owner; "nothing changed" suppression respected.
- Connector / tool-routing prompts (5): prefers an UnClick tool over web guess
  for live data; uses `unclick_search` then `unclick_call` for an unknown tool;
  clean 429 handling copy; two-lane error shape; `stampMeta`
  source/freshness/next_steps present.
- Safety prompts (4): refuses secret printing; refuses force-push / hard reset /
  destructive cleanup; respects human-gated lanes; redacts before posting.

Each is a `promptfoo-lite` test row asserting on a deterministic mocked provider
response, so the gate is fast and offline.

## CI gate shape

- Trigger: pull requests that touch prompt-bearing paths. Concretely, paths like
  `packages/mcp-server/src/**`, `.claude/skills/**`, and any
  `**/prompts/**` / `**/*prompt*` file.
- Runner: a new workspace script (for example `npm run eval:min`) that runs the
  pack through the deterministic provider. Wire it as a blocking step alongside
  the existing `npm test` in `ci.yml`, or as a sibling job mirroring
  `testpass-pr-check.yml`.
- Threshold: all ~20 must pass. No live network. No SaaS key.

## Smallest first slice

Land 5 of the 20 (the memory-protocol subset) as a `promptfoo-lite` pack plus a
`npm run eval:min` script and a path-filtered CI step. Prove it gates on a PR,
then grow the pack to 20. That keeps the first PR reviewable and avoids standing
up a harness nobody has exercised yet.

## Not done here (and why)

No harness code was added. The brief asks for the minimum-test-pack decision
first. The decision is: reuse `promptfoo-lite`/sloppass with a deterministic
offline provider and an existing-style CI gate, not a new SaaS. The 5-test first
slice above is the next build chip.
