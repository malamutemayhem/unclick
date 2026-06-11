import { describe, it, expect } from "vitest";
import {
  coverage, durability, dryTime, voc,
  paCost, waterBased, forExterior, finish_,
  bestUse, paintTypes,
} from "../paint-type-calc.js";

describe("coverage", () => {
  it("chalk best coverage", () => {
    expect(coverage("chalk_matte_distressed")).toBeGreaterThan(coverage("elastomeric_flexible_crack"));
  });
});

describe("durability", () => {
  it("enamel most durable", () => {
    expect(durability("enamel_hard_gloss_finish")).toBeGreaterThan(durability("chalk_matte_distressed"));
  });
});

describe("dryTime", () => {
  it("latex dries fastest", () => {
    expect(dryTime("latex_acrylic_water_based")).toBeGreaterThan(dryTime("alkyd_oil_modified_solvent"));
  });
});

describe("voc", () => {
  it("alkyd highest voc", () => {
    expect(voc("alkyd_oil_modified_solvent")).toBeGreaterThan(voc("latex_acrylic_water_based"));
  });
});

describe("paCost", () => {
  it("elastomeric most expensive", () => {
    expect(paCost("elastomeric_flexible_crack")).toBeGreaterThan(paCost("latex_acrylic_water_based"));
  });
});

describe("waterBased", () => {
  it("latex is water based", () => {
    expect(waterBased("latex_acrylic_water_based")).toBe(true);
  });
  it("alkyd not water based", () => {
    expect(waterBased("alkyd_oil_modified_solvent")).toBe(false);
  });
});

describe("forExterior", () => {
  it("latex for exterior", () => {
    expect(forExterior("latex_acrylic_water_based")).toBe(true);
  });
  it("chalk not for exterior", () => {
    expect(forExterior("chalk_matte_distressed")).toBe(false);
  });
});

describe("finish_", () => {
  it("chalk has ultra matte finish", () => {
    expect(finish_("chalk_matte_distressed")).toBe("ultra_matte_flat_chalky_texture");
  });
});

describe("bestUse", () => {
  it("latex for wall ceiling trim", () => {
    expect(bestUse("latex_acrylic_water_based")).toBe("interior_exterior_wall_ceiling_trim");
  });
});

describe("paintTypes", () => {
  it("returns 5 types", () => {
    expect(paintTypes()).toHaveLength(5);
  });
});
