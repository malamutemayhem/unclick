import { describe, it, expect } from "vitest";
import {
  gripPrecision, versatility, safety, fineHairGrip,
  tweezCost, travelSafe, alignedTips, tipMaterial,
  bestUse, tweezers,
} from "../tweezers-calc.js";

describe("gripPrecision", () => {
  it("point tip ingrown most precise grip", () => {
    expect(gripPrecision("point_tip_ingrown")).toBeGreaterThan(gripPrecision("round_tip_safety"));
  });
});

describe("versatility", () => {
  it("slant tip precision most versatile", () => {
    expect(versatility("slant_tip_precision")).toBeGreaterThan(versatility("scissor_handle_craft"));
  });
});

describe("safety", () => {
  it("round tip safety safest", () => {
    expect(safety("round_tip_safety")).toBeGreaterThan(safety("point_tip_ingrown"));
  });
});

describe("fineHairGrip", () => {
  it("point tip ingrown best fine hair grip", () => {
    expect(fineHairGrip("point_tip_ingrown")).toBeGreaterThan(fineHairGrip("round_tip_safety"));
  });
});

describe("tweezCost", () => {
  it("scissor handle craft most expensive", () => {
    expect(tweezCost("scissor_handle_craft")).toBeGreaterThan(tweezCost("flat_tip_splinter"));
  });
});

describe("travelSafe", () => {
  it("slant tip precision is travel safe", () => {
    expect(travelSafe("slant_tip_precision")).toBe(true);
  });
  it("point tip ingrown is not", () => {
    expect(travelSafe("point_tip_ingrown")).toBe(false);
  });
});

describe("alignedTips", () => {
  it("slant tip precision has aligned tips", () => {
    expect(alignedTips("slant_tip_precision")).toBe(true);
  });
  it("round tip safety does not", () => {
    expect(alignedTips("round_tip_safety")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("point tip ingrown uses surgical steel sharp", () => {
    expect(tipMaterial("point_tip_ingrown")).toBe("surgical_steel_sharp");
  });
});

describe("bestUse", () => {
  it("slant tip precision best for eyebrow shaping daily", () => {
    expect(bestUse("slant_tip_precision")).toBe("eyebrow_shaping_daily");
  });
});

describe("tweezers", () => {
  it("returns 5 types", () => {
    expect(tweezers()).toHaveLength(5);
  });
});
