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

## XPass vs XGate

| Question | Family | Timing | Typical proof |
|---|---|---|---|
| May this action happen? | XGate | Before execution | Verdict, rule id, authority, ledger entry. |
| Did this work happen correctly? | XPass | After execution | XPass receipt, test output, screenshot, CI, commit, or deploy proof. |

XGate keeps risky actions from starting. XPass keeps completed work honest.
