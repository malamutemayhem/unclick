import { beforeEach, describe, expect, it } from "vitest";
import {
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

  it("each tool has an inputSchema with required fields declared", () => {
    for (const tool of SECURITYPASS_TOOLS) {
      expect(tool.inputSchema.type).toBe("object");
      expect(tool.inputSchema.properties).toBeDefined();
      expect(Array.isArray(tool.inputSchema.required)).toBe(true);
      expect((tool.inputSchema.required as string[]).length).toBeGreaterThan(0);
    }
  });

  it("registers a handler for every advertised tool", () => {
    for (const tool of SECURITYPASS_TOOLS) {
      expect(typeof SECURITYPASS_HANDLERS[tool.name]).toBe("function");
    }
  });
});

describe("SECURITYPASS_HANDLERS validation behaviour", () => {
  beforeEach(() => __resetForTests());

  it("securitypass_status errors when run_id is missing", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_status({})) as { error?: string };
    expect(result.error).toMatch(/run_id is required/);
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

  it("securitypass_register_pack returns stub:true for a valid pack", async () => {
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
    })) as { stub?: boolean; pack_id?: string };
    expect(result.stub).toBe(true);
    expect(result.pack_id).toBe("ok-pack");
  });

  it("securitypass_verify_scope returns verified=false in the stub", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_verify_scope({
      target_url: "https://example.com",
      proof_method: "dns_txt",
    })) as { stub?: boolean; verified?: boolean };
    expect(result.stub).toBe(true);
    expect(result.verified).toBe(false);
  });

  it("securitypass_disclosure_status returns the notified default state", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_disclosure_status({
      finding_id: "f1",
    })) as { state?: string };
    expect(result.state).toBe("notified");
  });

  it("securitypass_finding_detail returns not-found when the finding is unknown", async () => {
    const result = (await SECURITYPASS_HANDLERS.securitypass_finding_detail({
      finding_id: "missing",
    })) as { error?: string };
    expect(result.error).toMatch(/finding not found/);
  });
});
