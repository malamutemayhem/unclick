import { describe, it, expect } from "vitest";
import {
  elasticity, tensileStrength, uvResistance, jumpCountLifespan,
  costPerMeter, waterResistant, certifiedForCommercial, coreConstruction,
  bestApplication, bungeeCords,
} from "../bungee-cord-calc.js";

describe("elasticity", () => {
  it("natural rubber most elastic", () => {
    expect(elasticity("natural_rubber")).toBeGreaterThan(elasticity("braided_elastic"));
  });
});

describe("tensileStrength", () => {
  it("military spec strongest", () => {
    expect(tensileStrength("military_spec")).toBeGreaterThan(tensileStrength("natural_rubber"));
  });
});

describe("uvResistance", () => {
  it("military spec best uv resistance", () => {
    expect(uvResistance("military_spec")).toBeGreaterThan(uvResistance("natural_rubber"));
  });
});

describe("jumpCountLifespan", () => {
  it("military spec longest lifespan", () => {
    expect(jumpCountLifespan("military_spec")).toBeGreaterThan(jumpCountLifespan("natural_rubber"));
  });
});

describe("costPerMeter", () => {
  it("military spec most expensive", () => {
    expect(costPerMeter("military_spec")).toBeGreaterThan(costPerMeter("natural_rubber"));
  });
});

describe("waterResistant", () => {
  it("synthetic latex is water resistant", () => {
    expect(waterResistant("synthetic_latex")).toBe(true);
  });
  it("natural rubber is not", () => {
    expect(waterResistant("natural_rubber")).toBe(false);
  });
});

describe("certifiedForCommercial", () => {
  it("military spec is certified", () => {
    expect(certifiedForCommercial("military_spec")).toBe(true);
  });
  it("natural rubber is not", () => {
    expect(certifiedForCommercial("natural_rubber")).toBe(false);
  });
});

describe("coreConstruction", () => {
  it("military spec is multi strand redundant", () => {
    expect(coreConstruction("military_spec")).toBe("multi_strand_redundant");
  });
});

describe("bestApplication", () => {
  it("natural rubber for traditional land dive", () => {
    expect(bestApplication("natural_rubber")).toBe("traditional_land_dive");
  });
});

describe("bungeeCords", () => {
  it("returns 5 cords", () => {
    expect(bungeeCords()).toHaveLength(5);
  });
});
