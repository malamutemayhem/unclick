import { describe, expect, it } from "vitest";
import { dump as dumpYaml, load as loadYaml } from "js-yaml";
import { SecurityPackSchema } from "../types/pack-schema.js";

const minimalPack = {
  id: "securitypass-web-baseline",
  name: "Web Baseline",
  version: "0.1.0",
  description: "Minimum viable web pack",
  targets: [
    { id: "primary", type: "url" as const, url: "https://example.com" },
  ],
  scope_contract: {
    contract_id: "ctr-001",
    proof_method: "dns_txt" as const,
    expected_token: "securitypass-verify=abc123",
  },
  checks: [
    {
      id: "sec-headers.csp",
      title: "CSP header present",
      category: "web.headers",
      severity: "high" as const,
      probe: "security-headers",
    },
  ],
};

describe("SecurityPackSchema", () => {
  it("parses a minimal valid pack and applies defaults", () => {
    const result = SecurityPackSchema.safeParse(minimalPack);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.id).toBe("securitypass-web-baseline");
    expect(result.data.thresholds.fail_on).toEqual(["critical", "high"]);
    expect(result.data.heal_budget.max_attempts).toBe(0);
    expect(result.data.monitor.enabled).toBe(false);
    expect(result.data.fixtures).toEqual([]);
    expect(result.data.checks[0].profiles).toEqual(["smoke", "standard", "deep"]);
  });

  it("rejects non-semver versions", () => {
    const bad = { ...minimalPack, version: "v1" };
    const result = SecurityPackSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("requires at least one target", () => {
    const bad = { ...minimalPack, targets: [] };
    const result = SecurityPackSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("requires at least one check", () => {
    const bad = { ...minimalPack, checks: [] };
    const result = SecurityPackSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects unknown hat roles", () => {
    const bad = {
      ...minimalPack,
      hats: [{ id: "h1", role: "wizard" }],
    };
    const result = SecurityPackSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("accepts an optional Customer Hat with veto + freeform brief", () => {
    const withHat = {
      ...minimalPack,
      hats: [
        { id: "customer", role: "customer" as const, veto: true, brief: "Block any finding that touches PHI." },
      ],
    };
    const result = SecurityPackSchema.safeParse(withHat);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.hats[0].veto).toBe(true);
  });

  it("round-trips through YAML without losing fields", () => {
    const yaml = dumpYaml(minimalPack);
    const reparsed = SecurityPackSchema.safeParse(loadYaml(yaml));
    expect(reparsed.success).toBe(true);
    if (!reparsed.success) return;
    expect(reparsed.data.id).toBe(minimalPack.id);
    expect(reparsed.data.checks).toHaveLength(1);
  });
});
