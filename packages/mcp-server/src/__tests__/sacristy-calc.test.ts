import { describe, it, expect } from "vitest";
import {
  floorAreaM2, ceilingHeightM, vestmentCabinetCount, safeDimensionsCm,
  windowArea, doorCount, lavaboDrainRequired, storageShelvingM,
  lightingFixtures, constructionCost, sacristyLayouts,
} from "../sacristy-calc.js";

describe("floorAreaM2", () => {
  it("length times width", () => {
    expect(floorAreaM2(5, 4)).toBe(20);
  });
});

describe("ceilingHeightM", () => {
  it("positive height", () => {
    expect(ceilingHeightM(20)).toBeGreaterThan(2);
  });
});

describe("vestmentCabinetCount", () => {
  it("at least 1", () => {
    expect(vestmentCabinetCount(1)).toBe(1);
  });
  it("more for larger clergy", () => {
    expect(vestmentCabinetCount(10)).toBeGreaterThan(vestmentCabinetCount(2));
  });
});

describe("safeDimensionsCm", () => {
  it("all positive dimensions", () => {
    const dims = safeDimensionsCm(5);
    expect(dims.width).toBeGreaterThan(0);
    expect(dims.height).toBeGreaterThan(0);
    expect(dims.depth).toBeGreaterThan(0);
  });
});

describe("windowArea", () => {
  it("10% of floor area", () => {
    expect(windowArea(20)).toBe(2);
  });
});

describe("doorCount", () => {
  it("apsidal has 1 door", () => {
    expect(doorCount("apsidal")).toBe(1);
  });
  it("rectangular has 2 doors", () => {
    expect(doorCount("rectangular")).toBe(2);
  });
});

describe("lavaboDrainRequired", () => {
  it("always true", () => {
    expect(lavaboDrainRequired()).toBe(true);
  });
});

describe("storageShelvingM", () => {
  it("positive shelving", () => {
    expect(storageShelvingM(20)).toBeGreaterThan(0);
  });
});

describe("lightingFixtures", () => {
  it("at least 1", () => {
    expect(lightingFixtures(3)).toBe(1);
  });
  it("more for larger rooms", () => {
    expect(lightingFixtures(20)).toBeGreaterThan(lightingFixtures(4));
  });
});

describe("constructionCost", () => {
  it("tower most expensive", () => {
    expect(constructionCost(20, "tower", 500)).toBeGreaterThan(
      constructionCost(20, "rectangular", 500)
    );
  });
});

describe("sacristyLayouts", () => {
  it("returns 5 layouts", () => {
    expect(sacristyLayouts()).toHaveLength(5);
  });
});
