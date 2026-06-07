---
description: Test a batch of UnClick apps by physically calling their MCP tools and record pass/fail/attention into the AppTesting table.
---

# AppTesting loop

One safe, bounded cycle of live MCP tool testing. Runs the catalog a batch at a
time and keeps `src/data/app-test-results.json` current so the admin AppTesting
page (`/admin/app-testing`) shows real green/amber/red status per app.

This is a build loop, but a careful one: it READS tools, it does not send, post,
pay, or generate.

## Cycle

1. Load `src/data/app-catalog.generated.json` (all apps + their tools) and
   `src/data/app-test-results.json` (current results).
2. Pick up to **10** apps to test this cycle, in this priority order:
   - never-tested apps (no entry), then
   - stale apps (`testedAt` older than 14 days), then
   - prior `fail` apps worth a cheap re-check.
   If every app is tested and fresh, **silent-exit**: change nothing, commit
   nothing, say nothing.
3. For each selected app, choose ONE safe representative action:
   - Prefer read-only verbs: `get` / `list` / `search` / `current` / `info` /
     `quote` / `lookup` / `status` / `recent` / `top` / `random`.
   - Use minimal, well-known params (a common id, symbol, city, or query).
   - Find the action and its params with `unclick_search` / `unclick_tool_info`
     if the catalog entry is not enough, then call it (direct tool or
     `unclick_call`).
4. **Never fire paid or side-effecting actions.** If an app only exposes
   send / post / create / update / delete / generate / call / upload / pay /
   charge / react / comment / image / video / speech actions (e.g. Twilio send,
   SendGrid send, OpenAI image, HeyGen, ElevenLabs, Kling, Runway), do NOT call
   them. Record `attention` with note `paid or side-effecting only; needs manual test`.
5. Classify the result:
   - `pass` - valid structured response with the expected fields.
   - `attention` - works but blocked on a human step: `not_connected` / missing
     key / needs login / rate-limited (429) / paid-or-side-effecting-skipped /
     valid-but-empty.
   - `fail` - error, timeout, 5xx, malformed, or clearly wrong output.
6. Update `src/data/app-test-results.json`:
   - set `results[<slug>]` to `{ status, note, testedAt: <now ISO>, toolsTested: [<tool>] }`.
   - the `note` is ONE line: what was called and what happened.
   - bump top-level `updatedAt`.
   - **Never** write keys, tokens, secrets, or raw credentials into a note. Redact.
7. Commit the data file to the current branch and push (data-only update, ship
   without ask). Keep ONE rolling draft PR ("AppTesting results run") updated;
   do not open a new PR every cycle.
8. Continuity: `save_conversation_turn` with
   `session_id='unclick-apptesting-loop'` and a compact line of batch counts
   (tested N: P pass / A attention / F fail). `save_session` at a natural stop.

## Guardrails

- Read-only by default. No spend, no messages, no posts, no data mutation in the
  apps under test.
- Gated surfaces (secrets, auth, billing, migrations) are never touched.
- One safe step per app; cap the batch at 10 so a cycle stays cheap.
- If the MCP tool surface itself looks down (many calls failing identically),
  post ONE `BLOCKER` line and stop instead of churning.
- Stop the loop once a full pass is complete unless re-testing on a schedule is
  wanted; stale re-checks keep it useful long-term.

## Suggested cadence

`/loop 30m /app-testing-loop` -> ~10 apps per cycle, a first full pass of the
catalog in roughly half a day, then quiet except for stale re-checks.
