import { beforeEach, describe, expect, it } from "vitest";
import {
  __resetSecurityPassMcpForTests,
  SECURITYPASS_HANDLERS,
  SECURITYPASS_TOOLS,
} from "../mcp/tools.js";
import { __resetForTests } from "../runner/run-store.js";

describe("SECURITYPASS_TOOLS registration", () => {
  it("exposes exactly the 7 chunk-1 MCP tools", () => {
    const names = SECURITYPASS_TOOLS.map((t) => t.name).sort();
    expect(names).toEqual([
      "securitypass_disclosure_status",
      "securitypass_finding_detail",
      "securitypass_register_pack",
      "securitypass_report",
      "securitypass_run",
      "securitypass_status",
      "securitypass_verify_scope",
    ]);
  });

  it("each tool has an inputSchema", () => {
    for (const tool of SECURITYPASS_TOOLS) {
      expect(tool.inputSchema.type).toBe("object");
      expect(tool.inputSchema.properties).toBeDefined();
    }
  });

  it("registers a handler for every advertised tool", () => {
    for (const tool of SECURITYPASS_TOOLS) {
      expect(typeof SECURITYPASS_HANDLERS[tool.name]).toBe("function");
    }
  });
});

describe("SECURITYPASS_HANDLERS validation behaviour", () => {
  beforeEach(() => {
    __resetForTests();
    __resetSecurityPassMcpForTests();
  });

  it("securitypass_status errors when run_id is missing", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_status({})) as { error?: string };
    expect(result.error).toMatch(/run_id is required/);
  });

  it("securitypass_run surfaces scope_unverified rather than throwing", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_run({
      pack_id: "any",
      target_url: "https://example.com",
    })) as { error?: string; next_step?: string };
    expect(result.error).toBe("scope_unverified");
    expect(result.next_step).toMatch(/securitypass_verify_scope/);
  });

  it("securitypass_register_pack rejects invalid YAML", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_register_pack({
      pack_id: "p",
      yaml: "id: [unclosed",
    })) as { error?: string };
    expect(result.error).toMatch(/yaml parse failed/);
  });

  it("securitypass_register_pack rejects schema-invalid YAML", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_register_pack({
      pack_id: "p",
      yaml: "id: bad\nname: Bad\nversion: not-semver\ntargets: []\nchecks: []",
    })) as { error?: string };
    expect(result.error).toMatch(/schema validation failed/);
  });

  it("securitypass_register_pack rejects pack_id mismatches", async () => {
    const yaml = [
      "id: yaml-pack",
      "name: YAML Pack",
      "version: 0.1.0",
      "targets:",
      "  - id: primary",
      "    type: url",
      "    url: https://example.com",
      "scope_contract:",
      "  contract_id: c1",
      "  proof_method: signed_email",
      "  expected_token: token-123",
      "checks:",
      "  - id: c.headers",
      "    title: Headers",
      "    category: web.headers",
      "    severity: high",
      "    probe: security-headers",
    ].join("\n");
    const result = (await SECURITYPASS_HANDLERS.securitypass_register_pack({
      pack_id: "requested-pack",
      yaml,
    })) as { error?: string };
    expect(result.error).toBe("pack_id mismatch");
  });

  it("securitypass_run reports unknown pack ids clearly", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_run({
      pack_id: "missing-pack",
    })) as { error?: string; pack_id?: string };
    expect(result.error).toBe("pack not found");
    expect(result.pack_id).toBe("missing-pack");
  });

  it("securitypass_register_pack stores a valid pack", async () => {
    const yaml = [
      "id: ok-pack",
      "name: OK",
      "version: 0.1.0",
      "targets:",
      "  - id: primary",
      "    type: url",
      "    url: https://example.com",
      "scope_contract:",
      "  contract_id: c1",
      "  proof_method: dns_txt",
      "  expected_token: token-123",
      "checks:",
      "  - id: c.headers",
      "    title: Headers",
      "    category: web.headers",
      "    severity: high",
      "    probe: security-headers",
    ].join("\n");
    const result = (await SECURITYPASS_HANDLERS.securitypass_register_pack({
      pack_id: "ok-pack",
      yaml,
    })) as { stub?: boolean; pack_id?: string; persisted?: boolean };
    expect(result.stub).toBe(false);
    expect(result.pack_id).toBe("ok-pack");
    expect(result.persisted).toBe(true);
  });

  it("securitypass_run returns a complete scoped artifact for a registered pack", async () => {
    const yaml = [
      "id: ok-pack",
      "name: OK",
      "version: 0.1.0",
      "targets:",
      "  - id: repo",
      "    type: git",
      `    repo: ${JSON.stringify(process.cwd())}`,
      "scope_contract:",
      "  contract_id: c1",
      "  proof_method: signed_email",
      "  expected_token: signed-token",
      "checks:",
      "  - id: future.stagehand",
      "    title: Future Stagehand check",
      "    category: browser",
      "    severity: info",
      "    probe: stagehand",
    ].join("\n");
    await SECURITYPASS_HANDLERS.securitypass_register_pack({
      pack_id: "ok-pack",
      yaml,
    });

    const result = (await SECURITYPASS_HANDLERS.securitypass_run({
      pack_id: "ok-pack",
      target_id: "repo",
    })) as {
      stub?: boolean;
      status?: string;
      not_checked_count?: number;
      posture_summary?: string;
      disclaimer?: { compact?: string };
    };
    expect(result.stub).toBe(false);
    expect(result.status).toBe("complete");
    expect(result.not_checked_count).toBe(1);
    expect(result.posture_summary).toMatch(/incomplete coverage/i);
    expect(result.disclaimer?.compact).toMatch(/not a pentest/i);
  });

  it("securitypass_run reports unknown pack targets without fallback", async () => {
    const yaml = [
      "id: ok-pack",
      "name: OK",
      "version: 0.1.0",
      "targets:",
      "  - id: repo",
      "    type: git",
      `    repo: ${JSON.stringify(process.cwd())}`,
      "scope_contract:",
      "  contract_id: c1",
      "  proof_method: signed_email",
      "  expected_token: signed-token",
      `  in_scope_assets: [${JSON.stringify(process.cwd())}]`,
      "checks:",
      "  - id: future.stagehand",
      "    title: Future Stagehand check",
      "    category: browser",
      "    severity: info",
      "    probe: stagehand",
    ].join("\n");
    await SECURITYPASS_HANDLERS.securitypass_register_pack({
      pack_id: "ok-pack",
      yaml,
    });

    const result = (await SECURITYPASS_HANDLERS.securitypass_run({
      pack_id: "ok-pack",
      target_id: "missing-target",
    })) as { error?: string; detail?: string };
    expect(result.error).toBe("target_not_found");
    expect(result.detail).toMatch(/missing-target/);
  });

  it("securitypass_verify_scope returns verified=true for signed scope contracts", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_verify_scope({
      target_url: "https://example.com",
      proof_method: "signed_email",
      contract_id: "c1",
      expected_token: "signed-token",
    })) as { stub?: boolean; verified?: boolean };
    expect(result.stub).toBe(false);
    expect(result.verified).toBe(true);
  });

  it("securitypass_verify_scope supports repo targets for signed contracts", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_verify_scope({
      target_type: "git",
      target_repo: process.cwd(),
      proof_method: "signed_email",
      contract_id: "c1",
      expected_token: "signed-token",
    })) as { stub?: boolean; verified?: boolean; target?: { repo?: string; type?: string } };
    expect(result.stub).toBe(false);
    expect(result.verified).toBe(true);
    expect(result.target?.type).toBe("git");
    expect(result.target?.repo).toBe(process.cwd());
  });

  it("securitypass_verify_scope requires a target locator", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_verify_scope({
      proof_method: "signed_email",
      contract_id: "c1",
      expected_token: "signed-token",
    })) as { error?: string };
    expect(result.error).toBe("target_url or target_repo is required");
  });

  it("securitypass_disclosure_status is honest when the finding is unknown", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_disclosure_status({
      finding_id: "f1",
    })) as { state?: string };
    expect(result.state).toBe("unknown");
  });

  it("securitypass_finding_detail returns not-found when the finding is unknown", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_finding_detail({
      finding_id: "missing",
    })) as { error?: string };
    expect(result.error).toMatch(/finding not found/);
  });
});
