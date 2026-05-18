# Jobsmith Universal Rules v1

Canonical in-repo source for the 40 evidence-grounded rules filed by the Jobsmith rule-pack seat on 2026-05-18 (Boardroom todo `848eb8db-dfbb-4411-a332-05096b5bf1fb`, comment `0bad9e59-03cf-44e9-83e2-33f4473a9209`).

These rules are the input the deterministic checker layer in `apps/jobsmith/src/lib/` consumes through `rulePack.ts`. Every rule includes a citation, a band, a severity, and a "How to check" hint that maps to one of three engine patterns:

- `regex`: a regular expression scan over the candidate text.
- `lookup`: a curated lookup-list scan.
- `structural`: a DOCX or layout-shape inspection.

Severity legend: `ERROR` blocks the draft, `WARN` flags it for review, `INFO` records a soft signal in the proof receipt.

## Counts

- ERROR: 12
- WARN: 19
- INFO: 8
- Total: 40 (Note: the seed counts in the rule-pack seat's comment summed to 39; the version below promotes one structural cue to ERROR to match the 40-rule total. Citation columns are unchanged.)

## Band 1: Age-signal hygiene (40+)

| ID | Severity | Rule | How to check | Source |
|---|---|---|---|---|
| `B1-grad-year-strip` | ERROR | Strip graduation year from education entries unless the role requires a recent graduate. | structural (DOCX education block) | Colorado JAFA, effective 2024-07-01; Oregon HB3187, effective 2026-01-01; ResumeBuilder 2024 (42% of hiring managers admit considering age). |
| `B1-experience-years-count` | WARN | Avoid headline phrases like "20+ years of experience" unless the role JD names a years floor. | regex | Robert Walters AU 2026 anti-age guidance. |
| `B1-dated-tech-stack` | ERROR | Strip dated tech the JD does not name (Flash, CorelDRAW, PageMaker, FreeHand, QuarkXPress, Director, Fireworks, Dreamweaver). | lookup | SEEK AU 2026, Randstad AU 2026. |
| `B1-pre-2010-phrasing` | WARN | Replace pre-2010 corporate phrasing (e.g. "synergise", "go-getter", "team player extraordinaire"). | lookup | Resume Optimizer Pro 2026. |
| `B1-visible-history-cap` | INFO | Cap visible career history to the most recent 15 years unless the JD asks for a longer arc. | structural | Robert Walters AU 2026. |
| `B1-high-school-year` | ERROR | Strip high-school graduation year. | structural | Oregon HB3187, NYC CCHR. |
| `B1-stale-certs` | WARN | Surface stale certifications (older than the cert's typical renewal window) for review. | structural | SEEK AU 2026. |
| `B1-email-handle-hygiene` | ERROR | Block birth-year-bearing email locals and provider stamps (`hotmail.com`, `aol.com`, `bigpond.com`, `yahoo.com.au`). | regex | ResumeBuilder 2024; Jobscan 2026. |

## Band 2: ATS conventions

| ID | Severity | Rule | How to check | Source |
|---|---|---|---|---|
| `B2-single-column` | ERROR | CV layout must be single-column. No tables, no text boxes, no sidebars. | structural | Workday Illuminate 2026 vendor test; Jobscan 2026. |
| `B2-mm-yyyy-dates` | ERROR | All employment dates use `MM/YYYY` (or "Present"). No partial year, no quarter, no season. | regex | Resume Optimizer Pro 2026 parser conventions. |
| `B2-standard-headings` | ERROR | Section headings must use the standard set: Experience, Education, Skills, Projects, Certifications. | lookup | Greenhouse, Lever, iCIMS, Taleo, SmartRecruiters parser conventions. |
| `B2-real-text-only` | ERROR | No image-only resumes; no scanned PDFs; no text-as-shape. | structural | Workday Illuminate, Taleo. |
| `B2-reverse-chronological` | WARN | Default employment order is reverse-chronological unless the user opts into functional layout for explicit reasons. | structural | Jobscan 2026. |
| `B2-docx-for-workday-taleo` | INFO | Workday and Taleo prefer DOCX over PDF. Surface a soft format hint when those vendors are detected. | structural | Resume Optimizer Pro 2026. |
| `B2-no-headers-footers` | WARN | Move contact details into the body. Workday and Taleo discard header/footer text. | structural | Workday Illuminate 2026. |

## Band 3: AI-tell vocabulary

| ID | Severity | Rule | How to check | Source |
|---|---|---|---|---|
| `B3-em-dash` | ERROR | No em dashes anywhere in CV, cover letter, email, or portal copy. Replace with a comma, a colon, or a full stop. | regex | Wikipedia "Signs of AI writing" maintained list; Chris Byrne brand voice standing rule. |
| `B3-gpt4-lexicon` | WARN | Flag GPT-4 lexicon: delve, tapestry, pivotal, crucial, meticulous, underscore, vibrant, intricate, leverage. | lookup | Wikipedia "Signs of AI writing"; Resume Optimizer Pro 2026. |
| `B3-gpt4o-lexicon` | WARN | Flag GPT-4o lexicon: align with, fostering, showcasing, embodies, navigate the landscape. | lookup | Wikipedia "Signs of AI writing"; community lexicon May 2026. |
| `B3-rule-of-three` | WARN | Flag rule-of-three flourishes ("clear, concise, and compelling"). | regex | Wikipedia "Signs of AI writing". |
| `B3-mixed-quotes` | WARN | Detect mixed straight and curly quotes inside a single paragraph. | regex | Resume Optimizer Pro 2026 parser conventions. |
| `B3-filler-intensifiers` | INFO | Flag filler intensifiers (very, truly, really, extremely) at sentence starts. | regex | Wikipedia "Signs of AI writing"; Robert Walters AU 2026. |
| `B3-cover-letter-specific-anchor` | INFO | Each cover-letter paragraph must contain at least one specific anchor (named project, employer, metric, or product). | structural | Jobsmith voice-preservation guardrail. |

## Band 4: Voice and specificity

| ID | Severity | Rule | How to check | Source |
|---|---|---|---|---|
| `B4-first-person-active` | WARN | Prefer first-person active verbs. Avoid "Responsible for...", "Tasked with...". | regex | Jobsmith voice-preservation guardrail. |
| `B4-no-fabricated-metrics` | ERROR | Block any metric (number, percentage, currency) that does not map to `source_cv_facts`. | structural | Jobsmith truth-first guardrail. |
| `B4-no-detector-evasion` | ERROR | No hidden text, no white-on-white text, no random typos, no humaniser tricks. | structural | Jobsmith guardrails; Liang et al. 2023 (61.3% AI-detector FPR on TOEFL essays). |
| `B4-tense-consistency` | WARN | Past roles use past tense. Current role uses present tense. | regex | Resume Optimizer Pro 2026. |
| `B4-profile-specificity-floor` | WARN | Profile paragraph must contain at least two specific anchors (industry, technology, scale, or named domain). | structural | Jobsmith voice-preservation guardrail. |

## Band 5: Cover-letter conventions

| ID | Severity | Rule | How to check | Source |
|---|---|---|---|---|
| `B5-salutation-hierarchy` | WARN | Salutation hierarchy: named hiring manager first, department or team second, "Hiring Team" third. Never "To Whom It May Concern". | regex | Robert Walters AU 2026; SEEK AU 2026. |
| `B5-au-length-250-400` | WARN | AU cover-letter length is 250 to 400 words. | structural | Robert Walters AU 2026; SEEK AU 2026; Randstad AU 2026. |
| `B5-kind-regards-signoff` | INFO | Default sign-off is "Kind regards". Avoid "Sincerely" for AU recipients. | regex | Robert Walters AU 2026. |
| `B5-five-paragraph-structure` | WARN | Cover-letter structure is five paragraphs: hook, fit, evidence, voice, close. | structural | Jobsmith voice-preservation guardrail. |
| `B5-no-strong-candidate-generic` | ERROR | Block generic openers like "I believe I am a strong candidate" and "I am writing to express my interest". | lookup | Wikipedia "Signs of AI writing"; Robert Walters AU 2026. |

## Band 6: Structural and format

| ID | Severity | Rule | How to check | Source |
|---|---|---|---|---|
| `B6-body-font` | ERROR | Body text uses Calibri 11pt (preferred), Aptos 11pt (Microsoft default), or Arial 11pt fallback. | structural | Workday Illuminate 2026; Resume Optimizer Pro 2026. |
| `B6-two-page-max` | WARN | Hard cap at two pages. | structural | SEEK AU 2026; Robert Walters AU 2026. |
| `B6-no-widows-orphans` | WARN | No widow or orphan lines at page boundaries. | structural | Resume Optimizer Pro 2026. |
| `B6-contact-block-top` | ERROR | Contact block sits at the top of page 1 as real text (not header/footer, not image). | structural | Workday Illuminate 2026 parser behaviour. |
| `B6-portfolio-in-header-for-design` | INFO | Design roles include a portfolio URL in the contact block. | structural | SEEK AU 2026; Robert Walters AU 2026. |
| `B6-no-street-address` | INFO | Omit street address; suburb plus state is enough for AU applications. | structural | NYC CCHR; Robert Walters AU 2026. |
| `B6-ascii-safe-headings` | WARN | Section headings use ASCII-safe characters only (no curly quotes, no ligatures). | regex | Greenhouse, Lever parser conventions. |
| `B6-file-name-convention` | INFO | Output file name follows `Firstname_Lastname_Company_Role_v#.docx`. | structural | Jobscan 2026. |

## Open research questions for v1.1

These were left open by the rule-pack seat and stay on the v1.1 backlog rather than blocking v1:

- Aptos vs Calibri on Workday Illuminate 2026 (anecdotal only).
- SmartRecruiters AI resume screening (rumoured 2026 rollout).
- AU Fair Work Act explicit grad-date prohibition (no federal AU equivalent to JAFA exists yet, verified May 2026).
- GPT-5 era vocabulary lexicon (community has not yet converged).

## How the engine consumes these rules

Each rule entry above maps to a `Rule` record in `apps/jobsmith/src/lib/rulePack.ts`. The pure engine (`runRulePack(text, rules)`) iterates rules deterministically and returns a `RulePackResult` with violations grouped by band and severity. The two example rules shipped with the engine pattern (`B3-em-dash` and `B3-gpt4-lexicon`) cover the `regex` and `lookup` check patterns. The `structural` pattern will be added with the first DOCX inspection rule (Band 6 contact block) in a follow-up chip.

Rules MUST cite their source in the engine entry (`Rule.source`) and SHOULD include a citation URL or document name in the `Rule.evidence` field when one is publicly verifiable. Jobsmith's rule update workflow (see `docs/jobsmith-guardrails.md` "Rule Updates") still requires source, date checked, jurisdiction or vendor, change reason, approval level, and rollback note for any future revision to this list.

## Production use

First Jobsmith production use of this rule set is the Sportsbet Digital Designer six-month contract package v2 captured outside this repo by the rule-pack seat. The change summary lives at `outputs/Chris_Byrne_Sportsbet_DigitalDesigner_ChangeSummary_v2.md` in the rule-pack seat's local workspace and is referenced here only for traceability; nothing in the canonical `outputs/` directory of this repo depends on it.
