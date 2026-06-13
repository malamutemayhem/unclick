# Always-On Inspection: wiring the eval loop into the bookends and Autopilot

Status: design + shipped helper. Explains how "continuous improvement on every
Hi" actually works, using the rails UnClick already has rather than inventing a
background mind.

## The expectation

The intended behaviour: every time someone talks to an AI seat connected to
UnClick, the system should inspect what is going on, learn, and keep improving,
even if the message is just "Hi". And Autopilot should handle the safe building.

## Why the bookends are the right trigger

UnClick already mandates a session protocol: every seat calls `load_memory` as
its FIRST action and `save_session` at the end (the bookends), even for trivial
messages. That is the hook. We do not need a new always-running process; we
attach inspection to the start bookend that already fires on every session.

So "on every Hi" is achieved by: load_memory -> also run a fast inspection ->
return the report alongside the memory payload.

## What the inspection does (and does not do)

`api/lib/eval/session-inspection.ts` (`buildSessionInspection`) is pure and
read-only by construction. On each session start it takes the current truth-rate
summary plus the fresh fake-green / stale job ids (from the same eval pipeline
the dashboard uses) and returns:

- a status (healthy / watch / needs_attention),
- a plain-English headline a seat can show,
- specific notes and next actions,
- and, ONLY when the same friction has recurred past a streak threshold, a
  PROPOSED improvement job for the Autopilot Improver lane.

It never self-edits, never takes destructive action, and never builds anything.
It measures, reports, and at most proposes.

## Why proposing (not auto-building) is correct, and where Autopilot comes in

AUTOPILOT.md already defines the chain of command and a dedicated lane:

- The Improver lane (♻️ / Continuous Improvement) "owns repeated resistance. If
  the same manual nudge, missing ACK, stale proof, or routing confusion recurs,
  create a front-of-line improvement job instead of normalizing the friction."
- High-impact actions need explicit command authority; every boundary-crossing
  action must be reconstructable from the control ledger; kill switches are
  checked before high-impact execution.

So the correct division of labour is:

- Inspection (this helper, on every session): detect recurring friction, emit a
  structured improvement job with evidence. This is the "create a front-of-line
  improvement job" step the Improver lane is defined around.
- Autopilot: pick up that gated job and do the safe building under the existing
  tiers, control ledger, and proof gates.

That is the honest version of "always running and continuously improving": the
measuring and proposing run continuously and hands-off; the BUILDING stays
inside Autopilot's gated, observable process. Continuous measurement is safe to
automate; self-modification is deliberately not, and the eval gate plus the
autonomy budget enforce that.

## The flow end to end

1. Seat connects, says anything (even "Hi").
2. load_memory fires (already mandatory) and runs buildSessionInspection.
3. The seat sees the current truth-rate, fake-green, and stale state.
4. If friction recurs, an improvement job (lane: improver, with evidence) is
   proposed for the Autopilot board.
5. Autopilot's Improver lane picks it up and builds the fix under its gates.
6. The proof-as-reward loop scores the result; routing and policies only change
   when they beat the frozen baseline.

## What is shipped vs pending

Shipped: the pure inspection helper + tests, and this design.

Pending wiring (small, explicit, owner-gated because it touches the live
memory bookend and the live board):
- call buildSessionInspection from the load_memory handler and include its
  report in the startup payload;
- persist the recurring-friction streak (so "recurs N times" is real across
  sessions) using the same memory backend;
- write the proposed improvement job to the Boardroom via the existing job
  pipeline so the Improver lane sees it.

These are intentionally left as a gated step: they change behaviour on every
session and post to the live board, so they should land deliberately, not as a
silent default.
