import { describe, it, expect } from "vitest";
import {
  moisture, energy, lowDewPoint, reliability,
  ddCost, continuous, forCleanroom, sorbent,
  bestUse, desiccantDehumidifierTypes,
} from "../desiccant-dehumidifier-calc.js";

describe("moisture", () => {
  it("dual tower best moisture removal", () => {
    expect(moisture("dual_tower_packed_bed")).toBeGreaterThan(moisture("solar_regeneration_wheel"));
  });
});

describe("energy", () => {
  it("solar regeneration most energy efficient", () => {
    expect(energy("solar_regeneration_wheel")).toBeGreaterThan(energy("dual_tower_packed_bed"));
  });
});

describe("lowDewPoint", () => {
  it("rotary wheel lowest dew point", () => {
    expect(lowDewPoint("rotary_wheel_silica")).toBeGreaterThan(lowDewPoint("solar_regeneration_wheel"));
  });
});

describe("reliability", () => {
  it("rotary wheel most reliable", () => {
    expect(reliability("rotary_wheel_silica")).toBeGreaterThan(reliability("liquid_desiccant_lithium"));
  });
});

describe("ddCost", () => {
  it("solar regeneration most expensive", () => {
    expect(ddCost("solar_regeneration_wheel")).toBeGreaterThan(ddCost("dual_tower_packed_bed"));
  });
});

describe("continuous", () => {
  it("rotary wheel is continuous", () => {
    expect(continuous("rotary_wheel_silica")).toBe(true);
  });
  it("dual tower not continuous", () => {
    expect(continuous("dual_tower_packed_bed")).toBe(false);
  });
});

describe("forCleanroom", () => {
  it("rotary wheel for cleanroom", () => {
    expect(forCleanroom("rotary_wheel_silica")).toBe(true);
  });
  it("liquid desiccant not for cleanroom", () => {
    expect(forCleanroom("liquid_desiccant_lithium")).toBe(false);
  });
});

describe("sorbent", () => {
  it("liquid uses lithium chloride spray", () => {
    expect(sorbent("liquid_desiccant_lithium")).toBe("lithium_chloride_solution_spray");
  });
});

describe("bestUse", () => {
  it("rotary wheel for pharma cleanroom", () => {
    expect(bestUse("rotary_wheel_silica")).toBe("pharma_cleanroom_lithium_battery");
  });
});

describe("desiccantDehumidifierTypes", () => {
  it("returns 5 types", () => {
    expect(desiccantDehumidifierTypes()).toHaveLength(5);
  });
});
