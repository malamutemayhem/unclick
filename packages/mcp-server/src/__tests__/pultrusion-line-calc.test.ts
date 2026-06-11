import { describe, it, expect } from "vitest";
import {
  profileAccuracy, throughput, fiberVolume, surfaceFinish,
  plCost, continuous, forStructural, lineConfig,
  bestUse, pultrusionLineTypes,
} from "../pultrusion-line-calc.js";

describe("profileAccuracy", () => {
  it("thermoplastic pultrude best profile accuracy", () => {
    expect(profileAccuracy("thermoplastic_pultrude")).toBeGreaterThan(profileAccuracy("curved_pultrude"));
  });
});

describe("throughput", () => {
  it("standard pultrude highest throughput", () => {
    expect(throughput("standard_pultrude")).toBeGreaterThan(throughput("curved_pultrude"));
  });
});

describe("fiberVolume", () => {
  it("pull wind best fiber volume", () => {
    expect(fiberVolume("pull_wind")).toBeGreaterThan(fiberVolume("standard_pultrude"));
  });
});

describe("surfaceFinish", () => {
  it("thermoplastic pultrude best surface finish", () => {
    expect(surfaceFinish("thermoplastic_pultrude")).toBeGreaterThan(surfaceFinish("standard_pultrude"));
  });
});

describe("plCost", () => {
  it("thermoplastic pultrude most expensive", () => {
    expect(plCost("thermoplastic_pultrude")).toBeGreaterThan(plCost("standard_pultrude"));
  });
});

describe("continuous", () => {
  it("standard pultrude is continuous", () => {
    expect(continuous("standard_pultrude")).toBe(true);
  });
  it("curved pultrude not continuous", () => {
    expect(continuous("curved_pultrude")).toBe(false);
  });
});

describe("forStructural", () => {
  it("standard pultrude for structural", () => {
    expect(forStructural("standard_pultrude")).toBe(true);
  });
  it("thermoplastic pultrude not for structural", () => {
    expect(forStructural("thermoplastic_pultrude")).toBe(false);
  });
});

describe("lineConfig", () => {
  it("pull braid uses braider over axial multi angle tube", () => {
    expect(lineConfig("pull_braid")).toBe("pull_braid_pultrusion_line_braider_over_axial_multi_angle_tube");
  });
});

describe("bestUse", () => {
  it("standard pultrude for structural beam roving resin die pull", () => {
    expect(bestUse("standard_pultrude")).toBe("structural_beam_standard_pultrusion_line_roving_resin_die_pull");
  });
});

describe("pultrusionLineTypes", () => {
  it("returns 5 types", () => {
    expect(pultrusionLineTypes()).toHaveLength(5);
  });
});
