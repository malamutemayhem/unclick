import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { runCompliancePass } from "../runner.js";
import { renderCompliancePassHtml, renderCompliancePassMarkdown } from "../reporter.js";
import type { CompliancePassReport } from "../schema.js";

async function writeFixture(root: string, file: string, content: string): Promise<void> {
  const fullPath = path.join(root, file);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, content);
}

function getCheck(report: CompliancePassReport, id: string) {
  const found = report.categories.flatMap((category) => category.checks).find((check) => check.id === id);
  expect(found).toBeDefined();
  return found!;
}

describe("runCompliancePass", () => {
  it("produces a complete CompliancePass readiness report without certification claims", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "compliancepass-"));
    try {
      await writeFixture(root, "package.json", JSON.stringify({
        name: "fixture-product",
        repository: { type: "git", url: "https://example.test/repo.git" },
        scripts: { build: "tsc", test: "vitest", lint: "eslint ." },
      }));
      await writeFixture(root, "tsconfig.json", JSON.stringify({ compilerOptions: { strict: true } }));
      await writeFixture(root, "README.md", "# Fixture\n\nInstall, run, test, and license notes.\n");
      await writeFixture(root, "LICENSE", "MIT\n");
      await writeFixture(root, "SECURITY.md", "Report issues by email.\n");
      await writeFixture(root, ".github/workflows/ci.yml", "on: [pull_request]\njobs:\n  test:\n    steps:\n      - run: npm test\n      - run: gitleaks detect\n");
      await writeFixture(root, ".github/dependabot.yml", "version: 2\nupdates: []\n");
      await writeFixture(root, "docs/compliancepass-dependency-audit-notes.md", "total: 0\ncritical: 0\nhigh: 0\nmoderate: 0\n");
      await writeFixture(root, "docs/unclick-context-boot-packet.md", "Architecture evidence and proof receipt.\n");
      await writeFixture(root, "AUTOPILOT.md", "Human oversight, PASS, BLOCKER, HOLD, proof, ledger.\n");
      await writeFixture(root, "FLEET_SYNC.md", "Fleet proof and review.\n");
      await writeFixture(root, "docs/adr/0001.md", "Decision record.\n");
      await writeFixture(root, "docs/runbooks/incident-response.md", "Incident runbook.\n");
      await writeFixture(root, "docs/connectors/spec.md", "Credential provider used-by mapping, rotation, blast radius.\n");
      await writeFixture(root, "docs/ai/provider-inventory.md", "AI provider inventory: OpenAI, Anthropic, OpenRouter. Human oversight and redaction notes.\n");
      await writeFixture(root, "docs/compliancepass-framework-mapping.md", "ISO/IEC 27001:2022, ISO/IEC 42001:2023, NIST SP 800-218 v1.1, OWASP SAMM v2, OpenSSF Scorecard, SLSA, SIG, CAIQ, and VC technical due diligence evidence mapping.\n");
      await writeFixture(root, "docs/compliancepass-control-index.md", [
        "| Framework | Control or question id | CompliancePass check id | Evidence path | Owner | Status | Last proof | Freshness window |",
        "| --- | --- | --- | --- | --- | --- | --- | --- |",
        "| ISO/IEC 27001:2022 | A.5.1 | cp-sec-policy | `SECURITY.md` | SecurityPass lane | Evidence linked | 2026-05-27 | 30 days |",
        "| ISO/IEC 42001:2023 | A.6 | cp-ai-oversight | `AUTOPILOT.md` | AI lane | Evidence linked | 2026-05-27 | 30 days |",
        "| NIST SP 800-218 v1.1 | PO.3 | cp-sec-workflow-gates | `.github/workflows/ci.yml` | Build lane | Evidence linked | 2026-05-27 | 14 days |",
        "| OWASP SAMM v2 | Verification | cp-sec-dependency-audit-notes | `docs/compliancepass-dependency-audit-notes.md` | SecurityPass lane | Evidence linked | 2026-05-27 | 7 days |",
        "| OpenSSF Scorecard | CI-Tests | cp-sec-workflow-gates | `.github/workflows/ci.yml` | Build lane | Evidence linked | 2026-05-27 | 14 days |",
      ].join("\n"));
      await writeFixture(root, "docs/guardrail-examples.md", "Do not use:\n- enterprise certified\n\nDisallowed phrasing:\n> CompliancePass certifies your startup is enterprise compliant.\n");
      await writeFixture(root, "public/vibe-coding/REVIEW-RUBRIC.md", "## Human review (Certified tier only)\nCertified apps get a marketplace badge after review.\n");
      await writeFixture(root, "public/dogfood/latest.json", JSON.stringify({ proof: "receipt" }));
      await writeFixture(root, "public/enterprise/latest.json", JSON.stringify({ product: "CompliancePass" }));
      await writeFixture(root, "public/enterprise/latest.md", "# CompliancePass Report\n");
      await writeFixture(root, "public/enterprise/latest.html", "<!doctype html><title>CompliancePass Report</title>\n");
      await writeFixture(root, "src/index.ts", "export const value = 1;\n");
      await writeFixture(root, "src/index.test.ts", "import { value } from './index';\n");

      const report = await runCompliancePass({
        repoPath: root,
        targetName: "Fixture <script>alert(1)</script>",
        generatedAt: "2026-05-27T00:00:00.000Z",
      });

      expect(report.product).toBe("CompliancePass");
      expect(report.legacy_aliases).toEqual(["EnterprisePass"]);
      expect(report.status).toBe("complete");
      expect(report.valid_until).toBe("2026-06-03T00:00:00.000Z");
      expect(report.target.repo_path).toBeUndefined();
      expect(report.summary.checks_total).toBeGreaterThan(15);
      expect(report.summary.checks_pending).toBe(0);
      expect(report.summary.blocking_gap_count).toBe(0);
      expect(report.report_integrity.checks_total_matches_categories).toBe(true);
      expect(report.report_integrity.gap_count_matches_findings).toBe(true);
      expect(report.report_integrity.max_public_age_hours).toBe(168);
      expect(report.wording_notice).toMatch(/not a compliance certification/i);
      expect(getCheck(report, "cp-evidence-claim-language").status).toBe("pass");
      expect(getCheck(report, "cp-evidence-rendered-report-views").status).toBe("pass");
      expect(getCheck(report, "cp-investor-framework-mapping").status).toBe("pass");
      expect(JSON.stringify(report)).not.toMatch(/\bsk-[A-Za-z0-9_-]{16,}/);
      expect(renderCompliancePassMarkdown(report)).toMatch(/Blocking gaps: 0/);
      expect(renderCompliancePassHtml(report)).toMatch(/CompliancePass Report/);
      expect(renderCompliancePassHtml(report)).toContain("Fixture &lt;script&gt;alert(1)&lt;/script&gt;");
      expect(renderCompliancePassHtml(report)).not.toContain("<script>alert(1)</script>");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("redacts source text for unsafe claims and secret-shaped public values", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "compliancepass-redaction-"));
    try {
      await writeFixture(root, "package.json", JSON.stringify({
        name: "fixture-product",
        scripts: { build: "tsc", test: "vitest", lint: "eslint ." },
      }));
      await writeFixture(root, "docs/claim.md", "CompliancePass certifies your startup is enterprise compliant.\n");
      await writeFixture(root, "public/leak.md", "Example leaked token sk-abcdefghijklmnopqrstu should never be echoed.\n");
      await writeFixture(root, "docs/proof.md", "proof C:\\Users\\Example\\secrets\\token.txt sk-abcdefghijklmnopqrstu api_key=plain-secret-value should be summarized safely.\n");

      const report = await runCompliancePass({
        repoPath: root,
        targetName: "Fixture",
        generatedAt: "2026-05-27T00:00:00.000Z",
      });
      const serialized = JSON.stringify(report);

      expect(getCheck(report, "cp-evidence-claim-language").status).toBe("fail");
      expect(getCheck(report, "cp-cred-public-secret-hygiene").status).toBe("fail");
      expect(serialized).not.toContain("CompliancePass certifies your startup");
      expect(serialized).not.toContain("sk-abcdefghijklmnopqrstu");
      expect(serialized).not.toContain("plain-secret-value");
      expect(serialized).not.toContain("C:\\Users\\Example");
      expect(serialized).toContain("source text intentionally not echoed");
      expect(serialized).toContain("[redacted]");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("does not let a broad disclaimer hide a later unsafe claim", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "compliancepass-claims-"));
    try {
      await writeFixture(root, "package.json", JSON.stringify({
        name: "fixture-product",
        scripts: { build: "tsc", test: "vitest", lint: "eslint ." },
      }));
      await writeFixture(root, "docs/claim.md", [
        "CompliancePass is readiness guidance, not certification.",
        "CompliancePass certifies your startup is enterprise compliant.",
      ].join("\n"));

      const report = await runCompliancePass({
        repoPath: root,
        targetName: "Fixture",
        generatedAt: "2026-05-27T00:00:00.000Z",
      });

      expect(getCheck(report, "cp-evidence-claim-language").status).toBe("fail");
      expect(JSON.stringify(report)).not.toContain("CompliancePass certifies your startup");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("clamps category and report bands when high-severity gaps remain", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "compliancepass-gap-band-"));
    try {
      await writeFixture(root, "package.json", JSON.stringify({
        name: "fixture-product",
        repository: { type: "git", url: "https://example.test/repo.git" },
        scripts: { build: "tsc", test: "vitest", lint: "eslint ." },
      }));
      await writeFixture(root, "SECURITY.md", "Report issues by email.\n");
      await writeFixture(root, ".github/workflows/ci.yml", "on: [pull_request]\njobs:\n  test:\n    steps:\n      - run: npm test\n");
      await writeFixture(root, ".github/dependabot.yml", "version: 2\nupdates: []\n");
      await writeFixture(root, "docs/security/policies.md", "GitHub push protection with secret scanning must remain enabled.\n");
      await writeFixture(root, "docs/compliancepass-dependency-audit-notes.md", "critical: 0\nhigh: 1\nmoderate: 0\n");

      const report = await runCompliancePass({
        repoPath: root,
        targetName: "Fixture",
        generatedAt: "2026-05-27T00:00:00.000Z",
      });
      const secureDevelopment = report.categories.find((category) => category.id === "secure_development");

      expect(secureDevelopment?.band).toBe("amber");
      expect(report.readiness_band).not.toBe("green");
      expect(report.summary.gap_severity_counts.high).toBeGreaterThanOrEqual(1);
      expect(report.summary.blocking_gap_count).toBeGreaterThanOrEqual(1);
      expect(report.summary.headline).toMatch(/keep the report out of green/i);
      for (const gap of report.gaps) {
        expect(gap.evidence.length).toBeGreaterThan(0);
      }
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("treats unverified secret-scanning policy as partial proof", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "compliancepass-secret-scan-"));
    try {
      await writeFixture(root, "package.json", JSON.stringify({
        name: "fixture-product",
        scripts: { build: "tsc", test: "vitest", lint: "eslint ." },
      }));
      await writeFixture(root, "docs/security/current-posture.md", "GitHub push protection status should be confirmed at the repo level; the codebase does not indicate whether it is on. Recommend: verify via GitHub settings.\n");

      const report = await runCompliancePass({
        repoPath: root,
        targetName: "Fixture",
        generatedAt: "2026-05-27T00:00:00.000Z",
      });
      const secretScanning = getCheck(report, "cp-sec-secret-scanning");

      expect(secretScanning.status).toBe("partial");
      expect(secretScanning.findings.map((finding) => finding.id)).toContain("cp-sec-secret-scanning-verification-gap");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("flags framework mapping as partial until a control-level index exists", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "compliancepass-frameworks-"));
    try {
      await writeFixture(root, "package.json", JSON.stringify({
        name: "fixture-product",
        scripts: { build: "tsc", test: "vitest", lint: "eslint ." },
      }));
      await writeFixture(root, "docs/compliancepass-framework-mapping.md", [
        "CompliancePass maps evidence to ISO/IEC 27001:2022, ISO/IEC 42001:2023, NIST SP 800-218 v1.1, OWASP SAMM v2, OpenSSF Scorecard, SLSA, SIG, CAIQ, and VC technical due diligence.",
        "The control-by-control index is not yet complete.",
      ].join("\n"));

      const report = await runCompliancePass({
        repoPath: root,
        targetName: "Fixture",
        generatedAt: "2026-05-27T00:00:00.000Z",
      });
      const frameworkMapping = getCheck(report, "cp-investor-framework-mapping");

      expect(frameworkMapping.status).toBe("partial");
      expect(frameworkMapping.findings.map((finding) => finding.id)).toContain("cp-investor-framework-control-index-thin");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });
});
