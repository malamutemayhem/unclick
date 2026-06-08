import { describe, it, expect } from "vitest";
import { diffText } from "./difftext-tool.js";

describe("difftext-tool", () => {
  it("detects identical texts", async () => {
    const r = await diffText({ text_a: "hello\nworld", text_b: "hello\nworld" }) as Record<string, unknown>;
    expect(r.identical).toBe(true);
    expect(r.lines_added).toBe(0);
    expect(r.unclick_meta).toBeDefined();
  });

  it("detects changes", async () => {
    const r = await diffText({ text_a: "hello\nworld", text_b: "hello\nearth" }) as Record<string, unknown>;
    expect(r.identical).toBe(false);
    expect(r.lines_added).toBe(1);
    expect(r.lines_removed).toBe(1);
  });

  it("handles added lines", async () => {
    const r = await diffText({ text_a: "a", text_b: "a\nb\nc" }) as Record<string, unknown>;
    expect(r.lines_added).toBe(2);
    expect(r.lines_removed).toBe(0);
  });

  it("rejects both empty", async () => {
    const r = await diffText({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text_a/i);
  });
});
