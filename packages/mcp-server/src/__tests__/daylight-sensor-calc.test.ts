import { describe, it, expect } from "vitest";
import {
  accuracy, response, stability, installEase,
  dlCost, closedLoop, forOpenOffice, mounting,
  bestUse, daylightSensorTypes,
} from "../daylight-sensor-calc.js";

describe("accuracy", () => {
  it("dual loop most accurate", () => {
    expect(accuracy("dual_loop_hybrid")).toBeGreaterThan(accuracy("photocell_open_loop"));
  });
});

describe("response", () => {
  it("handheld fastest response", () => {
    expect(response("commissioning_handheld")).toBeGreaterThan(response("wireless_mesh_daylight"));
  });
});

describe("stability", () => {
  it("dual loop most stable", () => {
    expect(stability("dual_loop_hybrid")).toBeGreaterThan(stability("commissioning_handheld"));
  });
});

describe("installEase", () => {
  it("handheld easiest install", () => {
    expect(installEase("commissioning_handheld")).toBeGreaterThan(installEase("dual_loop_hybrid"));
  });
});

describe("dlCost", () => {
  it("dual loop most expensive", () => {
    expect(dlCost("dual_loop_hybrid")).toBeGreaterThan(dlCost("commissioning_handheld"));
  });
});

describe("closedLoop", () => {
  it("closed loop sensor is closed loop", () => {
    expect(closedLoop("photocell_closed_loop")).toBe(true);
  });
  it("open loop not closed loop", () => {
    expect(closedLoop("photocell_open_loop")).toBe(false);
  });
});

describe("forOpenOffice", () => {
  it("closed loop for open office", () => {
    expect(forOpenOffice("photocell_closed_loop")).toBe(true);
  });
  it("handheld not open office", () => {
    expect(forOpenOffice("commissioning_handheld")).toBe(false);
  });
});

describe("mounting", () => {
  it("wireless uses mesh ceiling", () => {
    expect(mounting("wireless_mesh_daylight")).toBe("battery_wireless_mesh_ceiling");
  });
});

describe("bestUse", () => {
  it("dual loop for leed building", () => {
    expect(bestUse("dual_loop_hybrid")).toBe("high_performance_leed_building");
  });
});

describe("daylightSensorTypes", () => {
  it("returns 5 types", () => {
    expect(daylightSensorTypes()).toHaveLength(5);
  });
});
