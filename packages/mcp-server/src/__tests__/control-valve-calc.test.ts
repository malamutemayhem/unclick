import { describe, it, expect } from "vitest";
import {
  rangeability, accuracy, capacity, shutoff,
  cvCost, failSafe, forThrottle, characteristic,
  bestUse, controlValveTypes,
} from "../control-valve-calc.js";

describe("rangeability", () => {
  it("globe best rangeability", () => {
    expect(rangeability("globe_linear_pneumatic")).toBeGreaterThan(rangeability("diaphragm_sanitary_clean"));
  });
});

describe("accuracy", () => {
  it("globe most accurate", () => {
    expect(accuracy("globe_linear_pneumatic")).toBeGreaterThan(accuracy("butterfly_rotary_actuated"));
  });
});

describe("capacity", () => {
  it("butterfly highest capacity", () => {
    expect(capacity("butterfly_rotary_actuated")).toBeGreaterThan(capacity("diaphragm_sanitary_clean"));
  });
});

describe("shutoff", () => {
  it("ball best shutoff", () => {
    expect(shutoff("ball_segmented_characterized")).toBeGreaterThan(shutoff("butterfly_rotary_actuated"));
  });
});

describe("cvCost", () => {
  it("ball most expensive", () => {
    expect(cvCost("ball_segmented_characterized")).toBeGreaterThan(cvCost("butterfly_rotary_actuated"));
  });
});

describe("failSafe", () => {
  it("globe is fail safe", () => {
    expect(failSafe("globe_linear_pneumatic")).toBe(true);
  });
  it("diaphragm not fail safe", () => {
    expect(failSafe("diaphragm_sanitary_clean")).toBe(false);
  });
});

describe("forThrottle", () => {
  it("globe for throttle", () => {
    expect(forThrottle("globe_linear_pneumatic")).toBe(true);
  });
  it("diaphragm not throttle", () => {
    expect(forThrottle("diaphragm_sanitary_clean")).toBe(false);
  });
});

describe("characteristic", () => {
  it("ball uses v notch", () => {
    expect(characteristic("ball_segmented_characterized")).toBe("v_notch_ball_linear_flow");
  });
});

describe("bestUse", () => {
  it("globe for steam pressure", () => {
    expect(bestUse("globe_linear_pneumatic")).toBe("steam_pressure_temperature_control");
  });
});

describe("controlValveTypes", () => {
  it("returns 5 types", () => {
    expect(controlValveTypes()).toHaveLength(5);
  });
});
