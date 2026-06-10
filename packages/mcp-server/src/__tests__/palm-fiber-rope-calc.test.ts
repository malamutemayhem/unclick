import { describe, it, expect } from "vitest";
import {
  breakStrengthKg, fiberLengthCm, waterResistance,
  rottingResistance, flexibility, saltWaterSafe,
  primaryUse, processingHours, costPerKg, palmFibers,
} from "../palm-fiber-rope-calc.js";

describe("breakStrengthKg", () => {
  it("coir is strongest", () => {
    expect(breakStrengthKg("coir")).toBeGreaterThan(
      breakStrengthKg("raffia")
    );
  });
});

describe("fiberLengthCm", () => {
  it("raffia has longest fibers", () => {
    expect(fiberLengthCm("raffia")).toBeGreaterThan(
      fiberLengthCm("coir")
    );
  });
});

describe("waterResistance", () => {
  it("coir has best water resistance", () => {
    expect(waterResistance("coir")).toBeGreaterThan(
      waterResistance("raffia")
    );
  });
});

describe("rottingResistance", () => {
  it("coir resists rotting best", () => {
    expect(rottingResistance("coir")).toBeGreaterThan(
      rottingResistance("raffia")
    );
  });
});

describe("flexibility", () => {
  it("raffia is most flexible", () => {
    expect(flexibility("raffia")).toBeGreaterThan(
      flexibility("palmyra")
    );
  });
});

describe("saltWaterSafe", () => {
  it("coir is salt water safe", () => {
    expect(saltWaterSafe("coir")).toBe(true);
  });
  it("raffia is not", () => {
    expect(saltWaterSafe("raffia")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("coir is for marine rope", () => {
    expect(primaryUse("coir")).toBe("marine_rope");
  });
});

describe("processingHours", () => {
  it("coir takes longest to process", () => {
    expect(processingHours("coir")).toBeGreaterThan(
      processingHours("raffia")
    );
  });
});

describe("costPerKg", () => {
  it("raffia costs most", () => {
    expect(costPerKg("raffia")).toBeGreaterThan(
      costPerKg("coir")
    );
  });
});

describe("palmFibers", () => {
  it("returns 5 fibers", () => {
    expect(palmFibers()).toHaveLength(5);
  });
});
