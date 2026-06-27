import { describe, it, expect } from "vitest";
import {
  smoothFinish, controlShape, durability, flexRange,
  ribCost, flexible, forThrowing, ribProfile,
  bestUse, potteryRibs,
} from "../pottery-rib-calc.js";

describe("smoothFinish", () => {
  it("metal rib scrape smoothest finish", () => {
    expect(smoothFinish("metal_rib_scrape")).toBeGreaterThan(smoothFinish("plastic_rib_general"));
  });
});

describe("controlShape", () => {
  it("metal rib scrape best shape control", () => {
    expect(controlShape("metal_rib_scrape")).toBeGreaterThan(controlShape("silicone_rib_soft"));
  });
});

describe("durability", () => {
  it("metal rib scrape most durable", () => {
    expect(durability("metal_rib_scrape")).toBeGreaterThan(durability("plastic_rib_general"));
  });
});

describe("flexRange", () => {
  it("silicone rib soft widest flex range", () => {
    expect(flexRange("silicone_rib_soft")).toBeGreaterThan(flexRange("metal_rib_scrape"));
  });
});

describe("ribCost", () => {
  it("metal rib scrape most expensive", () => {
    expect(ribCost("metal_rib_scrape")).toBeGreaterThan(ribCost("plastic_rib_general"));
  });
});

describe("flexible", () => {
  it("rubber rib flex is flexible", () => {
    expect(flexible("rubber_rib_flex")).toBe(true);
  });
  it("wood rib smooth not flexible", () => {
    expect(flexible("wood_rib_smooth")).toBe(false);
  });
});

describe("forThrowing", () => {
  it("wood rib smooth is for throwing", () => {
    expect(forThrowing("wood_rib_smooth")).toBe(true);
  });
  it("silicone rib soft not for throwing", () => {
    expect(forThrowing("silicone_rib_soft")).toBe(false);
  });
});

describe("ribProfile", () => {
  it("rubber rib flex uses soft rubber curve", () => {
    expect(ribProfile("rubber_rib_flex")).toBe("soft_rubber_curve");
  });
});

describe("bestUse", () => {
  it("wood rib smooth best for general wheel shape", () => {
    expect(bestUse("wood_rib_smooth")).toBe("general_wheel_shape");
  });
});

describe("potteryRibs", () => {
  it("returns 5 types", () => {
    expect(potteryRibs()).toHaveLength(5);
  });
});
