import { describe, it, expect } from "vitest";
import {
  pullForce, speed, reliability, noiseLevel,
  awCost, hydraulic, forDeepWater, drive,
  bestUse, anchorWindlassTypes,
} from "../anchor-windlass-calc.js";

describe("pullForce", () => {
  it("hydraulic horizontal highest pull force", () => {
    expect(pullForce("hydraulic_horizontal")).toBeGreaterThan(pullForce("electric_horizontal"));
  });
});

describe("speed", () => {
  it("electric horizontal fastest", () => {
    expect(speed("electric_horizontal")).toBeGreaterThan(speed("combined_mooring"));
  });
});

describe("reliability", () => {
  it("hydraulic vertical most reliable", () => {
    expect(reliability("hydraulic_vertical")).toBeGreaterThan(reliability("electric_vertical"));
  });
});

describe("noiseLevel", () => {
  it("electric vertical noisiest", () => {
    expect(noiseLevel("electric_vertical")).toBeGreaterThan(noiseLevel("hydraulic_horizontal"));
  });
});

describe("awCost", () => {
  it("combined mooring most expensive", () => {
    expect(awCost("combined_mooring")).toBeGreaterThan(awCost("electric_horizontal"));
  });
});

describe("hydraulic", () => {
  it("hydraulic vertical is hydraulic", () => {
    expect(hydraulic("hydraulic_vertical")).toBe(true);
  });
  it("electric vertical not hydraulic", () => {
    expect(hydraulic("electric_vertical")).toBe(false);
  });
});

describe("forDeepWater", () => {
  it("hydraulic horizontal for deep water", () => {
    expect(forDeepWater("hydraulic_horizontal")).toBe(true);
  });
  it("electric horizontal not for deep water", () => {
    expect(forDeepWater("electric_horizontal")).toBe(false);
  });
});

describe("drive", () => {
  it("combined mooring uses hydraulic combined windlass", () => {
    expect(drive("combined_mooring")).toBe("hydraulic_combined_windlass_mooring_winch_split_drum_unit");
  });
});

describe("bestUse", () => {
  it("electric vertical for medium vessel", () => {
    expect(bestUse("electric_vertical")).toBe("medium_vessel_ferry_yacht_quiet_operation_low_maintenance");
  });
});

describe("anchorWindlassTypes", () => {
  it("returns 5 types", () => {
    expect(anchorWindlassTypes()).toHaveLength(5);
  });
});
