import { describe, it, expect } from "vitest";
import {
  heatFlux, orientation, distance, reliability,
  hpCost, passive, forElectronics, working,
  bestUse, heatPipeSysTypes,
} from "../heat-pipe-sys-calc.js";

describe("heatFlux", () => {
  it("vapor chamber highest heat flux", () => {
    expect(heatFlux("vapor_chamber_flat")).toBeGreaterThan(heatFlux("pulsating_oscillating"));
  });
});

describe("orientation", () => {
  it("loop heat pipe best orientation freedom", () => {
    expect(orientation("loop_heat_pipe")).toBeGreaterThan(orientation("gravity_thermosyphon"));
  });
});

describe("distance", () => {
  it("loop heat pipe longest distance", () => {
    expect(distance("loop_heat_pipe")).toBeGreaterThan(distance("vapor_chamber_flat"));
  });
});

describe("reliability", () => {
  it("thermosyphon most reliable", () => {
    expect(reliability("gravity_thermosyphon")).toBeGreaterThan(reliability("pulsating_oscillating"));
  });
});

describe("hpCost", () => {
  it("loop heat pipe most expensive", () => {
    expect(hpCost("loop_heat_pipe")).toBeGreaterThan(hpCost("gravity_thermosyphon"));
  });
});

describe("passive", () => {
  it("all heat pipes are passive", () => {
    expect(passive("gravity_thermosyphon")).toBe(true);
    expect(passive("loop_heat_pipe")).toBe(true);
  });
});

describe("forElectronics", () => {
  it("sintered wick for electronics", () => {
    expect(forElectronics("sintered_wick_capillary")).toBe(true);
  });
  it("thermosyphon not for electronics", () => {
    expect(forElectronics("gravity_thermosyphon")).toBe(false);
  });
});

describe("working", () => {
  it("pulsating uses liquid slug vapor plug", () => {
    expect(working("pulsating_oscillating")).toBe("liquid_slug_vapor_plug_oscillate");
  });
});

describe("bestUse", () => {
  it("loop heat pipe for spacecraft", () => {
    expect(bestUse("loop_heat_pipe")).toBe("spacecraft_satellite_long_distance_cool");
  });
});

describe("heatPipeSysTypes", () => {
  it("returns 5 types", () => {
    expect(heatPipeSysTypes()).toHaveLength(5);
  });
});
