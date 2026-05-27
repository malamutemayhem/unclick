import * as path from "node:path";
import { loadPackFromFile, loadPackFromYaml, packToJsonb, packFromJsonb, packToYaml } from "../pack-loader.js";

const TESTPASS_ROOT = process.cwd().endsWith(`${path.sep}testpass`)
  ? process.cwd()
  : path.resolve(process.cwd(), "packages/testpass");
const CORE_PACK_PATH = path.resolve(TESTPASS_ROOT, "packs/testpass-core.yaml");
const FISHBOWL_PACK_PATH = path.resolve(TESTPASS_ROOT, "packs/testpass-fishbowl-v0.yaml");

describe("loadPackFromFile", () => {
  it("loads and validates testpass-core.yaml without errors", () => {
    const pack = loadPackFromFile(CORE_PACK_PATH);
    expect(pack.id).toBe("testpass-core");
    expect(pack.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(pack.items.length).toBeGreaterThanOrEqual(26);
  });

  it("loads the Fishbowl WakePass action-needed guard", () => {
    const pack = loadPackFromFile(FISHBOWL_PACK_PATH);
    const guard = pack.items.find((item) => item.id === "FB-013");

    expect(pack.id).toBe("testpass-fishbowl-v0");
    expect(guard?.title).toBe("action-needed handoffs require direct owner ACK dispatch");
    expect(guard?.expected).toMatchObject({
      action_tags: ["needs-doing", "blocker", "tripwire"],
      recipient_scope: "direct worker only",
      ack_required: true,
      lease_seconds: 600,
    });
    expect(guard?.tags).toEqual(expect.arrayContaining(["wakepass", "action-needed", "ack-required"]));
  });

  it("throws when file does not exist", () => {
    expect(() => loadPackFromFile("/nonexistent/pack.yaml")).toThrow("not found");
  });
});

describe("loadPackFromYaml", () => {
  it("parses a minimal valid pack", () => {
    const yaml = `
id: test-pack
name: Test Pack
version: 1.0.0
items:
  - id: T-001
    title: Basic check
    category: general
    severity: low
    check_type: deterministic
`;
    const pack = loadPackFromYaml(yaml);
    expect(pack.id).toBe("test-pack");
    expect(pack.items).toHaveLength(1);
  });

  it("preserves the research-brief checklist fields", () => {
    const yaml = `
id: research-style
name: Research Style
version: 1.0.0
items:
  - id: MCP-CONF-014
    title: Tool annotations present on every tool
    category: conformance
    spec_ref: "MCP 2025-06-18 tools.annotations"
    severity: high
    verdict_values: [check, na, fail, other]
    evidence_required:
      - tool_list_response
      - per_tool_annotation_snapshot
    check_type: agent
    instruction: List all tools and confirm annotations are present.
    verify:
      type: agent
      instruction: Missing any annotation is a fail.
      timeout_ms: 15000
      cost_budget_usd: 0.02
    on_fail_template: Add the missing annotation to the tool definition.
    estimated_seconds: 15
    retry_on: [transport_error]
    waiver:
      allowed: false
`;
    const pack = loadPackFromYaml(yaml);
    const item = pack.items[0];

    expect(item.spec_ref).toContain("tools.annotations");
    expect(item.evidence_required).toEqual(["tool_list_response", "per_tool_annotation_snapshot"]);
    expect(item.verify).toMatchObject({ type: "agent", timeout_ms: 15000, cost_budget_usd: 0.02 });
    expect(item.on_fail_template).toContain("missing annotation");
    expect(item.waiver).toMatchObject({ allowed: false });
    expect(packFromJsonb(packToJsonb(pack)).items[0].retry_on).toEqual(["transport_error"]);
  });

  it("throws on invalid schema", () => {
    const yaml = `id: bad\nname: Bad\nversion: not-semver\nitems: []`;
    expect(() => loadPackFromYaml(yaml)).toThrow("schema validation failed");
  });
});

describe("jsonb round-trip", () => {
  it("converts pack to jsonb and back without data loss", () => {
    const pack = loadPackFromFile(CORE_PACK_PATH);
    const jsonb = packToJsonb(pack);
    const restored = packFromJsonb(jsonb);
    expect(restored.id).toBe(pack.id);
    expect(restored.items.length).toBe(pack.items.length);
    expect(restored.items[0].id).toBe(pack.items[0].id);
  });
});

describe("yaml serialization", () => {
  it("serializes and re-parses to an equivalent pack", () => {
    const pack = loadPackFromFile(CORE_PACK_PATH);
    const serialized = packToYaml(pack);
    const reparsed = loadPackFromYaml(serialized);
    expect(reparsed.id).toBe(pack.id);
    expect(reparsed.items.map((i) => i.id)).toEqual(pack.items.map((i) => i.id));
  });
});
