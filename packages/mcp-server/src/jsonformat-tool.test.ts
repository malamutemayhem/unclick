import { describe, it, expect } from "vitest";
import { jsonFormat } from "./jsonformat-tool.js";

describe("jsonformat-tool", () => {
  it("prettifies JSON", async () => {
    const r = await jsonFormat({ json: '{"a":1,"b":2}' }) as Record<string, unknown>;
    expect(r.formatted).toContain("\n");
    expect(r.type).toBe("object");
    expect(r.top_level_keys).toBe(2);
    expect(r.unclick_meta).toBeDefined();
  });

  it("minifies JSON", async () => {
    const r = await jsonFormat({ json: '{ "a": 1, "b": 2 }', minify: true }) as Record<string, unknown>;
    expect(r.formatted).toBe('{"a":1,"b":2}');
    expect(r.minified).toBe(true);
  });

  it("rejects invalid JSON", async () => {
    const r = await jsonFormat({ json: "{bad" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid json/i);
  });

  it("rejects missing input", async () => {
    const r = await jsonFormat({}) as Record<string, unknown>;
    expect(r.error).toMatch(/json/i);
  });
});
