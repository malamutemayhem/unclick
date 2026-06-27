import { describe, it, expect } from "vitest";
import {
  waterPressure, coverageArea, waterEfficiency, installDifficulty,
  headCost, hasFilter, multiSpray, sprayDesign,
  bestBathroom, showerHeads,
} from "../shower-head-calc.js";

describe("waterPressure", () => {
  it("high pressure jet strongest", () => {
    expect(waterPressure("high_pressure_jet")).toBeGreaterThan(waterPressure("rain_ceiling"));
  });
});

describe("coverageArea", () => {
  it("rain ceiling widest coverage", () => {
    expect(coverageArea("rain_ceiling")).toBeGreaterThan(coverageArea("high_pressure_jet"));
  });
});

describe("waterEfficiency", () => {
  it("filtered vitamin most efficient", () => {
    expect(waterEfficiency("filtered_vitamin")).toBeGreaterThan(waterEfficiency("high_pressure_jet"));
  });
});

describe("installDifficulty", () => {
  it("rain ceiling hardest install", () => {
    expect(installDifficulty("rain_ceiling")).toBeGreaterThan(installDifficulty("handheld_detach"));
  });
});

describe("headCost", () => {
  it("rain ceiling most expensive", () => {
    expect(headCost("rain_ceiling")).toBeGreaterThan(headCost("high_pressure_jet"));
  });
});

describe("hasFilter", () => {
  it("filtered vitamin has filter", () => {
    expect(hasFilter("filtered_vitamin")).toBe(true);
  });
  it("rain ceiling does not", () => {
    expect(hasFilter("rain_ceiling")).toBe(false);
  });
});

describe("multiSpray", () => {
  it("handheld detach has multi spray", () => {
    expect(multiSpray("handheld_detach")).toBe(true);
  });
  it("rain ceiling does not", () => {
    expect(multiSpray("rain_ceiling")).toBe(false);
  });
});

describe("sprayDesign", () => {
  it("rain ceiling uses wide gravity laminar flow", () => {
    expect(sprayDesign("rain_ceiling")).toBe("wide_gravity_laminar_flow");
  });
});

describe("bestBathroom", () => {
  it("dual combo for versatile two person use", () => {
    expect(bestBathroom("dual_combo")).toBe("versatile_two_person_use");
  });
});

describe("showerHeads", () => {
  it("returns 5 types", () => {
    expect(showerHeads()).toHaveLength(5);
  });
});
