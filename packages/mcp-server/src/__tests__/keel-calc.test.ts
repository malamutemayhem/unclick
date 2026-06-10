import { describe, it, expect } from "vitest";
import {
  lengthM, depthCm, widthCm, draftM,
  ballastWeightKg, lateralResistanceM2, boltCount, scarfJointCount,
  antifouilingAreaM2, constructionCost, keelTypes,
} from "../keel-calc.js";

describe("lengthM", () => {
  it("85% of hull", () => {
    expect(lengthM(10)).toBe(8.5);
  });
});

describe("depthCm", () => {
  it("8x beam", () => {
    expect(depthCm(3)).toBe(24);
  });
});

describe("widthCm", () => {
  it("flat widest", () => {
    expect(widthCm(24, "flat")).toBeGreaterThan(widthCm(24, "fin"));
  });
});

describe("draftM", () => {
  it("positive draft", () => {
    expect(draftM(24, 1.5)).toBeGreaterThan(1.5);
  });
});

describe("ballastWeightKg", () => {
  it("bulb heaviest", () => {
    expect(ballastWeightKg(5000, "bulb")).toBeGreaterThan(ballastWeightKg(5000, "flat"));
  });
});

describe("lateralResistanceM2", () => {
  it("positive resistance", () => {
    expect(lateralResistanceM2(8.5, 24)).toBeGreaterThan(0);
  });
});

describe("boltCount", () => {
  it("positive count", () => {
    expect(boltCount(8.5)).toBeGreaterThan(0);
  });
});

describe("scarfJointCount", () => {
  it("zero for short keel", () => {
    expect(scarfJointCount(5, 10)).toBe(0);
  });
  it("positive for long keel", () => {
    expect(scarfJointCount(20, 6)).toBeGreaterThan(0);
  });
});

describe("antifouilingAreaM2", () => {
  it("positive area", () => {
    expect(antifouilingAreaM2(8.5, 72)).toBeGreaterThan(0);
  });
});

describe("constructionCost", () => {
  it("wing most expensive", () => {
    expect(constructionCost(8.5, "wing", 100)).toBeGreaterThan(
      constructionCost(8.5, "flat", 100)
    );
  });
});

describe("keelTypes", () => {
  it("returns 5 types", () => {
    expect(keelTypes()).toHaveLength(5);
  });
});
