import { describe, it, expect } from "vitest";
import {
  flowCapacity, responseTime, leakRate, pressureRating,
  hvCost, proportional, forSafety, valveDesign,
  bestUse, hydraulicValveTypes,
} from "../hydraulic-valve-calc.js";

describe("flowCapacity", () => {
  it("check poppet highest flow capacity", () => {
    expect(flowCapacity("check_poppet")).toBeGreaterThan(flowCapacity("flow_control_needle"));
  });
});

describe("responseTime", () => {
  it("check poppet fastest response time", () => {
    expect(responseTime("check_poppet")).toBeGreaterThan(responseTime("flow_control_needle"));
  });
});

describe("leakRate", () => {
  it("check poppet zero leak best rating", () => {
    expect(leakRate("check_poppet")).toBeGreaterThan(leakRate("directional_spool"));
  });
});

describe("pressureRating", () => {
  it("pressure relief cartridge highest pressure rating", () => {
    expect(pressureRating("pressure_relief_cartridge")).toBeGreaterThan(pressureRating("directional_spool"));
  });
});

describe("hvCost", () => {
  it("counterbalance pilot most expensive", () => {
    expect(hvCost("counterbalance_pilot")).toBeGreaterThan(hvCost("check_poppet"));
  });
});

describe("proportional", () => {
  it("flow control needle is proportional", () => {
    expect(proportional("flow_control_needle")).toBe(true);
  });
  it("check poppet not proportional", () => {
    expect(proportional("check_poppet")).toBe(false);
  });
});

describe("forSafety", () => {
  it("pressure relief cartridge for safety", () => {
    expect(forSafety("pressure_relief_cartridge")).toBe(true);
  });
  it("directional spool not for safety", () => {
    expect(forSafety("directional_spool")).toBe(false);
  });
});

describe("valveDesign", () => {
  it("check poppet uses spring loaded poppet", () => {
    expect(valveDesign("check_poppet")).toBe("spring_loaded_poppet_ball_or_cone_one_way_flow_zero_leak");
  });
});

describe("bestUse", () => {
  it("counterbalance pilot for crane boom", () => {
    expect(bestUse("counterbalance_pilot")).toBe("crane_boom_lower_press_platen_hold_load_prevent_free_fall");
  });
});

describe("hydraulicValveTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicValveTypes()).toHaveLength(5);
  });
});
