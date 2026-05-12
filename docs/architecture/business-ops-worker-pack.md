# Business Ops Worker Pack

**Status**: Draft lane charter
**Last updated**: 2026-05-10 UTC
**Linked todo**: `f5d4bcd5-acc3-476b-91fd-5f740a6a1116`
**Scope**: non-destructive business operations lanes for product focus, user pain, privacy, cost, UX, incidents, knowledge, growth, integrations, and legal/IP scouting

## Purpose

Business Ops gives UnClick the useful parts of a lightweight company operating system without adding bureaucracy. These lanes help agent seats notice product, customer, privacy, cost, UX, incident, docs, growth, integration, and IP risks early, then turn them into concise findings or manageable tickets.

This charter does not change runtime worker routing, production config, billing, auth, DNS, secrets, analytics, or customer data handling. It only defines safe operating lanes and proof rules.

## Operating Contract

Every Business Ops worker follows the same receipt shape:

| Receipt | Meaning | Required proof |
| --- | --- | --- |
| `PASS` | A bounded read-only or docs step completed safely | Todo comment, report path, PR, or source-linked proof |
| `BLOCKER` | The worker stopped for a safety or scope reason | Exact reason, last checked source, next recommended fix |
| `HOLD` | A human or owner decision is needed | Decision point, options, and why the worker should not choose |
| `COMMENT` | A finding, ScopePack, or route recommendation was added | Comment id, linked todo, or report path |

Receipts must state cleanup status for temp rows, proof agents, one-time schedules, leases, local scratch files, and branches.

## Lane Summary

| Lane | Trigger | Owner skill | Allowed data | Prohibited mutations | Proof receipt | Escalation rule |
| --- | --- | --- | --- | --- | --- | --- |
| Product Steward | Roadmap drift, competing priorities, vague feature requests, broad parent cards | Product strategy, prioritisation, scope slicing | Public docs, Boardroom todos, PRDs, issue/todo metadata, shipped UI paths | Product strategy commitments, pricing, public roadmap promises, feature merges | Ranked product focus note or child chip list | Escalate when the answer decides company direction, pricing, or major sequencing |
| Customer Advocate | User pain, confusing flows, repeated support-like signals, wrong-time or wrong-context messages | User empathy, workflow diagnosis, support synthesis | User-provided messages, public UI, anonymised receipts, admin screenshots supplied by Chris | Private customer data access, direct user outreach, account changes | Pain-to-ticket map or UX support finding | Escalate if private customer records, live messaging, refunds, or account actions are needed |
| Privacy/Compliance Steward | Memory, export, delete, consent, retention, admin gating, profile context, local time handling | Privacy review, compliance triage, data minimisation | Docs, schemas, visible UI copy, read-only code, todo context | Legal advice claims, policy commitments, auth changes, destructive data actions | Privacy risk note, consent checklist, or scoped safety todo | Escalate for legal interpretation, customer data, precise location, billing, auth, or deletion flows |
| Cost Steward | AI spend, infrastructure cost, dependency cost, paid API calls, Vercel or provider usage concerns | Cost triage, vendor inventory, default-off policy | Config names, docs, package metadata, non-secret usage summaries, CI logs | Paid calls, billing settings, plan changes, secrets, provider mutations | Cost risk note or default-off guardrail chip | Escalate for billing changes, provider account access, paid experiments, or commercial commitments |
| UX Steward | Non-coder friction, admin complexity, confusing copy, visual regressions, setup pain | Product UX, content design, accessibility triage | Public and admin UI surfaces, screenshots, copy, docs, route maps | Direct production copy deploy without PR, dark-pattern changes, user messaging automation | UX sweep note, copy chip, or screenshot-backed issue | Escalate when UX change affects pricing, legal copy, auth, billing, or core positioning |
| Incident Steward | Failed automation, stale proof, broken scheduled run, repeated CI failure, wake routing issue | Incident triage, calm receipt writing, next-step routing | GitHub Actions status, PR checks, Boardroom receipts, public run ids, read-only logs | Manual workflow proof counted as scheduled proof, production mutation, secrets printing | Incident receipt with latest run ids and next fix | Escalate for secret exposure, production outage, data loss, auth incident, or destructive recovery |
| Knowledge Steward | Docs drift, onboarding confusion, stale PRDs, missing handoff context | Documentation, onboarding, memory hygiene | Docs, PRDs, architecture maps, memory summaries, todo comments | Raw secret capture, private credential capture, broad doc rewrites | Docs health note or compact handoff update | Escalate if source truth conflicts or raw private data would need capture |
| Growth Steward | Positioning, funnel clarity, marketplace launch readiness, messaging gaps | Positioning, GTM review, narrative clarity | Public site copy, PRDs, product positioning docs, non-private analytics summaries | Paid ad changes, public claims, pricing changes, customer outreach | Positioning note or small copy/PRD chip | Escalate for public launch promises, pricing, partnerships, or legal claims |
| Integration Steward | Connector priority, app marketplace gaps, OAuth setup complexity, tool catalog health | Integration prioritisation, connector UX, dependency mapping | Connector docs, package metadata, public platform docs, tool catalog summaries | OAuth credential changes, secret access, live connector mutations, production config | Connector priority note or setup-risk chip | Escalate for auth scopes, partner contracts, app review submissions, or credentials |
| Legal/IP Scout | Licensing, attribution, trademark, marketplace submissions, copied content risks | Issue spotting, not legal advice | Package licenses, public docs, PR text, marketplace submission metadata | Legal advice, contract commitments, takedown action, license acceptance | IP risk note with "not legal advice" caveat | Escalate for counsel review, contract terms, infringement claims, or public legal statements |

## Lane Details

### Product Steward

Product Steward keeps broad energy pointed at small, shippable work. It is allowed to split parent jobs into child chips, rank product risks, and challenge vague scopes. It is not allowed to decide company strategy alone.

Default outputs:

- roadmap focus note;
- parent-to-child chip breakdown;
- blocker when a priority decision needs Chris.

### Customer Advocate

Customer Advocate turns user pain into tickets without accessing private customer records. It can use messages Chris provides, public UI, screenshots, and anonymised receipts.

Default outputs:

- pain-to-ticket map;
- confusing-flow finding;
- support-pattern note with source links.

### Privacy/Compliance Steward

Privacy/Compliance Steward protects data minimisation and consent boundaries. It should prefer timezone-level context, broad consent checks, and export/delete risk notes over any precise location or raw private capture.

Default outputs:

- privacy checklist;
- data-minimisation note;
- scoped safety chip.

It must never claim to provide legal advice.

### Cost Steward

Cost Steward keeps UnClick from accidentally turning on expensive behavior. It looks for paid calls, provider usage, package growth, and default-on risk.

Default outputs:

- cost inventory;
- default-off paid-call guardrail;
- provider risk note.

It may not change billing plans or run paid experiments.

### UX Steward

UX Steward protects the non-coder experience. It focuses on setup flows, admin clarity, simple language, visible status, and reduced user confusion.

Default outputs:

- UX sweep note;
- copy chip;
- screenshot-backed issue.

### Incident Steward

Incident Steward handles automation and proof incidents calmly. It reads the latest safe run ids, identifies stale proof, and routes the next fix. It does not mutate production or count manual GitHub dispatches as scheduled proof when scheduled proof is required.

Default outputs:

- incident receipt;
- latest run id summary;
- fallback path recommendation.

### Knowledge Steward

Knowledge Steward keeps docs, memory, and handoffs from drifting. It should create compact current-state context with source links, not raw dumps.

Default outputs:

- docs health note;
- handoff update;
- missing-source chip.

### Growth Steward

Growth Steward keeps positioning and funnel work tied to the platform thesis: MCP-first infrastructure, persistent memory, credential vault, crews, Pass family, worker orchestration, and marketplace.

Default outputs:

- positioning risk note;
- funnel clarity chip;
- public-copy review with caveats.

### Integration Steward

Integration Steward watches connector priorities and setup friction. It can propose connector chips, OAuth setup risks, and tool catalog priorities without touching credentials.

Default outputs:

- connector priority list;
- OAuth friction note;
- integration setup chip.

### Legal/IP Scout

Legal/IP Scout spots licensing, attribution, trademark, marketplace submission, and copied-content risks. It must include "not legal advice" whenever a finding could look legal.

Default outputs:

- IP risk note;
- license inventory chip;
- counsel-escalation note.

## How Business Ops Feeds Other Systems

### Boardroom

Business Ops writes concise findings and manageable tickets into Boardroom. It should not create broad strategy cards unless the child work is already split.

### Quality Ops

Quality Ops handles engineering health and cleanup execution. Business Ops feeds it with user, privacy, cost, UX, incident, and knowledge signals that need technical follow-through.

### Worker Registry

Worker Registry remains the source of truth for worker activation. Business Ops contributes lane definitions, skill tags, receipt standards, and safe escalation rules. This charter does not register new runtime workers.

### Performance Monitor

Performance Monitor supplies repeated failures, stale automation, slow queues, cost signals, and UX friction. Business Ops converts those into incident, cost, UX, or product tickets.

### Safety Checker

Safety Checker owns high-risk gates. Business Ops must escalate before auth, billing, DNS, secrets, customer data, production mutation, deletion, legal commitments, public claims, or live user messaging.

### Specialist Bench

Specialist Bench can supply domain expertise for privacy, legal/IP, growth, integration, UX, and customer research. Business Ops should call bench specialists only after the task has a ScopePack and safe data boundaries.

### PR Checklist Gates

Business Ops recommends this advisory checklist for PR descriptions and reviews:

> Business impact check: list the user, privacy, cost, UX, incident, or growth risk this PR affects. Confirm the patch does not touch billing, auth, DNS, secrets, customer data, public claims, or live user messaging unless that risk is explicitly scoped and approved.

## First Safe Child Chips After Approval

1. `Business Ops: Product Steward roadmap focus receipt v1`
   - Build goal: create a template for turning broad parent jobs into ranked child chips.
   - Owned files: docs or todo comments only.
   - Proof: template path or comment id.

2. `Business Ops: Privacy/Compliance consent checklist v1`
   - Build goal: document checks for local time, timezone, memory capture, export, delete, and profile context.
   - Owned files: docs only.
   - Proof: docs PR with no runtime changes.

3. `Business Ops: Cost Steward paid-call inventory v1`
   - Build goal: inventory where paid providers could be triggered and confirm default-off expectations.
   - Owned files: docs only unless a later ScopePack names code.
   - Proof: source-linked inventory.

4. `Business Ops: UX Steward non-coder setup sweep v1`
   - Build goal: inspect the setup and admin surfaces for confusing copy and missing status.
   - Owned files: docs or one small UI copy surface if scoped.
   - Proof: screenshot-backed findings or focused copy PR.

5. `Business Ops: Incident Steward proof receipt template v1`
   - Build goal: standardise automation incident receipts with latest run ids, stale-proof status, fallback path, and next fix.
   - Owned files: docs only.
   - Proof: template path.

6. `Business Ops: Integration Steward connector priority map v1`
   - Build goal: map connector demand to setup friction and safe next chips.
   - Owned files: docs only.
   - Proof: priority map with no credential access.

## Non-Goals

- No production config changes.
- No secrets, auth, billing, DNS, or customer-data access.
- No live user messaging automation.
- No runtime worker routing or registry behavior changes.
- No new incident runner behavior.
- No public legal advice or legal commitments.
- No pricing, roadmap, or partnership commitments.
- No release action or merge from this charter.

## Suggested Acceptance

This charter is complete when:

1. each Business Ops lane has a trigger, owner skill, allowed data, prohibited mutations, proof receipt, and escalation rule;
2. the charter explains how Business Ops feeds Boardroom, Quality Ops, Worker Registry, Performance Monitor, Safety Checker, Specialist Bench, and PR checklist gates;
3. the first safe child chips are listed but not activated;
4. the only repo change is this docs charter.
