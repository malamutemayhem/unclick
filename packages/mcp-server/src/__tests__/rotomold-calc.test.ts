import { describe, it, expect } from "vitest";
import {
  wallUniformity, sizeCapability, speed, toolingCost,
  rmCost, multiWall, forLargePart, heating,
  bestUse, rotomoldTypes,
} from "../rotomold-calc.js";

describe("wallUniformity", () => {
  it("biaxial best wall uniformity", () => {
    expect(wallUniformity("biaxial_rock_roll")).toBeGreaterThan(wallUniformity("oven_less_direct_heat"));
  });
});

describe("sizeCapability", () => {
  it("drop arm largest size", () => {
    expect(sizeCapability("drop_arm_swing")).toBeGreaterThan(sizeCapability("oven_less_direct_heat"));
  });
});

describe("speed", () => {
  it("carousel fastest throughput", () => {
    expect(speed("carousel_multi_arm")).toBeGreaterThan(speed("drop_arm_swing"));
  });
});

describe("toolingCost", () => {
  it("carousel highest tooling cost", () => {
    expect(toolingCost("carousel_multi_arm")).toBeGreaterThan(toolingCost("clamshell_shuttle"));
  });
});

describe("rmCost", () => {
  it("oven less most expensive", () => {
    expect(rmCost("oven_less_direct_heat")).toBeGreaterThan(rmCost("clamshell_shuttle"));
  });
});

describe("multiWall", () => {
  it("carousel supports multi wall", () => {
    expect(multiWall("carousel_multi_arm")).toBe(true);
  });
  it("biaxial not multi wall", () => {
    expect(multiWall("biaxial_rock_roll")).toBe(false);
  });
});

describe("forLargePart", () => {
  it("biaxial for large part", () => {
    expect(forLargePart("biaxial_rock_roll")).toBe(true);
  });
  it("oven less not for large part", () => {
    expect(forLargePart("oven_less_direct_heat")).toBe(false);
  });
});

describe("heating", () => {
  it("drop arm uses swing arm oven", () => {
    expect(heating("drop_arm_swing")).toBe("swing_arm_independent_oven");
  });
});

describe("bestUse", () => {
  it("clamshell for kayak boat hull", () => {
    expect(bestUse("clamshell_shuttle")).toBe("kayak_boat_hull_large_hollow");
  });
});

describe("rotomoldTypes", () => {
  it("returns 5 types", () => {
    expect(rotomoldTypes()).toHaveLength(5);
  });
});
