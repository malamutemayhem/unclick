import { describe, it, expect } from "vitest";
import {
  support, softness, breathability, durability,
  pillowCost, hypoallergenic, machineWash, fillType,
  bestSleeper, bedPillows,
} from "../bed-pillow-calc.js";

describe("support", () => {
  it("latex natural firm best support", () => {
    expect(support("latex_natural_firm")).toBeGreaterThan(support("down_feather_soft"));
  });
});

describe("softness", () => {
  it("down feather soft softest", () => {
    expect(softness("down_feather_soft")).toBeGreaterThan(softness("buckwheat_hull_adjust"));
  });
});

describe("breathability", () => {
  it("buckwheat hull adjust most breathable", () => {
    expect(breathability("buckwheat_hull_adjust")).toBeGreaterThan(breathability("memory_foam_contour"));
  });
});

describe("durability", () => {
  it("latex natural firm most durable", () => {
    expect(durability("latex_natural_firm")).toBeGreaterThan(durability("down_feather_soft"));
  });
});

describe("pillowCost", () => {
  it("down feather soft most expensive", () => {
    expect(pillowCost("down_feather_soft")).toBeGreaterThan(pillowCost("gel_fiber_cooling"));
  });
});

describe("hypoallergenic", () => {
  it("memory foam contour is hypoallergenic", () => {
    expect(hypoallergenic("memory_foam_contour")).toBe(true);
  });
  it("down feather soft is not", () => {
    expect(hypoallergenic("down_feather_soft")).toBe(false);
  });
});

describe("machineWash", () => {
  it("gel fiber cooling is machine washable", () => {
    expect(machineWash("gel_fiber_cooling")).toBe(true);
  });
  it("memory foam contour is not", () => {
    expect(machineWash("memory_foam_contour")).toBe(false);
  });
});

describe("fillType", () => {
  it("buckwheat hull adjust uses organic buckwheat hull", () => {
    expect(fillType("buckwheat_hull_adjust")).toBe("organic_buckwheat_hull");
  });
});

describe("bestSleeper", () => {
  it("memory foam contour best for side sleeper neck align", () => {
    expect(bestSleeper("memory_foam_contour")).toBe("side_sleeper_neck_align");
  });
});

describe("bedPillows", () => {
  it("returns 5 types", () => {
    expect(bedPillows()).toHaveLength(5);
  });
});
