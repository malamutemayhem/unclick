import { describe, it, expect } from "vitest";
import { weightedRandom, weightedRandomWithSeed, buildCdf, sampleCdf } from "../weighted-random.js";

describe("weighted-random", () => {
  describe("weightedRandom", () => {
    it("throws on empty items", () => {
      expect(() => weightedRandom([])).toThrow("Empty items");
    });

    it("returns a value from the items", () => {
      const items = [
        { value: "a", weight: 1 },
        { value: "b", weight: 1 },
      ];
      const result = weightedRandom(items);
      expect(["a", "b"]).toContain(result);
    });

    it("returns only item when single entry", () => {
      const result = weightedRandom([{ value: "x", weight: 5 }]);
      expect(result).toBe("x");
    });
  });

  describe("weightedRandomWithSeed", () => {
    it("picks first item when rand returns 0", () => {
      const items = [
        { value: "a", weight: 1 },
        { value: "b", weight: 1 },
      ];
      const result = weightedRandomWithSeed(items, () => 0);
      expect(result).toBe("a");
    });

    it("picks last item when rand returns near 1", () => {
      const items = [
        { value: "a", weight: 1 },
        { value: "b", weight: 1 },
      ];
      const result = weightedRandomWithSeed(items, () => 0.999);
      expect(result).toBe("b");
    });

    it("respects weights", () => {
      const items = [
        { value: "a", weight: 3 },
        { value: "b", weight: 7 },
      ];
      const result = weightedRandomWithSeed(items, () => 0.2);
      expect(result).toBe("a");
      const result2 = weightedRandomWithSeed(items, () => 0.5);
      expect(result2).toBe("b");
    });

    it("throws on empty", () => {
      expect(() => weightedRandomWithSeed([], () => 0.5)).toThrow("Empty items");
    });
  });

  describe("buildCdf / sampleCdf", () => {
    it("builds a CDF from items", () => {
      const items = [
        { value: "a", weight: 1 },
        { value: "b", weight: 3 },
      ];
      const cdf = buildCdf(items);
      expect(cdf.values).toEqual(["a", "b"]);
      expect(cdf.cdf[0]).toBeCloseTo(0.25);
      expect(cdf.cdf[1]).toBe(1);
    });

    it("samples from CDF deterministically", () => {
      const items = [
        { value: "x", weight: 1 },
        { value: "y", weight: 1 },
      ];
      const cdf = buildCdf(items);
      expect(sampleCdf(cdf, () => 0.1)).toBe("x");
      expect(sampleCdf(cdf, () => 0.9)).toBe("y");
    });

    it("throws on empty items for buildCdf", () => {
      expect(() => buildCdf([])).toThrow("Empty items");
    });

    it("last CDF entry is always 1", () => {
      const items = [
        { value: "a", weight: 1 },
        { value: "b", weight: 2 },
        { value: "c", weight: 3 },
      ];
      const cdf = buildCdf(items);
      expect(cdf.cdf[cdf.cdf.length - 1]).toBe(1);
    });
  });
});
