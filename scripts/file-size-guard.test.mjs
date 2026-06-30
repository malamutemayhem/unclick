// Tests for scripts/file-size-guard.mjs.
//
// The guard is a ratchet: large files may shrink or hold but never grow, and
// new oversized files must be recorded deliberately. These tests pin that
// behaviour (the diff logic) and assert the committed baseline is in sync with
// the working tree, so a file that quietly grew fails CI here.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectOversized, diffAgainstBaseline, THRESHOLD } from "./file-size-guard.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASELINE = path.join(__dirname, "file-size-baseline.json");

test("diff flags a file that grew past its baseline", () => {
  const baseline = { threshold: THRESHOLD, files: { "a.ts": 1200 } };
  const { grew, appeared, shrank } = diffAgainstBaseline({ "a.ts": 1300 }, baseline);
  assert.equal(grew.length, 1);
  assert.deepEqual(grew[0], { file: "a.ts", lines: 1300, was: 1200 });
  assert.equal(appeared.length, 0);
  assert.equal(shrank.length, 0);
});

test("diff flags a brand-new oversized file as appeared", () => {
  const baseline = { threshold: THRESHOLD, files: { "a.ts": 1200 } };
  const { grew, appeared } = diffAgainstBaseline({ "a.ts": 1200, "b.ts": 1500 }, baseline);
  assert.equal(grew.length, 0);
  assert.equal(appeared.length, 1);
  assert.deepEqual(appeared[0], { file: "b.ts", lines: 1500 });
});

test("diff reports a shrink as a bankable win, not a failure", () => {
  const baseline = { threshold: THRESHOLD, files: { "a.ts": 1200 } };
  const { grew, appeared, shrank } = diffAgainstBaseline({ "a.ts": 900 }, baseline);
  assert.equal(grew.length, 0);
  assert.equal(appeared.length, 0);
  assert.equal(shrank.length, 1);
  assert.deepEqual(shrank[0], { file: "a.ts", lines: 900, was: 1200 });
});

test("a file holding exactly at its baseline is clean", () => {
  const baseline = { threshold: THRESHOLD, files: { "a.ts": 1200 } };
  const { grew, appeared, shrank } = diffAgainstBaseline({ "a.ts": 1200 }, baseline);
  assert.equal(grew.length + appeared.length + shrank.length, 0);
});

test("committed baseline matches the working tree (no file silently grew)", () => {
  assert.ok(fs.existsSync(BASELINE), "baseline file must exist; run --update");
  const baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
  const current = collectOversized();
  const { grew, appeared } = diffAgainstBaseline(current, baseline);

  assert.deepEqual(
    grew,
    [],
    [
      "Large files grew past their recorded baseline. Split them, or if the",
      "growth is justified run: node scripts/file-size-guard.mjs --update",
      ...grew.map((g) => `  ${g.file}: ${g.was} -> ${g.lines}`),
    ].join("\n"),
  );
  assert.deepEqual(
    appeared,
    [],
    [
      `New files crossed the ${THRESHOLD}-line threshold without being recorded.`,
      "Split them, or run: node scripts/file-size-guard.mjs --update",
      ...appeared.map((a) => `  ${a.file}: ${a.lines}`),
    ].join("\n"),
  );
});
