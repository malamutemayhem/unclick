# Connections hardening plan (holistic)

Status: active plan, operator-requested 2026-06-11 ("connections is a weak point in unclick and needs hardening wholistically")
Owner lane: Connections / BackstagePass / RotatePass / UnClick Local
Companions: `docs/connectors/spec.md` (quality bar), `docs/rotatepass-local-phase0.md` (local boundary), `docs/prd/unclick-local-extension.md` (local lane Phase 1), the April 2026 source notes distilled in that PRD.

Everything in "Verified current state" below was read from code on 2026-06-11, with file paths. Statements about gaps are findings, not accusations; some asymmetries may be deliberate. The plan routes each one to a decision or a fix.

## The portability model (the operator's question, answered)

Question: "If I have GitHub, Vercel, Gmail connected inside UnClick, can I jump on any PC and be connected to the same connectors without logging in again?"

Answer: **yes, for everything connected through the Keychain, and that is the product promise working as designed.** Mechanics:

- Keychain credentials live in Supabase (`platform_credentials`), tenant-keyed by `sha256(UNCLICK_API_KEY)` and encrypted with AES-256-GCM whose key is PBKDF2-derived from the API key itself (`packages/mcp-server/src/keychain-crypto.ts`). There is no server-side master key.
- Therefore any machine running the UnClick MCP server with the same `UNCLICK_API_KEY` can both find and decrypt the same connector credentials. New PC + UnClick connected = GitHub, Vercel, email, everything in the Keychain, with zero per-provider logins.

The honest caveats:

1. **Same key required.** Connections belong to the API key, not to "you" in any broader sense. A fleet seat with a different key has a different, empty Keychain (observed live on 2026-06-11: the cloud audit seat's `keychain_status` returned zero platforms while the operator's main key holds the real connections).
2. **Browser-login sites do not travel.** Amazon/eBay/portal sessions live in the local browser by design; that is the UnClick Local lane (Loaner Sessions), not the Keychain.
3. **The flip side of portability is blast radius.** The API key is simultaneously identity, tenant id, and the vault decryption secret. Whoever holds it holds the whole toolbelt. That is the core thing this plan hardens.

## Verified current state

Two credential stores exist, with different properties:

| Property | BackstagePass vault | MCP Keychain |
|---|---|---|
| Table | `user_credentials` | `platform_credentials` |
| Surface | `/admin/keychain` UI via `api/backstagepass.ts` | `keychain_*` MCP tools via `packages/mcp-server/src/keychain-tool.ts` |
| Tenancy | Supabase user id (session JWT) | `sha256(UNCLICK_API_KEY)` |
| Auth to decrypt | Two factors: session JWT + plaintext API key (proof of possession) | One factor: the API key in the seat's env |
| Crypto | AES-256-GCM, PBKDF2 from API key, per-row salt | AES-256-GCM, PBKDF2 from API key, deterministic salt + public pepper (`unclick-keychain-v1`) |
| Audit | `backstagepass_audit` rows on reveal/update/delete, success and failure | **None.** Writes `metering_events` and `connection_tests`, but no audit rows for connect/use/disconnect |
| Health | `test_connection` for a provider subset | `connection_tests` + `is_valid`/`last_tested_at` |

## Gap register

- **G1. The API key is the crown jewels with no containment.** One env var grants identity + tenancy + decryption on every seat that has it. No second factor on the MCP path, no per-seat scoping, no way to see which machines hold it.
- **G2. Key rotation orphans the vault.** Because the encryption key derives from the API key, rotating the key without a re-encryption migration strands every stored credential (the admin UI already warns that credentials "may need re-save"). Rotation, the standard response to a leak, is therefore punished. This is the single most dangerous property.
- **G3. Unaudited agent path.** The admin UI audits every sensitive action; the MCP tools, which agents use far more often, audit nothing. A leaked key could be used to enumerate and exercise connections with no audit trail.
- **G4. Two stores, two crypto profiles, two tenancy models.** `user_credentials` vs `platform_credentials` may be a deliberate admin/agent split, but they drift independently (per-row salt vs deterministic salt; JWT+key vs key-only). Either unify or document the split as intentional with a contract.
- **G5. Fleet seat sprawl forces a bad choice.** Seats either share the master key (full blast radius everywhere) or get their own keys (empty Keychains, capability gaps; observed live). There is no scoped middle: "this seat may use GitHub read-only until Friday".
- **G6. No device/seat inventory or revocation.** Nothing answers "which seats can currently decrypt my vault?" and there is no revocation short of the rotation that G2 punishes.
- **G7. Browser-login services have no safe lane yet.** Covered by the UnClick Local Phase 1 lane (PR #1470); listed here so the holistic picture is complete.

## Hardening phases (buildable PRs, in order)

**H0. Truth and visibility (no schema changes).**
- Audit parity: `keychain_*` connect, disconnect, and credential-use events write audit rows (mirroring `backstagepass_audit` semantics; no plaintext ever).
- Seat inventory surface: an admin view of API keys (hashes, labels, created/last-used) so "who can decrypt" has an answer.
- Document the two-store split as either intentional (with a contract) or slated for convergence. Operator decision recorded here.
- Acceptance: every credential-touching MCP action leaves an audit row; the operator can list active keys and their last use.

**H1. Rotation that does not punish you (highest risk reduction).**
- A guided rotation flow: authenticate with old key + new key, server re-encrypts all rows atomically within a grace window, old key is then dead.
- Explicit orphan guard: rotation refuses to complete while any row would become undecryptable.
- Acceptance: a full key rotation with 10+ stored connections completes with zero credential re-entry and an audit trail.

**H2. Scoped seat keys (kills the shared-master-key pattern).**
- Delegated keys: a primary key can mint seat keys with scoped connector grants (connector allow-list, read-only flags, expiry), revocable individually.
- This is the server-side twin of the extension's mandate model (`docs/prd/unclick-local-extension.md`): same grant/expiry/revoke vocabulary, same default-deny.
- Acceptance: a fleet seat runs with a scoped key that can use GitHub but cannot decrypt or even list email credentials; revoking it takes effect on next call.

**H3. Local lane integration.**
- UnClick Local (PR #1470 onward) covers browser-login services; mandates and redacted receipts mirror into the System Credentials panel per `docs/connectors/system-credentials-health-panel.md`.
- Acceptance: a browser-session capability appears as "local session controlled by this browser profile", never as a stored secret.

## Hard rules (unchanged, restated)

- No plaintext credential values in logs, responses, audit rows, tests, or docs.
- No broad new vault; BackstagePass remains the substrate.
- Auth, key-derivation, and migration changes are operator-approval PRs per FLEET_SYNC hard stops.
- Honest status everywhere: connected, connected-untested, needs reconnection, error, revoked.

## Decision queue for the operator

1. Two stores: converge or contract? (G4)
2. H1 rotation flow: approve design before any crypto-adjacent code is written. (G2)
3. H2 scoped seat keys: approve the delegation model. (G5, G6)
4. Phase 2 extension proof sites: pick the first 2-3 non-OAuth targets. (G7)
