import { describe, it, expect } from "vitest";
import {
  conductivity, corrosionResist, installEase, longevity,
  rodCost, lowResistance, forRocky, material,
  bestUse, groundingRods,
} from "../grounding-rod-calc.js";

describe("conductivity", () => {
  it("solid copper rod highest conductivity", () => {
    expect(conductivity("solid_copper_rod")).toBeGreaterThan(conductivity("galvanized_steel"));
  });
});

describe("corrosionResist", () => {
  it("solid copper rod best corrosion resist", () => {
    expect(corrosionResist("solid_copper_rod")).toBeGreaterThan(corrosionResist("galvanized_steel"));
  });
});

describe("installEase", () => {
  it("galvanized steel easiest install", () => {
    expect(installEase("galvanized_steel")).toBeGreaterThan(installEase("ground_plate_mesh"));
  });
});

describe("longevity", () => {
  it("solid copper rod longest longevity", () => {
    expect(longevity("solid_copper_rod")).toBeGreaterThan(longevity("galvanized_steel"));
  });
});

describe("rodCost", () => {
  it("chemical electrode most expensive", () => {
    expect(rodCost("chemical_electrode")).toBeGreaterThan(rodCost("galvanized_steel"));
  });
});

describe("lowResistance", () => {
  it("copper clad steel is low resistance", () => {
    expect(lowResistance("copper_clad_steel")).toBe(true);
  });
  it("galvanized steel not low resistance", () => {
    expect(lowResistance("galvanized_steel")).toBe(false);
  });
});

describe("forRocky", () => {
  it("ground plate mesh is for rocky", () => {
    expect(forRocky("ground_plate_mesh")).toBe(true);
  });
  it("copper clad steel not for rocky", () => {
    expect(forRocky("copper_clad_steel")).toBe(false);
  });
});

describe("material", () => {
  it("chemical electrode uses backfill chemical rod", () => {
    expect(material("chemical_electrode")).toBe("backfill_chemical_rod");
  });
});

describe("bestUse", () => {
  it("galvanized steel best for temporary site ground", () => {
    expect(bestUse("galvanized_steel")).toBe("temporary_site_ground");
  });
});

describe("groundingRods", () => {
  it("returns 5 types", () => {
    expect(groundingRods()).toHaveLength(5);
  });
});
