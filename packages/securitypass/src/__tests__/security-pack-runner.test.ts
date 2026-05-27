import { beforeEach, describe, expect, it, vi } from "vitest";
import { runSecurityPack, ScopeUnverifiedError } from "../runner/index.js";
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
    expect(result.run.score).toBeLessThan(100);
    expect(result.run.posture_summary).toMatch(/failing security finding/);
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
    expect(result.run.score).toBe(90);
    expect(result.run.posture_summary).toMatch(/incomplete coverage/i);
  });

  it("refuses a target outside the declared in-scope assets before any probe", async () => {
    const pack = basePack();
    pack.scope_contract.in_scope_assets = ["C:/not-this-repo"];
    const commandRunner = vi.fn();

    await expect(
      runSecurityPack(pack, {}, { commandRunner }),
    ).rejects.toBeInstanceOf(ScopeUnverifiedError);
    expect(commandRunner).not.toHaveBeenCalled();
  });

  it("requires URL scope assets to match the exact origin when a URL asset is declared", async () => {
    const pack = basePack();
    pack.targets = [{ id: "web", type: "url", url: "http://example.com:8080/app" }];
    pack.scope_contract.in_scope_assets = ["https://example.com/app"];
    pack.checks = [{
      id: "web.headers",
      title: "Security headers",
      category: "web.headers",
      severity: "high",
      probe: "security-headers",
      tags: [],
      profiles: ["smoke", "standard", "deep"],
    }];
    const fetchImpl = vi.fn<typeof fetch>();

    await expect(
      runSecurityPack(pack, { target_id: "web" }, { fetchImpl }),
    ).rejects.toBeInstanceOf(ScopeUnverifiedError);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("still allows hostname-only scope assets across scheme and port", async () => {
    const pack = basePack();
    pack.targets = [{ id: "web", type: "url", url: "http://example.com:8080/app" }];
    pack.scope_contract.in_scope_assets = ["example.com"];
    pack.checks = [{
      id: "future.stagehand",
      title: "Future Stagehand check",
      category: "browser",
      severity: "info",
      probe: "stagehand",
      tags: [],
      profiles: ["smoke", "standard", "deep"],
    }];

    const result = await runSecurityPack(pack, { target_id: "web" });
    expect(result.run.status).toBe("complete");
    expect(result.run.not_checked).toHaveLength(1);
    expect(result.run.not_checked[0].reason).toMatch(/not wired/);
  });

  it("lets explicit out-of-scope assets veto otherwise in-scope targets", async () => {
    const pack = basePack();
    pack.scope_contract.out_of_scope_assets = [process.cwd()];

    await expect(runSecurityPack(pack)).rejects.toMatchObject({
      code: "scope_unverified",
      proof: expect.objectContaining({
        reason: "Target matches an explicitly out-of-scope asset.",
      }),
    });
  });

  it("rejects an unknown target_id instead of falling back to the first target", async () => {
    await expect(
      runSecurityPack(basePack(), { target_id: "missing-target" }),
    ).rejects.toThrow(/was not found/);
  });

  it("does not send URL targets to repo-only scanners", async () => {
    const pack = basePack();
    pack.targets = [{ id: "web", type: "url", url: "https://example.com" }];
    pack.scope_contract.in_scope_assets = ["https://example.com"];
    const commandRunner = vi.fn();

    const result = await runSecurityPack(pack, { target_id: "web" }, { commandRunner });

    expect(result.run.status).toBe("complete");
    expect(result.findings).toHaveLength(0);
    expect(result.run.not_checked).toHaveLength(2);
    expect(result.run.not_checked[0].reason).toMatch(/git target with a repo path/);
    expect(commandRunner).not.toHaveBeenCalled();
  });

  it("records security-header fetch failures as not_checked evidence", async () => {
    const pack = basePack();
    pack.targets = [{ id: "web", type: "url", url: "https://example.com" }];
    pack.scope_contract.in_scope_assets = ["https://example.com"];
    pack.checks = [{
      id: "web.headers",
      title: "Security headers",
      category: "web.headers",
      severity: "high",
      probe: "security-headers",
      tags: [],
      profiles: ["smoke", "standard", "deep"],
    }];

    const result = await runSecurityPack(pack, { target_id: "web" }, {
      fetchImpl: async () => {
        throw new Error("network unavailable");
      },
    });

    expect(result.run.status).toBe("complete");
    expect(result.findings).toHaveLength(0);
    expect(result.run.not_checked).toHaveLength(1);
    expect(result.run.not_checked[0].reason).toMatch(/could not fetch/);
  });
});
