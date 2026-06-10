import { describe, it, expect } from "vitest";
import {
  versatility, impactAbsorb, gripQuality, durability,
  ballCost, bounces, hasHandle, shellMaterial,
  bestExercise, medicineBalls,
} from "../medicine-ball-calc.js";

describe("versatility", () => {
  it("rubber bounce most versatile", () => {
    expect(versatility("rubber_bounce")).toBeGreaterThan(versatility("slam_ball_dead"));
  });
});

describe("impactAbsorb", () => {
  it("slam ball dead best impact absorb", () => {
    expect(impactAbsorb("slam_ball_dead")).toBeGreaterThan(impactAbsorb("rubber_bounce"));
  });
});

describe("gripQuality", () => {
  it("tornado rope handle best grip quality", () => {
    expect(gripQuality("tornado_rope_handle")).toBeGreaterThan(gripQuality("wall_ball_soft"));
  });
});

describe("durability", () => {
  it("slam ball dead most durable", () => {
    expect(durability("slam_ball_dead")).toBeGreaterThan(durability("leather_no_bounce"));
  });
});

describe("ballCost", () => {
  it("tornado rope handle most expensive", () => {
    expect(ballCost("tornado_rope_handle")).toBeGreaterThan(ballCost("rubber_bounce"));
  });
});

describe("bounces", () => {
  it("rubber bounce bounces", () => {
    expect(bounces("rubber_bounce")).toBe(true);
  });
  it("slam ball dead does not", () => {
    expect(bounces("slam_ball_dead")).toBe(false);
  });
});

describe("hasHandle", () => {
  it("tornado rope handle has handle", () => {
    expect(hasHandle("tornado_rope_handle")).toBe(true);
  });
  it("rubber bounce does not", () => {
    expect(hasHandle("rubber_bounce")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("slam ball dead uses thick rubber gel core", () => {
    expect(shellMaterial("slam_ball_dead")).toBe("thick_rubber_gel_core");
  });
});

describe("bestExercise", () => {
  it("slam ball dead for overhead slam power", () => {
    expect(bestExercise("slam_ball_dead")).toBe("overhead_slam_power");
  });
});

describe("medicineBalls", () => {
  it("returns 5 types", () => {
    expect(medicineBalls()).toHaveLength(5);
  });
});
