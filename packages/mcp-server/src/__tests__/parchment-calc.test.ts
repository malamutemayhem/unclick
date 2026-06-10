import { describe, it, expect } from "vitest";
import {
  hideYieldSheets, soakingDays, limeBathDays, scrapingPasses,
  stretchingTension, dryingTimeHours, inkAbsorbency,
  writingAreaCm2, foldingSections, costPerSheet, animalHides,
} from "../parchment-calc.js";

describe("hideYieldSheets", () => {
  it("positive sheets", () => {
    expect(hideYieldSheets(5000, 500)).toBeGreaterThan(0);
  });
  it("zero sheet size = 0", () => {
    expect(hideYieldSheets(5000, 0)).toBe(0);
  });
});

describe("soakingDays", () => {
  it("pig takes longest", () => {
    expect(soakingDays("pig")).toBeGreaterThan(soakingDays("sheep"));
  });
});

describe("limeBathDays", () => {
  it("thick takes longest", () => {
    expect(limeBathDays("thick")).toBeGreaterThan(limeBathDays("thin"));
  });
});

describe("scrapingPasses", () => {
  it("vellum most passes", () => {
    expect(scrapingPasses("vellum")).toBeGreaterThan(scrapingPasses("rough"));
  });
});

describe("stretchingTension", () => {
  it("positive tension", () => {
    expect(stretchingTension(50)).toBeGreaterThan(0);
  });
});

describe("dryingTimeHours", () => {
  it("positive hours", () => {
    expect(dryingTimeHours(60, 0.5)).toBeGreaterThan(0);
  });
});

describe("inkAbsorbency", () => {
  it("calf is high", () => {
    expect(inkAbsorbency("calf")).toBe("high");
  });
});

describe("writingAreaCm2", () => {
  it("less than total area", () => {
    expect(writingAreaCm2(30, 40, 3)).toBeLessThan(30 * 40);
  });
});

describe("foldingSections", () => {
  it("positive sections", () => {
    expect(foldingSections(30, 10)).toBeGreaterThan(0);
  });
  it("zero section = 0", () => {
    expect(foldingSections(30, 0)).toBe(0);
  });
});

describe("costPerSheet", () => {
  it("vellum most expensive", () => {
    expect(costPerSheet("calf", "vellum")).toBeGreaterThan(costPerSheet("calf", "standard"));
  });
});

describe("animalHides", () => {
  it("returns 5 hides", () => {
    expect(animalHides()).toHaveLength(5);
  });
});
