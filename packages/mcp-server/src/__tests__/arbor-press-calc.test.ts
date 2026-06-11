import { describe, it, expect } from "vitest";
import {
  forceRange, throughput, alignment, repeatability,
  apCost, powered, forBearing, pressConfig,
  bestUse, arborPressTypes,
} from "../arbor-press-calc.js";

describe("forceRange", () => {
  it("electric arbor best force range", () => {
    expect(forceRange("electric_arbor")).toBeGreaterThan(forceRange("hand_arbor"));
  });
});

describe("throughput", () => {
  it("pneumatic arbor highest throughput", () => {
    expect(throughput("pneumatic_arbor")).toBeGreaterThan(throughput("hand_arbor"));
  });
});

describe("alignment", () => {
  it("electric arbor best alignment", () => {
    expect(alignment("electric_arbor")).toBeGreaterThan(alignment("hand_arbor"));
  });
});

describe("repeatability", () => {
  it("electric arbor best repeatability", () => {
    expect(repeatability("electric_arbor")).toBeGreaterThan(repeatability("hand_arbor"));
  });
});

describe("apCost", () => {
  it("electric arbor most expensive", () => {
    expect(apCost("electric_arbor")).toBeGreaterThan(apCost("hand_arbor"));
  });
});

describe("powered", () => {
  it("pneumatic arbor is powered", () => {
    expect(powered("pneumatic_arbor")).toBe(true);
  });
  it("rack pinion not powered", () => {
    expect(powered("rack_pinion")).toBe(false);
  });
});

describe("forBearing", () => {
  it("rack pinion for bearing", () => {
    expect(forBearing("rack_pinion")).toBe(true);
  });
  it("hand arbor not for bearing", () => {
    expect(forBearing("hand_arbor")).toBe(false);
  });
});

describe("pressConfig", () => {
  it("electric arbor uses servo motor force monitor data log press", () => {
    expect(pressConfig("electric_arbor")).toBe("electric_arbor_press_servo_motor_force_monitor_data_log_press");
  });
});

describe("bestUse", () => {
  it("pneumatic arbor for production line air cylinder fast cycle", () => {
    expect(bestUse("pneumatic_arbor")).toBe("production_line_pneumatic_arbor_press_air_cylinder_fast_cycle");
  });
});

describe("arborPressTypes", () => {
  it("returns 5 types", () => {
    expect(arborPressTypes()).toHaveLength(5);
  });
});
