import { describe, it, expect } from "vitest";
import {
  radiusKm, massEarths, surfaceGravity,
  atmosphereDensity, magneticFieldStrength, solidSurface,
  hasRings, exampleBody, habitabilityScore, planetTypes,
} from "../planet-type-calc.js";

describe("radiusKm", () => {
  it("gas giant is largest", () => {
    expect(radiusKm("gas_giant")).toBeGreaterThan(
      radiusKm("terrestrial")
    );
  });
});

describe("massEarths", () => {
  it("gas giant is most massive", () => {
    expect(massEarths("gas_giant")).toBeGreaterThan(
      massEarths("super_earth")
    );
  });
});

describe("surfaceGravity", () => {
  it("gas giant has highest gravity", () => {
    expect(surfaceGravity("gas_giant")).toBeGreaterThan(
      surfaceGravity("dwarf")
    );
  });
});

describe("atmosphereDensity", () => {
  it("gas giant has densest atmosphere", () => {
    expect(atmosphereDensity("gas_giant")).toBeGreaterThan(
      atmosphereDensity("dwarf")
    );
  });
});

describe("magneticFieldStrength", () => {
  it("gas giant has strongest field", () => {
    expect(magneticFieldStrength("gas_giant")).toBeGreaterThan(
      magneticFieldStrength("dwarf")
    );
  });
});

describe("solidSurface", () => {
  it("terrestrial has solid surface", () => {
    expect(solidSurface("terrestrial")).toBe(true);
  });
  it("gas giant does not", () => {
    expect(solidSurface("gas_giant")).toBe(false);
  });
});

describe("hasRings", () => {
  it("gas giant has rings", () => {
    expect(hasRings("gas_giant")).toBe(true);
  });
  it("terrestrial does not", () => {
    expect(hasRings("terrestrial")).toBe(false);
  });
});

describe("exampleBody", () => {
  it("terrestrial example is earth", () => {
    expect(exampleBody("terrestrial")).toBe("earth");
  });
});

describe("habitabilityScore", () => {
  it("terrestrial is most habitable", () => {
    expect(habitabilityScore("terrestrial")).toBeGreaterThan(
      habitabilityScore("gas_giant")
    );
  });
});

describe("planetTypes", () => {
  it("returns 5 types", () => {
    expect(planetTypes()).toHaveLength(5);
  });
});
