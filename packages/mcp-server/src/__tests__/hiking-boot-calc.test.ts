import { describe, it, expect } from "vitest";
import {
  ankleSupport, tractionGrip, bootWeight, breakInTime,
  bootCost, waterproof, cramponCompatible, soleType,
  bestTerrain, hikingBoots,
} from "../hiking-boot-calc.js";

describe("ankleSupport", () => {
  it("mountaineering rigid highest ankle support", () => {
    expect(ankleSupport("mountaineering_rigid")).toBeGreaterThan(ankleSupport("trail_runner_low"));
  });
});

describe("tractionGrip", () => {
  it("mountaineering rigid best traction", () => {
    expect(tractionGrip("mountaineering_rigid")).toBeGreaterThan(tractionGrip("trail_runner_low"));
  });
});

describe("bootWeight", () => {
  it("trail runner low lightest", () => {
    expect(bootWeight("trail_runner_low")).toBeGreaterThan(bootWeight("mountaineering_rigid"));
  });
});

describe("breakInTime", () => {
  it("trail runner low shortest break in", () => {
    expect(breakInTime("trail_runner_low")).toBeGreaterThan(breakInTime("mountaineering_rigid"));
  });
});

describe("bootCost", () => {
  it("mountaineering rigid most expensive", () => {
    expect(bootCost("mountaineering_rigid")).toBeGreaterThan(bootCost("trail_runner_low"));
  });
});

describe("waterproof", () => {
  it("day hike mid is waterproof", () => {
    expect(waterproof("day_hike_mid")).toBe(true);
  });
  it("trail runner low is not", () => {
    expect(waterproof("trail_runner_low")).toBe(false);
  });
});

describe("cramponCompatible", () => {
  it("mountaineering rigid is crampon compatible", () => {
    expect(cramponCompatible("mountaineering_rigid")).toBe(true);
  });
  it("backpacking heavy is not", () => {
    expect(cramponCompatible("backpacking_heavy")).toBe(false);
  });
});

describe("soleType", () => {
  it("approach scramble uses stealth c4 sticky rubber", () => {
    expect(soleType("approach_scramble")).toBe("stealth_c4_sticky_rubber");
  });
});

describe("bestTerrain", () => {
  it("mountaineering rigid for ice snow technical alpine", () => {
    expect(bestTerrain("mountaineering_rigid")).toBe("ice_snow_technical_alpine");
  });
});

describe("hikingBoots", () => {
  it("returns 5 types", () => {
    expect(hikingBoots()).toHaveLength(5);
  });
});
