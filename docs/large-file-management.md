# Large file management

UnClick has a handful of source files that have grown well past a maintainable
size. This doc explains which files, why it happens, what is safe to leave
alone, and the staged plan to bring the worst offenders down without breaking
the toolchain that wraps them.

It also documents the **file-size ratchet** (`scripts/file-size-guard.mjs`)
that stops the problem getting worse while we chip away at it.

## The two categories

Not every big file is a problem. There are two kinds, and they get opposite
treatment.

### A. Generated artifacts - leave them alone

These are produced by scripts. Nobody hand-edits them, the `.generated.`
suffix already signals "do not touch", and they are reproducible. Their size is
not a maintainability cost.

| File | ~lines | Built by |
|------|-------:|----------|
| `docs/UnClick-brainmap.generated.json` | 9,187 | `scripts/UnClick-brainmap.mjs` |
| `src/data/app-catalog.generated.json` | 6,301 | `scripts/generate-app-catalog.mjs` |
| `packages/mcp-server/src/memory/tool-index.generated.ts` | 4,980 | `generate-tool-index.mjs` |
| `docs/tool-index.generated.json` | 4,966 | `generate-tool-index.mjs` |
| `packages/mcp-server/src/jobsmith-rules.generated.ts` | 3,005 | build step |
| `docs/UnClick-brainmap.generated.md` | 1,292 | brainmap |

The file-size ratchet **exempts** every `*.generated.*` file for this reason.
The only open question for these is review noise - see "Generated file noise"
below.

### B. Hand-maintained giants - the real problem

These are edited by people (and the worker fleet), so size directly costs
review time, merge-conflict pain, and load/parse time.

| File | ~lines | What it is |
|------|-------:|------------|
| `packages/mcp-server/src/tool-wiring.ts` | 15,862 | 914 tool-definition objects + handler dispatch |
| `api/memory-admin.ts` | 11,236 | one Vercel function, `switch` over ~164 actions |
| `src/components/Tools.tsx` | 2,792 | website tools grid |
| `packages/mcp-server/src/memory/supabase.ts` | 2,743 | Supabase memory backend |
| `packages/mcp-server/src/server.ts` | 2,621 | MCP entrypoint |
| `src/pages/admin/AdminOrchestrator.tsx` | 2,358 | admin page |
| `packages/mcp-server/src/catalog.ts` | 2,246 | catalog |

(Run `npm run filesize:list` for the live, full list.)

## Root cause: the central-registry anti-pattern

The connector *logic* is already modular - `tool-wiring.ts` imports 218
per-connector files (`abn-tool.js`, `hunter-tool.js`, ...). The problem is that
every connector's **tool metadata** (`ADDITIONAL_TOOLS`) and **handler wiring**
(`ADDITIONAL_HANDLERS`) get hand-appended into the *same two structures in one
file*. So adding or editing any of 60+ connectors touches the same 15k-line
file - which is exactly why it grows without bound and is a conflict hotspot for
the fleet.

`api/memory-admin.ts` is the serverless variant of the same shape: one HTTP
entrypoint fans out to ~164 actions via a giant `switch`, almost certainly kept
as one file because Vercel counts each `api/*.ts` as a separate deployed
function.

## The constraint that makes this non-trivial: a static-parsing toolchain

`tool-wiring.ts` is labelled "auto-generated" but **no script generates it** -
it is the hand-maintained source of truth (confirmed by `CLAUDE.md` and the
per-connector feature commits). What *does* exist is a set of scripts that read
it **as text** and regex out what they need. Moving definitions out of the file
will silently break these unless they are updated in lockstep:

| Script | What it parses out of `tool-wiring.ts` |
|--------|----------------------------------------|
| `scripts/generate-tool-index.mjs` | slug->category from `// --- Category ---` import-region headers, plus tool `name`/`description` from `ADDITIONAL_TOOLS` literal blocks |
| `scripts/generate-standalone-mcp.mjs` | text-slices the `ADDITIONAL_HANDLERS` section |
| `scripts/audit-integrations.mjs` | finds the boundary between the two sections |

Implication: a split is only "safe" when it is **round-trip verified** -
regenerate `tool-index` / `standalone-mcp`, and diff the output. If it is not
byte-identical, the split is wrong and must be reverted. The existing guard
tests (`schema-handler-contract.test.ts`, the `--check` gates) back this up.

## The plan (staged, safest first)

1. **File-size ratchet (done).** `scripts/file-size-guard.mjs` + CI gate. Stops
   regrowth and new giants. Additive, no behaviour change.
2. **This doc (done).** Captures the analysis and the toolchain constraint.
3. **Split `tool-wiring.ts`.** Make the generator the source of truth, or teach
   it the new layout, so codegen stays correct. Verify with identical-output
   diffs of `tool-index` / `standalone-mcp`. Reversible.
4. **Split `api/memory-admin.ts`.** Thin router that dispatches to per-domain
   modules under `api/lib/admin/*` (crypto, ai-style, reliability, library,
   crews, schema, ...). Same deployed-function count. Test-guarded, reversible.

Each step ships as its own draft PR.

## How the ratchet works

`scripts/file-size-guard.mjs` records every hand-maintained source file at or
over **1,000 lines** in `scripts/file-size-baseline.json`. From then on CI
fails when:

- a baselined file grows **larger** than its recorded size (it must shrink or
  hold), or
- a **new** file crosses the threshold without being recorded.

A file that shrinks is a win - run `npm run filesize:update` to bank it and
tighten the ratchet. The numbers in the baseline are targets to drive down, not
a budget to spend.

```bash
npm run filesize:check    # CI mode - fail on growth or new giants
npm run filesize:list     # print every file over the threshold
npm run filesize:update   # rewrite the baseline (after a legit shrink or split)
npm run test:filesize     # unit tests + baseline-in-sync assertion
```

Generated artifacts, lockfiles, `node_modules`, `dist`/`build`, and `.d.ts`
bundles are exempt.

## Generated file noise (optional follow-up)

The Category A files are fine to keep committed (the fleet reads them offline),
but they pollute PR diffs. A low-risk follow-up is to mark them
`linguist-generated` in `.gitattributes` so reviews collapse them by default.
This is not required for the size work and is tracked separately.
