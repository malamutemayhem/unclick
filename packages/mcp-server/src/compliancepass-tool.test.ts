import { describe, expect, it } from "vitest";
import {
  compliancepassReportJson,
  compliancepassReportMd,
  compliancepassRun,
  compliancepassStatus,
} from "./compliancepass-tool.js";

describe("compliancepass-tool", () => {
  it("runs CompliancePass against the local repo and stores the report in-session", async () => {
    const run = await compliancepassRun({ repo_path: process.cwd(), target_name: "UnClick", target_sha: "compliance-sha-123" }) as {
      run_id?: string;
      status?: string;
      pass?: string;
      product?: string;
      target_sha?: string;
      summary?: { checks_total?: number; checks_pending?: number };
      readiness_score?: { value?: number };
      compliancepass_receipt_v1?: {
        kind?: string;
        status?: string;
        target_sha?: string;
        checked?: { total?: number; pending?: number };
        blocking_gap_count?: number;
        evidence_sources?: unknown[];
        boundaries?: string[];
      };
    };

    expect(run.status).toBe("complete");
    expect(run.pass).toBe("compliancepass");
    expect(run.product).toBe("CompliancePass");
    expect(run.target_sha).toBe("compliance-sha-123");
    expect(run.run_id).toMatch(/^compliancepass-/);
    expect(run.summary?.checks_total).toBeGreaterThan(10);
    expect(run.summary?.checks_pending).toBe(0);
    expect(run.readiness_score?.value).toBeGreaterThanOrEqual(0);
    expect(run.compliancepass_receipt_v1).toMatchObject({
      kind: "compliancepass_receipt_v1",
      target_sha: "compliance-sha-123",
      checked: { pending: 0 },
    });
    expect(["PASS", "WARN", "BLOCKER"]).toContain(run.compliancepass_receipt_v1?.status);
    expect(run.compliancepass_receipt_v1?.checked?.total).toBe(run.summary?.checks_total);
    expect(run.compliancepass_receipt_v1?.evidence_sources?.length).toBeGreaterThan(0);
    expect(run.compliancepass_receipt_v1?.boundaries?.join(" ")).toMatch(/not a compliance certification/i);

    const status = await compliancepassStatus({ run_id: run.run_id }) as {
      status?: string;
      run_id?: string;
      target_sha?: string;
      compliancepass_receipt_v1?: { target_sha?: string };
    };
    expect(status.run_id).toBe(run.run_id);
    expect(status.status).toBe("complete");
    expect(status.target_sha).toBe("compliance-sha-123");
    expect(status.compliancepass_receipt_v1?.target_sha).toBe("compliance-sha-123");

    const json = await compliancepassReportJson({ run_id: run.run_id }) as { product?: string };
    expect(json.product).toBe("CompliancePass");

    const markdown = await compliancepassReportMd({ run_id: run.run_id }) as { markdown?: string };
    expect(markdown.markdown).toMatch(/CompliancePass Report/);
  });

  it("rejects blank target SHA values", async () => {
    await expect(compliancepassRun({
      repo_path: process.cwd(),
      target_sha: " ",
    })).resolves.toMatchObject({ error: "target_sha must be a non-empty string when provided" });
  });
});
