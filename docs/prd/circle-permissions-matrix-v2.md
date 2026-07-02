# Circle Permissions Matrix v2: Directional Toggles, Masters, and Compact Sections

Status: design + phase 1 implementation. Written 2026-07-02. Supersedes the visual-only pass shipped in PR #1687 (`src/pages/admin/AdminCircle.tsx`); the backend contracts from PR #1687 (`account_links`, `link_permissions`, `link_access_audit`, `set_permission`) are kept and extended, not replaced.

## 1. What the operator's toggle system actually means

The mockups define a five-state visual vocabulary per cell. Decoding it against the data model we already have (each `link_permissions` row stores one direction: `owner_enabled` = the sharer's offer, `grantee_enabled` = the receiver's acceptance; a direction is ACTIVE only when both are true):

| Visual | Name | Stored bits (my view of one person + one resource) |
| --- | --- | --- |
| Plain toggle on | Master / mine | Row or section master, or the You column (see 3) |
| Toggle off | Neutral, nothing shared | No offers either way |
| `>` knob right | You sharing to a 3rd party | My offer out is on. Solid when they accepted (flowing); soft pulse while awaiting their acceptance ("trying to share") |
| `<` knob left | 3rd party requesting handshake | Their offer in is on and I have not accepted. Rendered with an attention glow: it is a request waiting on me |
| `<>` both arrows | Handshake, two-way shared | Both directions on; solid when both active |
| Dimmed any-state | Visual info only | A state I can see but not change (another pair's relationship, or a resource class not yet enforced) |

Four booleans exist per (person, resource) pair: my offer, their acceptance of it, their offer, my acceptance of it. The compressed pill renders all four; the click model below writes them.

## 2. The click model: one tap = my whole side

The previous implementation split each pill into two invisible half-zones (left = receive, right = give). That is undiscoverable and it is why the page felt wrong. v2 replaces it:

- One tap on a neutral cell turns MY side on: my offer out AND my standing acceptance of theirs. Renders `>` (or `<>` immediately if their offer was already waiting).
- One tap on a cell where my side is on turns my side off. Falls back to `<` if their offer stands, else neutral.
- The other party's two bits are never mine to click. Their offer arriving later completes a handshake I already opened, visibly and audibly (audit row), with no extra confirmation step, because my tap already declared openness.

This is exactly the operator's language: tap = "I am trying to share everything to that person"; their matching intent = full handshake. Consent is still bilateral at the data layer: nothing flows in either direction until both bits of that direction are on.

Fine control stays for experts: a "Fine control" switch above the matrix swaps cells to explicit split mode (separate give / receive targets, the PR #1687 behavior, now visible as two labeled halves rather than secret zones). The API keeps both shapes: `set_permission` accepts `direction: "give" | "receive" | "both"`, where `both` writes my two bits in one call.

## 3. Masters and collapse

- The You column is functional, not decorative: it is the row master. One tap sets my side for that resource across every accepted Circle link (server action `set_permission_all`, one audit row with the affected count). Its pill shows on (all my sides on), mixed (some), or off.
- Each section header carries the same master at section scope plus a summary ("sharing with 2, receiving 1") and an amber badge counting handshake requests waiting on me.
- Sections are collapsed by default. Collapsed, a section is one row: icon, name, master, summary, request badge. Experts expand to tweak per-person cells. A section with pending inbound requests auto-expands so a request is never buried. Expansion state persists per browser.
- Stop all sharing (existing, audited) remains the global kill for outbound; it is the global master OFF. A global master ON is intentionally not offered: bulk-enabling everything to everyone is not a safe single click.

## 4. Apps are asymmetric and the You master does not apply

Memory, Orchestrator, and Chat rooms are symmetric: both sides own an instance of the same resource, so one cell can encode a two-way handshake. Apps are not symmetric. My Dropbox connection and David's Dropbox connection are different resources (different credentials, possibly different accounts/emails, custom MCPs with no counterpart). Therefore:

- Apps (You connected) rows behave like outbound-only rows: each cell is my offer of scoped access to MY connection (`>` or neutral, with the pending/active shading). There is no `<>` on an app row; reciprocity does not exist here.
- Apps shared to you renders one sub-section PER SHARER (the "Apps (David connected)" table in the mockup): each row is one of that person's connections offered to me, and my only control is my acceptance cell (`<` request glow until I accept; solid once active). The You row master cannot bulk-accept these and is not rendered there: each inbound app grant is an individual trust decision.
- Whether I can see who ELSE a sharer offered an app to (the dimmed third-party cells in the mockup) is the sharer's call, default hidden. v2 renders only my own relationships.

Enforcement model for apps (phase 3): a share is a scoped mandate: `(sharer, connection, grantee, scopes, expiry)` stored in its own table, executed by the connector broker on the SHARER's credential with a receipt written per call into `link_access_audit`. Read/list scopes first; write scopes only behind the approval layer. Until that broker path exists, app rows stay in the dimmed "visual info only" class with honest "coming soon" copy, and are collapsed by default so they cost no screen space.

## 5. Resource taxonomy and phasing

Permission keys stay namespaced strings in `link_permissions.permission` (the CHECK constraint is extended per phase).

- Phase 1 (this change): the three enforced permissions rendered as three compact sections: Memory (`shared_memory`), Orchestrator (`shared_orchestrator`), Chat rooms (`shared_chat`, live since the rooms migration but previously missing from this page entirely). Plus the v2 interaction model, masters, collapse, density, request badges, and the `both` / `set_permission_all` API extensions.
- Phase 2: memory sub-scopes as real keys (`memory.saved_facts`, `memory.library`, `memory.chats`, `memory.files_notes`, `memory.project_briefs`, `memory.preferences`, `memory.recall_check`), with `shared_memory` becoming the section master (a gate ANDed with sub-scopes, so flipping the master off preserves per-scope nuance). Requires scope checks in the memory read path (`canReadCircleMemory` gains a scope argument). Until then the sub-scopes are listed as one muted row, not seven fake toggle rows.
- Phase 3: app mandates as in section 4.
- Phase 4: audit surface upgrade: per-cell history on hover, receipts view per person, and export.

## 6. Decisions and rejected options

- One-tap-sets-both-my-bits over tap-cycling three states: cycling (neutral, give, both) makes the second tap mean something different per cell and cannot express "accept without sharing back"; fine control covers the asymmetric cases explicitly.
- Masters are bulk writers at my side only: a master can never accept an inbound offer on my behalf across the board for apps; for symmetric resources it can, because my tap semantics there already include standing acceptance.
- No per-person "select all resources" column master in v1: the row/section masters plus small sections make it redundant; revisit if resource count grows past ~10 rows.
- Third-party-to-third-party visibility rejected by default (privacy: another pair's sharing state is their business).
- The naming `give`/`receive` stays at the API layer (contract stability); UI copy says "sharing" / "receiving" / "request".

## 7. Files

- `src/pages/admin/AdminCircle.tsx`: matrix v2 (compact pills, one-tap cells, You masters, collapsible sections, request badges, fine control mode).
- `api/account-links.ts`: `set_permission` direction `both`; new `set_permission_all` bulk action.
- `api/lib/account-links-model.ts`: unchanged contract; `shared_chat` was already a live `CIRCLE_PERMISSIONS` member.
- Tests: `src/pages/admin/AdminCircle.test.tsx`, `api/account-links.test.ts`.
