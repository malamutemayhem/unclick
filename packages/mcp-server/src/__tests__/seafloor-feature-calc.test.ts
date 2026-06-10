import { describe, it, expect } from "vitest";
import {
  averageDepthM, tectonicActivity, sedimentThickness,
  biologicalProductivity, mineralResources, volcanicOrigin,
  convergentBoundary, formationProcess, exampleLocation, seafloorFeatures,
} from "../seafloor-feature-calc.js";

describe("averageDepthM", () => {
  it("trench deepest", () => {
    expect(averageDepthM("trench")).toBeGreaterThan(
      averageDepthM("continental_shelf")
    );
  });
});

describe("tectonicActivity", () => {
  it("mid_ocean_ridge most active", () => {
    expect(tectonicActivity("mid_ocean_ridge")).toBeGreaterThan(
      tectonicActivity("abyssal_plain")
    );
  });
});

describe("sedimentThickness", () => {
  it("abyssal_plain thickest sediment", () => {
    expect(sedimentThickness("abyssal_plain")).toBeGreaterThan(
      sedimentThickness("mid_ocean_ridge")
    );
  });
});

describe("biologicalProductivity", () => {
  it("continental_shelf most productive", () => {
    expect(biologicalProductivity("continental_shelf")).toBeGreaterThan(
      biologicalProductivity("trench")
    );
  });
});

describe("mineralResources", () => {
  it("continental_shelf richest resources", () => {
    expect(mineralResources("continental_shelf")).toBeGreaterThan(
      mineralResources("trench")
    );
  });
});

describe("volcanicOrigin", () => {
  it("seamount has volcanic origin", () => {
    expect(volcanicOrigin("seamount")).toBe(true);
  });
  it("trench does not", () => {
    expect(volcanicOrigin("trench")).toBe(false);
  });
});

describe("convergentBoundary", () => {
  it("trench is convergent", () => {
    expect(convergentBoundary("trench")).toBe(true);
  });
  it("mid_ocean_ridge is not", () => {
    expect(convergentBoundary("mid_ocean_ridge")).toBe(false);
  });
});

describe("formationProcess", () => {
  it("trench formed by subduction", () => {
    expect(formationProcess("trench")).toBe("subduction");
  });
});

describe("exampleLocation", () => {
  it("trench example is mariana", () => {
    expect(exampleLocation("trench")).toBe("mariana_trench");
  });
});

describe("seafloorFeatures", () => {
  it("returns 5 features", () => {
    expect(seafloorFeatures()).toHaveLength(5);
  });
});
