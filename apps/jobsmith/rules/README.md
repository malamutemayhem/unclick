# Jobsmith Rules

This folder is the rule-pack lane for Jobsmith.

## Current files

- `jobsmith-universal-rules-v1.md`: human-readable Universal Rules v1, 232 rules across 13 categories.
- `jobsmith-universal-rules-v1.yaml`: engine-parseable Universal Rules v1, using `JS-CAT-NN` rule ids.

## Engine status

These files are the canonical 232-rule pack source. The check engine
(`apps/jobsmith/src/lib/checkEngine.ts`) loads the full pack and automates
rules along two paths:

- Spec-derived checkers: `regex` and `keyword_list` specs that compile
  directly (about 25 rules).
- Curated checkers: `CUSTOM_RULE_MATCHERS`, a hand-written registry for rules
  whose spec is prose but whose intent is deterministic (16 rules, including
  the blocking markdown-residue, placeholder-text, results-driven, and
  current-salary checks, plus the count-based long-sentence and repeated
  bullet-opener checks).

Everything else (human_review, format_check needing DOCX/PDF structure,
semantic_check needing JD comparison) stays in the review-needed bucket and
surfaces through decision cards. The MCP connector
(`packages/mcp-server/src/jobsmith-tool.ts`) ports both paths and must stay in
lockstep when either registry changes.

The earlier Cursor seed work used a smaller Band-ID rule pack to prove the
engine pattern; the engine now runs against the `JS-CAT-NN` ids in this
folder.

## Source trace

The raw checklist originals live in CopyRoom:

`apps/jobsmith/docs/copyroom/cv-checklists/`

The narrative consolidated checklist lives at:

`apps/jobsmith/source-of-truth/cv-checklist-consolidated-v1.md`

Do not copy source text by hand. If exact source text is needed, copy from the
CopyRoom files and keep the hash receipt.
