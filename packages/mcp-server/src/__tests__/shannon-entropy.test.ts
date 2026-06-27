import { describe, it, expect } from "vitest";
import { ShannonEntropy } from "../shannon-entropy.js";

describe("ShannonEntropy", () => {
  it("uniform distribution has max entropy", () => {
    const h = ShannonEntropy.entropy("abcd");
    expect(h).toBeCloseTo(2, 5);
  });

  it("single character has zero entropy", () => {
    expect(ShannonEntropy.entropy("aaaa")).toBe(0);
  });

  it("empty string has zero entropy", () => {
    expect(ShannonEntropy.entropy("")).toBe(0);
  });

  it("entropyFromFrequencies matches", () => {
    const h = ShannonEntropy.entropyFromFrequencies([1, 1, 1, 1]);
    expect(h).toBeCloseTo(2, 5);
  });

  it("jointEntropy of identical data equals individual entropy", () => {
    const data = "aabb";
    const joint = ShannonEntropy.jointEntropy(data, data);
    const individual = ShannonEntropy.entropy(data);
    expect(joint).toBeCloseTo(individual, 5);
  });

  it("mutualInformation is non-negative", () => {
    const mi = ShannonEntropy.mutualInformation("abab", "abab");
    expect(mi).toBeGreaterThanOrEqual(-0.0001);
  });

  it("maxEntropy for binary is 1", () => {
    expect(ShannonEntropy.maxEntropy(2)).toBeCloseTo(1, 5);
  });

  it("redundancy is between 0 and 1", () => {
    const r = ShannonEntropy.redundancy("aaab");
    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThanOrEqual(1);
  });
});
