import { beforeEach, describe, expect, it } from "vitest";
import { runSecurityPack } from "../runner/index.js";
import { __resetForTests } from "../runner/run-store.js";
import type { SecurityPack } from "../types/pack-schema.js";

function basePack(): SecurityPack {
  return {
    id: "securitypass-dogfood",
    name: "SecurityPass Dogfood",
    version: "0.1.0",
    description: "Dogfood pack for the SecurityPass runner.",
    targets: [
      {
        id: "repo",
        type: "git",
        repo: process.cwd(),
      },
    ],
    scope_contract: {
      contract_id: "dogfood-contract",
      proof_method: "signed_email",
      expected_token: "signed-dogfood-token",
      in_scope_assets: [process.cwd()],
      out_of_scope_assets: [],
    },
    checks: [
      {
        id: "repo.secrets",
        title: "Repository secrets",
        category: "secrets",
        severity: "critical",
        probe: "gitleaks",
        tags: [],
        profiles: ["smoke", "standard", "deep"],
      },
      {
        id: "repo.dependencies",
        title: "Dependency vulnerabilities",
        category: "supply-chain",
        severity: "high",
        probe: "osv-scanner",
        tags: [],
        profiles: ["smoke", "standard", "deep"],
      },
    ],
    hats: [],
    thresholds: {
      fail_on: ["critical", "high"],
      warn_on: ["medium"],
      min_pass_rate: 0.9,
    },
    heal_budget: {
      max_attempts: 0,
      max_cost_usd: 0,
      max_wall_seconds: 0,
    },
    monitor: {
      enabled: false,
      channels: [],
      diff_only: true,
    },
    fixtures: [],
  };
}

describe("runSecurityPack", () => {
  beforeEach(() => __resetForTests());

  it("runs gitleaks and osv-scanner through one scope-verified artifact", async () => {
    const result = await runSecurityPack(basePack(), {}, {
      commandRunner: async (spec) => {
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
      },
    });

    expect(result.run.status).toBe("complete");
    expect(result.run.scope_performed[0]).toMatch(/Scope verified/);
    expect(result.findings).toHaveLength(2);
    expect(result.run.verdict_summary.fail).toBe(2);
    expect(result.findings[0].evidence?.secret_redacted).toBe("[redacted]");
  });

  it("reports missing host scanners as not checked instead of a green pass", async () => {
    const result = await runSecurityPack(basePack(), {}, {
      commandRunner: async (spec) => {
        throw new Error(`${spec.command} missing`);
      },
    });

    expect(result.run.status).toBe("complete");
    expect(result.findings).toHaveLength(0);
    expect(result.run.not_checked).toHaveLength(2);
    expect(result.run.not_checked[0].reason).toMatch(/could not run/);
  });
});
