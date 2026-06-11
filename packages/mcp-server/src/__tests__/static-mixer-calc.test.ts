import { describe, it, expect } from "vitest";
import {
  mixQuality, pressureDrop, residence, maintenance,
  smCost, noMovingParts, forLaminar, element,
  bestUse, staticMixerTypes,
} from "../static-mixer-calc.js";

describe("mixQuality", () => {
  it("smx cross bar best mix quality", () => {
    expect(mixQuality("smx_cross_bar")).toBeGreaterThan(mixQuality("injector_mixer_inline"));
  });
});

describe("pressureDrop", () => {
  it("smx cross bar highest pressure drop", () => {
    expect(pressureDrop("smx_cross_bar")).toBeGreaterThan(pressureDrop("injector_mixer_inline"));
  });
});

describe("residence", () => {
  it("kenics longest residence time", () => {
    expect(residence("kenics_alternating")).toBeGreaterThan(residence("injector_mixer_inline"));
  });
});

describe("maintenance", () => {
  it("all static mixers low maintenance", () => {
    expect(maintenance("helical_element_twist")).toBe(10);
    expect(maintenance("injector_mixer_inline")).toBe(10);
  });
});

describe("smCost", () => {
  it("smx cross bar most expensive", () => {
    expect(smCost("smx_cross_bar")).toBeGreaterThan(smCost("injector_mixer_inline"));
  });
});

describe("noMovingParts", () => {
  it("all static mixers have no moving parts", () => {
    expect(noMovingParts("helical_element_twist")).toBe(true);
    expect(noMovingParts("smx_cross_bar")).toBe(true);
  });
});

describe("forLaminar", () => {
  it("helical element for laminar flow", () => {
    expect(forLaminar("helical_element_twist")).toBe(true);
  });
  it("plate type not for laminar", () => {
    expect(forLaminar("plate_type_corrugated")).toBe(false);
  });
});

describe("element", () => {
  it("kenics uses twisted alternating element", () => {
    expect(element("kenics_alternating")).toBe("twisted_element_alternating_90_degree");
  });
});

describe("bestUse", () => {
  it("smx cross bar for high viscosity ratio", () => {
    expect(bestUse("smx_cross_bar")).toBe("high_viscosity_ratio_color_additive_mix");
  });
});

describe("staticMixerTypes", () => {
  it("returns 5 types", () => {
    expect(staticMixerTypes()).toHaveLength(5);
  });
});
