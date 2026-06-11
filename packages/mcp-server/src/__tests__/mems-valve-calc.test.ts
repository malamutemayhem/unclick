import { describe, it, expect } from "vitest";
import {
  flowRate, leakage, responseTime, powerConsume,
  mvCost, proportional, forMedical, mechanism,
  bestUse, memsValves,
} from "../mems-valve-calc.js";

describe("flowRate", () => {
  it("proportional spool highest flow rate", () => {
    expect(flowRate("proportional_spool")).toBeGreaterThan(flowRate("check_passive_flap"));
  });
});

describe("leakage", () => {
  it("normally closed seat lowest leakage", () => {
    expect(leakage("normally_closed_seat")).toBeGreaterThan(leakage("proportional_spool"));
  });
});

describe("responseTime", () => {
  it("check passive flap fastest response", () => {
    expect(responseTime("check_passive_flap")).toBeGreaterThan(responseTime("bistable_toggle"));
  });
});

describe("powerConsume", () => {
  it("bistable toggle lowest power consume", () => {
    expect(powerConsume("bistable_toggle")).toBeGreaterThan(powerConsume("proportional_spool"));
  });
});

describe("mvCost", () => {
  it("proportional spool most expensive", () => {
    expect(mvCost("proportional_spool")).toBeGreaterThan(mvCost("check_passive_flap"));
  });
});

describe("proportional", () => {
  it("proportional spool is proportional", () => {
    expect(proportional("proportional_spool")).toBe(true);
  });
  it("normally closed seat not proportional", () => {
    expect(proportional("normally_closed_seat")).toBe(false);
  });
});

describe("forMedical", () => {
  it("normally closed seat for medical", () => {
    expect(forMedical("normally_closed_seat")).toBe(true);
  });
  it("normally open diaphragm not for medical", () => {
    expect(forMedical("normally_open_diaphragm")).toBe(false);
  });
});

describe("mechanism", () => {
  it("bistable toggle uses magnetic snap through", () => {
    expect(mechanism("bistable_toggle")).toBe("magnetic_snap_through");
  });
});

describe("bestUse", () => {
  it("proportional spool best for pneumatic soft robot ctrl", () => {
    expect(bestUse("proportional_spool")).toBe("pneumatic_soft_robot_ctrl");
  });
});

describe("memsValves", () => {
  it("returns 5 types", () => {
    expect(memsValves()).toHaveLength(5);
  });
});
