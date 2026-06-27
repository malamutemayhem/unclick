import { describe, it, expect } from "vitest";
import {
  powerCapacity, throughput, speedRatio, efficiency,
  bdCost, synchronous, forPrecision, beltConfig,
  bestUse, beltDriveTypes,
} from "../belt-drive-calc.js";

describe("powerCapacity", () => {
  it("v belt best power capacity", () => {
    expect(powerCapacity("v_belt_drive")).toBeGreaterThan(powerCapacity("round_belt"));
  });
});

describe("throughput", () => {
  it("v belt highest throughput", () => {
    expect(throughput("v_belt_drive")).toBeGreaterThan(throughput("round_belt"));
  });
});

describe("speedRatio", () => {
  it("poly v belt best speed ratio", () => {
    expect(speedRatio("poly_v_belt")).toBeGreaterThan(speedRatio("round_belt"));
  });
});

describe("efficiency", () => {
  it("flat belt best efficiency", () => {
    expect(efficiency("flat_belt")).toBeGreaterThan(efficiency("v_belt_drive"));
  });
});

describe("bdCost", () => {
  it("timing belt most expensive", () => {
    expect(bdCost("timing_belt")).toBeGreaterThan(bdCost("round_belt"));
  });
});

describe("synchronous", () => {
  it("timing belt is synchronous", () => {
    expect(synchronous("timing_belt")).toBe(true);
  });
  it("flat belt not synchronous", () => {
    expect(synchronous("flat_belt")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("timing belt for precision", () => {
    expect(forPrecision("timing_belt")).toBe(true);
  });
  it("v belt not for precision", () => {
    expect(forPrecision("v_belt_drive")).toBe(false);
  });
});

describe("beltConfig", () => {
  it("poly v uses multi rib compact high speed ratio appliance", () => {
    expect(beltConfig("poly_v_belt")).toBe("poly_v_belt_drive_multi_rib_compact_high_speed_ratio_appliance");
  });
});

describe("bestUse", () => {
  it("round belt for light conveyor elastic twist right angle sort", () => {
    expect(bestUse("round_belt")).toBe("light_conveyor_round_belt_drive_elastic_twist_right_angle_sort");
  });
});

describe("beltDriveTypes", () => {
  it("returns 5 types", () => {
    expect(beltDriveTypes()).toHaveLength(5);
  });
});
