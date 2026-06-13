import { describe, it, expect } from "vitest";
import { duvalFactorize } from "./duval-tool.js";

describe("duvalFactorize", () => {
  it("factorizes a single character", async () => {
    const r = (await duvalFactorize({ text: "a" })) as any;
    expect(r.factors).toEqual(["a"]);
    expect(r.factor_count).toBe(1);
  });

  it("factorizes a sorted string into individual characters", async () => {
    // "dcba" - each char is >= the next, so each char is its own Lyndon word
    const r = (await duvalFactorize({ text: "cba" })) as any;
    expect(r.factors).toEqual(["c", "b", "a"]);
    expect(r.factor_count).toBe(3);
  });

  it("keeps an already-Lyndon word as one factor", async () => {
    // "abc" is a Lyndon word (strictly less than all its proper suffixes)
    const r = (await duvalFactorize({ text: "abc" })) as any;
    expect(r.factors).toEqual(["abc"]);
    expect(r.factor_count).toBe(1);
  });

  it("handles repeated characters", async () => {
    // "aaaa" - each 'a' is its own factor since 'a' is not strictly less than 'a'
    const r = (await duvalFactorize({ text: "aaaa" })) as any;
    expect(r.factors).toEqual(["a", "a", "a", "a"]);
    expect(r.factor_count).toBe(4);
  });

  it("stamps meta", async () => {
    const r = (await duvalFactorize({ text: "abab" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
