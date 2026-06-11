import { describe, it, expect } from "vitest";
import {
  speed, reliability, capacity, maintenance,
  tsCost, automatic, forCritical, transfer,
  bestUse, transferSwitchTypes,
} from "../transfer-switch-calc.js";

describe("speed", () => {
  it("static fastest transfer", () => {
    expect(speed("static_solid_state")).toBeGreaterThan(speed("manual_double_throw"));
  });
});

describe("reliability", () => {
  it("bypass most reliable", () => {
    expect(reliability("bypass_isolation_ats")).toBeGreaterThan(reliability("automatic_ats_open"));
  });
});

describe("capacity", () => {
  it("bypass highest capacity", () => {
    expect(capacity("bypass_isolation_ats")).toBeGreaterThan(capacity("manual_double_throw"));
  });
});

describe("maintenance", () => {
  it("bypass lowest maintenance", () => {
    expect(maintenance("bypass_isolation_ats")).toBeGreaterThan(maintenance("closed_transition_cts"));
  });
});

describe("tsCost", () => {
  it("static most expensive", () => {
    expect(tsCost("static_solid_state")).toBeGreaterThan(tsCost("manual_double_throw"));
  });
});

describe("automatic", () => {
  it("ats is automatic", () => {
    expect(automatic("automatic_ats_open")).toBe(true);
  });
  it("manual not automatic", () => {
    expect(automatic("manual_double_throw")).toBe(false);
  });
});

describe("forCritical", () => {
  it("static for critical", () => {
    expect(forCritical("static_solid_state")).toBe(true);
  });
  it("manual not critical", () => {
    expect(forCritical("manual_double_throw")).toBe(false);
  });
});

describe("transfer", () => {
  it("static uses scr thyristor", () => {
    expect(transfer("static_solid_state")).toBe("scr_thyristor_zero_break");
  });
});

describe("bestUse", () => {
  it("bypass for hospital", () => {
    expect(bestUse("bypass_isolation_ats")).toBe("hospital_mission_critical_power");
  });
});

describe("transferSwitchTypes", () => {
  it("returns 5 types", () => {
    expect(transferSwitchTypes()).toHaveLength(5);
  });
});
