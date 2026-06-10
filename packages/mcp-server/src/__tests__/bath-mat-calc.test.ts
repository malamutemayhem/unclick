import { describe, it, expect } from "vitest";
import {
  absorbency, dryingSpeed, footComfort, slipResistance,
  matCost, machineWash, moldResistant, surfaceMaterial,
  bestBath, bathMats,
} from "../bath-mat-calc.js";

describe("absorbency", () => {
  it("cotton terry most absorbent", () => {
    expect(absorbency("cotton_terry")).toBeGreaterThan(absorbency("teak_wood"));
  });
});

describe("dryingSpeed", () => {
  it("diatomite stone fastest drying", () => {
    expect(dryingSpeed("diatomite_stone")).toBeGreaterThan(dryingSpeed("cotton_terry"));
  });
});

describe("footComfort", () => {
  it("memory foam most comfortable", () => {
    expect(footComfort("memory_foam")).toBeGreaterThan(footComfort("diatomite_stone"));
  });
});

describe("slipResistance", () => {
  it("diatomite stone best slip resistance", () => {
    expect(slipResistance("diatomite_stone")).toBeGreaterThan(slipResistance("cotton_terry"));
  });
});

describe("matCost", () => {
  it("teak wood most expensive", () => {
    expect(matCost("teak_wood")).toBeGreaterThan(matCost("cotton_terry"));
  });
});

describe("machineWash", () => {
  it("cotton terry is machine washable", () => {
    expect(machineWash("cotton_terry")).toBe(true);
  });
  it("teak wood is not", () => {
    expect(machineWash("teak_wood")).toBe(false);
  });
});

describe("moldResistant", () => {
  it("teak wood is mold resistant", () => {
    expect(moldResistant("teak_wood")).toBe(true);
  });
  it("cotton terry is not", () => {
    expect(moldResistant("cotton_terry")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("diatomite stone uses natural diatomaceous earth", () => {
    expect(surfaceMaterial("diatomite_stone")).toBe("natural_diatomaceous_earth");
  });
});

describe("bestBath", () => {
  it("memory foam for luxury plush spa feel", () => {
    expect(bestBath("memory_foam")).toBe("luxury_plush_spa_feel");
  });
});

describe("bathMats", () => {
  it("returns 5 types", () => {
    expect(bathMats()).toHaveLength(5);
  });
});
