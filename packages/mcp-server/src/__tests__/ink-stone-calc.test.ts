import { describe, it, expect } from "vitest";
import {
  grindSmooth, inkQuality, durability, waterRetain,
  stoneCost, natural, forPractice, stoneOrigin,
  bestUse, inkStones,
} from "../ink-stone-calc.js";

describe("grindSmooth", () => {
  it("duan stone fine smoothest grind", () => {
    expect(grindSmooth("duan_stone_fine")).toBeGreaterThan(grindSmooth("practice_stone_budget"));
  });
});

describe("inkQuality", () => {
  it("duan stone fine best ink quality", () => {
    expect(inkQuality("duan_stone_fine")).toBeGreaterThan(inkQuality("practice_stone_budget"));
  });
});

describe("durability", () => {
  it("duan stone fine most durable", () => {
    expect(durability("duan_stone_fine")).toBeGreaterThan(durability("chengni_clay_soft"));
  });
});

describe("waterRetain", () => {
  it("tao stone smooth best water retain", () => {
    expect(waterRetain("tao_stone_smooth")).toBeGreaterThan(waterRetain("practice_stone_budget"));
  });
});

describe("stoneCost", () => {
  it("duan stone fine most expensive", () => {
    expect(stoneCost("duan_stone_fine")).toBeGreaterThan(stoneCost("practice_stone_budget"));
  });
});

describe("natural", () => {
  it("duan stone fine is natural", () => {
    expect(natural("duan_stone_fine")).toBe(true);
  });
  it("practice stone budget not natural", () => {
    expect(natural("practice_stone_budget")).toBe(false);
  });
});

describe("forPractice", () => {
  it("practice stone budget is for practice", () => {
    expect(forPractice("practice_stone_budget")).toBe(true);
  });
  it("duan stone fine not for practice", () => {
    expect(forPractice("duan_stone_fine")).toBe(false);
  });
});

describe("stoneOrigin", () => {
  it("she stone sharp from anhui she mountain", () => {
    expect(stoneOrigin("she_stone_sharp")).toBe("anhui_she_mountain");
  });
});

describe("bestUse", () => {
  it("practice stone budget best for student daily practice", () => {
    expect(bestUse("practice_stone_budget")).toBe("student_daily_practice");
  });
});

describe("inkStones", () => {
  it("returns 5 types", () => {
    expect(inkStones()).toHaveLength(5);
  });
});
