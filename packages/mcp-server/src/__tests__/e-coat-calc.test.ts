import { describe, it, expect } from "vitest";
import {
  throwPower, throughput, corrosionResist, filmUniformity,
  ecCost, cathodic, forAutomotive, coatConfig,
  bestUse, eCoatTypes,
} from "../e-coat-calc.js";

describe("throwPower", () => {
  it("cathodic epoxy best throw power", () => {
    expect(throwPower("cathodic_epoxy")).toBeGreaterThan(throwPower("anodic_acrylic"));
  });
});

describe("throughput", () => {
  it("cathodic epoxy highest throughput", () => {
    expect(throughput("cathodic_epoxy")).toBeGreaterThan(throughput("autophoretic"));
  });
});

describe("corrosionResist", () => {
  it("cathodic epoxy best corrosion resist", () => {
    expect(corrosionResist("cathodic_epoxy")).toBeGreaterThan(corrosionResist("anodic_acrylic"));
  });
});

describe("filmUniformity", () => {
  it("cathodic epoxy best film uniformity", () => {
    expect(filmUniformity("cathodic_epoxy")).toBeGreaterThan(filmUniformity("anodic_acrylic"));
  });
});

describe("ecCost", () => {
  it("cathodic epoxy most expensive", () => {
    expect(ecCost("cathodic_epoxy")).toBeGreaterThan(ecCost("anodic_epoxy"));
  });
});

describe("cathodic", () => {
  it("cathodic epoxy is cathodic", () => {
    expect(cathodic("cathodic_epoxy")).toBe(true);
  });
  it("anodic epoxy not cathodic", () => {
    expect(cathodic("anodic_epoxy")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("cathodic epoxy for automotive", () => {
    expect(forAutomotive("cathodic_epoxy")).toBe(true);
  });
  it("anodic epoxy not for automotive", () => {
    expect(forAutomotive("anodic_epoxy")).toBe(false);
  });
});

describe("coatConfig", () => {
  it("autophoretic uses chemical immersion no electric iron steel", () => {
    expect(coatConfig("autophoretic")).toBe("autophoretic_e_coat_chemical_immersion_no_electric_iron_steel");
  });
});

describe("bestUse", () => {
  it("cathodic epoxy for auto body high throw corrosion primer", () => {
    expect(bestUse("cathodic_epoxy")).toBe("auto_body_cathodic_epoxy_e_coat_high_throw_corrosion_primer");
  });
});

describe("eCoatTypes", () => {
  it("returns 5 types", () => {
    expect(eCoatTypes()).toHaveLength(5);
  });
});
