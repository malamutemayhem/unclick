import { describe, it, expect } from "vitest";
import {
  precision, speed, sizeRange, wallControl,
  bmCost, multiLayer, forPet, material,
  bestUse, blowMoldTypes,
} from "../blow-mold-calc.js";

describe("precision", () => {
  it("injection blow most precise", () => {
    expect(precision("injection_blow_preform")).toBeGreaterThan(precision("accumulator_head_large"));
  });
});

describe("speed", () => {
  it("stretch blow pet fastest", () => {
    expect(speed("stretch_blow_pet")).toBeGreaterThan(speed("accumulator_head_large"));
  });
});

describe("sizeRange", () => {
  it("accumulator head largest range", () => {
    expect(sizeRange("accumulator_head_large")).toBeGreaterThan(sizeRange("injection_blow_preform"));
  });
});

describe("wallControl", () => {
  it("injection blow best wall control", () => {
    expect(wallControl("injection_blow_preform")).toBeGreaterThan(wallControl("accumulator_head_large"));
  });
});

describe("bmCost", () => {
  it("coextrusion most expensive", () => {
    expect(bmCost("coextrusion_multi_layer")).toBeGreaterThan(bmCost("extrusion_blow_continuous"));
  });
});

describe("multiLayer", () => {
  it("coextrusion is multi layer", () => {
    expect(multiLayer("coextrusion_multi_layer")).toBe(true);
  });
  it("extrusion blow not multi layer", () => {
    expect(multiLayer("extrusion_blow_continuous")).toBe(false);
  });
});

describe("forPet", () => {
  it("stretch blow for pet", () => {
    expect(forPet("stretch_blow_pet")).toBe(true);
  });
  it("extrusion blow not for pet", () => {
    expect(forPet("extrusion_blow_continuous")).toBe(false);
  });
});

describe("material", () => {
  it("coextrusion uses multi layer barrier", () => {
    expect(material("coextrusion_multi_layer")).toBe("multi_layer_barrier_evoh_nylon");
  });
});

describe("bestUse", () => {
  it("stretch blow for water soda pet", () => {
    expect(bestUse("stretch_blow_pet")).toBe("water_soda_pet_bottle_clear");
  });
});

describe("blowMoldTypes", () => {
  it("returns 5 types", () => {
    expect(blowMoldTypes()).toHaveLength(5);
  });
});
