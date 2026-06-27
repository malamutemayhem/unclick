import { describe, it, expect } from "vitest";
import {
  impactAbsorb, gripSurface, durability, versatility,
  slamCost, bounces, floorSafe, shellMaterial,
  bestExercise, slamBalls,
} from "../slam-ball-calc.js";

describe("impactAbsorb", () => {
  it("dead bounce sand fill most impact absorb", () => {
    expect(impactAbsorb("dead_bounce_sand_fill")).toBeGreaterThan(impactAbsorb("air_filled_rubber_bounce"));
  });
});

describe("gripSurface", () => {
  it("tire tread textured best grip surface", () => {
    expect(gripSurface("tire_tread_textured")).toBeGreaterThan(gripSurface("air_filled_rubber_bounce"));
  });
});

describe("durability", () => {
  it("tire tread textured most durable", () => {
    expect(durability("tire_tread_textured")).toBeGreaterThan(durability("air_filled_rubber_bounce"));
  });
});

describe("versatility", () => {
  it("air filled rubber bounce most versatile", () => {
    expect(versatility("air_filled_rubber_bounce")).toBeGreaterThan(versatility("d_ball_oversized_atlas"));
  });
});

describe("slamCost", () => {
  it("d ball oversized atlas most expensive", () => {
    expect(slamCost("d_ball_oversized_atlas")).toBeGreaterThan(slamCost("air_filled_rubber_bounce"));
  });
});

describe("bounces", () => {
  it("air filled rubber bounce bounces", () => {
    expect(bounces("air_filled_rubber_bounce")).toBe(true);
  });
  it("dead bounce sand fill does not bounce", () => {
    expect(bounces("dead_bounce_sand_fill")).toBe(false);
  });
});

describe("floorSafe", () => {
  it("dead bounce sand fill is floor safe", () => {
    expect(floorSafe("dead_bounce_sand_fill")).toBe(true);
  });
  it("air filled rubber bounce is not floor safe", () => {
    expect(floorSafe("air_filled_rubber_bounce")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("tire tread textured uses recycled tire rubber", () => {
    expect(shellMaterial("tire_tread_textured")).toBe("recycled_tire_rubber");
  });
});

describe("bestExercise", () => {
  it("dead bounce sand fill best for overhead slam power", () => {
    expect(bestExercise("dead_bounce_sand_fill")).toBe("overhead_slam_power");
  });
});

describe("slamBalls", () => {
  it("returns 5 types", () => {
    expect(slamBalls()).toHaveLength(5);
  });
});
