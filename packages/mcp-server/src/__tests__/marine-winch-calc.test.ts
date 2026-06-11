import { describe, it, expect } from "vitest";
import {
  pullForce, speed, lineCapacity, controlPrecision,
  mwCost, hydraulic, forOffshore, drive,
  bestUse, marineWinchTypes,
} from "../marine-winch-calc.js";

describe("pullForce", () => {
  it("towing traction and anchor handling highest pull force", () => {
    expect(pullForce("towing_traction")).toBeGreaterThan(pullForce("cargo_deck"));
    expect(pullForce("anchor_handling")).toBeGreaterThan(pullForce("cargo_deck"));
  });
});

describe("speed", () => {
  it("cargo deck fastest", () => {
    expect(speed("cargo_deck")).toBeGreaterThan(speed("deep_sea_research"));
  });
});

describe("lineCapacity", () => {
  it("anchor handling highest line capacity", () => {
    expect(lineCapacity("anchor_handling")).toBeGreaterThan(lineCapacity("cargo_deck"));
  });
});

describe("controlPrecision", () => {
  it("deep sea research best control precision", () => {
    expect(controlPrecision("deep_sea_research")).toBeGreaterThan(controlPrecision("mooring_drum"));
  });
});

describe("mwCost", () => {
  it("deep sea research most expensive", () => {
    expect(mwCost("deep_sea_research")).toBeGreaterThan(mwCost("cargo_deck"));
  });
});

describe("hydraulic", () => {
  it("mooring drum is hydraulic", () => {
    expect(hydraulic("mooring_drum")).toBe(true);
  });
  it("deep sea research not hydraulic", () => {
    expect(hydraulic("deep_sea_research")).toBe(false);
  });
});

describe("forOffshore", () => {
  it("anchor handling for offshore", () => {
    expect(forOffshore("anchor_handling")).toBe(true);
  });
  it("mooring drum not for offshore", () => {
    expect(forOffshore("mooring_drum")).toBe(false);
  });
});

describe("drive", () => {
  it("deep sea research uses electric servo drive", () => {
    expect(drive("deep_sea_research")).toBe("electric_servo_drive_heave_compensated_fiber_optic_cable");
  });
});

describe("bestUse", () => {
  it("towing traction for tugboat operations", () => {
    expect(bestUse("towing_traction")).toBe("tugboat_ocean_towing_salvage_barge_heavy_tow_operation");
  });
});

describe("marineWinchTypes", () => {
  it("returns 5 types", () => {
    expect(marineWinchTypes()).toHaveLength(5);
  });
});
