# XGate Family Map

XGate is UnClick's before-action control family. XPass is the after-action proof family.

Flow:

1. XGate decides whether an action may happen.
2. The action runs only if the verdict allows it or a human grants the required approval.
3. XPass checks whether the work happened correctly and records proof.

## Boundary

XGate covers UnClick-owned tool paths and delegated client hooks where the client supports them. It cannot see shell commands a client runs outside UnClick or outside a generated hook. Those surfaces need client hooks, sandboxes, server-side permissions, branch protection, database roles, and platform controls.

## Inventory

| Family item | Build part | Status in this branch | Wired vs net-new | Purpose |
|---|---:|---|---|---|
| Frozen contract | 1 | Present | Wired foundation | Shared action, context, verdict, result, and gate types. |
| Policy engine | 1 | Present | Wired foundation | Runs gates and applies verdict precedence. |
| Control ledger builder | 1 | Present | Wired foundation | Shapes redacted ledger entries for later persistence. |
| SecretGate | 2 | Planned | Net-new gate | Denies credential exposure before commit or send actions. |
| DataGate | 3 | Planned | Net-new gate | Gates destructive SQL before execution. |
| GitGate | 4 | Planned | Net-new gate | Blocks dangerous git history operations. |
| CommandGate | 5 | Planned | Net-new gate | Gates shell routed through UnClick tools and states the client-shell boundary. |
| TrendSlopGate | Accountability slice | Present in this branch | Net-new gate | Rewrites or escalates over-agreeable, generic, fashionable, or poorly grounded AI advice before it reaches the user. |
| ShipGate | 6 | Planned in sibling lane | Net-new gate | Gates deploy, publish, rollback, DNS, and production-affecting actions. |
| ScopeGate | 7 | Planned in sibling lane | Formalizes existing ScopePack control | Denies writes outside the active owned file set. |
| SpendGate | 7 | Planned in sibling lane | Formalizes existing budget control | Denies or asks when estimated spend crosses budget. |
| Autonomy engine | 8 | Planned | Net-new decision layer | Applies environment, unattended mode, and denial circuit rules. |
| KillGate | 8 | Planned | Net-new global stop | Forces unsafe or non-allow actions to deny while the stop is active. |
| Registry | 9 | Planned in sibling lane | Wiring | Orders the available gates for live checks. |
| XGate endpoint | 9 | Planned in sibling lane | Wiring | Authenticates checks, reads the kill switch, records the ledger, and returns verdicts. |
| Client hook configs | 9 | Planned in sibling lane | Delegated coverage | Generates Claude Code and Cursor hooks for client-side actions where supported. |
| Admin dashboard | 10 | Present | Visibility | Shows recent decisions, verdicts, rule ids, action class, environment, and kill switch state. |
| Eval fixtures | 10 | Present | Regression fixtures | Keeps canonical XGate decisions stable as gates land. |

## Gate Modes

Each XGate product supports a shared control model:

| Mode | Behavior |
|---|---|
| Off | Dormant. No checks, no warnings, no notes. |
| Watch | Runs the gate and logs what would have happened, but never blocks. |
| Block | Enforces the gate verdict before the action or answer leaves UnClick. |

The master XGate control can set all gates to Off, Watch, or Block. When individual gates differ, the master state is Custom. Clicking a master mode from Custom overrides every individual gate.

The XGate admin page also exposes Backbone presets:

- **Backbone Watch** keeps TrendSlopGate watching and logging without blocking.
- **Backbone Block** lets TrendSlopGate rewrite, ask, or deny the narrow high-confidence cases.

## TrendSlopGate

TrendSlopGate covers answer quality before output, especially where AnswerPass or an answer surface signals that the AI may be:

- agreeing with the user's direction before checking the premise
- using fashionable management or AI language without situation-specific grounding
- giving high-risk advice without context, evidence, tradeoffs, or counterpoint
- validating a weak idea because it sounds supportive

The first slice is deterministic and conservative. It does not claim to detect all bad advice. It catches strong signals and returns:

- `allow` when the answer has enough evidence, context, or counterpoint
- `rewrite` when the answer is too agreeable, generic, or trend-heavy
- `ask` when high-risk advice is missing context
- `deny` when a high-confidence AnswerPass or Memory signal says the draft validates a risky or contradicted user premise

TrendSlopGate uses stable `TSG-*` rule ids:

| Rule id | Meaning | Typical verdict |
|---|---|---|
| `TSG-AGREE-001` | Automatic agreement or flattery without challenge. | `rewrite` |
| `TSG-BUZZ-001` | Buzzword-heavy advice without situation-specific grounding. | `rewrite` |
| `TSG-CTX-001` | High-risk advice with missing context or evidence. | `ask` |
| `TSG-PREMISE-001` | Risky or contradicted user premise is being validated. | `deny` |
| `TSG-FLIP-001` | Stance changed under pressure without new evidence. | `rewrite` |
| `TSG-CNTR-001` | AnswerPass quality signals require a clearer counterpoint. | `rewrite` |

The current branch adds a small `answer_quality_risks` contract for AnswerPass adoption. It records gate mode, status, dimensions, triggered rules, action needed, checked dimensions, and what was not checked. AnswerPass should later place that block inside `answer_receipt_v1` so the user sees one answer receipt instead of a separate TrendSlopGate receipt.

Launchpad also has Backbone rules for worker prompt conditioning: use known context or ask, expand options, name a counterpoint, avoid flattery openers, challenge risky premises, strip buzzwords, and calibrate confidence to evidence.

## XPass vs XGate

| Question | Family | Timing | Typical proof |
|---|---|---|---|
| May this action happen? | XGate | Before execution | Verdict, rule id, authority, ledger entry. |
| Did this work happen correctly? | XPass | After execution | XPass receipt, test output, screenshot, CI, commit, or deploy proof. |

XGate keeps risky actions from starting. XPass keeps completed work honest.
