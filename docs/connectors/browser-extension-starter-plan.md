# Browser Extension Build Plan ("UnClick Local")

**Status:** Active build plan. Phase 7.0 (discovery sensor) shipped in this PR; later stages scoped below.
**Owner:** Chris Byrne / Malamute Mayhem
**Parent spec:** `docs/connectors/spec.md` (Phases 7-12, "UnClick Local")
**Related:** `docs/connectors/credential-action-routing.md`, `docs/connectors/passport-git-durable-connection-model.md`, `docs/security/current-posture.md`
**Source research:** `Browser.txt` Concepts 1 + 2 (cited by the spec as the synthesis behind Phases 7-12)

---

## 1. Summary

The browser extension has been fully designed (spec Phases 7-12) but never built. This document is
the build plan that starts it and carries it to completion. It is written so a builder can pick up
any stage without re-deriving the architecture or the trust model.

The single idea the whole plan rests on:

> The site network is built from the **shape** of sites (the endpoints, field names, and response
> structure), never from the user's **data** (the values). The shape is the part that is safe to
> keep, and later to share. That separation is what lets UnClick build a large connector network
> while keeping users at ease.

Two jobs the extension does, and they are separate:

1. **Hands** - act on sites that have no clean API, using the user's own already-logged-in browser,
   so cookies and sessions never leave the device.
2. **Mapmaker** - watch how sites work and draft connectors automatically, growing the catalog over
   time (the flywheel).

Everything the extension builds still runs back through the one MCP door and the Gatekeeper, like
every other tool. The extension only builds and observes; it never gets a private back entrance to
run actions around the permission layer.

---

## 2. Why this exists (grounding, not a pitch)

The locked architecture (`docs/connectors/spec.md`) already records the reasoning. In short:

- OAuth and pass-through cover modern SaaS and LLM keys. They do **not** cover the long tail of
  consumer sites that have no public API (the "messy 99%").
- Holding raw consumer credentials server-side is the wrong shape: legal exposure (Privacy Act,
  Notifiable Data Breach; post Amazon-v-Perplexity CFAA risk), and it is technically fragile
  (Chrome device-bound sessions, fingerprinting). See `credential-action-routing.md`, which
  explicitly forbids cookie export and browser-session material.
- The defensible answer for the long tail is to execute in the user's own browser and to build
  connectors from observed shape, not stored secrets.

This plan is the user-side, device-first half of Connectors.

---

## 3. The cross-device credential question (resolved)

This question keeps recurring ("if I change PC, are my sites still connected?"), with conflicting
past advice. The resolution, baked into the design:

There are two different meanings of "logged in":

| Kind | Where it lives | Carries to a new PC? |
| --- | --- | --- |
| Server-side key (OAuth) | UnClick server, encrypted | **Yes.** Connect once, use anywhere. This is the Passport durable-connection model. |
| Browser cookie / raw session | The device | **No, by design.** |

- **OAuth sites** (eBay, Gmail, GitHub, Spotify, Stripe, etc.): the key is on the server, so a new
  PC is already connected. This is the portable, safe version of "the bubble carries my logins."
- **Storing raw usernames/passwords or sessions server-side to auto-login any PC: rejected.** It is
  a honeypot, a legal liability, and it usually fails anyway (device-bound sessions and
  fingerprinting log out or challenge a "teleported" session).
- **True no-API sites:** there is no portable key, so the user logs in once per device and the
  extension rides whatever session is already in that browser.
- **If password portability is ever genuinely required**, the only safe shape is a zero-knowledge
  vault (Bitwarden-style, only the user can decrypt). That is "Path C" in the spec, deliberately
  parked as a separate, heavier, audited product. It is not part of this plan.

---

## 4. What the extension does (the three execution modes)

From the spec, the "Hands" job has three modes, default to safest:

1. **Loaner Sessions (default)** - the agent issues a command, the browser executes it silently
   through the user's actual logged-in session.
2. **Co-Pilot Bridge (for hostile / strongly bot-detected sites: Amazon, banks)** - the agent stages
   the action (find product, fill cart, pick address); the user clicks confirm in their own browser.
   The user is the legal actor; the agent is the advisor.
3. **Bonded Cloud Sessions (opt-in only)** - a scoped, time-boxed, mandate-signed bundle runs a
   single task while the machine is offline.

The "Mapmaker" job is the flywheel in section 5. Alongside both, the spec also plans an alias email
plus TOTP relay (own the password-reset path) and a user-signed mandate layer (every action carries
a signed "this user authorized this agent to do exactly this"). Those are later phases.

---

## 5. The auto-build flywheel (the network that grows itself)

This is the "Mapmaker" job and the long-term moat. The loop:

```text
  OBSERVE  ->  DRAFT  ->  AGGREGATE  ->  GATE  ->  PROMOTE  ->  (back to OBSERVE)
```

- **Observe.** As the user browses normally, the extension watches the real network calls the page
  makes and captures their **shape** (endpoint pattern, field names, response structure). It records
  structure, never values.
- **Draft.** An engine turns observed shapes into a connector draft (endpoint, params, response
  schema, auth hint, read vs write).
- **Aggregate.** The union of many users' observed shapes converges on a fuller, more correct map of
  a site than any one person could produce, and detects breakage fast when a site changes.
- **Gate.** An eval plus human check before anything goes live. Reads flow easily; writes never
  auto-promote.
- **Promote.** A validated connector lands in the shared catalog, live for everyone. The next user
  just connects their account; the plumbing already exists.

Net effect: your one Luma run becomes everyone's Luma connector. The catalog is not written by hand
one site at a time; it accretes from usage. This is the concrete engine behind "one MCP, many under
the hood" for the long tail that WebMCP and hand-built servers both leave stranded.

---

## 6. The trust model (how we build the network without spooking users)

Six commitments, each both a real safeguard and a thing the user can see:

1. **Strip on the device.** Values are removed before anything is stored or could leave. Only the
   empty shape exists after capture.
2. **Private first.** What it learns helps the user immediately ("me-only"). Sharing to the public
   pool is a separate, explicit choice.
3. **Glass box.** A panel shows exactly what was captured, with a delete button. Nothing hidden.
4. **Only share the common parts.** A shape is eligible for the public pool only after several
   distinct users have independently produced the same shape (k-anonymity). Nothing unique to one
   user is ever shared.
5. **Reads only, never sensitive fields.** Capture is read-style. Writes are classified, require
   explicit consent, and never auto-promote. Header values are never recorded.
6. **Checkable.** The strip logic is plain, small, and tested. A canary test is the proof.

The one-line promise to a user: *"It learns how websites are built, never what you do on them, and
you can see and switch it all off."*

### Privacy tiers (per site)

| Tier | Captures? | Shares to public pool? | Default |
| --- | --- | --- | --- |
| Off | No | No | |
| Me only | Yes (local benefit) | No | **Default for new sites** |
| Public | Yes | Yes, but only shapes, only after k-anonymity passes | |

---

## 7. Architecture

### This slice (Phase 7.0, shipped here)

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

No public upload, no aggregation across users, and no execution are wired in this slice.

### Target (full UnClick Local)

```text
  AI client --MCP--> One Door --> Gatekeeper --> { Public | Utility | Sites | Your Accounts }
                                       ^                                  ^
                                       |                                  | published back
   Browser Extension --observe--> Auto-Build (observe/draft/aggregate/gate/promote)
   (no-API sites)                  every built tool runs back through the Gatekeeper
   how a tool runs: API site -> server on brokered token; no-API -> your tab; never copy cookies off device
```

---

## 8. What ships in this PR (Phase 7.0)

New package `@unclick/browser-extension`:

- `src/shape.ts` - the trust-critical engine. Strips every captured value on device: path ids
  templated to `{id}`, query and field and header **names** kept, all **values** dropped, request
  and response bodies reduced to a type-only schema. Id-keyed maps are collapsed so values used as
  keys cannot leak.
- `src/privacy.ts` - the off / me-only / public tiers (default me-only) and the k-anonymity gate.
- `src/connector-draft.ts` - the DRAFT step: merge many shapes of one endpoint into a connector
  draft; classify read vs write; writes are consent-required and never auto-promotable.
- `src/types.ts`, `src/index.ts` - shared types and public surface.
- Colocated tests (24), including a **canary** that feeds an exchange full of secrets (emails,
  tokens, passwords, names, card numbers) and asserts none survive into a shape.
- `extension/` - a working Manifest V3 scaffold: page capture hook (`inject.js`), content bridge
  (`content.js`), background worker (`background.js`, strips on device, applies tier, stores
  locally), and the glass-box panel (`panel.html` / `panel.js`, per-site tier control and delete).

Note: `extension/core.js` is a hand-mirror of the TS core used by the scaffold until the Phase 7.2
bundler step makes the TS core the single source of truth.

---

## 9. Reads vs writes

| Operation | Methods | Behaviour |
| --- | --- | --- |
| read | GET, HEAD, OPTIONS | captured; can be auto-promotable once k-anonymity passes |
| write | POST, PUT, PATCH, DELETE | classified; `requiresConsent = true`; never auto-promotable |

This keeps the dangerous case (a half-observed write firing into a real account) out of the
automatic path by construction.

---

## 10. Challenges and public issues to overcome (the hard 20%)

| Challenge | Why it bites | How this plan handles it |
| --- | --- | --- |
| Shape-not-content is the whole trust contract | An always-on extension watching authenticated traffic only survives if users believe it captures shapes, never values. One leak ends it. | On-device stripping, the canary test, the glass box, and (later) third-party audit of the strip path. |
| Reads vs writes | Auto-enabling a half-observed write (missing a token or required field) can fire a bad request into a real account. | Writes are classified, consent-gated, and never auto-promoted. |
| Lethal trifecta / prompt injection | An always-on, session-holding, agent-driven extension is the textbook risk (private data + untrusted page content + a way to send it out). `docs/security/current-posture.md` flags prompt injection as needs-attention. | The consent and permission boundary ships before any session-holding execution. That boundary is the product, not a later add-on. |
| Schema noise | Auto-drafts miss pagination, rate limits, signed params, rare branches. | Auto-draft then eval and human gate before promote. |
| Scale | You cannot switch millions of tools on at once (the context window). | Search-and-load is already how UnClick works (the hidden meta-tools): millions sit dormant, the agent pulls only what it needs. |
| ToS and legal | Acting as a logged-in user can cross site terms. | Stay on the user-in-the-loop side (Co-Pilot for hostile sites), never spoof, never copy sessions off device. |
| Breakage and maintenance | Sites change their private APIs. | The crowd-aggregated map detects drift quickly; promotion can be re-gated automatically. |

---

## 11. Staged roadmap

| Stage | Scope | Risk |
| --- | --- | --- |
| **7.0 (this PR)** | Discovery sensor core + MV3 scaffold + tests. No actions, no upload. | Low |
| 7.1 | Wire off / me-only / public in the panel; persist per-site log; "learn this site?" prompt. | Low |
| 7.2 | Bundle the TS core into the extension (single source of truth). Add the local MCP server + native messaging transport (fork `hangwin/mcp-chrome` per the spec). | Medium |
| 7.3 | Opt-in public upload of shapes only, gated by k-anonymity, with a server-side pool and dedupe. | Medium |
| 8 | Co-Pilot Bridge execution for hostile sites (stage action, user confirms). | Medium-high |
| 9 | Alias email + TOTP relay (own the reset path). | Medium |
| 10 | User-signed mandate layer (Web Bot Auth). | Medium |
| 11 | Self-healing skill marketplace (capture, replay, repair). | Medium |
| 12 | Bonded Cloud Sessions (opt-in, offline tasks). | High |

Stages 8 and beyond match `docs/connectors/spec.md` and each sit behind the consent boundary.

---

## 12. Explicitly deferred (and why)

- **Acting on sites / write actions** - needs the permission and consent boundary first
  (lethal-trifecta risk; prompt injection currently needs-attention).
- **Public upload / cross-user sharing** - on only after the k-anonymity gate and an audit of the
  strip path.
- **Storing usernames / passwords / sessions server-side** - rejected per spec and
  `credential-action-routing.md`. OAuth carries across devices; raw credentials do not.
- **Bonded Cloud Sessions** - opt-in, later phase.

---

## 13. Open decisions (need Chris's call)

- Priority: parallel-track Phase 7.1+ now, or finish OAuth Connectors V1 (Phases 0-6) first? The
  spec allows Phase 7 to pre-empt with a greenlight.
- K-anonymity threshold value (default set to 3 in code) and whether it should vary by site
  sensitivity.
- Whether public sharing is opt-in per site (current design) or also needs a global master switch.
- When to commission the third-party audit of the strip path (the strongest trust lever).

---

## 14. Verification

```bash
cd packages/browser-extension
npx vitest run                       # 24 tests pass
npx tsc --noEmit -p tsconfig.json    # clean
```

The canary test in `src/shape.test.ts` is the key gate: it feeds an exchange full of secret values
and asserts none of them appear anywhere in the produced shape. If that test ever fails, the trust
contract is broken and nothing should ship.

---

## 15. Definition of done per stage

- **7.0:** package builds, typechecks, 24 tests pass, canary green, scaffold loads as an unpacked
  extension and the glass-box panel shows captured shapes with delete and tier controls.
- **7.1:** a user can set a site to off / me-only / public and the choice is honored and persisted.
- **7.2:** the extension uses the compiled TS core (no hand-mirror), and an MCP client can reach the
  local server.
- **7.3:** a shape reaches the public pool only after k-anonymity passes, proven by a test and a
  visible audit entry.
- **8+:** per the spec, each behind the consent boundary, each with a proof receipt.
