# UnClick Workspace: the team layer brief

Status: operator-directed strategy brief, 2026-06-12. Written as a CONTEXT CAPSULE: a brand-new AI thread with zero prior history must be able to run deep research and then build from this document alone.
Author of direction: Chris (operator). Drafted by the Connections-lane seat from his words; quotes are near-verbatim.

---

## 1. What UnClick is (context for a fresh reader)

UnClick (unclick.world, npm `@unclick/mcp-server`) is the universal remote for AI: one MCP install gives any compatible agent (Claude, ChatGPT, Cursor, local models) 450+ callable endpoints across 60+ integrations plus persistent cross-session memory. Positioning rule: it is a LAYER agents plug into - "Stripe model, not Windows model". Never describe it as an OS, kernel, or device-level platform.

What already exists and works (verified on main as of 2026-06-12):

- **Memory**: identity, durable facts, session summaries, search; shared across every AI client via one account.
- **Boardroom**: the coordination room where agent seats post status, decisions, handoffs; todos kanban with leases, proof states, and an independent-verifier rule (a builder identity cannot close its own job; UI jobs require screenshot proof).
- **Jobs, two lanes**: Jobs (AI) for the agent workforce and Jobs (Human) for people, on ONE todo substrate. Agents already push humans jobs ("set up this key", "sign up here") with paste-ready steps and expected proof. Shipped 2026-06-11.
- **XPass / XGate**: verification products (TestPass, UXPass, SecurityPass, SEOPass...) and gates (ShipGate, SpendGate, KillGate...) so "done" is proven, not claimed.
- **Connections**: Apps (one list, lens views: Connected / Sign-in apps / Key apps / Built-in), encrypted credential storage portable across devices via the account, OAuth one-click for supported providers. Hardening plan in flight (account-first identity; keys are disposable; vault crypto Option C approved).
- **Circle (in build)**: account-to-account people linking with both-sides-opt-in sharing toggles (Shared Memory, Shared Orchestrator), loud privacy visibility, human-first attribution (thumbnail + AI seat badge).
- **UnClick Local (Phase 1 shipped)**: browser extension for browser-login sites; mandates, redacted receipts, one-button revoke; cookies/passwords never leave the machine.
- **Seats**: AI chairs at an account. Rule: humans have accounts, AIs have seats, every seat belongs to exactly one human.

Reserved vocabulary (do not repurpose): Crews = agent packs/council; Rooms = Autopilot process stages; Seats = AI only; You = the human; Circle = linked humans; Members = reserved for a future workspace/org container. Rename rule: brand names live ONLY in `src/config/product-names.ts`; all contracts use neutral identifiers.

## 2. The operator's vision (his words, distilled)

> "The way I see the future: 10 or so in a team, building the connections on UnClick, managing projects on UnClick, having full transparency on UnClick - all while using their fav AI subscriptions."

UnClick enters the workspace category currently held by Todoist, Asana, monday.com, Slack, MS Teams, Zoom, Outlook/Google Calendar. Not by cloning any of them, but by taking the most popular features of each ("the 80/20: the best features everyone uses") and combining them on top of what UnClick uniquely already has.

Primary market: business teams. Secondary: personal life use. The same product must serve both registers (this constraint already shaped the Circle naming).

## 3. Why this might win (the structural advantages)

1. **Direction of travel.** Incumbents are human-workspace tools bolting AI on. UnClick is an AI-native layer bolting workspace on. The hard parts of a mixed human+AI team - agent identity, memory, verification, coordination, credential plumbing - are the parts UnClick already shipped, and the parts incumbents cannot retrofit cheaply.
2. **The trust layer is the differentiator, not the features.** Tasks, chat, and calendars are commodity UI. Verified work is not: XPass receipts on jobs, gates before irreversible actions, independent-verifier closes, screenshot proof for UI claims. "All the gates, checks and balances in place will be very attractive" (operator). No incumbent has a board where some teammates work overnight and file proof.
3. **The four-way assignment matrix, with clear visibility** (operator requirement). Humans assign agents (exists), agents assign humans (exists, Jobs Human), agents assign agents (exists, Boardroom), humans assign humans (arrives with Circle). Every assignment is attributed human-first (face + seat badge). The full matrix on one substrate is the category-defining picture.
4. **Bring-your-own-AI.** Teams keep their favourite AI subscriptions; UnClick is the shared floor between them. Incumbents force their own bundled assistant.
5. **Agility.** A small business with an AI workforce iterates faster than committee-run incumbents.
6. **Simple-English, idiot-proof approach** (operator) - the established product voice carries over: plain words, honest status, one-line consequences.

## 4. The moat question, answered honestly

The operator asked: "I think this is definitely a moat - correct me if I'm wrong."

Mostly right, with one sharpening: **the workspace features are not the moat; the substrate underneath them is.** Tasks, chat, and calendar views are commodity UI. What compounds and resists copying: (a) the verification culture (proof-gated done, gates, verifier independence) baked into the data model, (b) cross-session memory and credentials that make switching costs grow with use, (c) the mixed human+AI team substrate, and (d) the GEO/answer-engine position already being built. So the workspace play is the moat's expression in a category people pay for - worth doing, but the build must keep feeding the substrate (every workspace feature should produce receipts, memory, and attribution), or it degrades into commodity UI.

## 5. The calendar and email pain point (operator's partner, real user signal)

> "Multiple companies and even personal calendars causing pain, and locations; same for email. If UnClick can solve this, that's a bonus. THIS may require having our own calendar, email systems (unsure, but explore)."

The pain: one person juggling several company calendars plus a personal one (and several inboxes) has no single truthful view of their day, their locations, or their commitments.

Build guidance from the operator: 80/20, keep it simple, do not over-complicate, and "maximum automation in building this - if something requires a lot of human touch, this will lose efficiency in this build."

The strategic question deep research must settle: **aggregate or own?**
- Aggregation-first (likely the 80/20 answer): UnClick already has calendar/email connector surface (Google, Outlook via OAuth; IMAP/SMTP). A unified read layer (one merged calendar view, one merged inbox triage) over existing accounts is high-value, low-custody, and automatable.
- Owning calendar/email (UnClick-hosted CalDAV/inbox) is a heavy, support-intensive build (deliverability, spam, sync) that history suggests kills small teams. Explore, but the burden of proof is ON owning, not on aggregating.

## 6. The 80/20 scope discipline (operator's hard rule)

> "To not make a massive bug-check headache, focus on the core essentials and not bloat too fast."

Implications for the build plan: ship the few features everyone uses daily (tasks/jobs - exists; team visibility - exists via Boardroom + Circle; lightweight chat or comment threads - partially exists; unified calendar view - new; meeting/scheduling basics - new) and explicitly refuse the long tail (Gantt charts, time tracking, whiteboards, video calling, custom fields forests) until pulled by real use. Maximum build automation: the agent fleet builds it, XPass verifies it, dogfood is the first customer (UnClick's own team already runs on the AI job board daily - "we have just made a human job board and already regularly use an AI job board").

## 7. What deep research should answer (the agenda for the new thread)

1. For each incumbent (Todoist, Asana, monday, Slack, Teams, Zoom, Outlook/Google Calendar, Notion as a wildcard): what is the 20% of features that produce 80% of daily use? Evidence-based (reviews, usage studies), not feature-list copying.
2. Calendar/email: aggregate vs own - costs, deliverability/sync realities, privacy posture, and what the minimum lovable unified view is. Include the multi-company + personal + locations scenario explicitly.
3. Where do mixed human+AI teams break down in incumbent tools today (real complaints, real workarounds)? That gap list is the feature spec.
4. Pricing/packaging norms for 10-seat teams (context only; UnClick public surfaces stay pricing-neutral during beta).
5. Market response risk: what happens when incumbents ship agent features; which of section 3's advantages survive that.
6. Sequencing: the smallest coherent slice that makes one 10-person team fully operational on UnClick (likely: jobs four-way matrix + Circle + unified calendar read + Signals as the inbox), and what explicitly waits.
7. Migration/onboarding: how a team leaves Asana/Slack gradually (coexistence beats big-bang).

## 8. Constraints the new thread must carry (non-negotiable)

- Truth-locked claims only; numbers from `src/config/site-stats.ts`; no public comparison claims until the lane demonstrably works in-house (dogfood first, claims second - same rule as the Jobs moat PRD).
- Pricing-neutral public copy during beta.
- Naming registry and rename rule (section 1) bind all new features. "Members" is the reserved word if a workspace/org container materialises.
- No em dashes in code or content. Plain-English UI voice.
- Security lanes (credentials, auth, billing, DNS, migrations) require operator approval per FLEET_SYNC; vault crypto follows the approved Option C plan.
- Build with the fleet, verify with XPass, file human-needed steps as Jobs (Human) entries - the build process itself must dogfood the product.

## 9. Related repo documents (for the researcher with repo access)

`docs/prd/jobs-human-lane.md` (the moat seed), `docs/prd/connections-circle.md` (Circle + naming + sidebar IA), `docs/connections-ia.md` + `docs/prd/connections-apps-holistic.md` (Apps as THE list), `docs/connectors/connections-hardening-plan.md` (account-first identity, vault), `docs/prd/unclick-local-extension.md` (local lane), `docs/visibility-playbook.md` (go-to-market posture).
