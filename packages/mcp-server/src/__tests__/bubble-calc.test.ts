import { describe, it, expect } from "vitest";
import {
  surfaceTension, bubbleDiameterCm, bubbleVolumeMl, filmThicknessNm,
  lifetimeSeconds, solutionRatio, wandSize, bubblesPerLiter,
  freezingTemp, iridescenceColors, popVolume, solutionCost,
  bubbleTypes,
} from "../bubble-calc.js";

describe("surfaceTension", () => {
  it("professional highest", () => {
    expect(surfaceTension("professional")).toBeGreaterThan(surfaceTension("dish_soap"));
  });
});

describe("bubbleDiameterCm", () => {
  it("positive cm", () => {
    expect(bubbleDiameterCm(5, 2)).toBeGreaterThan(0);
  });
});

describe("bubbleVolumeMl", () => {
  it("positive ml", () => {
    expect(bubbleVolumeMl(10)).toBeGreaterThan(0);
  });
});

describe("filmThicknessNm", () => {
  it("professional thickest", () => {
    expect(filmThicknessNm("professional")).toBeGreaterThan(filmThicknessNm("dish_soap"));
  });
});

describe("lifetimeSeconds", () => {
  it("humidity extends lifetime", () => {
    expect(lifetimeSeconds("glycerin_mix", 80)).toBeGreaterThan(lifetimeSeconds("glycerin_mix", 20));
  });
});

describe("solutionRatio", () => {
  it("has water and soap", () => {
    const r = solutionRatio("glycerin_mix");
    expect(r.water).toBeGreaterThan(0);
    expect(r.soap).toBeGreaterThan(0);
  });
});

describe("wandSize", () => {
  it("giant is largest", () => {
    expect(wandSize("giant")).toBeGreaterThan(wandSize("standard"));
  });
});

describe("bubblesPerLiter", () => {
  it("positive count", () => {
    expect(bubblesPerLiter(5)).toBeGreaterThan(0);
  });
  it("zero diameter returns 0", () => {
    expect(bubblesPerLiter(0)).toBe(0);
  });
});

describe("freezingTemp", () => {
  it("is -10C", () => {
    expect(freezingTemp()).toBe(-10);
  });
});

describe("iridescenceColors", () => {
  it("is 7", () => {
    expect(iridescenceColors()).toBe(7);
  });
});

describe("popVolume", () => {
  it("small = quiet", () => {
    expect(popVolume(3)).toBe("quiet");
  });
  it("huge = loud", () => {
    expect(popVolume(60)).toContain("loud");
  });
});

describe("solutionCost", () => {
  it("professional most expensive", () => {
    expect(solutionCost(1, "professional")).toBeGreaterThan(solutionCost(1, "dish_soap"));
  });
});

describe("bubbleTypes", () => {
  it("returns 5 types", () => {
    expect(bubbleTypes()).toHaveLength(5);
  });
});
