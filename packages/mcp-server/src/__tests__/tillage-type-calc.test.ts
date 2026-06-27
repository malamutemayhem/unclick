import { describe, it, expect } from "vitest";
import {
  soilDisturbance, residueBurial, erosionRisk,
  fuelCostPerHectare, soilMoistureRetention, invertsSoil,
  conservationPractice, bestSoilType, depthCm, tillageTypes,
} from "../tillage-type-calc.js";

describe("soilDisturbance", () => {
  it("moldboard disturbs most", () => {
    expect(soilDisturbance("moldboard")).toBeGreaterThan(
      soilDisturbance("no_till")
    );
  });
});

describe("residueBurial", () => {
  it("moldboard buries most residue", () => {
    expect(residueBurial("moldboard")).toBeGreaterThan(
      residueBurial("chisel")
    );
  });
});

describe("erosionRisk", () => {
  it("no till has lowest erosion risk", () => {
    expect(erosionRisk("no_till")).toBeLessThan(
      erosionRisk("moldboard")
    );
  });
});

describe("fuelCostPerHectare", () => {
  it("no till costs least fuel", () => {
    expect(fuelCostPerHectare("no_till")).toBeLessThan(
      fuelCostPerHectare("moldboard")
    );
  });
});

describe("soilMoistureRetention", () => {
  it("no till retains most moisture", () => {
    expect(soilMoistureRetention("no_till")).toBeGreaterThan(
      soilMoistureRetention("moldboard")
    );
  });
});

describe("invertsSoil", () => {
  it("moldboard inverts soil", () => {
    expect(invertsSoil("moldboard")).toBe(true);
  });
  it("chisel does not", () => {
    expect(invertsSoil("chisel")).toBe(false);
  });
});

describe("conservationPractice", () => {
  it("no till is conservation", () => {
    expect(conservationPractice("no_till")).toBe(true);
  });
  it("moldboard is not", () => {
    expect(conservationPractice("moldboard")).toBe(false);
  });
});

describe("bestSoilType", () => {
  it("moldboard for heavy clay", () => {
    expect(bestSoilType("moldboard")).toBe("heavy_clay");
  });
});

describe("depthCm", () => {
  it("chisel goes deepest", () => {
    expect(depthCm("chisel")).toBeGreaterThan(
      depthCm("strip_till")
    );
  });
  it("no till has zero depth", () => {
    expect(depthCm("no_till")).toBe(0);
  });
});

describe("tillageTypes", () => {
  it("returns 5 types", () => {
    expect(tillageTypes()).toHaveLength(5);
  });
});
