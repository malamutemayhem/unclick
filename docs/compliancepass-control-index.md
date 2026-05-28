# CompliancePass Control Index

**Status:** Buyer-ready evidence index v1, refreshed 2026-05-28. This is readiness guidance, not certification, legal advice, or control attestation.

This is the source table behind `docs/compliancepass-framework-mapping.md`. Each row maps an external framework control or buyer question to a deterministic CompliancePass check, evidence path, owner, status, last proof date, and freshness window.

| Framework | Control or question id | CompliancePass check id | Evidence path | Owner | Status | Last proof | Freshness window |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ISO/IEC 27001:2022 | A.5.1 Policies for information security | cp-sec-policy | `SECURITY.md`, `docs/security/policies.md` | SecurityPass lane | Evidence linked | 2026-05-28 | 30 days |
| ISO/IEC 27001:2022 | A.5.2 Information security roles and responsibilities | cp-doc-architecture, cp-investor-audit-trail | `docs/fleet-worker-roles.md`, `docs/fleet-sync-checklist.md` | Fleet owner | Evidence linked | 2026-05-27 | 30 days |
| ISO/IEC 27001:2022 | A.5.7 Threat intelligence | cp-doc-architecture | `docs/security/threat-model.md`, `docs/security/current-posture.md` | SecurityPass lane | Evidence linked | 2026-05-28 | 30 days |
| ISO/IEC 27001:2022 | A.5.23 Information security for cloud services | cp-sec-policy, cp-cred-mapping | `docs/security/current-posture.md`, `docs/connectors/system-credentials-health-panel.md` | SecurityPass lane | Evidence linked | 2026-05-28 | 30 days |
| ISO/IEC 27001:2022 | A.5.24 Information security incident management planning | cp-doc-decisions-runbooks | `docs/runbooks/incident-response.md`, `docs/adr` | Operations lane | Evidence linked | 2026-05-27 | 30 days |
| ISO/IEC 27001:2022 | A.8.8 Management of technical vulnerabilities | cp-sec-dependency-audit-notes | `docs/compliancepass-dependency-audit-notes.md` | SecurityPass or dependency lane | Evidence linked; Moderate dev-tooling follow-up tracked | 2026-05-28 | 7 days |
| ISO/IEC 27001:2022 | A.8.25 Secure development life cycle | cp-sec-workflow-gates | `.github/workflows/ci.yml`, `.github/PULL_REQUEST_TEMPLATE.md` | Build lane | Evidence linked | 2026-05-27 | 14 days |
| ISO/IEC 27001:2022 | A.8.28 Secure coding | cp-code-tests, cp-code-lint | `package.json`, `docs/compliancepass-verification-notes.md` | Build lane | Evidence linked; repo lint exits clean with warning backlog tracked | 2026-05-28 | 7 days |
| ISO/IEC 42001:2023 | A.2 Policies related to AI | cp-ai-oversight | `AUTOPILOT.md`, `docs/unclick-context-boot-packet.md` | AI governance lane | Evidence linked | 2026-05-27 | 30 days |
| ISO/IEC 42001:2023 | A.3 Internal organization | cp-ai-oversight, cp-doc-architecture | `docs/fleet-worker-roles.md`, `FLEET_SYNC.md` | Fleet owner | Evidence linked | 2026-05-27 | 30 days |
| ISO/IEC 42001:2023 | A.4 Resources for AI systems | cp-ai-provider-inventory | `docs/unclick-deep-context.md`, `docs/unclick-context-boot-packet.md` | AI governance lane | Evidence linked | 2026-05-27 | 30 days |
| ISO/IEC 42001:2023 | A.5 AI system impact assessment | cp-ai-data-notes, cp-ai-oversight | `docs/unclick-deep-context.md`, `docs/prd/xpass.md` | AI governance lane | Evidence linked | 2026-05-27 | 30 days |
| ISO/IEC 42001:2023 | A.6 AI system life cycle | cp-ai-oversight, cp-evidence-public-receipts | `AUTOPILOT.md`, `public/dogfood/latest.json` | AI governance lane | Evidence linked | 2026-05-27 | 14 days |
| ISO/IEC 42001:2023 | A.7 Data for AI systems | cp-ai-data-notes, cp-cred-public-secret-hygiene | `docs/unclick-context-boot-packet.md`, `public/enterprise/latest.json` | AI governance lane | Evidence linked | 2026-05-27 | 14 days |
| ISO/IEC 42001:2023 | A.10 Third-party and customer relationship controls | cp-ai-provider-inventory, cp-cred-mapping | `docs/connectors/system-credentials-health-panel.md`, `docs/unclick-deep-context.md` | AI governance lane | Evidence linked | 2026-05-27 | 30 days |
| NIST SP 800-218 v1.1 final baseline | PO.1 Define security requirements for software development | cp-sec-policy, cp-sec-workflow-gates | `SECURITY.md`, `.github/PULL_REQUEST_TEMPLATE.md` | Build lane | Evidence linked | 2026-05-28 | 30 days |
| NIST SP 800-218 v1.1 final baseline | PO.3 Implement supporting toolchains | cp-code-scripts, cp-sec-workflow-gates | `package.json`, `.github/workflows/ci.yml` | Build lane | Evidence linked | 2026-05-27 | 14 days |
| NIST SP 800-218 v1.1 final baseline | PS.3 Archive and protect software release evidence | cp-evidence-public-receipts, cp-investor-audit-trail | `public/enterprise/latest.json`, `public/dogfood/latest.json` | Evidence lane | Evidence linked | 2026-05-27 | 7 days |
| NIST SP 800-218 v1.1 final baseline | PW.8 Reuse existing, well-secured software | cp-sec-dependency-updates, cp-sec-dependency-audit-notes | `.github/dependabot.yml`, `docs/compliancepass-dependency-audit-notes.md` | Dependency lane | Evidence linked; Moderate dev-tooling follow-up tracked | 2026-05-28 | 7 days |
| NIST SP 800-218 v1.1 final baseline | RV.1 Identify and confirm vulnerabilities on an ongoing basis | cp-sec-dependency-audit-notes, cp-sec-secret-scanning | `docs/compliancepass-dependency-audit-notes.md`, `docs/security/current-posture.md` | SecurityPass lane | Evidence linked; High/Critical audit blocker cleared | 2026-05-28 | 7 days |
| NIST SP 800-218A AI SSDF profile | AI software supply chain profile awareness | cp-ai-provider-inventory, cp-ai-oversight, cp-ai-data-notes | `docs/unclick-context-boot-packet.md`, `docs/unclick-deep-context.md`, `public/dogfood/latest.json` | AI governance lane | Final-profile evidence linked; not an attestation | 2026-05-28 | 30 days |
| OWASP SAMM v2 | Governance: Strategy and metrics | cp-investor-framework-mapping, cp-investor-audit-trail | `docs/compliancepass-framework-mapping.md`, `docs/compliancepass-control-index.md` | CompliancePass lane | Evidence linked | 2026-05-28 | 30 days |
| OWASP SAMM v2 | Design: Threat assessment | cp-doc-architecture | `docs/security/threat-model.md` | SecurityPass lane | Evidence linked | 2026-05-28 | 30 days |
| OWASP SAMM v2 | Implementation: Secure build | cp-sec-workflow-gates, cp-code-tests | `.github/workflows/ci.yml`, `package.json` | Build lane | Evidence linked | 2026-05-27 | 14 days |
| OWASP SAMM v2 | Verification: Security testing | cp-sec-secret-scanning, cp-sec-dependency-audit-notes | `docs/security/current-posture.md`, `docs/compliancepass-dependency-audit-notes.md` | SecurityPass lane | Evidence linked; High/Critical audit blocker cleared | 2026-05-28 | 7 days |
| OWASP SAMM v2 | Operations: Incident management and environment hardening | cp-doc-decisions-runbooks, cp-cred-rotation | `docs/runbooks/incident-response.md`, `docs/rotatepass-chunk-2-prd.md` | Operations lane | Evidence linked | 2026-05-27 | 30 days |
| OpenSSF Scorecard | Branch-Protection and CI-Tests signals | cp-sec-workflow-gates | `.github/workflows/ci.yml` | Build lane | Evidence linked | 2026-05-27 | 14 days |
| OpenSSF Scorecard | Dependency-Update-Tool signal | cp-sec-dependency-updates | `.github/dependabot.yml` | Dependency lane | Evidence linked | 2026-05-28 | 14 days |
| OpenSSF Scorecard | Token-Permissions and Secrets signals | cp-sec-secret-scanning, cp-cred-public-secret-hygiene | `docs/security/current-posture.md`, `ss_7915ye3zi` | SecurityPass lane | Proof linked | 2026-05-28 | 7 days |
| SLSA v1.2 latest specification | Source integrity and review evidence | cp-sec-workflow-gates, cp-investor-audit-trail | `.github/workflows/ci.yml`, `.github/PULL_REQUEST_TEMPLATE.md` | Build lane | Evidence linked | 2026-05-27 | 14 days |
| SLSA v1.2 latest specification | Build provenance and attestation | cp-evidence-report-integrity | `public/enterprise/latest.json` | Build lane | Follow-up routed | 2026-05-27 | 30 days |
| SIG | Security program and vulnerability management | cp-sec-policy, cp-sec-dependency-audit-notes | `SECURITY.md`, `docs/compliancepass-dependency-audit-notes.md` | Enterprise readiness lane | Evidence linked; Moderate dev-tooling follow-up tracked | 2026-05-28 | 7 days |
| SIG | Secure SDLC and change management | cp-sec-workflow-gates, cp-investor-audit-trail | `.github/workflows/ci.yml`, `.github/PULL_REQUEST_TEMPLATE.md` | Enterprise readiness lane | Evidence linked | 2026-05-27 | 14 days |
| SIG | AI governance and data handling | cp-ai-provider-inventory, cp-ai-data-notes | `docs/unclick-context-boot-packet.md`, `docs/unclick-deep-context.md` | Enterprise readiness lane | Evidence linked | 2026-05-27 | 30 days |
| CAIQ | AIS Application and interface security | cp-sec-policy, cp-code-tests | `SECURITY.md`, `package.json` | Enterprise readiness lane | Evidence linked | 2026-05-28 | 30 days |
| CAIQ | CCC Change control and configuration management | cp-sec-workflow-gates, cp-investor-audit-trail | `.github/workflows/ci.yml`, `.github/PULL_REQUEST_TEMPLATE.md` | Enterprise readiness lane | Evidence linked | 2026-05-27 | 14 days |
| CAIQ | DSI Data security and privacy | cp-cred-public-secret-hygiene, cp-ai-data-notes | `public/enterprise/latest.json`, `docs/unclick-context-boot-packet.md` | Enterprise readiness lane | Evidence linked | 2026-05-27 | 14 days |
| VC technical due diligence | License and repository metadata | cp-investor-license, cp-investor-repo-metadata | `LICENSE`, `package.json` | Investor readiness lane | Evidence linked | 2026-05-27 | 30 days |
| VC technical due diligence | Reviewability and maintainability | cp-code-file-size, cp-code-lint | `docs/compliancepass-large-file-risk-register.md`, `docs/compliancepass-verification-notes.md` | Investor readiness lane | Active medium gaps tracked | 2026-05-27 | 7 days |
| VC technical due diligence | Public proof and operating maturity | cp-evidence-public-receipts, cp-evidence-rendered-report-views | `public/dogfood/latest.json`, `public/enterprise/latest.*` | Investor readiness lane | Evidence linked | 2026-05-27 | 7 days |

## Follow-Up Export Queue

- Import raw OpenSSF Scorecard output as a first-class evidence artifact.
- Generate SLSA provenance or build-attestation evidence when the build lane is ready.
- Monitor NIST SP 800-218 Rev. 1 / SSDF v1.2 until final before making it the baseline.
- Generate SIG and CAIQ export files from this index.
- Add a dedicated C6 comment and code-style scanner so style coverage is no longer inferred from lint and file-size checks.
