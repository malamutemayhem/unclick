# Zod v3 to v4 Migration Decision

Job: `01896509-17b6-4722-85b9-a7750b079b64` (Worker 14, TestPass and evals lane)
Status: decision packet. Do NOT auto-bump. No code dependency was changed by this job.
Guard: `api/zod-version-policy.test.ts` (runs in root CI via `ci.yml`).

## Current truth (audited 2026-06-02)

The repo already runs a deliberate split, not a clean v3 monorepo:

| Workspace | zod range | Major |
|---|---|---|
| `packages/mcp-server` | `^4.4.1` | 4 |
| root `package.json` | `^3.25.76` | 3 |
| `packages/geopass` | `^3.25.76` | 3 |
| `packages/compliancepass` | `^3.25.76` | 3 |
| `packages/seopass` | `^3.25.76` | 3 |
| `packages/flowpass` | `^3.25.76` | 3 |
| `packages/securitypass` | `^3.23.8` | 3 |
| `packages/sloppass` | `^3.23.8` | 3 |
| `packages/copypass` | `^3.23.8` | 3 |
| `packages/core` | `^3.23.8` | 3 |
| `packages/uxpass` | `^3.23.8` | 3 |
| `apps/api` | `^3.23.8` | 3 |
| `packages/testpass` | `^3.22.4` | 3 |
| `packages/legalpass` | `^3.22.4` | 3 |
| `packages/memory-mcp` | `^3.23.0` | 3 |

`packages/mcp-server` is the only v4 island. Its MCP tool input schemas were
already ported to v4. Everything else is still v3.

## Why a blind bump is unsafe

Zod v4 is not a drop-in for v3 in the places this repo actually leans on it:

- Error shape changed. Code that reads `error.issues`, `error.format()`, or
  `.errors` and renders or branches on it can silently change output. The MCP
  server and the API both surface validation errors to agents and to the admin
  UI, so a shape change is user-visible, not internal.
- `.default()` / optional inference and several string formats (for example
  `z.string().email()` moving toward `z.email()`) changed, so types can compile
  while runtime acceptance shifts.
- Mixed versions in one process are a real hazard. If two workspaces import two
  zod majors and pass schemas or parsed objects across the boundary,
  `instanceof ZodError` and schema identity checks break. The current split is
  only safe because the v4 island (`packages/mcp-server`) does not share live
  zod schema objects across a v3 boundary at runtime.

## Decision

1. Keep the split. Do not let Dependabot or a sweep bump any v3 workspace to v4.
   The guard test `api/zod-version-policy.test.ts` fails CI if a v3 workspace
   moves to v4 outside a tracked migration, and the failure message points back
   to this doc.
2. Migrate per-workspace, leaf-first, never as one mega-bump. Each workspace is
   its own PR with its own tests green before and after.
3. Do the migration in this order (fewest cross-boundary schema handoffs first):
   `packages/core` -> the standalone Pass packages (`sloppass`, `securitypass`,
   `copypass`, `uxpass`, `compliancepass`, `seopass`, `geopass`, `flowpass`,
   `legalpass`, `testpass`) -> `packages/memory-mcp` -> `apps/api` -> root +
   `api/`. Root and `api/` last because they touch the most surfaces.

## Per-workspace migration checklist

- Bump `zod` to `^4` in that one workspace only.
- Grep that workspace for `.errors`, `.issues`, `.format(`, `.email(`, `.url(`,
  `ZodError`, `superRefine`, `.default(` and reconcile each against the v4 API.
- Run that workspace's own tests, then the root `npm test`.
- Confirm no error-rendering surface (admin UI, MCP tool error text, API JSON)
  changed shape. Where it did, update the consumer in the same PR.
- Update the table above and move the workspace into `V4_WORKSPACES` in
  `api/zod-version-policy.test.ts` in the same PR.

## Smallest safe first slice

Migrate `packages/core` alone to v4, prove its tests plus root `npm test` stay
green, update this doc and the guard. That validates the playbook on the lowest
blast-radius workspace before touching anything agent-facing.

## Not done here (and why)

No dependency was bumped. The job brief says "check if safe now; do not
auto-bump blindly." The safe answer is: the split is intentional, a blanket bump
is unsafe, and the migration is a tracked per-workspace sequence guarded by a
CI test, not a Dependabot merge.
