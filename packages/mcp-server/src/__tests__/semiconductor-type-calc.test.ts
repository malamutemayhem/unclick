import { describe, it, expect } from "vitest";
import {
  bandgapEv, electronMobility, thermalConductivity,
  maxOperatingTempC, costScore, directBandgap,
  elementalSemiconductor, primaryApplication, crystalStructure, semiconductorTypes,
} from "../semiconductor-type-calc.js";

describe("bandgapEv", () => {
  it("gallium nitride has widest bandgap", () => {
    expect(bandgapEv("gallium_nitride")).toBeGreaterThan(
      bandgapEv("silicon")
    );
  });
});

describe("electronMobility", () => {
  it("gallium arsenide has best mobility", () => {
    expect(electronMobility("gallium_arsenide")).toBeGreaterThan(
      electronMobility("silicon")
    );
  });
});

describe("thermalConductivity", () => {
  it("silicon carbide best thermal conductor", () => {
    expect(thermalConductivity("silicon_carbide")).toBeGreaterThan(
      thermalConductivity("gallium_arsenide")
    );
  });
});

describe("maxOperatingTempC", () => {
  it("silicon carbide highest temp", () => {
    expect(maxOperatingTempC("silicon_carbide")).toBeGreaterThan(
      maxOperatingTempC("silicon")
    );
  });
});

describe("costScore", () => {
  it("silicon cheapest", () => {
    expect(costScore("gallium_nitride")).toBeGreaterThan(
      costScore("silicon")
    );
  });
});

describe("directBandgap", () => {
  it("gallium arsenide has direct bandgap", () => {
    expect(directBandgap("gallium_arsenide")).toBe(true);
  });
  it("silicon does not", () => {
    expect(directBandgap("silicon")).toBe(false);
  });
});

describe("elementalSemiconductor", () => {
  it("silicon is elemental", () => {
    expect(elementalSemiconductor("silicon")).toBe(true);
  });
  it("gallium arsenide is not", () => {
    expect(elementalSemiconductor("gallium_arsenide")).toBe(false);
  });
});

describe("primaryApplication", () => {
  it("silicon for ICs", () => {
    expect(primaryApplication("silicon")).toBe("integrated_circuits");
  });
});

describe("crystalStructure", () => {
  it("silicon is diamond cubic", () => {
    expect(crystalStructure("silicon")).toBe("diamond_cubic");
  });
});

describe("semiconductorTypes", () => {
  it("returns 5 types", () => {
    expect(semiconductorTypes()).toHaveLength(5);
  });
});
