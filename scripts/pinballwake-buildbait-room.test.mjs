import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  createBuildbaitRoom,
  isExecutorLaneStep,
  isOpenLaneStep,
  normalizeBuildbaitCrumb,
  parseStepFromBody,
  parserTagFor,
  stepLabel,
} from "./pinballwake-buildbait-room.mjs";

function createClient(seed = []) {
  const comments = [...seed];
  let nextId = 1;
  return {
    comments,
    async comment_on({ target_id, text, body, agent_id }) {
      const record = {
        id: `comment-${nextId++}`,
        target_id,
        text: text ?? body,
        author_agent_id: agent_id,
        created_at: "2026-05-15T02:00:00.000Z",
      };
      comments.push(record);
      return { comment: { id: record.id } };
    },
    async list_comments({ target_id }) {
      return { comments: comments.filter((comment) => (comment.target_id ?? comment.todoId) === target_id) };
    },
  };
}

const silentLogger = { info() {} };

describe("BuildBait room helpers", () => {
  test("labels and lane helpers match the 12-step ladder", () => {
    assert.equal(stepLabel(1), "Observe");
    assert.equal(stepLabel(8), "Pseudo-code");
    assert.equal(stepLabel(12), "Real change");
    assert.equal(stepLabel(13), null);
    assert.equal(isOpenLaneStep(8), true);
    assert.equal(isOpenLaneStep(9), false);
    assert.equal(isExecutorLaneStep(9), true);
    assert.equal(isExecutorLaneStep(8), false);
  });

  test("parser tags round-trip from comment bodies", () => {
    assert.equal(parserTagFor(7), "BUILDBAIT/STEP=7");
    assert.equal(parseStepFromBody("[BUILDBAIT/STEP=11] Step 11 Small helper"), 11);
    assert.equal(parseStepFromBody("no crumb"), null);
    assert.equal(parseStepFromBody("BUILDBAIT/STEP=99"), null);
    assert.throws(() => parserTagFor(0), RangeError);
  });

  test("normalizes UnClick comment shapes into crumbs", () => {
    const crumb = normalizeBuildbaitCrumb({
      id: "abc",
      target_id: "todo-1",
      text: "[BUILDBAIT/STEP=3] Step 3 Classify: route this",
      author_agent_id: "pinballwake-job-runner",
      created_at: "2026-05-15T02:00:00.000Z",
    });
    assert.equal(crumb.commentId, "abc");
    assert.equal(crumb.todoId, "todo-1");
    assert.equal(crumb.step, 3);
    assert.equal(crumb.authorId, "pinballwake-job-runner");
    assert.equal(normalizeBuildbaitCrumb({ text: "ordinary proof comment" }), null);
  });

  test("postCrumb writes a parser-readable todo comment", async () => {
    const client = createClient();
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    const result = await room.postCrumb({
      todoId: "11957893",
      step: 1,
      body: "observed ready ScopePack",
      seatId: "chatgpt-codex-desktop",
    });
    assert.equal(result.commentId, "comment-1");
    assert.match(client.comments[0].text, /^\[BUILDBAIT\/STEP=1\] Step 1 Observe:/);
    assert.equal(client.comments[0].author_agent_id, "chatgpt-codex-desktop");
  });

  test("stageState is idempotent and advances to the first missing step", async () => {
    const client = createClient([
      { id: "a", target_id: "11957893", text: "[BUILDBAIT/STEP=1] Step 1 Observe: x" },
      { id: "b", target_id: "11957893", text: "[BUILDBAIT/STEP=4] Step 4 Summarize: x" },
      { id: "noise", target_id: "11957893", text: "not a crumb" },
    ]);
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    const first = await room.stageState({ todoId: "11957893" });
    const second = await room.stageState({ todoId: "11957893" });
    assert.deepEqual(second, first);
    assert.equal(first.latestStep, 4);
    assert.equal(first.nextStep, 5);
    assert.equal(first.complete, false);
  });

  test("nextStep returns null once step 12 exists", async () => {
    const client = createClient([
      { id: "z", target_id: "11957893", text: "[BUILDBAIT/STEP=12] Step 12 Real change: merged" },
    ]);
    const room = createBuildbaitRoom({ unclickClient: client, logger: silentLogger });
    assert.equal(await room.latestStep({ todoId: "11957893" }), 12);
    assert.equal(await room.nextStep({ todoId: "11957893" }), null);
    assert.equal((await room.stageState({ todoId: "11957893" })).complete, true);
  });

  test("rejects missing client methods and invalid writes", async () => {
    assert.throws(() => createBuildbaitRoom(), TypeError);
    assert.throws(() => createBuildbaitRoom({ unclickClient: { comment_on() {} } }), TypeError);
    const room = createBuildbaitRoom({ unclickClient: createClient(), logger: silentLogger });
    await assert.rejects(() => room.postCrumb({ todoId: "x", step: 0, body: "bad" }), RangeError);
    await assert.rejects(() => room.postCrumb({ step: 1, body: "missing todo" }), TypeError);
  });
});
