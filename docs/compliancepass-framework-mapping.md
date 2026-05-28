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
| NIST SP 800-218 v1.1 final baseline | Build/test/lint proof, PR workflow gates, dependency audit notes, secure development evidence | Partial evidence alignment |
| NIST SP 800-218A AI SSDF profile | AI provider inventory, human oversight, data/source notes, proof-first agent workflow | Final-profile evidence alignment |
| OWASP SAMM v2 | Secure development checks, verification notes, SecurityPass linkage, vulnerability routing | Partial evidence alignment |
| OpenSSF Scorecard | Dependency update evidence, workflow checks, public receipt freshness, secret scanning posture | Thin alignment until a generated scorecard import exists |
| SLSA v1.2 latest specification | CI and workflow evidence, package metadata, audit trail language | Thin alignment until provenance or build attestation evidence exists |
| SIG | Buyer diligence sections, documentation, security, ownership, and operational proof | Partial evidence alignment |
| CAIQ | Security, credential, data, AI provider, and governance notes | Partial evidence alignment |
| VC technical due diligence | License, repo metadata, large-file risk, test proof, audit trail, public receipts, dependency risk | Active evidence alignment |

## Source Refresh

Framework language was refreshed on 2026-05-28 against official or primary sources: NIST SP 800-218 SSDF v1.1 final, NIST SP 800-218A AI SSDF profile final, OWASP SAMM, OpenSSF Scorecard, SLSA v1.2 latest specification and provenance guidance, CSA CAIQ, Shared Assessments SIG, ISO/IEC 27001:2022, and ISO/IEC 42001:2023. NIST also lists SP 800-218 Rev. 1 / SSDF v1.2 as a draft, so CompliancePass treats v1.1 as the SSDF final baseline, treats 218A as a final AI profile, and tracks v1.2 as a monitor item only. CompliancePass still presents evidence alignment only; it does not claim certification, attestation, or legal compliance.

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

The source control table now lives in `docs/compliancepass-control-index.md`.

That index includes:

- framework
- control or question id
- CompliancePass check id
- evidence path
- owner
- status
- last proof
- freshness window

The current index covers ISO/IEC 27001:2022, ISO/IEC 42001:2023, NIST SP 800-218 v1.1, NIST SP 800-218A, OWASP SAMM v2, OpenSSF Scorecard, SLSA v1.2, SIG, CAIQ, and VC technical due diligence.

## Known Follow-Up Evidence

- OpenSSF Scorecard output should be imported as a first-class evidence row.
- SLSA provenance or build-attestation evidence should be generated when the build lane is ready.
- NIST SP 800-218 Rev. 1 / SSDF v1.2 should be monitored until final before CompliancePass promotes it from draft context to baseline.
- SIG/CAIQ export files should be generated from the framework index.
- C6 comment/code-style coverage is still indirect until a dedicated scanner exists.
