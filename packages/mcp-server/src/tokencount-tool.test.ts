import { describe, it, expect } from "vitest";
import { tokencountEstimate } from "./tokencount-tool.js";

describe("tokencount-tool", () => {
  it("estimates token counts", async () => {
    const r = await tokencountEstimate({ text: "Hello world, this is a test." }) as Record<string, unknown>;
    expect(r.characters).toBe(28);
    expect(r.words).toBe(6);
    const est = r.estimated_tokens as Record<string, number>;
    expect(est.gpt4_approx).toBeGreaterThan(0);
    expect(est.claude_approx).toBeGreaterThan(0);
    expect(r.unclick_meta).toBeDefined();
  });

  it("counts lines", async () => {
    const r = await tokencountEstimate({ text: "line1\nline2\nline3" }) as Record<string, unknown>;
    expect(r.lines).toBe(3);
  });

  it("handles single character", async () => {
    const r = await tokencountEstimate({ text: "a" }) as Record<string, unknown>;
    expect(r.characters).toBe(1);
    expect(r.words).toBe(1);
  });

  it("rejects empty input", async () => {
    const r = await tokencountEstimate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
