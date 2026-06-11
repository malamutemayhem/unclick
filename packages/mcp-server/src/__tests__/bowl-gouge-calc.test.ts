import { describe, it, expect } from "vitest";
import {
  hollowReach, surfaceFinish, controlCut, durability,
  gougeCost, forDeep, forBeginners, grindAngle,
  bestUse, bowlGouges,
} from "../bowl-gouge-calc.js";

describe("hollowReach", () => {
  it("bottom feeder deep best hollow reach", () => {
    expect(hollowReach("bottom_feeder_deep")).toBeGreaterThan(hollowReach("micro_bowl_detail"));
  });
});

describe("surfaceFinish", () => {
  it("swept back irish best surface finish", () => {
    expect(surfaceFinish("swept_back_irish")).toBeGreaterThan(surfaceFinish("heavy_bowl_stock"));
  });
});

describe("controlCut", () => {
  it("micro bowl detail best control cut", () => {
    expect(controlCut("micro_bowl_detail")).toBeGreaterThan(controlCut("bottom_feeder_deep"));
  });
});

describe("durability", () => {
  it("heavy bowl stock most durable", () => {
    expect(durability("heavy_bowl_stock")).toBeGreaterThan(durability("micro_bowl_detail"));
  });
});

describe("gougeCost", () => {
  it("heavy bowl stock most expensive", () => {
    expect(gougeCost("heavy_bowl_stock")).toBeGreaterThan(gougeCost("micro_bowl_detail"));
  });
});

describe("forDeep", () => {
  it("swept back irish is for deep", () => {
    expect(forDeep("swept_back_irish")).toBe(true);
  });
  it("traditional grind std not for deep", () => {
    expect(forDeep("traditional_grind_std")).toBe(false);
  });
});

describe("forBeginners", () => {
  it("traditional grind std is for beginners", () => {
    expect(forBeginners("traditional_grind_std")).toBe(true);
  });
  it("swept back irish not for beginners", () => {
    expect(forBeginners("swept_back_irish")).toBe(false);
  });
});

describe("grindAngle", () => {
  it("bottom feeder deep uses steep bottom 70", () => {
    expect(grindAngle("bottom_feeder_deep")).toBe("steep_bottom_70");
  });
});

describe("bestUse", () => {
  it("micro bowl detail best for small bowl detail", () => {
    expect(bestUse("micro_bowl_detail")).toBe("small_bowl_detail");
  });
});

describe("bowlGouges", () => {
  it("returns 5 types", () => {
    expect(bowlGouges()).toHaveLength(5);
  });
});
