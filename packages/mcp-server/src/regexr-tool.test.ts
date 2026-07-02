import { describe, it, expect } from "vitest";
import { regexTest } from "./regexr-tool.js";

describe("regexr-tool", () => {
  it("finds matches", async () => {
    const r = await regexTest({ pattern: "\\d+", text: "abc 123 def 456", flags: "g" }) as Record<string, unknown>;
    expect(r.matchCount).toBe(2);
    expect(r.fullMatch).toBe(true);
    expect(r.unclick_meta).toBeDefined();
  });

  it("reports no matches", async () => {
    const r = await regexTest({ pattern: "xyz", text: "abc def" }) as Record<string, unknown>;
    expect(r.matchCount).toBe(0);
    expect(r.fullMatch).toBe(false);
  });

  it("reports invalid regex", async () => {
    const r = await regexTest({ pattern: "(unclosed", text: "test" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid/i);
  });

  it("rejects missing pattern", async () => {
    const r = await regexTest({}) as Record<string, unknown>;
    expect(r.error).toMatch(/pattern/i);
  });
});
