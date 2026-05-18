# CV Checklists — Modern Best Practice + Anti-AI-Slop

Working reference compiled from the two ApplyPass research files plus current (2025–2026) hiring research, ATS vendor docs, Reddit/forum sentiment, and AI-detection studies. No em dashes.

---

## PART 1: WHAT TO LOOK FOR IN A MODERN CV

### A. ATS parsing and machinery (the silent gate)

- Single column layout, no exceptions. Two-column drops Workday field completeness from 94% to 52%, and Jobscan's 2025 audit shows 93% parse rate single column vs 86% multi-column.
- No tables, no text boxes, no headers/footers for critical info. ATS parsers strip or mangle them.
- Standard, dictionary-matched section headings: "Work Experience", "Education", "Skills", "Certifications". Not "Career Journey", "My Toolkit", "What I Bring".
- Date format must be MM/YYYY or Month YYYY ranges. Workday parses "05/2022 to 08/2024" with 99% accuracy vs 14% for "Summer 2023".
- File format: DOCX is the safest default for ATS portals. Text-based PDF acceptable elsewhere. Never submit image-based PDFs from Canva/Figma.
- Standard system fonts (Arial, Calibri, Helvetica, Garamond, Georgia, Times). Custom or display fonts can fail to render in parsers.
- Font size between 10pt and 12pt for body, 14pt to 18pt for headings.
- No icons, emoji, graphics, photos, charts, sparklines, or progress bars. Parsers see them as noise or skip them entirely.
- No coloured text for parseable content. Subtle accents on headings/dividers only.
- File name format: FirstName-LastName-Role.docx (or .pdf). Recruiters search and sort by filename.
- Embed real text, never outlined or rasterised type from a design tool.
- Standard bullet characters only (• or hyphen). Avoid fancy unicode glyphs.
- Use canonical skill names matched to Workday Skills Cloud taxonomy: "JavaScript" not "JS", "Microsoft Excel" not "MS Excel", "Adobe Photoshop" not "PS".
- Separate role entries per promotion at the same company. Don't merge into one block.
- LinkedIn URL, portfolio URL, and email written as plain text (not hyperlinked icons).
- One job, one column of dates aligned consistently right or left.
- Spell out acronyms on first use, then use the acronym. ATS keyword matching catches both forms.
- Plain-text export self-test: copy/paste your CV into Notepad. If structure collapses or content disappears, the ATS sees the same thing.
- Test against a free Jobscan or Resume Worded scan to check parser output, but don't optimise to a score (see Part 1.K).

### B. Content structure and information architecture

- Contact block at top: name, city/state (not full address), phone, email, LinkedIn, portfolio/website. No DOB, no photo (in most countries; check local norms), no marital status.
- Professional summary (3 to 5 lines) tailored to the role, not a generic "passionate professional" boilerplate.
- Reverse chronological order for experience.
- Most recent and most relevant role gets the most space and most bullets.
- Cap visible experience at roughly 15 years for senior candidates. Earlier roles go into a brief "Early Career" block without dates.
- Education near the bottom for experienced candidates; near the top for graduates.
- Omit graduation year if you're worried about age signalling. Colorado (Job Application Fairness Act), NYC (2025), and Oregon HB3187 (May 2025) now bar employers from asking for graduation dates pre-offer.
- 1 page for under 10 years experience, 2 pages for senior/executive. 3 pages only for academic/medical CVs.
- White space matters. Cramped CVs read as desperate; airy CVs read as confident.
- Consistent vertical rhythm: same spacing between roles, same indent for bullets, same heading style throughout.
- No "References available on request" line. Wastes a row and is implicit anyway.
- No "Objective" section. Replace with a targeted summary.

### C. Bullet-point craft (the Harvard formula)

- Every bullet follows: Action verb + task/context + quantified outcome.
- Strong action verbs that show seniority: led, drove, built, shipped, owned, scaled, architected, directed, negotiated, delivered. Avoid weak verbs: helped, assisted, supported, worked on, was responsible for.
- Quantify everything you honestly can: percentages, dollar/AUD amounts, headcount managed, time saved, throughput, conversion rates, retention, NPS, deal sizes.
- Where you can't quantify, give scope or scale: "across 4 markets", "for a 12-person team", "with a 6-figure budget".
- One bullet, one idea. No bullet that contains two unrelated achievements joined by "and".
- 3 to 5 bullets per recent role, 1 to 3 for older roles.
- Bullets should pass the "so what?" test. If a recruiter could shrug after reading it, rewrite.
- Past tense for past roles, present tense for current role only.
- No personal pronouns ("I", "my", "we"). The implicit subject is you.
- No full stops at the end of bullets, OR full stops on every bullet. Pick one and be consistent.
- Lead with the outcome where the outcome is the impressive part: "Cut onboarding time 40% by redesigning the welcome flow" reads stronger than "Redesigned the welcome flow, cutting onboarding time 40%".
- Defensibility check: every quantified claim must be something you can explain in an interview without notes. If you can't defend "increased revenue 23%", don't write it.

### D. Tailoring to the role (truthful, not deceptive)

- Read the job description twice and highlight the 6 to 10 specific skills, tools, and outcomes mentioned.
- Mirror the exact phrasing where it's truthful: if they say "stakeholder management", use "stakeholder management" not "managing relationships with stakeholders".
- Reorder your bullets so the most role-relevant achievement is first under each role.
- Swap or sharpen 3 to 5 bullets per CV per application. Don't rewrite the whole thing.
- Move skills you have and they want to the top of your skills list.
- Drop or compress skills/roles that are irrelevant. Don't delete them entirely if they show range, but shrink them.
- Match seniority cues. If they say "led", you say "led". If they say "executed", you say "executed".
- Industry-specific keywords: ATS systems and recruiters both scan for them. Get them from the job description, not a generic keyword list.
- Truthfulness floor: no fabricated metrics, no inflated titles, no false credentials, no claims of tools/skills you can't demonstrate in 5 minutes.
- Provenance check: every claim on your CV should be traceable to a real project, role, or piece of work you can point to.

### E. Cover letter (when included)

- One page maximum, 3 to 4 short paragraphs.
- Opening line names the role and the company, and signals genuine interest with one specific detail (a product, a recent announcement, a value).
- Paragraph 2: the strongest evidence you can do the job — one specific story with an outcome.
- Paragraph 3: why this company specifically (not "I love your mission"). Reference something concrete.
- Closing: clear next step, e.g. "Happy to share more in a conversation."
- No "Dear Sir/Madam" unless you literally cannot find a name. "Dear Hiring Team" is acceptable.
- Avoid restating the CV. Add context the CV can't.
- Match the tone of the company's careers page and brand voice.

### F. LinkedIn alignment (cross-check before applying)

- Job titles on LinkedIn match job titles on CV exactly. Workday and some iCIMS instances cross-reference and flag diverging titles/dates for manual review.
- Date ranges match.
- Skills section on LinkedIn mirrors the top of your CV's skills section.
- Profile photo on LinkedIn, none on CV.
- LinkedIn URL on CV uses your customised slug, not the default `/in/chris-byrne-1a2b3c4d5e/`.

### G. Modern hiring trends to know (2025 to 2026)

- Roughly half of applicants now use AI to write CVs/cover letters (FT, July 2025).
- 19.6% of 600 US hiring managers say they'd reject an application they believed was fully AI-written (TopResume, May 2025).
- 33% claim they can spot an AI-written CV in under 20 seconds.
- AI-written cover letters get rejected primarily on tone, not content.
- Recruiters are pattern-matching humans, not running detector software. The fix is real specificity, not "humaniser" tools.
- Auto-apply tools (LazyApply, Sonara, Jobright, AIApply, Simplify) have very low callback rates per application. High volume burns goodwill and trips ATS dedupe.
- "Ghost jobs" are now common. Don't take silence personally.
- Workday is the dominant ATS, used by 10,500+ orgs including more than 50% of Fortune 500. Optimise for Workday parsing as the default.
- Skills-based hiring is rising. Lead with skills if you're a career changer.
- Hybrid/remote signals matter. State your preference clearly if it's relevant.

### H. Age and identity signal management

- 42% of hiring managers admit considering age (ResumeBuilder 2024); 79% of those infer it from graduation dates.
- Omit graduation year for senior candidates.
- Cap visible experience at ~15 years; older roles go in "Early Career Highlights" without dates.
- Remove outdated technologies you no longer use unless they're directly relevant.
- Use email with your name, not a Hotmail or AOL legacy address.
- Use a current phone format and don't write it as "(03) 9XXX XXXX" if applying internationally.
- Standard fonts and modern (but not trendy) design read as current without screaming "millennial".

### I. The Reddit/forum reality check (what real applicants report)

Themes from r/EngineeringResumes, r/resumes, r/cscareerquestions, r/recruitinghell, Blind, and r/jobs during 2025 to 2026:

- ATS keyword optimisation past about 75% match shows diminishing returns and produces ChatGPT-sounding copy.
- Auto-apply tools generate "ghost job" rage and burn application allowances without callbacks.
- Recruiters increasingly post about identifying AI-written cover letters by tone alone.
- Older workers report higher callback rates after removing graduation dates and capping experience at 15 years.
- Workday is the most-hated portal because of double data entry; many candidates abandon at the portal stage.
- Resume reviews on r/EngineeringResumes consistently land on: quantify everything, single column, no fluff, no soft-skill claims without evidence.
- One-page CVs win against multi-page CVs for under-10-years applicants in roughly 80% of recruiter feedback threads.
- Generic "I'm a passionate, results-driven professional" openings are universally mocked.
- Hiring managers on Blind report skimming CVs in 6 to 10 seconds. Top third of the page does the work.

### J. The "human review" checks before sending

- Read it out loud. If a sentence sounds robotic, it is.
- Show it to someone who knows your work. They'll spot inflated claims faster than you will.
- Check spelling and grammar twice. Use Grammarly or LanguageTool, but verify suggestions; tools push toward generic phrasing.
- Check every number you wrote against a source you trust.
- Check every employer name, date, and title for accuracy.
- Save as the format you'll submit (DOCX/PDF) and open it fresh. Layout breaks happen during export.
- Submit it through the actual portal, then open the application's preview. If the ATS scrambled it, fix and resubmit.
- Keep a versioned copy of every CV you send, tagged with the company and date. Outcomes feed back into what works.

### K. Tools to use (and what to ignore from them)

- **Jobscan / Resume Worded**: useful for ATS parse audit. Ignore the "match score". A recruiter's 2025 account in Business Insider described winning interviews with a CV scoring badly on Jobscan; Jobscan itself frames scores as "risk assessment".
- **Reactive Resume** (MIT, self-hostable, open source): the most mature OSS CV builder.
- **OpenResume**: browser-local data, built-in ATS parser simulation.
- **JSON Resume**: schema-based, dev-friendly.
- **AwesomeCV / Resumake**: LaTeX-based, very ATS-clean.
- **Harvard FAS Mignone Center bullet template**: still the gold standard format after 5+ years.
- **AI tools (ChatGPT, Claude, Gemini)**: useful as a sparring partner for rewriting one bullet at a time. Dangerous when used to generate the whole CV (see Part 2).
- **Detector tools (GPTZero, Originality, Copyleaks)**: never submit your real CV. Use only on a redacted copy, and treat the score as false-positive risk awareness, never as a writing target.

### L. Legal and ethical floor

- No hidden text (white-on-white, font-size-0, off-canvas). Workday, Greenhouse, and Lever detect and flag it.
- No keyword stuffing. ATS systems and recruiters are wise to it.
- No fabricated metrics, employers, dates, degrees, or referrals. One discovered lie torpedoes the whole application.
- No claims of citizenship/visa status you don't hold.
- No salary lies in pre-screening; some jurisdictions ban asking.
- Keep your data private. Don't upload personal CVs to free public AI detector sites that may retain or train on the content.
- GDPR/CCPA: you have a right to know what data an employer holds on you. Many ATS systems retain CVs for years.

---

## PART 2: ANTI-AI-SLOP — WHAT WILL TRIP DETECTORS AND HUMANS

> Note: AI detectors are unreliable. Stanford's Liang et al. found 61.3% false-positive rate against non-native English writers; independent retests of GPTZero report ~18% FPR vs. vendor claim of 0.5%. **The real risk is human recruiters spotting AI tone in 20 seconds, not software.** Write to defeat the human, not the detector. These tells will trip both.

### A. Era-specific vocabulary tells (the GPT word list)

These words have become AI-canary indicators because they appear at unusual frequency in LLM output. Used once, fine. Used twice in a CV, suspicious. Used three times, you're cooked.

**GPT-4 era vocabulary (still dominant):**

- delve, delves, delving
- tapestry, rich tapestry
- intricate, intricacies
- meticulous, meticulously
- pivotal, pivotal role
- underscore, underscores, underscoring
- testament, a testament to
- vibrant
- robust, robustly
- nuanced
- multifaceted
- comprehensive
- holistic
- realm, in the realm of
- landscape (when used metaphorically: "the landscape of marketing")
- paradigm, paradigm shift
- synergy, synergies, synergistic
- leverage, leveraging (overused as a verb)
- spearhead, spearheaded (now a tell)
- navigate (metaphorical: "navigate complex challenges")
- harness, harnessing
- foster, fostering
- cultivate, cultivating
- streamline, streamlined
- empower, empowering
- elevate, elevating
- transformative
- groundbreaking
- cutting-edge
- state-of-the-art
- innovative (when not specific)
- dynamic (when not specific)
- ever-evolving
- ever-changing

**GPT-4o era additions:**

- bolster, bolstered, bolstering
- showcase, showcasing
- enhance, enhanced, enhancing
- optimise, optimised (when not technical)
- facilitate, facilitating

**GPT-5 era additions:**

- emphasising, emphasises
- highlighting, highlights (as a verb)
- demonstrating (overused)
- showcasing (still trending up)

**Generic LLM filler phrases:**

- "in today's fast-paced world"
- "in today's digital age"
- "in the ever-evolving landscape of"
- "in the realm of"
- "at the forefront of"
- "play a pivotal role in"
- "stand as a testament to"
- "a deep dive into"
- "a wealth of experience"
- "results-driven professional"
- "passionate about"
- "driven by a passion for"
- "with a proven track record"
- "a track record of success"
- "results-oriented"
- "detail-oriented"
- "team player"
- "go-getter"
- "self-starter"
- "thinks outside the box"
- "hit the ground running"
- "synergise across teams"
- "wear multiple hats"
- "wears many hats"

### B. Structural and rhetorical tells

- **"Not just X but Y"** parallelism. "Not just a designer but a strategic thinker." Dead giveaway. Avoid the construction entirely.
- **"It's not X, it's Y"** reframes. Same family. Avoid.
- **Tricolons** (lists of three with rhetorical lift): "innovative, dynamic, and transformative". Once in a CV is fine; pattern-repeated is a tell.
- **Self-posed rhetorical questions** inside paragraphs. "What makes a great leader? Vision." AI loves this. Humans rarely write it in a CV.
- **Bolded lead-in for every bullet** ("**Strategic Leadership:** Led..."). One of the strongest AI tells in modern CVs. If you use it at all, use it sparingly and inconsistently.
- **Parallel sentence structures three bullets in a row**: "Spearheaded the redesign of...", "Spearheaded the rollout of...", "Spearheaded the migration of...". Vary your openings.
- **Summary paragraphs that start with the same word**. AI loves consistency; humans don't write that cleanly.
- **The hourglass paragraph**: broad opening, narrow middle, broad close. Classic AI shape.
- **Listicle creep**: AI converts everything to bullets. Some prose in a summary or cover letter signals human authorship.
- **Concluding sentences that summarise** what was just said. Humans rarely do this in bullets or short copy.
- **"In conclusion"**, **"in summary"**, **"to wrap up"** as transition phrases. AI relies on them; humans don't need them in short docs.

### C. Punctuation and typography tells

- **Em dash overuse**. The "ChatGPT dash". One em dash in a CV is fine; three or more in a one-page doc is a flag. Many recruiters now use em-dash density as a first-pass AI filter. (Note: Chris's brand standard already bans em dashes entirely. This aligns.)
- **Curly quotes** (" " ' ') when the rest of the doc uses straight quotes, or vice versa. Inconsistency is a paste-from-AI tell.
- **Unicode arrows** (→, ⇒, ➜). AI loves them. Use a hyphen or "to" instead.
- **Non-breaking spaces** invisible to the eye but visible to text inspectors.
- **Smart apostrophes** mixed with straight apostrophes in the same doc.
- **Triple-dot ellipsis** (…) as a unicode character vs three periods (...). AI defaults to the unicode glyph.
- **Curly bullet glyphs** (▪, ▸, ◆) that copy oddly from AI output. Use • or - only.
- **Inconsistent spacing** around colons, dashes, and parentheses. AI sometimes outputs en-dashes (–) where humans type hyphens (-).
- **Mid-sentence capitalisation** of "Important Concepts" (Title Case Random Words). AI does this; humans don't.

### D. Tone and voice tells

- **Sycophantic openers**: "Great question!", "Excellent point!" Mostly a chat-AI tell, but it bleeds into cover letters as "Thank you for the opportunity to...".
- **Hedging phrases**: "It's worth noting that...", "It's important to note...", "It's also worth mentioning...". Humans cut these; AI multiplies them.
- **Generic enthusiasm without a specific reason**: "I'm incredibly excited about this role." Why? AI can't say. Specify.
- **Overly polite, overly neutral tone**. Humans have edges, opinions, preferences. AI sands them off.
- **Diplomatic restraint** where a normal human would be direct. "I would suggest that perhaps the approach could be reconsidered" vs "I disagreed and proposed a different approach".
- **Excessive qualification**: "may potentially help to facilitate" vs "helps". AI hedges by reflex.
- **Praise of the company that any candidate could write**: "Your innovative approach to [industry] is inspiring." If you could send that line to any of 50 companies, delete it.
- **Restating the prompt** in the answer. In a cover letter: "As you mentioned in your job posting, you're looking for a candidate who can..." AI does this; humans don't repeat the JD back.

### E. Rhythm and grammar tells

- **Every sentence the same length**. Humans vary sentence length wildly. AI defaults to a comfortable 15 to 25 word range.
- **No sentence fragments. Ever.** Real writers use fragments. For emphasis. Like this.
- **Comma-splice avoidance perfection**. AI almost never produces a comma splice. Humans do, especially in punchy writing. (Not advising bad grammar; observing that polished perfection is suspicious.)
- **The "Oxford comma always, no exceptions" pattern**. AI is consistent to a fault; humans drift.
- **Subject-verb-object always**. AI rarely fronts an adverb or inverts structure. "Quickly, the project shipped" is rare in AI prose.
- **Conjunction at start of sentence avoidance**. AI was trained to be "correct"; it avoids starting sentences with "And" or "But". Humans do it constantly.
- **No contractions** in informal contexts. AI defaults to "do not" where a human would write "don't". This is especially obvious in cover letters trying to sound conversational.
- **Perfect parallel structure across all list items**. Real writers break parallelism sometimes. AI doesn't.

### F. Content tells specific to CVs and cover letters

- **Hallucinated metrics**. AI will invent "increased revenue 23%" or "managed a team of 12" if you give it vague input. Every number on your CV must be one you can defend.
- **Round number cluster**: "Increased X by 25%, reduced Y by 30%, improved Z by 50%." Real metrics are rarely all round. "Cut latency 23%" reads more real than "improved performance by 50%".
- **Achievements without context**: "Drove $2M in revenue." Over what period? On what base? With what team? AI doesn't know, so it omits. Humans add the context naturally.
- **Skills lists that include everything**: AI dumps every possibly relevant tool. Humans curate to what they actually use.
- **Job titles that don't match LinkedIn**: AI may "level up" your title. Check.
- **Date ranges that don't add up**: AI can hallucinate timelines. Verify every range.
- **Companies you didn't work at**: rare, but AI hallucinates employer names in some workflows. Always cross-check.
- **Generic role descriptions**: "Managed projects, led teams, and drove results." AI fills space when it lacks input. Real CVs have specific projects, specific teams, specific results.
- **Cover letters that don't mention the company by name** after the salutation. AI sometimes drops it.
- **Cover letters that name the wrong company** because of a botched copy-paste from a previous tailoring. The single most embarrassing AI tell.

### G. Formatting tells from copy-pasted AI output

- **Markdown asterisks** (`**bold**`) that didn't render and got submitted as literal `**text**`.
- **Markdown headers** (`# Heading`, `## Heading`) submitted as `# Heading` instead of formatted.
- **Code-fence backticks** around technical terms that shouldn't be formatted: `` `Python` ``.
- **Numbered lists with `1.` not auto-formatted** by Word, so they sit as plain text.
- **Hyperlinks in markdown syntax** `[LinkedIn](https://...)` left unrendered.
- **Bullet characters that don't match** the rest of the doc, because they came from a different source.
- **Inconsistent indentation** caused by a paste from a different style.
- **Smart-quote drift**: pasted AI text uses curly quotes, but your typed text uses straight. Mixing is a giveaway.
- **Extra blank lines** between paragraphs that AI tends to insert.
- **The "ChatGPT signature spacing"**: a blank line after every short paragraph, including 1-line bullets.

### H. Specific patterns to avoid in summaries and openings

- "Highly motivated professional with..."
- "Results-oriented [role] with X years of experience in..."
- "Passionate about leveraging [skill] to drive [outcome]..."
- "Proven track record of..."
- "A creative thinker with a knack for..."
- "Adept at..."
- "Seasoned [role]..."
- "Dynamic and innovative..."
- "Strategic thinker with hands-on experience..."
- "A unique blend of..."
- "Bringing a fresh perspective to..."
- Any opener that doesn't say what you do, where, and what's true about you that's not true about a thousand others.

### I. Specific patterns to avoid in cover letters

- "I am writing to express my interest in..."
- "I came across your job posting and was immediately drawn to..."
- "I believe my skills and experience make me an ideal candidate..."
- "I am excited about the opportunity to contribute to..."
- "Thank you for considering my application. I look forward to the opportunity to discuss..."
- Any sentence that starts with "I" three times in a row.
- Any closing that contains "I am confident that I would be a valuable asset to your team."

### J. Practical anti-slop workflow

- Write the bones yourself first, in plain language, without an AI. Even rough is fine.
- Use AI only to rewrite one bullet at a time, with a specific instruction: "Make this bullet more specific and quantified. Don't add words I haven't given you."
- Never accept AI output verbatim. Pass it through your own voice: shorten, sharpen, cut hedging, add a specific.
- Read everything out loud before sending. If it sounds like a press release, rewrite.
- Vary sentence length deliberately. Mix 5-word and 25-word sentences.
- Cut every word that doesn't earn its place.
- Capture your real prior writing (3 to 5 samples of old emails, blog posts, LinkedIn posts) and compare your final CV's voice to them. If they don't match, the CV isn't yours.
- Run a text-based diff between your draft and an AI rewrite of the same content. The differences are where your voice lives. Keep them.
- Submit a redacted copy (no name, no employer, no project codenames) through a free detector like GPTZero or Originality only as a sanity check on FP risk, never to optimise the text.
- If a detector flags a section, don't rewrite to evade detection. Rewrite to be more specific and defensible. That solves both the detector and the human recruiter at the same time.

### K. The defensibility test (the single most important check)

For every line on the CV or cover letter, ask:

- Can I defend this exact wording in an interview?
- Can I expand on this metric with context and method?
- Is this written in language I would actually use in conversation?
- If a recruiter asks "tell me more about this", do I have a 2-minute story?
- If the answer to any of these is no, rewrite or cut.

### L. The Chris-specific rules (from existing brand standards)

- No em dashes anywhere. Period. (Brand standard.)
- No typographic hangers or orphans (single words on their own line).
- ATS-friendly format above all aesthetic preferences.
- Education leads with "University Degree Equivalent (22+ Years Extensive Professional Experience)".
- "Prompt composition" not "prompt engineering".
- Higgsfield placement stated as "top 2%" (not "top 2 percent" or "top tier").
- Bailey, Malamute Mayhem, UnClick lore stays out of the CV unless directly relevant to the role being applied for.

---

## SUMMARY: THE 10 RULES

1. Single column, standard headings, DOCX default, no graphics. ATS-safe before pretty.
2. Quantify everything you can defend. Cut everything you can't.
3. Tailor 3 to 5 bullets per application, not the whole CV. Mirror the JD's truthful phrasing.
4. Write in your own voice first. Use AI only to sharpen one bullet at a time.
5. Strip the GPT vocabulary list. If a word sounds like Claude wrote it, rewrite.
6. Vary sentence length. Use fragments. Break parallelism. Sound like a human.
7. No em dashes. No unicode arrows. No bolded lead-ins on every bullet.
8. Read it out loud. If you wouldn't say it in a pub, don't write it.
9. Cross-check every claim, date, title, and number. One lie ends the application.
10. Detectors are noisy and biased. Defeat the human recruiter, not the software.
