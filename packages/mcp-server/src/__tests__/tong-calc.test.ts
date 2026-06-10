import { describe, it, expect } from "vitest";
import {
  reignLengthCm, jawWidthMm, jawThicknessMm, rivetDiameterMm,
  gripForceNewtons, stockSizeRangeMm, materialWeightG, forgingHeats,
  constructionTimeMinutes, tongJaws,
} from "../tong-calc.js";

describe("reignLengthCm", () => {
  it("scrolling tongs are longest", () => {
    expect(reignLengthCm("scrolling")).toBeGreaterThan(reignLengthCm("pickup"));
  });
});

describe("jawWidthMm", () => {
  it("3mm wider than stock", () => {
    expect(jawWidthMm(20)).toBe(23);
  });
});

describe("jawThicknessMm", () => {
  it("wolf jaw is thickest", () => {
    expect(jawThicknessMm("wolf_jaw")).toBeGreaterThan(jawThicknessMm("scrolling"));
  });
});

describe("rivetDiameterMm", () => {
  it("80% of jaw thickness", () => {
    expect(rivetDiameterMm(10)).toBe(8);
  });
});

describe("gripForceNewtons", () => {
  it("longer leverage = more force", () => {
    expect(gripForceNewtons(40, 100)).toBeGreaterThan(gripForceNewtons(20, 100));
  });
});

describe("stockSizeRangeMm", () => {
  it("pickup has widest range", () => {
    const pickup = stockSizeRangeMm("pickup");
    expect(pickup.max - pickup.min).toBeGreaterThan(
      stockSizeRangeMm("bolt").max - stockSizeRangeMm("bolt").min
    );
  });
});

describe("materialWeightG", () => {
  it("wolf jaw heaviest", () => {
    expect(materialWeightG("wolf_jaw")).toBeGreaterThan(materialWeightG("pickup"));
  });
});

describe("forgingHeats", () => {
  it("wolf jaw needs most heats", () => {
    expect(forgingHeats("wolf_jaw")).toBeGreaterThan(forgingHeats("pickup"));
  });
});

describe("constructionTimeMinutes", () => {
  it("wolf jaw takes longest", () => {
    expect(constructionTimeMinutes("wolf_jaw")).toBeGreaterThan(
      constructionTimeMinutes("pickup")
    );
  });
});

describe("tongJaws", () => {
  it("returns 5 types", () => {
    expect(tongJaws()).toHaveLength(5);
  });
});
