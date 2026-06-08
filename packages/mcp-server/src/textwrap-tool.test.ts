import { describe, it, expect } from "vitest";
import { textWrap } from "./textwrap-tool.js";

describe("textwrap-tool", () => {
  it("wraps text at specified width", async () => {
    const r = await textWrap({ text: "This is a longer sentence that should be wrapped at a narrow width.", width: 20 }) as Record<string, unknown>;
    expect(r.line_count).toBeGreaterThan(1);
    expect(r.longest_line).toBeLessThanOrEqual(20);
    expect(r.unclick_meta).toBeDefined();
  });

  it("defaults to 80 width", async () => {
    const r = await textWrap({ text: "Short text." }) as Record<string, unknown>;
    expect(r.width).toBe(80);
    expect(r.line_count).toBe(1);
  });

  it("handles very narrow width", async () => {
    const r = await textWrap({ text: "Hello world", width: 10 }) as Record<string, unknown>;
    expect(r.line_count).toBe(2);
  });

  it("rejects empty input", async () => {
    const r = await textWrap({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
