import { describe, it, expect } from "vitest";
import {
  rotationSpeed, calorieBurn, feedbackArc, durability,
  ropeCost, adjustableLength, tracksReps, cordMaterial,
  bestWorkout, jumpRopes,
} from "../jump-rope-calc.js";

describe("rotationSpeed", () => {
  it("speed wire fastest rotation", () => {
    expect(rotationSpeed("speed_wire")).toBeGreaterThan(rotationSpeed("weighted_heavy"));
  });
});

describe("calorieBurn", () => {
  it("weighted heavy most calorie burn", () => {
    expect(calorieBurn("weighted_heavy")).toBeGreaterThan(calorieBurn("beaded_segment"));
  });
});

describe("feedbackArc", () => {
  it("beaded segment best feedback arc", () => {
    expect(feedbackArc("beaded_segment")).toBeGreaterThan(feedbackArc("speed_wire"));
  });
});

describe("durability", () => {
  it("beaded segment most durable", () => {
    expect(durability("beaded_segment")).toBeGreaterThan(durability("smart_digital"));
  });
});

describe("ropeCost", () => {
  it("smart digital most expensive", () => {
    expect(ropeCost("smart_digital")).toBeGreaterThan(ropeCost("beaded_segment"));
  });
});

describe("adjustableLength", () => {
  it("speed wire is adjustable length", () => {
    expect(adjustableLength("speed_wire")).toBe(true);
  });
  it("leather classic is not", () => {
    expect(adjustableLength("leather_classic")).toBe(false);
  });
});

describe("tracksReps", () => {
  it("smart digital tracks reps", () => {
    expect(tracksReps("smart_digital")).toBe(true);
  });
  it("speed wire does not", () => {
    expect(tracksReps("speed_wire")).toBe(false);
  });
});

describe("cordMaterial", () => {
  it("leather classic uses genuine leather cord", () => {
    expect(cordMaterial("leather_classic")).toBe("genuine_leather_cord");
  });
});

describe("bestWorkout", () => {
  it("speed wire for double under crossfit", () => {
    expect(bestWorkout("speed_wire")).toBe("double_under_crossfit");
  });
});

describe("jumpRopes", () => {
  it("returns 5 types", () => {
    expect(jumpRopes()).toHaveLength(5);
  });
});
