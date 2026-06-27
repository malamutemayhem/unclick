import { describe, it, expect } from "vitest";
import {
  scoreCrisp, controlFine, durability, paperRange,
  bladeCost, replaceable, forThick, edgeProfile,
  bestUse, scoringBlades,
} from "../scoring-blade-calc.js";

describe("scoreCrisp", () => {
  it("metal blade sharp crispest score", () => {
    expect(scoreCrisp("metal_blade_sharp")).toBeGreaterThan(scoreCrisp("bone_blade_classic"));
  });
});

describe("controlFine", () => {
  it("spring blade press finest control", () => {
    expect(controlFine("spring_blade_press")).toBeGreaterThan(controlFine("wheel_blade_roll"));
  });
});

describe("durability", () => {
  it("metal blade sharp most durable", () => {
    expect(durability("metal_blade_sharp")).toBeGreaterThan(durability("bone_blade_classic"));
  });
});

describe("paperRange", () => {
  it("wheel blade roll widest paper range", () => {
    expect(paperRange("wheel_blade_roll")).toBeGreaterThan(paperRange("metal_blade_sharp"));
  });
});

describe("bladeCost", () => {
  it("spring blade press most expensive", () => {
    expect(bladeCost("spring_blade_press")).toBeGreaterThan(bladeCost("bone_blade_classic"));
  });
});

describe("replaceable", () => {
  it("metal blade sharp is replaceable", () => {
    expect(replaceable("metal_blade_sharp")).toBe(true);
  });
  it("bone blade classic not replaceable", () => {
    expect(replaceable("bone_blade_classic")).toBe(false);
  });
});

describe("forThick", () => {
  it("metal blade sharp is for thick", () => {
    expect(forThick("metal_blade_sharp")).toBe(true);
  });
  it("bone blade classic not for thick", () => {
    expect(forThick("bone_blade_classic")).toBe(false);
  });
});

describe("edgeProfile", () => {
  it("wheel blade roll uses rolling disc wheel", () => {
    expect(edgeProfile("wheel_blade_roll")).toBe("rolling_disc_wheel");
  });
});

describe("bestUse", () => {
  it("bone blade classic best for general hand score", () => {
    expect(bestUse("bone_blade_classic")).toBe("general_hand_score");
  });
});

describe("scoringBlades", () => {
  it("returns 5 types", () => {
    expect(scoringBlades()).toHaveLength(5);
  });
});
