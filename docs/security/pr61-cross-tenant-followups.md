# PR #61 cross-tenant fix: follow-up audit and scope

Job: `a8574878` (Worker 12, Security and rollback lane). Treated as
security-sensitive: no production RLS migration is applied here, no secrets
are printed.

PR #61 fixed a cross-tenant leak. This packet closes out its three named
follow-ups: (1) tighten `USING(true)` RLS, (2) migrate remaining
`localStorage` readers, (3) `api/credentials.ts`. Two of the three resolve to
"already safe, with a small hygiene slice"; the localStorage one ships a
canonical accessor as the first safe slice.

## 1. `USING(true)` RLS audit -- result: live schema is clean

Counted across `supabase/migrations/`:

- 32 `USING(true)` policies total.
- 30 are `FOR ALL TO service_role USING(true) WITH CHECK(true)`. These are
  safe: `service_role` bypasses RLS by definition, so the policy grants
  nothing beyond what the service key already has. They are belt-and-braces,
  not a cross-tenant hole.
- 2 are non-`service_role`, and both are intentional public reads:
  - `20260409000000_developer_platform.sql:93`
    `tool_submissions_public_read FOR SELECT USING(true)` -- anonymous
    submitters check submission status without an account.
  - `20260410100000_keychain_mvp.sql:100`
    `anon_read_connectors ON platform_connectors FOR SELECT TO anon USING(true)`
    -- the public connector catalog.

Conclusion: there is **no remaining cross-tenant `USING(true)` write or
tenant-data read** in the live schema. Tenant tables (`mc_*`,
`user_credentials`, `api_keys`, etc.) are all `service_role`-scoped and the
server reaches them only via service key with explicit `api_key_hash`
equality filters (verified in `api/credentials.ts` and `api/memory-admin.ts`).

Two narrow, non-blocking checks for a human/DB owner (read-only, no migration
needed now):

- Confirm the columns selected by `tool_submissions_public_read` contain no
  submitter PII (it is a public-status read).
- The one genuinely role-less `FOR ALL USING(true) WITH CHECK(true)` in the
  repo is `packages/memory-mcp/schema.sql` (lines ~586-604). That is the
  DEPRECATED standalone single-tenant BYOD package (each user runs their own
  database, so `USING(true)` is correct by design there). Flagged so it is not
  mistaken for the managed-cloud schema. No action unless that package is
  ever revived for multi-tenant use.

## 2. `localStorage` api_key readers -- first safe slice shipped

The api_key is read/written in ~14 sites. All use the identical literal
`"unclick_api_key"`, but it is redeclared as a local constant in 11 files
(named `STORAGE_KEY` in some, `API_KEY_STORAGE` in others). They agree today,
so there is **no live cross-tenant bug**, but the duplication is a drift
vector: one file diverging would silently read a different storage slot.

Shipped here (additive, new file, zero conflict risk with other lanes):

- `src/lib/apiKeyStore.ts` -- the canonical accessor: `getApiKey`,
  `hasApiKey`, `setApiKey` (rejects malformed keys), `clearApiKey`,
  `isLikelyApiKey`, `onApiKeyChange`, and the single `API_KEY_STORAGE_KEY`.
  SSR-safe, mirrors the existing `typeof window` guards.
- `src/lib/apiKeyStore.test.ts` -- 9 passing tests
  (`npx vitest run src/lib/apiKeyStore.test.ts`).

Migration map (left for the owning UI lanes to adopt incrementally, to avoid
stomping parallel work in this round -- each is a mechanical swap to the
helper, identical behaviour):

```
src/components/ApiKeySignup.tsx          STORAGE_KEY / EMAIL_KEY
src/components/ClaimKeyBanner.tsx        STORAGE_KEY
src/components/HealthCheck.tsx           "unclick_api_key"
src/components/DuplicateFactsBanner.tsx  "unclick_api_key"
src/components/Tools.tsx                  "unclick_api_key"
src/components/admin/aiChatConfig.ts     API_KEY_STORAGE (exported)
src/components/admin/AIChatPanel.tsx     API_KEY_STORAGE
src/components/admin/AdminSearchBar.tsx  API_KEY_STORAGE
src/components/admin/MemoryHealthPill.tsx API_KEY_STORAGE
src/components/admin/BugReportButton.tsx API_KEY_STORAGE
src/pages/Connect.tsx                    "unclick_api_key"
src/pages/MemoryAdmin.tsx                "unclick_api_key"
src/pages/MemoryConnect.tsx              API_KEY_STORAGE
src/pages/MemorySetup.tsx                API_KEY_STORAGE
src/pages/InstallRecover.tsx             API_KEY_STORAGE
src/pages/AdminSettings.tsx              API_KEY_STORAGE
src/pages/admin/AdminSettings.tsx        API_KEY_STORAGE
src/pages/admin/AdminCodebase.tsx        "unclick_api_key"
```

Recommended adoption order: new code uses `apiKeyStore` immediately; existing
files migrate when next touched. Once all are migrated, ESLint `no-restricted-
syntax` can ban the raw literal to prevent regression.

## 3. `api/credentials.ts` review -- result: solid, two optional hardening notes

Reviewed in full. Strong points: AES-256-GCM with a per-key PBKDF2-derived
key (100k iterations), the api_key is never stored (only its SHA-256 hash),
upsert is scoped to `(api_key_hash, platform_slug, label)`, CORS is locked to
`https://unclick.world`, and service-role env vars are server-only. Only the
key-holder can decrypt their own credentials. No cross-tenant read path.

Optional, non-blocking hardening (scoped, not done here):

- Add a lightweight per-`api_key_hash` rate limit on GET/POST to blunt
  brute-force enumeration of the credentials endpoint.
- The GET decrypt-failure path returns a generic 500; consider a 409/422 so a
  rotated-key case is distinguishable from a server fault in client UX. Low
  priority, no security impact.

## Proof

- RLS audit: counts and classifications above are reproducible with
  `grep -rniE "using ?\(true\)" supabase/migrations/`.
- Code shipped: `src/lib/apiKeyStore.ts` + 9 passing tests.
- No migration applied, no secret printed, no other lane's files modified.
