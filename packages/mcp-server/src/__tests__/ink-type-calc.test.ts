import { describe, it, expect } from "vitest";
import {
  colorVibrancy, lightfastnessYears, waterResistance,
  dryingSpeedRating, environmentalImpact, odorless,
  outdoorSuitable, bestApplication, costPerLiter, inkTypes,
} from "../ink-type-calc.js";

describe("colorVibrancy", () => {
  it("dye based is most vibrant", () => {
    expect(colorVibrancy("dye_based")).toBeGreaterThan(
      colorVibrancy("solvent")
    );
  });
});

describe("lightfastnessYears", () => {
  it("pigment lasts longest", () => {
    expect(lightfastnessYears("pigment")).toBeGreaterThan(
      lightfastnessYears("dye_based")
    );
  });
});

describe("waterResistance", () => {
  it("uv curable is most water resistant", () => {
    expect(waterResistance("uv_curable")).toBeGreaterThan(
      waterResistance("dye_based")
    );
  });
});

describe("dryingSpeedRating", () => {
  it("uv curable dries fastest", () => {
    expect(dryingSpeedRating("uv_curable")).toBeGreaterThan(
      dryingSpeedRating("dye_based")
    );
  });
});

describe("environmentalImpact", () => {
  it("latex has best environmental impact", () => {
    expect(environmentalImpact("latex")).toBeGreaterThan(
      environmentalImpact("solvent")
    );
  });
});

describe("odorless", () => {
  it("latex is odorless", () => {
    expect(odorless("latex")).toBe(true);
  });
  it("solvent is not", () => {
    expect(odorless("solvent")).toBe(false);
  });
});

describe("outdoorSuitable", () => {
  it("solvent is outdoor suitable", () => {
    expect(outdoorSuitable("solvent")).toBe(true);
  });
  it("dye based is not", () => {
    expect(outdoorSuitable("dye_based")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("pigment for fine art", () => {
    expect(bestApplication("pigment")).toBe("fine_art");
  });
});

describe("costPerLiter", () => {
  it("uv curable costs most", () => {
    expect(costPerLiter("uv_curable")).toBeGreaterThan(
      costPerLiter("dye_based")
    );
  });
});

describe("inkTypes", () => {
  it("returns 5 types", () => {
    expect(inkTypes()).toHaveLength(5);
  });
});
