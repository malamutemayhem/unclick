# JobSmith Universal Rules And CV Checklist ScopePack

Target todo: `848eb8db-dfbb-4411-a332-05096b5bf1fb`

Lane: JobSmith

Priority: TEMP ASAP

Status: build-ready source handoff, not DONE

## Goal

Wire the five copied CV checklist sources and the FYI JobSmith rule-pack handoff into `apps/jobsmith` so builders can implement a deterministic, evolving CV rule/checklist engine with proof.

This slice preserves source truth and build shape. It does not claim that all rules are implemented.

## Source Of Truth

Exact source files are copied under:

`apps/jobsmith/docs/copyroom/cv-checklists/`

Machine-readable manifest:

`apps/jobsmith/src/lib/cvChecklistSources.ts`

Proof test:

`apps/jobsmith/src/lib/cvChecklistSources.test.ts`

## Source Inputs

1. `cv-checklists_1.md`
2. `cv-checklists_1a.md`
3. `cv-checklists_1b.md`
4. `cv-checklists_2.md`
5. `cv-checklists_3.md`
6. FYI JobSmith handoff comment `0bad9e59-03cf-44e9-83e2-33f4473a9209`
7. Expanded rule-pack feed comment `4438301e-bdd7-4573-98f6-289ffe40941b`
8. Chris-specified ScopePack addendum comment `b1b49c8f-c3af-44bb-a2d4-363148b4d763`

## Deduped Rule Categories

Use these categories for v1 import and future decay checks:

1. ATS
2. Age
3. Truth
4. Voice
5. AI-detect
6. Cover
7. LinkedIn
8. Visual
9. Metadata
10. Privacy
11. Role-specific
12. Interview-prep
13. Application-strategy

## Engine Contract

The next builder should implement a deterministic rule engine that:

1. Loads a schema-validated rule pack from `apps/jobsmith/rules/`.
2. Keeps every rule linked to one or more source files or Boardroom comment ids.
3. Emits `ERROR`, `WARN`, and `INFO` findings.
4. Blocks output when `ERROR` findings exist.
5. Flags stale rules when `decay_period_days` has passed.
6. Shows rule-pack version in the JobSmith UI.

## Required Rule Shape

Each rule should keep:

- `rule_id`
- `name`
- `category`
- `severity`
- `what`
- `why`
- `sources`
- `applies_when`
- `when_not_applies`
- `check_method`
- `decay_period_days`
- `last_verified_at`
- `volatile`
- `remediation`

## Build Order

1. Import or generate `apps/jobsmith/rules/jobsmith-universal-rules-v1.yaml` from the verified source feed.
2. Add schema validation for the rule file.
3. Implement deterministic checks first: regex, keyword list, count threshold, and format checks.
4. Add semantic or human-review checks only as flagged outputs, not as blocking hidden LLM behavior.
5. Wire `apps/jobsmith/src/pages/JobsmithDraft.tsx` or the active JobSmith page to display rule version, findings, and stale-rule badges.

## Acceptance Criteria

- Five checklist files are present and hash-verified by test.
- Builders can trace each rule back to source file or Boardroom comment.
- The 40-rule handoff mismatch is reconciled before full encoding is claimed.
- At least one deterministic check per category is covered by tests before marking implementation complete.
- UI work includes screenshot proof before any UI/UX DONE claim.
- No job is marked DONE without commit, PR, test output, and reviewer/proof-seat check.

## Stop Conditions

- Stop if rule-pack YAML cannot be schema validated.
- Stop if a rule lacks source citation.
- Stop if exact rule text is needed but only paraphrase is available.
- Stop before touching `package.json` or `package-lock.json` unless a separate owner approves it.
- Stop if another active builder owns the exact file you need.

## Non Goals

- No LLM-based checks in v1.
- No fake metrics or claim invention.
- No hidden text, keyword stuffing, detector evasion, or deceptive ATS tricks.
- No production deploy or DONE transition in this source-handoff slice.

## Reviewer Path

Reviewer should check:

1. `npm run test --workspace=@unclick/jobsmith -- cvChecklistSources`
2. Source manifest hashes match the copied files.
3. The 40-rule mismatch is still visible until reconciled.
4. No existing builder-owned rulePack files were overwritten.
