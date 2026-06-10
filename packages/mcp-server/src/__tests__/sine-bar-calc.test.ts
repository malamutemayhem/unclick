import { describe, it, expect } from "vitest";
import {
  angleAccuracy, workCapacity, setupSpeed, holdForce,
  barCost, magnetic, compound, centerDistance,
  bestUse, sineBars,
} from "../sine-bar-calc.js";

describe("angleAccuracy", () => {
  it("standard 10inch most accurate", () => {
    expect(angleAccuracy("standard_10inch")).toBeGreaterThan(angleAccuracy("mini_sine_vise"));
  });
});

describe("workCapacity", () => {
  it("compound sine plate highest capacity", () => {
    expect(workCapacity("compound_sine_plate")).toBeGreaterThan(workCapacity("mini_sine_vise"));
  });
});

describe("setupSpeed", () => {
  it("mini sine vise fastest setup", () => {
    expect(setupSpeed("mini_sine_vise")).toBeGreaterThan(setupSpeed("compound_sine_plate"));
  });
});

describe("holdForce", () => {
  it("magnetic sine chuck strongest hold", () => {
    expect(holdForce("magnetic_sine_chuck")).toBeGreaterThan(holdForce("standard_5inch"));
  });
});

describe("barCost", () => {
  it("compound sine plate most expensive", () => {
    expect(barCost("compound_sine_plate")).toBeGreaterThan(barCost("standard_5inch"));
  });
});

describe("magnetic", () => {
  it("magnetic sine chuck is magnetic", () => {
    expect(magnetic("magnetic_sine_chuck")).toBe(true);
  });
  it("standard 5inch not magnetic", () => {
    expect(magnetic("standard_5inch")).toBe(false);
  });
});

describe("compound", () => {
  it("compound sine plate is compound", () => {
    expect(compound("compound_sine_plate")).toBe(true);
  });
  it("standard 10inch not compound", () => {
    expect(compound("standard_10inch")).toBe(false);
  });
});

describe("centerDistance", () => {
  it("standard 5inch uses 5 inch center", () => {
    expect(centerDistance("standard_5inch")).toBe("5_inch_center");
  });
});

describe("bestUse", () => {
  it("magnetic sine chuck best for surface grind angle", () => {
    expect(bestUse("magnetic_sine_chuck")).toBe("surface_grind_angle");
  });
});

describe("sineBars", () => {
  it("returns 5 types", () => {
    expect(sineBars()).toHaveLength(5);
  });
});
