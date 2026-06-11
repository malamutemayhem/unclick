import { describe, it, expect } from "vitest";
import {
  tempRange, capacity, stressLevel, monitoring,
  ovenCost, powered, accelerated, testType,
  bestUse, burnInOvens,
} from "../burn-in-oven-calc.js";

describe("tempRange", () => {
  it("thermal cycle chamber widest temp range", () => {
    expect(tempRange("thermal_cycle_chamber")).toBeGreaterThan(tempRange("static_chamber_basic"));
  });
});

describe("capacity", () => {
  it("static chamber basic highest capacity", () => {
    expect(capacity("static_chamber_basic")).toBeGreaterThan(capacity("hast_accel_humid"));
  });
});

describe("stressLevel", () => {
  it("hast accel humid highest stress level", () => {
    expect(stressLevel("hast_accel_humid")).toBeGreaterThan(stressLevel("static_chamber_basic"));
  });
});

describe("monitoring", () => {
  it("htol high temp life best monitoring", () => {
    expect(monitoring("htol_high_temp_life")).toBeGreaterThan(monitoring("static_chamber_basic"));
  });
});

describe("ovenCost", () => {
  it("htol high temp life most expensive", () => {
    expect(ovenCost("htol_high_temp_life")).toBeGreaterThan(ovenCost("static_chamber_basic"));
  });
});

describe("powered", () => {
  it("dynamic powered drive is powered", () => {
    expect(powered("dynamic_powered_drive")).toBe(true);
  });
  it("static chamber basic not powered", () => {
    expect(powered("static_chamber_basic")).toBe(false);
  });
});

describe("accelerated", () => {
  it("hast accel humid is accelerated", () => {
    expect(accelerated("hast_accel_humid")).toBe(true);
  });
  it("static chamber basic not accelerated", () => {
    expect(accelerated("static_chamber_basic")).toBe(false);
  });
});

describe("testType", () => {
  it("thermal cycle chamber uses hot cold cycle stress", () => {
    expect(testType("thermal_cycle_chamber")).toBe("hot_cold_cycle_stress");
  });
});

describe("bestUse", () => {
  it("htol high temp life best for semiconductor qual test", () => {
    expect(bestUse("htol_high_temp_life")).toBe("semiconductor_qual_test");
  });
});

describe("burnInOvens", () => {
  it("returns 5 types", () => {
    expect(burnInOvens()).toHaveLength(5);
  });
});
