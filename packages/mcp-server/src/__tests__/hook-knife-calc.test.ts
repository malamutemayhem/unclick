import { describe, it, expect } from "vitest";
import {
  hollowReach, cutSmooth, versatility, sharpenEase,
  knifeCost, doubleEdge, leftHand, curveRadius,
  bestUse, hookKnives,
} from "../hook-knife-calc.js";

describe("hollowReach", () => {
  it("tight radius small best hollow reach", () => {
    expect(hollowReach("tight_radius_small")).toBeGreaterThan(hollowReach("open_curve_large"));
  });
});

describe("cutSmooth", () => {
  it("open curve large smoothest cut", () => {
    expect(cutSmooth("open_curve_large")).toBeGreaterThan(cutSmooth("tight_radius_small"));
  });
});

describe("versatility", () => {
  it("double edge both most versatile", () => {
    expect(versatility("double_edge_both")).toBeGreaterThan(versatility("right_hand_single"));
  });
});

describe("sharpenEase", () => {
  it("open curve large easiest to sharpen", () => {
    expect(sharpenEase("open_curve_large")).toBeGreaterThan(sharpenEase("tight_radius_small"));
  });
});

describe("knifeCost", () => {
  it("double edge both most expensive", () => {
    expect(knifeCost("double_edge_both")).toBeGreaterThan(knifeCost("right_hand_single"));
  });
});

describe("doubleEdge", () => {
  it("double edge both is double edge", () => {
    expect(doubleEdge("double_edge_both")).toBe(true);
  });
  it("right hand single not double edge", () => {
    expect(doubleEdge("right_hand_single")).toBe(false);
  });
});

describe("leftHand", () => {
  it("left hand single is left hand", () => {
    expect(leftHand("left_hand_single")).toBe(true);
  });
  it("right hand single not left hand", () => {
    expect(leftHand("right_hand_single")).toBe(false);
  });
});

describe("curveRadius", () => {
  it("tight radius small uses tight small curve", () => {
    expect(curveRadius("tight_radius_small")).toBe("tight_small_curve");
  });
});

describe("bestUse", () => {
  it("double edge both best for ambidextrous hollow", () => {
    expect(bestUse("double_edge_both")).toBe("ambidextrous_hollow");
  });
});

describe("hookKnives", () => {
  it("returns 5 types", () => {
    expect(hookKnives()).toHaveLength(5);
  });
});
