# Jobsmith Universal Rules v1
Generated: 2026-05-18  
Sources: cvchecklists_1, 1a, 1b, 2, 3 + anti-ai-slop corpus + prior research (40-rule v0 pack)
Total rules: 232
Categories: AGE, AIDETECT, APPLICATION_STRATEGY, ATS, COVER, INTERVIEW_PREP, LINKEDIN, METADATA, PRIVACY, ROLE_SPECIFIC, TRUTH, VISUAL, VOICE

## How this rule pack works

The Jobsmith engine treats each rule as a smart, controlled checklist item. Every rule carries a category, a severity (ERROR blocks publish, WARN flags for human review, INFO surfaces in the change panel only), and a deterministic check that runs against a draft CV, cover letter, LinkedIn surface, or application metadata. Rules with non-null decay periods are flagged for re-verification on the schedule below; rules without decay are stable patterns or jurisdiction-grounded laws that update only when sources change.

At runtime the engine routes each rule through its applies_when filter (doc_type, role_family, age_band, jurisdiction, ats_vendor) before evaluating. The when_not_applies clause provides the legitimate exception path so a hiring manager or applicant override is auditable. SOURCES list every doc that contributed to the rule including the prior 40-rule research pack, so any rule can be traced back to its evidence and any rule update can be replayed against the same evidence pool. The aim is no magic numbers without source, no scare tactics, no false certainty about opaque hiring systems.

## Rules by category

### ATS

```yaml
- rule_id: JS-ATS-01
  name: single_column_layout
  category: ATS
  what: "CV uses one column. No two-column sidebars, no boxed skills column on the right."
  why: |
    Resume Optimizer Pro 2026 ATS tests show single-column layouts maintain 97% extraction accuracy across Workday, Greenhouse, Lever, iCIMS, Taleo. Two-column drops Workday field completeness from 94% to 52%; Jobscan 2025 audit shows 93% single-column parse rate vs 86% multi-column.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing and machinery
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
    - doc: prior_research
      section: Band 2 Rule 9
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Direct email to a known human reader where no ATS will see the file. Engine still defaults to single column.
  check_method:
    type: format_check
    spec: "Inspect DOCX for <w:tbl> and <w:sectPr><w:cols num=\"2\">. Flag any."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-02
  name: no_tables_textboxes_headers_for_content
  category: ATS
  what: "Contact details, role titles, and bullet content are real text in the document flow. No data inside images, no header or footer carrying contact info, no tables used to position content (tables fine only for actual tabular data)."
  why: |
    Workday and iCIMS parsers do not read header or footer content reliably. Taleo treats text-in-image as missing. SmartRecruiters loses table-positioned name fields in 12% of test cases (Resume Optimizer Pro 2026).
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
    - doc: cvchecklists_1b.md
      section: Parser Output Checks
      round: 2
    - doc: prior_research
      section: Band 2 Rule 12
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Direct PDF to a human only and the company explicitly accepts visual layouts.
  check_method:
    type: format_check
    spec: "DOCX inspection for header or footer with phone/email regex, image alt-text containing contact info, table cells holding name or title."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-04
  name: dates_mm_yyyy_format
  category: ATS
  what: "Every employment date is Mon YYYY (Jan 2024) or MM/YYYY (01/2024). No bare years, no Summer/Fall/Spring/Winter labels, no \"present\" without a paired start date."
  why: |
    Workday parses "05/2022 to 08/2024" with 99% accuracy vs 14% for "Summer 2023". Bare years cause Workday to credit 1 day or 365 days conservatively; leading cause of Insufficient Experience auto-rejects (Jobscan 2026, Resume Optimizer Pro 2026).
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
    - doc: prior_research
      section: Band 2 Rule 10
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Earlier roles consolidated under an Earlier Career block without dates.
  check_method:
    type: regex
    spec: "startDate matches \\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s\\d{4}\\b or \\b\\d{2}/\\d{4}\\b. Flag bare years and season-year tokens."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-05
  name: file_format_docx_default
  category: ATS
  what: "Submit DOCX for Workday and Taleo. DOCX or text-based PDF accept on Greenhouse, Lever, iCIMS, SmartRecruiters. Never image-based PDFs. PDF preferred for direct-to-human emails."
  why: |
    Resume Optimizer Pro 2026 reports DOCX section-extraction on Workday and Taleo is 5 to 8 points higher than PDF. Image PDFs are unreadable to every parser.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
    - doc: prior_research
      section: Band 2 Rule 13
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "JD explicitly says \"PDF only\"."
  check_method:
    type: format_check
    spec: File is DOCX or text-extractable PDF. Reject if PDF contains only images.
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-06
  name: no_graphics_icons_charts
  category: ATS
  what: "No icons, emoji, graphics, photos, charts, sparklines, progress bars, or star ratings on the CV file submitted via ATS."
  why: |
    Parsers see graphics as noise or skip them entirely. Skill meters and star ratings parse as garbage tokens.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Creative roles with explicit design portfolios, where the portfolio is separate and the CV remains plain."
  check_method:
    type: format_check
    spec: "Detect embedded images, emoji unicode (U+1F300-U+1FAFF, U+2600-U+27BF), chart objects, shape rectangles used as bars."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-07
  name: real_text_not_outlined
  category: ATS
  what: "Embed real selectable text. No outlined, rasterised, or path-converted glyphs from a design tool."
  why: "Workday, Taleo, and iCIMS treat path glyphs as missing content; the entire role block disappears."
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "Verify text is selectable and extractable, not paths or rasterised glyphs."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-08
  name: reverse_chronological_order
  category: ATS
  what: Roles in Experience are ordered most recent first. Functional or skills-grouped layouts are not used for ATS submissions.
  why: |
    Resume Optimizer Pro 2026 finds reverse-chronological hits 97% parse accuracy across major ATSs; functional drops to 71%.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Structure And Length
      round: 1
    - doc: prior_research
      section: Band 2 Rule 14
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Career changers may use a skills summary at the top; experience block still reverse-chronological.
  check_method:
    type: semantic_check
    spec: Each role end date sorts non-ascending down the page.
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-09
  name: one_file_no_zips
  category: ATS
  what: "CV is a single DOCX or PDF. No zipped portfolios, no two-document submissions where the JD asked for one."
  why: Most ATSs accept a single resume file and silently discard or fail on archives.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: prior_research
      section: Band 2 Rule 15
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD asks for separate portfolio attachment (e.g. design roles).
  check_method:
    type: format_check
    spec: Count attachments planned in publish step.
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-14
  name: no_hidden_text
  category: ATS
  what: "No white-on-white text, no 0-pt or 1-pt font, no off-canvas text, no invisible JD keywords stuffed into the doc."
  why: |
    Workday flags font 1 to 3pt; Greenhouse and Lever detect and flag invisible text. Recruiters who catch it disqualify and sometimes blacklist.
  sources:
    - doc: cvchecklists_1.md
      section: L. Legal and ethical floor
      round: 1
    - doc: cvchecklists_1a.md
      section: Red Flags
      round: 1
    - doc: prior_research
      section: Band 4 Rule 25
      round: 0
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "DOCX runs with <w:sz w:val=\"x\"/> where x<16 (8pt), text colour matching background, off-page positioning."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-15
  name: no_keyword_stuffing
  category: ATS
  what: "No keyword stuffing, no copy-pasted keyword lists from the job ad, no repeating a keyword to chase a 100% match score."
  why: |
    ATS systems and recruiters detect repetition. Pushing match score past ~75% shows diminishing returns and produces ChatGPT-sounding copy.
  sources:
    - doc: cvchecklists_1.md
      section: L. Legal and ethical floor
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
    - doc: cvchecklists_1b.md
      section: Ranking Checks
      round: 2
    - doc: cvchecklists_1.md
      section: I. Reddit reality check
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: Flag any keyword repeated more than 3 times without distinct contextual use; flag JD phrases pasted verbatim over 8 words.
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-19
  name: no_emoji_in_ats
  category: ATS
  what: No emoji in ATS-submitted CV or cover letter.
  why: Most ATS parsers strip emoji unicode and may interpret surrounding text incorrectly.
  sources:
    - doc: cvchecklists_1a.md
      section: Punctuation AI Tells
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Direct human submission where the company brand allows it.
  check_method:
    type: regex
    spec: "Flag any emoji unicode range U+1F300-U+1FAFF, U+2600-U+27BF in submission."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-24
  name: dont_change_titles_to_match_ad
  category: ATS
  what: Do not change historical job titles to match the JD. Use canonical equivalents only when the company called it different names; never inflate.
  why: |
    Title inflation is the most common reference-check disqualifier. ATSs cross-reference titles with LinkedIn in some configurations.
  sources:
    - doc: cvchecklists_1b.md
      section: Forum Failure Modes
      round: 2
    - doc: cvchecklists_1.md
      section: D. Tailoring
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Same role with a recognised canonical English equivalent for a foreign-language title.
  check_method:
    type: human_review
    spec: Detect title inflation toward target role.
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-03
  name: standard_section_headings
  category: ATS
  what: "Use section headings the major parsers expect: Experience or Professional Experience, Education, Skills, Certifications, Profile or Summary. Avoid clever variants like \"My Story\", \"What I Bring\", \"Career Journey\", \"My Toolkit\", \"Where I Create Impact\"."
  why: |
    Greenhouse and Workday parsers map heading text to a fixed taxonomy. Non-standard headings fall back to a heuristic that misclassifies content at 15 to 30%.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
    - doc: prior_research
      section: Band 2 Rule 11
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "A JD-named heading is added above the standard set, not replacing them."
  check_method:
    type: keyword_list
    spec: "Allowlist [Experience, Work Experience, Professional Experience, Education, Skills, Projects, Certifications, Volunteering, Profile, Summary]. Flag novelty headings."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-10
  name: canonical_skill_names
  category: ATS
  what: "Use canonical skill names matched to Workday Skills Cloud taxonomy: JavaScript not JS, Microsoft Excel not MS Excel, Adobe Photoshop not PS, PostgreSQL not Postgres unless JD uses it."
  why: |
    Workday Skills Cloud and Greenhouse keyword mapping rely on canonical token matching. Abbreviations fail the match in ~30% of cases.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
    - doc: cvchecklists_1b.md
      section: Ranking Checks
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD itself uses the abbreviation; mirror it.
  check_method:
    type: keyword_list
    spec: "Map abbreviations to canonical; flag \\bJS\\b, \\bTS\\b, MS Excel, \\bPS\\b, Postgres unless in JD."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-11
  name: standard_bullet_characters
  category: ATS
  what: "Use only standard bullet characters: round bullet or hyphen. Avoid fancy unicode glyphs like triangles, arrows, diamonds."
  why: Non-standard bullet glyphs sometimes parse as separate text tokens or cause line-break misreads.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: Punctuation AI Tells
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "Flag bullet chars matching [\\u25aa\\u25b8\\u25c6\\u25c7\\u2605\\u25ba\\u2023\\u2043]; allow only round bullet U+2022 and hyphen."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-13
  name: contact_links_plain_text
  category: ATS
  what: "LinkedIn URL, portfolio URL, and email are written as plain text, not as hyperlinked icons only."
  why: Glyph-only icon links parse as missing data on most ATSs. Plain-text URLs survive every parser.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "Contact info present as readable text, not as glyph-only icon links."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-16
  name: no_password_protected_files
  category: ATS
  what: Submit unprotected DOCX/PDF unless the employer explicitly requests password protection.
  why: Password-protected files cannot be parsed; the ATS rejects or skips them silently.
  sources:
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Security-cleared roles that explicitly require encrypted delivery.
  check_method:
    type: format_check
    spec: PDF/DOCX is not encrypted unless required.
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-18
  name: plain_text_export_test
  category: ATS
  what: "Copy and paste the CV into a plain text editor. If structure collapses or content disappears, fix it before submitting."
  why: "If structure collapses to plain text, the ATS extraction sees the same thing."
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: Submission Checks
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Run plain text extraction; confirm headings, dates, bullets, names preserved in correct order."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-21
  name: keywords_paired_with_proof
  category: ATS
  what: Every critical keyword in the skills section also appears in an experience bullet that demonstrates use of it.
  why: |
    Hiring managers and second-pass ranking algorithms penalise skills lists where the skill never appears in context.
  sources:
    - doc: cvchecklists_1b.md
      section: Ranking Checks
      round: 2
    - doc: cvchecklists_1a.md
      section: Skills Section
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Soft skills evidenced by overall pattern rather than a single bullet.
  check_method:
    type: semantic_check
    spec: "For each listed hard skill, verify it appears in at least one experience bullet."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-20
  name: mirror_jd_phrasing_truthful
  category: ATS
  what: "Mirror the JD exact phrasing where it is truthful (use \"stakeholder management\" rather than \"managing relationships with stakeholders\" if that is the JD term)."
  why: |
    Workday and Greenhouse keyword mapping rewards exact-phrase matches; mirror once per critical phrase.
  sources:
    - doc: cvchecklists_1.md
      section: D. Tailoring to the role
      round: 1
    - doc: cvchecklists_1a.md
      section: Job Fit
      round: 1
    - doc: cvchecklists_1b.md
      section: Ranking Checks
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Phrase the applicant cannot truthfully claim.
  check_method:
    type: semantic_check
    spec: Compare canonical phrasings in CV vs JD; suggest alignment where truthful.
  severity: INFO
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-22
  name: identify_ats_vendor
  category: ATS
  what: "Identify the ATS vendor from the application URL before clicking apply, and adjust format profile (Taleo simpler, Ashby more design tolerance, Workday strict heading taxonomy)."
  why: |
    Different vendors have different parser strengths and tolerances. Adapting saves a parser fix downstream.
  sources:
    - doc: cvchecklists_2.md
      section: A. Pre-application reconnaissance
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Vendor not identifiable from URL; default to Workday-safe.
  check_method:
    type: regex
    spec: "URL match: myworkdayjobs.com|greenhouse.io|lever.co|icims.com|taleo.net|successfactors.com|bamboohr.com|smartrecruiters.com|breezy.hr|ashbyhq.com"
  severity: INFO
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ATS-23
  name: dont_overweight_score
  category: ATS
  what: "Treat ATS scanner scores as parse risk awareness, not as a writing target. Don't trust a scanner score more than a human read."
  why: |
    Scanner scores are heuristic and biased; a recruiter's 2025 Business Insider piece described winning interviews with a low Jobscan score. Jobscan itself frames scores as risk assessment.
  sources:
    - doc: cvchecklists_1.md
      section: K. Tools to use
      round: 1
    - doc: cvchecklists_1b.md
      section: Forum Failure Modes
      round: 2
    - doc: cvchecklists_1b.md
      section: Over-Optimisation Warnings
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Use scanners for parse output review only. Final accept decision is human.
  severity: INFO
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### AGE

```yaml
- rule_id: JS-AGE-01
  name: strip_experience_years_count
  category: AGE
  what: "Remove any phrase that names an experience-years count above 10. Examples to strip: \"22 years of experience\", \"20+ years in design\", \"two decades of brand work\"."
  why: |
    ResumeBuilder 2024 survey of 1,000 hiring managers: 42% admit they consider applicant age when reviewing resumes; 41% say an elderly appearance deters them. Experience-years count is the single fastest age calculator.
  sources:
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: cvchecklists_2.md
      section: Age round 2
      round: 2
    - doc: cvchecklists_1b.md
      section: Age And Over-Seniority Round 2
      round: 2
    - doc: prior_research
      section: Band 1 Rule 1
      round: 0
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: any
    age_band: 40+
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "JD specifies a minimum years count above 10. State the JD-required number, no more."
  check_method:
    type: regex
    spec: "\\b(\\d{2,}|\\w+(teen|ty))[\\s-]?\\+?\\s?(years?|yrs?|decades?)\\b over CV body, allow-list values matching JD."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: Single fastest age signal removal yields measurable callback uplift.
```

```yaml
- rule_id: JS-AGE-02
  name: strip_graduation_year
  category: AGE
  what: "Education entries show institution, degree, location only. No start year, no end year, no \"Class of...\"."
  why: |
    Colorado JAFA (effective 2024-07-01) makes it unlawful for Colorado employers to request graduation dates on initial application. Oregon HB 3187 extends a similar prohibition state-wide effective 2026-01-01 (covers Oregon-resident remote workers regardless of employer location). NYC Human Rights Law treats a graduation-date request as evidence of age inquiry.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: cvchecklists_1a.md
      section: Education
      round: 1
    - doc: cvchecklists_2.md
      section: Age round 2
      round: 2
    - doc: prior_research
      section: Band 1 Rule 2
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: 40+
    jurisdiction: "CO|OR|NYC|NY|any"
    ats_vendor: any
  when_not_applies: Recent graduates (degree awarded within last 5 years) where graduation year signals currency.
  check_method:
    type: regex
    spec: "In each education block, scan for any 4-digit year token between 1960 and current_year - 5. Flag if found."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: Hardens from WARN to ERROR where explicit law exists (CO/OR/NYC). State-by-state effective dates noted in why.
```

```yaml
- rule_id: JS-AGE-03
  name: cap_visible_experience_15_years
  category: AGE
  what: "Show roles from the last 15 years only. Earlier roles compress into a single Early Career line (titles, companies, no dates) or drop entirely."
  why: |
    Indeed, Jobscan, Resume Genius, Resume-Now, and TopResume all converge on the 10 to 15 year window for senior CVs. Jobscan 2026 notes that going beyond 15 years is the second-most-common reject signal after multi-column layout.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: cvchecklists_1a.md
      section: Structure And Length
      round: 1
    - doc: prior_research
      section: Band 1 Rule 3
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: 40+
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Executive search submissions where a longer career arc is requested. List without dates, label section Earlier relevant experience."
  check_method:
    type: count_threshold
    spec: "For each role with startDate, compute current_year minus startDate.year. Flag roles where this > 15 that still carry dates."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AGE-04
  name: strip_dated_technology_names
  category: AGE
  what: "Remove technologies that signal a pre-2015 career start: Adobe Flash, CorelDRAW (for non-CorelDRAW shops), Adobe PageMaker, FreeHand, QuarkXPress, Director, Fireworks, Dreamweaver (unless JD names it), ColdFusion, VB6, Lotus Notes, classic ASP, Silverlight, jQuery 1.x, FrontPage."
  why: |
    Adobe sunset Flash on 2020-12-31. Listing Flash in 2026 reads as ancient or as pre-2015 career honesty. TopResume and CareerGPS both flag dated software as a top resume age signal.
  sources:
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: cvchecklists_1a.md
      section: Skills Section
      round: 1
    - doc: cvchecklists_1b.md
      section: Age Round 2
      round: 2
    - doc: prior_research
      section: Band 1 Rule 4
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD names the technology (rule is JD-aware not blanket).
  check_method:
    type: keyword_list
    spec: Maintain datedTechs list. Flag token IN datedTechs AND token NOT IN jobDescription.tokens.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AGE-05
  name: strip_high_school_references
  category: AGE
  what: "Remove high school name, Year 12/VCE/HSC year, school-level achievements, \"Year 12 Captain\"."
  why: |
    High school year is the single most precise age calculator (year_12 + 5 ~= birth year). NYC CCHR enforcement guidance treats it as equivalent to a direct age inquiry.
  sources:
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: prior_research
      section: Band 1 Rule 5
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: 10+ years post Year 12
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Elite-school alumni networks where the school is the warm intro (rare; flag for human).
  check_method:
    type: regex
    spec: "\\b(VCE|HSC|QCE|SACE|GCSE|A[\\s-]?Level|IB Diploma|Year 12|Grade 12|High School|Grammar School)\\b"
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AGE-06
  name: strip_dated_phrasing
  category: AGE
  what: "Avoid pre-2010 corporate boilerplate: \"spearheaded\", \"synergised\", \"leveraged synergies\", \"blue-sky thinking\", \"thought leader\", \"guru\", \"ninja\", \"rockstar\", \"results-oriented\", \"go-getter\", \"hit the ground running\"."
  why: |
    Resume.io and Jobscan maintain ageism-phrase lists. Usage correlates with pre-2010 career templates and prompts the reader to pattern-match the applicant to that era.
  sources:
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: cvchecklists_1a.md
      section: Headline
      round: 1
    - doc: prior_research
      section: Band 1 Rule 6
      round: 0
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD itself uses the phrase; mirror once for keyword pass.
  check_method:
    type: keyword_list
    spec: datedPhrases list. Token-level scan. Flag each occurrence.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AGE-07
  name: sanitise_email_handle
  category: AGE
  what: "Reject email handles that contain a birth year, a graduation year, a high-school nickname, or a hotmail/aol/netscape domain. Use a name-based handle."
  why: |
    A four-digit year in the local-part maps to birth year with high precision. Hotmail and AOL accounts correlate with pre-2010 sign-up cohorts.
  sources:
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: cvchecklists_1a.md
      section: Contact Section
      round: 1
    - doc: cvchecklists_2.md
      section: F. Application metadata
      round: 2
    - doc: prior_research
      section: Band 1 Rule 7
      round: 0
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: 40+
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Year is defensible coincidence and applicant prefers it. Engine still suggests a domain swap.
  check_method:
    type: regex
    spec: "(19[0-9]{2}|20[0-2][0-9]) in local-part. Domain check against {hotmail,aol,netscape,bigpond,optusnet,iinet}."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AGE-08
  name: strip_stale_certifications
  category: AGE
  what: "Remove certifications older than 10 years without renewal evidence. If a cert is current but the listing shows the original year, replace with \"current\" or the most recent renewal year."
  why: |
    A 2008 certification listed in 2026 is an age beacon and reads as stale skill. Currency is the signal that matters; the year is the noise.
  sources:
    - doc: cvchecklists_1.md
      section: H. Age signal management
      round: 1
    - doc: prior_research
      section: Band 1 Rule 8
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Lifetime credentials where issuing body is the credential (bar admission). List body, omit year."
  check_method:
    type: count_threshold
    spec: "If current_year - issueYear > 10 and no renewalYear, flag."
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### TRUTH

```yaml
- rule_id: JS-TRUTH-01
  name: no_fabricated_metrics
  category: TRUTH
  what: "Every quantified claim traces to a real source: a project, role, dataset, or piece of work the applicant can point to. If the source says \"managed a team\", the draft cannot say \"managed a team of seven\"."
  why: |
    Operator-locked standing rule. Truth is the floor; specificity is the ceiling. Detectors are not the threat; reference checks are.
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
    - doc: cvchecklists_1.md
      section: K. Defensibility test
      round: 1
    - doc: cvchecklists_1a.md
      section: Truthfulness
      round: 1
    - doc: cvchecklists_1b.md
      section: Claim Strength
      round: 2
    - doc: cvchecklists_2.md
      section: L. Honesty audit
      round: 2
    - doc: prior_research
      section: Band 4 Rule 24
      round: 0
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Cross-reference every \d+ token in a metric position to corpus. Flag with closest corpus row.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-02
  name: provenance_traceable
  category: TRUTH
  what: "Every claim on the CV is traceable to a real project, role, dataset, or piece of work. Maintain a source-fact map for every bullet."
  why: |
    Background-check failure is the largest single source of rescinded offers. Provenance protects the applicant and the engine.
  sources:
    - doc: cvchecklists_1.md
      section: D. Tailoring
      round: 1
    - doc: cvchecklists_1a.md
      section: AI Rewrite QA
      round: 1
    - doc: cvchecklists_1b.md
      section: CV As Evidence Packet
      round: 2
    - doc: cvchecklists_3.md
      section: G. Claim provenance workflow
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Maintain provenance fields per claim: source, date, method, witness, scope."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-03
  name: no_inflated_verbs
  category: TRUTH
  what: "Audit each strong verb against scope: \"Led\" vs \"contributed to\", \"Architected\" vs \"worked on\", \"Owned\" vs \"supported\". The verb must match the role actually played."
  why: |
    Verb inflation is the most common interview-cross-examination failure. Hiring managers probe verbs first.
  sources:
    - doc: cvchecklists_1a.md
      section: Truthfulness
      round: 1
    - doc: cvchecklists_2.md
      section: L. Honesty audit
      round: 2
    - doc: cvchecklists_1b.md
      section: Forum Failure Modes
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "For each strong verb, verify documented decision authority/contribution."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-04
  name: no_sole_ownership_for_team_work
  category: TRUTH
  what: "Label shared team outcomes as shared, not solo. Do not claim sole ownership for team work."
  why: Reference checks expose this fastest. Co-author/co-lead phrasing protects credibility.
  sources:
    - doc: cvchecklists_1a.md
      section: Achievement Bullets
      round: 1
    - doc: cvchecklists_1b.md
      section: Claim Strength
      round: 2
    - doc: cvchecklists_2.md
      section: L. Honesty audit
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Verified solo work.
  check_method:
    type: human_review
    spec: Verify claimed sole-ownership work was actually solo.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-05
  name: verify_dates_company_names
  category: TRUTH
  what: "Cross-check every employer name, role title, and date range against records or LinkedIn. Verify date ranges add up, no unexplained overlapping full-time roles, no gaps disguised by creative date math."
  why: AI can hallucinate timelines and employer names. Reference checks verify dates and titles first.
  sources:
    - doc: cvchecklists_1.md
      section: J. Human review
      round: 1
    - doc: cvchecklists_1.md
      section: F. AI content tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Truthfulness
      round: 1
    - doc: cvchecklists_2.md
      section: I. Career gap handling
      round: 2
  applies_when:
    doc_type: [cv, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: Verify each employer name; verify no overlapping full-time roles without contractor explanation; verify dates strict chronology.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-06
  name: no_false_citizenship_visa
  category: TRUTH
  what: No claims of citizenship or visa status the applicant does not hold.
  why: False work-rights claims are immediate disqualifiers and in some jurisdictions illegal.
  sources:
    - doc: cvchecklists_1.md
      section: L. Legal floor
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Verify visa/citizenship claims against documentation.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-07
  name: no_salary_lies
  category: TRUTH
  what: No salary lies in pre-screening. Some jurisdictions ban asking; refuse rather than lie.
  why: Salary verification on offer or background check exposes lies and ends offers.
  sources:
    - doc: cvchecklists_1.md
      section: L. Legal floor
      round: 1
  applies_when:
    doc_type: [screening]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Salary disclosures must be truthful or refused where illegal to request.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-08
  name: dont_hide_missing_requirement
  category: TRUTH
  what: "If a JD requirement is missing, do not hide it with vague wording. Describe partial matches honestly."
  why: |
    Recruiters and hiring managers detect wording evasion. Honest framing of partial matches builds credibility.
  sources:
    - doc: cvchecklists_1b.md
      section: Knockout Checks
      round: 2
    - doc: cvchecklists_1a.md
      section: Job Fit
      round: 1
  applies_when:
    doc_type: [cv, cover_letter, screening]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Detect attempts to obscure absent qualifications.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-09
  name: no_synonyms_for_unused_tools
  category: TRUTH
  what: Do not add synonyms that imply tools the applicant has not used.
  why: Synonym padding fails on technical screens. Pair every keyword with proof.
  sources:
    - doc: cvchecklists_1b.md
      section: Ranking Checks
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: Reject synonyms that suggest unfamiliar tools.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-10
  name: no_fake_referrals
  category: TRUTH
  what: No fake referrals. Any referral mentioned is verified with the referrer beforehand.
  why: |
    Fake referrals are checked instantly; the rejection cascades to future applications at the same company.
  sources:
    - doc: cvchecklists_1a.md
      section: Red Flags
      round: 1
    - doc: cvchecklists_2.md
      section: G. References
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Any referral mention verified with referrer.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-12
  name: dont_stuff_skills_into_old_roles
  category: TRUTH
  what: Skills in each role must reflect actual work at that time. Do not retro-fit skills you have now into roles where you did not have them.
  why: Background-check and former-colleague checks expose retro-fitted skills.
  sources:
    - doc: cvchecklists_1b.md
      section: Forum Failure Modes
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Verify skills in each role reflect actual contemporaneous work.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-13
  name: honest_freelance_clients
  category: TRUTH
  what: "Don't make small gigs look like full-time roles, hide gaps with vague consulting, or list confidential clients as if public. Cluster short stints under one Freelance/Contract heading with the period and notable clients."
  why: Misrepresenting freelance work is a top reference-check disqualifier and an NDA risk.
  sources:
    - doc: cvchecklists_1b.md
      section: Freelance And Contract Work
      round: 2
    - doc: cvchecklists_2.md
      section: I. Career gaps
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Genuinely full-time consulting role.
  check_method:
    type: human_review
    spec: "Detect freelance misrepresentation patterns; verify status, client type, deliverables."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-14
  name: no_creative_date_math
  category: TRUTH
  what: Do not hide gaps with creative date math. Use month and year accurately.
  why: Recruiters notice and lose trust; ATS date checks catch contradictions with LinkedIn.
  sources:
    - doc: cvchecklists_2.md
      section: I. Career gaps
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: Dates use month+year accurately; cross-reference for gaps.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-11
  name: no_unverifiable_top_percent
  category: TRUTH
  what: "Avoid unverifiable \"top 1%\" or similar superlative claims. If used, cite the issuing body and methodology."
  why: Superlative claims without external source are an interview cross-examination failure.
  sources:
    - doc: cvchecklists_1a.md
      section: Red Flags
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "External source can be named (e.g., \"Higgsfield top 2%\")."
  check_method:
    type: regex
    spec: "Flag \"top \\d+%\" claims without external source citation."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-15
  name: honesty_audit_manager_test
  category: TRUTH
  what: "For every bullet, ask: would my former manager nod or wince? Would a colleague who worked alongside agree with the framing? Would a journalist or background-checker calling the previous employer confirm this?"
  why: The three-witness test is the strongest defensibility check; it predicts reference-check outcomes.
  sources:
    - doc: cvchecklists_2.md
      section: L. Honesty audit
      round: 2
    - doc: cvchecklists_1.md
      section: K. Defensibility test
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Manager-test, colleague-test, and background-check-test each bullet."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-16
  name: jargon_used_correctly
  category: TRUTH
  what: "Use industry jargon correctly, not sprinkled. Wrong jargon is worse than no jargon."
  why: Domain experts spot misused jargon instantly; AI is most likely to misuse it.
  sources:
    - doc: cvchecklists_2.md
      section: K. What AI cannot fake
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Verify domain-jargon accuracy.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-17
  name: compounding_evidence_stack
  category: TRUTH
  what: "Stack 6 to 12 verifiable specifics across the whole CV: one per role minimum, plus at least one externally verifiable claim with URL or citation (published article, GitHub commit, conference year+event, patent number, case study, press)."
  why: |
    The compounding-evidence pattern is what defeats AI detectors and reference checks at the same time; the more verifiable specifics, the lower the perceived risk.
  sources:
    - doc: cvchecklists_3.md
      section: I. Compounding evidence
      round: 3
    - doc: cvchecklists_3.md
      section: J. Asymmetric verification
      round: 3
    - doc: cvchecklists_2.md
      section: K. What AI cannot fake
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Confidential or NDA-restricted work, where private provenance log substitutes."
  check_method:
    type: count_threshold
    spec: "Count verifiable_specifics 6-12; require >=1 externally verifiable claim with citation."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-18
  name: no_100_percent_unless_true
  category: TRUTH
  what: "Avoid \"100% improvement\" or similar perfect-percentage claims unless mathematically true."
  why: Perfect percentages read as marketing puffery; they fail the defensibility check.
  sources:
    - doc: cvchecklists_1a.md
      section: Achievement Bullets
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Verified mathematically true case.
  check_method:
    type: regex
    spec: "Flag \"100% improvement\" or perfect-percentage claims for verification."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-TRUTH-19
  name: include_minor_failure_or_tradeoff
  category: TRUTH
  what: "Include at least one bullet that names a tradeoff honestly (delivery speed over perfection, scope over polish) or a minor failure with learning."
  why: AI does not write tradeoffs because it doesn't make them. Including one signals real ownership.
  sources:
    - doc: cvchecklists_2.md
      section: K. What AI cannot fake
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Roles with no genuine tradeoffs to disclose.
  check_method:
    type: semantic_check
    spec: At least one explicit tradeoff or failure/recovery bullet.
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### VOICE

```yaml
- rule_id: JS-VOICE-16
  name: replace_leverage_utilise
  category: VOICE
  what: "Replace \"leveraged\" and \"utilised\" with plain verbs (\"used\") and concrete tool or result."
  why: Both are top AI tells. The replacement gains specificity and shortens the sentence.
  sources:
    - doc: cvchecklists_1a.md
      section: Core Principle
      round: 1
    - doc: cvchecklists_1b.md
      section: Anti-Slop Word Swaps
      round: 2
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "\\b(leveraged|leveraging|utilised|utilized|utilising)\\b"
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-20
  name: no_weak_bullet_openers
  category: VOICE
  what: "No bullet starts with \"Responsible for\" or \"Helped with\" unless the responsibility itself is the achievement."
  why: Weak openers signal junior framing; replace with concrete action verb.
  sources:
    - doc: cvchecklists_1a.md
      section: Anti-Slop
      round: 1
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "^(Responsible for|Helped with|Was responsible for)"
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-01
  name: first_person_verbs_active
  category: VOICE
  what: "CV bullets start with an action verb (Led, Built, Directed, Shipped, Designed). Cover letter sentences start with I or a subject-verb structure, not \"Being a passionate creative...\"."
  why: |
    Indeed 2026 and Jobscan 2026 both rank active-voice verbs as the highest-correlated signal for callback after keyword match.
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
    - doc: cvchecklists_1a.md
      section: Achievement Bullets
      round: 1
    - doc: cvchecklists_3.md
      section: E. Anti-fluency pass
      round: 3
    - doc: prior_research
      section: Band 4 Rule 23
      round: 0
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Verb-first pattern would break a quote or a named-project sentence.
  check_method:
    type: regex
    spec: "For each bullet, first token is a verb (verb list lookup). For cover letter sentences, flag passive construction (be+Verb-ed)."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-02
  name: strong_action_verbs
  category: VOICE
  what: "Use strong action verbs showing seniority (led, drove, built, shipped, owned, scaled, architected, directed, negotiated, delivered, designed, launched). Avoid weak verbs (helped, assisted, supported, worked on, was responsible for, participated in)."
  why: |
    Weak verbs read as junior even when the work was senior. Strong verbs require defensible scope (see TRUTH-03).
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
    - doc: cvchecklists_1a.md
      section: Anti-Slop Rewrite Rules
      round: 1
    - doc: cvchecklists_1a.md
      section: Experience Section
      round: 1
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Never; if the actual work was assist-level, use precise verb (audited, coordinated) not weak verb."
  check_method:
    type: keyword_list
    spec: "Flag bullet openings: ^(helped|assisted|supported|worked on|was responsible for|responsible for|participated in|gained exposure to|familiar with)."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-03
  name: quantify_outcomes
  category: VOICE
  what: "Quantify achievements with percentages, money, headcount, time saved, throughput, conversion, retention, NPS, deal sizes. When no metric exists, give scope (across 4 markets, 12-person team, 6-figure budget)."
  why: |
    Quantification doubles the perceived seniority of a bullet and provides interview anchors. Scope substitutes when metrics are unavailable.
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
    - doc: cvchecklists_1a.md
      section: Metrics
      round: 1
    - doc: cvchecklists_2.md
      section: C. Industry-specific
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Confidential metrics where neither number nor scope can be disclosed.
  check_method:
    type: regex
    spec: "Detect numeric/% / $ tokens in bullets; flag roles with no quantified outcomes."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-05
  name: tense_consistency
  category: VOICE
  what: "Current role uses present tense (Lead, Build). Past roles use past tense (Led, Built). No mixed tense within a single bullet."
  why: Mixed tense is a common AI-rewrite artefact and reads as careless.
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
    - doc: prior_research
      section: Band 4 Rule 26
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Bullet describing an ongoing outcome from a past role.
  check_method:
    type: semantic_check
    spec: Classify each role current/past; verify verb forms in its bullets match.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-06
  name: no_personal_pronouns_cv
  category: VOICE
  what: "No personal pronouns (I, my, we, our, me) in CV bullets. The implicit subject is the applicant."
  why: CV convention drops pronouns; first-person inflates word count and reads as informal.
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
    - doc: cvchecklists_1a.md
      section: Human Voice Preservation
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Cover letters and LinkedIn About sections use first person naturally.
  check_method:
    type: regex
    spec: "Flag \\b(I|my|we|our|me)\\b inside CV body bullets."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-07
  name: specificity_floor_profile
  category: VOICE
  what: "The profile paragraph names at least one specific brand or project, one specific tool or method, and one specific outcome."
  why: |
    Specificity at the top of the CV is the strongest signal a screener sees before deciding to read further (Robert Walters 2026 AU guide).
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Summary
      round: 1
    - doc: prior_research
      section: Band 4 Rule 27
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Confidential employer cases.
  check_method:
    type: semantic_check
    spec: "Count distinct proper nouns and tool names in first paragraph. Flag if < 3 total."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-08
  name: tailored_summary_3_to_5_lines
  category: VOICE
  what: "Profile or summary is 3 to 5 lines, tailored to the role, no generic boilerplate openers."
  why: |
    Generic openers ("Highly motivated professional", "Results-oriented X with Y years") read as filler in 6 to 10 second skim.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Summary
      round: 1
    - doc: cvchecklists_2.md
      section: E. AI summary tells
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Some markets prefer 2 to 4 line summaries.
  check_method:
    type: count_threshold
    spec: Summary length 2 to 5 lines; flag generic openers.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-09
  name: summary_unique_to_candidate
  category: VOICE
  what: "Summary would still be recognisable as the applicant's if the name were removed. If it would fit 1,000 other candidates, rewrite."
  why: The distinctiveness test predicts shortlist outcomes more reliably than keyword match in 2026.
  sources:
    - doc: cvchecklists_1a.md
      section: Summary
      round: 1
    - doc: cvchecklists_1b.md
      section: Recruiter Trust Checks
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Test summary for distinctiveness; rewrite if generic.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-10
  name: no_objective_section
  category: VOICE
  what: Do not include an Objective section. Replace with a targeted summary that names what value the applicant brings.
  why: Objective sections read as 1990s template and waste the most valuable screen real estate.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Summary
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "Flag heading \"Objective\" or \"Career Objective\"; flag phrase \"seeking a challenging opportunity\"."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-14
  name: cut_15_percent_words
  category: VOICE
  what: "After every draft, cut 15% of the words. Cover letter at 220 words reads more confident than the same letter at 320."
  why: Word reduction sharpens voice and removes AI padding by default.
  sources:
    - doc: cvchecklists_3.md
      section: F. Delete first
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "word_count_final <= word_count_draft * 0.85."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-15
  name: cut_filler_adjectives
  category: VOICE
  what: "Cut adjectives without new information: \"successful project\" to \"project\", \"strategic decision\" to \"decision\", \"comprehensive plan\" to \"plan\"."
  why: Filler adjectives are the second-most-common AI residue after wordy phrases.
  sources:
    - doc: cvchecklists_3.md
      section: F. Delete first
      round: 3
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Adjective adds specific verifiable info.
  check_method:
    type: keyword_list
    spec: "successful project|strategic decision|comprehensive plan|innovative approach"
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-17
  name: word_swaps_inflation_to_action
  category: VOICE
  what: "Swap inflated verbs for concrete action: facilitated to ran or hosted, supported to specific support, contributed to specific contribution, assisted to actual task, spearheaded to led, ameliorated to improved, streamlined or enhanced or optimized or empowered or transformed to named change."
  why: Inflated verbs sound impressive but say nothing. Concrete verbs are interview-defensible.
  sources:
    - doc: cvchecklists_1b.md
      section: Anti-Slop Word Swaps
      round: 2
    - doc: cvchecklists_1a.md
      section: Anti-Slop Rewrite Rules
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: "Replace [facilitated, supported, contributed, assisted, spearheaded, ameliorated, streamlined, enhanced, optimized, empowered, transformed] with concrete actions."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-18
  name: include_metric_context
  category: VOICE
  what: "Add timeframe, base, or team size context to every metric ($2M over what period? on what base? with what team?)."
  why: Orphan metrics fail the so-what test; context separates fabricated metrics from real ones.
  sources:
    - doc: cvchecklists_1.md
      section: F. AI content tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Achievement Bullets
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: "Each metric bullet includes period, baseline, or scope."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-19
  name: vary_bullet_openings
  category: VOICE
  what: "Vary bullet opening verbs. Do not start three bullets in a row with the same verb (\"Spearheaded the redesign...\", \"Spearheaded the rollout...\", \"Spearheaded the migration...\")."
  why: Repeated openings are a structural AI tell and read as careless.
  sources:
    - doc: cvchecklists_1.md
      section: B. Structural AI tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Structural AI Tells
      round: 1
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: Flag same opening verb across 3+ consecutive bullets.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-21
  name: max_sentence_35_words
  category: VOICE
  what: No sentence longer than 35 words; cut or split.
  why: Long sentences are AI overflow. Recruiters skim and miss embedded info.
  sources:
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "max(sentence_word_count) <= 35."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-23
  name: voice_match_prior_writing
  category: VOICE
  what: "Compare final CV and cover letter against 3 to 5 prior writing samples (emails, posts, LinkedIn About). Voice mismatch indicates AI residue."
  why: |
    Voice consistency is what recruiters detect first; mismatched register is the strongest current AI signal.
  sources:
    - doc: cvchecklists_1.md
      section: J. Anti-slop workflow
      round: 1
    - doc: cvchecklists_1a.md
      section: Human Voice Preservation
      round: 1
    - doc: cvchecklists_2.md
      section: L. Voice fingerprint
      round: 2
    - doc: cvchecklists_3.md
      section: B. Voice fingerprint
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: No prior samples available.
  check_method:
    type: semantic_check
    spec: "Diff(draft, voice_sample) for mismatched markers; flag."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-25
  name: remove_mismatched_register
  category: VOICE
  what: "Remove consultant-speak, startup-speak, or corporate-speak that does not match the applicant's genuine voice or the target employer's culture."
  why: "Register mismatch reads as performance, undermining trust."
  sources:
    - doc: cvchecklists_1b.md
      section: Applicant Voice Calibration
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Detect register mismatch between applicant voice and target culture.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-26
  name: delete_no_signal_sentences
  category: VOICE
  what: "Delete any sentence that only sounds professional, says the obvious, hides uncertainty, cannot be defended, or could belong to any candidate."
  why: The five-question filter removes AI residue without adding any.
  sources:
    - doc: cvchecklists_1a.md
      section: AI Rewrite QA
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Apply five-question delete filter on every sentence.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-27
  name: bullet_so_what_test
  category: VOICE
  what: "Every bullet must pass the so-what test. If a recruiter could shrug after reading it, rewrite."
  why: So-what is the simplest filter that catches bullets without outcome or impact.
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Reviewer asks so what? of each bullet; flag those with no clear impact."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-04
  name: one_idea_per_bullet
  category: VOICE
  what: "One bullet, one idea. No bullet contains two unrelated achievements joined by \"and\"."
  why: Multi-idea bullets dilute impact and read as padding.
  sources:
    - doc: cvchecklists_1.md
      section: C. Bullet craft
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: "Flag bullets containing 2+ distinct outcome clauses joined by \" and \"."
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-11
  name: no_references_available_line
  category: VOICE
  what: "Do not include \"References available on request\" line on the CV. Maintain a separate references document."
  why: It wastes a row and is implicit; modern recruiters know to ask.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_2.md
      section: G. References
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "Flag \"references available on request\" case-insensitive."
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-13
  name: include_point_of_view
  category: VOICE
  what: "State at least one clear point of view in the CV or cover letter (e.g., \"Prefer monorepos for early-stage teams\", \"Believe accessibility is a P0 not a P2\")."
  why: A POV signals taste and judgement; AI doesn't hold opinions. POVs are interview gold.
  sources:
    - doc: cvchecklists_2.md
      section: K. What AI cannot fake
      round: 2
  applies_when:
    doc_type: [cover_letter, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Conservative industries where neutrality is preferred.
  check_method:
    type: human_review
    spec: At least one POV statement per cover letter.
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-22
  name: high_signal_details
  category: VOICE
  what: "Prefer high-signal details: named problem category, specific user group, specific bottleneck, specific metric, specific workflow, specific decision made."
  why: High-signal detail types are what hiring managers grep for in 6 to 10 seconds.
  sources:
    - doc: cvchecklists_1b.md
      section: High-Signal Detail Types
      round: 2
    - doc: cvchecklists_1b.md
      section: Human Specificity Injectors
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Each bullet includes at least one high-signal specific detail.
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VOICE-24
  name: clean_format_messy_voice
  category: VOICE
  what: "Combine clean format with messy voice: polished layout, idiosyncratic language. Visual polish plus linguistic specificity is the combination AI cannot fake."
  why: Clean layout is parser-safe; messy voice is human-defensible. Together they pass both audiences.
  sources:
    - doc: cvchecklists_3.md
      section: K. Format vs voice tradeoff
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Verify format polished, voice idiosyncratic."
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### AIDETECT

```yaml
- rule_id: JS-AIDETECT-01
  name: strip_gpt4_era_vocab
  category: AIDETECT
  what: "Remove GPT-4 era lexicon: delve, tapestry, landscape as filler, pivotal, crucial, meticulous, meticulously, underscore, testament, vibrant, intricate, intricacies, interplay, garner, bolster, enduring, valuable as filler."
  why: |
    Wikipedia "Signs of AI writing" maintains the canonical evolving list. Resume Genius 2024 hiring-manager survey found AI-generated resumes were the biggest red flag for 625 US hiring managers. Paul Graham's delve tweet remains the most-cited specific tell.
  sources:
    - doc: cvchecklists_1.md
      section: A. Era-specific vocab
      round: 1
    - doc: cvchecklists_1a.md
      section: AI-Sounding Words
      round: 1
    - doc: prior_research
      section: Band 3 Rule 16
      round: 0
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Word used in a JD-keyword pass (rare).
  check_method:
    type: keyword_list
    spec: "Token list: [delve, tapestry, landscape, pivotal, crucial, meticulous, meticulously, underscore, testament, vibrant, intricate, intricacies, interplay, garner, bolster, enduring, valuable, multifaceted, comprehensive, holistic, realm, paradigm, synergy]. Flag each."
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: true
  notes: Operator-locked standing rule; engine blocks publish.
```

```yaml
- rule_id: JS-AIDETECT-04
  name: no_em_dashes
  category: AIDETECT
  what: "No em dashes (U+2014) anywhere. Replace with colon, comma, two sentences, or parentheses."
  why: |
    Em dash is now the strongest single AI tell in 2024 to 2026 drafts. Both human writers and AI detectors flag it. Operator-locked standing rule.
  sources:
    - doc: cvchecklists_1.md
      section: C. Punctuation tells
      round: 1
    - doc: cvchecklists_1.md
      section: L. Operator-specific rules
      round: 1
    - doc: cvchecklists_1a.md
      section: Punctuation AI Tells
      round: 1
    - doc: cvchecklists_2.md
      section: F. Fake humanising
      round: 2
    - doc: prior_research
      section: Band 3 Rule 19
      round: 0
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Quoted material in CopyRoom context.
  check_method:
    type: regex
    spec: "Character scan for U+2014. count(/—/g) == 0."
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: Operator-locked standing rule.
```

```yaml
- rule_id: JS-AIDETECT-08
  name: no_markdown_residue
  category: AIDETECT
  what: "No unrendered markdown literals: **bold**, ## headings, [text](url) links, backtick code, ---  horizontal rules, > blockquotes."
  why: |
    Markdown asterisks that didn't render get submitted as literal **text**; the single most embarrassing AI tell.
  sources:
    - doc: cvchecklists_1.md
      section: G. Format tells from paste
      round: 1
    - doc: cvchecklists_1a.md
      section: Punctuation AI Tells
      round: 1
    - doc: cvchecklists_2.md
      section: J. Cross-modal AI tells
      round: 2
    - doc: cvchecklists_1b.md
      section: Document Hygiene
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "\\*\\*[^*]+\\*\\*|^#{1,6}\\s|`[^`]+`|\\[[^\\]]+\\]\\([^\\)]+\\)|^---$|^>"
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-14
  name: no_results_driven
  category: AIDETECT
  what: "Remove \"results-driven\" and \"results-oriented\"."
  why: Both are 1990s-style filler now dominant in AI summaries.
  sources:
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
    - doc: cvchecklists_2.md
      section: E. AI summary tells
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "results-(driven|oriented)"
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-19
  name: no_purposeful_typo
  category: AIDETECT
  what: Don't add a typo on purpose. Recruiters dock for typos.
  why: "The \"look human\" tactic backfires; spellcheck pass with zero typos is the standard."
  sources:
    - doc: cvchecklists_2.md
      section: F. Fake humanising
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Spellcheck pass with 0 typos required.
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-20
  name: no_open_ai_prompts
  category: AIDETECT
  what: "Avoid open AI prompts: \"Make this sound more professional\", \"Polish this\", \"Write me a CV\". Use constrained edits only."
  why: |
    Open prompts produce the highest-slop output. Constrained edits (rewrite using these facts only, shorten N%, suggest verbs, name gaps vs JD) produce defensible drafts.
  sources:
    - doc: cvchecklists_3.md
      section: A. Prompt design floor
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: "prompts contain \"make this sound|polish this|write me a CV\""
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-22
  name: detector_redacted_only
  category: AIDETECT
  what: "Never submit a real CV to public detector tools. Use only a redacted copy. Treat scores as false-positive risk awareness, never as a writing target."
  why: |
    Liang et al. 2023: 61.3% false-positive rate against non-native English writers (Cell Patterns). Public detectors retain content and may train on it.
  sources:
    - doc: cvchecklists_1.md
      section: K. Tools
      round: 1
    - doc: cvchecklists_1a.md
      section: Detector And Privacy Safety
      round: 1
    - doc: cvchecklists_1b.md
      section: Anti-Detector-Risk
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Block submission of real CV; require redacted copy; do not target a score.
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-30
  name: no_ai_in_assessments
  category: AIDETECT
  what: "Do not use AI to author skill-assessment answers, take-home tests, or live interview tasks unless the employer explicitly allows it."
  why: AI use during assessments where forbidden is grounds for offer rescission and industry blacklist.
  sources:
    - doc: cvchecklists_1b.md
      section: Employer AI Policy
      round: 2
  applies_when:
    doc_type: [assessment, take_home]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Employer explicitly allows AI assistance.
  check_method:
    type: human_review
    spec: Block AI use on assessments where forbidden.
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-31
  name: respect_employer_ai_policy
  category: AIDETECT
  what: Search the job ad and portal for AI-use rules. Follow any explicit no-AI instruction. Disclose AI assistance when asked.
  why: Some employers ban AI in submissions; non-disclosure is a trust failure.
  sources:
    - doc: cvchecklists_1a.md
      section: Detector And Privacy Safety
      round: 1
    - doc: cvchecklists_1b.md
      section: Employer AI Policy
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: "Scan ad/portal for no AI|without AI assistance|authentic; comply."
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-02
  name: strip_gpt4o_era_vocab
  category: AIDETECT
  what: "Remove GPT-4o era lexicon: align with, bolstered, crucial, emphasizing, emphasising, enhance, enduring, fostering, highlighting, pivotal, showcasing, underscore, vibrant."
  why: |
    Wikipedia "Signs of AI writing" tracks the shift from GPT-4 to GPT-4o tells across mid-2024 to mid-2025.
  sources:
    - doc: cvchecklists_1.md
      section: A. Era vocab
      round: 1
    - doc: cvchecklists_1a.md
      section: AI Words
      round: 1
    - doc: prior_research
      section: Band 3 Rule 17
      round: 0
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD mirror (rare).
  check_method:
    type: keyword_list
    spec: Token list scan with replacement suggestions.
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: true
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-03
  name: strip_gpt5_era_vocab
  category: AIDETECT
  what: "Remove second-tier GPT-4.5 to GPT-5.5 / Claude 3.5 to 4.5 era vocab: thoughtful, intentional, elevated, considered, crafted, curated, orchestrate, operationalise, actionable, north star, single source of truth, first principles, high-leverage, high-velocity, rapid iteration, fail fast, ship fast, 10x, force multiplier, second-order effects, compounding, asymmetric, scrappy, lean and mean, ruthless prioritisation, obsessed with, deeply, uniquely positioned, well-positioned, battle-tested, production-grade, enterprise-grade, world-class, best-in-class, industry-leading, category-defining, purpose-built, white-glove."
  why: These tells came online with GPT-4.5 to GPT-5.5 and Claude 3.5 to 4.5 (2025-2026).
  sources:
    - doc: cvchecklists_2.md
      section: A. Second-tier AI vocabulary
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD mirror only.
  check_method:
    type: keyword_list
    spec: Regex over the listed phrases.
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: true
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-07
  name: no_unicode_arrows_glyphs
  category: AIDETECT
  what: "No unicode arrows, decorative bullets, or non-standard dashes (→, ⇒, ➜, ↦, ⟶). Use hyphen or \"to\"."
  why: AI loves arrows; humans rarely use them in CVs.
  sources:
    - doc: cvchecklists_1.md
      section: C. Punctuation tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Punctuation AI Tells
      round: 1
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "[\\u2190-\\u21FF\\u2022\\u2013\\u2014\\u2192\\u21D2\\u279C]"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-09
  name: no_rule_of_three
  category: AIDETECT
  what: "Detect triadic constructions (three short phrases after a colon or after a single verb): \"I bring strategy, execution, and discipline.\" Either keep two clauses or replace with one specific."
  why: |
    Rule of three is a structural tell that survived through GPT-5; senior cover letters typically use two clauses, not three.
  sources:
    - doc: cvchecklists_1.md
      section: B. Structural AI tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Structural AI Tells
      round: 1
    - doc: cvchecklists_3.md
      section: E. Anti-fluency pass
      round: 3
    - doc: prior_research
      section: Band 3 Rule 18
      round: 0
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD-quoted phrase the applicant is mirroring.
  check_method:
    type: regex
    spec: "[,;:]\\s\\w+[,;]\\s\\w+[,;]\\s(and|or)\\s\\w+. Sentence-level flag."
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-10
  name: no_rhetorical_questions
  category: AIDETECT
  what: No self-posed rhetorical questions inside CV or cover letter paragraphs.
  why: AI loves the rhetorical-question pattern; humans rarely write it in CVs.
  sources:
    - doc: cvchecklists_1.md
      section: B. Structural tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Structural AI Tells
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Cover letter opening question that names a real shared problem (rare).
  check_method:
    type: regex
    spec: "Flag ? characters in CV/cover letter prose."
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-11
  name: no_bolded_lead_in_every_bullet
  category: AIDETECT
  what: "Don't use bolded lead-ins on every bullet (\"**Strategic Leadership:** Led...\")."
  why: Bolded-lead-in is one of the strongest current AI tells in CVs.
  sources:
    - doc: cvchecklists_1.md
      section: B. Structural tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Punctuation AI Tells
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "Flag if >50% of bullets start with bolded short phrase + colon."
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-12
  name: cut_hedging_phrases
  category: AIDETECT
  what: "Cut hedging phrases: \"It's worth noting that...\", \"It's important to note...\", \"may potentially\", \"could potentially\", \"might be able to\"."
  why: Humans cut these; AI multiplies them.
  sources:
    - doc: cvchecklists_1.md
      section: D. AI tone tells
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "it\\'s (worth|important) (noting|to note|mentioning)|may potentially|could potentially|might be able to"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-13
  name: strip_filler_intensifiers
  category: AIDETECT
  what: "Remove seamlessly, effortlessly, passionate about, passionate, excited to, truly, genuinely, incredibly, extremely, very, really, quite, simply."
  why: |
    Robert Walters 2026 AU guide flags "passionate" as the single most overused word in AU cover letters; reads as junior energy.
  sources:
    - doc: cvchecklists_1.md
      section: D. AI tone tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Tone AI Tells
      round: 1
    - doc: cvchecklists_3.md
      section: H. AI residue scan
      round: 3
    - doc: prior_research
      section: Band 3 Rule 21
      round: 0
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "JD explicitly asks for \"someone passionate about X\". Mirror once."
  check_method:
    type: keyword_list
    spec: Token scan over the filler list.
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-15
  name: no_cross_functional_stakeholder_default
  category: AIDETECT
  what: "Don't list \"cross-functional collaboration\" or \"stakeholder management\" as if a differentiator. They are baseline expectations for senior roles."
  why: Both are default skills at senior; listing them as differentiators reads as AI summary.
  sources:
    - doc: cvchecklists_2.md
      section: E. AI summary tells
      round: 2
    - doc: cvchecklists_1b.md
      section: AI Builder Output Audit
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Used to introduce a specific cross-functional outcome with named teams.
  check_method:
    type: keyword_list
    spec: "cross-functional|stakeholder management as standalone differentiator"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-16
  name: one_specific_per_cover_paragraph
  category: AIDETECT
  what: "Every non-closing paragraph in a cover letter contains at least one specific anchor: a number, a named project, a named client, a named tool, or a date."
  why: |
    Specificity is the inverse of AI fluency. Robert Walters 2026 AU guide and Resume Genius 2024: AI drafts default to claim-without-anchor; humans default to anchor-with-claim.
  sources:
    - doc: prior_research
      section: Band 3 Rule 22
      round: 0
    - doc: cvchecklists_1b.md
      section: High-Signal Detail Types
      round: 2
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Pure closing paragraph (sign-off + thanks).
  check_method:
    type: semantic_check
    spec: "For each non-closing paragraph, require at least one of: digit, proper noun matching known-brand list, named tool from JD."
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-18
  name: rewrite_not_evade
  category: AIDETECT
  what: "If a detector flags a section, rewrite it to be more specific and defensible, never with deliberate typos, slang, fake folksy phrases, or random contractions."
  why: |
    Adding "honestly" or "look," to defeat a detector damages quality and recruiters spot it. Specificity is the only legitimate fix.
  sources:
    - doc: cvchecklists_1.md
      section: J. Anti-slop workflow
      round: 1
    - doc: cvchecklists_1a.md
      section: Detector-Risk Patterns
      round: 1
    - doc: cvchecklists_1b.md
      section: Anti-Detector-Risk
      round: 2
    - doc: cvchecklists_2.md
      section: F. Fake humanising
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Reject humaniser-tool outputs; rewrite with specifics instead.
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-21
  name: never_accept_ai_verbatim
  category: AIDETECT
  what: "Never accept AI output verbatim. Shorten, sharpen, cut hedging, add a specific, run voice-match."
  why: AI-as-editor (not writer) is the only workflow that produces defensible drafts.
  sources:
    - doc: cvchecklists_1.md
      section: J. Anti-slop workflow
      round: 1
    - doc: cvchecklists_1a.md
      section: AI Rewrite QA
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Diff every AI suggestion; final must include human edits.
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-24
  name: cover_avoid_three_I_starts
  category: AIDETECT
  what: "Don't start three sentences in a row with \"I\"."
  why: Triple-I openings are a cover-letter AI pattern that fails the read-aloud test.
  sources:
    - doc: cvchecklists_1.md
      section: I. Cover patterns
      round: 1
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "3+ consecutive sentences starting with \"I \""
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-25
  name: challenge_fake_transformation
  category: AIDETECT
  what: "Challenge \"transformed\", \"revolutionized\", \"reimagined\", \"reshaped\", \"modernized\", \"paradigm shift\", \"step change\" without evidence."
  why: Transformation language is empty without specific before/after metric.
  sources:
    - doc: cvchecklists_1b.md
      section: Fake Transformation
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Paired with specific before/after metric.
  check_method:
    type: keyword_list
    spec: "transformed|revolutionized|reimagined|reshaped|modernized|paradigm shift|step change"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-26
  name: challenge_empty_authority
  category: AIDETECT
  what: "Challenge empty-authority phrases: trusted advisor, subject matter expert, go-to person, key contributor, instrumental, driving force, recognized for, known for."
  why: These signal authority without evidence; replace with specific demonstration.
  sources:
    - doc: cvchecklists_1b.md
      section: Empty Authority
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: External credential supports the title.
  check_method:
    type: keyword_list
    spec: "trusted advisor|subject matter expert|go-to person|key contributor|instrumental|driving force|recognized for|known for"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-27
  name: challenge_vague_collaboration
  category: AIDETECT
  what: "Challenge vague collaboration phrases: \"partnered closely\", \"hand in hand\", \"aligned stakeholders\", \"built consensus\", \"bridged teams\", \"facilitated collaboration\"."
  why: Collaboration without named teams is AI default.
  sources:
    - doc: cvchecklists_1b.md
      section: Vague Collaboration
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Names specific teams/people.
  check_method:
    type: keyword_list
    spec: "partnered closely|hand in hand|aligned stakeholders|built consensus|bridged teams|facilitated collaboration|cross-functional partners"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-28
  name: challenge_hollow_delivery
  category: AIDETECT
  what: "Challenge hollow delivery phrases: \"delivered outcomes\", \"executed initiatives\", \"drove execution\", \"moved projects forward\", \"ensured completion\", \"met business needs\"."
  why: Delivery language without named output is AI filler.
  sources:
    - doc: cvchecklists_1b.md
      section: Hollow Delivery
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Paired with named outcome.
  check_method:
    type: keyword_list
    spec: "delivered outcomes|executed initiatives|advanced priorities|drove execution|moved projects forward|ensured completion|met business needs"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-29
  name: challenge_generic_ai_language
  category: AIDETECT
  what: "Challenge generic AI language: AI-driven, AI-powered, intelligent automation, agentic, LLM-enabled, machine-learning enhanced, smart automation, autonomous system, copilot-style without describing the actual user task."
  why: AI hype-language is the highest-signal slop indicator in 2026.
  sources:
    - doc: cvchecklists_1b.md
      section: Generic AI Language
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Paired with named task and measurable result.
  check_method:
    type: keyword_list
    spec: "AI-driven|AI-powered|intelligent automation|agentic workflow|LLM-enabled|machine-learning enhanced|smart automation|autonomous system|copilot-style"
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-17
  name: vary_sentence_length
  category: AIDETECT
  what: Vary sentence length deliberately; mix short (5 words) and long (25 words). AI defaults to a comfortable 15 to 25 word range (low burstiness).
  why: |
    Burstiness (variation in sentence length and perplexity) is the strongest statistical signal detectors use. Humans are high-burst; AI is low-burst.
  sources:
    - doc: cvchecklists_1.md
      section: E. Rhythm tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Human Voice Preservation
      round: 1
    - doc: cvchecklists_2.md
      section: G. Detection-by-tooling
      round: 2
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "stdev(sentence_length) > threshold."
  severity: INFO
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-23
  name: anti_fluency_pass
  category: AIDETECT
  what: "Apply the anti-fluency pass before finalising: break one perfect parallel, drop one transitional sentence, combine two short bullets into one with a tradeoff, replace one polished adjective with a plainer noun, add one fragment for emphasis, swap one passive to active."
  why: Six small moves reliably reduce the AI fingerprint without damaging substance.
  sources:
    - doc: cvchecklists_3.md
      section: E. Anti-fluency pass
      round: 3
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Run anti-fluency pass before publish.
  severity: INFO
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-AIDETECT-32
  name: asymmetric_effort_six_additions
  category: AIDETECT
  what: "Add six concrete asymmetric additions across CV and cover letter: 1 anecdote per role, 1 named project per role, 1 named tradeoff, 1 defensible number, 1 company-research mention, 1 specific person at the company."
  why: Six concrete additions put the document outside the AI-output distribution entirely.
  sources:
    - doc: cvchecklists_2.md
      section: M. Asymmetric effort
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "Count of asymmetric additions >= 6."
  severity: INFO
  decay_period_days: 90
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
- rule_id: JS-AIDETECT-33
  name: no_negative_parallelism
  category: AIDETECT
  what: "Flag not-X-but-Y phrasing and related negative parallelism that reads like model-polished contrast."
  why: |
    The PR #951 anti-AI-slop corpus calls out negative parallelism as a common synthetic rhythm in CVs and cover letters. The check gives JobSmith a deterministic first pass before human review.
  sources:
    - doc: anti-ai-slop_1_2.md
      section: C1/M12 negative parallelism and detector tells
      round: 1
    - doc: anti-ai-slop_2_2.md
      section: Structure fixes
      round: 1
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: A direct quote from the job ad or a named quote where the contrast is intentional and sourced.
  check_method:
    type: regex
    spec: '\b(?:it''s\s+)?not\s+[^.!?]{2,80}?(?:,\s*)?(?:but|it''s|it is)\s+[^.!?]{2,120}'
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-20
  volatile: true
  notes: "PR #951 first ingestion slice."
- rule_id: JS-AIDETECT-34
  name: no_bold_term_explainer_format
  category: AIDETECT
  what: "Flag bold-label or title-colon explanation lines such as Strategic Fit: ... when they appear as formulaic AI list formatting."
  why: |
    The PR #951 anti-AI-slop corpus identifies bold term plus explanation formatting as a high-frequency AI draft artifact. CV and cover outputs should use natural headings or real bullets instead.
  sources:
    - doc: anti-ai-slop_1_2.md
      section: E1 bold term explanation format
      round: 1
    - doc: anti-ai-slop_2_2.md
      section: AI Vocabulary Watchlist and structure fixes
      round: 1
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: A real section heading in the template or a target form field label.
  check_method:
    type: regex
    spec: '(?:^|\n)(?:[-*]\s*)?(?:\*\*)?[A-Z][A-Za-z ]{2,32}(?::(?:\*\*)?|\*\*:)\s+[A-Z]'
  severity: WARN
  decay_period_days: 90
  last_verified_at: 2026-05-20
  volatile: true
  notes: "PR #951 first ingestion slice."
- rule_id: JS-AIDETECT-35
  name: no_detector_evasion_prompts
  category: AIDETECT
  what: "Block detector-evasion or humanizer prompt residue in application copy."
  why: |
    The PR #951 anti-AI-slop corpus is explicit that detector evasion is not proof of quality or authorship. If this residue appears in a draft, JobSmith should block submit-ready status.
  sources:
    - doc: anti-ai-slop_1_2.md
      section: Humanizer prompt families
      round: 1
    - doc: anti-ai-slop_2_2.md
      section: Prompts to avoid and detector policy
      round: 1
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never in submit-ready application copy.
  check_method:
    type: keyword_list
    spec: "Phrase list: [make this undetectable, bypass AI detectors, fool AI detectors, humanize this AI text, beat AI detection, evade detection, pass as human, remove AI detection]"
  severity: ERROR
  decay_period_days: 90
  last_verified_at: 2026-05-20
  volatile: true
  notes: "PR #951 first ingestion slice."
```

### COVER

```yaml
- rule_id: JS-COVER-10
  name: cover_must_name_company
  category: COVER
  what: "Cover letter mentions the company by name after the salutation, and the named company matches the target employer (not pasted from previous tailoring)."
  why: Wrong-company-name is the single most embarrassing AI tell and an instant reject.
  sources:
    - doc: cvchecklists_1.md
      section: F. AI content tells
      round: 1
    - doc: cvchecklists_1a.md
      section: Cover Letter Checks
      round: 1
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: Company name appears in body and matches target employer; triple-check spelling.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-11
  name: cover_no_new_claims
  category: COVER
  what: Cover letter must not add experience not present in the CV or create a mismatch.
  why: CV-cover mismatches are a top recruiter red flag.
  sources:
    - doc: cvchecklists_1b.md
      section: Cover Letter Round 2
      round: 2
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: Verify all cover letter claims are supported in CV.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-01
  name: salutation_hierarchy
  category: COVER
  what: "Use this priority: (1) named hiring manager when verifiable; (2) \"Dear <Role-title> Team\" when a department is visible; (3) \"Dear Hiring Team\" as safe default. Never \"To Whom It May Concern\" or \"Dear Sir/Madam\"."
  why: |
    Indeed 2026, Glassdoor 2026, Work It Daily 2026 converge: named is best, "Dear Hiring Team" reads more inclusive than "Dear Hiring Manager" for team-led hiring, "To Whom It May Concern" reads as 1990s form letter.
  sources:
    - doc: cvchecklists_1.md
      section: E. Cover
      round: 1
    - doc: prior_research
      section: Band 5 Rule 28
      round: 0
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD specifies a salutation form.
  check_method:
    type: regex
    spec: "Flag \"To Whom It May Concern|Dear Sir/Madam\"."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-02
  name: cover_letter_one_page
  category: COVER
  what: "Cover letter is one page max, 3 to 4 short paragraphs."
  why: Modern norm; longer letters lose readers in the first 30 seconds.
  sources:
    - doc: cvchecklists_1.md
      section: E. Cover
      round: 1
    - doc: cvchecklists_1a.md
      section: Cover Letter Checks
      round: 1
    - doc: cvchecklists_1b.md
      section: Cover Letter Round 2
      round: 2
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Government/academic EOI explicitly asks for longer.
  check_method:
    type: count_threshold
    spec: "Cover letter <=1 page, 3 to 4 paragraphs."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-04
  name: cover_opening_role_company_specific
  category: COVER
  what: "Opening line names the role and the company and signals interest with one specific detail (recent product, public announcement, named team)."
  why: |
    Opening with a specific signal proves the applicant read the role; AI cover letters skip the specific.
  sources:
    - doc: cvchecklists_1.md
      section: E. Cover
      round: 1
    - doc: cvchecklists_1a.md
      section: Cover Letter Checks
      round: 1
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: "First paragraph mentions company name, role, and one specific detail."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-05
  name: cover_evidence_paragraph
  category: COVER
  what: Paragraph 2 provides one specific story with an outcome demonstrating capability for the role.
  why: The strongest evidence is one named story with a measurable outcome.
  sources:
    - doc: cvchecklists_1.md
      section: E. Cover
      round: 1
    - doc: cvchecklists_1a.md
      section: Cover Letter Checks
      round: 1
    - doc: cvchecklists_1b.md
      section: Cover Letter Round 2
      round: 2
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Paragraph contains a concrete story with measurable outcome.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-06
  name: cover_why_this_company_concrete
  category: COVER
  what: "Reference something concrete about the company, not \"I love your mission\" or \"Your esteemed organisation\". Mention a recent product, an announced strategy, a named person whose work you respect."
  why: Concrete why-this-company is what hiring managers grade. Generic praise reads as AI.
  sources:
    - doc: cvchecklists_1.md
      section: E. Cover
      round: 1
    - doc: cvchecklists_1a.md
      section: Cover Letter Checks
      round: 1
    - doc: cvchecklists_1b.md
      section: Cover Letter Round 2
      round: 2
    - doc: cvchecklists_3.md
      section: G. Why us
      round: 3
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: "Flag \"I love your mission|your esteemed organisation|Your company\\'s commitment to innovation|Your innovative approach to\"."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-09
  name: no_great_candidate_claims
  category: COVER
  what: "Avoid \"I believe I am a strong candidate\", \"I am confident I am the right person\", \"I check every box\", \"I tick all the boxes\", \"I am confident I would be a valuable asset to your team\"."
  why: |
    Robert Walters 2026 AU explicitly lists these as "empty phrases" recruiters discount immediately. They survive in AI drafts because they read as well-formed English.
  sources:
    - doc: cvchecklists_1.md
      section: I. Cover patterns
      round: 1
    - doc: prior_research
      section: Band 5 Rule 32
      round: 0
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: Phrase list scan for empty closers and self-praise.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-12
  name: cover_opener_blocklist
  category: COVER
  what: "Avoid clichéd cover-letter openers: \"I am writing to express my interest\", \"I came across your job posting\", \"I believe my skills and experience make me an ideal candidate\", \"Thank you for considering my application\"."
  why: These openers signal AI or 1990s template; recruiters skim past them.
  sources:
    - doc: cvchecklists_1.md
      section: I. Cover patterns
      round: 1
    - doc: cvchecklists_1a.md
      section: AI Phrases
      round: 1
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: Phrase blocklist for cover-letter openings.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-13
  name: cover_voice_match_interview
  category: COVER
  what: Cover letter sounds like the applicant would speak in interview.
  why: Voice match between cover and interview prevents the interview shock that costs offers.
  sources:
    - doc: cvchecklists_1a.md
      section: Cover Letter Checks
      round: 1
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Voice-match check between cover letter and applicant interview style.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-14
  name: break_ai_cover_letter_shape
  category: COVER
  what: "Break the AI cover-letter scaffolding: don't default to 3 paragraphs of 4 to 5 sentences each at 280 to 350 words. Use 2 or 5 paragraphs, start with an anecdote rather than self-introduction, vary paragraph length."
  why: |
    The classic AI cover shape is now its own pattern; breaking it reduces detector signal and feels more human.
  sources:
    - doc: cvchecklists_2.md
      section: D. AI cover scaffolding
      round: 2
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "paragraphs != 3 OR sentences_per_para varies OR word_count outside 280-350."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-03
  name: au_length_250_400
  category: COVER
  what: AU cover letters target 250 to 400 words on one A4 page. A 220-word letter reads more confident than a 320-word letter.
  why: Robert Walters 2026 AU and SEEK 2026 specify this band. AU norm is shorter than US 200 to 500.
  sources:
    - doc: cvchecklists_3.md
      section: F. Delete first
      round: 3
    - doc: prior_research
      section: Band 5 Rule 29
      round: 0
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: AU
    ats_vendor: any
  when_not_applies: Government or academic EOI requesting longer statement.
  check_method:
    type: count_threshold
    spec: "220 <= word_count <= 400."
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-07
  name: cover_clear_next_step
  category: COVER
  what: "Closing has a clear next step (e.g. \"Happy to share more in a 20-minute conversation.\")."
  why: Cover letters end with a call to action; weak closings get filed without reply.
  sources:
    - doc: cvchecklists_1.md
      section: E. Cover
      round: 1
    - doc: cvchecklists_1a.md
      section: Cover Letter Checks
      round: 1
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: Final paragraph contains a direct call-to-action.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-COVER-08
  name: five_paragraph_structure_au
  category: COVER
  what: "AU senior cover letter uses a 5-block structure: (1) hook naming role and a credibility anchor; (2) JD alignment with two or three named matches; (3) differentiator unique to this applicant; (4) location and flexibility statement; (5) thanks and call to discuss."
  why: |
    Cross-referenced across SEEK 2026, Robert Walters 2026, and Jobsmith v0 corpus from 30+ historical letters. Most common in AU senior applications.
  sources:
    - doc: prior_research
      section: Band 5 Rule 31
      round: 0
  applies_when:
    doc_type: [cover_letter]
    role_family: any
    age_band: any
    jurisdiction: AU
    ats_vendor: any
  when_not_applies: Short EOI under 200 words.
  check_method:
    type: count_threshold
    spec: Count paragraphs; verify each block against role criteria.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### LINKEDIN

```yaml
- rule_id: JS-LINKEDIN-01
  name: linkedin_titles_match_cv
  category: LINKEDIN
  what: "LinkedIn job titles, employer names, and date ranges match the CV exactly."
  why: |
    Workday and some iCIMS instances cross-reference titles and dates between LinkedIn and the CV; diverging values are flagged for manual review.
  sources:
    - doc: cvchecklists_1.md
      section: F. LinkedIn alignment
      round: 1
    - doc: cvchecklists_1a.md
      section: LinkedIn Consistency
      round: 1
    - doc: cvchecklists_1b.md
      section: Suspicion Triggers
      round: 2
  applies_when:
    doc_type: [cv, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Cross-check each role title, employer, date range between CV and LinkedIn."
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-03
  name: customised_linkedin_url
  category: LINKEDIN
  what: "LinkedIn URL on the CV uses the customised slug (linkedin.com/in/janesmith), not the default with random characters (linkedin.com/in/jane-smith-1a2b3c4d5e)."
  why: Default-slug URLs read as junior; clean slug reads as polished.
  sources:
    - doc: cvchecklists_1.md
      section: F. LinkedIn alignment
      round: 1
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [cv, linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "LinkedIn URL ends with clean slug, not /in/[name]-[hex]/."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-04
  name: linkedin_headline_target_role
  category: LINKEDIN
  what: "LinkedIn headline is what the applicant wants to be hired for plus one differentiator, not the current job title."
  why: Recruiters search by headline; current-title headline limits reach to current-title searches.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Headline includes target role + differentiator.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-05
  name: linkedin_about_format
  category: LINKEDIN
  what: "LinkedIn About: 3 paragraphs max, first person, with a call-to-action at the bottom, includes 3 to 5 keywords."
  why: About section is the second-most-read part after headline; structured format wins.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "paragraphs<=3, first-person, CTA present, 3 to 5 keywords."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-08
  name: linkedin_skills_20_30
  category: LINKEDIN
  what: List 20 to 30 high-signal LinkedIn skills. Endorsements matter most for the top 3.
  why: "Past 30, return diminishes; top 3 endorsements are the leverage point."
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "20 <= skills_count <= 30."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-11
  name: open_to_work_recruiter_only
  category: LINKEDIN
  what: "If currently employed, set Open to Work visible to recruiters only. Do not display the #OPENTOWORK frame."
  why: "Visible #OPENTOWORK can trigger employment-side discovery and reads desperate to recruiters."
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Unemployed and explicitly signalling availability.
  check_method:
    type: format_check
    spec: "OpenToWork visibility = recruiters_only."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-02
  name: linkedin_skills_mirror
  category: LINKEDIN
  what: LinkedIn Skills section mirrors the top of the CV's skills section. Top 5 to 10 skills aligned.
  why: Recruiters cross-reference; misaligned skills read as keyword stuffing on one side.
  sources:
    - doc: cvchecklists_1.md
      section: F. LinkedIn alignment
      round: 1
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Top 5 to 10 skills aligned between CV and LinkedIn.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-06
  name: linkedin_featured_pinned
  category: LINKEDIN
  what: "Pin 3 to 5 portfolio pieces, posts, or case studies that match the target role. Refresh quarterly."
  why: Featured items are the first non-skim signal recruiters see.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: Featured count 3 to 5; updated within 90 days.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-07
  name: linkedin_experience_longer
  category: LINKEDIN
  what: LinkedIn Experience descriptions are longer than CV descriptions (LinkedIn is not ATS-constrained).
  why: LinkedIn allows depth; not using it wastes the channel.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "LinkedIn role text > CV role text length."
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-09
  name: linkedin_recs_5_10
  category: LINKEDIN
  what: "Aim for 5 to 10 LinkedIn recommendations. Ask the day after a successful project, not years later."
  why: Recommendations age fast; quantity matters but recency more.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "5 <= recommendations_count <= 10."
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-10
  name: linkedin_weekly_activity
  category: LINKEDIN
  what: Post or comment thoughtfully once a week. Recruiters check the Activity tab.
  why: Activity tab is a soft trust signal; weekly cadence is the floor.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
    - doc: cvchecklists_3.md
      section: M. Personal brand
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: Weekly LinkedIn activity.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-12
  name: linkedin_500_connections
  category: LINKEDIN
  what: "Reach 500+ connections to unlock the \"500+\" label; quality over quantity past that."
  why: 500+ is a soft credibility threshold most recruiters notice.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "connections >= 500."
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-13
  name: linkedin_photo_recent
  category: LINKEDIN
  what: "Profile photo: head and shoulders, neutral background, smiling but not goofy, recent (within last 3 years)."
  why: |
    Photo recency and quality is a soft trust signal; old photo plus claimed recent work reads inconsistent.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Photo recent and appropriate.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-14
  name: linkedin_banner_relevant
  category: LINKEDIN
  what: "LinkedIn banner is not the default blue and is role-relevant, not a stock cityscape."
  why: Default banner reads as unfinished profile; relevant banner is a soft brand signal.
  sources:
    - doc: cvchecklists_3.md
      section: B. LinkedIn as system
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Banner is custom and relevant.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-LINKEDIN-15
  name: one_narrow_expertise
  category: LINKEDIN
  what: One narrow expertise area beats five shallow ones. Maintain a blog or content trail even infrequently for credibility.
  why: Focused expertise compounds visibility; shallow breadth fragments it.
  sources:
    - doc: cvchecklists_3.md
      section: M. Personal brand
      round: 3
  applies_when:
    doc_type: [linkedin]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Brand narrowed to one area.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### VISUAL

```yaml
- rule_id: JS-VISUAL-10
  name: top_third_priority
  category: VISUAL
  what: "The top third of page 1 carries the heavy lifting: name, target role, location, summary tone, strongest first bullet. Recruiters skim in 6 to 10 seconds."
  why: |
    Hiring managers on Blind report skimming CVs in 6 to 10 seconds. Top 4 inches contains everything that matters.
  sources:
    - doc: cvchecklists_1.md
      section: I. Reddit reality check
      round: 1
    - doc: cvchecklists_1a.md
      section: First Impression
      round: 1
    - doc: cvchecklists_3.md
      section: L. 8-second scan
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Top third contains name, role target, strongest evidence; reviewer can name target role within 10 seconds."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-11
  name: first_bullet_strongest
  category: VISUAL
  what: Most recent role's first bullet is the most-read line on the entire CV. Make it the strongest.
  why: First bullet of the most recent role drives the keep-reading decision more than anything else.
  sources:
    - doc: cvchecklists_3.md
      section: L. 8-second scan
      round: 3
    - doc: cvchecklists_1.md
      section: D. Tailoring
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Highest-impact bullet placed first.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-12
  name: portfolio_link_in_header
  category: VISUAL
  what: "Design, creative, motion, UI/UX, and digital design roles include a portfolio URL in the contact block, not stranded at the bottom. Use one canonical portfolio URL, not three."
  why: ATSs that extract a website field look in the top header; design JDs require it.
  sources:
    - doc: cvchecklists_2.md
      section: D. Portfolio discipline
      round: 2
    - doc: prior_research
      section: Band 6 Rule 37
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: "design|creative|motion|ux|ui"
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Engineering or non-visual roles.
  check_method:
    type: regex
    spec: "For role taxonomy in design family, contact block contains URL; count(portfolio_urls)==1."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-13
  name: portfolio_link_works
  category: VISUAL
  what: "Portfolio link loads on mobile, returns HTTP 200, loads under 3 seconds, no certificate warnings (HTTPS), updated within last 6 months."
  why: Dead or stale portfolio links are an instant reject for design roles.
  sources:
    - doc: cvchecklists_2.md
      section: D. Portfolio discipline
      round: 2
    - doc: cvchecklists_1a.md
      section: Portfolio
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: "design|creative"
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "HTTP 200; load_time<3s; HTTPS valid cert; last_modified within 180 days."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-18
  name: spellcheck_company_name
  category: VISUAL
  what: Spellcheck the company name three times in every document. Spellcheck the hiring manager's name and check pronouns on LinkedIn.
  why: Misspelled company name is an instant reject. Wrong pronouns are a soft reject.
  sources:
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Triple-check company name spelling; verify name spelling and pronouns.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-19
  name: no_placeholder_text
  category: VISUAL
  what: "Find-and-replace any leftover placeholder text: [Company], [Role], [Hiring Manager], Lorem ipsum."
  why: Placeholder leftovers are the single most embarrassing AI tell.
  sources:
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
    - doc: cvchecklists_1b.md
      section: Document Hygiene
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "\\[Company\\]|\\[Role\\]|Lorem ipsum|\\[Hiring Manager\\]"
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-20
  name: optimise_top_4_inches
  category: VISUAL
  what: Optimise the top 4 inches of page 1 above everything else. This is what the 8-second scan sees.
  why: The 8-second window is decided by the top of page 1; everything else is interview-stage.
  sources:
    - doc: cvchecklists_3.md
      section: L. 8-second scan
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Top 4in contains name, location, role, summary, strongest bullet."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-01
  name: font_calibri_arial_aptos
  category: VISUAL
  what: "Body font Calibri 11pt or Aptos 11pt or Arial 10.5 to 11pt. Headings 11 to 12pt bold. Name 18 to 22pt. Avoid Comic Sans, Papyrus, Courier, Times New Roman 12pt."
  why: |
    Resume Optimizer Pro 2026 ATS tests rank Calibri 11pt and Arial 11pt at top-tier parse accuracy (>90%) across major ATSs. Aptos is Microsoft 365 default since 2024 and parses cleanly. Times New Roman 12pt is the explicit "instantly dates you" font.
  sources:
    - doc: prior_research
      section: Band 6 Rule 33
      round: 0
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Branded design CVs (rare and ATS-hostile).
  check_method:
    type: format_check
    spec: "DOCX font enumeration; size in [10,12] body, [14,18] headings, [18,22] name."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-02
  name: no_coloured_text_for_content
  category: VISUAL
  what: No coloured text for parseable content. Subtle accent colours allowed only on headings and dividers.
  why: Coloured runs can drop ATS confidence and may not survive greyscale print.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_1a.md
      section: ATS Safety
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Creative roles with explicit colour brand.
  check_method:
    type: format_check
    spec: Detect coloured runs in body text; flag any non-default colour outside headings/dividers.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-03
  name: two_page_max
  category: VISUAL
  what: Senior CVs at 15 years of experience target two pages. Hard ceiling at two pages. One page acceptable for tighter histories.
  why: |
    Jobseeker 2026: 70% of hiring managers prefer two-page CVs for senior candidates. Three pages correlates with reduced read-through.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Structure And Length
      round: 1
    - doc: prior_research
      section: Band 6 Rule 34
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Federal/government (US, AU APS6+), academic, medical: 3 to 5 pages allowed."
  check_method:
    type: count_threshold
    spec: "Page count: 1 to 2 (3+ only with sector override)."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-04
  name: no_widows_orphans
  category: VISUAL
  what: Avoid single-word last lines (widows) and section heading on the bottom line of a page with content on the next page (orphans). Avoid bullets that wrap to next page as a single line. Tighten or rewrite.
  why: Industry typography standard; Word's widowControl is the engine-level fix.
  sources:
    - doc: cvchecklists_1.md
      section: L. Operator-specific
      round: 1
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
    - doc: prior_research
      section: Band 6 Rule 35
      round: 0
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Plain-text submissions.
  check_method:
    type: format_check
    spec: DOCX widowControl paragraph property; visual page-break analysis.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-05
  name: contact_block_top_real_text
  category: VISUAL
  what: "First block on page 1: full name (18 to 22pt), one-line tagline or target role title (11 to 12pt), contact strip with email + phone + city + portfolio URL + LinkedIn URL, separated by spaces or middle-dots. Avoid pipes as separators."
  why: |
    Workday and Greenhouse 2026 parsers reliably extract contact from text-strip-on-top patterns. Pipe separators sometimes mis-parse on Taleo as table cells.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Contact Section
      round: 1
    - doc: prior_research
      section: Band 6 Rule 36
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD specifies a header format.
  check_method:
    type: format_check
    spec: "Block-1 token classifier; allowed separators: spaces, middle-dots."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-06
  name: no_street_address
  category: VISUAL
  what: "Show city and state/region only (e.g., Melbourne, VIC). No street address."
  why: |
    Street address is unnecessary, creates privacy risk, and acts as an indirect age signal in some markets.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Contact Section
      round: 1
    - doc: cvchecklists_2.md
      section: B. Geographic norms
      round: 2
    - doc: prior_research
      section: Band 6 Rule 38
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Government or security-cleared roles requiring it.
  check_method:
    type: regex
    spec: Regex for street-number + street-name pattern in contact block.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-07
  name: ascii_safe_headers
  category: VISUAL
  what: "Headers use plain ASCII characters. Avoid en dashes, em dashes, curly quotes, ligatures, soft hyphens in headers, contact block, and file name."
  why: |
    Some ATSs strip non-ASCII characters from name and email fields, causing surname mismatches downstream.
  sources:
    - doc: prior_research
      section: Band 6 Rule 39
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Body prose where en dash is a legitimate range character (e.g., page ranges in publications list)."
  check_method:
    type: format_check
    spec: Character allow-list for headers.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-14
  name: portfolio_strongest_first
  category: VISUAL
  what: "First portfolio project shown matches the role being applied for. Reorder per application. Each piece has 1-line problem, 1-line solution, your specific contribution if team project."
  why: |
    First project is the recruiter's first impression of the work; ordering by relevance is the highest-leverage portfolio move.
  sources:
    - doc: cvchecklists_2.md
      section: D. Portfolio discipline
      round: 2
    - doc: cvchecklists_1b.md
      section: Portfolio Proof
      round: 2
  applies_when:
    doc_type: [portfolio]
    role_family: "design|creative"
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Verify first project matches JD; each piece has problem/solution/contribution.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-16
  name: au_uk_cv_format
  category: VISUAL
  what: "Australia: 2 to 3 pages senior, no photo, no DOB, include Right to Work line near contact. UK: 2 pages, no photo, no DOB. Canada and NZ: same as US/AU. US: 1 page strict for non-exec, no photo, no DOB, no marital status, \"Resume\" not \"CV\" except academic/medical."
  why: Country-specific norms; getting them wrong reads as out of touch.
  sources:
    - doc: cvchecklists_2.md
      section: B. Geographic norms
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Sector overrides (academic, government)."
  check_method:
    type: format_check
    spec: "Per country: page_count, photo, DOB, marital, work-rights line."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-17
  name: print_bw_test
  category: VISUAL
  what: "Print the CV in black and white. If anything disappears or becomes illegible, fix it."
  why: Many recruiters still print; greyscale render test catches colour-only issues.
  sources:
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Greyscale render test.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-08
  name: filename_convention
  category: VISUAL
  what: "Filename: FirstName_LastName_Company_Role_CV.docx (or Resume in US). Spaces replaced with underscores or hyphens. No version numbers visible to the recruiter (_v3, _final2, FINAL)."
  why: |
    ATS filename parsers sometimes use the filename as a fallback identifier. Version suffixes read amateur.
  sources:
    - doc: cvchecklists_1.md
      section: A. ATS parsing
      round: 1
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
    - doc: prior_research
      section: Band 6 Rule 40
      round: 0
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD specifies a different filename.
  check_method:
    type: regex
    spec: "Filename matches [A-Za-z]+[-_][A-Za-z]+(_(CV|Resume))?(_[A-Za-z0-9]+)*\\.(docx|pdf); flag /final|FINAL|v\\d|draft|copy/."
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-VISUAL-15
  name: education_below_experience_senior
  category: VISUAL
  what: "For experienced candidates (>5 years), Education appears below Experience. For graduates, Education is near the top."
  why: Order reflects current relevance; senior reader expects experience first.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: "Academic, medical, legal CVs: Education first."
  check_method:
    type: human_review
    spec: "If experience >5 years, Education section below Experience."
  severity: INFO
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### METADATA

```yaml
- rule_id: JS-METADATA-01
  name: no_tracked_changes
  category: METADATA
  what: Track Changes is fully accepted/rejected and turned off. No pending revisions in submission file.
  why: Embedded tracked changes expose review history and prior reviewer names.
  sources:
    - doc: cvchecklists_1a.md
      section: Submission Checks
      round: 1
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "DOCX track_changes==off, no pending revisions."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-02
  name: no_embedded_comments
  category: METADATA
  what: Strip embedded DOCX or PDF comments from previous reviewers. No private notes in footers.
  why: Embedded comments leak prior reviewer identity and edit history.
  sources:
    - doc: cvchecklists_1a.md
      section: Submission Checks
      round: 1
    - doc: cvchecklists_2.md
      section: H. Format tells
      round: 2
    - doc: cvchecklists_1b.md
      section: Document Hygiene
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "DOCX comments_count==0; PDF annotations stripped."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-03
  name: pdf_producer_clean
  category: METADATA
  what: "PDF Producer field must not be \"ChatGPT\", \"Claude\", \"Notion AI\", or \"AI Resume Builder\". Re-save through Word, Pages, or a clean PDF tool."
  why: PDF metadata exposes the generating tool; AI tool names in Producer are instant red flags.
  sources:
    - doc: cvchecklists_2.md
      section: H. Format tells
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "PDF Producer !~ /ChatGPT|Claude|Notion AI|AI/i."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-04
  name: pdf_author_clean
  category: METADATA
  what: "PDF Author field is the applicant's name, not a template owner like AmruthPillai, Kickresume User, Reactive Resume, or your colleague who shared the template."
  why: Leftover Author field exposes template provenance and reads as low effort.
  sources:
    - doc: cvchecklists_2.md
      section: H. Format tells
      round: 2
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "PDF/DOCX Author == applicant name; flag known template author names."
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-08
  name: portfolio_links_open_and_current
  category: METADATA
  what: "Every URL on the CV opens, returns HTTP 200, and lands on a publicly accessible page."
  why: Dead links waste recruiter time and read as careless.
  sources:
    - doc: cvchecklists_1a.md
      section: Portfolio
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: Verify each URL returns 200 and is publicly accessible.
  severity: ERROR
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-05
  name: pdf_title_set
  category: METADATA
  what: "PDF Title field set to \"[Name] CV\" or \"[Name] Resume\". Not \"Untitled Document\" or \"Resume Template (1)\"."
  why: PDF Title is what recruiters see in their inbox download list; default values are amateur signals.
  sources:
    - doc: cvchecklists_2.md
      section: H. Format tells
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "PDF Title matches \\w+\\s\\w+\\s(CV|Resume)."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-07
  name: strip_old_metadata
  category: METADATA
  what: Strip document properties that reveal old titles or sensitive old filenames in metadata. Save a clean copy with no embedded version history.
  why: "Old metadata exposes prior employer, prior role title, and edit history."
  sources:
    - doc: cvchecklists_1b.md
      section: Document Hygiene
      round: 2
    - doc: cvchecklists_2.md
      section: E. Second-pass scrub
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "Strip author, title, original filename, version history."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-10
  name: store_generation_provenance
  category: METADATA
  what: "Every generated asset stores its source job ad, source CV version, rule pack version, and human edits applied."
  why: Provenance enables disclosure when asked and supports the source-fact map for every claim.
  sources:
    - doc: cvchecklists_1b.md
      section: CV As Evidence Packet
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Persist provenance (job ad, CV version, rule version, edits) per asset."
  severity: WARN
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-06
  name: pdf_keywords_relevant
  category: METADATA
  what: "PDF Keywords field is empty or contains actual relevant keywords, not template defaults."
  why: Keywords field leaks template provenance and is searchable by some recruiter tools.
  sources:
    - doc: cvchecklists_2.md
      section: H. Format tells
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: PDF Keywords relevant or blank.
  severity: INFO
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-METADATA-09
  name: keep_versioned_submission_log
  category: METADATA
  what: "Log every application: date sent, company, role, ATS vendor, CV version used, cover letter version, screening answers, response within 14 days, interview rounds, offer outcome."
  why: Submission log feeds the dogfooding feedback loop and protects against duplicate applications.
  sources:
    - doc: cvchecklists_1.md
      section: J. Human review
      round: 1
    - doc: cvchecklists_2.md
      section: J. Dogfooding
      round: 2
    - doc: cvchecklists_1a.md
      section: Submission Checks
      round: 1
    - doc: cvchecklists_1b.md
      section: Screening Question Consistency
      round: 2
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Application log captures all fields per application.
  severity: INFO
  decay_period_days: 180
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### PRIVACY

```yaml
- rule_id: JS-PRIVACY-01
  name: no_dob_photo_marital
  category: PRIVACY
  what: "No date of birth, no photo (in most countries), no marital status, no nationality (where not required), no full street address."
  why: |
    These fields expose protected characteristics and create discrimination risk. In AU, US, UK, CA, NZ they are unnecessary.
  sources:
    - doc: cvchecklists_1.md
      section: B. Content structure
      round: 1
    - doc: cvchecklists_1a.md
      section: Contact Section
      round: 1
    - doc: cvchecklists_2.md
      section: B. Geographic norms
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: "AU|US|UK|CA|NZ"
    ats_vendor: any
  when_not_applies: "DACH, Japan, France, Middle East/Gulf where photo and/or DOB are local norm."
  check_method:
    type: format_check
    spec: "Header contains name, location (city/region only), phone, email; flag DOB, photo, marital status, full street address, nationality unless local norm."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-03
  name: no_detector_with_real_pii
  category: PRIVACY
  what: "Never submit a CV containing real name, email, phone, employer, or project names to public AI detector tools."
  why: Public detectors retain or train on uploaded content. Privacy risk and competitive risk.
  sources:
    - doc: cvchecklists_1.md
      section: L. Legal floor
      round: 1
    - doc: cvchecklists_1a.md
      section: Detector And Privacy Safety
      round: 1
    - doc: cvchecklists_1b.md
      section: Anti-Detector-Risk
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Block upload of any CV containing PII to public detectors.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-04
  name: redact_before_external_review
  category: PRIVACY
  what: "Before sending the CV to an external reviewer or tool, redact applicant name to \"Candidate\", employer names, client names, project names, email, phone, address, portfolio tokens, repo names, codenames, salary, references, immigration status, exact dates if not necessary."
  why: External review is a privacy risk surface; redaction template protects PII without losing structure.
  sources:
    - doc: cvchecklists_1b.md
      section: Redaction Before External Review
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Trusted internal reviewer with NDA.
  check_method:
    type: human_review
    spec: Apply redaction template before external send.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-05
  name: protect_nda_confidential
  category: PRIVACY
  what: "No confidential client names, internal codenames, unpublished revenue figures, or NDA-protected material in the CV. Anonymise where restricted."
  why: NDA breaches are termination-grade; client surfaces sue.
  sources:
    - doc: cvchecklists_1a.md
      section: Experience Section
      round: 1
    - doc: cvchecklists_1a.md
      section: Portfolio
      round: 1
  applies_when:
    doc_type: [cv, cover_letter, portfolio]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Client has explicitly consented or public press exists.
  check_method:
    type: human_review
    spec: Reviewer checks for confidential names/projects; anonymise if restricted.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-07
  name: technical_no_secret_leaks
  category: PRIVACY
  what: "Public repos pinned to LinkedIn or referenced on CV do not leak keys, tokens, credentials, or proprietary code."
  why: Leaked secrets are a security failure and an instant reject for security-conscious roles.
  sources:
    - doc: cvchecklists_1a.md
      section: Technical CV Checks
      round: 1
  applies_when:
    doc_type: [cv, linkedin]
    role_family: engineering
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Scan pinned repos for keys, tokens, credentials."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-08
  name: no_current_salary
  category: PRIVACY
  what: "Don't list current salary on CV, cover letter, or in first conversation. If portal forces expected salary, give a band not a number."
  why: "Anchoring to current salary undercuts negotiation. Some jurisdictions (CA, NY, CO, WA) ban asking."
  sources:
    - doc: cvchecklists_2.md
      section: H. Negotiation prep
      round: 2
  applies_when:
    doc_type: [cv, cover_letter, screening]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "Flag /current salary|salary: \\$/ in CV/cover."
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-09
  name: no_reference_contacts_public
  category: PRIVACY
  what: Don't list reference contact details on the CV unless explicitly requested. Maintain a separate references document.
  why: Reference contacts on a CV expose third parties' phone and email to unknown recipients.
  sources:
    - doc: cvchecklists_1b.md
      section: References
      round: 2
    - doc: cvchecklists_2.md
      section: G. References
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Government/academic explicitly requires references on application.
  check_method:
    type: regex
    spec: Detect reference names with phone/email in CV.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-11
  name: handle_demographic_lawfully
  category: PRIVACY
  what: "Disability, accommodation, voluntary demographic answers handled privately and lawfully. Do not infer them into the CV."
  why: Demographic data has separate legal handling; leakage into CV creates discrimination risk.
  sources:
    - doc: cvchecklists_1b.md
      section: Screening Question Consistency
      round: 2
  applies_when:
    doc_type: [cv, screening]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Block demographic data leakage from screening into CV.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-12
  name: anonymise_confidential_portfolio
  category: PRIVACY
  what: "Confidential work in portfolios is anonymised: client name removed, branding swapped or genericised, screenshots redacted."
  why: Portfolio NDA breaches are the most common privacy failure for design and consulting CVs.
  sources:
    - doc: cvchecklists_1a.md
      section: Portfolio
      round: 1
  applies_when:
    doc_type: [portfolio]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Client has explicitly consented.
  check_method:
    type: human_review
    spec: Verify NDA-protected content is anonymised.
  severity: ERROR
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-02
  name: photo_on_linkedin_only
  category: PRIVACY
  what: Profile photo on LinkedIn only. No photo on CV in markets where it's not norm.
  why: Photo on CV in US/UK/AU/CA/NZ markets triggers bias filters and reads as out of touch.
  sources:
    - doc: cvchecklists_1.md
      section: F. LinkedIn alignment
      round: 1
    - doc: cvchecklists_1a.md
      section: Contact Section
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: "AU|US|UK|CA|NZ"
    ats_vendor: any
  when_not_applies: Local norm requires photo.
  check_method:
    type: format_check
    spec: No headshot on CV unless local norms require.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-06
  name: confidential_metric_safe_version
  category: PRIVACY
  what: "Every confidential metric has a safe public version: ranges, percentages without absolutes, scope without specifics."
  why: Safe-version metrics preserve impact while protecting confidentiality.
  sources:
    - doc: cvchecklists_1b.md
      section: CV As Evidence Packet
      round: 2
    - doc: cvchecklists_1b.md
      section: Interview Cross-Examination
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Public press release covers the number.
  check_method:
    type: human_review
    spec: Store sanitized version of every confidential metric.
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-10
  name: gap_neutral_wording
  category: PRIVACY
  what: Explain career gaps in neutral wording. Don't apologise or over-disclose medical/family details unless chosen.
  why: Protected-category disclosure invites bias and is not required.
  sources:
    - doc: cvchecklists_1a.md
      section: Career Gaps
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Gap explanation neutral, no medical/family details unless chosen."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-PRIVACY-13
  name: password_in_cover_not_cv
  category: PRIVACY
  what: "Password-protected portfolio pieces: password in cover letter, not on the CV."
  why: CVs travel further than cover letters; password leakage broadens.
  sources:
    - doc: cvchecklists_2.md
      section: D. Portfolio discipline
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "Flag /password|passcode/ in CV."
  severity: WARN
  decay_period_days: null
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### ROLE_SPECIFIC

```yaml
- rule_id: JS-ROLE_SPECIFIC-03
  name: medical_format
  category: ROLE_SPECIFIC
  what: "Medical/clinical CVs: registrations, fellowships, audits, presentations, strict chronology. Show clinical/operational/compliance context, privacy awareness, quality and safety, documentation discipline. Avoid naming protected information."
  why: Medical CVs are reviewed by regulators as well as recruiters; format strictness applies.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
    - doc: cvchecklists_1b.md
      section: Healthcare
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: "medical|clinical|healthcare"
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Healthcare CV emphasizes safety/quality/privacy; blocks PHI leaks.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-05
  name: sales_quotas_required
  category: ROLE_SPECIFIC
  what: "Sales CVs: quotas, attainment percent, deal size, cycle length, territory, vertical, club rankings, pipeline, conversion, retention, expansion, CRM accuracy. Numbers or nothing."
  why: Sales hiring is metric-led; CVs without numbers don't make the first cut.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
    - doc: cvchecklists_1a.md
      section: Sales
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: sales
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: "Require quota|attainment|%|deal size|cycle."
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-01
  name: government_kscs
  category: ROLE_SPECIFIC
  what: "Government/public sector: address selection criteria (KSCs) line by line in a separate document. 4 to 8 pages. Plain language, no jargon. Compliance, governance, procurement awareness; avoid flashy tone."
  why: |
    AU APS and US government applications have explicit KSC requirements that override commercial conventions.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
    - doc: cvchecklists_1b.md
      section: Government And Public Sector
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: government
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never (for government roles).
  check_method:
    type: format_check
    spec: KSC document present; plain language; conservative format.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-02
  name: academic_format
  category: ROLE_SPECIFIC
  what: "Academic: full publication list, conferences, teaching, grants, peer review. 4+ pages expected. Education first."
  why: Academic norms differ entirely from commercial; defaulting to 2-page hides credentials.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: academic
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: "Education first; publications present; page_count >= 4."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-04
  name: legal_format
  category: ROLE_SPECIFIC
  what: "Legal: bar admissions, jurisdictions, notable matters (where confidentiality allows), publications."
  why: Legal CVs require bar status and jurisdiction; missing them is disqualifying.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: legal
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: Bar admissions present; jurisdictions listed.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-06
  name: engineering_stack_inline
  category: ROLE_SPECIFIC
  what: "Software engineering CVs: tech stack inline per role (not in a separate skills block alone). Recent commits/repos linked. Education matters less after 3+ years. Show code impact, production usage, scale, reliability, testing, security, performance."
  why: Stack-per-role context is what engineering hiring managers grep for.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
    - doc: cvchecklists_1a.md
      section: Software Engineering
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: engineering
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: Stack inline per role; repos linked.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-08
  name: ai_product_distinguish_terms
  category: ROLE_SPECIFIC
  what: "AI product CV distinguishes prompting from product work, prototype from production, workflow automation from autonomous agent, model integration from training, evaluation from vibes, demo from shipped value."
  why: AI-claim inflation is the largest current source of reference-check failure.
  sources:
    - doc: cvchecklists_1b.md
      section: AI Product And Automation
      round: 2
    - doc: cvchecklists_1a.md
      section: Technical CV Checks
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: ai_product
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: AI product claims clearly distinguish each tier of work.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-10
  name: finance_controls_accuracy
  category: ROLE_SPECIFIC
  what: "Finance CVs: controls, accuracy, compliance, reporting cadence, risk reduction. Avoid vague commercial claims and unsafe confidential figures."
  why: Finance hiring grades controls and accuracy first; risk-reduction is the differentiator.
  sources:
    - doc: cvchecklists_1b.md
      section: Finance
      round: 2
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: finance
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Finance CV emphasizes controls/compliance with safe figures.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-11
  name: startup_stage_context
  category: ROLE_SPECIFIC
  what: "Startup roles: include stage at join, stage at exit, ARR/MRR/headcount delta during tenure."
  why: Startup stage is the seniority calibration; without it the role reads ambiguously.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: startup
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: Startup bullets include stage and metric delta.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-12
  name: ngo_outcomes_not_inputs
  category: ROLE_SPECIFIC
  what: "NGO/impact CVs: outcomes for beneficiaries, not inputs. \"Trained 200 teachers across 4 provinces\" beats \"delivered training programs\"."
  why: NGO hiring values beneficiary outcomes over delivery activity.
  sources:
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: "ngo|impact"
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: NGO bullets describe beneficiary outcomes with numbers.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-13
  name: founder_show_built_shipped
  category: ROLE_SPECIFIC
  what: "Founder CVs: separate vision from operating proof. Show what was built, shipped, sold, learned. Avoid sounding impossible to manage or implying scale that did not happen."
  why: Founder credibility hinges on operating proof; vision without proof reads as pitch deck.
  sources:
    - doc: cvchecklists_1b.md
      section: Founder And Startup
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: founder
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Founder CV shows concrete shipped/sold/learned outcomes; mitigates flight-risk flags.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-17
  name: no_literal_title_translation
  category: ROLE_SPECIFIC
  what: "Don't translate role titles literally from a foreign language. Use canonical English equivalent (e.g., Geschäftsführer is Managing Director, not Business Leader)."
  why: Literal translations confuse parsers and reduce keyword match.
  sources:
    - doc: cvchecklists_2.md
      section: B. Geographic norms
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Foreign-language titles use canonical English form.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-18
  name: operator_education_phrasing
  category: ROLE_SPECIFIC
  what: "The operator's education leads with \"University Degree Equivalent (22+ Years Extensive Professional Experience)\" per operator brand standard."
  why: Operator-locked personal override; preserves the framing that's in current Jobsmith brand.
  sources:
    - doc: cvchecklists_1.md
      section: L. Operator-specific
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: operator_personal
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never (for the operator's applications).
  check_method:
    type: regex
    spec: Education section begins with that exact phrasing.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: personal_override
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-19
  name: operator_prompt_composition
  category: ROLE_SPECIFIC
  what: "The operator uses \"Prompt composition\" not \"prompt engineering\"."
  why: Operator-locked brand vocabulary; preserves voice fingerprint.
  sources:
    - doc: cvchecklists_1.md
      section: L. Operator-specific
      round: 1
  applies_when:
    doc_type: [cv, cover_letter, linkedin]
    role_family: operator_personal
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "Flag \"prompt engineering\"; suggest \"prompt composition\"."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: personal_override
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-20
  name: operator_higgsfield_top_2
  category: ROLE_SPECIFIC
  what: "Higgsfield placement is stated as \"top 2%\" (not \"top 2 percent\", not \"top tier\")."
  why: Operator-locked brand standard.
  sources:
    - doc: cvchecklists_1.md
      section: L. Operator-specific
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: operator_personal
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: regex
    spec: "Higgsfield mention uses \"top 2%\"."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: personal_override
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-21
  name: operator_keep_lore_off_cv
  category: ROLE_SPECIFIC
  what: "Bailey, Malamute Mayhem, UnClick lore stays off the CV unless directly role-relevant."
  why: Operator-locked rule; preserves CV focus and protects brand from leakage.
  sources:
    - doc: cvchecklists_1.md
      section: L. Operator-specific
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: operator_personal
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Role is at Malamute Mayhem-adjacent company.
  check_method:
    type: keyword_list
    spec: "Flag Bailey|Malamute Mayhem|UnClick unless role-relevant."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: personal_override
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-07
  name: engineering_leadership_balance
  category: ROLE_SPECIFIC
  what: "Engineering leadership CVs: balance technical judgement, real people leadership, delivery under ambiguity, incident ownership, architecture trade-offs. Calibrate IC vs management mix to the role's expectation."
  why: IC/management mismatch is the most common engineering leader application failure.
  sources:
    - doc: cvchecklists_1b.md
      section: Engineering Leadership
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: engineering_lead
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Balance IC and management signals to target role expectations.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-09
  name: design_problem_framing
  category: ROLE_SPECIFIC
  what: "Design/UX CVs and portfolios show problem framing, research method, constraints, iteration, outcomes."
  why: "Design hiring grades the process, not the final pixels."
  sources:
    - doc: cvchecklists_1a.md
      section: Design And UX
      round: 1
    - doc: cvchecklists_2.md
      section: C. Industry CVs
      round: 2
  applies_when:
    doc_type: [cv, portfolio]
    role_family: "design|ux"
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "Design portfolio shows process, not just visuals."
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-14
  name: career_change_bridge_statement
  category: ROLE_SPECIFIC
  what: "Career change CV: build a bridge statement from old domain to new role, translate old outcomes into new-role language, show applied learning and projects proving new skill. Don't pretend old is same as new, but don't hide old career."
  why: Career-change is a strategy not a hide; bridge statements and proof-of-pivot projects make the case.
  sources:
    - doc: cvchecklists_1b.md
      section: Career Change Round 2
      round: 2
    - doc: cvchecklists_2.md
      section: I. Career gaps
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: career_change
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Career change CV includes bridge narrative and proof-of-pivot projects.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-15
  name: layoff_factual_short
  category: ROLE_SPECIFIC
  what: Don't mention layoff unless helpful or asked. Don't apologise for short tenure caused by company events. Keep explanations factual and short.
  why: Layoff context is neutral unless emotional language frames it as defensive.
  sources:
    - doc: cvchecklists_1b.md
      section: Layoff And Short Tenure
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Asked directly.
  check_method:
    type: human_review
    spec: Layoff/short-tenure handled factually without emotional content.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-ROLE_SPECIFIC-16
  name: remote_signal_proof
  category: ROLE_SPECIFIC
  what: "Show distributed collaboration, async docs, time-zone work, self-management via outcomes. Avoid \"thrives remotely\" without proof."
  why: "Remote claims need evidence; \"thrives remotely\" is the empty-authority phrase for distributed work."
  sources:
    - doc: cvchecklists_1b.md
      section: Remote And Hybrid Signals
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: "remote|hybrid"
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: Flag thrives remotely without evidence.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### INTERVIEW_PREP

```yaml
- rule_id: JS-INTERVIEW_PREP-01
  name: memorise_every_date_metric
  category: INTERVIEW_PREP
  what: "Memorise every date, every metric, every project on the CV before the recruiter screen."
  why: "The CV is the script; if the applicant can't recite it cold, the recruiter loses confidence."
  sources:
    - doc: cvchecklists_3.md
      section: D. Interview pipeline
      round: 3
    - doc: cvchecklists_1.md
      section: K. Defensibility test
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: All CV facts memorised.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-03
  name: every_bullet_a_promise
  category: INTERVIEW_PREP
  what: "Every bullet on the CV is a promise. Every promise is tested at recruiter screen, hiring manager interview, reference check, or background check."
  why: Bullets that can't be defended at one of the four stages should be cut.
  sources:
    - doc: cvchecklists_3.md
      section: D. Interview pipeline
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Each bullet defensible end-to-end.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-04
  name: bullets_pass_interview_cross_exam
  category: INTERVIEW_PREP
  what: "Each bullet survives interview cross-examination: what happened before, what you did, what was hard, what trade-offs, how you know it worked, what you'd do differently, who else was involved, what your specific contribution was."
  why: The 11-question cross-exam is the strongest defensibility filter.
  sources:
    - doc: cvchecklists_1b.md
      section: Interview Cross-Examination
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Run 11-question cross-exam per bullet.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-11
  name: why_leaving_forward_looking
  category: INTERVIEW_PREP
  what: "Why-leaving answer is always forward-looking. Never trash the current employer, manager, or team. Never a long story. Always short."
  why: Negative current-employer comments are an instant trust hit.
  sources:
    - doc: cvchecklists_3.md
      section: H. Why leaving
      round: 3
  applies_when:
    doc_type: [interview]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: "No negativity, short, forward-looking."
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-05
  name: bullets_explainable_without_cv
  category: INTERVIEW_PREP
  what: Bullets are explainable without reading the CV. Applicant can verbalise each from memory.
  why: Reading from the CV in interview signals the bullet isn't fully owned.
  sources:
    - doc: cvchecklists_1b.md
      section: Interview Cross-Examination
      round: 2
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Verify applicant can verbalize each bullet from memory.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-06
  name: star_stories_prepped
  category: INTERVIEW_PREP
  what: "Prep 8 to 12 STAR stories spanning leadership, conflict, failure, ambiguity, technical, stakeholder, creative, ethics, deadline, team building, learning curve, biggest impact. Each story 90 to 120 seconds spoken."
  why: "STAR coverage covers ~85% of behavioural-interview questions."
  sources:
    - doc: cvchecklists_3.md
      section: E. STAR readiness
      round: 3
  applies_when:
    doc_type: [interview]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: STAR stories 8 to 12 across categories; spoken duration 90 to 120s.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-07
  name: practice_stories_aloud
  category: INTERVIEW_PREP
  what: "Practice STAR stories out loud. The transition from \"written on CV\" to \"told in person\" is where most candidates fall apart."
  why: Spoken rehearsal exposes pacing issues and verbal stumbles.
  sources:
    - doc: cvchecklists_3.md
      section: E. STAR readiness
      round: 3
  applies_when:
    doc_type: [interview]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Spoken rehearsal complete.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-08
  name: preempt_behavioural_questions
  category: INTERVIEW_PREP
  what: Map CV bullets to behavioural prompts. Ambiguity question to first/founded/launched bullet. Failure to tradeoff bullet. Conflict to stakeholder bullet. Hardest to largest-scope bullet.
  why: Pre-empting questions with the right bullet anchors the interview to the CV.
  sources:
    - doc: cvchecklists_3.md
      section: F. Behavioural prep
      round: 3
  applies_when:
    doc_type: [interview]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Map bullets to behavioural prompts.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-09
  name: why_us_three_specifics
  category: INTERVIEW_PREP
  what: "Why us answer: name one specific recent thing the company did, one specific aspect of how they work, one specific person whose work you respect. 60 to 90 seconds."
  why: Generic why-us is the most cuttable answer; three specifics is the standard for senior.
  sources:
    - doc: cvchecklists_3.md
      section: G. Why us
      round: 3
  applies_when:
    doc_type: [interview]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Why-us answer with 3 specifics in 60 to 90s.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-10
  name: avoid_generic_why_us
  category: INTERVIEW_PREP
  what: "Don't say \"I love your mission\" or \"You're a leader in the space\" in why-us. These are AI defaults."
  why: "Generic praise reads as AI and is untrue 80% of the time."
  sources:
    - doc: cvchecklists_3.md
      section: G. Why us
      round: 3
  applies_when:
    doc_type: [interview, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: "Flag love your mission|leader in the space."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-13
  name: tell_me_structure
  category: INTERVIEW_PREP
  what: "Tell me about yourself: Past (10s) -> Present (20s) -> Why this role (20s) -> One differentiator (20s) -> Handoff question to them (10s). 90 seconds total. Memorise; never read."
  why: |
    The 5-part structure is the standard for senior; reading the intro signals nerves and lack of ownership.
  sources:
    - doc: cvchecklists_3.md
      section: I. Tell me about yourself
      round: 3
  applies_when:
    doc_type: [interview]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: format_check
    spec: Answer matches 5-part structure ~90s; memorised not read.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-19
  name: interview_back_to_cv
  category: INTERVIEW_PREP
  what: "After every interview update the CV: strengthen probed bullets, reassess skipped, add answers to struggle questions, add stories told, mirror interviewer's vocabulary."
  why: Interview-to-CV loop compounds over applications; each interview improves the next.
  sources:
    - doc: cvchecklists_3.md
      section: N. Interview-back-to-CV loop
      round: 3
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: CV updated post each interview.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-20
  name: defend_under_followup
  category: INTERVIEW_PREP
  what: "For every claim on the CV, applicant has a 2-minute follow-up story ready under interview cross-exam."
  why: The defensibility test is the strongest filter against AI residue and inflation.
  sources:
    - doc: cvchecklists_1.md
      section: K. Defensibility test
      round: 1
    - doc: cvchecklists_1a.md
      section: Human Voice Preservation
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Applicant has 2-minute follow-up story for every claim.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-INTERVIEW_PREP-18
  name: post_call_capture_questions
  category: INTERVIEW_PREP
  what: "After every recruiter call, write down 2 questions struggled to answer. Update CV/cover letter to pre-empt them."
  why: Post-call capture is the highest-leverage feedback loop in job search.
  sources:
    - doc: cvchecklists_2.md
      section: J. Dogfooding
      round: 2
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Capture 2 questions per call.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

### APPLICATION_STRATEGY

```yaml
- rule_id: JS-APPLICATION_STRATEGY-04
  name: identify_knockout_requirements
  category: APPLICATION_STRATEGY
  what: "Identify all mandatory requirements: licences, work rights, location, clearance, years of experience, degree, industry, language, travel, shifts, onsite, salary, portfolio, writing sample, assessment."
  why: Knockout requirements are 0/1 filters; missing them kills applications regardless of fit.
  sources:
    - doc: cvchecklists_1b.md
      section: Knockout Checks
      round: 2
  applies_when:
    doc_type: [cv, screening]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: keyword_list
    spec: Extract hard requirements from JD; compare against CV.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-12
  name: dont_burn_bridges
  category: APPLICATION_STRATEGY
  what: Don't burn bridges. Industries are small. Today's rejector is tomorrow's referrer. Connect with the recruiter on LinkedIn after rejection. 6 and 12 month touch-back notes.
  why: Long-arc relationship building is the highest-EV networking practice.
  sources:
    - doc: cvchecklists_3.md
      section: K. Rejection handling
      round: 3
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: No negative communication; 6mo and 12mo follow-ups sent.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-19
  name: screening_answers_match_cv
  category: APPLICATION_STRATEGY
  what: "Screening question answers (years of experience, salary, work rights, relocation, start date, tool proficiency, management, budget, clearance, education) align exactly with the CV and cover letter."
  why: Mismatch between screening and CV is a top reject signal and a data-integrity flag.
  sources:
    - doc: cvchecklists_1b.md
      section: Knockout Checks
      round: 2
    - doc: cvchecklists_1b.md
      section: Screening Question Consistency
      round: 2
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: semantic_check
    spec: Cross-validate every screening answer against CV claims.
  severity: ERROR
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-03
  name: tailor_to_pain_not_keywords
  category: APPLICATION_STRATEGY
  what: "Tailor to the hiring manager's pain, not just keywords. Deconstruct the JD: repeated tasks, repeated verbs, repeated nouns, pain signals, urgency, team signals, contradictions inside the ad."
  why: Pain-tailoring beats keyword-tailoring in 2026; recruiters and managers both reward it.
  sources:
    - doc: cvchecklists_1b.md
      section: Job Ad Deconstruction
      round: 2
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Verify tailoring addresses hiring manager pain.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-06
  name: referral_ask_pattern
  category: APPLICATION_STRATEGY
  what: "Ask for a 15-minute conversation about the role on first contact, not a referral. After the call, ask \"would you feel comfortable putting me forward?\"."
  why: Direct referral asks fail; the conversation-first pattern earns the ask.
  sources:
    - doc: cvchecklists_3.md
      section: A. Referral channel
      round: 3
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Pre-existing strong relationship.
  check_method:
    type: human_review
    spec: Initial outreach asks for conversation not referral; explicit ask post-call.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-08
  name: cold_subject_specific
  category: APPLICATION_STRATEGY
  what: "Cold email subject: specific and short. \"Re: Senior Designer role - 12 years in fintech\" beats \"Application for Senior Designer\". Body 4 to 6 lines. One follow-up after 5 to 7 business days, no more."
  why: Specific subject lines win opens; one follow-up is the ceiling.
  sources:
    - doc: cvchecklists_3.md
      section: C. Cold outreach
      round: 3
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "subject word_count <= 10; body 4 to 6 lines; follow-ups <= 1."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-10
  name: reply_rate_baselines
  category: APPLICATION_STRATEGY
  what: "Reply-rate baseline 5 to 15% for tailored mid-senior applications. Below 3% signals CV/JD mismatch. Healthy interview-to-offer ratio 3:1 to 5:1 at senior level. 30+ applications with <5% reply means CV is the bottleneck; rewrite."
  why: "Outcome metrics tell where to invest effort; without baselines, applicants over-polish."
  sources:
    - doc: cvchecklists_2.md
      section: J. Dogfooding
      round: 2
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: "reply_rate target 5%; if apps>=30 AND reply<5%, rewrite CV."
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-14
  name: update_cv_every_3_months
  category: APPLICATION_STRATEGY
  what: "Update CV every 3 months even when not job-hunting. Keep a running wins file: every project, metric, quote, recognition captured in the moment. Save offers, contracts, performance reviews, 360 feedback in writing."
  why: Memory degrades fast; capture in the moment is the only reliable way to keep CV evidence current.
  sources:
    - doc: cvchecklists_3.md
      section: M. Continuous improvement
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: count_threshold
    spec: CV last_modified within 90 days; wins file maintained.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-15
  name: master_cv_long_version
  category: APPLICATION_STRATEGY
  what: Maintain a master CV that's longer than 1 page. The submitted 1- or 2-page version is a curation of the master.
  why: Master CV is the source-of-truth and tailoring input; submitted version is always a derived view.
  sources:
    - doc: cvchecklists_3.md
      section: M. Continuous improvement
      round: 3
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Master CV exists alongside tailored versions.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-17
  name: reconfirm_references_per_app
  category: APPLICATION_STRATEGY
  what: "Re-confirm references for each new application. Brief them in writing with JD, company, 3-bullet recap before the company calls. Ask permission. 3 to 5 references: most recent manager, peer, direct report (leadership), client (client-facing)."
  why: Reference burnout is real; per-application reconfirmation protects goodwill.
  sources:
    - doc: cvchecklists_2.md
      section: G. References
      round: 2
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: References briefed per application; 3 to 5 confirmed; permission for each.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-18
  name: avoid_auto_apply_tools
  category: APPLICATION_STRATEGY
  what: "Avoid auto-apply tools (LazyApply, Sonara, Jobright, AIApply, Simplify). They have very low callback rates per application, burn goodwill, and trip ATS dedupe."
  why: |
    Auto-apply volume strategies underperform tailored volume strategies by 5 to 10x and damage reputation.
  sources:
    - doc: cvchecklists_1.md
      section: G. Modern hiring trends
      round: 1
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Do not use auto-apply tools.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-20
  name: application_strategy_floor
  category: APPLICATION_STRATEGY
  what: "Don't apply just because a CV can be tailored. Check the candidate meets the actual floor. Flag reposted-repeatedly roles, overly broad job ads, salary missing by design as lower priority."
  why: Low-quality JDs are a low-EV use of tailoring time.
  sources:
    - doc: cvchecklists_1b.md
      section: Application Strategy Checks
      round: 2
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Score role fit and company health before investing in tailoring.
  severity: WARN
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-01
  name: read_jd_twice_extract_keywords
  category: APPLICATION_STRATEGY
  what: "Read the JD twice. Mark the 6 to 10 specific skills, tools, and outcomes mentioned. These drive tailoring decisions."
  why: JD keyword extraction is the input to every tailoring decision; skipping it produces a generic CV.
  sources:
    - doc: cvchecklists_1.md
      section: D. Tailoring
      round: 1
    - doc: cvchecklists_1a.md
      section: Job Fit
      round: 1
  applies_when:
    doc_type: [cv, cover_letter]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Tailoring workflow includes JD keyword extraction.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-02
  name: tailor_3_to_5_bullets
  category: APPLICATION_STRATEGY
  what: Swap or sharpen 3 to 5 bullets per application. Don't rewrite the whole CV. Reorder bullets so most role-relevant achievement is first under each role.
  why: Targeted tailoring outperforms full rewrites; signal beats churn.
  sources:
    - doc: cvchecklists_1.md
      section: D. Tailoring
      round: 1
    - doc: cvchecklists_1a.md
      section: Experience Section
      round: 1
  applies_when:
    doc_type: [cv]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: First-ever application to a new role family.
  check_method:
    type: human_review
    spec: Tailoring delta vs base CV is 3 to 5 bullets.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-05
  name: prefer_referrals
  category: APPLICATION_STRATEGY
  what: Spend more time on warm intros and referrals than on tailoring. Referred candidates are 4 to 14x more likely to be hired than cold applicants.
  why: Referral channel is the highest-leverage application surface; data is consistent across markets.
  sources:
    - doc: cvchecklists_3.md
      section: A. Referral channel
      round: 3
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Allocate time to referrals first.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-07
  name: cold_email_hiring_manager
  category: APPLICATION_STRATEGY
  what: "Cold-email the hiring manager directly when referrals aren't available. Find the email via Hunter, RocketReach, Apollo. Don't send to careers@ or jobs@."
  why: Cold-to-hiring-manager beats cold-to-portal because it bypasses the recruiter triage.
  sources:
    - doc: cvchecklists_3.md
      section: C. Cold outreach
      round: 3
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: JD explicitly forbids direct contact.
  check_method:
    type: human_review
    spec: "Cold outreach goes to hiring manager, not careers@ or jobs@."
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-09
  name: log_every_application
  category: APPLICATION_STRATEGY
  what: "Log every application: date sent, company, role, ATS vendor, CV version, cover letter version, screening answers, replies within 14 days, interviews, offer outcome."
  why: Application log enables outcome-data improvement and prevents duplicate submissions.
  sources:
    - doc: cvchecklists_2.md
      section: J. Dogfooding
      round: 2
    - doc: cvchecklists_1a.md
      section: Submission Checks
      round: 1
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Application log entry contains all fields.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

```yaml
- rule_id: JS-APPLICATION_STRATEGY-16
  name: pre_application_reconnaissance
  category: APPLICATION_STRATEGY
  what: "Pre-application: pull company's last 6 months of news, read careers page tone, check hiring manager LinkedIn for seniority cues, check Glassdoor/Levels.fyi/Blind for salary and process, check company layoff history, look up recruiter tenure, verify RTO policy via recent reviews not JD."
  why: |
    Reconnaissance is what separates a tailored application from a generic one; 30 minutes upfront beats 3 hours of rewriting.
  sources:
    - doc: cvchecklists_2.md
      section: A. Pre-application
      round: 2
  applies_when:
    doc_type: [application]
    role_family: any
    age_band: any
    jurisdiction: any
    ats_vendor: any
  when_not_applies: Never.
  check_method:
    type: human_review
    spec: Recon checklist completed before tailoring.
  severity: INFO
  decay_period_days: 365
  last_verified_at: 2026-05-18
  volatile: false
  notes: ""
```

## Decay schedule

| Category | Decay window (days) | Reason |
| --- | --- | --- |
| AIDETECT | 90 | Era vocabulary and detector behaviour shift fast; 90 day re-check. |
| ATS | 180 | Vendor parsers update; 180 day re-verification. |
| COVER | 365 | Cover letter conventions evolve more slowly; annual check. |
| METADATA | 180 | PDF tooling and metadata norms change semi-annually. |
| APPLICATION_STRATEGY | 365 | Channel mix and outreach norms shift annually. |
| LINKEDIN | 365 | LinkedIn UI and ranking change annually. |
| ROLE_SPECIFIC | 365 | Industry norms shift slowly; annual check. |
| INTERVIEW_PREP | 365 | Interview patterns shift annually. |
| VOICE | null | Voice principles are stable; null decay. |
| VISUAL | null | Typographic conventions are stable; null decay. |
| AGE | null | Jurisdiction laws stable; effective dates noted in each rule. |
| TRUTH | null | Standing principle; no decay. |
| PRIVACY | null | Standing principle; no decay. |

## Open research items

No rules in this pack carry an open research flag. Items that remain unresolved from the prior research pack and earlier rounds are:

- Aptos vs Calibri parse accuracy on Workday Illuminate 2026 (vendor-published test pending).
- SmartRecruiters AI-resume-screening 2026 rollout: preference for JSON-LD embedded blocks.
- AU Fair Work Act position on direct graduation-date requests on application forms (no explicit federal AU equivalent to Colorado JAFA as of May 2026).
- GPT-5 era vocabulary tells: too new to have a stabilised list; Wikipedia "Signs of AI writing" tracks but the community has not converged. Revisit Q3 2026.
- Stable false-positive baselines for AI detectors against non-native English writers (Liang et al. 2023 is the floor; vendor-tested updates needed).
