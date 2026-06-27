import { describe, it, expect } from "vitest";
import {
  intervalSize, lineWeight, labelFrequency,
  detailLevel, readabilityScore, hasHachures,
  usedUnderwater, mapContext, lineStyle, contourMethods,
} from "../contour-method-calc.js";

describe("intervalSize", () => {
  it("index largest interval", () => {
    expect(intervalSize("index")).toBeGreaterThan(
      intervalSize("intermediate")
    );
  });
});

describe("lineWeight", () => {
  it("index heaviest line", () => {
    expect(lineWeight("index")).toBeGreaterThan(
      lineWeight("supplementary")
    );
  });
});

describe("labelFrequency", () => {
  it("index most frequently labeled", () => {
    expect(labelFrequency("index")).toBeGreaterThan(
      labelFrequency("supplementary")
    );
  });
});

describe("detailLevel", () => {
  it("supplementary most detail", () => {
    expect(detailLevel("supplementary")).toBeGreaterThan(
      detailLevel("index")
    );
  });
});

describe("readabilityScore", () => {
  it("index most readable", () => {
    expect(readabilityScore("index")).toBeGreaterThan(
      readabilityScore("supplementary")
    );
  });
});

describe("hasHachures", () => {
  it("depression has hachures", () => {
    expect(hasHachures("depression")).toBe(true);
  });
  it("index does not", () => {
    expect(hasHachures("index")).toBe(false);
  });
});

describe("usedUnderwater", () => {
  it("bathymetric used underwater", () => {
    expect(usedUnderwater("bathymetric")).toBe(true);
  });
  it("index is not", () => {
    expect(usedUnderwater("index")).toBe(false);
  });
});

describe("mapContext", () => {
  it("depression for closed depressions", () => {
    expect(mapContext("depression")).toBe("closed_depressions");
  });
});

describe("lineStyle", () => {
  it("supplementary is dashed", () => {
    expect(lineStyle("supplementary")).toBe("dashed");
  });
});

describe("contourMethods", () => {
  it("returns 5 methods", () => {
    expect(contourMethods()).toHaveLength(5);
  });
});
