import { describe, it, expect } from "vitest";
import {
  depthMeters, lightPenetration, speciesDiversity,
  pressureAtm, temperatureCelsius, hasPhotosynthesis,
  bioluminescent, commonName, keyOrganism, oceanZones,
} from "../ocean-zone-calc.js";

describe("depthMeters", () => {
  it("hadopelagic is deepest", () => {
    expect(depthMeters("hadopelagic")).toBeGreaterThan(
      depthMeters("epipelagic")
    );
  });
});

describe("lightPenetration", () => {
  it("epipelagic has most light", () => {
    expect(lightPenetration("epipelagic")).toBeGreaterThan(
      lightPenetration("bathypelagic")
    );
  });
});

describe("speciesDiversity", () => {
  it("epipelagic most diverse", () => {
    expect(speciesDiversity("epipelagic")).toBeGreaterThan(
      speciesDiversity("hadopelagic")
    );
  });
});

describe("pressureAtm", () => {
  it("hadopelagic has most pressure", () => {
    expect(pressureAtm("hadopelagic")).toBeGreaterThan(
      pressureAtm("epipelagic")
    );
  });
});

describe("temperatureCelsius", () => {
  it("epipelagic is warmest", () => {
    expect(temperatureCelsius("epipelagic")).toBeGreaterThan(
      temperatureCelsius("hadopelagic")
    );
  });
});

describe("hasPhotosynthesis", () => {
  it("epipelagic has photosynthesis", () => {
    expect(hasPhotosynthesis("epipelagic")).toBe(true);
  });
  it("bathypelagic does not", () => {
    expect(hasPhotosynthesis("bathypelagic")).toBe(false);
  });
});

describe("bioluminescent", () => {
  it("mesopelagic has bioluminescence", () => {
    expect(bioluminescent("mesopelagic")).toBe(true);
  });
  it("epipelagic does not", () => {
    expect(bioluminescent("epipelagic")).toBe(false);
  });
});

describe("commonName", () => {
  it("epipelagic is sunlight zone", () => {
    expect(commonName("epipelagic")).toBe("sunlight_zone");
  });
});

describe("keyOrganism", () => {
  it("bathypelagic has anglerfish", () => {
    expect(keyOrganism("bathypelagic")).toBe("anglerfish");
  });
});

describe("oceanZones", () => {
  it("returns 5 zones", () => {
    expect(oceanZones()).toHaveLength(5);
  });
});
