import { describe, it, expect } from "vitest";
import {
  threadDensity, drapeQuality, abrasionResistance,
  patternComplexity, productionSpeed, showsWarpDominant,
  diagonal, bestApplication, floatLength, fabricWeaves,
} from "../fabric-weave-calc.js";

describe("threadDensity", () => {
  it("jacquard has highest density", () => {
    expect(threadDensity("jacquard")).toBeGreaterThan(
      threadDensity("basket")
    );
  });
});

describe("drapeQuality", () => {
  it("satin drapes best", () => {
    expect(drapeQuality("satin")).toBeGreaterThan(
      drapeQuality("plain")
    );
  });
});

describe("abrasionResistance", () => {
  it("twill resists abrasion best", () => {
    expect(abrasionResistance("twill")).toBeGreaterThan(
      abrasionResistance("satin")
    );
  });
});

describe("patternComplexity", () => {
  it("jacquard is most complex", () => {
    expect(patternComplexity("jacquard")).toBeGreaterThan(
      patternComplexity("plain")
    );
  });
});

describe("productionSpeed", () => {
  it("plain is fastest to produce", () => {
    expect(productionSpeed("plain")).toBeGreaterThan(
      productionSpeed("jacquard")
    );
  });
});

describe("showsWarpDominant", () => {
  it("satin is warp dominant", () => {
    expect(showsWarpDominant("satin")).toBe(true);
  });
  it("plain is not", () => {
    expect(showsWarpDominant("plain")).toBe(false);
  });
});

describe("diagonal", () => {
  it("twill has diagonal", () => {
    expect(diagonal("twill")).toBe(true);
  });
  it("satin does not", () => {
    expect(diagonal("satin")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("twill for denim", () => {
    expect(bestApplication("twill")).toBe("denim");
  });
});

describe("floatLength", () => {
  it("satin has longest floats", () => {
    expect(floatLength("satin")).toBeGreaterThan(
      floatLength("plain")
    );
  });
});

describe("fabricWeaves", () => {
  it("returns 5 types", () => {
    expect(fabricWeaves()).toHaveLength(5);
  });
});
