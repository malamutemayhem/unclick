import { describe, it, expect } from "vitest";
import {
  swingControl, gripComfort, weightRange, floorSafety,
  bellCost, uniformShape, colorCoded, handleFinish,
  bestTraining, kettlebells,
} from "../kettlebell-calc.js";

describe("swingControl", () => {
  it("competition steel best swing control", () => {
    expect(swingControl("competition_steel")).toBeGreaterThan(swingControl("vinyl_coated"));
  });
});

describe("gripComfort", () => {
  it("powder coat premium most comfortable grip", () => {
    expect(gripComfort("powder_coat_premium")).toBeGreaterThan(gripComfort("adjustable_dial"));
  });
});

describe("weightRange", () => {
  it("adjustable dial widest weight range", () => {
    expect(weightRange("adjustable_dial")).toBeGreaterThan(weightRange("cast_iron_standard"));
  });
});

describe("floorSafety", () => {
  it("vinyl coated safest for floors", () => {
    expect(floorSafety("vinyl_coated")).toBeGreaterThan(floorSafety("cast_iron_standard"));
  });
});

describe("bellCost", () => {
  it("adjustable dial most expensive", () => {
    expect(bellCost("adjustable_dial")).toBeGreaterThan(bellCost("vinyl_coated"));
  });
});

describe("uniformShape", () => {
  it("competition steel has uniform shape", () => {
    expect(uniformShape("competition_steel")).toBe(true);
  });
  it("cast iron standard does not", () => {
    expect(uniformShape("cast_iron_standard")).toBe(false);
  });
});

describe("colorCoded", () => {
  it("vinyl coated is color coded", () => {
    expect(colorCoded("vinyl_coated")).toBe(true);
  });
  it("powder coat premium is not", () => {
    expect(colorCoded("powder_coat_premium")).toBe(false);
  });
});

describe("handleFinish", () => {
  it("competition steel uses chrome plated 33mm", () => {
    expect(handleFinish("competition_steel")).toBe("chrome_plated_33mm");
  });
});

describe("bestTraining", () => {
  it("powder coat premium for crossfit functional training", () => {
    expect(bestTraining("powder_coat_premium")).toBe("crossfit_functional_training");
  });
});

describe("kettlebells", () => {
  it("returns 5 types", () => {
    expect(kettlebells()).toHaveLength(5);
  });
});
