import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";

import {
  PASS_PACKAGES,
  buildXPassPackageSweep,
  defaultRunCommand,
} from "./build-xpass-package-sweep.mjs";

const execFileAsync = promisify(execFile);

test("XPass package sweep records package and cross-pass proof", async () => {
  const calls = [];
  const receipt = await buildXPassPackageSweep({
    now: "2026-05-28T00:00:00.000Z",
    targetSha: "abc123",
    runCommand: async (command, args, { pkg }) => {
      calls.push({ command, args, id: pkg.id });
      return { status: "passing", exitCode: 0, durationMs: 12, failureHint: "" };
    },
  });

  const sloppass = receipt.packages.find((pkg) => pkg.id === "sloppass");
  const sloppassMatrix = receipt.cross_pass_matrix.find((row) => row.target_id === "sloppass");

  assert.equal(receipt.kind, "xpass_package_sweep_receipt_v1");
  assert.equal(receipt.status, "passing");
  assert.equal(receipt.target_sha, "abc123");
  assert.equal(receipt.package_count, PASS_PACKAGES.length);
  assert.equal(calls.length, PASS_PACKAGES.length);
  assert.equal(sloppass?.status, "passing");
  assert.deepEqual(sloppass?.command, ["npm", "run", "test", "--workspace=@unclick/sloppass"]);
  assert.equal(sloppass?.proof?.kind, "workspace_package_test");
  assert.equal(sloppassMatrix?.status, "passing");
  assert.deepEqual(sloppassMatrix?.reviewers.map((reviewer) => reviewer.id), [
    "testpass",
    "commonsensepass",
    "copypass",
  ]);
  assert.deepEqual(receipt.action_needed, []);
});

test("XPass package sweep fails honestly when a package reviewer fails", async () => {
  const receipt = await buildXPassPackageSweep({
    now: "2026-05-28T00:00:00.000Z",
    targetSha: "abc123",
    runCommand: async (_command, _args, { pkg }) => ({
      status: pkg.id === "copypass" ? "failing" : "passing",
      exitCode: pkg.id === "copypass" ? 1 : 0,
      durationMs: 8,
      failureHint: pkg.id === "copypass" ? "CopyPass package test failed." : "",
    }),
  });

  const copypass = receipt.packages.find((pkg) => pkg.id === "copypass");
  const sloppassMatrix = receipt.cross_pass_matrix.find((row) => row.target_id === "sloppass");

  assert.equal(receipt.status, "failing");
  assert.equal(copypass?.status, "failing");
  assert.equal(copypass?.failure_hint, "CopyPass package test failed.");
  assert.equal(sloppassMatrix?.status, "failing");
  assert.ok(receipt.action_needed.some((item) => /CopyPass/.test(item)));
});

test("XPass package sweep CLI writes a public-safe receipt", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "xpass-package-sweep-"));
  const output = path.join(dir, "xpass-package-sweep.json");

  try {
    await execFileAsync(process.execPath, [
      "scripts/build-xpass-package-sweep.mjs",
      "--skip-commands",
      "--target-sha",
      "abc123",
      "--output",
      output,
    ]);

    const receipt = JSON.parse(await fs.readFile(output, "utf8"));
    assert.equal(receipt.status, "passing");
    assert.equal(receipt.target_sha, "abc123");
    assert.equal(receipt.packages.find((pkg) => pkg.id === "geopass")?.status, "passing");
    assert.equal(receipt.cross_pass_matrix.find((row) => row.target_id === "geopass")?.status, "passing");
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("XPass package sweep failure hints do not expose raw command output", async () => {
  const result = await defaultRunCommand(process.execPath, [
    "-e",
    "console.error('SECRET_TOKEN=uc_should_not_escape'); process.exit(7)",
  ], {
    cwd: process.cwd(),
    timeoutMs: 5000,
  });

  assert.equal(result.status, "failing");
  assert.equal(result.exitCode, 7);
  assert.match(result.failureHint, /code 7/);
  assert.doesNotMatch(result.failureHint, /SECRET_TOKEN/i);
  assert.doesNotMatch(result.failureHint, /uc_should_not_escape/i);
});
