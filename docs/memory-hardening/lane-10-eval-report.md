# Lane 10 Memory Eval Report

Generated for `memory-hardening-eval-v1` on `2026-06-04T03:19:12.802Z` against the local memory backend.

The existing proof-as-reward eval files at `docs/eval-baseline.json` and `docs/eval-report.md` are not overwritten by this lane. This report is the memory-hardening scorecard that Coordinator can rerun after lane merges.

## Headline

| Metric | Value |
| --- | ---: |
| Scorecard | 66.7% |
| Diagnostics passed | 4 / 6 |
| Passport roundtrip fidelity | 100.0% |
| Passport credential leakage | 0 |

## Registry Metrics

| Metric | Value |
| --- | ---: |
| `recall@5` | 1 |
| `latest_value_accuracy` | 1 |
| `scope_leakage` | 1 |
| `forget_compliance` | 1 |
| `duplicate_rate` | 0.666667 |
| `write_precision` | 1 |
| `passport_roundtrip_fidelity` | 1 |
| `passport_credential_leakage` | 0 |

Metrics owned by lanes that have not merged yet remain `null` in the JSON baseline.

## Diagnostics

| Scenario | Result | Owner Expected To Move It |
| --- | --- | --- |
| paraphrase-recall | pass | Worker 1 / Worker 6 |
| latest-value | pass | Worker 2 |
| scope-bleed | fail | Worker 4 |
| no-answer | pass | Worker 7 |
| forget | pass | Worker 5 |
| duplicate-storm | fail | Worker 7 |

The failing baseline cases are not lane-10 failures. They are the observable pre-change deltas the harness is meant to catch.
