# CompliancePass Product Brief

## Positioning

CompliancePass is the public name for the old EnterprisePass readiness lane.

It helps a founder, builder, investor, or future enterprise buyer answer:

> Are we building in a way that will age well, or are we creating avoidable regret?

CompliancePass is not a compliance certificate, SOC report, ISO audit, legal opinion, or substitute for a qualified auditor. It is a guidance and evidence layer that points teams toward better foundations before those foundations become expensive to change.

## Short Definition

CompliancePass scans a product, repo, and operating surface, then produces an evidence-backed readiness report with traffic-light findings, plain-English risk notes, and practical next steps.

Historical `EnterprisePass` references should be treated as this same product lane.

## Phase 0 Scope

Phase 0 is deliberately small and evidence-led:

- static repo/docs scan
- workflow and package metadata checks
- links to existing Pass receipts
- traffic-light report JSON
- plain-English gaps and next actions
- conservative exclusions

Phase 0 avoids:

- formal ISO/SOC conclusions
- legal or audit conclusions
- network security probing
- raw secret storage
- customer-facing certification claims
- pretending unknown evidence is a pass

## Report Shape

The first useful artifact remains:

`public/enterprise/latest.json`

The path keeps the old EnterprisePass folder for link stability. The product field inside the JSON is `CompliancePass`.

The generator also publishes human-readable sibling views:

- `public/enterprise/latest.md`
- `public/enterprise/latest.html`

Every report includes:

1. Readiness score.
2. Evidence pointers.
3. Gaps.
4. Next actions.
5. Future-regret notes.
6. Exclusions.
7. Disclaimer.

## Relationship To Other XPass Products

CompliancePass should not duplicate the specialist logic of other XPass products. It should collect, summarize, and cross-reference their evidence.

| Product | CompliancePass Uses It For |
| --- | --- |
| TestPass | proof that checks actually run |
| SecurityPass | security hygiene findings and scope-gated security evidence |
| SlopPass | code quality, structure, comment quality, maintainability concerns |
| LegalPass | risky claims, disclaimers, jurisdiction-sensitive wording |
| RotatePass | credential ownership, staleness, rotation blast radius |
| WakePass | action-needed handoffs for failed or stale evidence |
| XPass | combined run receipt when multiple Pass checks are needed |

## Naming Guardrail

Use:

- CompliancePass
- CompliancePass report
- readiness indicator
- evidence alignment
- future-regret risk

Do not use:

- certified
- audit passed
- ISO approved
- SOC ready as a guarantee
- legally safe
- enterprise certified

Allowed phrasing:

> CompliancePass highlights readiness gaps and evidence.

Disallowed phrasing:

> CompliancePass certifies your startup is enterprise compliant.
