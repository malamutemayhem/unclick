import { describe, it, expect } from "vitest";
import {
  response, flow, pressure, power,
  svCost, normallyClosed, forHighPressure, coil,
  bestUse, solenoidValveTypes,
} from "../solenoid-valve-calc.js";

describe("response", () => {
  it("direct acting fastest response", () => {
    expect(response("direct_acting_2_way")).toBeGreaterThan(response("pilot_operated_2_way"));
  });
});

describe("flow", () => {
  it("pilot operated highest flow", () => {
    expect(flow("pilot_operated_2_way")).toBeGreaterThan(flow("direct_acting_2_way"));
  });
});

describe("pressure", () => {
  it("pilot operated highest pressure", () => {
    expect(pressure("pilot_operated_2_way")).toBeGreaterThan(pressure("direct_acting_2_way"));
  });
});

describe("power", () => {
  it("latching best power", () => {
    expect(power("latching_bistable_pulse")).toBeGreaterThan(power("pilot_operated_2_way"));
  });
});

describe("svCost", () => {
  it("proportional most expensive", () => {
    expect(svCost("proportional_analog")).toBeGreaterThan(svCost("direct_acting_2_way"));
  });
});

describe("normallyClosed", () => {
  it("direct acting normally closed", () => {
    expect(normallyClosed("direct_acting_2_way")).toBe(true);
  });
  it("three way not normally closed", () => {
    expect(normallyClosed("three_way_diverting")).toBe(false);
  });
});

describe("forHighPressure", () => {
  it("pilot for high pressure", () => {
    expect(forHighPressure("pilot_operated_2_way")).toBe(true);
  });
  it("direct not high pressure", () => {
    expect(forHighPressure("direct_acting_2_way")).toBe(false);
  });
});

describe("coil", () => {
  it("latching uses permanent magnet", () => {
    expect(coil("latching_bistable_pulse")).toBe("pulse_latch_permanent_magnet");
  });
});

describe("bestUse", () => {
  it("pilot for irrigation", () => {
    expect(bestUse("pilot_operated_2_way")).toBe("irrigation_water_supply_main");
  });
});

describe("solenoidValveTypes", () => {
  it("returns 5 types", () => {
    expect(solenoidValveTypes()).toHaveLength(5);
  });
});
