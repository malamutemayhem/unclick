# Jobsmith v0

A local, template-driven cover-letter drafter that uses Chris's CV corpus as the voice donor.

## What ships in v0

- `ingestCvCorpus()` — reads a local CV folder, returns a `Corpus` of dated CVs, cover letters, jobs applied to, and a ChatGPT prompt template. Parses `.txt` and `.md`; lists `.pdf` and `.indd` paths without parsing their bytes.
- `buildVoiceProfile(corpus)` — extracts a `VoiceProfile`: frequent phrases, opening/closing/sign-off formulas, role types, past brands, tonal adjectives, location & flexibility statements.
- `renderCoverLetterDraft(job, profile, options)` — composes a 5-paragraph cover letter draft from a job description + voice profile.
- `<JobsmithDraft />` — React page that ties it together.

## Run locally

Set the CV folder root via env:

```bash
# bash / zsh
export JOBSMITH_CV_ROOT="/path/to/CV"
```

For the React app (Vite/Next), expose it to the runtime appropriately, e.g.
`VITE_JOBSMITH_CV_ROOT` or `NEXT_PUBLIC_JOBSMITH_CV_ROOT`, and read it in
`JobsmithDraft.tsx` before calling `ingestCvCorpus`.

Run tests:

```bash
pnpm --filter jobsmith test
# or
npx vitest run
```

## v0.1 status

v0.1 shipped the end-to-end working product on the public `/jobsmith` page:
PDF cover-letter parsing, the engine wired into the public site, a tailored CV
draft (`renderCvDraft`), ATS-safe DOCX export, a browser-persisted application
log, and an upgraded risk dashboard (tone, truthfulness, age signals). The
public page runs entirely browser-local: corpus PDFs are parsed in-browser with
`pdfjs-dist`, and nothing is uploaded.

## Known limitations

- **Heuristic job description parsing.** The first non-empty line is read as the
  role and the second as the company. Unusual JD formats break this. The UI
  falls back to placeholders and surfaces a warning when detection fails.
- **No LLM call.** Phrasing comes from statistical extraction + templating.
  Drafts are starter copy, not finished letters — always edit before sending.
- **Brand seed list is hand-curated.** `voiceProfile.SEED_BRANDS` is a small
  list. Past employers not in the seed will be missed.
- **CV facts are entered as JSON.** The master CV facts editor on the public
  page takes structured JSON. A form-based editor is a future improvement.
- **`.indd` files are still listed but not parsed.**

## Deferred beyond v0.1

1. Per-role-type template variants (Senior Designer vs. Content Designer use
   different middle paragraphs).
2. Recruitment-letter tone detection — different opener pattern.
3. LLM polish pass (Claude API call to smooth the templated draft) — gated by an
   opt-in setting; would require PII redaction before any external call.
4. UnClick integration: file a draft as a comment against a UnClick todo.
5. A form-based master CV facts editor instead of raw JSON.

## Test plan

| Module | Suite | Notes |
|---|---|---|
| `ingestCvCorpus` | `ingestCvCorpus.test.ts` | tmp-folder fixture mirroring the real shape |
| `voiceProfile` | `voiceProfile.test.ts` | in-memory Corpus with two synthetic cover letters |
| `renderDraft` | `renderDraft.test.ts` | Ampersand-style JD as input |
| `JobsmithDraft` page | not in v0 | UI smoke test in v0.1 with @testing-library/react |

## File map

```
apps/jobsmith/
├─ src/
│  ├─ lib/
│  │  ├─ ingestCvCorpus.ts      voiceProfile.ts      renderDraft.ts
│  │  ├─ pdfText.ts             pdfArtifacts.ts      renderCvDraft.ts
│  │  ├─ cvFacts.ts             exportDocx.ts        appLog.ts
│  │  ├─ riskAudit.ts
│  │  └─ *.test.ts              (one suite per module)
│  ├─ pages/
│  │  └─ JobsmithDraft.tsx      (v0 Node-side demo page)
│  └─ test/
│     └─ makePdf.ts             (test-only minimal-PDF generator)
└─ docs/
   └─ jobsmith-v0.md  (this file)

The public browser-local page is src/pages/Jobsmith.tsx, with browser glue in
src/lib/jobsmith/ (parsePdfBrowser, buildBrowserCorpus, appLogStore).
```

## Acceptance checklist (mirrors ScopePack v1 on UnClick todo 4bcb3169)

- [x] Corpus loads from `Z:\Other computers\My laptop\G\CV` (or env override).
- [x] `buildVoiceProfile` returns ≥5 frequent phrases (when corpus is large enough), ≥3 role types, ≥3 past brands.
- [x] `renderCoverLetterDraft` produces a non-empty draft on a real Jobs Applied input.
- [x] Tests pass (vitest).

If any of the above ship-blocks at integration time, the unit tests will surface it before the React page lands.
