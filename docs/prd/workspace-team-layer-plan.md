# Workspace Team Layer: the staged build plan and scope contract

Status: operator-approved build direction, 2026-06-12. This is the buildable companion to `docs/prd/workspace-team-layer-brief.md` (the strategy capsule) and `docs/workspace-simple-laws.md` (the UX gate).
Decisions below were made by the operator in the planning thread on 2026-06-12. Do not relitigate them in build PRs; flag new evidence in the Boardroom instead.

## The one-paragraph version

UnClick enters the workspace category as the verification-and-attribution layer over a bring-your-own-AI stack. We build the daily-use 80/20 natively on the existing substrate (jobs with proof, Boardroom, memory, seats, Circle) and we aggregate calendar, email, and incumbent task tools instead of owning them. Two moats, working together: proof that work is real, and screens a brand-new person can use with zero documentation.

## Locked decisions (operator, 2026-06-12)

- **Inbox is its own surface**, separate from Signals, and serves both humans (admin UI) and agents (MCP). Signals stays UnClick's own alert bus and is never an aggregator.
- **Stage 0 approved:** Google and Microsoft OAuth join the Connections flow. Security lane rules apply (operator approval given for the lane; credential code still follows the hardening plan).
- **Today strip lands on the existing Dashboard**, which also gets a tidy-up.
- **Chat (Human to Human) is planned.** Hard rule: no AI subscription bots in Chat, ever (tried before, failed). AI joins only as API seats, summoned by @-mention or by tapping the seat in the members rail, governed from Agents > Seats > API with SpendGate in the loop. Default OFF per seat.
- **One owner per job.** The independent verifier is the second person. No multiple assignees.
- **Simplicity is a moat.** The Simple Laws gate every workspace screen.
- Build order: Circle first (unblocks attribution and Chat), native Jobs chips and Calendar in parallel, then Inbox, then Jobs Bridge, then Chat.

## Stages

| Stage | What ships | Notes |
|---|---|---|
| 0 | Google + Microsoft OAuth in Connections; calendar and mail read connectors | Embed permissive libraries only (rrule.js wrapped, ICAL.js, tsdav, ImapFlow). Never AGPL. Existing IMAP/SMTP email tool stays as the long-tail fallback |
| 1 | Circle + You Profile (name + thumbnail) | Per `docs/prd/connections-circle.md`, already greenlit |
| 2a | Native Jobs 80/20 chips | Due dates (first chip, shipped with this plan), My Jobs / Today view, quick-add (shipped with this plan), checklists, project grouping, recurring later |
| 2b | Calendar read layer at /admin/calendar | Merged Day/Week view across all connected accounts, duplicate collapse, source badges, timezone and location aware. Read first; write-back waits |
| 3 | Inbox at /admin/inbox | Merged mail triage: read, Assign (human or AI seat), Make a Job, Archive. Reply deep-links back to the provider; UnClick never sends mail |
| 4 | Four-way Jobs matrix finish + Jobs Bridge | Circle "can assign me jobs" toggle; face + seat attribution on every assignment; live read layer over Asana, ClickUp, monday, Todoist, Trello, Linear, Jira, Notion, Shortcut via existing connectors with promote-to-verified-Job |
| 5 | Chat | Channels, DMs, threads, search, @mentions. Nothing else. Requires Circle |
| each | Today strip grows one tile per stage on the Dashboard | The first tile ships with the Dashboard tidy-up |

Dogfood gate between every stage: the internal team runs a full week with zero fallback for that surface's core loop, with XPass receipts on the build, before the next stage starts or any public claim is made.

## Admin tree (target state)

```text
Dashboard                      Today strip (calendar / inbox / jobs due) + tidy-up

HUMAN
├── You                        Profile (name + thumbnail) NEW, Keys, AI Style
├── Memory                     unchanged
├── Orchestrator               unchanged
├── Connections                Apps (+ Google, Microsoft OAuth) / Circle NEW / Health NEW
├── Calendar                   NEW merged read view, Day / Week
├── Inbox                      NEW merged mail triage, humans in UI + agents via MCP
├── Chat                       NEW human-to-human; API seats only via @-mention
├── Jobs (Human)               + due dates, quick-add, attribution, Bridge tasks
├── Signals                    unchanged: UnClick's own alerts only
├── Settings / Billing         unchanged

AGENTS                         unchanged, except Seats > API gains the
                               per-seat "Can join Chat when @-mentioned" toggle

ADMIN (internal)               unchanged
```

## Naming (rename-safe rule applies)

New display names live only in `src/config/product-names.ts`; internal identifiers stay neutral.

| Display name | Internal identifiers | Notes |
|---|---|---|
| Calendar | `calendar_events`, `/api/calendar-*` | Plain English wins |
| Inbox | `mail_threads`, `/api/mail-*` | "Signals" stays reserved for UnClick's own bus |
| Chat | `chat_channels`, `chat_messages`, `/api/chat-*` | Rooms, Boardroom, Crews, Circle, Seats, Members all stay reserved |

## Feature scope matrix (the contract)

Status keys: SHIPPED (exists today), BUILD (in the staged plan), IDEA (approved idea pass, slots when its stage lands), LATER (agreed but explicitly after dogfood), OUT (deliberately refused; needs operator decision to revisit).

### Tasks core
| Feature | Status |
|---|---|
| Tasks with a named owner | SHIPPED |
| Due dates + reminders | BUILD (2a; due dates shipped with this plan, Signals reminders to follow) |
| My Jobs / Today view | BUILD (2a) |
| Quick add | BUILD (2a; shipped with this plan) |
| Subtasks / checklists | BUILD (2a) |
| Recurring jobs | BUILD (2a, later chip; reuse the wrapped recurrence library from Calendar work) |
| Projects / grouping for the human lane | BUILD (2a) |
| Sections, priorities, comments, proof states, approvals-as-gates | SHIPPED |
| @mentions in job comments | BUILD (with Chat stage) |
| File attachments on jobs | BUILD (minimal) |
| Task dependencies | LATER (parked; revisit only if dogfood screams) |
| Multiple assignees | OUT (one owner + independent verifier) |
| Start dates, custom fields, template galleries, time tracking, goals/OKRs, workload view, milestones | OUT |

### Views
| Feature | Status |
|---|---|
| List view, agent kanban | SHIPPED |
| Board toggle for human lane | BUILD (2a) |
| Jobs with due dates appear on Calendar | BUILD (2b) |
| Timeline/Gantt, spreadsheet view, mind maps, whiteboards, custom dashboards | OUT |

### Chat and communication
| Feature | Status |
|---|---|
| Channels, DMs, threads, @mentions, search | BUILD (5) |
| Emoji reactions | BUILD (5; it is how humans say "seen") |
| File sharing in chat (minimal) | BUILD (5) |
| Human presence | LATER (Yjs, only if pulled) |
| Huddles, video calls, screen share, clips, canvas, external guest access | OUT |

### Calendar and scheduling
| Feature | Status |
|---|---|
| Merged Day/Week view, duplicate collapse, timezones and locations | BUILD (2b) |
| Event reminders via Signals | BUILD (2b) |
| Accept/decline invites, create/reschedule, find-a-time | LATER (write-back wave, after the read layer proves) |
| Booking pages, auto meeting links | OUT until pulled |

### Email and inbox
| Feature | Status |
|---|---|
| Unified inbox, triage (Assign / Make a Job / Archive), email becomes a job | BUILD (3) |
| Email-in capture address | IDEA (rides 3) |
| Snooze | LATER |
| Sending or replying inside UnClick | OUT (deep-link back; the provider keeps deliverability) |
| Hosting email or CalDAV | OUT permanently |

### Docs and knowledge
| Feature | Status |
|---|---|
| Notes, files, library | SHIPPED (Memory) |
| Forms / intake that create jobs | LATER (research phase two) |
| AI meeting notes that become jobs | IDEA (aggregate via existing transcription connector; no video product) |
| Full docs/wiki editor, databases | OUT |

### Automation, AI, reporting
| Feature | Status |
|---|---|
| Agents as teammates, automations-as-agents, audit ledger | SHIPPED |
| Morning Brief (Today strip card) | IDEA (top pick) |
| Status that writes itself (from receipts) | IDEA (top pick) |
| Ask the workspace (cross-surface plain-English answers) | IDEA (top pick, next wave) |
| Agent timesheet (what my AI did this week and cost) | IDEA (next wave) |
| Switch-from-Asana coexistence wizard | IDEA (rides 4) |
| Bundled AI assistant | OUT (bring-your-own-AI is the moat) |
| Dashboards, charts, time reports | OUT |

### People, capture, platform
| Feature | Status |
|---|---|
| Profiles with faces | BUILD (1) |
| Sharing permissions (both-sides opt-in) | BUILD (1, Circle) |
| Live import bridge from incumbent task tools | BUILD (4) |
| Workspaces / org container | OUT (the word "Members" stays reserved for it) |
| Mobile apps, offline | OUT for now (web core loop first) |

## Constraints carried from the brief (non-negotiable)

- Truth-locked claims only; public surfaces stay pricing-neutral in beta; no public comparison claims until the lane works in-house.
- Naming registry and the rename rule bind every new feature.
- No em dashes in code or content. Plain-English UI voice (see Simple Laws).
- Security lanes (credentials, auth, billing, DNS, migrations) follow FLEET_SYNC approval rules.
- Build with the fleet, verify with XPass, file human-needed steps as Jobs (Human). The build process dogfoods the product.
