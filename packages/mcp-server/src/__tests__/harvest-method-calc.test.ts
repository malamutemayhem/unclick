import { describe, it, expect } from "vitest";
import {
  speedHectaresPerHour, cropDamage, laborIntensity,
  fuelConsumption, grainLossPercent, selectiveHarvest,
  requiresTractor, bestCrop, capitalCost, harvestMethods,
} from "../harvest-method-calc.js";

describe("speedHectaresPerHour", () => {
  it("stripper header is fastest", () => {
    expect(speedHectaresPerHour("stripper_header")).toBeGreaterThan(
      speedHectaresPerHour("hand_picking")
    );
  });
});

describe("cropDamage", () => {
  it("hand picking causes least damage", () => {
    expect(cropDamage("hand_picking")).toBeLessThan(
      cropDamage("mechanical_shaker")
    );
  });
});

describe("laborIntensity", () => {
  it("hand picking is most labor intensive", () => {
    expect(laborIntensity("hand_picking")).toBeGreaterThan(
      laborIntensity("combine")
    );
  });
});

describe("fuelConsumption", () => {
  it("hand picking uses no fuel", () => {
    expect(fuelConsumption("hand_picking")).toBe(0);
  });
  it("combine uses most fuel", () => {
    expect(fuelConsumption("combine")).toBeGreaterThan(
      fuelConsumption("swathing")
    );
  });
});

describe("grainLossPercent", () => {
  it("hand picking loses least grain", () => {
    expect(grainLossPercent("hand_picking")).toBeLessThan(
      grainLossPercent("mechanical_shaker")
    );
  });
});

describe("selectiveHarvest", () => {
  it("hand picking is selective", () => {
    expect(selectiveHarvest("hand_picking")).toBe(true);
  });
  it("combine is not", () => {
    expect(selectiveHarvest("combine")).toBe(false);
  });
});

describe("requiresTractor", () => {
  it("mechanical shaker requires tractor", () => {
    expect(requiresTractor("mechanical_shaker")).toBe(true);
  });
  it("combine does not (self propelled)", () => {
    expect(requiresTractor("combine")).toBe(false);
  });
});

describe("bestCrop", () => {
  it("mechanical shaker for nuts", () => {
    expect(bestCrop("mechanical_shaker")).toBe("nuts");
  });
});

describe("capitalCost", () => {
  it("combine costs most", () => {
    expect(capitalCost("combine")).toBeGreaterThan(
      capitalCost("hand_picking")
    );
  });
});

describe("harvestMethods", () => {
  it("returns 5 types", () => {
    expect(harvestMethods()).toHaveLength(5);
  });
});
