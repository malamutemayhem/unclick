import { describe, it, expect } from "vitest";
import {
  picksPerCm, weftLengthM, weftYarnWeightG, colorChanges, beatForce,
  coveragePercent, drawInPercent, weavingSpeedCmPerHour, costFactor,
  weftPatterns,
} from "../weft-calc.js";

describe("picksPerCm", () => {
  it("satin has most picks", () => {
    expect(picksPerCm("satin")).toBeGreaterThan(picksPerCm("leno"));
  });
});

describe("weftLengthM", () => {
  it("wider cloth = more weft", () => {
    expect(weftLengthM(100, 100, 10)).toBeGreaterThan(weftLengthM(50, 100, 10));
  });
});

describe("weftYarnWeightG", () => {
  it("lower count = heavier", () => {
    expect(weftYarnWeightG(100, 10)).toBeGreaterThan(weftYarnWeightG(100, 20));
  });
  it("zero count returns 0", () => {
    expect(weftYarnWeightG(100, 0)).toBe(0);
  });
});

describe("colorChanges", () => {
  it("basket has most color changes", () => {
    expect(colorChanges("basket")).toBeGreaterThan(colorChanges("tabby"));
  });
});

describe("beatForce", () => {
  it("basket needs strongest beat", () => {
    expect(beatForce("basket")).toBeGreaterThan(beatForce("leno"));
  });
});

describe("coveragePercent", () => {
  it("satin has highest coverage", () => {
    expect(coveragePercent("satin")).toBeGreaterThan(coveragePercent("leno"));
  });
});

describe("drawInPercent", () => {
  it("basket has most draw-in", () => {
    expect(drawInPercent("basket")).toBeGreaterThan(drawInPercent("leno"));
  });
});

describe("weavingSpeedCmPerHour", () => {
  it("basket weaves fastest", () => {
    expect(weavingSpeedCmPerHour("basket")).toBeGreaterThan(
      weavingSpeedCmPerHour("leno")
    );
  });
});

describe("costFactor", () => {
  it("leno is most expensive", () => {
    expect(costFactor("leno")).toBeGreaterThan(costFactor("tabby"));
  });
});

describe("weftPatterns", () => {
  it("returns 5 patterns", () => {
    expect(weftPatterns()).toHaveLength(5);
  });
});
