import { describe, it, expect } from "vitest";
import { emojiLookup } from "./emojilookup-tool.js";

describe("emojilookup-tool", () => {
  it("finds emojis by keyword", async () => {
    const r = await emojiLookup({ query: "heart" }) as Record<string, unknown>;
    expect(r.count).toBeGreaterThan(0);
    const matches = r.matches as { emoji: string; name: string }[];
    expect(matches[0].name).toContain("heart");
    expect(r.unclick_meta).toBeDefined();
  });

  it("finds fire emoji", async () => {
    const r = await emojiLookup({ query: "fire" }) as Record<string, unknown>;
    expect(r.count).toBeGreaterThan(0);
  });

  it("returns empty for no matches", async () => {
    const r = await emojiLookup({ query: "xyznonexistent" }) as Record<string, unknown>;
    expect(r.count).toBe(0);
  });

  it("rejects missing query", async () => {
    const r = await emojiLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
