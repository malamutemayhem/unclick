import { describe, it, expect } from "vitest";
import {
  pressureRating, wallThickness, cutEase, chemicalResist,
  pipeCost, hotWaterSafe, uvResistant, jointMethod,
  bestSystem, pvcPipes,
} from "../pvc-pipe-calc.js";

describe("pressureRating", () => {
  it("schedule 80 heavy highest pressure", () => {
    expect(pressureRating("schedule_80_heavy")).toBeGreaterThan(pressureRating("dwv_drain_thin"));
  });
});

describe("wallThickness", () => {
  it("schedule 80 heavy thickest wall", () => {
    expect(wallThickness("schedule_80_heavy")).toBeGreaterThan(wallThickness("dwv_drain_thin"));
  });
});

describe("cutEase", () => {
  it("dwv drain thin easiest to cut", () => {
    expect(cutEase("dwv_drain_thin")).toBeGreaterThan(cutEase("schedule_80_heavy"));
  });
});

describe("chemicalResist", () => {
  it("cpvc hot water best chemical resistance", () => {
    expect(chemicalResist("cpvc_hot_water")).toBeGreaterThan(chemicalResist("furniture_grade_smooth"));
  });
});

describe("pipeCost", () => {
  it("schedule 80 heavy most expensive", () => {
    expect(pipeCost("schedule_80_heavy")).toBeGreaterThan(pipeCost("dwv_drain_thin"));
  });
});

describe("hotWaterSafe", () => {
  it("cpvc hot water is hot water safe", () => {
    expect(hotWaterSafe("cpvc_hot_water")).toBe(true);
  });
  it("schedule 40 pressure is not", () => {
    expect(hotWaterSafe("schedule_40_pressure")).toBe(false);
  });
});

describe("uvResistant", () => {
  it("furniture grade smooth is uv resistant", () => {
    expect(uvResistant("furniture_grade_smooth")).toBe(true);
  });
  it("schedule 40 pressure is not", () => {
    expect(uvResistant("schedule_40_pressure")).toBe(false);
  });
});

describe("jointMethod", () => {
  it("furniture grade smooth uses friction fit no glue", () => {
    expect(jointMethod("furniture_grade_smooth")).toBe("friction_fit_no_glue");
  });
});

describe("bestSystem", () => {
  it("dwv drain thin best for drain waste vent", () => {
    expect(bestSystem("dwv_drain_thin")).toBe("drain_waste_vent");
  });
});

describe("pvcPipes", () => {
  it("returns 5 types", () => {
    expect(pvcPipes()).toHaveLength(5);
  });
});
