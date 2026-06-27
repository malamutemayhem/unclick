import { describe, it, expect } from "vitest";
import {
  shrinkagePercent, firedSize, firingTempC, firingTimeHours,
  dryingDays, clayAmountKg, slabThicknessCm, coilDiameterCm,
  wheelSpeed, glazeVolumeMl, absorptionPercent, clayBodies,
} from "../terracotta-calc.js";

describe("shrinkagePercent", () => {
  it("porcelain shrinks most", () => {
    expect(shrinkagePercent("porcelain")).toBeGreaterThan(shrinkagePercent("terracotta"));
  });
});

describe("firedSize", () => {
  it("smaller after firing", () => {
    expect(firedSize(10, "stoneware")).toBeLessThan(10);
  });
});

describe("firingTempC", () => {
  it("porcelain hottest", () => {
    expect(firingTempC("porcelain")).toBeGreaterThan(firingTempC("earthenware"));
  });
});

describe("firingTimeHours", () => {
  it("raku fastest", () => {
    expect(firingTimeHours("raku")).toBeLessThan(firingTimeHours("stoneware"));
  });
});

describe("dryingDays", () => {
  it("thicker takes longer", () => {
    expect(dryingDays(3)).toBeGreaterThan(dryingDays(1));
  });
});

describe("clayAmountKg", () => {
  it("positive kg", () => {
    expect(clayAmountKg(500, 1.8)).toBeGreaterThan(0);
  });
});

describe("slabThicknessCm", () => {
  it("tile thinnest", () => {
    expect(slabThicknessCm("tile")).toBeLessThan(slabThicknessCm("pot"));
  });
});

describe("coilDiameterCm", () => {
  it("1.5x wall thickness", () => {
    expect(coilDiameterCm(2)).toBe(3);
  });
});

describe("wheelSpeed", () => {
  it("positive rpm", () => {
    expect(wheelSpeed(20)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(wheelSpeed(0)).toBe(0);
  });
});

describe("glazeVolumeMl", () => {
  it("positive ml", () => {
    expect(glazeVolumeMl(200)).toBeGreaterThan(0);
  });
});

describe("absorptionPercent", () => {
  it("porcelain least absorbent", () => {
    expect(absorptionPercent("porcelain")).toBeLessThan(absorptionPercent("earthenware"));
  });
});

describe("clayBodies", () => {
  it("returns 5 types", () => {
    expect(clayBodies()).toHaveLength(5);
  });
});
