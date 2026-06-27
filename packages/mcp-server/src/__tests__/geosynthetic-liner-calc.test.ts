import { describe, it, expect } from "vitest";
import {
  chemResist, flexibility, puncture, uvResist,
  glCost, weldable, forLandfill, material,
  bestUse, geosyntheticLinerTypes,
} from "../geosynthetic-liner-calc.js";

describe("chemResist", () => {
  it("hdpe best chemical resistance", () => {
    expect(chemResist("hdpe_smooth_high_density")).toBeGreaterThan(chemResist("geoComposite_clay_gcl"));
  });
});

describe("flexibility", () => {
  it("epdm most flexible", () => {
    expect(flexibility("epdm_rubber_membrane")).toBeGreaterThan(flexibility("hdpe_smooth_high_density"));
  });
});

describe("puncture", () => {
  it("lldpe best puncture resistance", () => {
    expect(puncture("lldpe_flexible_textured")).toBeGreaterThan(puncture("geoComposite_clay_gcl"));
  });
});

describe("uvResist", () => {
  it("epdm best uv resistance", () => {
    expect(uvResist("epdm_rubber_membrane")).toBeGreaterThan(uvResist("geoComposite_clay_gcl"));
  });
});

describe("glCost", () => {
  it("epdm most expensive", () => {
    expect(glCost("epdm_rubber_membrane")).toBeGreaterThan(glCost("pvc_plasticized_flexible"));
  });
});

describe("weldable", () => {
  it("hdpe is weldable", () => {
    expect(weldable("hdpe_smooth_high_density")).toBe(true);
  });
  it("epdm not weldable", () => {
    expect(weldable("epdm_rubber_membrane")).toBe(false);
  });
});

describe("forLandfill", () => {
  it("hdpe for landfill", () => {
    expect(forLandfill("hdpe_smooth_high_density")).toBe(true);
  });
  it("pvc not for landfill", () => {
    expect(forLandfill("pvc_plasticized_flexible")).toBe(false);
  });
});

describe("material", () => {
  it("gcl uses bentonite clay geotextile", () => {
    expect(material("geoComposite_clay_gcl")).toBe("bentonite_clay_geotextile_sandwich");
  });
});

describe("bestUse", () => {
  it("hdpe for landfill primary liner", () => {
    expect(bestUse("hdpe_smooth_high_density")).toBe("landfill_primary_liner_leachate_pond");
  });
});

describe("geosyntheticLinerTypes", () => {
  it("returns 5 types", () => {
    expect(geosyntheticLinerTypes()).toHaveLength(5);
  });
});
