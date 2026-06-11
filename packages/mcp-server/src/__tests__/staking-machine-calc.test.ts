import { describe, it, expect } from "vitest";
import {
  softnessResult, throughput, grainBreak, uniformity,
  skCost, automated, forGarment, machineConfig,
  bestUse, stakingMachineTypes,
} from "../staking-machine-calc.js";

describe("softnessResult", () => {
  it("vibrating staker best softness result", () => {
    expect(softnessResult("vibrating_staker")).toBeGreaterThan(softnessResult("hand_staking"));
  });
});

describe("throughput", () => {
  it("multi pin staker highest throughput", () => {
    expect(throughput("multi_pin_staker")).toBeGreaterThan(throughput("hand_staking"));
  });
});

describe("grainBreak", () => {
  it("hand staking best grain break", () => {
    expect(grainBreak("hand_staking")).toBeGreaterThan(grainBreak("multi_pin_staker"));
  });
});

describe("uniformity", () => {
  it("vibrating staker best uniformity", () => {
    expect(uniformity("vibrating_staker")).toBeGreaterThan(uniformity("hand_staking"));
  });
});

describe("skCost", () => {
  it("vibrating staker most expensive", () => {
    expect(skCost("vibrating_staker")).toBeGreaterThan(skCost("hand_staking"));
  });
});

describe("automated", () => {
  it("rotary staker is automated", () => {
    expect(automated("rotary_staker")).toBe(true);
  });
  it("hand staking not automated", () => {
    expect(automated("hand_staking")).toBe(false);
  });
});

describe("forGarment", () => {
  it("vibrating staker for garment leather", () => {
    expect(forGarment("vibrating_staker")).toBe(true);
  });
  it("multi pin staker not for garment", () => {
    expect(forGarment("multi_pin_staker")).toBe(false);
  });
});

describe("machineConfig", () => {
  it("vibrating staker uses oscillating plate gentle flex", () => {
    expect(machineConfig("vibrating_staker")).toBe("vibrating_staker_oscillating_plate_gentle_flex_uniform_soft_result");
  });
});

describe("bestUse", () => {
  it("multi pin staker for industrial heavy hide", () => {
    expect(bestUse("multi_pin_staker")).toBe("industrial_tannery_multi_pin_staker_aggressive_heavy_hide_soften");
  });
});

describe("stakingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(stakingMachineTypes()).toHaveLength(5);
  });
});
