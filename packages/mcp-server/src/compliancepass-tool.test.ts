import { describe, expect, it } from "vitest";
import {
  compliancepassReportJson,
  compliancepassReportMd,
  compliancepassRun,
  compliancepassStatus,
} from "./compliancepass-tool.js";

describe("compliancepass-tool", () => {
  it("runs CompliancePass against the local repo and stores the report in-session", async () => {
    const run = await compliancepassRun({ repo_path: process.cwd(), target_name: "UnClick" }) as {
      run_id?: string;
      status?: string;
      pass?: string;
      product?: string;
      summary?: { checks_total?: number; checks_pending?: number };
      readiness_score?: { value?: number };
    };

    expect(run.status).toBe("complete");
    expect(run.pass).toBe("compliancepass");
    expect(run.product).toBe("CompliancePass");
    expect(run.run_id).toMatch(/^compliancepass-/);
    expect(run.summary?.checks_total).toBeGreaterThan(10);
    expect(run.summary?.checks_pending).toBe(0);
    expect(run.readiness_score?.value).toBeGreaterThanOrEqual(0);

    const status = await compliancepassStatus({ run_id: run.run_id }) as { status?: string; run_id?: string };
    expect(status.run_id).toBe(run.run_id);
    expect(status.status).toBe("complete");

    const json = await compliancepassReportJson({ run_id: run.run_id }) as { product?: string };
    expect(json.product).toBe("CompliancePass");

    const markdown = await compliancepassReportMd({ run_id: run.run_id }) as { markdown?: string };
    expect(markdown.markdown).toMatch(/CompliancePass Report/);
  });
});
