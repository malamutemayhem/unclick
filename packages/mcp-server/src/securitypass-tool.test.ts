import { afterEach, describe, expect, it } from "vitest";
import {
  __resetSecuritypassToolForTests,
  __setSecuritypassCommandRunnerForTests,
  securitypassRun,
  securitypassStatus,
} from "./securitypass-tool.js";

describe("securitypass-tool", () => {
  afterEach(() => {
    __resetSecuritypassToolForTests();
  });

  it("requires repo_path or target_url", async () => {
    const result = (await securitypassRun({})) as { error?: string };
    expect(result.error).toMatch(/repo_path or target_url is required/);
  });

  it("keeps URL targets gated behind scope verification", async () => {
    const result = (await securitypassRun({
      target_url: "https://example.com",
    })) as { error?: string; next_step?: string };
    expect(result.error).toBe("scope_unverified");
    expect(result.next_step).toMatch(/repo_path/i);
  });

  it("stores an in-memory run for repo scans and exposes status", async () => {
    __setSecuritypassCommandRunnerForTests(async (spec) => {
      if (spec.command === "gitleaks") {
        return {
          exitCode: 1,
          stdout: JSON.stringify([
            {
              RuleID: "generic-api-key",
              Description: "Generic API key",
              File: "src/config.ts",
              StartLine: 12,
              Secret: "sk_live_123",
            },
          ]),
          stderr: "",
        };
      }
      return {
        exitCode: 0,
        stdout: JSON.stringify({
          results: [
            {
              packages: [
                {
                  package: { name: "vite", version: "1.0.0" },
                  vulnerabilities: [
                    {
                      id: "OSV-2026-1",
                      summary: "Example vulnerability",
                      severity: [{ score: "HIGH" }],
                    },
                  ],
                },
              ],
            },
          ],
        }),
        stderr: "",
      };
    });

    const run = (await securitypassRun({
      repo_path: process.cwd(),
      profile: "smoke",
    })) as { run_id?: string; status?: string; finding_count?: number; verdict_summary?: { fail?: number } };

    expect(run.status).toBe("complete");
    expect(run.finding_count).toBe(2);
    expect(run.verdict_summary?.fail).toBe(2);
    expect(run.run_id).toBeTruthy();

    const status = (await securitypassStatus({
      run_id: run.run_id,
    })) as { run_id?: string; status?: string; finding_count?: number };

    expect(status.run_id).toBe(run.run_id);
    expect(status.status).toBe("complete");
    expect(status.finding_count).toBe(2);
  });
});
