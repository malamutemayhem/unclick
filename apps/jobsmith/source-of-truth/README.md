# Jobsmith Source of Truth

This folder holds the source-of-truth research corpus behind the Jobsmith
Universal Rules pack. The deduped, machine-readable consolidation lives in
`../rules/`. This folder is the human-readable narrative source.

## Files

- `cv-checklist-consolidated-v1.md`: the consolidated single list. 102 deduped
  rules, each tagged with the source documents it came from ([1], [1a], [1b],
  [2], [3]). This is the narrative companion to the rule pack.
- `cvchecklists_1.md`: source checklist 1, source tag [1].
- `cvchecklists_1a.md`: source checklist 1a, source tag [1a].
- `cvchecklists_1b.md`: source checklist 1b, source tag [1b].
- `cvchecklists_2.md`: source checklist 2, source tag [2].
- `cvchecklists_3.md`: source checklist 3, source tag [3].

## Rule pack

The build-ready rule pack derived from these sources lives in `../rules/`:

- `jobsmith-universal-rules-v1.md`: human-readable rule pack (229 rules, 13
  categories, every rule with what, why, sources, applies_when, check_method,
  severity, decay).
- `jobsmith-universal-rules-v1.yaml`: the same pack as an engine-parseable flat
  list, ready for the deterministic check engine to import.

## Editing policy

Do not edit the files in this folder in place. They are preserved verbatim as
the source corpus, so any rule in `../rules/` can be traced back to its
evidence. Rule changes flow through the rule pack refresh workflow (to be
defined), which updates `../rules/` and records provenance. Editing a source
file here directly would break the link between a rule and the document that
justifies it.

## Refresh policy

The rule pack carries per-category decay periods. AIDETECT rules decay fastest
(era vocabulary shifts), ATS and METADATA rules on a vendor-update cadence, and
stable categories (VOICE, VISUAL, AGE, TRUTH, PRIVACY) do not decay. When a
refresh runs, re-verify the affected rules against current sources, refresh or
add source documents in this folder, then regenerate `../rules/`.
