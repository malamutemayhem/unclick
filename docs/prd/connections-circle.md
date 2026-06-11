# Connections Circle: people-linking, sharing permissions, and the account-first pivot

Status: greenlit lane (operator, 2026-06-11). UX-first PRD; crypto changes remain operator-approval.
Owner lane: Connections (admin) + this PRD. Companion: `docs/connectors/connections-hardening-plan.md`.
Operator seed name: "Friends". Recommended product name: **Circle** (rationale below).

## Naming registry (operator-confirmed reservations, 2026-06-11)

| Term | Reserved for | Never used for |
|---|---|---|
| Crews | Hats system, council, agent packs | People-linking |
| Rooms | Autopilot process stages (planning room, coding room) | Chat or social surfaces |
| Seats | AI chairs at an account | Humans |
| You | The human behind the account | - |
| Circle (pending final call) | Linked human accounts | Agents |

The clarifying rule: **humans have accounts, AIs have seats, and a seat belongs to exactly one human account.** "chris (Claude), james (ChatGPT), sam (DeepSeek local)" is three humans, three accounts, each with their own seats. Attribution everywhere is human-first, seat-second: thumbnail + name, then the AI badge ("Chris - Claude Code"). Audit rows, Boardroom posts, and shared-memory access logs all lead with the face.

On Circle for a work-AND-personal product: "Team" fails at personal, "Friends" fails at work; Circle survives both registers (work circle, family circle). Runner-up: "People" (neutral, unmistakable). The name blocks UI copy only, nothing structural.

## Admin menu structure (proposed)

```
You                         the anchor; the human IS the account
  Profile                   NEW: display name + thumbnail, so Circle and audit
                            rows show a face, not a key hash
  Keys                      disposable UnClick keys: mint, label, kill; built
                            for churn (keys are confetti, You is forever)
  AI Style                  exists today

Connections                 everything the account reaches OUT to
  Apps                      provider connectors; the three types (OAuth /
                            API key / local browser session)
  Circle                    the humans: invite by email, sharing switches,
                            sharing pill, access audit, panic switch
  Health                    honest status pills, last-tested, rotation cues;
                            the RotatePass surface

Seats                       every AI chair at YOUR account
  (per seat)                scoped key, last active, capability scope; the
                            H2 scoped-seat-keys work lands here

Crews / Rooms / Boardroom   untouched; reserved vocabulary stands
```

New requirement captured: **You -> Profile ships display name + human thumbnail** as part of the first Circle PR, because Circle attribution and sharing audit are face-first by design.

## The one structural decision everything hangs on

**Your account (email) is who you are. UnClick API keys are disposable keycards.**

Operator insight driving this (2026-06-11, near verbatim): users copy a fresh UnClick key every time they make a new MCP connection, so keys churn constantly; any system that treats the key as the durable identity will break teams and lose data. Build for rapid key recycling as the NORMAL case.

Consequences:

1. People link to people (account to account), never key to key. Rotating or losing a key must never break a Circle link, a share, or a teammate's setup.
2. Connector credentials, memory, Boardroom, and Circle links all belong to the account. Keys are just access passes that can be minted and killed freely.
3. This dissolves the operator's master-key fear: lose a key, mint a new one, nothing else moves. (Today the vault crypto is derived FROM the key, which is why rotation currently hurts; fixing that is hardening phase H1 in the companion plan.)

## Naming: why Circle

"Friends" is warm but reads consumer-social and clashes with a work platform's tone. Existing UnClick vocabulary already uses Seats (agents), Crews (agent packs), Rooms, Boardroom. **Circle** is the human ring around your UnClick: short, Apple-adjacent (Family Sharing energy), implies chosen trust, and does not collide with anything in the repo. If the operator prefers Friends, everything below works unchanged.

## Where it lives

Admin -> Connections becomes a three-tab surface:

| Tab | What it is | Exists today as |
|---|---|---|
| Apps | Provider connectors (GitHub, Vercel, email...) | `/admin/keychain` (AdminKeychain) |
| Circle | People: link accounts, set sharing permissions | NEW |
| Health | Status, last-tested, rotation cues | System Credentials panel / RotatePass direction |

Seats stays its own section: Seats are agents and machines; Circle is humans. The two rhyme on purpose (both are "things acting with my stuff, scoped and revocable").

## Circle UX (Apple vibes: one screen, plain words, big switches)

**Linking.** "Add to Circle" -> enter their email -> they get an invite (in-app + email) -> accept or decline. No directory browsing, no search-all-members (privacy default); exact-email match only. Pending invites are visible and cancellable. Either side can unlink any time; unlink takes effect immediately on both sides.

**Permissions: per person, per direction, default OFF, both sides opt in.** A share is active only when I enable giving AND they enable receiving. Launch set:

| Toggle | Plain-English label | What it actually shares |
|---|---|---|
| Shared Memory | "They can see my memory" | Facts, identity context, session summaries via load/search |
| Shared Orchestrator | "They can see my chat log" | Orchestrator continuity log (conversation turns) |

Each toggle shows one sentence of consequence in the UI, not a policy page. Future candidates (NOT launch): shared Boardroom posting, shared connector use (lending your GitHub to a teammate's agent. High risk; needs the mandate model; deliberately parked).

**Privacy visibility (operator requirement).** Sharing must never be ambient or forgettable:

- A persistent "Sharing with N people" pill on the Connections surface; tapping it lists exactly who sees what.
- Enabling a share shows a plain confirmation: "Alex will be able to read your memory: facts, preferences, and session history. You can stop this any time." Confirm to proceed.
- One-tap "Stop all sharing" panic switch on the Circle tab.
- Access is audited: "Alex's seat read your memory 3 times today" is visible per person.

The honest framing the operator set: sharing memory and chat log IS giving up privacy between members, and in a team building together with nothing to hide it is a strength. The UI says that plainly instead of burying it.

## Team shapes the design must serve

1. **Solo**: one account, many disposable keys across devices/seats. Works today minus rotation pain.
2. **Team, individual accounts + Circle (recommended default)**: each member has their own account and keys; sharing happens through Circle permissions. Key rotation is personal and harmless. Identical capability to a shared key with none of the blast radius.
3. **Team, one shared account**: still possible, discouraged in copy ("works, but one leaked key exposes everything, and you cannot tell members apart in audit logs").

The product should nudge shape 2 without blocking shape 3.

## Connecting an app, the simple way (the GitHub question)

Per the operator: connecting must be super easy, ideally never leaving the window.

- **OAuth-capable providers (GitHub, Google, Slack...): one button.** "Connect GitHub" -> provider's own consent popup -> done. The user never sees or pastes a token; UnClick receives an OAuth token scoped to what was approved and stores it encrypted. This is the Apple-vibes path and should be the default wherever the provider supports it.
- **API-key-only providers: paste once, never again.** Inline field with a direct "get your key here" link, paste, Test, Save (encrypted). Connection survives across every device via account portability.
- **Username/password websites (Amazon, eBay, supplier portals): never stored at all.** UnClick does not collect or keep the password, so no vault (certified or otherwise) is needed; there is nothing to vault. The user's own browser already holds the login (its password manager and session cookies), and UnClick Local (the browser extension, `docs/prd/unclick-local-extension.md`) uses that already-logged-in session locally under a scoped, revocable mandate, returning only a redacted receipt. The Connections list shows these honestly as "Local session (this browser)" rows with mandate state, never implying UnClick has a copy. Per-site caveat: these connections are per-machine by nature (the session lives in that browser), unlike OAuth/API-key connections which travel with the account.
- Status pills stay honest: connected / connected-untested / needs reconnection / error / revoked, plus "local session" for browser-login rows.

So the Apps tab presents exactly three connection types, each with the simplest safe shape:

| Type | Example | Where the secret lives | Travels across devices? |
|---|---|---|---|
| OAuth | GitHub, Google | Scoped token, encrypted server-side | Yes |
| API key | Most long-tail providers | Encrypted server-side | Yes |
| Browser login | Amazon, eBay, portals | Nowhere in UnClick; user's own browser | No (per machine, by design) |

Storing these credentials encrypted is lawful and industry-standard (see companion plan: "compliance reality"). The operator's instinct to minimize custody is still right, which is why OAuth-first (scoped revocable tokens, no raw passwords) and the local lane (browser sessions never leave the machine) are the preferred shapes.

## Out of scope here

Crypto redesign mechanics (hardening plan H1 owns it), scoped seat keys (H2), connector lending, agent-to-agent sharing, any public/social discovery surface.

## Acceptance sketch for the first Circle PR

- Invite by exact email, accept/decline, unlink; all states visible.
- Both-sides-opt-in toggles for Shared Memory and Shared Orchestrator, default OFF, with consequence copy and confirmation.
- "Sharing with N people" pill + per-person access audit rows.
- Panic switch works and is audited.
- Zero changes to key handling or vault crypto in the same PR.
