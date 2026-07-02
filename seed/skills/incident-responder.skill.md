---
name: Incident responder
slug: incident-responder
version: 1.0.0
description: "Structured triage and diagnosis when production breaks: read logs, form hypotheses, isolate the blast radius, apply the smallest safe fix, and verify recovery."
category: debugging
tags: [incident, production, triage, outage, debugging, logs, rollback]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick incident response playbook. No source text copied.
unclick_usefulness: 5
unclick_native: skill
required_worker_roles: [Builder, Tester]
required_mcp_tools: [shell]
required_apps: []
---

# Incident responder

Use this when something is broken in production, a critical bug has been reported, error rates are spiking, or a deploy just went wrong. Speed matters but misdiagnosis costs more than a few extra minutes of reading.

## Triage (first 2 minutes)

1. **Scope the blast radius.** What is broken: one endpoint, one page, all users, one region, one customer? Ask if unclear.
2. **When did it start?** Correlate with the most recent deploy, config change, or dependency update. Check git log, deploy history, and recent PRs merged.
3. **Is it getting worse?** Rising error rate means act now. Stable error rate means diagnose carefully.
4. **Can we roll back safely?** If the last deploy is the obvious cause and rollback is available, that is almost always the right first move. Fix forward only when rollback would cause data loss or a worse outage.

## Diagnose

5. **Read the actual error.** Find the first occurrence in logs, not the 500th. The earliest stack trace has the most context. Read the full trace, not just the message.
6. **Form exactly one hypothesis** before touching code. State it plainly: "I think X is failing because Y changed and Z depends on it."
7. **Test the hypothesis with the smallest possible check.** A curl, a query, a log grep, a unit test. Do not shotgun-debug by changing three things at once.
8. **If the hypothesis is wrong, update and repeat.** Track what you ruled out so you do not revisit dead ends.

## Fix

9. **Apply the smallest repair that restores service.** A one-line fix, a config revert, a feature flag toggle. Heroic refactors during an incident create new incidents.
10. **Verify in the same environment where it broke.** Passing locally is not proof. Check the production logs, error rates, or health endpoint after deploy.

## Close

11. **Summarize what broke, why, what fixed it, and what remains.** This is the incident record. One paragraph, not a novel.
12. **Flag follow-ups.** Missing monitoring, missing tests, fragile config, root cause deeper than the fix. These are tasks, not blockers.

## Rules

- Never guess when you can read a log.
- Never change production data to "test a theory" without explicit approval.
- Prefer rollback over fix-forward unless there is a concrete reason not to.
- If you are stuck after 10 minutes of diagnosis, say so. Fresh eyes or more context beats spinning.
