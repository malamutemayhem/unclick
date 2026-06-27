import { describe, it, expect } from "vitest";
import {
  pullSpeed, profileAccuracy, fiberLoading, surfaceFinish,
  pdCost, continuous, forStructural, dieConfig,
  bestUse, pultrusionDieTypes,
} from "../pultrusion-die-calc.js";

describe("pullSpeed", () => {
  it("continuous panel fastest pull speed", () => {
    expect(pullSpeed("continuous_panel")).toBeGreaterThan(pullSpeed("pull_wind_combo"));
  });
});

describe("profileAccuracy", () => {
  it("injection chamber best profile accuracy", () => {
    expect(profileAccuracy("injection_chamber")).toBeGreaterThan(profileAccuracy("continuous_panel"));
  });
});

describe("fiberLoading", () => {
  it("pull wind combo highest fiber loading", () => {
    expect(fiberLoading("pull_wind_combo")).toBeGreaterThan(fiberLoading("continuous_panel"));
  });
});

describe("surfaceFinish", () => {
  it("injection chamber best surface finish", () => {
    expect(surfaceFinish("injection_chamber")).toBeGreaterThan(surfaceFinish("open_bath_wetout"));
  });
});

describe("pdCost", () => {
  it("thermoplastic pull most expensive", () => {
    expect(pdCost("thermoplastic_pull")).toBeGreaterThan(pdCost("open_bath_wetout"));
  });
});

describe("continuous", () => {
  it("open bath wetout is continuous", () => {
    expect(continuous("open_bath_wetout")).toBe(true);
  });
  it("all types are continuous", () => {
    expect(continuous("continuous_panel")).toBe(true);
  });
});

describe("forStructural", () => {
  it("injection chamber for structural", () => {
    expect(forStructural("injection_chamber")).toBe(true);
  });
  it("continuous panel not for structural", () => {
    expect(forStructural("continuous_panel")).toBe(false);
  });
});

describe("dieConfig", () => {
  it("pull wind uses axial fiber hoop wind", () => {
    expect(dieConfig("pull_wind_combo")).toBe("pull_wind_combination_axial_fiber_hoop_wind_tube_pipe_strong");
  });
});

describe("bestUse", () => {
  it("open bath wetout for fiberglass rebar", () => {
    expect(bestUse("open_bath_wetout")).toBe("fiberglass_rebar_rod_channel_open_bath_standard_pultrusion");
  });
});

describe("pultrusionDieTypes", () => {
  it("returns 5 types", () => {
    expect(pultrusionDieTypes()).toHaveLength(5);
  });
});
