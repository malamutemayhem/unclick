import { describe, it, expect } from "vitest";
import {
  adhesion, surfaceFlatness, partRemoval, durabilityRating,
  bedCost, needsAdhesive, removable, surfaceFinish,
  bestFilament, printBeds,
} from "../print-bed-calc.js";

describe("adhesion", () => {
  it("pei spring steel best adhesion", () => {
    expect(adhesion("pei_spring_steel")).toBeGreaterThan(adhesion("heated_aluminum"));
  });
});

describe("surfaceFlatness", () => {
  it("glass plate flattest", () => {
    expect(surfaceFlatness("glass_plate")).toBeGreaterThan(surfaceFlatness("buildtak_surface"));
  });
});

describe("partRemoval", () => {
  it("magnetic flex easiest removal", () => {
    expect(partRemoval("magnetic_flex")).toBeGreaterThan(partRemoval("heated_aluminum"));
  });
});

describe("durabilityRating", () => {
  it("heated aluminum most durable", () => {
    expect(durabilityRating("heated_aluminum")).toBeGreaterThan(durabilityRating("buildtak_surface"));
  });
});

describe("bedCost", () => {
  it("heated aluminum most expensive", () => {
    expect(bedCost("heated_aluminum")).toBeGreaterThan(bedCost("glass_plate"));
  });
});

describe("needsAdhesive", () => {
  it("glass plate needs adhesive", () => {
    expect(needsAdhesive("glass_plate")).toBe(true);
  });
  it("pei spring steel does not", () => {
    expect(needsAdhesive("pei_spring_steel")).toBe(false);
  });
});

describe("removable", () => {
  it("magnetic flex is removable", () => {
    expect(removable("magnetic_flex")).toBe(true);
  });
  it("heated aluminum is not", () => {
    expect(removable("heated_aluminum")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("pei spring steel uses textured powder coat pei", () => {
    expect(surfaceFinish("pei_spring_steel")).toBe("textured_powder_coat_pei");
  });
});

describe("bestFilament", () => {
  it("magnetic flex for pla petg easy removal", () => {
    expect(bestFilament("magnetic_flex")).toBe("pla_petg_easy_removal");
  });
});

describe("printBeds", () => {
  it("returns 5 types", () => {
    expect(printBeds()).toHaveLength(5);
  });
});
