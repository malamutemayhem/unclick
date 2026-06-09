import { describe, it, expect } from "vitest";
import {
  tileArea, tilesNeeded, floorArea, groutArea, groutWeight,
  adhesiveAmount, boxesNeeded, wastePercent, layoutTime,
  costEstimate, spacerSize, cuttingCount, tileShapes, patternTypes,
} from "../tile-pattern.js";

describe("tileArea", () => {
  it("square = side^2", () => {
    expect(tileArea("square", 300)).toBe(90000);
  });

  it("hexagon is positive", () => {
    expect(tileArea("hexagon", 200)).toBeGreaterThan(0);
  });
});

describe("tilesNeeded", () => {
  it("adds waste", () => {
    expect(tilesNeeded(900000, 90000, 10)).toBeGreaterThan(10);
  });

  it("0 for zero tile size", () => {
    expect(tilesNeeded(900000, 0)).toBe(0);
  });
});

describe("floorArea", () => {
  it("width x length", () => {
    expect(floorArea(3000, 4000)).toBe(12000000);
  });
});

describe("groutArea", () => {
  it("positive for tiles with grout", () => {
    expect(groutArea(100, 300, 3)).toBeGreaterThan(0);
  });
});

describe("groutWeight", () => {
  it("positive kg", () => {
    expect(groutWeight(180000)).toBeGreaterThan(0);
  });
});

describe("adhesiveAmount", () => {
  it("positive kg", () => {
    expect(adhesiveAmount(12000000)).toBeGreaterThan(0);
  });
});

describe("boxesNeeded", () => {
  it("rounds up", () => {
    expect(boxesNeeded(15, 6)).toBe(3);
  });
});

describe("wastePercent", () => {
  it("herringbone wastes more than grid", () => {
    expect(wastePercent("herringbone")).toBeGreaterThan(wastePercent("grid"));
  });
});

describe("layoutTime", () => {
  it("complex patterns take longer", () => {
    expect(layoutTime(100, "herringbone")).toBeGreaterThan(layoutTime(100, "grid"));
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(3, 50, 5, 10, 3, 15)).toBeGreaterThan(0);
  });
});

describe("spacerSize", () => {
  it("equals grout width", () => {
    expect(spacerSize(3)).toBe(3);
  });
});

describe("cuttingCount", () => {
  it("chevron needs most cuts", () => {
    expect(cuttingCount(100, "chevron")).toBeGreaterThan(cuttingCount(100, "grid"));
  });
});

describe("tileShapes", () => {
  it("returns 6 shapes", () => {
    expect(tileShapes()).toHaveLength(6);
  });
});

describe("patternTypes", () => {
  it("returns 6 patterns", () => {
    expect(patternTypes()).toHaveLength(6);
  });
});
