import { describe, it, expect } from "vitest";
import {
  edgeStraight, jointTight, speedJoint, staveRange,
  jointerCost, powered, forCurved, planeLength,
  bestUse, staveJointers,
} from "../stave-jointer-calc.js";

describe("edgeStraight", () => {
  it("long try plane straightest edge", () => {
    expect(edgeStraight("long_try_plane")).toBeGreaterThan(edgeStraight("hand_plane_short"));
  });
});

describe("jointTight", () => {
  it("jointer bench inverted tightest joint", () => {
    expect(jointTight("jointer_bench_inverted")).toBeGreaterThan(jointTight("hand_plane_short"));
  });
});

describe("speedJoint", () => {
  it("electric jointer power fastest joint", () => {
    expect(speedJoint("electric_jointer_power")).toBeGreaterThan(speedJoint("hollow_joint_curved"));
  });
});

describe("staveRange", () => {
  it("jointer bench inverted best stave range", () => {
    expect(staveRange("jointer_bench_inverted")).toBeGreaterThan(staveRange("hand_plane_short"));
  });
});

describe("jointerCost", () => {
  it("electric jointer power most expensive", () => {
    expect(jointerCost("electric_jointer_power")).toBeGreaterThan(jointerCost("hand_plane_short"));
  });
});

describe("powered", () => {
  it("electric jointer power is powered", () => {
    expect(powered("electric_jointer_power")).toBe(true);
  });
  it("long try plane not powered", () => {
    expect(powered("long_try_plane")).toBe(false);
  });
});

describe("forCurved", () => {
  it("hollow joint curved is for curved", () => {
    expect(forCurved("hollow_joint_curved")).toBe(true);
  });
  it("long try plane not for curved", () => {
    expect(forCurved("long_try_plane")).toBe(false);
  });
});

describe("planeLength", () => {
  it("jointer bench inverted uses bench 72 inch", () => {
    expect(planeLength("jointer_bench_inverted")).toBe("bench_72_inch");
  });
});

describe("bestUse", () => {
  it("jointer bench inverted best for production stave edge", () => {
    expect(bestUse("jointer_bench_inverted")).toBe("production_stave_edge");
  });
});

describe("staveJointers", () => {
  it("returns 5 types", () => {
    expect(staveJointers()).toHaveLength(5);
  });
});
