# Model-routing cost lever: prompt caching + architect/editor split

ScopePack for job `8b3623ce` (Worker 19, model routing + governance).

Source: `deliverables/reports/fleet-efficiency-research-synthesis-2026-04-28.md`
TL;DR item 5a, named the **biggest single missed lever** for cost-efficiency.
Pattern: disciplined cacheable prefixes + an architect/editor model split gives
roughly +1.5-3x cost-efficiency (ProjectDiscovery measured 59-70% real spend
reduction). This is a different lever from subscription/provider routing; it
applies even within a single provider.

This doc is the plan. It ships with a tested, reusable config-slice library and
one behaviour-preserving wire (arena). The full prefix/suffix refactor of the
high-traffic surfaces is deliberately staged (see "Rollout") rather than done as
one giant cross-surface change.

## What landed in this slice (proof-gated)

- `api/lib/model-routing/prompt-caching.ts` - pure helpers to shape an Anthropic
  Messages request: `cacheControl`, `cacheableSystem`, `splitStablePrefix`,
  `withCachedTools`, `applyPromptCaching`. They add `cache_control` breakpoints to
  the stable prefix; they never call the API and never mutate inputs.
  Tests: `prompt-caching.test.ts`.
- `api/lib/model-routing/model-split.ts` - the role resolver:
  `resolveModelForRole("architect" | "editor")` (env `ARCHITECT_MODEL` /
  `EDITOR_MODEL`, safe defaults), `roleForCallSite`, `resolveModelForCallSite`.
  Tests: `model-split.test.ts`.
- Wire: `api/arena.ts` bot-solve now sources its default Anthropic model from
  `resolveModelForRole("editor")`. Behaviour-preserving (editor default equals the
  prior hardcoded `claude-haiku-4-5-20251001`); now env-overridable.

The defaults:

| Role | Default model | Shape |
|------|---------------|-------|
| architect | `claude-sonnet-4-6` | high-context, low-frequency: planning / reasoning |
| editor | `claude-haiku-4-5-20251001` | low-context, high-frequency: edit / apply / classify |

## Top LLM call sites and their role

Evidence from the current tree. Classify each by traffic shape, then wire the
model per role and apply caching to the stable prefix.

1. **mcp-server connector + advisory calls**
   - `packages/mcp-server/src/anthropic-tool.ts` (`anthropic_create_message`):
     user-facing passthrough. Add an opt-in `cache_system` so a caller's stable
     system block gets a breakpoint via `applyPromptCaching`. Role: caller-chosen.
   - `packages/mcp-server/src/nudgeonly-tool.ts` (OpenRouter classify, default
     `liquid/lfm-2.5-1.2b-instruct:free`): **editor** (high-frequency, advisory).
2. **Autopilot / writer runner**
   - `scripts/pinballwake-writerlane-free-writer.mjs` (OpenRouter code edits) and
     `scripts/event-wake-router.mjs` (OpenRouter chat completions): **editor**.
     The prompt builder (`buildFullContentsPrompt`) should be split into a stable
     instruction/tool prefix + a variable file/scope suffix so the prefix caches.
   - The free-model chain here already verifies against the live OpenRouter
     catalog (job `089f4ecd`).
3. **XPass run handlers / memory-admin AI chat**
   - `api/arena.ts` bot-solve: **editor** (wired in this slice).
   - `api/memory-admin.ts` AI chat (`decideMemoryAdminAiChatProviderCall`,
     google/openai/anthropic): **architect** when it carries large memory context,
     else editor. Route via `resolveModelForCallSite`.

## Caching discipline (prefix/suffix)

For each repeated call:

1. Put everything stable in the prefix: system instructions, tool definitions,
   fixed context (taxonomy, rules, examples).
2. Put only the per-call variable part in the suffix (the user turn, the file
   under edit, the row being classified).
3. Mark the end of the stable part with one `cache_control` breakpoint
   (`applyPromptCaching` does this for `system`, optionally `tools`). A breakpoint
   caches every block before it, so one marker on the last tool caches all tools.
4. Use the default 5m ephemeral cache; use `ttl: "1h"` only for a prefix reused
   over a longer window (e.g. a cron batch).

## Rollout and reversibility

- Everything is env-gated and default-preserving. Set `ARCHITECT_MODEL` /
  `EDITOR_MODEL` per deploy to tune the split; unset = current behaviour.
- Caching is additive: `applyPromptCaching` on a request with no system/tools is a
  no-op, and `cache_control` is ignored by non-Anthropic providers, so wiring it in
  cannot change outputs.
- Stage the per-site refactors one PR at a time, each with a before/after token
  measurement (cache_creation vs cache_read input tokens in the Anthropic usage
  block) so the saving is proven, not assumed.
