import { describe, it, expect } from "vitest";
import {
  areaKm2, nutrientAvailability, speciesDiversity,
  humanImpact, researchAccessibility, exposedAtLowTide,
  bottomDwelling, dominantProducer, keyChallenge, marineZones,
} from "../marine-zone-calc.js";

describe("areaKm2", () => {
  it("oceanic largest area", () => {
    expect(areaKm2("oceanic")).toBeGreaterThan(
      areaKm2("intertidal")
    );
  });
});

describe("nutrientAvailability", () => {
  it("intertidal most nutrients", () => {
    expect(nutrientAvailability("intertidal")).toBeGreaterThan(
      nutrientAvailability("oceanic")
    );
  });
});

describe("speciesDiversity", () => {
  it("neritic most diverse", () => {
    expect(speciesDiversity("neritic")).toBeGreaterThan(
      speciesDiversity("oceanic")
    );
  });
});

describe("humanImpact", () => {
  it("intertidal most impacted", () => {
    expect(humanImpact("intertidal")).toBeGreaterThan(
      humanImpact("oceanic")
    );
  });
});

describe("researchAccessibility", () => {
  it("intertidal most accessible", () => {
    expect(researchAccessibility("intertidal")).toBeGreaterThan(
      researchAccessibility("benthic")
    );
  });
});

describe("exposedAtLowTide", () => {
  it("intertidal exposed at low tide", () => {
    expect(exposedAtLowTide("intertidal")).toBe(true);
  });
  it("neritic is not", () => {
    expect(exposedAtLowTide("neritic")).toBe(false);
  });
});

describe("bottomDwelling", () => {
  it("benthic is bottom dwelling", () => {
    expect(bottomDwelling("benthic")).toBe(true);
  });
  it("pelagic is not", () => {
    expect(bottomDwelling("pelagic")).toBe(false);
  });
});

describe("dominantProducer", () => {
  it("neritic dominated by phytoplankton", () => {
    expect(dominantProducer("neritic")).toBe("phytoplankton");
  });
});

describe("keyChallenge", () => {
  it("benthic faces extreme pressure", () => {
    expect(keyChallenge("benthic")).toBe("extreme_pressure");
  });
});

describe("marineZones", () => {
  it("returns 5 zones", () => {
    expect(marineZones()).toHaveLength(5);
  });
});
