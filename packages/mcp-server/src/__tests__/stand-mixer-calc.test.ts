import { describe, it, expect } from "vitest";
import {
  mixingPower, bowlCapacity, versatility, counterFootprint,
  mixerCost, attachmentHub, splashGuard, driveType,
  bestBake, standMixers,
} from "../stand-mixer-calc.js";

describe("mixingPower", () => {
  it("spiral dough most mixing power", () => {
    expect(mixingPower("spiral_dough")).toBeGreaterThan(mixingPower("compact_mini"));
  });
});

describe("bowlCapacity", () => {
  it("planetary commercial largest bowl", () => {
    expect(bowlCapacity("planetary_commercial")).toBeGreaterThan(bowlCapacity("compact_mini"));
  });
});

describe("versatility", () => {
  it("bowl lift pro most versatile", () => {
    expect(versatility("bowl_lift_pro")).toBeGreaterThan(versatility("spiral_dough"));
  });
});

describe("counterFootprint", () => {
  it("planetary commercial largest footprint", () => {
    expect(counterFootprint("planetary_commercial")).toBeGreaterThan(counterFootprint("compact_mini"));
  });
});

describe("mixerCost", () => {
  it("planetary commercial most expensive", () => {
    expect(mixerCost("planetary_commercial")).toBeGreaterThan(mixerCost("compact_mini"));
  });
});

describe("attachmentHub", () => {
  it("tilt head home has attachment hub", () => {
    expect(attachmentHub("tilt_head_home")).toBe(true);
  });
  it("spiral dough does not", () => {
    expect(attachmentHub("spiral_dough")).toBe(false);
  });
});

describe("splashGuard", () => {
  it("bowl lift pro has splash guard", () => {
    expect(splashGuard("bowl_lift_pro")).toBe(true);
  });
  it("tilt head home does not", () => {
    expect(splashGuard("tilt_head_home")).toBe(false);
  });
});

describe("driveType", () => {
  it("spiral dough uses spiral hook fixed bowl", () => {
    expect(driveType("spiral_dough")).toBe("spiral_hook_fixed_bowl");
  });
});

describe("bestBake", () => {
  it("compact mini for small batch apartment", () => {
    expect(bestBake("compact_mini")).toBe("small_batch_apartment");
  });
});

describe("standMixers", () => {
  it("returns 5 types", () => {
    expect(standMixers()).toHaveLength(5);
  });
});
