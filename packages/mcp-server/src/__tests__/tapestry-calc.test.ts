import { describe, it, expect } from "vitest";
import {
  warpSett, weftPackingPpi, colorAreaPercent, bobbinCount,
  weavingHoursPerM2, warpTensionKg, finishedWeightKgPerM2,
  cartoonRequired, costPerM2, tapestryTechniques,
} from "../tapestry-calc.js";

describe("warpSett", () => {
  it("aubusson has finest sett", () => {
    expect(warpSett("aubusson")).toBeGreaterThan(warpSett("navajo"));
  });
});

describe("weftPackingPpi", () => {
  it("aubusson packs tightest", () => {
    expect(weftPackingPpi("aubusson")).toBeGreaterThan(weftPackingPpi("navajo"));
  });
});

describe("colorAreaPercent", () => {
  it("more colors = smaller area each", () => {
    expect(colorAreaPercent(10)).toBeLessThan(colorAreaPercent(5));
  });
  it("zero colors returns 0", () => {
    expect(colorAreaPercent(0)).toBe(0);
  });
});

describe("bobbinCount", () => {
  it("matches color count", () => {
    expect(bobbinCount(8)).toBe(8);
  });
});

describe("weavingHoursPerM2", () => {
  it("aubusson takes longest", () => {
    expect(weavingHoursPerM2("aubusson")).toBeGreaterThan(weavingHoursPerM2("kilim"));
  });
});

describe("warpTensionKg", () => {
  it("navajo uses highest tension", () => {
    expect(warpTensionKg("navajo")).toBeGreaterThan(warpTensionKg("aubusson"));
  });
});

describe("finishedWeightKgPerM2", () => {
  it("navajo is heaviest", () => {
    expect(finishedWeightKgPerM2("navajo")).toBeGreaterThan(
      finishedWeightKgPerM2("kilim")
    );
  });
});

describe("cartoonRequired", () => {
  it("gobelin requires cartoon", () => {
    expect(cartoonRequired("gobelin")).toBe(true);
  });
  it("kilim does not require cartoon", () => {
    expect(cartoonRequired("kilim")).toBe(false);
  });
});

describe("costPerM2", () => {
  it("aubusson is most expensive", () => {
    expect(costPerM2("aubusson")).toBeGreaterThan(costPerM2("kilim"));
  });
});

describe("tapestryTechniques", () => {
  it("returns 5 techniques", () => {
    expect(tapestryTechniques()).toHaveLength(5);
  });
});
