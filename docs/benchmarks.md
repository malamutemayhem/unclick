# UnClick Benchmarks

**Purpose:** prove, with dated evidence, that UnClick makes an AI agent
better. The Benchmarks admin page is the scoreboard investors and the team
look at to answer one question: is UnClick earning its place, or is it
clutter?

This is the "report card" phase. It stores and displays results and gives
you an idiot-proof view of progress over time. A later phase can add an
automated harness that runs the contestants by itself and posts results to
the same scoreboard with no rework.

## The idea in one minute

A **suite** is an exam made of weighted categories. A **run** is one sitting
of that exam on a date. Each run has four **contestants**:

| Contestant key   | Meaning           |
|------------------|-------------------|
| `codex_raw`      | Codex on its own  |
| `claude_raw`     | Claude on its own |
| `codex_unclick`  | Codex + UnClick   |
| `claude_unclick` | Claude + UnClick  |

Every contestant gets a score out of 100. The **UnClick lift** is how many
points UnClick adds for an engine (`unclick - raw`). It is computed at read
time, never stored.

## Why the categories are weighted the way they are

The starter suite (`unclick-capability-v1`) covers five categories. Tool use
and memory carry the most weight because they are what UnClick uniquely
provides. A pure coding test would mostly grade the base model and show
little UnClick lift, which would undersell the product.

| Category    | Weight | UnClick strength? | What it is |
|-------------|:------:|:-----------------:|------------|
| Coding      |   20   |                   | Famous public style (HumanEval / SWE-bench): write/fix code that passes hidden tests |
| Reasoning   |   15   |                   | Famous public style (GSM8K / BIG-Bench): multi-step logic and word problems |
| Knowledge   |   15   |                   | Famous public style (MMLU): broad factual exam |
| Tool use    |   25   |        yes        | Mix (GAIA / tau-bench + UnClick tasks): actually call real tools to get something done |
| Memory      |   25   |        yes        | Custom UnClick test: recall something across a fresh, later session |

Weights sum to 100, so a run's overall score is a clean 0-100 number. Each
category carries an `origin` (`famous`, `mixed`, or `custom`) and a `basis`
string, which the page renders in plain English so anyone can see at a
glance what the exam actually measures.

## Where things live

| Piece            | File |
|------------------|------|
| Database schema  | `supabase/migrations/20260529100000_benchmarks_schema.sql` |
| Scoring + lift maths | `src/lib/benchmarks.ts` (unit-tested in `benchmarks.test.ts`) |
| API (admin-gated) | `api/benchmarks.ts` (helpers tested in `benchmarks.test.ts`) |
| The report card UI | `src/pages/admin/AdminBenchmarks.tsx` (`/admin/benchmarks`) |
| Recording helper | `scripts/benchmark-record.mjs` |

The tables are server-controlled: only `/api/benchmarks` (service role,
gated on `ADMIN_EMAILS`) reads and writes them.

## How to record a run

Build a JSON file in this shape and post it. `overall_score` is optional;
if omitted it is computed from `category_scores` and the suite weights.

```json
{
  "suite_slug": "unclick-capability-v1",
  "run_label": "June 2026 baseline",
  "run_date": "2026-06-01",
  "source": "manual",
  "notes": "First real run after the memory upgrade.",
  "results": [
    {
      "contestant": "claude_raw",
      "category_scores": {
        "coding":    { "score": 80, "max": 100 },
        "reasoning": { "score": 78, "max": 100 },
        "knowledge": { "score": 70, "max": 100 },
        "tool_use":  { "score": 20, "max": 100 },
        "memory":    { "score": 15, "max": 100 }
      },
      "tasks_total": 100,
      "tasks_passed": 47,
      "evidence": { "model": "claude-opus-4-8", "transcript_url": "..." }
    }
    // ...repeat for claude_unclick, codex_raw, codex_unclick
  ]
}
```

Post it with the helper (needs an admin session token):

```bash
node scripts/benchmark-record.mjs ./my-run.json \
  --base https://unclick.world \
  --token "$ADMIN_ACCESS_TOKEN"
```

The seed migration adds one **sample run** so the page is not empty. It is
clearly badged "Sample data" and can be removed from the page with one
click once a real run exists.

## Each test should help close the loop

The point is not just a number; it is to find where agents fail and feed
that back into UnClick. When a run is recorded:

- Put the failing-task detail in each result's `evidence` (transcript link,
  which tasks failed, why).
- The categories with the lowest UnClick lift are the next thing to improve
  (e.g. if tool-use lift is small, the catalog or tool descriptions need
  work; if memory lift is small, recall quality needs work).
- This pairs with `.github/workflows/continuous-improvement-watch.yml`: a
  declining or flat score across dated runs is a signal to open improvement
  work, the same way the fleet reacts to other signals.

## What "100" means

100 = aced every task, including the hardest. Nobody is expected to hit 100
soon, so the number climbing across dated runs is the progress signal. The
report shows both the absolute score and the UnClick lift so you can read
"how good is it" and "how much is UnClick helping" at the same time.
