# Browser Extension Starter Plan (Phase 7 - Discovery Sensor)

**Status:** Build plan + first slice (this PR)
**Owner:** Chris Byrne / Malamute Mayhem
**Parent spec:** `docs/connectors/spec.md` (Phases 7-12, "UnClick Local")
**Related:** `docs/connectors/credential-action-routing.md`, `docs/security/current-posture.md`

## 1. What this is

The browser extension has been fully designed (spec Phases 7-12) but never started. This plan
starts it with the safest, highest-learning slice: a **read-only discovery sensor**. It watches
sites you already use, learns the **shape** of how they work (not your data), and drafts connectors
from that shape. It does not act on any site, does not store passwords, and does not upload anything
in this slice.

The one idea that makes the whole thing safe and still lets us build the network:

> The site network is built from the **shape** of sites (endpoints, field names, response
> structure), never from your data (the values). The shape is the part that is safe to share.

## 2. What ships in this PR

A new package `@unclick/browser-extension`:

- `src/shape.ts` - the trust-critical engine. Turns a captured request/response into a shape with
  **every value stripped on the device**. Path ids templated to `{id}`, query and field **names**
  kept, all **values** dropped, request/response reduced to a type-only schema.
- `src/privacy.ts` - the off / me-only / public tier model, default **me-only**, plus the
  k-anonymity gate (a shape only becomes public once enough distinct users have seen the same shape).
- `src/connector-draft.ts` - the DRAFT step: merge many shapes of one endpoint into a connector
  draft, classify read vs write, and mark writes as consent-required and never auto-promotable.
- Colocated tests, including a canary test proving no real values survive into a shape.
- `extension/` - a working Manifest V3 scaffold (capture hook, background worker, and the glass-box
  "here is what I captured" panel with delete and tier controls).

## 3. The trust model (how customers stay at ease while we build the network)

1. **Strip on the device.** Values are removed before anything is stored or could ever leave. Only
   the empty shape exists after capture.
2. **Private first.** What it learns helps you immediately ("me-only"). Sharing to the public pool
   is a separate, explicit choice.
3. **Glass box.** A panel shows exactly what was captured, with a delete button. Nothing hidden.
4. **Only share the common parts.** A shape is eligible for the public pool only after several
   distinct users have independently produced the same shape (k-anonymity). Nothing unique to one
   user is ever shared.
5. **Reads only, never sensitive fields.** Capture is GET-style reads. Writes are classified,
   require explicit consent, and are never auto-promoted. Header values are never recorded.
6. **Checkable.** The strip logic is plain, tested, and reviewable. The canary test is the proof.

Defaults that produce the safe feel:

- Capture is **off** until a site is turned on (or the user accepts a "learn this site?" prompt).
- New sites default to **me-only**.
- A per-site log with delete is always one click away.

## 4. Architecture (this slice)

```text
  page (you are logged in)
    |  fetch / XHR happen normally
    v
  capture hook (inject)  ----raw exchange---->  content script
                                                   |  strip to shape (on device)
                                                   v
                                              background worker
                                                |  store shape locally (chrome.storage)
                                                |  apply privacy tier
                                                v
                                            glass-box panel
                                            (view / delete / set tier)
```

Public upload, aggregation across users, and any execution are intentionally **not** wired here.

## 5. Reads vs writes

| Operation | Methods | Behaviour |
| --- | --- | --- |
| read | GET, HEAD, OPTIONS | captured, can be auto-promotable once k-anonymity passes |
| write | POST, PUT, PATCH, DELETE | classified, `requiresConsent = true`, never auto-promotable |

This keeps the dangerous case (a half-observed write firing into a real account) out of the
automatic path by construction.

## 6. Staged roadmap (maps to the locked spec)

1. **Phase 7.0 (this PR):** discovery sensor core + MV3 scaffold + tests. No actions, no upload.
2. **Phase 7.1:** off / me-only / public toggle wired in the panel; per-site log persistence.
3. **Phase 7.2:** bundle the TS core into the extension (single source of truth) and add the local
   MCP server + native messaging transport (`hangwin/mcp-chrome` fork, per the spec).
4. **Phase 7.3:** opt-in public upload of shapes only, gated by k-anonymity, with a server-side pool.
5. **Phase 8+:** execution modes (Loaner, Co-Pilot Bridge), mandate layer, skill marketplace,
   Bonded Cloud - per `docs/connectors/spec.md`, each behind the consent boundary.

## 7. Explicitly deferred (and why)

- **Acting on sites / write actions** - needs the permission and consent boundary first. An
  always-on, session-holding agent is the textbook "lethal trifecta" risk, and
  `docs/security/current-posture.md` currently flags prompt injection as needs-attention.
- **Public upload / cross-user sharing** - turned on only after the k-anonymity gate and an audit of
  the strip path.
- **Storing usernames / passwords / sessions server-side** - rejected per spec and
  `credential-action-routing.md`. OAuth carries across devices; raw credentials do not.
- **Bonded Cloud Sessions** - opt-in, later phase.

## 8. Verification

Run the package tests (package-local, per the repo rule for non-root workspaces):

```bash
cd packages/browser-extension
npx vitest run
```

Typecheck:

```bash
cd packages/browser-extension
npx tsc --noEmit -p tsconfig.json
```

The canary test in `src/shape.test.ts` is the key gate: it feeds an exchange full of secret values
(emails, tokens, passwords, names, card numbers) and asserts none of them appear anywhere in the
produced shape.
