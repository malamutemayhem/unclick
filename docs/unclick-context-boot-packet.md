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
- **Fishbowl** is coordination and work visibility.
- **Memory** is persistent context, identity, active facts, and recall.
- **Event Ledger** is the audit trail for actions and state.
- **Worker Registry** is verified worker identity and signed ACK authority.
- **ACK Ledger** is trusted PASS, BLOCKER, and HOLD evidence.
- **CopyRoom** is the exact-copy office copier for 1:1 copying, transcription, mirroring, and source preservation.
- **FidelityPass** is the XPass/QC wrapper over CopyRoom receipts. It does not duplicate CopyRoom.
- **CopyPass** checks wording quality, claims, tone, and clarity.
- **CommonSensePass** is the sanity gate for false healthy, false done, false quiet, stale proof, and rubber-stamp claims.
- **CompliancePass** is the official compliance and enterprise-readiness Pass. EnterprisePass is historical wording only.
- **SlopPass** is the official AI-quality and slop-signal Pass. QualityPass is historical wording only.

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
    SecurityPass
    LegalPass
    CopyPass
    FidelityPass
    SEOPass
    GEOPass
    CompliancePass
    CommonSensePass
    SlopPass
    other XPass variants when active
  Core platform
    MCP tools
    Memory
    Fishbowl
    CopyRoom
    Keychain
    Connectors
    Admin
```

## Terms To Use

- Say **XPass products**, not "Pass family", unless quoting old docs.
- Say **UnClick Autopilot**, not PinballWake, when describing the whole automation factory.
- Say **Launchpad**, not "master chat", when describing the user-facing control hub.
- Say **worker seats** or **lanes** for ChatGPT, Claude, Codex, and other capacity accounts.
- Say **trusted ACK** only when it is lane-authored or signed/verified by the current trust spine.
- Say **observer chatter** for mirrored status text, summaries, or broadcasts that are not lane-authoritative.
- Say **CopyRoom** for exact 1:1 copy work and **FidelityPass** for the XPass receipt that verifies CopyRoom evidence.
- Say **CommonSensePass** when checking whether a status claim is actually sensible.
- Say **CompliancePass**, not EnterprisePass, unless explaining historical aliases.
- Say **SlopPass**, not QualityPass, unless explaining historical aliases.
- Treat **QCPass** as process wording for a final XPass/QC receipt, not an official XPass product unless Chris explicitly promotes it.

## Connector-Level Context Warning

If a worker only sees tool results, run history, public GitHub search, or a partial memory snippet, it must not claim deep UnClick context.

Use this wording:

```text
I have connector-level context only. I need to load UnClick memory, the context boot packet, and live GitHub/Fishbowl state before making product or engineering claims.
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
3. Refresh live GitHub and Fishbowl state.
4. Read `AUTOPILOT.md` for autonomy rules.
5. Read `FLEET_SYNC.md` for live fleet coordination.
6. If the requested lane is XPass-specific, read `docs/prd/xpass.md`.
7. If the requested lane is XPass inventory, completion, closure, or naming cleanup, read `docs/prd/xpass-closure-board.md`.
8. If summarizing older strategy, read `docs/unclick-deep-context.md`.

## Drift Rules

- If old docs say "Pass family", treat it as historical wording unless Chris says otherwise.
- If old docs list Pass products beside Autopilot, prefer the current hierarchy: Autopilot sits higher as the development assembly line.
- If a parked product name appears in old notes, label it parked unless a live PR, Fishbowl item, or Chris reactivates it.
- If memory conflicts with live GitHub/Fishbowl state, live state wins for current work.
- If connector output conflicts with this packet, this packet wins for product taxonomy.

## One-Sentence Summary

UnClick is the platform, Autopilot is the governed development assembly line, Launchpad is the control hub, Rooms are the stages, and XPass is the product line that can run through or benefit from that assembly line.
