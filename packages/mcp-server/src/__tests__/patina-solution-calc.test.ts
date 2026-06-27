import { describe, it, expect } from "vitest";
import {
  colorDepth, colorRange, applicationEase, durability,
  solutionCost, needsHeat, fumeProcess, activeChemical,
  bestMetal, patinaSolutions,
} from "../patina-solution-calc.js";

describe("colorDepth", () => {
  it("liver sulfur dark best color depth", () => {
    expect(colorDepth("liver_sulfur_dark")).toBeGreaterThan(colorDepth("vinegar_salt_green"));
  });
});

describe("colorRange", () => {
  it("liver sulfur dark widest color range", () => {
    expect(colorRange("liver_sulfur_dark")).toBeGreaterThan(colorRange("vinegar_salt_green"));
  });
});

describe("applicationEase", () => {
  it("vinegar salt green easiest application", () => {
    expect(applicationEase("vinegar_salt_green")).toBeGreaterThan(applicationEase("ammonia_fume_blue"));
  });
});

describe("durability", () => {
  it("selenium dioxide gun most durable", () => {
    expect(durability("selenium_dioxide_gun")).toBeGreaterThan(durability("vinegar_salt_green"));
  });
});

describe("solutionCost", () => {
  it("selenium dioxide gun most expensive", () => {
    expect(solutionCost("selenium_dioxide_gun")).toBeGreaterThan(solutionCost("ammonia_fume_blue"));
  });
});

describe("needsHeat", () => {
  it("liver sulfur dark needs heat", () => {
    expect(needsHeat("liver_sulfur_dark")).toBe(true);
  });
  it("ammonia fume blue does not need heat", () => {
    expect(needsHeat("ammonia_fume_blue")).toBe(false);
  });
});

describe("fumeProcess", () => {
  it("ammonia fume blue uses fume process", () => {
    expect(fumeProcess("ammonia_fume_blue")).toBe(true);
  });
  it("liver sulfur dark does not use fume process", () => {
    expect(fumeProcess("liver_sulfur_dark")).toBe(false);
  });
});

describe("activeChemical", () => {
  it("liver sulfur dark uses potassium polysulfide", () => {
    expect(activeChemical("liver_sulfur_dark")).toBe("potassium_polysulfide");
  });
});

describe("bestMetal", () => {
  it("ammonia fume blue best for copper sheet blue", () => {
    expect(bestMetal("ammonia_fume_blue")).toBe("copper_sheet_blue");
  });
});

describe("patinaSolutions", () => {
  it("returns 5 types", () => {
    expect(patinaSolutions()).toHaveLength(5);
  });
});
