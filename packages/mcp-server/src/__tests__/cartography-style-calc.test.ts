import { describe, it, expect } from "vitest";
import {
  detailLevel, colorComplexity, updateFrequency,
  productionCost, publicAccessibility, showsElevation,
  legalDocument, bestApplication, primaryAudience, cartographyStyles,
} from "../cartography-style-calc.js";

describe("detailLevel", () => {
  it("topographic has most detail", () => {
    expect(detailLevel("topographic")).toBeGreaterThan(
      detailLevel("thematic")
    );
  });
});

describe("colorComplexity", () => {
  it("thematic has most color complexity", () => {
    expect(colorComplexity("thematic")).toBeGreaterThan(
      colorComplexity("cadastral")
    );
  });
});

describe("updateFrequency", () => {
  it("cadastral updates most often", () => {
    expect(updateFrequency("cadastral")).toBeGreaterThan(
      updateFrequency("relief")
    );
  });
});

describe("productionCost", () => {
  it("nautical costs most to produce", () => {
    expect(productionCost("nautical")).toBeGreaterThan(
      productionCost("thematic")
    );
  });
});

describe("publicAccessibility", () => {
  it("thematic is most accessible", () => {
    expect(publicAccessibility("thematic")).toBeGreaterThan(
      publicAccessibility("cadastral")
    );
  });
});

describe("showsElevation", () => {
  it("topographic shows elevation", () => {
    expect(showsElevation("topographic")).toBe(true);
  });
  it("thematic does not", () => {
    expect(showsElevation("thematic")).toBe(false);
  });
});

describe("legalDocument", () => {
  it("cadastral is legal document", () => {
    expect(legalDocument("cadastral")).toBe(true);
  });
  it("topographic is not", () => {
    expect(legalDocument("topographic")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("topographic for hiking", () => {
    expect(bestApplication("topographic")).toBe("hiking");
  });
});

describe("primaryAudience", () => {
  it("nautical for mariners", () => {
    expect(primaryAudience("nautical")).toBe("mariners");
  });
});

describe("cartographyStyles", () => {
  it("returns 5 types", () => {
    expect(cartographyStyles()).toHaveLength(5);
  });
});
