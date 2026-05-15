// scripts/pinballwake-buildbait-room.test.mjs
//
// Tests for the BuildBait room contract.
// Uses a fake unclickClient shim so the tests don't hit the real UnClick API.

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  createBuildbaitRoom,
  stepLabel,
  isOpenLaneStep,
  isExecutorLaneStep,
  parserTagFor,
  parseStepFromBody,
} from "./pinballwake-buildbait-room.mjs";

function makeFakeClient(seed = []) {
  const comments = [...seed];
  let nextId = 1000;
  return {
    _comments: comments,
    async commentOn({ todoId, body, agentId }) {
      const id = `fake-${nextId++}`;
      const record = {
        id,
        todoId,
        body,
        agentId,
        createdAt: new Date().toISOString(),
      };
      comments.push(record);
      return { commentId: id };
    },
    async listComments({ todoId }) {
      return comments.filter((c) => c.todoId === todoId);
    },
  };
}

const silentLogger = { info() {}, warn() {}, error() {} };

describe("pinballwake-buildbait-room contract", () => {
  test("stepLabel returns label for known steps and null for unknown", () => {
    assert.equal(stepLabel(1), "Observe");
    assert.equal(stepLabel(7), "ScopePack");
    assert.equal(stepLabel(12), "Real change");
    assert.equal(stepLabel(0), null);
    assert.equal(stepLabel(13), null);
    assert.equal(stepLabel("x"), null);
  });

  test("isOpenLaneStep is true for 1..8, false otherwise", () => {
    for (let n = 1; n <= 8; n += 1) assert.equal(isOpenLaneStep(n), true, `step ${n}`);
    for (let n = 9; n <= 12; n += 1) assert.equal(isOpenLaneStep(n), false, `step ${n}`);
    assert.equal(isOpenLaneStep(0), false);
    assert.equal(isOpenLaneStep(13), false);
  });

  test("isExecutorLaneStep is true for 9..12, false otherwise", () => {
    for (let n = 9; n <= 12; n += 1) assert.equal(isExecutorLaneStep(n), true);
    for (let n = 1; n <= 8; n += 1) assert.equal(isExecutorLaneStep(n), false);
    assert.equal(isExecutorLaneStep(13), false);
  });

  test("parserTagFor returns canonical tag for valid steps", () => {
    assert.equal(parserTagFor(1), "BUILDBAIT/STEP=1");
    assert.equal(parserTagFor(12), "BUILDBAIT/STEP=12");
    assert.throws(() => parserTagFor(0), RangeError);
    assert.throws(() => parserTagFor(13), RangeError);
    assert.throws(() => parserTagFor("x"), RangeError);
  });

  test("parseStepFromBody extracts the step from a tagged body", () => {
    assert.equal(parseStepFromBody("[BUILDBAIT/STEP=3] Step 3 Classify: ..."), 3);
    assert.equal(parseStepFromBody("preamble BUILDBAIT/STEP=11 anywhere"), 11);
    assert.equal(parseStepFromBody("no tag here"), null);
    assert.equal(parseStepFromBody(""), null);
    assert.equal(parseStepFromBody("BUILDBAIT/STEP=99 invalid step number"), null);
    assert.equal(parseStepFromBody(null), null);
  });

  test("createBuildbaitRoom rejects clients without required methods", () => {
    assert.throws(() => createBuildbaitRoom(), TypeError);
    assert.throws(() => createBuildbaitRoom({ unclickClient: {} }), TypeError);
    assert.throws(
      () => createBuildbaitRoom({ unclickClient: { commentOn() {} } }),
      TypeError,
    );
  });

  test("postCrumb composes a tagged body and returns the commentId", async () => {
    const client = makeFakeClient();
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    const result = await room.postCrumb({
      todoId: "11957893",
      step: 1,
      body: "Pure reading — listing actionable todos, no commitment yet.",
      seatId: "test-seat",
    });
    assert.equal(typeof result.commentId, "string");
    assert.equal(result.step, 1);
    assert.equal(result.label, "Observe");
    assert.equal(result.parserTag, "BUILDBAIT/STEP=1");
    const stored = client._comments[0];
    assert.equal(stored.todoId, "11957893");
    assert.equal(stored.agentId, "test-seat");
    assert.match(stored.body, /\[BUILDBAIT\/STEP=1\] Step 1 Observe/);
  });

  test("postCrumb rejects invalid step or missing todoId", async () => {
    const room = createBuildbaitRoom({ unclickClient: makeFakeClient(), logger: silentLogger });
    await assert.rejects(() => room.postCrumb({ step: 1, body: "x" }), TypeError);
    await assert.rejects(
      () => room.postCrumb({ todoId: "t", step: 0, body: "x" }),
      RangeError,
    );
    await assert.rejects(
      () => room.postCrumb({ todoId: "t", step: 13, body: "x" }),
      RangeError,
    );
  });

  test("listCrumbs returns only crumb-shaped comments in original order", async () => {
    const seed = [
      { id: "a", todoId: "11957893", body: "[BUILDBAIT/STEP=1] Step 1 Observe: ...", createdAt: "t1" },
      { id: "b", todoId: "11957893", body: "freshness comment, not a crumb", createdAt: "t2" },
      { id: "c", todoId: "11957893", body: "[BUILDBAIT/STEP=3] Step 3 Classify: ...", createdAt: "t3" },
      { id: "d", todoId: "OTHER", body: "[BUILDBAIT/STEP=1] Step 1 Observe", createdAt: "t4" },
    ];
    const client = makeFakeClient(seed);
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    const crumbs = await room.listCrumbs({ todoId: "11957893" });
    assert.equal(crumbs.length, 2);
    assert.equal(crumbs[0].step, 1);
    assert.equal(crumbs[0].commentId, "a");
    assert.equal(crumbs[1].step, 3);
    assert.equal(crumbs[1].commentId, "c");
  });

  test("latestStep returns the highest step landed on the todo", async () => {
    const seed = [
      { id: "a", todoId: "T1", body: "[BUILDBAIT/STEP=1] x" },
      { id: "b", todoId: "T1", body: "[BUILDBAIT/STEP=4] x" },
      { id: "c", todoId: "T1", body: "[BUILDBAIT/STEP=2] x" },
    ];
    const client = makeFakeClient(seed);
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    assert.equal(await room.latestStep({ todoId: "T1" }), 4);
    assert.equal(await room.latestStep({ todoId: "EMPTY" }), null);
  });

  test("nextStep walks the ladder forward, returns null after step 12", async () => {
    const client = makeFakeClient();
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    assert.equal(await room.nextStep({ todoId: "T1" }), 1);

    await room.postCrumb({ todoId: "T1", step: 1, body: "x" });
    assert.equal(await room.nextStep({ todoId: "T1" }), 2);

    await room.postCrumb({ todoId: "T1", step: 2, body: "x" });
    await room.postCrumb({ todoId: "T1", step: 12, body: "x" });
    assert.equal(await room.nextStep({ todoId: "T1" }), null);
  });

  test("listCrumbs ignores numeric strings that aren't valid step numbers", async () => {
    const seed = [
      { id: "a", todoId: "T1", body: "BUILDBAIT/STEP=99 not a step" },
      { id: "b", todoId: "T1", body: "BUILDBAIT/STEP=7 valid" },
    ];
    const client = makeFakeClient(seed);
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    const crumbs = await room.listCrumbs({ todoId: "T1" });
    assert.equal(crumbs.length, 1);
    assert.equal(crumbs[0].step, 7);
  });
});
