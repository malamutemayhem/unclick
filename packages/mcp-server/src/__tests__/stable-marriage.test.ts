import { describe, it, expect } from "vitest";
import { StableMarriage } from "../stable-marriage.js";

describe("StableMarriage", () => {
  it("produces a valid matching", () => {
    const menPrefs = [[0, 1, 2], [1, 0, 2], [0, 2, 1]];
    const womenPrefs = [[1, 0, 2], [0, 1, 2], [0, 2, 1]];
    const { manToWoman } = StableMarriage.galeShapley(menPrefs, womenPrefs);
    const assigned = new Set(manToWoman);
    expect(assigned.size).toBe(3);
  });

  it("produces a stable matching", () => {
    const menPrefs = [[0, 1, 2], [1, 0, 2], [0, 2, 1]];
    const womenPrefs = [[1, 0, 2], [0, 1, 2], [0, 2, 1]];
    const { manToWoman } = StableMarriage.galeShapley(menPrefs, womenPrefs);
    expect(StableMarriage.isStable(manToWoman, menPrefs, womenPrefs)).toBe(true);
  });

  it("two-person case", () => {
    const menPrefs = [[0, 1], [1, 0]];
    const womenPrefs = [[0, 1], [1, 0]];
    const { manToWoman } = StableMarriage.galeShapley(menPrefs, womenPrefs);
    expect(manToWoman).toEqual([0, 1]);
  });

  it("womanToMan is inverse of manToWoman", () => {
    const menPrefs = [[0, 1], [1, 0]];
    const womenPrefs = [[1, 0], [0, 1]];
    const { manToWoman, womanToMan } = StableMarriage.galeShapley(menPrefs, womenPrefs);
    for (let m = 0; m < 2; m++) {
      expect(womanToMan[manToWoman[m]]).toBe(m);
    }
  });

  it("isStable detects instability", () => {
    const menPrefs = [[0, 1], [0, 1]];
    const womenPrefs = [[0, 1], [0, 1]];
    const unstable = [1, 0];
    expect(StableMarriage.isStable(unstable, menPrefs, womenPrefs)).toBe(false);
  });

  it("single-person case", () => {
    const menPrefs = [[0]];
    const womenPrefs = [[0]];
    const { manToWoman } = StableMarriage.galeShapley(menPrefs, womenPrefs);
    expect(manToWoman).toEqual([0]);
  });
});
