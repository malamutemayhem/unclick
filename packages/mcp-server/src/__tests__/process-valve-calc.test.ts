import { describe, it, expect } from "vitest";
import {
  rangeability, tightShutoff, flowCapacity, cavitationResist,
  pvCost, linear, forSanitary, actuator,
  bestUse, processValves,
} from "../process-valve-calc.js";

describe("rangeability", () => {
  it("control valve cage best rangeability", () => {
    expect(rangeability("control_valve_cage")).toBeGreaterThan(rangeability("ball_quarter_turn"));
  });
});

describe("tightShutoff", () => {
  it("ball quarter turn best shutoff", () => {
    expect(tightShutoff("ball_quarter_turn")).toBeGreaterThan(tightShutoff("butterfly_wafer"));
  });
});

describe("flowCapacity", () => {
  it("ball quarter turn highest flow", () => {
    expect(flowCapacity("ball_quarter_turn")).toBeGreaterThan(flowCapacity("diaphragm_weir"));
  });
});

describe("cavitationResist", () => {
  it("control valve cage best cavitation resist", () => {
    expect(cavitationResist("control_valve_cage")).toBeGreaterThan(cavitationResist("butterfly_wafer"));
  });
});

describe("pvCost", () => {
  it("control valve cage most expensive", () => {
    expect(pvCost("control_valve_cage")).toBeGreaterThan(pvCost("butterfly_wafer"));
  });
});

describe("linear", () => {
  it("globe pneumatic is linear", () => {
    expect(linear("globe_pneumatic")).toBe(true);
  });
  it("ball quarter turn not linear", () => {
    expect(linear("ball_quarter_turn")).toBe(false);
  });
});

describe("forSanitary", () => {
  it("diaphragm weir for sanitary", () => {
    expect(forSanitary("diaphragm_weir")).toBe(true);
  });
  it("globe pneumatic not for sanitary", () => {
    expect(forSanitary("globe_pneumatic")).toBe(false);
  });
});

describe("actuator", () => {
  it("ball quarter turn uses rack pinion pneumatic", () => {
    expect(actuator("ball_quarter_turn")).toBe("rack_pinion_pneumatic");
  });
});

describe("bestUse", () => {
  it("control valve cage best for high dp letdown", () => {
    expect(bestUse("control_valve_cage")).toBe("high_dp_letdown_station");
  });
});

describe("processValves", () => {
  it("returns 5 types", () => {
    expect(processValves()).toHaveLength(5);
  });
});
