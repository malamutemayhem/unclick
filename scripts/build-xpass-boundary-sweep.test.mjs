import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";

import {
  buildXPassBoundarySweep,
} from "./build-xpass-boundary-sweep.mjs";

const execFileAsync = promisify(execFile);

async function writePackageSweep(dir, targetSha = "abc123", overrides = {}) {
  const packageSweepPath = path.join(dir, "xpass-package-sweep.json");
  const packages = [
    { id: "testpass", name: "TestPass", status: "passing" },
    { id: "securitypass", name: "SecurityPass", status: "passing" },
    { id: "copypass", name: "CopyPass", status: "passing" },
    { id: "legalpass", name: "LegalPass", status: "passing" },
    { id: "commonsensepass", name: "CommonSensePass", status: "passing" },
    { id: "flowpass", name: "FlowPass", status: "passing" },
  ];
  await fs.writeFile(packageSweepPath, JSON.stringify({
    kind: "xpass_package_sweep_receipt_v1",
    run_id: "xpass-package-sweep-test",
    target_sha: targetSha,
    status: "passing",
    packages,
    cross_pass_matrix: [],
    ...overrides,
  }));
  return packageSweepPath;
}

test("XPass boundary sweep records public-safe boundary and cross-pass proof", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "xpass-boundary-sweep-"));
  try {
    const packageSweepPath = await writePackageSweep(dir);
    const receipt = await buildXPassBoundarySweep({
      packageSweepPath,
      targetSha: "abc123",
      now: "2026-05-28T00:00:00.000Z",
      skipCommands: true,
    });

    assert.equal(receipt.kind, "xpass_boundary_sweep_receipt_v1");
    assert.equal(receipt.status, "passing");
    assert.equal(receipt.product_count, 2);
    assert.deepEqual(receipt.action_needed, []);

    const rotatepass = receipt.products.find((product) => product.id === "rotatepass");
    const wakepass = receipt.products.find((product) => product.id === "wakepass");
    const enterprisepass = receipt.products.find((product) => product.id === "enterprisepass");

    assert.equal(rotatepass?.status, "passing");
    assert.equal(rotatepass?.proof.kind, "public_safe_boundary_test");
    assert.match(rotatepass?.summary ?? "", /public-safe boundary tests passed/i);
    assert.equal(rotatepass?.rotatepass_receipt_v1?.kind, "rotatepass_boundary_receipt_v1");
    assert.equal(rotatepass?.rotatepass_receipt_v1?.status, "PASS");
    assert.equal(rotatepass?.rotatepass_receipt_v1?.lifecycle_evidence.credential_values_seen, false);
    assert.equal(rotatepass?.rotatepass_receipt_v1?.lifecycle_evidence.live_secret_probe, "not_run");
    assert.equal(rotatepass?.rotatepass_receipt_v1?.lifecycle_evidence.blast_radius_mapping, "used_by_tags_and_verification_targets");
    assert.deepEqual(
      rotatepass?.rotatepass_receipt_v1?.checks.map((check) => check.id),
      [
        "rotatepass-redaction-guard",
        "metadata-intake-contract",
        "local-session-boundary",
        "blast-radius-fixture",
      ],
    );
    assert.match(
      rotatepass?.rotatepass_receipt_v1?.boundaries.join("\n") ?? "",
      /never reads, prints, exports, or syncs raw credential values/i,
    );
    assert.equal(wakepass?.status, "passing");
    assert.equal(wakepass?.wakepass_receipt_v1?.kind, "wakepass_boundary_receipt_v1");
    assert.equal(wakepass?.wakepass_receipt_v1?.status, "PASS");
    assert.equal(wakepass?.wakepass_receipt_v1?.lifecycle_evidence.live_queue_touched, false);
    assert.equal(wakepass?.wakepass_receipt_v1?.lifecycle_evidence.live_worker_woken, false);
    assert.equal(wakepass?.wakepass_receipt_v1?.lifecycle_evidence.route_delivery_attempted, false);
    assert.deepEqual(
      wakepass?.wakepass_receipt_v1?.checks.map((check) => check.id),
      [
        "event-wake-router",
        "pinballwake-ack-ledger",
        "pinballwake-stale-reclaim",
        "worker-liveness-watchdog",
      ],
    );
    assert.match(
      wakepass?.wakepass_receipt_v1?.boundaries.join("\n") ?? "",
      /does not touch live queues, wake live workers, send notifications, or call route adapters/i,
    );
    assert.equal(enterprisepass, undefined);

    const rotatepassMatrix = receipt.cross_pass_matrix.find((row) => row.target_id === "rotatepass");
    assert.equal(rotatepassMatrix?.status, "passing");
    assert.deepEqual(rotatepassMatrix?.reviewers.map((reviewer) => reviewer.name), [
      "SecurityPass",
      "LegalPass",
      "CommonSensePass",
    ]);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("XPass boundary sweep stays pending without fresh package reviewer proof", async () => {
  const receipt = await buildXPassBoundarySweep({
    packageSweepPath: path.join(os.tmpdir(), "missing-xpass-package-sweep.json"),
    targetSha: "abc123",
    now: "2026-05-28T00:00:00.000Z",
    skipCommands: true,
  });

  assert.equal(receipt.status, "pending");
  assert.match(receipt.action_needed.join("\n"), /package reviewer proof is missing/i);
  assert.equal(
    receipt.products.find((product) => product.id === "rotatepass")?.rotatepass_receipt_v1?.status,
    "PENDING",
  );
  assert.equal(
    receipt.products.find((product) => product.id === "wakepass")?.wakepass_receipt_v1?.status,
    "PENDING",
  );
  assert.equal(
    receipt.cross_pass_matrix.find((row) => row.target_id === "wakepass")?.status,
    "pending",
  );
});

test("XPass boundary sweep fails honestly without leaking raw command output", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "xpass-boundary-sweep-"));
  try {
    const packageSweepPath = await writePackageSweep(dir);
    const receipt = await buildXPassBoundarySweep({
      packageSweepPath,
      targetSha: "abc123",
      now: "2026-05-28T00:00:00.000Z",
      runCommand: async (_command, _args, { product }) => ({
        status: product.id === "wakepass" ? "failing" : "passing",
        exitCode: product.id === "wakepass" ? 17 : 0,
        durationMs: 1,
        failureHint: product.id === "wakepass" ? "Process exited with code 17." : "",
      }),
    });

    assert.equal(receipt.status, "failing");
    const wakepass = receipt.products.find((product) => product.id === "wakepass");
    assert.equal(wakepass?.status, "failing");
    assert.equal(wakepass?.wakepass_receipt_v1?.status, "BLOCKER");
    assert.equal(wakepass?.failure_hint, "Process exited with code 17.");
    assert.doesNotMatch(JSON.stringify(receipt), /super-secret|raw-token|stack trace/i);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("XPass boundary sweep CLI writes a public-safe receipt", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "xpass-boundary-sweep-"));
  const output = path.join(dir, "xpass-boundary-sweep.json");
  try {
    const packageSweepPath = await writePackageSweep(dir);
    await execFileAsync(process.execPath, [
      "scripts/build-xpass-boundary-sweep.mjs",
      "--skip-commands",
      "--target-sha",
      "abc123",
      "--package-sweep",
      packageSweepPath,
      "--output",
      output,
    ]);

    const receipt = JSON.parse(await fs.readFile(output, "utf8"));
    assert.equal(receipt.status, "passing");
    assert.equal(receipt.products.length, 2);
    assert.equal(receipt.cross_pass_matrix.length, 2);
    assert.equal(receipt.action_needed.length, 0);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});
