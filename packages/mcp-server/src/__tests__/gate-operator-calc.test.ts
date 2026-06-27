import { describe, it, expect } from "vitest";
import {
  speed, loadCapacity, reliability, aesthetic,
  goCost, heavyDuty, forCommercial, drive,
  bestUse, gateOperatorTypes,
} from "../gate-operator-calc.js";

describe("speed", () => {
  it("barrier arm fastest", () => {
    expect(speed("barrier_arm_parking")).toBeGreaterThan(speed("vertical_lift_industrial"));
  });
});

describe("loadCapacity", () => {
  it("vertical lift highest capacity", () => {
    expect(loadCapacity("vertical_lift_industrial")).toBeGreaterThan(loadCapacity("barrier_arm_parking"));
  });
});

describe("reliability", () => {
  it("slide gate very reliable", () => {
    expect(reliability("slide_gate_rack_pinion")).toBeGreaterThan(reliability("underground_swing_hidden"));
  });
});

describe("aesthetic", () => {
  it("underground best aesthetic", () => {
    expect(aesthetic("underground_swing_hidden")).toBeGreaterThan(aesthetic("vertical_lift_industrial"));
  });
});

describe("goCost", () => {
  it("vertical lift most expensive", () => {
    expect(goCost("vertical_lift_industrial")).toBeGreaterThan(goCost("barrier_arm_parking"));
  });
});

describe("heavyDuty", () => {
  it("slide gate heavy duty", () => {
    expect(heavyDuty("slide_gate_rack_pinion")).toBe(true);
  });
  it("swing gate not heavy duty", () => {
    expect(heavyDuty("swing_gate_articulated")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("barrier arm for commercial", () => {
    expect(forCommercial("barrier_arm_parking")).toBe(true);
  });
  it("underground not commercial", () => {
    expect(forCommercial("underground_swing_hidden")).toBe(false);
  });
});

describe("drive", () => {
  it("vertical lift uses hydraulic", () => {
    expect(drive("vertical_lift_industrial")).toBe("hydraulic_cable_lift_winch");
  });
});

describe("bestUse", () => {
  it("underground for luxury estate", () => {
    expect(bestUse("underground_swing_hidden")).toBe("luxury_estate_hidden_operator");
  });
});

describe("gateOperatorTypes", () => {
  it("returns 5 types", () => {
    expect(gateOperatorTypes()).toHaveLength(5);
  });
});
