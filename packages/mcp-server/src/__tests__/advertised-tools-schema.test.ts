import { describe, it, expect } from "vitest";
import { ADVERTISED_TOOLS, ADVERTISED_TOOLS_SAFE, advertiseToolSchema } from "../server.js";

type AdvertisedTool = { name: string; inputSchema?: unknown };

const TOP_LEVEL = ["anyOf", "oneOf", "allOf"] as const;

function hasTopLevelCombinator(schema: unknown): boolean {
  if (!schema || typeof schema !== "object") return false;
  return TOP_LEVEL.some((k) => k in (schema as Record<string, unknown>));
}

describe("advertised tool schemas are Anthropic-API safe", () => {
  it("no advertised tool has a top-level anyOf/oneOf/allOf", () => {
    const offenders = ADVERTISED_TOOLS_SAFE.filter((t: AdvertisedTool) => hasTopLevelCombinator(t.inputSchema))
      .map((t: AdvertisedTool) => t.name);
    expect(offenders).toEqual([]);
  });

  it("the generated catalog offenders are not advertised by default", () => {
    const names = ["legalpass_run", "legalpass_save_pack", "flowpass_register_pack", "sloppass_run"];
    const advertisedNames = new Set(ADVERTISED_TOOLS_SAFE.map((t: AdvertisedTool) => t.name));
    for (const name of names) {
      expect(advertisedNames.has(name), `${name} should stay behind unclick_call`).toBe(false);
    }
  });

  it("cleans top-level combinators without mutating the original schema", () => {
    const original = {
      name: "needs-cleaning",
      inputSchema: {
        type: "object",
        anyOf: [{ required: ["url"] }, { required: ["html"] }],
        properties: { url: { type: "string" }, html: { type: "string" } },
      },
    };
    const safe = advertiseToolSchema(original);

    expect(hasTopLevelCombinator(safe.inputSchema)).toBe(false);
    expect((safe.inputSchema as Record<string, unknown>).properties).toBeTruthy();
    expect(hasTopLevelCombinator(original.inputSchema)).toBe(true);
  });

  it("preserves nested combinators inside properties", () => {
    const fake = {
      name: "x",
      inputSchema: {
        type: "object",
        properties: { val: { oneOf: [{ type: "string" }, { type: "number" }] } },
      },
    };
    const safe = advertiseToolSchema(fake);
    const nested = (safe.inputSchema as { properties: { val: Record<string, unknown> } }).properties
      .val;
    expect("oneOf" in nested).toBe(true);
  });

  it("leaves tools without a top-level combinator unchanged (same reference)", () => {
    const plain = { name: "y", inputSchema: { type: "object", properties: {} } };
    expect(advertiseToolSchema(plain)).toBe(plain);
  });
});
