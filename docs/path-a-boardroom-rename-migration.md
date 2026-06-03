# Boardroom Rename Migration (alarmed-redirect plan)

Status: execution plan. Builds on the existing `docs/fishbowl-compat-map.md`
(which already declares Boardroom canonical) and the existing
`scripts/audit-fishbowl-naming.mjs` (compile-time legacy-usage counter). Adds the
runtime "alarmed redirect" mechanism so the rename can be done safely and
gradually, with proof that each legacy name is actually unused before it is
deleted.

## Why not a big-bang rename

A naive find/replace of "fishbowl" -> "boardroom" is unsafe. The repo's own
audit tool (`scripts/audit-fishbowl-naming.mjs`) reports 1,614 Fishbowl
references vs 249 Boardroom across 1,051 scanned files (run at the time of
writing), and several are load-bearing live contracts that break consumers if
renamed in one pass:

- DB tables: `mc_fishbowl_todos`, `mc_fishbowl_ideas`, `mc_fishbowl_idea_votes`,
  `mc_fishbowl_comments`, `mc_fishbowl_profiles` (+ indexes, RLS policy names).
- Env secrets: `FISHBOWL_WAKE_TOKEN`, `FISHBOWL_AUTOCLOSE_TOKEN`.
- Wire format: `source_kind: "fishbowl"` and similar message kinds.
- Live route: `/api/fishbowl-watcher` (in vercel.json).
- CI: `.github/workflows/auto-close-fishbowl-todo.yml`.
- Deep-linked source filenames under `api/fishbowl-*` and `api/lib/fishbowl-*`.

The compat-map already prescribes the staged order. This doc adds the safety
instrument that makes each stage verifiable.

## The mechanism: redirects that alarm when used

`api/lib/boardroom-compat.ts` (additive, dependency-free, tested) provides:

- `createBoardroomAlias(legacyName, canonicalName, impl)` - wraps a function so
  callers using the old name keep working AND every call is recorded + alarmed.
- `recordLegacyNameUse(legacy, canonical, context)` - for non-function legacy
  surfaces (env vars, DB table reads, wire kinds): call it at the read site.
- `getLegacyUsageCounts()` / `isLegacyNameCleared(name)` - the "cleared over
  time" tracker. A name is safe to delete when its count stays zero across a
  full measurement window (e.g. one release, all crons fired, all workers cycled).
- `setLegacyUsageSink(...)` - point the alarm at observability
  (throughput-observability / posthog) in production, or at a test buffer.

This is the runtime complement to the static audit script: the script says
"the old name still appears in source," the alarm says "the old name is still
actually being called." Both must read zero before deletion.

## Per-layer plan (order from the compat-map, instrument added)

1. **UI / docs (cheapest, no contract).** Rename user-facing "Fishbowl" strings
   in `src/pages/admin/` to "Boardroom". No alias needed; pure rename. Small PRs,
   one component at a time.
2. **Tests.** Match test names to production names after each layer migrates.
3. **`lib/` helpers (internal).** Rename the canonical function to its Boardroom
   name; keep the old export via `createBoardroomAlias(...)`. Watch the count.
   When `isLegacyNameCleared(oldName)` holds for a full window, delete the alias.
4. **`api/` + wire format + env + DB (external contract, last).** Add the
   Boardroom-named field/route/var ALONGSIDE the Fishbowl-named one. Instrument
   every legacy read with `recordLegacyNameUse(...)`. For DB, the cheapest path
   is a view aliasing the new name to the old table during the window, then a
   rename migration once reads are clear. Drop the legacy name only in a major
   version bump after the alarm reads zero.

## Definition of done per name

A legacy name is removed only when ALL hold:
- `scripts/audit-fishbowl-naming.mjs` shows no source references outside the
  alias/compat layer.
- `getLegacyUsageCounts()` shows zero for that name across a full measurement
  window (all scheduled workers, crons, and external consumers have cycled).
- The change ships behind the normal proof gate (xpass / completion policy),
  same discipline as any other PR.

## Guardrails

- Additive first, destructive last. Never delete a legacy surface before its
  alarm reads zero.
- Do not touch live DB tables or env secrets in a code-only PR; those need a
  migration + an env change by the owner, coordinated via FLEET_SYNC so other
  worker lanes are not stomped.
- One small PR per component/name, each citing the compat-map.

## Status of this slice

Shipped here: the alarmed-redirect helper + tests (additive, no behavior change,
no legacy file edited yet) and this plan. NOT done here: wiring aliases into the
load-bearing `fishbowl-*` files, or any DB/env/route change. Those are the
staged PRs above, to be run when the relevant lanes are quiet.
