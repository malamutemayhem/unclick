import { describe, it, expect } from "vitest";
import {
  grindFineness, throughput, energyEfficiency, particleUniformity,
  rmCost, adjustable, forWheat, millConfig,
  bestUse, rollerMillTypes,
} from "../roller-mill-calc.js";

describe("grindFineness", () => {
  it("reduction roll finest grind", () => {
    expect(grindFineness("reduction_roll")).toBeGreaterThan(grindFineness("fluted_break"));
  });
});

describe("throughput", () => {
  it("fluted break highest throughput", () => {
    expect(throughput("fluted_break")).toBeGreaterThan(throughput("reduction_roll"));
  });
});

describe("energyEfficiency", () => {
  it("smooth roll best energy efficiency", () => {
    expect(energyEfficiency("smooth_roll")).toBeGreaterThanOrEqual(energyEfficiency("sizing_roll"));
  });
});

describe("particleUniformity", () => {
  it("reduction roll best uniformity", () => {
    expect(particleUniformity("reduction_roll")).toBeGreaterThan(particleUniformity("fluted_break"));
  });
});

describe("rmCost", () => {
  it("reduction roll most expensive", () => {
    expect(rmCost("reduction_roll")).toBeGreaterThan(rmCost("fluted_break"));
  });
});

describe("adjustable", () => {
  it("smooth roll is adjustable", () => {
    expect(adjustable("smooth_roll")).toBe(true);
  });
});

describe("forWheat", () => {
  it("smooth roll for wheat", () => {
    expect(forWheat("smooth_roll")).toBe(true);
  });
  it("sizing roll not for wheat", () => {
    expect(forWheat("sizing_roll")).toBe(false);
  });
});

describe("millConfig", () => {
  it("corrugated roll uses grooved surface shear break", () => {
    expect(millConfig("corrugated_roll")).toBe("corrugated_roll_mill_grooved_surface_shear_break_open_grain");
  });
});

describe("bestUse", () => {
  it("fluted break for large flour mill first break", () => {
    expect(bestUse("fluted_break")).toBe("large_flour_mill_fluted_break_roll_first_break_high_extraction");
  });
});

describe("rollerMillTypes", () => {
  it("returns 5 types", () => {
    expect(rollerMillTypes()).toHaveLength(5);
  });
});
