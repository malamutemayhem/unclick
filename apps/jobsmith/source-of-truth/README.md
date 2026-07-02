# Jobsmith Source of Truth

This folder holds the human-readable narrative source behind the Jobsmith
Universal Rules pack. The raw source documents live in CopyRoom so workers copy
from one canonical place and do not retype or duplicate them.

## Files

- `cv-checklist-consolidated-v1.md`: the consolidated single list. 102 deduped
  rules, each tagged with the source documents it came from ([1], [1a], [1b],
  [2], [3]). This is the narrative companion to the rule pack.

## CopyRoom originals

The five raw source checklists are intentionally not duplicated here. Their
canonical CopyRoom home is:

- `apps/jobsmith/docs/copyroom/cv-checklists/cv-checklists_1.md`
- `apps/jobsmith/docs/copyroom/cv-checklists/cv-checklists_1a.md`
- `apps/jobsmith/docs/copyroom/cv-checklists/cv-checklists_1b.md`
- `apps/jobsmith/docs/copyroom/cv-checklists/cv-checklists_2.md`
- `apps/jobsmith/docs/copyroom/cv-checklists/cv-checklists_3.md`

Those files are landed by PR #937 with hash receipts and a manifest. If exact
source text is needed, copy from that CopyRoom path rather than retyping or
creating another copy.

## Rule pack

The build-ready rule pack derived from these sources lives in `../rules/`:

- `jobsmith-universal-rules-v1.md`: human-readable rule pack (232 rules, 13
  categories, every rule with what, why, sources, applies_when, check_method,
  severity, decay).
- `jobsmith-universal-rules-v1.yaml`: the same pack as an engine-parseable flat
  list, ready for the deterministic check engine to import.

## Editing policy

Do not edit source text in place. The CopyRoom originals are preserved as the
source corpus, so any rule in `../rules/` can be traced back to its evidence.
Rule changes flow through the rule pack refresh workflow (to be defined), which
updates `../rules/` and records provenance. Editing copied source text directly
would break the link between a rule and the document that justifies it.

## Refresh policy

The rule pack carries per-category decay periods. AIDETECT rules decay fastest
(era vocabulary shifts), ATS and METADATA rules on a vendor-update cadence, and
stable categories (VOICE, VISUAL, AGE, TRUTH, PRIVACY) do not decay. When a
refresh runs, re-verify the affected rules against current sources, refresh or
add source documents in CopyRoom, then regenerate `../rules/`.
