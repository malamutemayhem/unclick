# XGate Build Retro: learnings from the 10-builder parallel run

Status: retro + shipped hardening. Captures what the XGate parallel build (10
AI seats, Parts 1-10, PRs #1233-1242) taught us about UnClick's own fleet
workflow, and what was built in response so the learnings do not evaporate.

## What happened

Ten AI seats built the XGate pre-execution guardrail family in parallel against
a frozen contract (`docs/xgate-master-build-plan.md`). Builders 1-5 were one
model family, 6-10 another. The integration succeeded on the first attempt
(full suite 1271/1271 green), which is itself the headline result: the
frozen-contract discipline worked. But assembling it by hand surfaced five real
gaps in UnClick's fleet workflow.

## Scoring summary (blind, before the model split was known)

Top tier (94-97): Parts 1, 8, 3, 9, 4. Strong (90-93): 2, 5. Good but
under-tested (78-82): 6, 7, 10. Average ~90. The two real misses were a UI page
shipped with zero tests (Part 10) and branchy gate logic shipped with only 5
tests each (Parts 6, 7). One builder wrote 3 files outside its assigned scope
(Part 7). None of these were caught by any automated gate, because draft PRs
never ran the completion policy.

The cross-model learning was about variance, not winner-take-all: one family was
consistent (tight 90-96 band, no skipped tests); the other was bimodal (built
the single best part AND the only coverage gaps). The actionable signal is
test-discipline and scope-discipline, not raw quality.

## The five gaps

1. **No shared-contract distribution.** Four builders re-typed the frozen
   contract (`types.ts`) because they could not import Part 1's copy mid-build.
   The frozen-text discipline saved it (the copies were byte-identical except
   comments), but a one-field drift would have broken integration. HIGHEST
   leverage gap. Fix direction: a pinned shared artifact parallel seats import,
   not paste (e.g. a published contract package or a generated, hash-checked
   shared file). Documented here; not yet built (needs a packaging decision).

2. **No test-floor enforcement.** A new file with real logic shipped with no
   co-located test and nothing flagged it. UnClick's proof gate should refuse
   "done" on a new logic file with zero coverage. BUILT: `requireTestFloor`.

3. **No "stay in your lane" enforcement.** A builder wrote files outside its
   declared scope. The irony: ScopeGate, which this very build produced,
   prevents exactly this. UnClick should dogfood ScopeGate on its own fleet
   PRs. BUILT: `checkPrScope` (wraps ScopeGate over a PR's changed files).

4. **Integration was manual.** UnClick has the Fishbowl fleet but no integration
   lane that auto-assembles parallel branches, runs the combined suite, and
   flags collisions. Documented here; the pure collision + readiness checks
   below are the reusable core a future integration lane would call.

5. **No duplicate-path detection.** Four seats created the same new path with no
   warning. BUILT: `detectDuplicatePaths`.

## What was built (this batch)

`api/lib/fleet/parallel-build-guard.ts` - three pure, tested checks any fleet
integration step (or the completion policy) can call:

- `requireTestFloor(changedFiles)` - flags new logic files (`.ts`/`.tsx` under
  `api/`, `src/`, `packages/`, excluding configs/types/generated) that have no
  co-located `*.test.ts(x)`. Returns the offenders. Closes gap #2.
- `checkPrScope(changedFiles, ownedGlobs)` - dogfoods the XGate ScopeGate idea
  at PR level: any changed file outside the declared owned set is a scope
  violation. Closes gap #3.
- `detectDuplicatePaths(branchesWithFiles)` - given each parallel branch's new
  paths, reports paths created by more than one branch. Closes gap #5.

These are pure (no IO), unit-tested, and designed to be wired into
`fishbowl-completion-policy` and/or a future integration lane. Wiring them into
the live completion gate is a deliberate, separately-gated step (it changes when
a job is allowed to close), noted but not flipped on by default here.

## The meta-point

Every one of these five is recurring friction, which is exactly what the
continuous-improvement loop (`docs/path-a-eval-harness-spec.md`) and AUTOPILOT's
Improver lane are defined to convert into improvement jobs. This build is a proof
case: the system meant to catch "the same problem keeps happening" watched the
duplicate-contract problem happen four times and the under-testing problem three
times with nobody noticing until the diffs were read by hand. The hardening here
makes those specific frictions machine-detectable so they cannot recur silently.
