import { describe, it, expect } from "vitest";
import {
  stockRemoval, surfaceFinish, controlEase, durability,
  gougeCost, forBowl, forBeginners, fluteProfile,
  bestUse, roughingGouges,
} from "../roughing-gouge-calc.js";

describe("stockRemoval", () => {
  it("continental roughing deep best stock removal", () => {
    expect(stockRemoval("continental_roughing_deep")).toBeGreaterThan(stockRemoval("mini_roughing_detail"));
  });
});

describe("surfaceFinish", () => {
  it("fingernail roughing mod best surface finish", () => {
    expect(surfaceFinish("fingernail_roughing_mod")).toBeGreaterThan(surfaceFinish("heavy_roughing_stock"));
  });
});

describe("controlEase", () => {
  it("mini roughing detail easiest control", () => {
    expect(controlEase("mini_roughing_detail")).toBeGreaterThan(controlEase("heavy_roughing_stock"));
  });
});

describe("durability", () => {
  it("heavy roughing stock most durable", () => {
    expect(durability("heavy_roughing_stock")).toBeGreaterThan(durability("mini_roughing_detail"));
  });
});

describe("gougeCost", () => {
  it("heavy roughing stock most expensive", () => {
    expect(gougeCost("heavy_roughing_stock")).toBeGreaterThan(gougeCost("mini_roughing_detail"));
  });
});

describe("forBowl", () => {
  it("fingernail roughing mod is for bowl", () => {
    expect(forBowl("fingernail_roughing_mod")).toBe(true);
  });
  it("standard roughing wide not for bowl", () => {
    expect(forBowl("standard_roughing_wide")).toBe(false);
  });
});

describe("forBeginners", () => {
  it("standard roughing wide is for beginners", () => {
    expect(forBeginners("standard_roughing_wide")).toBe(true);
  });
  it("continental roughing deep not for beginners", () => {
    expect(forBeginners("continental_roughing_deep")).toBe(false);
  });
});

describe("fluteProfile", () => {
  it("continental roughing deep uses deep v channel", () => {
    expect(fluteProfile("continental_roughing_deep")).toBe("deep_v_channel");
  });
});

describe("bestUse", () => {
  it("mini roughing detail best for small spindle rough", () => {
    expect(bestUse("mini_roughing_detail")).toBe("small_spindle_rough");
  });
});

describe("roughingGouges", () => {
  it("returns 5 types", () => {
    expect(roughingGouges()).toHaveLength(5);
  });
});
