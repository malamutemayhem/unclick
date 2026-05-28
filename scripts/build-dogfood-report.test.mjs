import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";

import { CROSS_PASS_MATRIX, PASS_PACKAGES } from "./build-xpass-package-sweep.mjs";

const execFileAsync = promisify(execFile);
const packageReadySweepIds = [
  "sloppass",
  "copypass",
  "legalpass",
  "commonsensepass",
  "flowpass",
  "geopass",
];

function passingSweepPackageRows() {
  return PASS_PACKAGES.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    status: "passing",
    command: ["npm", "run", "test", `--workspace=${pkg.workspace}`],
  }));
}

function passingSweepMatrixRows() {
  const packageNameById = new Map(PASS_PACKAGES.map((pkg) => [pkg.id, pkg.name]));
  return CROSS_PASS_MATRIX.map((entry) => ({
    target_id: entry.targetId,
    status: "passing",
    reviewers: entry.reviewers.map((reviewer) => ({
      id: reviewer.id,
      name: packageNameById.get(reviewer.id) || reviewer.id,
      status: "passing",
    })),
  }));
}

test("dogfood receipt marks SecurityPass as blocked until safe package proof exists", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");

  try {
    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--dry-run",
      "--output",
      output,
    ]);

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const testpass = report.results.find((result) => result.id === "testpass");
    const uxpass = report.results.find((result) => result.id === "uxpass");
    const securitypass = report.results.find((result) => result.id === "securitypass");
    const copypass = report.results.find((result) => result.id === "copypass");
    const legalpass = report.results.find((result) => result.id === "legalpass");
    const enterprisepass = report.results.find((result) => result.id === "enterprisepass");

    assert.equal(testpass?.status, "pending");
    assert.equal(testpass?.reasonCode, "dry_run_only");
    assert.equal(uxpass?.status, "pending");
    assert.equal(uxpass?.reasonCode, "dry_run_only");
    assert.equal(securitypass?.status, "blocked");
    assert.match(securitypass?.blockedReason ?? "", /scope-gated/i);
    assert.equal(securitypass?.reasonCode, "scope_gate");
    assert.match(securitypass?.nextProof ?? "", /safe recurring SecurityPass package sweep receipt/i);
    assert.equal(copypass?.status, "pending");
    assert.equal(copypass?.reasonCode, "package_ready_needs_scheduled_receipt");
    assert.equal(copypass?.proof?.kind, "package_ready");
    assert.equal(legalpass?.status, "pending");
    assert.equal(legalpass?.reasonCode, "package_ready_needs_scheduled_receipt");
    assert.equal(legalpass?.proof?.kind, "package_ready");
    assert.equal(enterprisepass?.status, "pending");
    assert.equal(enterprisepass?.reasonCode, "planned_runner");
    assert.match(enterprisepass?.nextProof ?? "", /automated evidence checks/i);
    assert.deepEqual(enterprisepass?.proof, {
      kind: "planned",
      targetUrl: "/enterprise/latest.json",
    });
    assert.equal(report.status, "blocked");
    assert.match(report.statusLegend.blocked, /action is needed/i);
    assert.match(report.statusLegend.pending, /scheduled proof is not available yet/i);
    assert.match(report.proofPolicy, /live check or scheduled package sweep actually ran/i);
    assert.match(report.lastActionableFailure.detail, /Blocked reason:/);
    assert.equal(report.xpassIndex.find((entry) => entry.id === "testpass")?.stage, "live_gate");
    assert.match(
      report.xpassIndex.find((entry) => entry.id === "testpass")?.mentionProfile ?? "",
      /protects merges/i,
    );
    assert.equal(report.xpassIndex.find((entry) => entry.id === "copypass")?.stage, "package_ready");
    assert.equal(report.xpassIndex.find((entry) => entry.id === "legalpass")?.stage, "package_ready");
    assert.equal(report.xpassIndex.find((entry) => entry.id === "enterprisepass")?.stage, "guidance");
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("dogfood receipt includes structured proof for live TestPass and UXPass runs", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");
  const requests = [];
  const server = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const bodyText = Buffer.concat(chunks).toString("utf8");
    const body = bodyText ? JSON.parse(bodyText) : {};
    requests.push({ url: req.url, body });

    res.setHeader("Content-Type", "application/json");
    if (req.url === "/api/testpass-run") {
      res.end(JSON.stringify({
        run_id: "testpass-run-123",
        status: "complete",
        verdict_summary: { total: 12, fail: 0 },
      }));
      return;
    }
    if (req.url === "/api/uxpass-run") {
      res.end(JSON.stringify({
        run_id: "uxpass-run-456",
        status: "complete",
        ux_score: 91,
      }));
      return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "not found" }));
  });

  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address === "object");

    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--output",
      output,
    ], {
      env: {
        ...process.env,
        DOGFOOD_API_BASE: `http://127.0.0.1:${address.port}`,
        DOGFOOD_PUBLIC_URL: "https://unclick.world",
        DOGFOOD_MCP_URL: "https://unclick.world/api/mcp",
        DOGFOOD_TESTPASS_TOKEN: "test-token",
        DOGFOOD_UXPASS_TOKEN: "ux-token",
      },
    });

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const testpass = report.results.find((result) => result.id === "testpass");
    const uxpass = report.results.find((result) => result.id === "uxpass");
    const testpassRequest = requests.find((request) => request.url === "/api/testpass-run");
    const uxpassRequest = requests.find((request) => request.url === "/api/uxpass-run");

    assert.match(report.statusLegend.passing, /live check or scheduled package sweep ran/i);
    assert.match(report.proofPolicy, /Blocked and pending are honest product states/i);
    assert.deepEqual(report.xpassIndex.map((entry) => entry.id), [
      "testpass",
      "uxpass",
      "securitypass",
      "sloppass",
      "seopass",
      "copypass",
      "legalpass",
      "commonsensepass",
      "flowpass",
      "geopass",
      "rotatepass",
      "wakepass",
      "enterprisepass",
    ]);

    assert.equal(testpassRequest.body.source, "scheduled");
    assert.equal(testpass.runId, "testpass-run-123");
    assert.equal(testpass.targetUrl, "https://unclick.world/api/mcp");
    assert.deepEqual(testpass.proof, {
      kind: "testpass_run",
      runId: "testpass-run-123",
      targetUrl: "https://unclick.world/api/mcp",
    });

    assert.equal(uxpassRequest.body.source, "scheduled");
    assert.equal(uxpass.runId, "uxpass-run-456");
    assert.equal(uxpass.targetUrl, "https://unclick.world");
    assert.deepEqual(uxpass.proof, {
      kind: "uxpass_run",
      runId: "uxpass-run-456",
      targetUrl: "https://unclick.world",
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("dogfood receipt uses structured missing-credential proof for blocked UXPass", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");

  try {
    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--output",
      output,
    ], {
      env: {
        ...process.env,
        TESTPASS_TOKEN: "",
        DOGFOOD_TESTPASS_TOKEN: "",
        UXPASS_TOKEN: "",
        DOGFOOD_UXPASS_TOKEN: "",
        CRON_SECRET: "",
      },
    });

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const uxpass = report.results.find((result) => result.id === "uxpass");

    assert.equal(uxpass?.status, "blocked");
    assert.equal(uxpass?.reasonCode, "missing_credential");
    assert.match(uxpass?.nextProof ?? "", /rerun the dogfood report workflow/i);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("dogfood receipt promotes package-ready passes from a fresh XPass sweep receipt", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");
  const sweepPath = path.join(dir, "xpass-package-sweep.json");
  const packageRows = passingSweepPackageRows();

  try {
    await fs.writeFile(sweepPath, JSON.stringify({
      kind: "xpass_package_sweep_receipt_v1",
      run_id: "xpass-package-sweep-123",
      target_sha: "abc123",
      status: "passing",
      scope: "full",
      package_count: PASS_PACKAGES.length,
      expected_package_count: PASS_PACKAGES.length,
      selected_package_ids: PASS_PACKAGES.map((pkg) => pkg.id),
      expected_package_ids: PASS_PACKAGES.map((pkg) => pkg.id),
      unknown_package_ids: [],
      packages: packageRows,
      cross_pass_matrix: passingSweepMatrixRows(),
    }));

    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--output",
      output,
    ], {
      env: {
        ...process.env,
        TESTPASS_TOKEN: "",
        DOGFOOD_TESTPASS_TOKEN: "",
        UXPASS_TOKEN: "",
        DOGFOOD_UXPASS_TOKEN: "",
        CRON_SECRET: "",
        DOGFOOD_TARGET_SHA: "abc123",
        DOGFOOD_XPASS_PACKAGE_SWEEP_PATH: sweepPath,
      },
    });

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const sloppass = report.results.find((result) => result.id === "sloppass");
    const geopass = report.results.find((result) => result.id === "geopass");
    const seopass = report.results.find((result) => result.id === "seopass");
    const securitypass = report.results.find((result) => result.id === "securitypass");

    for (const pkg of packageRows.filter((row) => packageReadySweepIds.includes(row.id))) {
      const result = report.results.find((entry) => entry.id === pkg.id);
      assert.equal(result?.status, "passing", `${pkg.name} should promote from a fresh full XPass sweep`);
      assert.equal(result?.runId, "xpass-package-sweep-123");
      assert.equal(result?.proof?.kind, "xpass_package_sweep");
      assert.equal(result?.proof?.packageId, pkg.id);
    }
    assert.equal(sloppass?.status, "passing");
    assert.equal(sloppass?.runId, "xpass-package-sweep-123");
    assert.equal(sloppass?.proof?.kind, "xpass_package_sweep");
    assert.equal(sloppass?.proof?.targetSha, "abc123");
    assert.equal(sloppass?.proof?.packageId, "sloppass");
    assert.equal(geopass?.status, "passing");
    assert.equal(geopass?.proof?.kind, "xpass_package_sweep");
    assert.equal(seopass?.status, "passing");
    assert.equal(seopass?.proof?.kind, "seopass_run");
    assert.equal(securitypass?.status, "passing");
    assert.equal(securitypass?.reasonCode, "safe_package_proof_only");
    assert.equal(securitypass?.proof?.kind, "xpass_package_sweep");
    assert.equal(securitypass?.proof?.boundary, "safe_package_proof_only_no_live_security_probe");
    assert.match(securitypass?.summary ?? "", /safe package proof/i);
    assert.match(securitypass?.evidence ?? "", /live security probes remain scope-gated/i);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("dogfood receipt rejects a stale XPass sweep receipt", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");
  const sweepPath = path.join(dir, "xpass-package-sweep.json");

  try {
    await fs.writeFile(sweepPath, JSON.stringify({
      kind: "xpass_package_sweep_receipt_v1",
      run_id: "xpass-package-sweep-old",
      target_sha: "oldsha",
      status: "passing",
      packages: [
        { id: "sloppass", name: "SlopPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/sloppass"] },
      ],
      cross_pass_matrix: [],
    }));

    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--output",
      output,
    ], {
      env: {
        ...process.env,
        TESTPASS_TOKEN: "",
        DOGFOOD_TESTPASS_TOKEN: "",
        UXPASS_TOKEN: "",
        DOGFOOD_UXPASS_TOKEN: "",
        CRON_SECRET: "",
        DOGFOOD_TARGET_SHA: "newsha",
        DOGFOOD_XPASS_PACKAGE_SWEEP_PATH: sweepPath,
      },
    });

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const sloppass = report.results.find((result) => result.id === "sloppass");

    assert.equal(sloppass?.status, "pending");
    assert.equal(sloppass?.reasonCode, "package_ready_needs_scheduled_receipt");
    assert.equal(sloppass?.proof?.kind, "package_ready");
    assert.match(sloppass?.nextProof ?? "", /Regenerate/);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("dogfood receipt rejects partial XPass sweep receipts before promotion", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");
  const sweepPath = path.join(dir, "xpass-package-sweep.json");

  try {
    await fs.writeFile(sweepPath, JSON.stringify({
      kind: "xpass_package_sweep_receipt_v1",
      run_id: "xpass-package-sweep-partial",
      target_sha: "abc123",
      status: "passing",
      scope: "partial",
      package_count: 1,
      expected_package_count: PASS_PACKAGES.length,
      selected_package_ids: ["legalpass"],
      expected_package_ids: PASS_PACKAGES.map((pkg) => pkg.id),
      unknown_package_ids: [],
      packages: [
        { id: "legalpass", name: "LegalPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/legalpass"] },
      ],
      cross_pass_matrix: [
        {
          target_id: "legalpass",
          status: "passing",
          reviewers: [
            { id: "copypass", name: "CopyPass", status: "passing" },
            { id: "securitypass", name: "SecurityPass", status: "passing" },
          ],
        },
      ],
    }));

    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--output",
      output,
    ], {
      env: {
        ...process.env,
        TESTPASS_TOKEN: "",
        DOGFOOD_TESTPASS_TOKEN: "",
        UXPASS_TOKEN: "",
        DOGFOOD_UXPASS_TOKEN: "",
        CRON_SECRET: "",
        DOGFOOD_TARGET_SHA: "abc123",
        DOGFOOD_XPASS_PACKAGE_SWEEP_PATH: sweepPath,
      },
    });

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const legalpass = report.results.find((result) => result.id === "legalpass");

    assert.equal(legalpass?.status, "pending");
    assert.equal(legalpass?.reasonCode, "package_ready_needs_scheduled_receipt");
    assert.equal(legalpass?.proof?.kind, "package_ready");
    assert.match(legalpass?.nextProof ?? "", /full current XPass package sweep/i);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});
