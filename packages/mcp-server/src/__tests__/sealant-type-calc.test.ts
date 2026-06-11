import { describe, it, expect } from "vitest";
import {
  adhesion, flexibility, durability, uvResist,
  slCost, paintable, forGlazing, cure,
  bestUse, sealantTypes,
} from "../sealant-type-calc.js";

describe("adhesion", () => {
  it("polyurethane strongest adhesion", () => {
    expect(adhesion("polyurethane_pu_structural")).toBeGreaterThan(adhesion("acrylic_latex_paintable"));
  });
});

describe("flexibility", () => {
  it("silicone most flexible", () => {
    expect(flexibility("silicone_rtv_flexible")).toBeGreaterThan(flexibility("acrylic_latex_paintable"));
  });
});

describe("durability", () => {
  it("silicone most durable", () => {
    expect(durability("silicone_rtv_flexible")).toBeGreaterThan(durability("acrylic_latex_paintable"));
  });
});

describe("uvResist", () => {
  it("silicone best uv resistance", () => {
    expect(uvResist("silicone_rtv_flexible")).toBeGreaterThan(uvResist("polysulfide_fuel_resistant"));
  });
});

describe("slCost", () => {
  it("polysulfide most expensive", () => {
    expect(slCost("polysulfide_fuel_resistant")).toBeGreaterThan(slCost("acrylic_latex_paintable"));
  });
});

describe("paintable", () => {
  it("polyurethane is paintable", () => {
    expect(paintable("polyurethane_pu_structural")).toBe(true);
  });
  it("silicone not paintable", () => {
    expect(paintable("silicone_rtv_flexible")).toBe(false);
  });
});

describe("forGlazing", () => {
  it("silicone for glazing", () => {
    expect(forGlazing("silicone_rtv_flexible")).toBe(true);
  });
  it("acrylic not for glazing", () => {
    expect(forGlazing("acrylic_latex_paintable")).toBe(false);
  });
});

describe("cure", () => {
  it("butyl uses pressure sensitive", () => {
    expect(cure("butyl_rubber_tape_strip")).toBe("pressure_sensitive_no_cure_tacky");
  });
});

describe("bestUse", () => {
  it("silicone for glazing wet area", () => {
    expect(bestUse("silicone_rtv_flexible")).toBe("glazing_wet_area_high_movement_joint");
  });
});

describe("sealantTypes", () => {
  it("returns 5 types", () => {
    expect(sealantTypes()).toHaveLength(5);
  });
});
