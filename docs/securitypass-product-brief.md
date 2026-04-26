# SecurityPass Product Brief
## Codename HackPass (internal). External brand SecurityPass.

**Slogan:** The quality gate for security.

**Positioning:** AI-native security at indie price. The $15-$200 USD/mo band is empty for paid plans with consolidated coverage. Lakera/Protect AI acquired into enterprise. Snyk caps at 10 devs. StackHawk has 20-dev floor. Aikido starts at $350. SecurityPass owns the gap.

**Forks (5 OSS bases):**
- Gitleaks (MIT) - secrets scanning
- OSV-Scanner (Apache 2.0, Google) - dependency CVEs
- Garak (Apache 2.0, NVIDIA) - LLM red-team probes
- PyRIT (MIT, Microsoft) - multi-turn orchestrators (Crescendo, XPIA)
- Nuclei templates (MIT) - community vuln pattern library

**Wrap as runners (DO NOT FORK):**
- Trivy (Apache 2.0) - SBOM, container, IaC
- Opengrep (LGPL fork of Semgrep - Semgrep Rules License v1.0 makes Semgrep proper unsafe to redistribute)
- Checkov (Apache 2.0) - IaC policy
- Promptfoo (MIT) - prompt eval
- LLM Guard (MIT) - runtime input/output guard
- Atomic Red Team (MIT) - ATT&CK technique tests

**DO NOT use TruffleHog (AGPL-3.0 §13 network copyleft trap).**

**Hat panel (10):**
1. Penetration Tester (offensive, scope-bound) - argues exploitability
2. Defensive Engineer (Blue) - argues whether mitigation already covers it
3. AppSec Specialist - SAST + DAST framing
4. Cloud Security Engineer - Supabase RLS, Vercel headers, Cloudflare config
5. Supply Chain Auditor - SBOM, AI-BOM, slopsquats, model provenance
6. AI/ML Security Researcher - OWASP LLM Top 10 (2025), MITRE ATLAS
7. Compliance Auditor - SOC2, ISO27001, Essential Eight, EU AI Act
8. Legal Hat - VETO POWER on scope, drafts disclosure emails
9. Threat Intel Hat - pulls from CVE feeds, MITRE ATLAS, OWASP LLM incidents
10. Customer Hat - configurable by user, business-context overrides

**Differentiators:**
- Red Team vs Blue Team adversarial deliberation (via Crews engine)
- AI-native vuln class library (OWASP LLM Top 10 2025 + MITRE ATLAS)
- Plain-English exploit description with auto-generated PoC payloads (curl, prompts, payloads - NEVER auto-fired)
- Scope contract enforcement (DNS TXT + /.well-known + signed contract)
- Investor-readable security score (0-100 + 4-sentence executive narrative)
- Plain-English compliance posture (SOC2-lite, ISO27001-lite, Essential Eight)
- Continuous deliberation over snapshots (Memory-backed, finding diffs across scans)
- Bug bounty scope import (HackerOne, Bugcrowd, Intigriti) as pre-authorisation
- Pack marketplace with Sigstore attestation
- Built-in 90+30 responsible disclosure flow (disclose.io aligned)

**Pricing (AUD/mo):** $0 Free / $29 Starter / $99 Pro / $299 Studio.

**Build = 10 chunks. v0.1 shippable in ~2 weeks (chunks 1-5).**

**Legal posture (moderate):** Defensive-first language. Scope-gated offensive testing on authorised targets only. NO zero-day weaponisation. NO autonomous exploit execution. Auto-disclosure flow for third-party findings. This is the only posture that survives Australian DTCA + US ACE + cyber insurance + investor optics.

**Until Chunk 2 ships scope verification, all active probes are gated by deny-all and refuse to run.** The shared run path calls `verifyScopeOrThrow` before any network I/O, so the MCP tool, the future `performStartRun` API endpoint, the admin UI, and the scheduled-monitor cron all inherit the same gate. No bypass flag exists, including for tests.

**Required ToS clauses:** scope warranty, prohibited use (no unauthorised targets, no malware, no DMCA circumvention, no sanctions/export violations), click-through scope acknowledgement per scan, liability cap (1x fees prior 12 mo), consequential damages limitation, willful misconduct carve-out, survival of indemnity.

**Pack-as-Crews-template:** 10 hats live in Crews engine per the locked architecture.

**Bolt-on rail registration:** SecurityPass joins Signals (notifications), Backup (snapshot before destructive checks), TestPass (regression test post-patch), BackstagePass (auth session capture), and the Wizard (Card response shape). Each existing UnClick tool gets an internal SecurityPass pack auto-applied.
