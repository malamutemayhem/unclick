import { describe, it, expect } from "vitest";
import {
  maxSpanMeters, structuralEfficiency, windResistance,
  interiorVolume, aestheticImpact, squareBase,
  modernMaterial, bestApplication, costPerM2, domeTypes,
} from "../dome-type-calc.js";

describe("maxSpanMeters", () => {
  it("geodesic spans widest", () => {
    expect(maxSpanMeters("geodesic")).toBeGreaterThan(
      maxSpanMeters("onion")
    );
  });
});

describe("structuralEfficiency", () => {
  it("geodesic is most efficient", () => {
    expect(structuralEfficiency("geodesic")).toBeGreaterThan(
      structuralEfficiency("onion")
    );
  });
});

describe("windResistance", () => {
  it("geodesic resists wind best", () => {
    expect(windResistance("geodesic")).toBeGreaterThan(
      windResistance("onion")
    );
  });
});

describe("interiorVolume", () => {
  it("geodesic has most volume", () => {
    expect(interiorVolume("geodesic")).toBeGreaterThan(
      interiorVolume("saucer")
    );
  });
});

describe("aestheticImpact", () => {
  it("onion has highest aesthetic impact", () => {
    expect(aestheticImpact("onion")).toBeGreaterThan(
      aestheticImpact("saucer")
    );
  });
});

describe("squareBase", () => {
  it("pendentive uses square base", () => {
    expect(squareBase("pendentive")).toBe(true);
  });
  it("hemispherical does not", () => {
    expect(squareBase("hemispherical")).toBe(false);
  });
});

describe("modernMaterial", () => {
  it("geodesic uses modern materials", () => {
    expect(modernMaterial("geodesic")).toBe(true);
  });
  it("onion does not", () => {
    expect(modernMaterial("onion")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("geodesic best for exhibition hall", () => {
    expect(bestApplication("geodesic")).toBe("exhibition_hall");
  });
});

describe("costPerM2", () => {
  it("onion costs most", () => {
    expect(costPerM2("onion")).toBeGreaterThan(
      costPerM2("geodesic")
    );
  });
});

describe("domeTypes", () => {
  it("returns 5 types", () => {
    expect(domeTypes()).toHaveLength(5);
  });
});
