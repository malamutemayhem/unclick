import { describe, it, expect } from "vitest";
import { stringDistance } from "./levenshtein-tool.js";

describe("levenshtein-tool", () => {
  it("calculates edit distance", async () => {
    const r = await stringDistance({ a: "kitten", b: "sitting" }) as Record<string, unknown>;
    expect(r.distance).toBe(3);
    expect(r.similarity_percent).toBeGreaterThan(0);
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns 0 for identical strings", async () => {
    const r = await stringDistance({ a: "hello", b: "hello" }) as Record<string, unknown>;
    expect(r.distance).toBe(0);
    expect(r.similarity_percent).toBe(100);
  });

  it("handles empty vs non-empty", async () => {
    const r = await stringDistance({ a: "", b: "abc" }) as Record<string, unknown>;
    expect(r.distance).toBe(3);
  });

  it("supports case insensitive mode", async () => {
    const r = await stringDistance({ a: "Hello", b: "hello", case_sensitive: false }) as Record<string, unknown>;
    expect(r.distance).toBe(0);
  });

  it("rejects both empty", async () => {
    const r = await stringDistance({}) as Record<string, unknown>;
    expect(r.error).toMatch(/required/i);
  });
});
