import { describe, it, expect } from "vitest";
import {
  symmetryAxes, axisAngles, uniqueAxisLengths,
  naturalFrequency, opticalComplexity, isotropic,
  uniaxial, exampleMineral, packingEfficiency, crystalSystems,
} from "../crystal-system-calc.js";

describe("symmetryAxes", () => {
  it("cubic has most symmetry", () => {
    expect(symmetryAxes("cubic")).toBeGreaterThan(
      symmetryAxes("monoclinic")
    );
  });
});

describe("axisAngles", () => {
  it("hexagonal has 120 degree angle", () => {
    expect(axisAngles("hexagonal")).toBe(120);
  });
});

describe("uniqueAxisLengths", () => {
  it("cubic has fewest unique lengths", () => {
    expect(uniqueAxisLengths("cubic")).toBeLessThan(
      uniqueAxisLengths("orthorhombic")
    );
  });
});

describe("naturalFrequency", () => {
  it("cubic is most common", () => {
    expect(naturalFrequency("cubic")).toBeGreaterThan(
      naturalFrequency("monoclinic")
    );
  });
});

describe("opticalComplexity", () => {
  it("monoclinic is most optically complex", () => {
    expect(opticalComplexity("monoclinic")).toBeGreaterThan(
      opticalComplexity("cubic")
    );
  });
});

describe("isotropic", () => {
  it("cubic is isotropic", () => {
    expect(isotropic("cubic")).toBe(true);
  });
  it("hexagonal is not isotropic", () => {
    expect(isotropic("hexagonal")).toBe(false);
  });
});

describe("uniaxial", () => {
  it("hexagonal is uniaxial", () => {
    expect(uniaxial("hexagonal")).toBe(true);
  });
  it("cubic is not uniaxial", () => {
    expect(uniaxial("cubic")).toBe(false);
  });
});

describe("exampleMineral", () => {
  it("cubic example is diamond", () => {
    expect(exampleMineral("cubic")).toBe("diamond");
  });
});

describe("packingEfficiency", () => {
  it("cubic packs most efficiently", () => {
    expect(packingEfficiency("cubic")).toBeGreaterThan(
      packingEfficiency("monoclinic")
    );
  });
});

describe("crystalSystems", () => {
  it("returns 5 types", () => {
    expect(crystalSystems()).toHaveLength(5);
  });
});
