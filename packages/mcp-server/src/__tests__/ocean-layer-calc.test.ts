import { describe, it, expect } from "vitest";
import {
  depthRangeM, lightLevel, temperatureC,
  pressureAtm, biodiversity, photosynthesisPossible,
  humanExplored, commonName, typicalOrganism, oceanLayers,
} from "../ocean-layer-calc.js";

describe("depthRangeM", () => {
  it("hadopelagic deepest", () => {
    expect(depthRangeM("hadopelagic")).toBeGreaterThan(
      depthRangeM("epipelagic")
    );
  });
});

describe("lightLevel", () => {
  it("epipelagic has most light", () => {
    expect(lightLevel("epipelagic")).toBeGreaterThan(
      lightLevel("bathypelagic")
    );
  });
});

describe("temperatureC", () => {
  it("epipelagic warmest", () => {
    expect(temperatureC("epipelagic")).toBeGreaterThan(
      temperatureC("abyssopelagic")
    );
  });
});

describe("pressureAtm", () => {
  it("hadopelagic highest pressure", () => {
    expect(pressureAtm("hadopelagic")).toBeGreaterThan(
      pressureAtm("epipelagic")
    );
  });
});

describe("biodiversity", () => {
  it("epipelagic most biodiverse", () => {
    expect(biodiversity("epipelagic")).toBeGreaterThan(
      biodiversity("hadopelagic")
    );
  });
});

describe("photosynthesisPossible", () => {
  it("epipelagic supports photosynthesis", () => {
    expect(photosynthesisPossible("epipelagic")).toBe(true);
  });
  it("bathypelagic does not", () => {
    expect(photosynthesisPossible("bathypelagic")).toBe(false);
  });
});

describe("humanExplored", () => {
  it("hadopelagic has been explored", () => {
    expect(humanExplored("hadopelagic")).toBe(true);
  });
});

describe("commonName", () => {
  it("mesopelagic is twilight zone", () => {
    expect(commonName("mesopelagic")).toBe("twilight_zone");
  });
});

describe("typicalOrganism", () => {
  it("bathypelagic has anglerfish", () => {
    expect(typicalOrganism("bathypelagic")).toBe("anglerfish_squid");
  });
});

describe("oceanLayers", () => {
  it("returns 5 layers", () => {
    expect(oceanLayers()).toHaveLength(5);
  });
});
