import { describe, it, expect } from "vitest";
import {
  precision, speed, thickness, heatAffect,
  wjCost, abrasive, forMetal, pressure,
  bestUse, waterJetTypes,
} from "../water-jet-calc.js";

describe("precision", () => {
  it("micro abrasive most precise", () => {
    expect(precision("micro_abrasive_precision")).toBeGreaterThan(precision("robotic_surface_prep"));
  });
});

describe("speed", () => {
  it("pure water fastest", () => {
    expect(speed("pure_water_high_pressure")).toBeGreaterThan(speed("micro_abrasive_precision"));
  });
});

describe("thickness", () => {
  it("abrasive garnet thickest cut", () => {
    expect(thickness("abrasive_garnet_cutting")).toBeGreaterThan(thickness("pure_water_high_pressure"));
  });
});

describe("heatAffect", () => {
  it("all have no heat affect zone", () => {
    expect(heatAffect("pure_water_high_pressure")).toBe(10);
  });
  it("abrasive no heat affect", () => {
    expect(heatAffect("abrasive_garnet_cutting")).toBe(10);
  });
});

describe("wjCost", () => {
  it("dynamic 5 axis most expensive", () => {
    expect(wjCost("dynamic_5_axis_bevel")).toBeGreaterThan(wjCost("pure_water_high_pressure"));
  });
});

describe("abrasive", () => {
  it("garnet uses abrasive", () => {
    expect(abrasive("abrasive_garnet_cutting")).toBe(true);
  });
  it("pure water no abrasive", () => {
    expect(abrasive("pure_water_high_pressure")).toBe(false);
  });
});

describe("forMetal", () => {
  it("garnet for metal", () => {
    expect(forMetal("abrasive_garnet_cutting")).toBe(true);
  });
  it("pure water not metal", () => {
    expect(forMetal("pure_water_high_pressure")).toBe(false);
  });
});

describe("pressure", () => {
  it("dynamic uses taper compensation", () => {
    expect(pressure("dynamic_5_axis_bevel")).toBe("87000_psi_taper_compensation");
  });
});

describe("bestUse", () => {
  it("micro for medical device", () => {
    expect(bestUse("micro_abrasive_precision")).toBe("medical_device_electronics_fine");
  });
});

describe("waterJetTypes", () => {
  it("returns 5 types", () => {
    expect(waterJetTypes()).toHaveLength(5);
  });
});
