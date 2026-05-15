import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  __testing__,
  evaluateQuietWindowProof,
  isInQuietWindow,
  proveQuietWindow,
} from "./pinballwake-quiet-window-proof.mjs";

const WINDOW_START = "2026-05-15T00:00:00.000Z";
const WINDOW_END = "2026-05-15T02:00:00.000Z";

function fullEvents() {
  return [
    { rung: "heartbeat_tick", at: "2026-05-15T00:00:05.000Z" },
    { rung: "buildbait_crumb", at: "2026-05-15T00:00:10.000Z" },
    { rung: "lease_claimed", at: "2026-05-15T00:00:20.000Z" },
    { rung: "execution_packet", at: "2026-05-15T00:00:30.000Z" },
    { rung: "build_attempt", at: "2026-05-15T00:00:40.000Z" },
    { rung: "proof_packet", at: "2026-05-15T00:00:50.000Z" },
    { rung: "terminal_receipt", at: "2026-05-15T00:01:00.000Z" },
  ];
}

function roomWith(crumbs) {
  return {
    async listCrumbs() {
      return crumbs;
    },
  };
}

describe("quiet-window clock helper", () => {
  test("default quiet window wraps midnight UTC", () => {
    assert.equal(isInQuietWindow(new Date("2026-05-15T00:30:00.000Z")), true);
    assert.equal(isInQuietWindow(new Date("2026-05-15T06:59:00.000Z")), true);
    assert.equal(isInQuietWindow(new Date("2026-05-15T07:00:00.000Z")), false);
    assert.equal(isInQuietWindow(new Date("2026-05-15T21:59:00.000Z")), false);
    assert.equal(isInQuietWindow(new Date("2026-05-15T22:00:00.000Z")), true);
  });

  test("rejects invalid dates", () => {
    assert.throws(() => isInQuietWindow(new Date("not a date")), TypeError);
    assert.throws(() => isInQuietWindow("2026-05-15T00:00:00Z"), TypeError);
  });
});

describe("evaluateQuietWindowProof", () => {
  test("PASS requires the full scheduled tick-to-terminal ladder", () => {
    const proof = evaluateQuietWindowProof({
      window_start: WINDOW_START,
      window_end: WINDOW_END,
      trigger_source: "schedule",
      job_id: "0068a201",
      claim_id: "claim-1",
      run_id: "run-1",
      events: fullEvents(),
    });
    assert.equal(proof.verdict, "PASS");
    assert.equal(proof.receipt_type, __testing__.RECEIPT_TYPE_PASS);
    assert.equal(proof.first_missing_rung, null);
    assert.deepEqual(proof.evidence.observed_rungs, __testing__.REQUIRED_RUNGS.map((rung) => rung.id));
  });

  test("workflow_dispatch trigger is not clean autonomy proof", () => {
    const proof = evaluateQuietWindowProof({
      window_start: WINDOW_START,
      window_end: WINDOW_END,
      trigger_source: "workflow_dispatch",
      events: fullEvents(),
    });
    assert.equal(proof.verdict, "HOLD");
    assert.equal(proof.reason_code, "not_clean_autonomy_proof");
    assert.equal(proof.first_missing_rung, "scheduled_trigger");
  });

  test("manual chat inside the window is not clean autonomy proof", () => {
    const proof = evaluateQuietWindowProof({
      window_start: WINDOW_START,
      window_end: WINDOW_END,
      trigger_source: "schedule",
      events: [
        ...fullEvents(),
        { kind: "manual_chat", at: "2026-05-15T00:30:00.000Z", author_agent_id: "human-chris" },
      ],
    });
    assert.equal(proof.verdict, "HOLD");
    assert.equal(proof.reason_code, "not_clean_autonomy_proof");
    assert.equal(proof.first_missing_rung, "no_human_operator_chat_trigger");
  });

  test("claim-only proof holds at the first missing execution packet", () => {
    const proof = evaluateQuietWindowProof({
      window_start: WINDOW_START,
      window_end: WINDOW_END,
      trigger_source: "schedule",
      events: [
        { rung: "heartbeat_tick", at: "2026-05-15T00:00:05.000Z" },
        { rung: "buildbait_crumb", at: "2026-05-15T00:00:10.000Z" },
        { rung: "lease_claimed", at: "2026-05-15T00:00:20.000Z" },
      ],
    });
    assert.equal(proof.verdict, "HOLD");
    assert.equal(proof.first_missing_rung, "execution_packet");
    assert.equal(proof.next_action, "record_execution_packet");
  });

  test("missing build attempt or CommonSensePass blocker is a BLOCKER", () => {
    const proof = evaluateQuietWindowProof({
      window_start: WINDOW_START,
      window_end: WINDOW_END,
      trigger_source: "schedule",
      events: [
        { rung: "heartbeat_tick" },
        { rung: "buildbait_crumb" },
        { rung: "lease_claimed" },
        { rung: "execution_packet" },
      ],
    });
    assert.equal(proof.verdict, "BLOCKER");
    assert.equal(proof.receipt_type, __testing__.RECEIPT_TYPE_BLOCKER);
    assert.equal(proof.first_missing_rung, "build_attempt_or_commonsensepass_blocker");
  });

  test("explicit CommonSensePass blocker satisfies the build-attempt rung", () => {
    const proof = evaluateQuietWindowProof({
      window_start: WINDOW_START,
      window_end: WINDOW_END,
      trigger_source: "schedule",
      events: [
        { rung: "heartbeat_tick" },
        { rung: "buildbait_crumb" },
        { rung: "lease_claimed" },
        { rung: "execution_packet" },
        { rung: "commonsensepass_blocker" },
        { rung: "proof_packet" },
        { rung: "terminal_receipt" },
      ],
    });
    assert.equal(proof.verdict, "PASS");
  });

  test("missing timestamps hold with parser-readable first_missing_rung", () => {
    const proof = evaluateQuietWindowProof({ window_start: WINDOW_START, trigger_source: "schedule" });
    assert.equal(proof.verdict, "HOLD");
    assert.equal(proof.first_missing_rung, "window_end");
  });
});

describe("proveQuietWindow", () => {
  test("outside quiet window returns a hold receipt", async () => {
    const proof = await proveQuietWindow({
      heartbeatRunId: "run-1",
      runTime: new Date("2026-05-15T12:00:00.000Z"),
      targetTodoId: "11957893",
      room: roomWith([]),
      since: new Date("2026-05-15T11:59:00.000Z"),
      triggerSource: "schedule",
    });
    assert.equal(proof.verdict, "HOLD");
    assert.equal(proof.reason_code, "outside_quiet_window");
  });

  test("room crumbs can satisfy the BuildBait rung but not the whole ladder alone", async () => {
    const proof = await proveQuietWindow({
      heartbeatRunId: "run-2",
      runTime: new Date("2026-05-15T02:00:00.000Z"),
      targetTodoId: "11957893",
      room: roomWith([
        {
          commentId: "crumb-1",
          createdAt: "2026-05-15T01:00:00.000Z",
          authorId: "pinballwake-job-runner",
          step: 1,
        },
      ]),
      since: new Date("2026-05-15T00:00:00.000Z"),
      triggerSource: "schedule",
    });
    assert.equal(proof.verdict, "HOLD");
    assert.equal(proof.first_missing_rung, "claim_or_lease");
    assert.deepEqual(proof.evidence.observed_rungs, ["heartbeat_tick", "buildbait_crumb"]);
  });

  test("validates required arguments", async () => {
    await assert.rejects(() => proveQuietWindow({ runTime: new Date(), targetTodoId: "x", room: roomWith([]) }), TypeError);
    await assert.rejects(() => proveQuietWindow({ heartbeatRunId: "run", targetTodoId: "x", room: roomWith([]) }), TypeError);
    await assert.rejects(() => proveQuietWindow({ heartbeatRunId: "run", runTime: new Date(), room: roomWith([]) }), TypeError);
    await assert.rejects(() => proveQuietWindow({ heartbeatRunId: "run", runTime: new Date(), targetTodoId: "x", room: {} }), TypeError);
  });
});
