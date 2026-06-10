import { describe, it, expect } from "vitest";
import {
  averageDepthMeters, geologicActivity, sedimentThickness,
  mineralRichness, biodiversityScore, tectonicallyActive,
  volcanicOrigin, dominantFeature, exampleLocation, seafloorTypes,
} from "../seafloor-type-calc.js";

describe("averageDepthMeters", () => {
  it("ocean trench is deepest", () => {
    expect(averageDepthMeters("ocean_trench")).toBeGreaterThan(
      averageDepthMeters("continental_shelf")
    );
  });
});

describe("geologicActivity", () => {
  it("mid ocean ridge most active", () => {
    expect(geologicActivity("mid_ocean_ridge")).toBeGreaterThan(
      geologicActivity("abyssal_plain")
    );
  });
});

describe("sedimentThickness", () => {
  it("continental shelf has thickest sediment", () => {
    expect(sedimentThickness("continental_shelf")).toBeGreaterThan(
      sedimentThickness("mid_ocean_ridge")
    );
  });
});

describe("mineralRichness", () => {
  it("mid ocean ridge is mineral rich", () => {
    expect(mineralRichness("mid_ocean_ridge")).toBeGreaterThan(
      mineralRichness("ocean_trench")
    );
  });
});

describe("biodiversityScore", () => {
  it("continental shelf most biodiverse", () => {
    expect(biodiversityScore("continental_shelf")).toBeGreaterThan(
      biodiversityScore("ocean_trench")
    );
  });
});

describe("tectonicallyActive", () => {
  it("mid ocean ridge is active", () => {
    expect(tectonicallyActive("mid_ocean_ridge")).toBe(true);
  });
  it("abyssal plain is not", () => {
    expect(tectonicallyActive("abyssal_plain")).toBe(false);
  });
});

describe("volcanicOrigin", () => {
  it("seamount has volcanic origin", () => {
    expect(volcanicOrigin("seamount")).toBe(true);
  });
  it("continental shelf does not", () => {
    expect(volcanicOrigin("continental_shelf")).toBe(false);
  });
});

describe("dominantFeature", () => {
  it("ocean trench is subduction zone", () => {
    expect(dominantFeature("ocean_trench")).toBe("subduction_zone");
  });
});

describe("exampleLocation", () => {
  it("ocean trench example is mariana", () => {
    expect(exampleLocation("ocean_trench")).toBe("mariana_trench");
  });
});

describe("seafloorTypes", () => {
  it("returns 5 types", () => {
    expect(seafloorTypes()).toHaveLength(5);
  });
});
