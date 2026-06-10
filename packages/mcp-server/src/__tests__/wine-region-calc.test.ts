import { describe, it, expect } from "vitest";
import {
  avgTempC, prestigeScore, priceRange,
  hectaresUnderVine, vintageVariation, oldWorldRegion,
  blendingTradition, signatureGrape, classificationSystem, wineRegions,
} from "../wine-region-calc.js";

describe("avgTempC", () => {
  it("barossa warmest", () => {
    expect(avgTempC("barossa")).toBeGreaterThan(
      avgTempC("burgundy")
    );
  });
});

describe("prestigeScore", () => {
  it("bordeaux highest prestige", () => {
    expect(prestigeScore("bordeaux")).toBeGreaterThanOrEqual(
      prestigeScore("barossa")
    );
  });
});

describe("priceRange", () => {
  it("bordeaux highest price range", () => {
    expect(priceRange("bordeaux")).toBeGreaterThan(
      priceRange("barossa")
    );
  });
});

describe("hectaresUnderVine", () => {
  it("bordeaux most hectares", () => {
    expect(hectaresUnderVine("bordeaux")).toBeGreaterThan(
      hectaresUnderVine("napa")
    );
  });
});

describe("vintageVariation", () => {
  it("burgundy most vintage variation", () => {
    expect(vintageVariation("burgundy")).toBeGreaterThan(
      vintageVariation("napa")
    );
  });
});

describe("oldWorldRegion", () => {
  it("bordeaux is old world", () => {
    expect(oldWorldRegion("bordeaux")).toBe(true);
  });
  it("napa is not", () => {
    expect(oldWorldRegion("napa")).toBe(false);
  });
});

describe("blendingTradition", () => {
  it("bordeaux has blending tradition", () => {
    expect(blendingTradition("bordeaux")).toBe(true);
  });
  it("burgundy does not", () => {
    expect(blendingTradition("burgundy")).toBe(false);
  });
});

describe("signatureGrape", () => {
  it("barossa is shiraz", () => {
    expect(signatureGrape("barossa")).toBe("shiraz");
  });
});

describe("classificationSystem", () => {
  it("tuscany uses docg doc", () => {
    expect(classificationSystem("tuscany")).toBe("docg_doc");
  });
});

describe("wineRegions", () => {
  it("returns 5 regions", () => {
    expect(wineRegions()).toHaveLength(5);
  });
});
