import { describe, it, expect } from "vitest";
import { charFrequency } from "./charcount-tool.js";

describe("charcount-tool", () => {
  it("counts character frequency", async () => {
    const r = await charFrequency({ text: "hello" }) as Record<string, unknown>;
    expect(r.total_characters).toBe(5);
    const top = r.top_characters as Record<string, number>;
    expect(top["l"]).toBe(2);
    expect(r.unique_characters).toBe(4);
    expect(r.unclick_meta).toBeDefined();
  });

  it("provides breakdown by type", async () => {
    const r = await charFrequency({ text: "abc 123 !@" }) as Record<string, unknown>;
    const bd = r.breakdown as Record<string, number>;
    expect(bd.letters).toBe(3);
    expect(bd.digits).toBe(3);
    expect(bd.spaces).toBe(2);
    expect(bd.special).toBe(2);
  });

  it("supports case sensitive mode", async () => {
    const r = await charFrequency({ text: "AaA", case_sensitive: true }) as Record<string, unknown>;
    const top = r.top_characters as Record<string, number>;
    expect(top["A"]).toBe(2);
    expect(top["a"]).toBe(1);
  });

  it("rejects empty input", async () => {
    const r = await charFrequency({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
