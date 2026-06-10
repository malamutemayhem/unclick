import { describe, it, expect } from "vitest";
import {
  stability, exerciseRange, durability, portability,
  ballCost, antiBurst, weighted, shellMaterial,
  bestWorkout, exerciseBalls,
} from "../exercise-ball-calc.js";

describe("stability", () => {
  it("peanut stability physio most stable", () => {
    expect(stability("peanut_stability_physio")).toBeGreaterThan(stability("weighted_medicine_slam"));
  });
});

describe("exerciseRange", () => {
  it("anti burst 65cm widest exercise range", () => {
    expect(exerciseRange("anti_burst_65cm")).toBeGreaterThan(exerciseRange("mini_pilates_25cm"));
  });
});

describe("durability", () => {
  it("anti burst 65cm most durable", () => {
    expect(durability("anti_burst_65cm")).toBeGreaterThan(durability("standard_pvc_55cm"));
  });
});

describe("portability", () => {
  it("mini pilates 25cm most portable", () => {
    expect(portability("mini_pilates_25cm")).toBeGreaterThan(portability("anti_burst_65cm"));
  });
});

describe("ballCost", () => {
  it("weighted medicine slam most expensive", () => {
    expect(ballCost("weighted_medicine_slam")).toBeGreaterThan(ballCost("mini_pilates_25cm"));
  });
});

describe("antiBurst", () => {
  it("anti burst 65cm is anti burst", () => {
    expect(antiBurst("anti_burst_65cm")).toBe(true);
  });
  it("standard pvc 55cm is not", () => {
    expect(antiBurst("standard_pvc_55cm")).toBe(false);
  });
});

describe("weighted", () => {
  it("weighted medicine slam is weighted", () => {
    expect(weighted("weighted_medicine_slam")).toBe(true);
  });
  it("anti burst 65cm is not", () => {
    expect(weighted("anti_burst_65cm")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("weighted medicine slam uses rubber sand fill shell", () => {
    expect(shellMaterial("weighted_medicine_slam")).toBe("rubber_sand_fill_shell");
  });
});

describe("bestWorkout", () => {
  it("mini pilates 25cm best for pilates barre squeeze", () => {
    expect(bestWorkout("mini_pilates_25cm")).toBe("pilates_barre_squeeze");
  });
});

describe("exerciseBalls", () => {
  it("returns 5 types", () => {
    expect(exerciseBalls()).toHaveLength(5);
  });
});
