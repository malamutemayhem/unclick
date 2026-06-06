# JobSmith Universal Rules v1

JobSmith now loads the canonical 232-rule pack from `apps/jobsmith/rules/jobsmith-universal-rules-v1.yaml`.

The engine validates:

- rule count matches `total_rules`
- rule IDs are unique
- categories match the rule-pack header
- severity is `ERROR`, `WARN`, or `INFO`
- check method is known

Engine behavior:

- `ERROR` blocks
- `WARN` flags
- `INFO` suggests
- safe `regex` and `keyword_list` checks run automatically
- document-format, semantic, count-threshold, and human-review checks stay in the review-needed bucket
- `decay_period_days` is surfaced as a needs-refresh state when the rule is stale

This keeps v1 useful without pretending every rule is automatically proven.
