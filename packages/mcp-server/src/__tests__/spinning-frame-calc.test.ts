import { describe, it, expect } from "vitest";
import {
  speed, yarnStrength, yarnFineness, energyEfficiency,
  sfCost, continuous, forFineCount, twist,
  bestUse, spinningFrameTypes,
} from "../spinning-frame-calc.js";

describe("speed", () => {
  it("open end rotor fastest", () => {
    expect(speed("open_end_rotor")).toBeGreaterThan(speed("ring_spinning"));
  });
});

describe("yarnStrength", () => {
  it("ring spinning strongest yarn", () => {
    expect(yarnStrength("ring_spinning")).toBeGreaterThan(yarnStrength("friction_dref"));
  });
});

describe("yarnFineness", () => {
  it("ring spinning finest yarn", () => {
    expect(yarnFineness("ring_spinning")).toBeGreaterThan(yarnFineness("open_end_rotor"));
  });
});

describe("energyEfficiency", () => {
  it("open end rotor most energy efficient", () => {
    expect(energyEfficiency("open_end_rotor")).toBeGreaterThan(energyEfficiency("compact_spinning"));
  });
});

describe("sfCost", () => {
  it("air jet vortex most expensive", () => {
    expect(sfCost("air_jet_vortex")).toBeGreaterThan(sfCost("friction_dref"));
  });
});

describe("continuous", () => {
  it("open end rotor is continuous", () => {
    expect(continuous("open_end_rotor")).toBe(true);
  });
  it("ring spinning not continuous", () => {
    expect(continuous("ring_spinning")).toBe(false);
  });
});

describe("forFineCount", () => {
  it("ring spinning for fine count", () => {
    expect(forFineCount("ring_spinning")).toBe(true);
  });
  it("open end rotor not for fine count", () => {
    expect(forFineCount("open_end_rotor")).toBe(false);
  });
});

describe("twist", () => {
  it("air jet vortex uses air vortex nozzle", () => {
    expect(twist("air_jet_vortex")).toBe("air_vortex_nozzle_fasciated_wrap_fiber_around_parallel_core");
  });
});

describe("bestUse", () => {
  it("open end rotor for denim towel", () => {
    expect(bestUse("open_end_rotor")).toBe("coarse_medium_count_denim_towel_knitting_bulk_yarn");
  });
});

describe("spinningFrameTypes", () => {
  it("returns 5 types", () => {
    expect(spinningFrameTypes()).toHaveLength(5);
  });
});
