import { describe, it, expect } from "vitest";
import { ADVERTISED_TOOLS_SAFE, advertiseToolSchema } from "../server.js";
import { ADDITIONAL_TOOLS } from "../tool-wiring.js";

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

  it("the known catalog offenders are cleaned by advertiseToolSchema but keep their properties", () => {
    // These integration tools carry a top-level combinator. They are no longer
    // advertised in tools/list (only reachable via name / unclick_call), but the
    // sanitizer must still strip the combinator while preserving properties for
    // any surface that advertises them.
    const names = ["legalpass_run", "legalpass_save_pack", "flowpass_register_pack", "sloppass_run"];
    for (const name of names) {
      const original = ADDITIONAL_TOOLS.find((t: AdvertisedTool) => t.name === name);
      expect(original, `${name} should exist in the integration catalog`).toBeTruthy();
      const safe = advertiseToolSchema(original as AdvertisedTool);
      const schema = safe.inputSchema as Record<string, unknown>;
      expect(hasTopLevelCombinator(schema)).toBe(false);
      expect(schema.properties, `${name} should keep its properties`).toBeTruthy();
    }
  });

  it("does not mutate the original schemas (runtime validation stays intact)", () => {
    // At least one original still carries the top-level anyOf used by AJV.
    const original = ADDITIONAL_TOOLS.find((t: AdvertisedTool) => t.name === "sloppass_run");
    expect(hasTopLevelCombinator(original?.inputSchema)).toBe(true);
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
