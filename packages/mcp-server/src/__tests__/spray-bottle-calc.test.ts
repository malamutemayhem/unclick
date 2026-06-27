import { describe, it, expect } from "vitest";
import {
  sprayPattern, durability, ergonomics, chemicalResist,
  bottleCost, adjustableNozzle, refillable, bottleMaterial,
  bestUse, sprayBottles,
} from "../spray-bottle-calc.js";

describe("sprayPattern", () => {
  it("continuous mist fine best spray pattern", () => {
    expect(sprayPattern("continuous_mist_fine")).toBeGreaterThan(sprayPattern("foam_pump_thick"));
  });
});

describe("durability", () => {
  it("industrial pressure steel most durable", () => {
    expect(durability("industrial_pressure_steel")).toBeGreaterThan(durability("glass_amber_essential"));
  });
});

describe("ergonomics", () => {
  it("continuous mist fine best ergonomics", () => {
    expect(ergonomics("continuous_mist_fine")).toBeGreaterThan(ergonomics("industrial_pressure_steel"));
  });
});

describe("chemicalResist", () => {
  it("glass amber essential best chemical resistance", () => {
    expect(chemicalResist("glass_amber_essential")).toBeGreaterThan(chemicalResist("continuous_mist_fine"));
  });
});

describe("bottleCost", () => {
  it("industrial pressure steel most expensive", () => {
    expect(bottleCost("industrial_pressure_steel")).toBeGreaterThan(bottleCost("trigger_standard_plastic"));
  });
});

describe("adjustableNozzle", () => {
  it("trigger standard plastic has adjustable nozzle", () => {
    expect(adjustableNozzle("trigger_standard_plastic")).toBe(true);
  });
  it("continuous mist fine does not", () => {
    expect(adjustableNozzle("continuous_mist_fine")).toBe(false);
  });
});

describe("refillable", () => {
  it("all types are refillable", () => {
    expect(refillable("trigger_standard_plastic")).toBe(true);
    expect(refillable("glass_amber_essential")).toBe(true);
  });
});

describe("bottleMaterial", () => {
  it("glass amber essential uses uv block amber glass", () => {
    expect(bottleMaterial("glass_amber_essential")).toBe("uv_block_amber_glass");
  });
});

describe("bestUse", () => {
  it("continuous mist fine best for plant misting hair care", () => {
    expect(bestUse("continuous_mist_fine")).toBe("plant_misting_hair_care");
  });
});

describe("sprayBottles", () => {
  it("returns 5 types", () => {
    expect(sprayBottles()).toHaveLength(5);
  });
});
