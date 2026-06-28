import { describe, it, expect } from "vitest";
import { hammingDistance } from "./hamming-tool.js";

describe("hamming-tool", () => {
  it("computes Hamming distance", async () => {
    const r = await hammingDistance({ text_a: "karolin", text_b: "kathrin" }) as Record<string, unknown>;
    expect(r.distance).toBe(3);
    expect(r.length).toBe(7);
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns 0 for identical strings", async () => {
    const r = await hammingDistance({ text_a: "abc", text_b: "abc" }) as Record<string, unknown>;
    expect(r.distance).toBe(0);
    expect(r.similarity).toBe(1);
  });

  it("rejects different lengths", async () => {
    const r = await hammingDistance({ text_a: "ab", text_b: "abc" }) as Record<string, unknown>;
    expect(r.error).toMatch(/same length/i);
  });

  it("rejects missing inputs", async () => {
    const r = await hammingDistance({ text_a: "hello" }) as Record<string, unknown>;
    expect(r.error).toMatch(/text_b/i);
  });
});
