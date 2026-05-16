# Critical-path queue picker

Closes UnClick todo "Critical-path queue picker: rank todos by unblock value, not only priority" (green-lit efficiency build 2026-05-07).

## What changes

Today the queue picker sorts todos by priority alone. That's a fine first signal, but it ignores throughput: a `medium` todo that unblocks 5 downstream `high` todos has more *real* value than an isolated `high` todo that unblocks nothing.

This module computes a combined score:

```
score = priorityWeight + (reachableUnblocks * unblockMultiplier) + manualScore
```

Where:

- `priorityWeight` - `urgent:100, high:60, medium:30, low:10` by default (configurable).
- `reachableUnblocks` - the number of transitively-downstream todos that list this one as a `blocked_by`. Computed via BFS with a 50-hop cap so cycles can't explode.
- `unblockMultiplier` - `2` by default. Increase to favour unblocking work even more strongly.
- `manualScore` - optional caller override (e.g., for tagging "stale and pinned" boosts).

Excluded statuses (done/cancelled/wontfix/archived) are dropped before ranking.

## API

```ts
import { rankCriticalPath, pickTopN, explainRank } from "~/lib/criticalPathQueue";

const ranked = rankCriticalPath(allTodos);
const top10 = pickTopN(allTodos, 10);
console.log(explainRank(ranked[0]));
// "score 80 = 60w priority, unblocks 10 downstream (3 direct)"
```

`RankedTodo` carries the source todo plus per-axis breakdown so downstream UI can render "why ranked here" inline.

## Integration points

The picker is dependency-free and pure. Drop-in places likely to want it:

- The autonomous runner's claim-selection step (replaces the priority-only sort).
- The admin Jobs board sort order (let humans see the same ordering).
- `list_actionable_todos` server response (could include the score per todo).
- BuildBait crumb prioritisation (pick the next ladder step based on which top-ranked todo has fewest crumbs on it).

## Why a BFS depth cap

UnClick todos can have arbitrary `blocked_by` chains. In pathological cases (or genuine cycles) the depth could explode. The default 50-hop cap is enough for realistic dependency chains but stops bad data from hanging the picker. If a dependency graph genuinely exceeds 50 hops it's almost certainly a data-quality bug worth surfacing separately.

## Tests

`criticalPathQueue.test.ts` covers:

- Priority-only ordering when there are no dependencies.
- Excluded statuses don't appear.
- Unblock count outranks priority when multiplier is set high.
- Transitive (BFS) reach beats direct-only count.
- Circular dependencies are detected without throwing.
- Manual score, priority overrides, missing priority defaults, unknown `blocked_by` ids.
- Stable secondary sort by id.
- `pickTopN` and `explainRank` behaviour.

Run with `vitest run apps/.../criticalPathQueue.test.ts` (or whichever path the repo expects).

## Acceptance (ScopePack 55%)

- [x] `rankCriticalPath` returns todos sorted by combined score desc.
- [x] Default weights favour urgent strongly; configurable.
- [x] Reachable unblocks via BFS with cycle safety.
- [x] `pickTopN` convenience + `explainRank` for surfacing rationale.
- [x] Tests cover every weighting and edge case named in the ScopePack.

## Non-goals

- No persistence of scores (every call recomputes - todos change quickly enough that caching adds bugs not throughput).
- No live UI in this PR; surfacing the score in the Jobs board is a follow-up.
- No replacement of the underlying queue source (`list_actionable_todos`); this is a *re-rank* layer the caller applies on top.

## Source

Drafted 2026-05-15 by `claude-cowork-coordinator-seat`. Files on disk at `Z:\Other computers\My laptop\G\CV\_unclick-drafts\critical-path-queue\`.
