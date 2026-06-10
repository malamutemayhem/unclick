import { describe, it, expect } from "vitest";
import {
  nitrogenContent, phosphorusContent, releaseSpeed,
  burnRisk, soilHealthBenefit, organic,
  waterSoluble, bestCrop, applicationFrequency, fertilizerTypes,
} from "../fertilizer-type-calc.js";

describe("nitrogenContent", () => {
  it("urea has most nitrogen", () => {
    expect(nitrogenContent("urea")).toBeGreaterThan(
      nitrogenContent("bone_meal")
    );
  });
});

describe("phosphorusContent", () => {
  it("bone meal has most phosphorus", () => {
    expect(phosphorusContent("bone_meal")).toBeGreaterThan(
      phosphorusContent("urea")
    );
  });
});

describe("releaseSpeed", () => {
  it("urea releases fastest", () => {
    expect(releaseSpeed("urea")).toBeGreaterThan(
      releaseSpeed("slow_release")
    );
  });
});

describe("burnRisk", () => {
  it("urea has highest burn risk", () => {
    expect(burnRisk("urea")).toBeGreaterThan(
      burnRisk("bone_meal")
    );
  });
});

describe("soilHealthBenefit", () => {
  it("fish emulsion benefits soil most", () => {
    expect(soilHealthBenefit("fish_emulsion")).toBeGreaterThan(
      soilHealthBenefit("urea")
    );
  });
});

describe("organic", () => {
  it("bone meal is organic", () => {
    expect(organic("bone_meal")).toBe(true);
  });
  it("urea is not", () => {
    expect(organic("urea")).toBe(false);
  });
});

describe("waterSoluble", () => {
  it("urea is water soluble", () => {
    expect(waterSoluble("urea")).toBe(true);
  });
  it("bone meal is not", () => {
    expect(waterSoluble("bone_meal")).toBe(false);
  });
});

describe("bestCrop", () => {
  it("fish emulsion for tomatoes", () => {
    expect(bestCrop("fish_emulsion")).toBe("tomatoes");
  });
});

describe("applicationFrequency", () => {
  it("slow release needs fewest applications", () => {
    expect(applicationFrequency("slow_release")).toBeLessThan(
      applicationFrequency("urea")
    );
  });
});

describe("fertilizerTypes", () => {
  it("returns 5 types", () => {
    expect(fertilizerTypes()).toHaveLength(5);
  });
});
