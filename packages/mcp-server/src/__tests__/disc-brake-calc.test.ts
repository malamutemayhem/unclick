import { describe, it, expect } from "vitest";
import {
  torque, response, heatDissipation, life,
  dbCost, failsafe, forHighSpeed, friction,
  bestUse, discBrakeTypes,
} from "../disc-brake-calc.js";

describe("torque", () => {
  it("carbon ceramic highest torque", () => {
    expect(torque("carbon_ceramic_composite")).toBeGreaterThan(torque("floating_caliper_single"));
  });
});

describe("response", () => {
  it("carbon ceramic fastest response", () => {
    expect(response("carbon_ceramic_composite")).toBeGreaterThan(response("spring_applied_failsafe"));
  });
});

describe("heatDissipation", () => {
  it("ventilated drilled best dissipation", () => {
    expect(heatDissipation("ventilated_drilled_rotor")).toBeGreaterThan(heatDissipation("spring_applied_failsafe"));
  });
});

describe("life", () => {
  it("carbon ceramic longest life", () => {
    expect(life("carbon_ceramic_composite")).toBeGreaterThan(life("floating_caliper_single"));
  });
});

describe("dbCost", () => {
  it("carbon ceramic most expensive", () => {
    expect(dbCost("carbon_ceramic_composite")).toBeGreaterThan(dbCost("floating_caliper_single"));
  });
});

describe("failsafe", () => {
  it("spring applied is failsafe", () => {
    expect(failsafe("spring_applied_failsafe")).toBe(true);
  });
  it("floating caliper not failsafe", () => {
    expect(failsafe("floating_caliper_single")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("fixed caliper for high speed", () => {
    expect(forHighSpeed("fixed_caliper_multi_piston")).toBe(true);
  });
  it("spring applied not for high speed", () => {
    expect(forHighSpeed("spring_applied_failsafe")).toBe(false);
  });
});

describe("friction", () => {
  it("carbon ceramic uses sic matrix", () => {
    expect(friction("carbon_ceramic_composite")).toBe("carbon_fiber_sic_ceramic_matrix");
  });
});

describe("bestUse", () => {
  it("spring applied for crane hoist", () => {
    expect(bestUse("spring_applied_failsafe")).toBe("crane_hoist_elevator_hold_brake");
  });
});

describe("discBrakeTypes", () => {
  it("returns 5 types", () => {
    expect(discBrakeTypes()).toHaveLength(5);
  });
});
