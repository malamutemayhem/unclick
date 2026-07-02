import { describe, it, expect } from "vitest";
import { jsoncrackFormat } from "./jsoncrack-tool.js";

describe("jsoncrack-tool", () => {
  it("formats valid JSON and returns stats", async () => {
    const r = await jsoncrackFormat({ json: '{"a":1,"b":[2,3]}' }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
    expect(r.formatted).toBeDefined();
    expect(r.stats).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("reports invalid JSON", async () => {
    const r = await jsoncrackFormat({ json: "{bad}" }) as Record<string, unknown>;
    expect(r.valid).toBe(false);
    expect(r.error).toBeDefined();
  });

  it("rejects missing json", async () => {
    const r = await jsoncrackFormat({}) as Record<string, unknown>;
    expect(r.error).toMatch(/json/i);
  });
});
