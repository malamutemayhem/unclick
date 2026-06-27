import { describe, it, expect } from "vitest";
import {
  windEven, tensionControl, speedWind, pirnRange,
  pirnCost, powered, forCone, driveMethod,
  bestUse, pirnWinders,
} from "../pirn-wind-calc.js";

describe("windEven", () => {
  it("electric motor auto most even wind", () => {
    expect(windEven("electric_motor_auto")).toBeGreaterThan(windEven("hand_spindle_wind"));
  });
});

describe("tensionControl", () => {
  it("electric motor auto best tension control", () => {
    expect(tensionControl("electric_motor_auto")).toBeGreaterThan(tensionControl("hand_spindle_wind"));
  });
});

describe("speedWind", () => {
  it("electric motor auto fastest wind", () => {
    expect(speedWind("electric_motor_auto")).toBeGreaterThan(speedWind("table_clamp_crank"));
  });
});

describe("pirnRange", () => {
  it("cone wind transfer widest pirn range", () => {
    expect(pirnRange("cone_wind_transfer")).toBeGreaterThan(pirnRange("hand_spindle_wind"));
  });
});

describe("pirnCost", () => {
  it("electric motor auto most expensive", () => {
    expect(pirnCost("electric_motor_auto")).toBeGreaterThan(pirnCost("hand_spindle_wind"));
  });
});

describe("powered", () => {
  it("electric motor auto is powered", () => {
    expect(powered("electric_motor_auto")).toBe(true);
  });
  it("table clamp crank not powered", () => {
    expect(powered("table_clamp_crank")).toBe(false);
  });
});

describe("forCone", () => {
  it("cone wind transfer is for cone", () => {
    expect(forCone("cone_wind_transfer")).toBe(true);
  });
  it("hand spindle wind not for cone", () => {
    expect(forCone("hand_spindle_wind")).toBe(false);
  });
});

describe("driveMethod", () => {
  it("double end pair uses dual spindle crank", () => {
    expect(driveMethod("double_end_pair")).toBe("dual_spindle_crank");
  });
});

describe("bestUse", () => {
  it("electric motor auto best for production pirn wind", () => {
    expect(bestUse("electric_motor_auto")).toBe("production_pirn_wind");
  });
});

describe("pirnWinders", () => {
  it("returns 5 types", () => {
    expect(pirnWinders()).toHaveLength(5);
  });
});
