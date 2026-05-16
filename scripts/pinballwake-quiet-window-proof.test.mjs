// scripts/pinballwake-quiet-window-proof.test.mjs

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  isInQuietWindow,
  isAiSeatId,
  pickAutonomousCrumb,
  buildHoldReceipt,
  buildPassReceipt,
  proveQuietWindow,
  __testing__,
} from "./pinballwake-quiet-window-proof.mjs";

function makeFakeRoom(crumbs) {
  return {
    async listCrumbs() {
      return crumbs;
    },
  };
}

describe("isInQuietWindow", () => {
  test("default window (22..07 UTC) accepts midnight, 2am, 6:59am", () => {
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 0, 0, 0))), true);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 2, 30, 0))), true);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 6, 59, 59))), true);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 22, 0, 0))), true);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 23, 30, 0))), true);
  });

  test("default window rejects business hours UTC", () => {
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 7, 0, 0))), false);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 12, 0, 0))), false);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 21, 59, 59))), false);
  });

  test("non-wrapping window (1..5 UTC) only matches that range", () => {
    const w = { startHourUtc: 1, endHourUtc: 5 };
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 1, 0, 0)), w), true);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 4, 59, 0)), w), true);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 5, 0, 0)), w), false);
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 0, 0, 0)), w), false);
  });

  test("24h window (start === end) is always quiet", () => {
    const w = { startHourUtc: 0, endHourUtc: 0 };
    assert.equal(isInQuietWindow(new Date(Date.UTC(2026, 4, 15, 12, 0, 0)), w), true);
  });

  test("throws on invalid date", () => {
    assert.throws(() => isInQuietWindow(new Date("nope")), TypeError);
    assert.throws(() => isInQuietWindow("2026-05-15"), TypeError);
  });
});

describe("isAiSeatId", () => {
  test("recognises AI seat prefixes", () => {
    assert.equal(isAiSeatId("claude-cowork-coordinator-seat"), true);
    assert.equal(isAiSeatId("chatgpt-codex-desktop"), true);
    assert.equal(isAiSeatId("codex-fleet-action-runner"), true);
    assert.equal(isAiSeatId("pinballwake-job-runner"), true);
    assert.equal(isAiSeatId("cascade-fleet-runner-seat"), true);
    assert.equal(isAiSeatId("cowork-bailey-builder"), true);
    assert.equal(isAiSeatId("unclick-heartbeat-seat"), true);
    assert.equal(isAiSeatId("buildbait-room"), true);
  });

  test("rejects human seats and garbage", () => {
    assert.equal(isAiSeatId("human-chris"), false);
    assert.equal(isAiSeatId("human-byrneck"), false);
    assert.equal(isAiSeatId(""), false);
    assert.equal(isAiSeatId(null), false);
    assert.equal(isAiSeatId(undefined), false);
    assert.equal(isAiSeatId("random-name"), false);
  });
});

describe("pickAutonomousCrumb", () => {
  test("picks first AI-authored crumb after `since`", () => {
    const since = new Date(Date.UTC(2026, 4, 15, 0, 0, 0));
    const crumbs = [
      { authorId: "human-chris", createdAt: "2026-05-15T01:00:00Z" },
      { authorId: "random", createdAt: "2026-05-15T01:30:00Z" },
      { authorId: "claude-cowork-coordinator-seat", createdAt: "2026-05-15T02:00:00Z", commentId: "C1", step: 1 },
      { authorId: "pinballwake-job-runner", createdAt: "2026-05-15T03:00:00Z", commentId: "C2", step: 2 },
    ];
    const picked = pickAutonomousCrumb({ crumbs, since });
    assert.equal(picked.commentId, "C1");
  });

  test("returns null when no AI crumb exists in window", () => {
    const since = new Date(Date.UTC(2026, 4, 15, 0, 0, 0));
    const crumbs = [
      { authorId: "human-chris", createdAt: "2026-05-15T01:00:00Z" },
      { authorId: "claude-cowork", createdAt: "2026-05-14T23:00:00Z" }, // before `since`
    ];
    assert.equal(pickAutonomousCrumb({ crumbs, since }), null);
  });

  test("ignores crumbs with missing createdAt / authorId", () => {
    const crumbs = [{}, { authorId: "claude-x" }, { createdAt: "2026-05-15T01:00:00Z" }];
    assert.equal(pickAutonomousCrumb({ crumbs }), null);
  });

  test("handles a non-array crumbs argument", () => {
    assert.equal(pickAutonomousCrumb({ crumbs: null }), null);
    assert.equal(pickAutonomousCrumb({}), null);
  });
});

describe("buildHoldReceipt", () => {
  test("returns canonical hold shape with required fields", () => {
    const r = buildHoldReceipt({ reason: "outside_quiet_window", heartbeatRunId: "HB-1" });
    assert.equal(r.receipt_type, __testing__.RECEIPT_TYPE_HOLD);
    assert.equal(r.hold_reason, "outside_quiet_window");
    assert.deepEqual(r.proof_required, __testing__.PROOF_REQUIRED_FIELDS);
    assert.equal(r.xpass_advisory, false);
    assert.equal(r.evidence.heartbeat_run_id, "HB-1");
    assert.ok(r.emitted_at.match(/^\d{4}-\d{2}-\d{2}T/));
  });
});

describe("buildPassReceipt", () => {
  test("returns canonical pass shape with full evidence", () => {
    const r = buildPassReceipt({
      heartbeatRunId: "HB-2",
      crumb: {
        commentId: "C1",
        todoId: "11957893",
        step: 1,
        authorId: "claude-cowork",
        createdAt: "2026-05-15T02:00:00Z",
      },
    });
    assert.equal(r.receipt_type, __testing__.RECEIPT_TYPE_PASS);
    assert.equal(r.evidence.crumb_comment_id, "C1");
    assert.equal(r.evidence.crumb_todo_id, "11957893");
    assert.equal(r.evidence.crumb_step, 1);
    assert.equal(r.xpass_advisory, true);
    assert.equal(r.next_action, "advance_buildbait_ladder");
  });
});

describe("proveQuietWindow", () => {
  test("HOLD when outside quiet window", async () => {
    const runTime = new Date(Date.UTC(2026, 4, 15, 12, 0, 0));
    const room = makeFakeRoom([
      { authorId: "claude-x", createdAt: "2026-05-15T12:01:00Z", commentId: "C1" },
    ]);
    const r = await proveQuietWindow({
      heartbeatRunId: "HB-1",
      runTime,
      targetTodoId: "T1",
      room,
    });
    assert.equal(r.receipt_type, __testing__.RECEIPT_TYPE_HOLD);
    assert.equal(r.hold_reason, "outside_quiet_window");
  });

  test("HOLD when no autonomous crumb in window", async () => {
    const runTime = new Date(Date.UTC(2026, 4, 15, 2, 0, 0));
    const since = new Date(Date.UTC(2026, 4, 15, 0, 0, 0));
    const room = makeFakeRoom([
      { authorId: "human-chris", createdAt: "2026-05-15T01:00:00Z", commentId: "C1" },
    ]);
    const r = await proveQuietWindow({
      heartbeatRunId: "HB-1",
      runTime,
      targetTodoId: "T1",
      room,
      since,
    });
    assert.equal(r.receipt_type, __testing__.RECEIPT_TYPE_HOLD);
    assert.equal(r.hold_reason, "no_autonomous_crumb_in_window");
  });

  test("HOLD when room.listCrumbs throws", async () => {
    const runTime = new Date(Date.UTC(2026, 4, 15, 2, 0, 0));
    const room = {
      async listCrumbs() {
        throw new Error("upstream 500");
      },
    };
    const r = await proveQuietWindow({
      heartbeatRunId: "HB-1",
      runTime,
      targetTodoId: "T1",
      room,
    });
    assert.equal(r.receipt_type, __testing__.RECEIPT_TYPE_HOLD);
    assert.equal(r.hold_reason, "room_listCrumbs_failed");
    assert.match(r.evidence.error_message, /upstream 500/);
  });

  test("PASS when AI crumb landed in quiet window", async () => {
    const runTime = new Date(Date.UTC(2026, 4, 15, 2, 0, 0));
    const since = new Date(Date.UTC(2026, 4, 15, 0, 0, 0));
    const room = makeFakeRoom([
      {
        authorId: "claude-cowork-coordinator-seat",
        createdAt: "2026-05-15T01:30:00Z",
        commentId: "C1",
        step: 1,
      },
    ]);
    const r = await proveQuietWindow({
      heartbeatRunId: "HB-1",
      runTime,
      targetTodoId: "T1",
      room,
      since,
    });
    assert.equal(r.receipt_type, __testing__.RECEIPT_TYPE_PASS);
    assert.equal(r.evidence.crumb_comment_id, "C1");
    assert.equal(r.evidence.crumb_todo_id, "T1");
    assert.equal(r.evidence.crumb_step, 1);
  });

  test("argument validation", async () => {
    await assert.rejects(
      () => proveQuietWindow({ runTime: new Date(), targetTodoId: "t", room: makeFakeRoom([]) }),
      TypeError,
    );
    await assert.rejects(
      () => proveQuietWindow({ heartbeatRunId: "h", targetTodoId: "t", room: makeFakeRoom([]) }),
      TypeError,
    );
    await assert.rejects(
      () => proveQuietWindow({ heartbeatRunId: "h", runTime: new Date(), room: makeFakeRoom([]) }),
      TypeError,
    );
    await assert.rejects(
      () => proveQuietWindow({ heartbeatRunId: "h", runTime: new Date(), targetTodoId: "t", room: {} }),
      TypeError,
    );
  });
});
