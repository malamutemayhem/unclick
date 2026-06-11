import { describe, it, expect } from "vitest";
import {
  crystalGrowth, energyEfficiency, throughput, grainControl,
  vpCost, continuous, forRefined, panConfig,
  bestUse, vacuumPanTypes,
} from "../vacuum-pan-calc.js";

describe("crystalGrowth", () => {
  it("batch calandria best crystal growth", () => {
    expect(crystalGrowth("batch_calandria")).toBeGreaterThan(crystalGrowth("falling_film"));
  });
});

describe("energyEfficiency", () => {
  it("falling film best energy efficiency", () => {
    expect(energyEfficiency("falling_film")).toBeGreaterThan(energyEfficiency("batch_calandria"));
  });
});

describe("throughput", () => {
  it("continuous vertical highest throughput", () => {
    expect(throughput("continuous_vertical")).toBeGreaterThan(throughput("batch_calandria"));
  });
});

describe("grainControl", () => {
  it("batch calandria best grain control", () => {
    expect(grainControl("batch_calandria")).toBeGreaterThan(grainControl("falling_film"));
  });
});

describe("vpCost", () => {
  it("continuous vertical most expensive", () => {
    expect(vpCost("continuous_vertical")).toBeGreaterThan(vpCost("coil_type"));
  });
});

describe("continuous", () => {
  it("continuous vertical is continuous", () => {
    expect(continuous("continuous_vertical")).toBe(true);
  });
  it("batch calandria not continuous", () => {
    expect(continuous("batch_calandria")).toBe(false);
  });
});

describe("forRefined", () => {
  it("batch calandria for refined sugar", () => {
    expect(forRefined("batch_calandria")).toBe(true);
  });
  it("continuous vertical not for refined", () => {
    expect(forRefined("continuous_vertical")).toBe(false);
  });
});

describe("panConfig", () => {
  it("falling film uses thin film evaporate low residence", () => {
    expect(panConfig("falling_film")).toBe("falling_film_vacuum_pan_thin_film_evaporate_low_residence_time");
  });
});

describe("bestUse", () => {
  it("coil type for traditional sugar mill", () => {
    expect(bestUse("coil_type")).toBe("traditional_sugar_mill_coil_pan_reliable_batch_crystallization");
  });
});

describe("vacuumPanTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumPanTypes()).toHaveLength(5);
  });
});
