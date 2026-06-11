# UnClick Local extension, Phase 1 (revival)

Status: active build lane (promoted from Phase 0 by operator instruction, 2026-06-11)
Owner lane: `apps/extension/`
Boundary contract: `docs/rotatepass-local-phase0.md` (unchanged, still authoritative)
Related: `docs/connectors/spec.md`, `docs/prd/backstagepass.md`, `docs/visibility-playbook.md`

## Why now

Phase 0 parked the browser extension on purpose: boundary first, code second. The operator explicitly revived the lane on 2026-06-11 ("bring that project back to life"). The boundary doc is done and stable, so Phase 1 can build against it instead of inventing rules mid-flight.

The immediate forcing function is real: the visibility lane keeps producing browser-executable hand-offs (Wayback saves, directory checks, webmaster verifications) that no fleet seat can run because cloud seats have no browser and no logged-in sessions. Today those blocks are pasted into a general-purpose assistant by hand. A scoped local runner with mandates and receipts is the UnClick-native answer, and it exercises the exact mandate -> execute -> redacted receipt -> revoke loop every later credential capability needs.

## What Phase 1 ships

A loadable Manifest V3 extension (Chrome-family, load-unpacked) that implements the Phase 0 lifecycle end to end for one deliberately zero-credential capability:

1. **Mandate store.** Scoped grants per capability: action type, time window, revoked flag. Pure logic in `src/mandates.js`, persisted via `chrome.storage.local`. No mandate, no action: the service worker refuses execute requests without a live mandate, independently of the UI.
2. **Redacted receipts.** Every executed action appends a receipt (capability, input, timestamp, outcome). The receipt builder strips any field whose name matches secret material patterns (cookie, token, passkey, mfa, session) by construction, so a future capability cannot accidentally log what the boundary forbids.
3. **One-button revoke.** Per the Phase 0 product contract, revoke kills the mandate, hides the capability from execution, and marks it revoked in the UI, from day one.
4. **Launch capability: `local.visibility.archive-save`.** With an active mandate, the user (or a pasted hand-off block) requests a Wayback Machine save of an `https://unclick.world/...` URL; the extension opens the save page in a tab and logs an honest receipt (`archive_save_requested`, not "saved": verification stays manual in v1). Zero credentials, zero host permissions, immediate value: unclick.world currently has no archive snapshots.

## Permissions posture (the point of the design)

- `permissions: ["storage"]` only. No `cookies`, no `tabs` read access, no `host_permissions`, no content scripts.
- Capability inputs are allow-listed (`page_url` must match `https://unclick.world/`...); everything else is rejected before execution.
- No background autonomy: every action is user-initiated from the popup while a mandate is live. Scheduled or agent-driven execution is explicitly out of scope for Phase 1.

## Explicit non-goals (unchanged from Phase 0)

No vault, no cookie/passkey/MFA access or export, no native messaging host, no provider logins, no purchases/posts/sends/deletes, no broad browser authority for agents, no cloud sync of anything beyond what a future System Credentials integration is allowed to see (redacted metadata only).

## Phase 2 candidates (not commitments)

- Mandate and receipt mirroring into the System Credentials panel as redacted rows.
- `local.session.presence-probe` (provider session appears present locally, no values returned).
- Hand-off block ingestion: paste a fleet hand-off block and have the extension parse it into a proposed, user-approved capability run.
- Agent exposure of approved capabilities through the MCP server, gated per mandate.

## Acceptance for Phase 1

- Extension loads unpacked with zero console errors and the popup renders the capability with its mandate state.
- Execute is impossible without a live mandate (verified at the service worker, not just the UI).
- Receipts never contain a field matching the disallowed patterns (unit-tested).
- Revoke immediately blocks further execution (unit-tested at the logic layer).
- All pure logic covered by `node --test` suites that run without a browser.
