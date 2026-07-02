# Control Tower

Control Tower coordinates large UnClick jobs. It does not replace Boardroom Jobs. It sits above the work as a traffic controller and turns one big request into clear worker lanes.

## Product Position

- Boardroom Jobs is still the source of truth for the job queue.
- Boardroom is still the shared room for decisions, handoffs, and proof.
- ScopePack is still the small packet workers read before acting.
- Control Tower is the coordinator that decides how many lanes exist, what each worker should claim, and what proof closes the work.

In simple terms:

```text
Big request
-> Control Tower
-> Boardroom Jobs + ScopePack
-> worker lanes
-> XGate before risky action
-> XPass proof after work
-> Crews Council when judgment is needed
```

## When It Triggers

Control Tower should trigger automatically when a request is broad, risky, or multi-worker.

Strong triggers:

- "finish the whole thing"
- "100% complete"
- "dogtest it"
- "launch" or "ship"
- "use workers"
- "new chats"
- "ScopePack"
- "XPass"
- "Crews"
- "continue ControlTower jobs"
- large pasted context with tasks, blockers, proof, or decisions

Tiny one-step requests should stay with one worker unless the work grows.

## Master Copy Box

Control Tower generates a Master Copy Box for the user to paste into new chats. It tells each chat:

- load active ControlTower jobs, Boardroom Jobs, and latest ScopePack
- claim one waiting or stale lane only
- say "I am Worker X of Y for <lane>"
- work only that lane
- report proof back to Boardroom Jobs
- become a Scout, Reviewer, or Proof Checker if active worker slots are full

If the user forgets to paste the box and just says "continue working on ControlTower jobs", the chat should still find the active Control Tower job, read Boardroom Jobs, and claim the next open or stale lane.

## Claim Receipts

Every lane claim should create a `CONTROLTOWER_LANE_CLAIM v1` receipt.

The receipt records:

- Control Tower job and plan id
- lane title and lane id
- Worker X of Y
- claim type
- linked Boardroom job id when one exists
- source of truth
- proof needed
- whether the claim is safe to resume

If the lane comes from Boardroom Jobs, Control Tower should post the receipt as a Boardroom job comment. If the lane does not have a Boardroom job yet, the worker should copy the receipt to the parent Control Tower job or create a scoped Boardroom job first.

This stops a worker claim from living only inside one chat. Another worker can later see who claimed what, whether the lane is stale, and what proof is still missing.

## Worker Lanes

Default lanes:

1. Intake and ScopePack
2. Boardroom Jobs alignment
3. Build lane
4. UI/UX lane
5. XPass proof lane
6. Crews Council lane
7. Integration and closeout

If Boardroom Jobs already has active tasks, those jobs become lanes first. The default lanes fill the gaps.

## Worker Limits

Default active worker cap: 4.

If all active worker slots are full, extra chats must not start random writing. They become:

- Scout
- Reviewer
- Proof Checker

This makes "more chats" helpful without turning the job noisy.

## Paste Intake

Raw pasted text should not be sprayed across every worker.

Control Tower first:

- removes exact duplicates
- redacts secret-shaped text
- extracts tasks
- extracts decisions
- extracts blockers
- extracts proof references
- updates the ScopePack or worker lanes from that cleaned packet

Workers receive only their lane packet, not the whole messy paste.

## XGate, XPass, And Crews

XGate runs before risky action. Examples: deploy, merge, production data, secrets, spend, deletion, public claims.

XPass runs after work to prove it is actually done. Relevant checks may include TestPass, UIPass, UXPass, CopyPass, SlopPass, CommonSensePass, SecurityPass, LegalPass, CompliancePass, and others depending on the work.

Crews is not the XPass umbrella. Crews owns judgment. It should run Council Lite when the work has taste, risk, tradeoffs, conflicting evidence, launch decisions, or over-agreement risk.

Council Lite asks:

- What would make this wrong?
- What evidence is missing, stale, or weak?
- Who would object?
- What is the smallest proof needed?

## Done Rules

A Control Tower job is not done because a worker says "done".

It is done when:

- Boardroom Jobs shows the lane closed or proof-held honestly
- the worker posted named proof
- XPass checks are green or gaps are listed
- Crews judgment is recorded when needed
- stale lanes have been rescued or marked blocked
- final closeout says what shipped, what did not, and what remains
