import { describe, it, expect } from "vitest";
import {
  reliability, visibility, accessibility, durability,
  tsCost, supervised, forOutdoor, indicator,
  bestUse, tamperSwitchTypes,
} from "../tamper-switch-calc.js";

describe("reliability", () => {
  it("piv most reliable", () => {
    expect(reliability("post_indicator_piv")).toBeGreaterThan(reliability("underground_indicator"));
  });
});

describe("visibility", () => {
  it("piv most visible", () => {
    expect(visibility("post_indicator_piv")).toBeGreaterThan(visibility("underground_indicator"));
  });
});

describe("accessibility", () => {
  it("piv most accessible", () => {
    expect(accessibility("post_indicator_piv")).toBeGreaterThan(accessibility("underground_indicator"));
  });
});

describe("durability", () => {
  it("underground most durable", () => {
    expect(durability("underground_indicator")).toBeGreaterThan(durability("os_y_gate_valve"));
  });
});

describe("tsCost", () => {
  it("underground most expensive", () => {
    expect(tsCost("underground_indicator")).toBeGreaterThan(tsCost("butterfly_valve_gear"));
  });
});

describe("supervised", () => {
  it("all types supervised", () => {
    expect(supervised("os_y_gate_valve")).toBe(true);
  });
});

describe("forOutdoor", () => {
  it("piv for outdoor", () => {
    expect(forOutdoor("post_indicator_piv")).toBe(true);
  });
  it("os y gate not for outdoor", () => {
    expect(forOutdoor("os_y_gate_valve")).toBe(false);
  });
});

describe("indicator", () => {
  it("butterfly uses quarter turn", () => {
    expect(indicator("butterfly_valve_gear")).toBe("handle_position_quarter_turn");
  });
});

describe("bestUse", () => {
  it("piv for yard main", () => {
    expect(bestUse("post_indicator_piv")).toBe("yard_main_fire_department_access");
  });
});

describe("tamperSwitchTypes", () => {
  it("returns 5 types", () => {
    expect(tamperSwitchTypes()).toHaveLength(5);
  });
});
