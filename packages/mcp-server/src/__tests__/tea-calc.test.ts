import { describe, it, expect } from "vitest";
import {
  waterTemp, steepTime, teaAmount, caffeineEstimate,
  resteepCount, waterPerCup, costPerCup, gongfuRatio,
  westernRatio, coldBrewTime, coldBrewRatio, oxidationLevel,
  antioxidantLevel, teaTypes,
} from "../tea-calc.js";

describe("waterTemp", () => {
  it("green is cooler than black", () => {
    expect(waterTemp("green")).toBeLessThan(waterTemp("black"));
  });
});

describe("steepTime", () => {
  it("herbal steeps longest", () => {
    expect(steepTime("herbal").maxSeconds).toBeGreaterThan(steepTime("green").maxSeconds);
  });

  it("matcha has no steep", () => {
    expect(steepTime("matcha").maxSeconds).toBe(0);
  });
});

describe("teaAmount", () => {
  it("positive grams", () => {
    expect(teaAmount(240)).toBe(2.5);
  });
});

describe("caffeineEstimate", () => {
  it("herbal has none", () => {
    expect(caffeineEstimate("herbal")).toBe(0);
  });

  it("matcha has most", () => {
    expect(caffeineEstimate("matcha")).toBeGreaterThan(caffeineEstimate("black"));
  });
});

describe("resteepCount", () => {
  it("puerh resteeps most", () => {
    expect(resteepCount("puerh")).toBeGreaterThan(resteepCount("black"));
  });
});

describe("waterPerCup", () => {
  it("matcha uses less water", () => {
    expect(waterPerCup("matcha")).toBeLessThan(waterPerCup("green"));
  });
});

describe("costPerCup", () => {
  it("cheaper with resteeps", () => {
    expect(costPerCup(0.1, 2.5, 3)).toBeLessThan(costPerCup(0.1, 2.5, 0));
  });
});

describe("gongfuRatio", () => {
  it("oolong uses more leaf", () => {
    expect(gongfuRatio("oolong")).toBeGreaterThan(gongfuRatio("green"));
  });
});

describe("westernRatio", () => {
  it("positive grams", () => {
    expect(westernRatio("black")).toBeGreaterThan(0);
  });
});

describe("coldBrewTime", () => {
  it("12 hours", () => {
    expect(coldBrewTime()).toBe(12);
  });
});

describe("coldBrewRatio", () => {
  it("10g per liter", () => {
    expect(coldBrewRatio()).toBe(10);
  });
});

describe("oxidationLevel", () => {
  it("black is most oxidized tea", () => {
    expect(oxidationLevel("black")).toBeGreaterThan(oxidationLevel("green"));
  });
});

describe("antioxidantLevel", () => {
  it("matcha is very high", () => {
    expect(antioxidantLevel("matcha")).toBe("very high");
  });
});

describe("teaTypes", () => {
  it("returns 7 types", () => {
    expect(teaTypes()).toHaveLength(7);
  });
});
