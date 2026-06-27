import { describe, it, expect } from "vitest";
import {
  responseTime, reliability, waterDamageRisk, complexity,
  fsCost_, chargedPipe, forHighHazard, activation,
  bestUse, fireSuppressionPipeTypes,
} from "../fire-suppression-pipe-calc.js";

describe("responseTime", () => {
  it("wet pipe standard fastest response", () => {
    expect(responseTime("wet_pipe_standard")).toBeGreaterThan(responseTime("dry_pipe_freeze_proof"));
  });
});

describe("reliability", () => {
  it("wet pipe standard most reliable", () => {
    expect(reliability("wet_pipe_standard")).toBeGreaterThan(reliability("foam_water_system"));
  });
});

describe("waterDamageRisk", () => {
  it("deluge open head highest water damage risk", () => {
    expect(waterDamageRisk("deluge_open_head")).toBeGreaterThan(waterDamageRisk("pre_action_double"));
  });
});

describe("complexity", () => {
  it("foam water system most complex", () => {
    expect(complexity("foam_water_system")).toBeGreaterThan(complexity("wet_pipe_standard"));
  });
});

describe("fsCost_", () => {
  it("foam water system most expensive", () => {
    expect(fsCost_("foam_water_system")).toBeGreaterThan(fsCost_("wet_pipe_standard"));
  });
});

describe("chargedPipe", () => {
  it("wet pipe standard has charged pipe", () => {
    expect(chargedPipe("wet_pipe_standard")).toBe(true);
  });
  it("dry pipe not charged", () => {
    expect(chargedPipe("dry_pipe_freeze_proof")).toBe(false);
  });
});

describe("forHighHazard", () => {
  it("deluge for high hazard", () => {
    expect(forHighHazard("deluge_open_head")).toBe(true);
  });
  it("wet pipe not for high hazard", () => {
    expect(forHighHazard("wet_pipe_standard")).toBe(false);
  });
});

describe("activation", () => {
  it("pre action uses detection then individual head", () => {
    expect(activation("pre_action_double")).toBe("detection_system_opens_valve_then_individual_head");
  });
});

describe("bestUse", () => {
  it("dry pipe for unheated warehouse", () => {
    expect(bestUse("dry_pipe_freeze_proof")).toBe("unheated_warehouse_parking_garage_freezing_climate");
  });
});

describe("fireSuppressionPipeTypes", () => {
  it("returns 5 types", () => {
    expect(fireSuppressionPipeTypes()).toHaveLength(5);
  });
});
