# BookendsBuild

UnClick -> AutoPilot -> BookendsBuild.

BookendsBuild is the operating pattern where the smart subscription LLM bookends
a free autonomous build, with QC closing the loop. It is a concept reference,
not a menu or UI surface.

## The loop

1. Front bookend - DraftRoom / PlanRoom (smart). The subscription seat plans and
   builds first while the build context is warm. Build-from-chat is priority:
   never park fresh build context for the free runner to redo later.
2. Middle - the assembly line, OpenHands / CodeRoom (free). Free models keep
   things moving unattended: claim, build the small or simple jobs, open the PR,
   pass the required checks, and merge through the protected rail.
3. Back bookend - QC (smart). On every subscription-seat wake, run a mandatory
   QC pass: read everything the free agents shipped or attempted since the last
   wake, fix what is wrong, and repeat until clean.

## Rules

- Both ends are smart subscription seats. The middle is free autopilot.
- Front and back carry equal, hard priority. Build-first at the front;
  QC-and-fix-first at the back.
- The loop only counts as closed once the back-end QC pass has run over the free
  middle's output.
- The free middle keeps momentum while the operator is away; the smart bookends
  guarantee quality on entry and on exit.
- This concept is hard-wired across the platform so every seat runs both
  bookends. It is not optional.
