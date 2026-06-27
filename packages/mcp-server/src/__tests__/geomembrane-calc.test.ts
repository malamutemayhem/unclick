import { describe, it, expect } from "vitest";
import {
  impermeability, durability, flexibility, uvResistance,
  gmCost, weldable, forExposed, thickness,
  bestUse, geomembraneTypes,
} from "../geomembrane-calc.js";

describe("impermeability", () => {
  it("hdpe most impermeable", () => {
    expect(impermeability("hdpe_smooth_liner")).toBeGreaterThan(impermeability("pvc_reinforced_pond"));
  });
});

describe("durability", () => {
  it("hdpe most durable", () => {
    expect(durability("hdpe_smooth_liner")).toBeGreaterThan(durability("pvc_reinforced_pond"));
  });
});

describe("flexibility", () => {
  it("epdm most flexible", () => {
    expect(flexibility("epdm_rubber_exposed")).toBeGreaterThan(flexibility("hdpe_smooth_liner"));
  });
});

describe("uvResistance", () => {
  it("epdm best uv resistance", () => {
    expect(uvResistance("epdm_rubber_exposed")).toBeGreaterThan(uvResistance("pvc_reinforced_pond"));
  });
});

describe("gmCost", () => {
  it("epdm most expensive", () => {
    expect(gmCost("epdm_rubber_exposed")).toBeGreaterThan(gmCost("pvc_reinforced_pond"));
  });
});

describe("weldable", () => {
  it("hdpe is weldable", () => {
    expect(weldable("hdpe_smooth_liner")).toBe(true);
  });
  it("epdm not weldable", () => {
    expect(weldable("epdm_rubber_exposed")).toBe(false);
  });
});

describe("forExposed", () => {
  it("epdm for exposed", () => {
    expect(forExposed("epdm_rubber_exposed")).toBe(true);
  });
  it("hdpe not exposed", () => {
    expect(forExposed("hdpe_smooth_liner")).toBe(false);
  });
});

describe("thickness", () => {
  it("lldpe uses flexible spec", () => {
    expect(thickness("lldpe_flexible_liner")).toBe("lldpe_40_60mil_flexible");
  });
});

describe("bestUse", () => {
  it("pvc for decorative pond", () => {
    expect(bestUse("pvc_reinforced_pond")).toBe("decorative_pond_water_feature");
  });
});

describe("geomembraneTypes", () => {
  it("returns 5 types", () => {
    expect(geomembraneTypes()).toHaveLength(5);
  });
});
