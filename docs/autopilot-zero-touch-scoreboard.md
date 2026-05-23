# AutoPilot zero-touch scoreboard

UnClick should not count merged PRs as automation proof. The useful question is:

```text
Did this job move without a human touch?
```

The scoreboard reads `mc_autopilot_events` and groups events by `ref_kind` + `ref_id`.

## Zero-touch rule

A ref is `zero_touch=true` when every recorded event for that ref came from automation.

A ref is human-touched when any event has one of these signals:

- a human-looking actor id, such as `human-*`, `operator-*`, `chris`, or `malamutemayhem`
- explicit payload flags such as `human_touch`, `operator_touch`, or `manual_touch`
- payload source fields such as `trigger_source=operator_chat`, `source=manual`, or `origin=live_chat`

## API

```text
GET /api/memory-admin?action=autopilot_zero_touch_metrics&limit=250
```

Optional filters:

- `ref_kind`
- `ref_id`
- `limit`, capped at 1000

The response returns:

- `events_scanned`
- total refs
- zero-touch refs
- human-touched refs
- human touch count
- reason counts
- per-ref breakdown

## Why this matters

The factory is not proven by activity. It is proven by a safe job entering the rail and leaving with `human_touch_count=0`.

This metric makes that visible without asking an LLM to judge it.

Canary note: fallback rail checks should prove this path with a tiny docs-only PR before broader AutoPilot traffic uses it.
