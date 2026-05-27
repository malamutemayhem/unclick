# LegalPass product brief (condensed)

> Condensed companion to the full ~1700-line brief that lives in Chris's
> uploads and in UnClick Memory facts (`b1e44cc5`, `f179fa2b`, `9e1089ae`,
> `25b1ea77`). When the two disagree, the long brief wins.

## 1. Positioning

LegalPass is the **6th Pass family product** alongside TestPass, UXPass,
FlowPass, SecurityPass, and BackstagePass.

- **Hero:** *The legal pass for AI-native teams. Twelve checks. One verdict. Plain English.*
- **Slogan:** *Twelve hats. One verdict.*
- **Buyer:** founders + in-house counsel + ops at AI-native startups. **Not BigLaw.**
- **Output:** plain-English issue-spot report, every claim traced to a primary source.

## 2. White space

LegalPass sits between two existing categories that do not overlap:

1. Generic AI chat (ChatGPT, Claude). Will happily produce something that
   looks like legal advice but ducks accountability and never traces to
   sources.
2. Traditional legaltech (DoNotPay, Ironclad, Robin AI, BigLaw retainers).
   Either targets enterprise procurement or holds itself out as a
   substitute for counsel and absorbs the regulatory exposure.

The gap is a panel-of-experts issue-spotter that openly declines to be a
lawyer, traces every claim, and routes the user to a real practitioner
through a marketplace when action is needed.

## 3. UPL risk and the immutable design rule

The single biggest existential risk to a product like LegalPass is
**unauthorised practice of law (UPL)** under the various state and
national bar rules. The mitigation is architectural, not marketing.

**IMMUTABLE DESIGN RULE** (parallel to SecurityPass's *PoC never auto-fired*):

> LegalPass NEVER produces output that is a transactional legal
> instrument tailored to the specific user. NEVER gives a recommendation
> to take or refrain from a specific legal action. NEVER holds itself out
> as a lawyer or substitute for a lawyer. Outputs are issue-spotters and
> information only. All action taken by user or by real practitioner
> engaged through marketplace.

This rule is enforced at three layers:

1. **Verdict-linter** at render time (`packages/legalpass/src/passguard/verdict-linter.ts`)
   bans directive verbs in any verdict text: `should`, `must`, `you need to`,
   `you have to`, `you are obligated`, `do this`,
   `ask a qualified lawyer`, `ask a qualified practitioner`,
   `talk to a qualified lawyer`, `get advice from a lawyer`,
   `you may want to review with a lawyer`, `we recommend`,
   `the right thing to do is`, `this is illegal`, `this is enforceable`,
   `this is unenforceable`, `you will win`, `you will lose`, plus
   substitute-lawyer and unsupported compliance claims such as `robot lawyer`,
   `AI lawyer`, `replace your lawyer`, `automatic compliance`,
   `guaranteed compliant`, `we represent you`, and `100% compliant`.
   Allowed framing includes `appears`, `seems`, `may`, `might`, `could`,
   `consider`, `in similar contracts`, `in comparable agreements`,
   `is unusual`, `is common`, `is typical`, `is standard`,
   `merits attention`, `warrants review`, and
   `qualified practitioner review may be warranted`.
2. **Disclaimer banner** present in three render contexts (chat / results / ToS).
3. **Marketing copy audit** (`qc_copy_audit`, lives outside this PR) bans the
   words `lawyer`, `attorney`, `counsel`, `legal advice`, `legal opinion`,
   `legal representation`, `robot lawyer`, `AI lawyer`, `law firm`, `client`,
   `attorney-client privilege`, `we will defend you`, `sue`, `guarantee compliance`,
   `100% compliant`. The disclaimer-banner module is exempt (it must use the
   word "lawyer" to disclaim being one).

## 4. The 12-hat panel

| # | Hat | Role |
|---|-----|------|
| 1 | Privacy | GDPR / Privacy Act / CCPA disclosures, retention, transfers |
| 2 | Consumer / ToS Unfair Terms | ACL, UCTA, EU Directive 93/13 patterns |
| 3 | Contracts | indemnity, limitation of liability, termination, IP assignment |
| 4 | Open Source Licence | copyleft cascade, attribution, patent-grant interactions |
| 5 | AI Ethics | EU AI Act tier, model-card hygiene, training-data provenance |
| 6 | IP | trade-mark conflicts, copyright, moral rights |
| 7 | Marketing Claims | misleading-conduct, comparative claims, endorsements |
| 8 | Litigator | adversarial read for likely arguments against the user |
| 9 | Plain-English | rewrites every finding for a non-lawyer reader |
| 10 | Compliance | sector overlays (fintech, health, education) |
| 11 | Jurisdiction Router | maps claims to the correct primary source per region |
| 12 | Citation Verifier | **hard-veto**: every claim must trace to a primary source or it is dropped |

The Citation Verifier is the only hat with veto power. A finding that
clears the other eleven but fails citation is removed from the verdict.

## 5. Jurisdiction map

Phase 1 MVP covers **AU, EU, US-CA**. Phase 2 adds **UK, US-NY, CA, NZ, SG**.
The Jurisdiction Router maps each finding to the correct primary source
for the resolved jurisdiction; ambiguous routing returns a `pending`
verdict with a routing note rather than guessing.

## 6. MVP scope

- **Current deterministic tool surface:** Privacy, Consumer / ToS Unfair Terms,
  and OSS Licence fixture checks are live in `@unclick/legalpass`.
- **Pack compatibility:** `contracts` maps onto the ToS / Unfair Terms
  phase-one runner until the dedicated Contracts hat lands.
- **Launch jurisdictions:** AU + EU + US-CA first.
- **Tiers to launch:** Free + Solo first.
- **Surface:** MCP tools for agents now; badge embed and public trust page later.
- **Citation Verifier:** hard-veto active from day one (not a Phase 2 add)

The long research also calls Accessibility-Legal Exposure the marquee fourth
hat and Regulatory Compliance the fifth. Those remain follow-up slices because
they need UXPass/regulatory corpus inputs rather than fixture-only text.

## 6.1 MCP surface

LegalPass follows the TestPass-style MCP shape from the research:

- `legalpass_run`
- `legalpass_status`
- `legalpass_save_pack`
- `legalpass_edit_item`
- `legalpass_verdict`

`legalpass_run` accepts either the structured `target` object or the
TestPass-style `target_url` shortcut.

## 7. Pricing (AUD per month)

| Tier | Price | Quota | Bolt-ons |
|------|-------|-------|----------|
| Free | $0 | one site, one jurisdiction, one verdict per month | watermarked preview |
| Solo | $29 | one site, two jurisdictions, five verdicts per month | $9 per extra scan |
| Studio | $99 | five sites, all jurisdictions, twenty-five verdicts per month | monitoring and signals |
| Team | $299 | twenty-five sites, API access, audit-log export | white-label badge |
| Human-practitioner bolt-on | $149 per matter | n/a | marketplace fee |

## 8. Slogan candidates (for reference)

- *Twelve hats. One verdict.* (locked)
- *The legal pass for AI-native teams.*
- *Plain English. Primary sources. No legal advice.*
- *Issue-spotter, not advisor.*

## 9. Disclaimer drafts (verbatim, ready to ship)

These match `packages/legalpass/src/passguard/disclaimer-banner.ts`. Word
counts: chat 42, results 108, ToS 312. Edits round-trip through both
files and through legal review.

### 9.1 Chat (42 words)

> LegalPass gives general legal information about contracts, not legal advice. We are not a law firm. Using LegalPass does not create a lawyer-client relationship. Laws change and vary by location. For decisions that matter, talk to a qualified lawyer in your jurisdiction.

### 9.2 Results (108 words)

> Heads up: LegalPass is an information tool, not a law firm. The verdict you are reading is generated by AI from patterns in similar documents. It is not legal advice, not an opinion on your rights, and not a substitute for review by a qualified lawyer. Your use of LegalPass does not create a lawyer-client, solicitor-client or attorney-client relationship, and what you tell us is not protected by legal professional privilege. Laws change. They differ between countries, states, and territories. For anything important, especially anything you plan to sign, send, or rely on, please get advice from a lawyer qualified in your jurisdiction before acting on that information.

### 9.3 ToS (312 words)

> LegalPass is a software tool operated by UnClick Operations Pty Ltd. It scans contracts, terms of service, privacy policies, end-user licence agreements, intellectual property agreements, and similar documents, and produces a plain-English summary, called a verdict, that compares clauses in your document with patterns observed in similar documents. UnClick Operations Pty Ltd is not a law firm. It is not a regulated legal practice in Australia, the United States, the United Kingdom, or any other jurisdiction. Its directors and employees are not acting as your lawyer, solicitor, or attorney. LegalPass cannot and does not give legal advice, opinions, or recommendations about your legal rights, remedies, defences, options, or strategies. LegalPass does not apply law to the facts of your situation. Your use of LegalPass does not create a lawyer-client, solicitor-client, or attorney-client relationship between you and UnClick Operations Pty Ltd or anyone working for UnClick Operations Pty Ltd. Information you upload or type into LegalPass is not protected by legal professional privilege, attorney-client privilege, or any equivalent doctrine. The verdict is informational only. It is generated by artificial intelligence and may contain errors, omissions, or out-of-date material. Laws change frequently. They vary between countries, states, territories, and even between municipalities. A clause that is common in one jurisdiction may be unusual or unenforceable in another. You are responsible for confirming whether information in a verdict is current and applies to your situation. Before you sign, send, or rely on any document, get advice from a lawyer qualified in the jurisdiction whose laws apply. LegalPass offers a Talk to a Lawyer feature that introduces you to independent lawyers. Those lawyers are not employees or agents of UnClick Operations Pty Ltd. Any engagement you enter is between you and that lawyer. By using LegalPass you acknowledge and accept these limits. To the maximum extent permitted by law, you use LegalPass at your own risk.

## 10. Cross-Pass architecture: PassGuard

Several CYA components in this PR (verdict-linter, disclaimer-banner) are
designed to be lifted out into a shared `PassGuard` package for the whole
Pass family. Tracked separately as a follow-up chunk. Nine planned shared
components: verdict-linter, disclaimer-banner, escalation-router,
action-gate, audit-log, insurance-rider-map, ToS-shared,
jurisdiction-resolver, consent-ledger.

## 11. Out of scope for this brief

Pricing experiments, marketplace economics, Phase 2 jurisdictions,
Phase 2 hats (5 through 12), and the full bar-rule mapping per
jurisdiction are covered in the long brief.

## 12. Current package and MCP implementation

The current PR keeps the code surface deterministic and evidence-led:

- `schema.ts` defines the advisory report, evidence, finding, hat, fixture document, and GEOPass adapter shapes for the three public-safe MVP hats.
- `hat-library.ts` defines deterministic fixture checks for Privacy Policy, ToS and Unfair Terms, and OSS Licence.
- `verdict-pack.ts` can emit a plan-only pack or evaluate public fixture text without live crawling, private uploads, production rows, paid calls, or legal instructions.
- Fixture findings always carry evidence, including an explicit coverage note when no matching public fixture document exists for a hat.
- Pack schema rejects duplicate target kinds, jurisdictions, hat ids, and item ids so runs and edits stay unambiguous.
- `tools/` exposes `legalpass_run`, `legalpass_status`, `legalpass_save_pack`, and `legalpass_edit_item`.
- `legalpass_run` rejects fixture documents marked `public_only: false` until a guarded private ingestion path exists.
- `legalpass_run` rejects duplicate runtime jurisdictions and fails clearly when no phase-one hat supports the selected jurisdiction set.
- LegalPass target, evidence, document, scanner, and GEOPass adapter URLs accept http(s) only.
- Reviewer overrides reject invalid verdicts and blank text fields, are retained on the run `audit_log`, and a repeat deterministic run does not erase that trail.
- Generated fail comments use non-imperative phrasing such as "review may be warranted" rather than telling the user what to do.
- `packages/mcp-server/src/legalpass-tool.ts` exposes the same run/status/save/edit surface for MCP callers, validates target/profile/jurisdiction/hat/item/edit shape, rejects duplicate pack and runtime values, and adds `legalpass_verdict` for PassGuard linting.

Every report carries the issue-spotter disclaimer and stays framed as review input for a qualified practitioner.
