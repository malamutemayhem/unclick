# FlowPass Product Brief

FlowPass checks whether an important product path can work end-to-end. It is the journey-completion member of the Pass family: TestPass checks tools, UXPass checks human experience, SEOPass checks search readiness, and FlowPass checks that a user can start, move through, recover from errors, and reach a handoff or receipt.

## Current Build Scope

FlowPass now has a real deterministic product slice. It can accept public fixture evidence for a journey, run the default step checks, score the path, produce hat outputs, generate JSON, Markdown, HTML, and fix-prompt reports, and expose MCP tools for run, status, report, pack registration, record-draft, quarantine, and disagreement queue work.

It still does not run live signup, auth, checkout, billing, email, domains, production database writes, or destructive submissions. The current runner is intentionally public-fixture driven so it can prove user-flow logic without touching risky surfaces. Stagehand, Eko, rrweb, side-channel live assertions, visual diff, and synthetic monitoring remain future live-readonly or scheduled-runner layers.

## Default Hats

- Entry route loads.
- Primary CTA is reachable.
- Form is ready for fixture input.
- Success state is represented.
- Failure state is represented.
- Navigation continuity is preserved.
- Handoff proof is available.

The runner also emits the deep-research hat panel shape:

- Driver.
- Verifier.
- Network Observer.
- State Auditor.
- Performance Watcher.
- Accessibility During Flow.
- Edge Case Explorer.
- Flake Detector.
- Synthesiser.

## Shared Scanner Boundary

FlowPass consumes the shared GEOPass scanner contract only as source context. The current adapter records the target URL and shared check ids, especially aggregate AI engine readiness, but it does not duplicate GEOPass scanner internals.

## Build Sequence

1. Done: schema, flow plan, verdict pack, package scaffold, tests, brief.
2. Done: fixture runner receipts for route, CTA, form, success, failure, navigation, and handoff proof.
3. Done: package report surface for JSON, Markdown, HTML, and fix prompt.
4. Done: MCP tools for run, status, report, register pack, record draft, quarantine, and disagreement queue.
5. Next: recurring public FlowPass receipt for one safe UnClick journey.
6. Next: admin report surface and Boardroom or Signals routing.
7. Next: optional live-readonly runner with explicit protected-flow exclusions.
8. Later: Stagehand, Eko, rrweb replay, side-channel live adapters, visual diff, and synthetic monitoring.
