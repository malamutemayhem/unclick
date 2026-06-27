import { describe, it, expect } from "vitest";
import {
  jointDepthMm, toolRequired, mortarConsumptionKgPerM2, weatherResistance,
  aestheticRating, difficultyRating, repointIntervalYears, rakeOutDepthMm,
  costPerM2, pointingStyles,
} from "../pointing-calc.js";

describe("jointDepthMm", () => {
  it("tuck is deepest", () => {
    expect(jointDepthMm("tuck")).toBeGreaterThan(jointDepthMm("flush"));
  });
  it("flush has zero depth", () => {
    expect(jointDepthMm("flush")).toBe(0);
  });
});

describe("toolRequired", () => {
  it("flush uses trowel", () => {
    expect(toolRequired("flush")).toBe("trowel");
  });
  it("recessed uses raker", () => {
    expect(toolRequired("recessed")).toBe("raker");
  });
});

describe("mortarConsumptionKgPerM2", () => {
  it("wider joints use more mortar", () => {
    expect(mortarConsumptionKgPerM2(12, 10)).toBeGreaterThan(
      mortarConsumptionKgPerM2(6, 10)
    );
  });
  it("zero spacing returns 0", () => {
    expect(mortarConsumptionKgPerM2(10, 0)).toBe(0);
  });
});

describe("weatherResistance", () => {
  it("weathered has best resistance", () => {
    expect(weatherResistance("weathered")).toBeGreaterThan(
      weatherResistance("recessed")
    );
  });
});

describe("aestheticRating", () => {
  it("tuck is most aesthetic", () => {
    expect(aestheticRating("tuck")).toBeGreaterThan(aestheticRating("flush"));
  });
});

describe("difficultyRating", () => {
  it("tuck is most difficult", () => {
    expect(difficultyRating("tuck")).toBeGreaterThan(
      difficultyRating("flush")
    );
  });
});

describe("repointIntervalYears", () => {
  it("tuck lasts longest", () => {
    expect(repointIntervalYears("tuck")).toBeGreaterThan(
      repointIntervalYears("recessed")
    );
  });
});

describe("rakeOutDepthMm", () => {
  it("returns 20", () => {
    expect(rakeOutDepthMm()).toBe(20);
  });
});

describe("costPerM2", () => {
  it("tuck is most expensive", () => {
    expect(costPerM2("tuck")).toBeGreaterThan(costPerM2("flush"));
  });
});

describe("pointingStyles", () => {
  it("returns 5 styles", () => {
    expect(pointingStyles()).toHaveLength(5);
  });
});
