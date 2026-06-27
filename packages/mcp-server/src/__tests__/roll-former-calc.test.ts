import { describe, it, expect } from "vitest";
import {
  profileAccuracy, throughput, materialRange, toolChangeTime,
  rfCost, inline, forStructural, formerConfig,
  bestUse, rollFormerTypes,
} from "../roll-former-calc.js";

describe("profileAccuracy", () => {
  it("flexible roll best profile accuracy", () => {
    expect(profileAccuracy("flexible_roll")).toBeGreaterThan(profileAccuracy("standard_roll"));
  });
});

describe("throughput", () => {
  it("duplex roll highest throughput", () => {
    expect(throughput("duplex_roll")).toBeGreaterThan(throughput("flexible_roll"));
  });
});

describe("materialRange", () => {
  it("flexible roll widest material range", () => {
    expect(materialRange("flexible_roll")).toBeGreaterThan(materialRange("standard_roll"));
  });
});

describe("toolChangeTime", () => {
  it("flexible roll best tool change time", () => {
    expect(toolChangeTime("flexible_roll")).toBeGreaterThan(toolChangeTime("standard_roll"));
  });
});

describe("rfCost", () => {
  it("flexible roll most expensive", () => {
    expect(rfCost("flexible_roll")).toBeGreaterThan(rfCost("standard_roll"));
  });
});

describe("inline", () => {
  it("pre punch roll is inline", () => {
    expect(inline("pre_punch_roll")).toBe(true);
  });
  it("standard roll not inline", () => {
    expect(inline("standard_roll")).toBe(false);
  });
});

describe("forStructural", () => {
  it("standard roll for structural", () => {
    expect(forStructural("standard_roll")).toBe(true);
  });
  it("flexible roll not for structural", () => {
    expect(forStructural("flexible_roll")).toBe(false);
  });
});

describe("formerConfig", () => {
  it("flexible roll uses cnc servo adjust variable cross section", () => {
    expect(formerConfig("flexible_roll")).toBe("flexible_roll_former_cnc_servo_adjust_variable_cross_section");
  });
});

describe("bestUse", () => {
  it("duplex roll for high volume dual head two profile parallel", () => {
    expect(bestUse("duplex_roll")).toBe("high_volume_duplex_roll_former_dual_head_two_profile_parallel");
  });
});

describe("rollFormerTypes", () => {
  it("returns 5 types", () => {
    expect(rollFormerTypes()).toHaveLength(5);
  });
});
