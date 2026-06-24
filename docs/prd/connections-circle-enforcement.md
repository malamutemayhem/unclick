# Connections Circle: enforcement, memory children, and the app-sharing mandate model

Status: proposal. Companion to `docs/prd/connections-circle.md` (the greenlit Circle PRD) and `docs/connectors/connections-hardening-plan.md`. This doc covers the part the first Circle PR deliberately did not: making a share actually take effect, and the staged path to the granular grid and to connector lending.

## The gap this closes

The Circle handshake is real in the data. The migration `supabase/migrations/20260619090000_account_links_circle.sql` defines `link_permissions` with `owner_enabled` and `grantee_enabled`, and the table comment is explicit: "A share is active only when owner_enabled and grantee_enabled are true." The `/api/account-links` endpoint writes those rows and reads them back to render the toggles.

But a repo-wide search shows `link_permissions` appears in only four places: the API (`api/account-links.ts`), the migration, the PRD, and a product-name string. It does not appear in the memory read path (`packages/mcp-server/src/memory/handlers.ts`), the MCP entrypoint (`api/mcp.ts`), or the credentials path. Nothing on the serving side consults it.

Consequence: today the toggles record intent. Turning on "Shared Memory" with someone does not yet cause their agent to receive anything, and turning it off does not yet withhold anything, because no read path asks the question. Circle is currently a control surface, not a boundary. This doc specifies the boundary.

## Principle: the enforcement is application-layer, so the read path must be the gate

The migration's RLS posture is deliberate. `link_permissions` has `block_anon_access` and `block_authenticated_direct_access` policies and a `service_role_all` policy: authenticated users cannot read or write the table directly, and all access flows through the service-role API. Memory itself is served by the MCP server using the service role. So row-level security on the memory tables is not what enforces sharing between accounts. The application code that serves memory is.

That makes one rule non-negotiable: cross-account reads must pass through a single deny-by-default gate, and no service-role query may return another account's data without first clearing that gate.

## The gate primitive (shipped in this PR, unit-tested)

`api/lib/circle-access.ts` provides the pure predicate the read path needs:

- `canGranteeReadOwner(rows, { ownerUserId, granteeUserId, permission })` returns true only when an active share exists, where active means a matching row with both `owner_enabled` and `grantee_enabled`. Self-access returns false (a caller reads its own data through the normal owner path). This mirrors `receive_active` in `buildCirclePermissionState`, kept standalone so the read path does not have to build the full permission map.
- `ownersSharingWith(rows, { granteeUserId, permission })` lists every owner account with an active share to a given grantee, de-duplicated, self excluded. The read path uses it to enumerate whose shared data a caller may pull.

These are pure and fully covered by `api/lib/circle-access.test.ts`. They change no behavior on their own; nothing calls them yet. They are the safe foundation the wiring below builds on.

## The cross-account read mechanism (design decision)

A grantee must be able to read an owner's shared data, but per the PRD sharing must never be ambient or silent. The proposed mechanism is explicit and per-call rather than an automatic merge into the caller's own results:

1. `load_memory` and `search_memory` gain an optional `from_account` argument (an email, resolved to an owner account id). Omitted, behavior is unchanged: the caller reads only its own memory.
2. When `from_account` is set, the server resolves the owner account id, loads that pair's `link_permissions` rows, and calls `canGranteeReadOwner` with `granteeUserId` = caller, `permission` = the layer being requested.
3. If the gate returns false, the call is denied with a plain message ("No active memory share from that account"). If true, the server queries the owner's memory via the service role, scoped to exactly what the permission covers, and returns it attributed face-first ("from Alex's account").
4. Every successful cross-account read writes a `link_access_audit` row. This is what powers the PRD's per-person visibility ("Alex's seat read your memory 3 times today") and the panic switch's audit trail.

Default off, explicit per call, audited, and revocable by either side at any time: this matches the PRD's privacy-visibility requirements.

## Permission to data-scope mapping

| Permission | Plain-English label | What the read path may return |
|---|---|---|
| `shared_memory` | "They can see my memory" | Facts, identity context, session summaries via load/search |
| `shared_orchestrator` | "They can see my chat log" | Orchestrator continuity log (conversation turns) |

The gate is permission-scoped: a `shared_memory` grant never exposes orchestrator turns, and vice versa. `canGranteeReadOwner` enforces this because `permission` is part of the match.

## Safety checklist for the wiring stage

This stage touches cross-tenant data access, so it is security-critical and cannot be validated by a build alone. Before it ships:

- The gate is the only path to another account's data. No service-role memory query accepts a foreign account id without first passing `canGranteeReadOwner`.
- Deny-by-default everywhere: missing rows, null flags, one-sided opt-in, wrong permission, and self all return false (the unit tests lock these in).
- Every cross-account read writes an audit row before returning.
- Integration tests run against a real database (two accounts, four toggle combinations per permission, revoke-takes-effect, panic-switch-clears-all).
- A security review covers the new query paths (the `security-reviewer` agent plus a human pass), specifically for missing owner-id filters and any way to reach memory without the gate.

## Memory children (beyond the PRD launch set)

The grid UI (PR #1580) renders child rows under Memory (Saved Facts, Library, Files, Briefs, Preferences, Recall). The launch PRD intentionally ships only the two parent toggles. To make the children real:

1. Extend `CIRCLE_PERMISSIONS` in `api/lib/account-links-model.ts` with the child permission keys.
2. Migrate the `link_permissions_permission_check` constraint to allow the new values (an additive migration; existing rows are untouched).
3. Map each child key to its memory layer in the read-path scope table above.

`canGranteeReadOwner` already generalizes over `permission`, so no gate change is needed. This is an optional follow-up, not part of the enforcement stage, and should land only after the two-toggle path is enforced and reviewed.

## App sharing / connector lending: the mandate model (parked, sign-off required)

The greenlit PRD parks this twice and on purpose: "shared connector use (lending your GitHub to a teammate's agent). High risk; needs the mandate model; deliberately parked," and under out-of-scope: "connector lending, agent-to-agent sharing." It is not a toggle and must not be built as one, because it is delegated access to a connected credential, not read access to stored text.

Design sketch for when it is greenlit (its own PR, its own security review):

- The grantee never receives the token. Calls execute server-side under the owner's credential.
- Each grant is a mandate: per-connector, scoped to specific actions, time-boxed, and revocable instantly by the owner.
- Granting requires explicit confirmation with consequence copy, the same as memory sharing but stronger.
- Every delegated call writes a redacted audit receipt visible to the owner.
- A kill switch revokes all outstanding mandates immediately.

This belongs to the hardening plan's mandate work, not to Circle enforcement. It stays out of scope here until the operator signs off on the mandate model.

## Staging and where each stage is verifiable

1. Gate primitive plus tests (this PR). Verifiable in CI by the existing root Vitest run, which covers `api/**`.
2. Read-path wiring plus audit. Requires a database-capable run, integration tests, and a security review. Not verifiable by build alone.
3. Memory children. Additive migration plus scope mapping, after stage 2 is reviewed.
4. App-sharing mandate model. Operator sign-off, separate PR, separate security review.
