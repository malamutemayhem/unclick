import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeAnswer, buildRow, upsertRow, readLog, QUESTIONS } from "./geo-probe.mjs";

test("gradeAnswer: correct when the product is described as MCP with substance", () => {
  const grade = gradeAnswer(
    "UnClick is an MCP server that gives AI agents 450+ callable endpoints across 60+ integrations plus persistent cross-session memory.",
  );
  assert.equal(grade, "correct");
});

test("gradeAnswer: absent when the product is never mentioned", () => {
  assert.equal(gradeAnswer("Some popular MCP servers are Foo and Bar."), "absent");
  assert.equal(gradeAnswer(""), "absent");
});

test("gradeAnswer: absent when the engine admits it does not know", () => {
  const grade = gradeAnswer("I could not find reliable information about UnClick or unclick.world.");
  assert.equal(grade, "absent");
});

test("gradeAnswer: wrong when it confidently describes a different product", () => {
  const grade = gradeAnswer("UnClick is a browser extension that blocks accidental double-click purchases.");
  assert.equal(grade, "wrong");
});

test("gradeAnswer: partial when the product is named but thin", () => {
  const grade = gradeAnswer("UnClick appears to be a software project at unclick.world.");
  assert.equal(grade, "partial");
});

test("upsertRow replaces the same (date, engine, question) and keeps others", () => {
  const a = buildRow({ date: "2026-06-11", engine: "perplexity", model: "sonar", questionId: "what-is-unclick", grade: "absent", excerpt: "x" });
  const aUpdated = buildRow({ date: "2026-06-11", engine: "perplexity", model: "sonar", questionId: "what-is-unclick", grade: "correct", excerpt: "y" });
  const b = buildRow({ date: "2026-06-11", engine: "openai", model: "gpt-4o-mini", questionId: "what-is-unclick", grade: "partial", excerpt: "z" });

  let rows = upsertRow([], a);
  rows = upsertRow(rows, b);
  rows = upsertRow(rows, aUpdated);

  assert.equal(rows.length, 2);
  const perplexityRow = rows.find((r) => r.engine === "perplexity");
  assert.equal(perplexityRow.grade, "correct");
});

test("readLog returns an empty shell with the question set when no file exists", () => {
  const log = readLog("/tmp/does-not-exist-geo-probe-log.json");
  assert.deepEqual(log.snapshots, []);
  assert.equal(log.questions.length, QUESTIONS.length);
});

test("question ids are unique and stable-looking", () => {
  const ids = QUESTIONS.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
});
