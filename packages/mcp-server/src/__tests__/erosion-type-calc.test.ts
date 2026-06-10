import { describe, it, expect } from "vitest";
import {
  ratePerYear, areaCoverage, materialTransport,
  landscapeImpact, humanInfluence, requiresWater,
  visibleShortTerm, landformCreated, primaryAgent, erosionTypes,
} from "../erosion-type-calc.js";

describe("ratePerYear", () => {
  it("glacial erodes fastest", () => {
    expect(ratePerYear("glacial")).toBeGreaterThan(
      ratePerYear("chemical")
    );
  });
});

describe("areaCoverage", () => {
  it("water covers most area", () => {
    expect(areaCoverage("water")).toBeGreaterThan(
      areaCoverage("thermal")
    );
  });
});

describe("materialTransport", () => {
  it("glacial transports most material", () => {
    expect(materialTransport("glacial")).toBeGreaterThan(
      materialTransport("chemical")
    );
  });
});

describe("landscapeImpact", () => {
  it("glacial has most impact", () => {
    expect(landscapeImpact("glacial")).toBeGreaterThan(
      landscapeImpact("wind")
    );
  });
});

describe("humanInfluence", () => {
  it("chemical most influenced by humans", () => {
    expect(humanInfluence("chemical")).toBeGreaterThan(
      humanInfluence("glacial")
    );
  });
});

describe("requiresWater", () => {
  it("water erosion requires water", () => {
    expect(requiresWater("water")).toBe(true);
  });
  it("wind does not", () => {
    expect(requiresWater("wind")).toBe(false);
  });
});

describe("visibleShortTerm", () => {
  it("water erosion visible short term", () => {
    expect(visibleShortTerm("water")).toBe(true);
  });
  it("glacial is not", () => {
    expect(visibleShortTerm("glacial")).toBe(false);
  });
});

describe("landformCreated", () => {
  it("water creates canyons", () => {
    expect(landformCreated("water")).toBe("canyon");
  });
});

describe("primaryAgent", () => {
  it("glacial agent is ice sheets", () => {
    expect(primaryAgent("glacial")).toBe("ice_sheets");
  });
});

describe("erosionTypes", () => {
  it("returns 5 types", () => {
    expect(erosionTypes()).toHaveLength(5);
  });
});
