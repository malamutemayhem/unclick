import { describe, it, expect } from "vitest";
import {
  handstandControl, pushUpDepth, stability, portability,
  paralCost, foldable, rotatingGrip, frameMaterial,
  bestMove, parallettes,
} from "../parallette-calc.js";

describe("handstandControl", () => {
  it("low wooden gymnastic best handstand control", () => {
    expect(handstandControl("low_wooden_gymnastic")).toBeGreaterThan(handstandControl("rotating_push_up_handle"));
  });
});

describe("pushUpDepth", () => {
  it("medium steel calisthenics best push up depth", () => {
    expect(pushUpDepth("medium_steel_calisthenics")).toBeGreaterThan(pushUpDepth("low_wooden_gymnastic"));
  });
});

describe("stability", () => {
  it("medium steel calisthenics most stable", () => {
    expect(stability("medium_steel_calisthenics")).toBeGreaterThan(stability("tall_pvc_diy"));
  });
});

describe("portability", () => {
  it("rotating push up handle most portable", () => {
    expect(portability("rotating_push_up_handle")).toBeGreaterThan(portability("medium_steel_calisthenics"));
  });
});

describe("paralCost", () => {
  it("medium steel calisthenics most expensive", () => {
    expect(paralCost("medium_steel_calisthenics")).toBeGreaterThan(paralCost("tall_pvc_diy"));
  });
});

describe("foldable", () => {
  it("adjustable height multi is foldable", () => {
    expect(foldable("adjustable_height_multi")).toBe(true);
  });
  it("low wooden gymnastic is not foldable", () => {
    expect(foldable("low_wooden_gymnastic")).toBe(false);
  });
});

describe("rotatingGrip", () => {
  it("rotating push up handle has rotating grip", () => {
    expect(rotatingGrip("rotating_push_up_handle")).toBe(true);
  });
  it("low wooden gymnastic has no rotating grip", () => {
    expect(rotatingGrip("low_wooden_gymnastic")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("low wooden gymnastic uses hardwood birch ash", () => {
    expect(frameMaterial("low_wooden_gymnastic")).toBe("hardwood_birch_ash");
  });
});

describe("bestMove", () => {
  it("low wooden gymnastic best for l sit planche hold", () => {
    expect(bestMove("low_wooden_gymnastic")).toBe("l_sit_planche_hold");
  });
});

describe("parallettes", () => {
  it("returns 5 types", () => {
    expect(parallettes()).toHaveLength(5);
  });
});
