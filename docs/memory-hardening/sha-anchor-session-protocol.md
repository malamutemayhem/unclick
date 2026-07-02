# SHA-Anchor Session Protocol

Cross-session "amnesia" in the fleet is mostly **not** a memory-store failure. It is
three distinct failures that get blamed on memory:

1. **Stale clones.** Cloud sandboxes boot on an old snapshot and often cannot
   re-fetch. The working tree shows the wrong file (e.g. `memory-admin.ts` at
   11,236 lines instead of 12,091), so a session concludes that finished work
   "isn't here" and re-derives a wrong scope.
2. **Trust-ordering.** When memory and the working tree disagree, sessions trust
   the filesystem ("I can see 11,236 lines") over memory ("12,091, pushed and
   verified"). Here the filesystem is the unreliable side, so the true signal is
   discarded.
3. **Soft claims + load timing.** Memory stores prose ("12,091 lines, verified")
   instead of a verifiable anchor, and the connector often flaps at session
   start, so `load_memory` runs late (or not at all) and decisions get made
   context-blind.

Fixing #1/#2 needs a **verifiable anchor** the next session can check
deterministically: a branch tip **commit SHA**, not a line count. This doc is the
standing format.

## Rule 1 - `save_session` must pin a SHA anchor

Every `save_session` that records landed or in-flight work MUST include a
machine-checkable anchor block, not prose state. Line counts are a description,
not a fact a session can act on; a SHA is.

```
ANCHOR
  repo:    malamutemayhem/unclick
  branch:  claude/unclick-large-files-8aikv3
  tip:     5bae3217            # the commit that contains the work
  base:    origin/main          # what tip was cut from
  proof:   `git cat-file -e 5bae3217` exits 0; api/memory-admin.ts present at this commit
  state:   PR #1608 OPEN (so origin/main does NOT contain this work - expected)
  verify:  git fetch origin claude/unclick-large-files-8aikv3 && git rev-parse origin/...@{commit}
```

Guidelines:

- Record the **SHA**, the **branch**, and whether the PR is open or merged. "PR is
  open" is the single fact that explains why `main` lacks the work - state it
  explicitly so the next session does not read absence-from-main as not-done.
- Never record raw line counts as the proof of state. If you mention a line count,
  mention it as colour only, after the SHA.
- One anchor per landed unit of work. If a session lands two things, write two
  anchors.

## Rule 2 - Reconciliation: memory names a commit the tree lacks

When loaded memory names a commit/branch the working tree does not contain, the
filesystem is **suspect**, not authoritative. Do NOT conclude the work is missing.
Reconcile first:

```
git fetch origin <branch>                 # retry 4x w/ backoff on network error
git cat-file -e <sha> 2>/dev/null && echo "commit present"
git checkout <branch> && git reset --hard origin/<branch>
# re-check the artifact ONLY after the fetch+reset
```

Decision table:

| Memory says | Tree shows | Action |
|-------------|-----------|--------|
| commit `X` on branch `B` | `X` absent, fetch **succeeds** | reset onto `B`, re-evaluate. Tree was stale. |
| commit `X` on branch `B` | `X` absent, fetch **fails** | STOP. You are on a stale clone with no network. Do not build on it. Report it; route the finish to a PC with a current clone + working push. |
| commit `X` | `X` present | trust the tree, proceed |

Absence-from-`main` of an **open PR's** work is expected and is never by itself
evidence the work was not done.

## Rule 3 - Load-first is gated, not best-effort

`load_memory` must succeed before the first substantive scoping decision. If the
connector is unreachable at session start (it flaps), retry before deciding scope;
do not make scoping calls context-blind and reconcile later. If memory cannot be
loaded at all, say so explicitly in the first response and treat all repo state as
unverified until an anchor can be confirmed.

## Identity entry (paste into `save_identity` when the connector is reachable)

The connector frequently exposes zero tools at session start. When it is back,
persist the rule set below via `save_identity` so it loads every session. Keep this
doc as the durable copy (it survives any clone); the identity entry is the
always-loaded mirror.

```
STANDING RULE - SHA-anchor session protocol (see docs/memory-hardening/sha-anchor-session-protocol.md)

1. save_session MUST pin an ANCHOR block: repo, branch, tip SHA, base, PR open/merged.
   Never record line counts as proof of state - a SHA is the only checkable anchor.
2. Reconcile before concluding: if memory names a commit/branch the tree lacks,
   git fetch + reset --hard onto it BEFORE deciding work is missing. Fetch fails =
   stale clone with no network = STOP and route the finish to a current-clone PC.
3. Absence-from-main of an OPEN PR's work is expected, never proof it was not done.
4. load_memory must succeed before the first scoping decision; if the connector is
   down at start, retry, and if still down, say so and treat repo state as unverified.
```
