import { describe, it, expect } from "vitest";
import {
  windSpeed, skeinCapacity, foldability, stability,
  swiftCost, freestanding, clampMount, swiftFrame,
  bestUse, yarnSwifts,
} from "../yarn-swift-calc.js";

describe("windSpeed", () => {
  it("ball winder combo fastest wind", () => {
    expect(windSpeed("ball_winder_combo")).toBeGreaterThan(windSpeed("amish_style_vertical"));
  });
});

describe("skeinCapacity", () => {
  it("skein winder rotary highest capacity", () => {
    expect(skeinCapacity("skein_winder_rotary")).toBeGreaterThan(skeinCapacity("ball_winder_combo"));
  });
});

describe("foldability", () => {
  it("umbrella fold wood most foldable", () => {
    expect(foldability("umbrella_fold_wood")).toBeGreaterThan(foldability("amish_style_vertical"));
  });
});

describe("stability", () => {
  it("skein winder rotary most stable", () => {
    expect(stability("skein_winder_rotary")).toBeGreaterThan(stability("umbrella_fold_wood"));
  });
});

describe("swiftCost", () => {
  it("skein winder rotary most expensive", () => {
    expect(swiftCost("skein_winder_rotary")).toBeGreaterThan(swiftCost("umbrella_fold_wood"));
  });
});

describe("freestanding", () => {
  it("amish style vertical is freestanding", () => {
    expect(freestanding("amish_style_vertical")).toBe(true);
  });
  it("umbrella fold wood not freestanding", () => {
    expect(freestanding("umbrella_fold_wood")).toBe(false);
  });
});

describe("clampMount", () => {
  it("umbrella fold wood has clamp mount", () => {
    expect(clampMount("umbrella_fold_wood")).toBe(true);
  });
  it("amish style vertical no clamp mount", () => {
    expect(clampMount("amish_style_vertical")).toBe(false);
  });
});

describe("swiftFrame", () => {
  it("umbrella fold wood uses birch umbrella fold", () => {
    expect(swiftFrame("umbrella_fold_wood")).toBe("birch_umbrella_fold");
  });
});

describe("bestUse", () => {
  it("ball winder combo best for skein to ball fast", () => {
    expect(bestUse("ball_winder_combo")).toBe("skein_to_ball_fast");
  });
});

describe("yarnSwifts", () => {
  it("returns 5 types", () => {
    expect(yarnSwifts()).toHaveLength(5);
  });
});
