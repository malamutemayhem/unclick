import { describe, it, expect } from "vitest";
import {
  cutSpeed, precision, materialRange, operatingCost,
  lcCost, fiberLaser, forMetal, source,
  bestUse, laserCutterTypes,
} from "../laser-cutter-calc.js";

describe("cutSpeed", () => {
  it("fiber flatbed fastest", () => {
    expect(cutSpeed("fiber_flatbed")).toBeGreaterThan(cutSpeed("ultrafast_pulsed"));
  });
});

describe("precision", () => {
  it("ultrafast pulsed most precise", () => {
    expect(precision("ultrafast_pulsed")).toBeGreaterThan(precision("direct_diode"));
  });
});

describe("materialRange", () => {
  it("co2 flatbed widest material range", () => {
    expect(materialRange("co2_flatbed")).toBeGreaterThan(materialRange("fiber_tube"));
  });
});

describe("operatingCost", () => {
  it("direct diode best operating cost", () => {
    expect(operatingCost("direct_diode")).toBeGreaterThan(operatingCost("ultrafast_pulsed"));
  });
});

describe("lcCost", () => {
  it("ultrafast pulsed most expensive", () => {
    expect(lcCost("ultrafast_pulsed")).toBeGreaterThan(lcCost("co2_flatbed"));
  });
});

describe("fiberLaser", () => {
  it("fiber flatbed is fiber laser", () => {
    expect(fiberLaser("fiber_flatbed")).toBe(true);
  });
  it("co2 flatbed not fiber laser", () => {
    expect(fiberLaser("co2_flatbed")).toBe(false);
  });
});

describe("forMetal", () => {
  it("fiber flatbed for metal", () => {
    expect(forMetal("fiber_flatbed")).toBe(true);
  });
});

describe("source", () => {
  it("ultrafast pulsed uses femtosecond", () => {
    expect(source("ultrafast_pulsed")).toBe("femtosecond_picosecond_pulse_cold_ablation_no_heat_zone");
  });
});

describe("bestUse", () => {
  it("fiber tube for tube pipe cutting", () => {
    expect(bestUse("fiber_tube")).toBe("tube_pipe_structural_section_cutting_furniture_frame_auto");
  });
});

describe("laserCutterTypes", () => {
  it("returns 5 types", () => {
    expect(laserCutterTypes()).toHaveLength(5);
  });
});
