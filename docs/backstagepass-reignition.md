# BackstagePass reignition

**Status**: Phase 1 shipped (admin control room + per-tenant On/Off toggle).
**Last updated**: 2026-06-26.

BackstagePass is the encrypted credential vault (`api/backstagepass.ts`,
AES-256-GCM, proof-of-possession). It was retired as a public *brand* but never
deleted: it remained the live backend for the Passport surface. This reignites
it as a first-class, superuser-controlled feature with an explicit toggle, so
the plumbing is wired and exercised by default and can be switched off cleanly.

## What "on" vs "off" means

The switch gates step 3 of credential resolution in
`packages/mcp-server/src/vault-bridge.ts` (`resolveCredentials`). Resolution
order is: inline args -> env vars -> local vault -> **BackstagePass vault**.

- **On (default)**: agents resolve credentials from the encrypted vault as a
  source of truth. Benefits: just-in-time keys, in-place rotation with a
  `last_rotated_at` timestamp and staleness reminders, an append-only audit log,
  and cross-device portability.
- **Off**: the vault lookup is skipped. Tools stay functional via inline args /
  env vars / local vault, but lose the managed-vault benefits above. Nothing
  breaks; it is the same code path with one source removed.

The switch is reversible either way - the plumbing stays wired in both states.

## Where the toggle lives

- **UI**: Admin (amber / superuser) submenu -> **BackstagePass**
  (`/admin/backstagepass`, `src/pages/admin/AdminBackstagePass.tsx`). Gated by
  `RequireAdmin`. Day-to-day credential management (add / reveal / rotate /
  delete) stays on the Passport surface (`/admin/keychain`); the control room
  links to it rather than duplicating it.
- **Storage**: `tenant_settings.backstagepass_vault_enabled` (boolean, default
  `true`), per tenant, keyed by the api-key hash - the same hash the agent
  runtime derives from its UnClick API key, so flipping it here gates that
  tenant's agent credential lookups.
- **API**: `GET|POST /api/backstagepass-settings` (Bearer = the tenant's
  UnClick API key). The GET is fail-open (defaults to on if the row or column is
  absent).
- **Runtime override**: `BACKSTAGEPASS_VAULT_ENABLED` env var hard-sets on/off
  for self-hosted or development runtimes (`0`/`false`/`off`, `1`/`true`/`on`).

## Admin access / the "Yellow" superuser

Admin surfaces are gated by the `ADMIN_EMAILS` environment variable (a
comma-separated allowlist checked in `api/memory-admin.ts`, enforced by
`src/components/RequireAdmin.tsx`). The amber (`#E2B93B`) styling is the
"superuser surface" signal. There is no separate hardcoded superuser.

To give `creativelead@malamutemayhem.com` access to the BackstagePass section,
add it to `ADMIN_EMAILS` in the Vercel project env (comma-separated), e.g.:

```
ADMIN_EMAILS=existing@example.com,creativelead@malamutemayhem.com
```

No code change is needed for that; the allowlist is read at request time.

## Naming: BackstagePass vs Passport

"Passport" (under Connections) and "BackstagePass" are the same underlying
vault; Passport is the friendlier user-facing name adopted while the brand was
parked. The reignited "BackstagePass" label is used in the superuser-only Admin
shell only - the public name-lock guard
(`src/__tests__/passport-public-name-lock.test.ts`) still keeps `BackstagePass`
off public marketing pages, and keeps the genuinely retired vault terms
(`Keychain` / `Vault` / `Credentials`) off every guarded surface.

## Rotation automation roadmap (follow-on PRs)

The goal is to fully automate token / key / environment management for the
operator and for end customers. Phase 1 (this PR) is the toggle and control
room. What already exists to build on: `user_credentials.last_rotated_at`, a
health engine (`healthy` / `stale` / `needs_rotation`, 90-day threshold),
per-connector `rotationNote` guidance (10 connectors), an append-only audit log,
and a manual "Rotate values" action. The hard, deliberately-deferred half is
provider-side key generation/revocation.

- **Phase 2 - agent-callable rotation**: an MCP/API action so an agent can
  rotate a stored credential programmatically (operator supplies the new value);
  expand `rotationNote` + test probes beyond the current 10 connectors.
- **Phase 3 - scheduled scanner + signals**: a cron/heartbeat that scans
  `last_rotated_at` against per-type windows, files redacted rotation todos to
  the Boardroom, and routes urgent/leaked findings to Signals (this is the
  RotatePass PRD, `docs/rotatepass-chunk-2-prd.md`, currently design-only).
- **Phase 4 - provider-driven rotation (opt-in, per provider)**: call provider
  APIs to create a replacement key, update the vault, verify via TestPass, then
  revoke the old key. One provider at a time, behind explicit approval. This is
  the genuinely hard frontier and is out of scope for the early phases.
- **Phase 5 - per-tenant policy + compliance reporting**: custom rotation
  windows per credential type and an overdue-credentials report.
