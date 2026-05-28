# Jobsmith Rules

This folder is the rule-pack lane for Jobsmith.

## Current files

- `jobsmith-universal-rules-v1.md`: human-readable Universal Rules v1, 229 rules across 13 categories.
- `jobsmith-universal-rules-v1.yaml`: engine-parseable Universal Rules v1, using `JS-CAT-NN` rule ids.

## Engine status

These files are the canonical 229-rule pack source for the next deterministic
check-engine slice. They are not proof that the engine is fully wired yet.

The earlier Cursor seed work used a smaller Band-ID rule pack to prove the
engine pattern. The follow-up builder must map the engine to the `JS-CAT-NN`
ids in this folder before Jobsmith can claim the full rule pack is active.

## Source trace

The raw checklist originals live in CopyRoom:

`apps/jobsmith/docs/copyroom/cv-checklists/`

The narrative consolidated checklist lives at:

`apps/jobsmith/source-of-truth/cv-checklist-consolidated-v1.md`

Do not copy source text by hand. If exact source text is needed, copy from the
CopyRoom files and keep the hash receipt.
