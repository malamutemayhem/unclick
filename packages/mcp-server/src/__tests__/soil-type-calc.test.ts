import { describe, it, expect } from "vitest";
import {
  drainageRate, nutrientRetention, waterHolding,
  workability, organicContent, compactable,
  acidic, bestCrop, phRange, soilTypes,
} from "../soil-type-calc.js";

describe("drainageRate", () => {
  it("sandy drains fastest", () => {
    expect(drainageRate("sandy")).toBeGreaterThan(
      drainageRate("clay")
    );
  });
});

describe("nutrientRetention", () => {
  it("clay retains most nutrients", () => {
    expect(nutrientRetention("clay")).toBeGreaterThan(
      nutrientRetention("sandy")
    );
  });
});

describe("waterHolding", () => {
  it("peat holds most water", () => {
    expect(waterHolding("peat")).toBeGreaterThan(
      waterHolding("sandy")
    );
  });
});

describe("workability", () => {
  it("loam is most workable", () => {
    expect(workability("loam")).toBeGreaterThan(
      workability("clay")
    );
  });
});

describe("organicContent", () => {
  it("peat has most organic content", () => {
    expect(organicContent("peat")).toBeGreaterThan(
      organicContent("sandy")
    );
  });
});

describe("compactable", () => {
  it("clay is compactable", () => {
    expect(compactable("clay")).toBe(true);
  });
  it("sandy is not", () => {
    expect(compactable("sandy")).toBe(false);
  });
});

describe("acidic", () => {
  it("peat is acidic", () => {
    expect(acidic("peat")).toBe(true);
  });
  it("loam is not", () => {
    expect(acidic("loam")).toBe(false);
  });
});

describe("bestCrop", () => {
  it("loam best for vegetables", () => {
    expect(bestCrop("loam")).toBe("vegetables");
  });
});

describe("phRange", () => {
  it("peat has lowest pH", () => {
    expect(phRange("peat")).toBeLessThan(
      phRange("clay")
    );
  });
});

describe("soilTypes", () => {
  it("returns 5 types", () => {
    expect(soilTypes()).toHaveLength(5);
  });
});
