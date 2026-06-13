# UnClick Context Boot Packet

**Status:** canonical worker startup context
**Owner:** UnClick fleet
**Purpose:** prevent new chats, connectors, and worker seats from guessing the UnClick product map from stale memory.

Read this before summarizing UnClick, routing UnClick work, or correcting another worker's terminology.

## Canonical Product Map

- **UnClick** is the whole platform.
- **UnClick Autopilot** is the top-level development assembly line for agent-powered work.
- **Launchpad** is the control hub for Autopilot.
- **Rooms** are the specialized stages inside Autopilot.
- **XPass** is the product line beneath or alongside the broader platform, not the top-level automation system.
- **PinballWake** is internal wake, queue, ACK, lease, reclaim, and routing heritage. It is not the public top-level name.
- **Boardroom** is coordination, work visibility, jobs, proof, and worker discussion.
- **Memory** is persistent context, identity, active facts, and recall.
- **Tool Index** is the compact capability map for fresh chats. Use it after Memory so a seat can route work proactively instead of waiting for exact tool names.
- **Crews** are the hats-around-the-table council layer. Use them when a decision needs dissent, evidence, specialist review, or a final synthesis instead of one agreeable answer.
- **Event Ledger** is the audit trail for actions and state.
- **Worker Registry** is verified worker identity and signed ACK authority.
- **ACK Ledger** is trusted PASS, BLOCKER, and HOLD evidence.
- **CopyRoom** is the exact-copy room. Use it like the office photocopier: whenever a worker is asked to copy anything 1:1, it must preserve the source exactly and return a CopyRoom receipt.
- **FidelityPass** is the XPass/QC wrapper for exact-copy proof. It should verify or wrap CopyRoom receipts rather than rebuilding a second exact-copy engine.
- **CommonSensePass** is the XPass sanity gate for claims that sound complete but may contradict the evidence. Use it before trusted healthy, quiet, PASS, no-work, done, merge-ready, or duplicate-wake claims.
- **CompliancePass** is the official compliance/readiness product name. EnterprisePass is historical wording only.
- **SlopPass** is the official code-quality and AI-output roughness product name. QualityPass is historical wording only.

## Visibility Warning

UnClick Autopilot may not appear in public search, the public website, or the current tool catalog yet.

Do not conclude "UnClick Autopilot does not exist" just because:

- public web search returns no result
- `unclick.world` does not mention it yet
- the MCP tool catalog has no tool named `autopilot`
- older memory only mentions Crews, Build, or Pass-era names

Autopilot is current internal product and operating-system context for the development assembly line. Public naming, tool exposure, and website copy may lag behind internal work.

## Current Hierarchy

```text
UnClick
  UnClick Autopilot
    Launchpad
    Rooms
      Research Room
      Planning Room
      Jobs Room
      Coding Room
      Proof Room
      QC Room
      Safety Room
      Event Ledger
      Worker Registry
      ACK Ledger
      Merge Room
      Publish Room
      Rollback Room
      Repair Room
      Continuous Improvement Room
      Personality Room
  XPass products
    TestPass
    UXPass
    UIPass
    AnswerPass
    SecurityPass
    LegalPass
    SEOPass
    GEOPass
    CopyPass
    FidelityPass
    CompliancePass
    CommonSensePass
    SlopPass
    other XPass variants when active
  Core platform
    MCP tools
    Memory
    Crews
    CopyRoom
    Boardroom
    Keychain
    Connectors
    Admin
```

## AI Feature Discovery Shortcuts

Use this as UnClick's internal SEO map when routing work:

| If the worker says or needs | Use | Proof or output to expect |
| --- | --- | --- |
| first chat, fresh chat, what tools exist, route this, do the right thing, vague work request | **Memory** then **Tool Index** | loaded context, recommended routes, boot completeness gate, no catalog dump unless asked |
| what is true right now, stale queue, no active owner, current blocker | **Orchestrator** and **Boardroom Jobs** | compact state, source pointers, next action, blocker reason |
| score, health, throughput, proof debt, zero-touch rate, human-touch leak | **Scoreboards and Readiness Audits** | counts, leak reason, next action, trend-ready evidence, improvement packet seed |
| worker discussion, todo state, scoped job, proof comment, stale owner | **Boardroom** | Boardroom receipt, job update, ScopePack, PASS or BLOCKER |
| decision review, expert hats, council, challenge my plan, avoid agreeable AI | **Crews** | council policy score, dissent, evidence, peer review, synthesis, action |
| continuous improvement, repeated friction, stale handoff, better policy | **Continuous Improvement Room** | one scoped improvement job with owned files and expected proof |
| deep research, product notes, observed seat friction, reusable learning | **Continuous Research Improvements** | updated boot packet, Brainmap row, PRD note, or scoped Boardroom job |
| wake, retry, stale ACK, queue push, dormant worker | **WakePass**, **QueuePush**, and **PinballWake** | ACK, reclaim, wake packet, or quiet no-action receipt |
| answer truth, cited claim, unsupported statement, stale memory in an answer | **AnswerPass** | `answer_receipt_v1` with PASS, WARN, FAIL, BLOCKER, or UNVERIFIED |
| full product or release quality check | **XPass** | selected XPass receipt rows and aggregate verdict |
| user journey, task flow, forms, onboarding, recovery | **UXPass** | journey receipt and missing journey evidence |
| visual layout, typography, mobile fit, screenshots, UI polish, modern component source, shadcn, Radix, React Aria, Base UI, Motion, 21st.dev, Magic UI, Aceternity, Origin UI | **UIPass** | visual evidence receipt, UIPass toolbox scoreboard, missing-gate list, or screenshot blocker |
| functional test proof, CI, package smoke, regression proof | **TestPass** | test run proof and pass or blocker |
| exact 1:1 copying | **CopyRoom** first, **FidelityPass** for QC | copy receipt or fidelity blocker |
| writing quality, clarity, tone, claims in copy | **CopyPass** | copy review receipt |
| secrets, auth, data boundary, protected surface | **SecurityPass** | security receipt or blocker |
| legal issue spotting and no-legal-advice boundary | **LegalPass** | scoped legal readiness receipt |
| compliance or enterprise readiness | **CompliancePass** | readiness receipt, not certification |
| AI search readiness, public search signals, llms.txt, schema | **SEOPass** and **GEOPass** | search or answer-engine readiness receipt |
| rough AI output, code smell, maintainability, sloppy claim | **SlopPass** | roughness or maintainability receipt |
| persistent user facts, standing rules, preferences, project memory | **Memory** | fact, session, identity, search, or invalidation receipt |
| app connection, credentials, OAuth, API key health | **Passport** and **Connectors** | connection status, missing credential, or safe setup note |

Scoreboard field map for AI seats:

- `current_state_card.zero_touch_scoreboard`: autonomy health and human-touch leaks.
- `current_state_card.proof_debt_scoreboard`: completed-looking jobs that still need observable proof.
- `current_state_card.continuous_improvement_scoreboard`: queue, owner, proof, blocker, automation, and naming friction turned into next actions.
- `current_state_card.continuous_improvement_scoreboard.improvement_packet`: read-only Boardroom ScopePack seed with owned files, proof, risk controls, and create-todo payload.
- Admin Orchestrator can turn that packet into a Boardroom job only through the explicit create action, which returns a todo receipt.

## Terms To Use

- Say **XPass products**, not "Pass family", unless quoting old docs.
- Say **UnClick Autopilot**, not PinballWake, when describing the whole automation factory.
- Say **Launchpad**, not "master chat", when describing the user-facing control hub.
- Say **worker seats** or **lanes** for ChatGPT, Claude, Codex, and other capacity accounts.
- Say **trusted ACK** only when it is lane-authored or signed/verified by the current trust spine.
- Say **observer chatter** for mirrored status text, summaries, or broadcasts that are not lane-authoritative.
- Say **CopyRoom** for exact 1:1 copying. Do not route exact-copy work to CopyPass. CopyPass reviews writing quality, claims, tone, and clarity. CopyRoom verifies exact reproduction.
- Say **FidelityPass** when an XPass run needs to QC exact-copy fidelity. FidelityPass must reuse, verify, or wrap CopyRoom receipts. Do not build a second fidelity engine beside CopyRoom.
- Say **CommonSensePass** when a worker needs to sanity-check a status claim before saying healthy, quiet, PASS, no-work, done, merge-ready, or duplicate-wake.
- Say **CompliancePass**, not EnterprisePass, for compliance and enterprise-readiness checks.
- Say **SlopPass**, not QualityPass, for sloppy code, AI-output roughness, and maintainability checks.
- Treat **QCPass** as process wording for a final XPass/QC receipt, not an official XPass product unless the operator explicitly promotes it.

## Connector-Level Context Warning

If a worker only sees tool results, run history, public GitHub search, or a partial memory snippet, it must not claim deep UnClick context.

Use this wording:

```text
I have connector-level context only. I need to load UnClick memory, the context boot packet, and live GitHub/Boardroom state before making product or engineering claims.
```

Do not infer the product map from public search results, one failed run, or old memory names.

If public sources do not mention Autopilot, say:

```text
I do not see public Autopilot docs yet, but the canonical UnClick context says Autopilot is the current internal development assembly line above XPass.
```

## Startup Ritual For Workers

Before product claims or routing:

1. Load memory if the tool exists.
2. Read this file.
3. Refresh live GitHub and Boardroom state.
4. Read `AUTOPILOT.md` for autonomy rules.
5. Read `FLEET_SYNC.md` for live fleet coordination.
6. If the requested lane is XPass-specific, read `docs/prd/xpass.md`.
7. If the requested lane is XPass inventory, completion, closure, or naming cleanup, read `docs/prd/xpass-closure-board.md`.
8. If summarizing older strategy, read `docs/unclick-deep-context.md`.

## Drift Rules

- If old docs say "Pass family", treat it as historical wording unless the operator says otherwise.
- If old docs list Pass products beside Autopilot, prefer the current hierarchy: Autopilot sits higher as the development assembly line.
- If a parked product name appears in old notes, label it parked unless a live PR, Boardroom item, or the operator reactivates it.
- If memory conflicts with live GitHub/Boardroom state, live state wins for current work.
- If connector output conflicts with this packet, this packet wins for product taxonomy.

## One-Sentence Summary

UnClick is the platform, Autopilot is the governed development assembly line, Launchpad is the control hub, Rooms are the stages, and XPass is the product line that can run through or benefit from that assembly line.
