# CompliancePass Framework Mapping

**Status:** Phase 0 evidence alignment. This is not certification, not a legal opinion, and not a control attestation.

CompliancePass is the official product name. Older EnterprisePass references describe the same product and should be treated as a legacy alias.

## Purpose

The original CompliancePass research asks the product to make repository evidence useful to three readers at once:

- an investor checking technical diligence risk
- an enterprise buyer checking security and operational maturity
- a founder or operator checking what to fix next

This mapping keeps that promise without overstating the result. CompliancePass maps evidence to external framework language, but it does not claim the target has passed any framework.

## Frameworks Named By The Research

| Framework or diligence lens | Current CompliancePass coverage | Current status |
| --- | --- | --- |
| ISO/IEC 27001:2022 | Security policy, workflow gates, dependency posture, credential hygiene, evidence trail, risk ownership docs | Partial evidence alignment |
| ISO/IEC 42001:2023 | AI provider inventory, human oversight, data/source notes, proof-first agent workflow | Partial evidence alignment |
| NIST SP 800-218 v1.1 | Build/test/lint proof, PR workflow gates, dependency audit notes, secure development evidence | Partial evidence alignment |
| OWASP SAMM v2 | Secure development checks, verification notes, SecurityPass linkage, vulnerability routing | Partial evidence alignment |
| OpenSSF Scorecard | Dependency update evidence, workflow checks, public receipt freshness, secret scanning posture | Thin alignment until a generated scorecard import exists |
| SLSA | CI and workflow evidence, package metadata, audit trail language | Thin alignment until provenance or build attestation evidence exists |
| SIG | Buyer diligence sections, documentation, security, ownership, and operational proof | Partial evidence alignment |
| CAIQ | Security, credential, data, AI provider, and governance notes | Partial evidence alignment |
| VC technical due diligence | License, repo metadata, large-file risk, test proof, audit trail, public receipts, dependency risk | Active evidence alignment |

## Current Check Family

| Original research category | Current CompliancePass implementation |
| --- | --- |
| C1 Code Maintainability | scripts, verification notes, TypeScript strictness, test-file shape, large-file risk register |
| C2 Secure SDLC | security policy, PR workflow gates, secret-scanning proof, dependency updates, dependency audit notes |
| C3 ISO-readiness indicators | this framework mapping plus security, governance, credential, and evidence checks |
| C4 Investor / Buyer Readiness | license, repository metadata, audit trail, framework mapping |
| C5 Documentation Quality | README, architecture docs, decision and runbook docs |
| C6 Comment / Code Style | currently covered indirectly by lint proof, large-file risk, and unsafe-claim wording checks |
| C7 Evidence-over-Claims | public receipts, safe claim wording, evidence-reference density, report integrity |

## Framework Control Index

| Framework | Control or question id | CompliancePass check id | Evidence path | Owner | Status | Last proof | Freshness window |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ISO/IEC 27001:2022 | A.5.1 / A.5.37 governance and documented procedures | cp-sec-policy, cp-doc-architecture | `docs/security/policies.md`, `docs/architecture/target-state.md` | SecurityPass lane | Evidence linked | 2026-05-27 | 30 days |
| ISO/IEC 27001:2022 | A.8.8 technical vulnerability management | cp-sec-dependency-audit-notes | `docs/compliancepass-dependency-audit-notes.md` | SecurityPass or dependency lane | Needs owner review | 2026-05-27 | 7 days |
| ISO/IEC 42001:2023 | AI system impact, provider, and oversight evidence | cp-ai-provider-inventory, cp-ai-oversight, cp-ai-data-notes | `docs/unclick-deep-context.md`, `docs/unclick-context-boot-packet.md` | AI governance lane | Evidence linked | 2026-05-27 | 30 days |
| NIST SP 800-218 v1.1 | PO.3, PS.3, PW.8, RV.1 secure development evidence | cp-code-scripts, cp-sec-workflow-gates, cp-sec-dependency-audit-notes | `package.json`, `.github/workflows/ci.yml`, `docs/compliancepass-verification-notes.md` | Build and SecurityPass lanes | Evidence linked with open dependency backlog | 2026-05-27 | 7 days |
| OWASP SAMM v2 | Implementation, verification, and operations readiness | cp-sec-policy, cp-sec-workflow-gates, cp-evidence-public-receipts | `docs/security/policies.md`, `.github/workflows/ci.yml`, `public/enterprise/latest.json` | SecurityPass lane | Evidence linked | 2026-05-27 | 30 days |
| OpenSSF Scorecard | Branch protection, dependency update, CI, secret scanning signals | cp-sec-dependency-updates, cp-sec-secret-scanning, cp-sec-workflow-gates | `.github/dependabot.yml`, `docs/security/current-posture.md`, `.github/workflows/ci.yml` | SecurityPass lane | Needs repo settings proof | 2026-05-27 | 7 days |
| SLSA | Build service, source control, and provenance evidence | cp-sec-workflow-gates, cp-evidence-report-integrity | `.github/workflows/ci.yml`, `public/enterprise/latest.json` | Build lane | Evidence linked; attestation follow-up open | 2026-05-27 | 30 days |
| SIG | Information security, privacy, AI governance, resiliency diligence | cp-sec-policy, cp-ai-data-notes, cp-doc-architecture, cp-investor-audit-trail | `docs/security/policies.md`, `docs/architecture/target-state.md`, `docs/decisions` | Investor readiness lane | Evidence linked | 2026-05-27 | 30 days |
| CAIQ | IAM, application security, data governance, change control, AI data handling | cp-sec-policy, cp-sec-workflow-gates, cp-ai-data-notes | `docs/security/policies.md`, `.github/workflows/ci.yml`, `docs/unclick-context-boot-packet.md` | Enterprise readiness lane | Evidence linked | 2026-05-27 | 30 days |
| VC technical due diligence | Repo maturity, license, tests, proof receipts, dependency risk, reviewability | cp-investor-license, cp-code-tests, cp-code-file-size, cp-evidence-public-receipts | `LICENSE`, `public/dogfood/latest.json`, `docs/compliancepass-large-file-risk-register.md` | Investor readiness lane | Evidence linked with reviewability follow-up | 2026-05-27 | 30 days |

## Known Follow-Up Evidence

- OpenSSF Scorecard output should be imported as a first-class evidence row.
- SLSA provenance or build-attestation evidence should be generated when the build lane is ready.
- SIG/CAIQ export files should be generated from the framework index.
- C6 comment/code-style coverage is still indirect until a dedicated scanner exists.
