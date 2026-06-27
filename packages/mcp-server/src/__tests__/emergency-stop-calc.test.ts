import { describe, it, expect } from "vitest";
import {
  responseTime, accessibility, tamperResistance, reliability,
  esCost, wireless, forLineSafety, mechanism,
  bestUse, emergencyStopTypes,
} from "../emergency-stop-calc.js";

describe("responseTime", () => {
  it("foot pedal deadman fastest response", () => {
    expect(responseTime("foot_pedal_deadman")).toBeGreaterThan(responseTime("rope_pull_cable"));
  });
});

describe("accessibility", () => {
  it("rope pull cable most accessible", () => {
    expect(accessibility("rope_pull_cable")).toBeGreaterThan(accessibility("key_release_trapped"));
  });
});

describe("tamperResistance", () => {
  it("key release trapped most tamper resistant", () => {
    expect(tamperResistance("key_release_trapped")).toBeGreaterThan(tamperResistance("foot_pedal_deadman"));
  });
});

describe("reliability", () => {
  it("mushroom head twist most reliable", () => {
    expect(reliability("mushroom_head_twist")).toBeGreaterThanOrEqual(reliability("wireless_e_stop"));
  });
});

describe("esCost", () => {
  it("wireless e stop most expensive", () => {
    expect(esCost("wireless_e_stop")).toBeGreaterThan(esCost("mushroom_head_twist"));
  });
});

describe("wireless", () => {
  it("wireless e stop is wireless", () => {
    expect(wireless("wireless_e_stop")).toBe(true);
  });
  it("mushroom head twist not wireless", () => {
    expect(wireless("mushroom_head_twist")).toBe(false);
  });
});

describe("forLineSafety", () => {
  it("rope pull cable for line safety", () => {
    expect(forLineSafety("rope_pull_cable")).toBe(true);
  });
  it("mushroom head twist not for line safety", () => {
    expect(forLineSafety("mushroom_head_twist")).toBe(false);
  });
});

describe("mechanism", () => {
  it("foot pedal uses three position switch", () => {
    expect(mechanism("foot_pedal_deadman")).toBe("three_position_foot_switch_release_to_stop_enable");
  });
});

describe("bestUse", () => {
  it("wireless e stop for mobile equipment", () => {
    expect(bestUse("wireless_e_stop")).toBe("mobile_equipment_crane_remote_agv_fleet_e_stop");
  });
});

describe("emergencyStopTypes", () => {
  it("returns 5 types", () => {
    expect(emergencyStopTypes()).toHaveLength(5);
  });
});
