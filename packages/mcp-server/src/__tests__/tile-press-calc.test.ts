import { describe, it, expect } from "vitest";
import {
  compactionForce, throughput, densityUniformity, sizeRange,
  tpCost, highPressure, forLargeFormat, pressConfig,
  bestUse, tilePressTypes,
} from "../tile-press-calc.js";

describe("compactionForce", () => {
  it("isostatic press best compaction force", () => {
    expect(compactionForce("isostatic_press")).toBeGreaterThan(compactionForce("friction_press"));
  });
});

describe("throughput", () => {
  it("toggle press highest throughput", () => {
    expect(throughput("toggle_press")).toBeGreaterThan(throughput("isostatic_press"));
  });
});

describe("densityUniformity", () => {
  it("isostatic press best density uniformity", () => {
    expect(densityUniformity("isostatic_press")).toBeGreaterThan(densityUniformity("friction_press"));
  });
});

describe("sizeRange", () => {
  it("hydraulic press widest size range", () => {
    expect(sizeRange("hydraulic_press")).toBeGreaterThan(sizeRange("isostatic_press"));
  });
});

describe("tpCost", () => {
  it("isostatic press most expensive", () => {
    expect(tpCost("isostatic_press")).toBeGreaterThan(tpCost("friction_press"));
  });
});

describe("highPressure", () => {
  it("hydraulic press is high pressure", () => {
    expect(highPressure("hydraulic_press")).toBe(true);
  });
  it("friction press not high pressure", () => {
    expect(highPressure("friction_press")).toBe(false);
  });
});

describe("forLargeFormat", () => {
  it("hydraulic press for large format", () => {
    expect(forLargeFormat("hydraulic_press")).toBe(true);
  });
  it("toggle press not for large format", () => {
    expect(forLargeFormat("toggle_press")).toBe(false);
  });
});

describe("pressConfig", () => {
  it("electric servo press uses motor drive precise force energy save", () => {
    expect(pressConfig("electric_servo_press")).toBe("electric_servo_tile_press_motor_drive_precise_force_energy_save");
  });
});

describe("bestUse", () => {
  it("isostatic press for technical ceramic uniform density complex shape", () => {
    expect(bestUse("isostatic_press")).toBe("technical_ceramic_isostatic_press_uniform_density_complex_shape");
  });
});

describe("tilePressTypes", () => {
  it("returns 5 types", () => {
    expect(tilePressTypes()).toHaveLength(5);
  });
});
