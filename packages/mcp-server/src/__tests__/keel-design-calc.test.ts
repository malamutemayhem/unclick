import { describe, it, expect } from "vitest";
import {
  pointingAbility, stabilityRange, shallowWaterCapability, speedPotential,
  maintenanceEase, groundingResistant, racingOriented, typicalBoatType,
  hydrodynamicProfile, keelDesigns,
} from "../keel-design-calc.js";

describe("pointingAbility", () => {
  it("wing best pointing", () => {
    expect(pointingAbility("wing")).toBeGreaterThan(pointingAbility("full"));
  });
});

describe("stabilityRange", () => {
  it("full most stable", () => {
    expect(stabilityRange("full")).toBeGreaterThan(stabilityRange("centerboard"));
  });
});

describe("shallowWaterCapability", () => {
  it("centerboard best shallow water", () => {
    expect(shallowWaterCapability("centerboard")).toBeGreaterThan(shallowWaterCapability("full"));
  });
});

describe("speedPotential", () => {
  it("wing fastest", () => {
    expect(speedPotential("wing")).toBeGreaterThan(speedPotential("full"));
  });
});

describe("maintenanceEase", () => {
  it("centerboard easiest maintenance", () => {
    expect(maintenanceEase("centerboard")).toBeGreaterThan(maintenanceEase("wing"));
  });
});

describe("groundingResistant", () => {
  it("full is grounding resistant", () => {
    expect(groundingResistant("full")).toBe(true);
  });
  it("fin is not", () => {
    expect(groundingResistant("fin")).toBe(false);
  });
});

describe("racingOriented", () => {
  it("wing is racing oriented", () => {
    expect(racingOriented("wing")).toBe(true);
  });
  it("full is not", () => {
    expect(racingOriented("full")).toBe(false);
  });
});

describe("typicalBoatType", () => {
  it("full for bluewater cruiser", () => {
    expect(typicalBoatType("full")).toBe("bluewater_cruiser");
  });
});

describe("hydrodynamicProfile", () => {
  it("wing has biplane endplate", () => {
    expect(hydrodynamicProfile("wing")).toBe("biplane_endplate");
  });
});

describe("keelDesigns", () => {
  it("returns 5 designs", () => {
    expect(keelDesigns()).toHaveLength(5);
  });
});
