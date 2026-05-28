import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("dogfood receipt marks SecurityPass as blocked with a reason", async () => {
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
    const compliancepass = report.results.find((result) => result.id === "compliancepass");
    const copypass = report.results.find((result) => result.id === "copypass");
    const legalpass = report.results.find((result) => result.id === "legalpass");

    assert.equal(testpass?.status, "pending");
    assert.equal(testpass?.reasonCode, "dry_run_only");
    assert.equal(uxpass?.status, "pending");
    assert.equal(uxpass?.reasonCode, "dry_run_only");
    assert.equal(securitypass?.status, "blocked");
    assert.match(securitypass?.blockedReason ?? "", /scope-gated/i);
    assert.equal(securitypass?.reasonCode, "scope_gate");
    assert.match(securitypass?.nextProof ?? "", /safe recurring SecurityPass runner receipt/i);
    assert.equal(compliancepass?.status, "blocked");
    assert.equal(compliancepass?.reasonCode, "readiness_gap");
    assert.match(compliancepass?.blockedReason ?? "", /high\/critical gap/i);
    assert.equal(compliancepass?.proof?.kind, "compliancepass_report");
    assert.equal(compliancepass?.proof?.targetUrl, "/enterprise/latest.json");
    assert.ok(compliancepass?.proof?.checksTotal > 0);
    assert.ok(compliancepass?.proof?.highSeverityGaps >= 1);
    assert.equal(copypass?.status, "pending");
    assert.equal(copypass?.reasonCode, "package_ready_needs_scheduled_receipt");
    assert.equal(copypass?.proof?.kind, "package_ready");
    assert.equal(legalpass?.status, "pending");
    assert.equal(legalpass?.reasonCode, "package_ready_needs_scheduled_receipt");
    assert.equal(legalpass?.proof?.kind, "package_ready");
    assert.equal(report.status, "blocked");
    assert.match(report.statusLegend.blocked, /needs action/i);
    assert.match(report.statusLegend.pending, /scheduled proof is not available yet/i);
    assert.match(report.proofPolicy, /live check or scheduled package sweep actually ran/i);
    assert.match(report.lastActionableFailure.detail, /Blocked reason:/);
    assert.equal(report.xpassIndex.find((entry) => entry.id === "testpass")?.stage, "live_gate");
    assert.match(
      report.xpassIndex.find((entry) => entry.id === "testpass")?.mentionProfile ?? "",
      /protects merges/i,
    );
    assert.equal(report.xpassIndex.find((entry) => entry.id === "compliancepass")?.stage, "live_dogfood");
    assert.equal(report.xpassIndex.find((entry) => entry.id === "copypass")?.stage, "package_ready");
    assert.equal(report.xpassIndex.find((entry) => entry.id === "legalpass")?.stage, "package_ready");
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
      "compliancepass",
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

test("dogfood blocks stale CompliancePass receipts", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");
  const receiptPath = path.join(dir, "enterprise-latest.json");

  try {
    await fs.writeFile(receiptPath, JSON.stringify({
      schema_version: "1.0",
      generated_at: "2026-01-01T00:00:00.000Z",
      valid_until: "2026-01-08T00:00:00.000Z",
      product: "CompliancePass",
      status: "complete",
      readiness_band: "green",
      readiness_score: { value: 100, band: "green" },
      summary: {
        checks_total: 25,
        checks_pending: 0,
        blocking_gap_count: 0,
      },
      gaps: [],
    }));

    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--dry-run",
      "--output",
      output,
      "--compliancepass-receipt",
      receiptPath,
      "--max-compliancepass-age-hours",
      "1",
    ]);

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const compliancepass = report.results.find((result) => result.id === "compliancepass");

    assert.equal(compliancepass?.status, "blocked");
    assert.equal(compliancepass?.reasonCode, "stale_receipt");
    assert.match(compliancepass?.blockedReason ?? "", /older than 1 hour/i);
    assert.equal(compliancepass?.proof?.kind, "compliancepass_report");
    assert.equal(compliancepass?.proof?.generatedAt, "2026-01-01T00:00:00.000Z");
    assert.equal(compliancepass?.proof?.maxAgeHours, 1);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("dogfood keeps the CompliancePass freshness gate when max age config is invalid", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");
  const receiptPath = path.join(dir, "enterprise-latest.json");

  try {
    await fs.writeFile(receiptPath, JSON.stringify({
      schema_version: "1.0",
      generated_at: "2026-01-01T00:00:00.000Z",
      valid_until: "2026-01-08T00:00:00.000Z",
      product: "CompliancePass",
      status: "complete",
      readiness_band: "green",
      readiness_score: { value: 100, band: "green" },
      summary: {
        checks_total: 25,
        checks_pending: 0,
        blocking_gap_count: 0,
      },
      gaps: [],
    }));

    await execFileAsync(process.execPath, [
      "scripts/build-dogfood-report.mjs",
      "--dry-run",
      "--output",
      output,
      "--compliancepass-receipt",
      receiptPath,
      "--max-compliancepass-age-hours",
      "not-a-number",
    ]);

    const report = JSON.parse(await fs.readFile(output, "utf8"));
    const compliancepass = report.results.find((result) => result.id === "compliancepass");

    assert.equal(compliancepass?.status, "blocked");
    assert.equal(compliancepass?.reasonCode, "stale_receipt");
    assert.equal(compliancepass?.proof?.maxAgeHours, 168);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("dogfood receipt promotes package-ready passes from a fresh XPass sweep receipt", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dogfood-report-"));
  const output = path.join(dir, "latest.json");
  const sweepPath = path.join(dir, "xpass-package-sweep.json");
  const packageRows = [
    { id: "sloppass", name: "SlopPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/sloppass"] },
    { id: "seopass", name: "SEOPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/seopass"] },
    { id: "copypass", name: "CopyPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/copypass"] },
    { id: "legalpass", name: "LegalPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/legalpass"] },
    { id: "commonsensepass", name: "CommonSensePass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/commonsensepass"] },
    { id: "flowpass", name: "FlowPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/flowpass"] },
    { id: "geopass", name: "GEOPass", status: "passing", command: ["npm", "run", "test", "--workspace=@unclick/geopass"] },
  ];
  const reviewerNames = new Map([
    ["testpass", "TestPass"],
    ["commonsensepass", "CommonSensePass"],
    ["sloppass", "SlopPass"],
  ]);
  const reviewersFor = (targetId) => ["testpass", "commonsensepass", "sloppass"]
    .filter((id) => id !== targetId)
    .slice(0, 2)
    .map((id) => ({ id, name: reviewerNames.get(id), status: "passing" }));

  try {
    await fs.writeFile(sweepPath, JSON.stringify({
      kind: "xpass_package_sweep_receipt_v1",
      run_id: "xpass-package-sweep-123",
      target_sha: "abc123",
      status: "passing",
      packages: packageRows,
      cross_pass_matrix: packageRows.map((pkg) => ({
        target_id: pkg.id,
        status: "passing",
        reviewers: reviewersFor(pkg.id),
      })),
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

    for (const pkg of packageRows.filter((row) => row.id !== "seopass")) {
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
    assert.equal(securitypass?.status, "blocked");
    assert.equal(securitypass?.reasonCode, "scope_gate");
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
