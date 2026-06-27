import { describe, it, expect } from "vitest";
import {
  albedo, densityGPerCm3, populationPercent,
  miningValue, scientificInterest, carbonaceous,
  metallic, composition, typicalDiameterKm, asteroidTypes,
} from "../asteroid-type-calc.js";

describe("albedo", () => {
  it("v type has highest albedo", () => {
    expect(albedo("v_type")).toBeGreaterThan(albedo("d_type"));
  });
});

describe("densityGPerCm3", () => {
  it("m type is densest", () => {
    expect(densityGPerCm3("m_type")).toBeGreaterThan(
      densityGPerCm3("c_type")
    );
  });
});

describe("populationPercent", () => {
  it("c type is most common", () => {
    expect(populationPercent("c_type")).toBeGreaterThan(
      populationPercent("s_type")
    );
  });
});

describe("miningValue", () => {
  it("m type has highest mining value", () => {
    expect(miningValue("m_type")).toBeGreaterThan(miningValue("d_type"));
  });
});

describe("scientificInterest", () => {
  it("v type has highest scientific interest", () => {
    expect(scientificInterest("v_type")).toBeGreaterThan(
      scientificInterest("d_type")
    );
  });
});

describe("carbonaceous", () => {
  it("c type is carbonaceous", () => {
    expect(carbonaceous("c_type")).toBe(true);
  });
  it("m type is not", () => {
    expect(carbonaceous("m_type")).toBe(false);
  });
});

describe("metallic", () => {
  it("m type is metallic", () => {
    expect(metallic("m_type")).toBe(true);
  });
  it("c type is not metallic", () => {
    expect(metallic("c_type")).toBe(false);
  });
});

describe("composition", () => {
  it("m type is nickel iron", () => {
    expect(composition("m_type")).toBe("nickel_iron");
  });
});

describe("typicalDiameterKm", () => {
  it("c type is typically largest", () => {
    expect(typicalDiameterKm("c_type")).toBeGreaterThan(
      typicalDiameterKm("m_type")
    );
  });
});

describe("asteroidTypes", () => {
  it("returns 5 types", () => {
    expect(asteroidTypes()).toHaveLength(5);
  });
});
