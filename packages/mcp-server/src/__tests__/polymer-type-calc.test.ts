import { describe, it, expect } from "vitest";
import {
  meltingPointC, tensileStrength, flexibility,
  chemicalResistance, recyclability, remoldable,
  biodegradable, exampleMaterial, commonApplication, polymerTypes,
} from "../polymer-type-calc.js";

describe("meltingPointC", () => {
  it("fiber has highest melting point", () => {
    expect(meltingPointC("fiber")).toBeGreaterThan(
      meltingPointC("biopolymer")
    );
  });
});

describe("tensileStrength", () => {
  it("fiber is strongest", () => {
    expect(tensileStrength("fiber")).toBeGreaterThan(
      tensileStrength("elastomer")
    );
  });
});

describe("flexibility", () => {
  it("elastomer most flexible", () => {
    expect(flexibility("elastomer")).toBeGreaterThan(
      flexibility("thermoset")
    );
  });
});

describe("chemicalResistance", () => {
  it("thermoset most resistant", () => {
    expect(chemicalResistance("thermoset")).toBeGreaterThan(
      chemicalResistance("biopolymer")
    );
  });
});

describe("recyclability", () => {
  it("thermoplastic most recyclable", () => {
    expect(recyclability("thermoplastic")).toBeGreaterThan(
      recyclability("thermoset")
    );
  });
});

describe("remoldable", () => {
  it("thermoplastic is remoldable", () => {
    expect(remoldable("thermoplastic")).toBe(true);
  });
  it("thermoset is not", () => {
    expect(remoldable("thermoset")).toBe(false);
  });
});

describe("biodegradable", () => {
  it("biopolymer is biodegradable", () => {
    expect(biodegradable("biopolymer")).toBe(true);
  });
  it("thermoplastic is not", () => {
    expect(biodegradable("thermoplastic")).toBe(false);
  });
});

describe("exampleMaterial", () => {
  it("elastomer example is rubber", () => {
    expect(exampleMaterial("elastomer")).toBe("natural_rubber");
  });
});

describe("commonApplication", () => {
  it("fiber for bulletproof vests", () => {
    expect(commonApplication("fiber")).toBe("bulletproof_vests");
  });
});

describe("polymerTypes", () => {
  it("returns 5 types", () => {
    expect(polymerTypes()).toHaveLength(5);
  });
});
