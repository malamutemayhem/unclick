import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

describe("memory hardening eval harness", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-eval-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("runs the six lane-10 diagnostics and emits Part 6 metrics", async () => {
    const { LocalBackend } = await import("../local.js");
    const { runMemoryHardeningEval } = await import("../eval-harness.js");
    const backend = new LocalBackend();

    const scorecard = await runMemoryHardeningEval(backend);

    assert.equal(scorecard.suite_id, "memory-hardening-eval-v1");
    assert.equal(scorecard.scenarios.length, 6);
    assert.equal(scorecard.diagnostics.total, 6);
    assert.equal(scorecard.diagnostics.passed + scorecard.diagnostics.failed, 6);
    assert.equal(typeof scorecard.generated_at, "string");

    for (const metric of [
      "recall@5",
      "latest_value_accuracy",
      "scope_leakage",
      "forget_compliance",
      "duplicate_rate",
      "write_precision",
      "passport_roundtrip_fidelity",
      "passport_credential_leakage",
    ]) {
      assert.ok(metric in scorecard.metrics, `${metric} missing`);
    }

    const duplicateStorm = scorecard.scenarios.find((scenario) => scenario.kind === "duplicate_storm");
    assert.ok(duplicateStorm, "duplicate storm diagnostic missing");
    assert.equal(typeof scorecard.metrics.duplicate_rate, "number");
  });
});
