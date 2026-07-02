---
name: Performance investigator
slug: performance-investigator
version: 1.0.0
description: "Diagnose performance problems methodically: measure first, identify the bottleneck, fix the bottleneck, and verify the improvement. Prevents premature optimization and shotgun tuning."
category: debugging
tags: [performance, profiling, optimization, bottleneck, latency, memory, database]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick performance diagnosis workflow.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder, Tester]
required_mcp_tools: [shell]
required_apps: []
---

# Performance investigator

Use this when something is slow, using too much memory, or scaling poorly. Do not use this for premature optimization of code that is fast enough.

## Establish the baseline (before touching anything)

1. **Define "slow" with a number.** "The /dashboard endpoint takes 4.2 seconds at P95" is actionable. "The app feels sluggish" is not. Get a measurement before you change anything.
2. **Identify the workload.** What input size, concurrency level, or data volume triggers the problem? Performance issues that only appear at scale need scale to reproduce.
3. **Set a target.** "Under 500ms at P95" or "handle 1000 concurrent users." Without a target, you will either stop too early or optimize forever.

## Find the bottleneck (measure, do not guess)

4. **Profile, do not speculate.** Use the right tool for the layer:
   - **Network:** browser devtools waterfall, curl timing, server access logs.
   - **Application:** language profiler (pprof, py-spy, clinic.js, Instruments), flame graphs.
   - **Database:** EXPLAIN ANALYZE, slow query log, connection pool metrics.
   - **Memory:** heap snapshots, allocation profilers, GC logs.
5. **Identify the single largest contributor.** Performance follows the Pareto principle. Find the one function, query, or network call that accounts for the majority of the time. Fix that first.
6. **Check for the usual suspects:**
   - N+1 queries (one query per item in a loop).
   - Missing indexes on filtered or joined columns.
   - Synchronous I/O blocking an event loop.
   - Unbounded data fetches (SELECT * with no LIMIT on a large table).
   - Redundant computation (same expensive calculation repeated in a loop).
   - Excessive serialization or copying (large objects converted repeatedly).

## Fix the bottleneck (one change at a time)

7. **Make one change.** Measure again. Compare to the baseline. If the number did not improve meaningfully, revert and try the next hypothesis.
8. **Prefer algorithmic fixes over caching.** Changing O(n^2) to O(n log n) is permanent. Adding a cache is a new thing to invalidate. Use caching when the algorithmic fix is not possible or practical.
9. **Prefer database fixes over application fixes.** An index, a better query, or a materialized view usually outperforms application-level workarounds and survives refactors.

## Verify

10. **Re-measure with the same workload as step 1.** Did you hit the target from step 3? If not, go back to step 4 with the updated profile.
11. **Check for regressions.** The fix should not break correctness. Run the test suite. Check edge cases. Fast and wrong is not an improvement.

## Output

Report the baseline measurement, the bottleneck found, the fix applied, and the new measurement. If the target was not met, note what remains and what the next investigation step would be.

## Rules

- Never optimize without a measurement. Intuition about performance is wrong more often than right.
- Never make two performance changes at once. You will not know which one helped.
- Stop when you hit the target. Further optimization has diminishing returns and increasing risk.
