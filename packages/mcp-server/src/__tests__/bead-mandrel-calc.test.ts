import { describe, it, expect } from "vitest";
import {
  holeSize, releaseEase, heatResist, shapeControl,
  mandrelCost, coated, tapered, mandrelShape,
  bestUse, beadMandrels,
} from "../bead-mandrel-calc.js";

describe("holeSize", () => {
  it("tapered cone shape largest hole size", () => {
    expect(holeSize("tapered_cone_shape")).toBeGreaterThan(holeSize("flat_paddle_press"));
  });
});

describe("releaseEase", () => {
  it("graphite smooth release easiest release", () => {
    expect(releaseEase("graphite_smooth_release")).toBeGreaterThan(releaseEase("steel_straight_round"));
  });
});

describe("heatResist", () => {
  it("graphite smooth release best heat resist", () => {
    expect(heatResist("graphite_smooth_release")).toBeGreaterThan(heatResist("tapered_cone_shape"));
  });
});

describe("shapeControl", () => {
  it("flat paddle press best shape control", () => {
    expect(shapeControl("flat_paddle_press")).toBeGreaterThan(shapeControl("steel_straight_round"));
  });
});

describe("mandrelCost", () => {
  it("graphite smooth release most expensive", () => {
    expect(mandrelCost("graphite_smooth_release")).toBeGreaterThan(mandrelCost("steel_straight_round"));
  });
});

describe("coated", () => {
  it("graphite smooth release is coated", () => {
    expect(coated("graphite_smooth_release")).toBe(true);
  });
  it("steel straight round not coated", () => {
    expect(coated("steel_straight_round")).toBe(false);
  });
});

describe("tapered", () => {
  it("tapered cone shape is tapered", () => {
    expect(tapered("tapered_cone_shape")).toBe(true);
  });
  it("steel straight round not tapered", () => {
    expect(tapered("steel_straight_round")).toBe(false);
  });
});

describe("mandrelShape", () => {
  it("steel straight round uses straight round rod", () => {
    expect(mandrelShape("steel_straight_round")).toBe("straight_round_rod");
  });
});

describe("bestUse", () => {
  it("flat paddle press best for flat tab bead", () => {
    expect(bestUse("flat_paddle_press")).toBe("flat_tab_bead");
  });
});

describe("beadMandrels", () => {
  it("returns 5 types", () => {
    expect(beadMandrels()).toHaveLength(5);
  });
});
