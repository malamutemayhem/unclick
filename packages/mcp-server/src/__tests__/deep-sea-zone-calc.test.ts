import { describe, it, expect } from "vitest";
import {
  depthRangeMeters, lightLevel, pressureAtm,
  biodiversity, bioluminescence, photosynthesisPossible,
  humanExplored, commonName, explorationDifficulty, deepSeaZones,
} from "../deep-sea-zone-calc.js";

describe("depthRangeMeters", () => {
  it("hadopelagic is deepest", () => {
    expect(depthRangeMeters("hadopelagic")).toBeGreaterThan(
      depthRangeMeters("epipelagic")
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

describe("pressureAtm", () => {
  it("hadopelagic has highest pressure", () => {
    expect(pressureAtm("hadopelagic")).toBeGreaterThan(
      pressureAtm("epipelagic")
    );
  });
});

describe("biodiversity", () => {
  it("epipelagic has most biodiversity", () => {
    expect(biodiversity("epipelagic")).toBeGreaterThan(
      biodiversity("hadopelagic")
    );
  });
});

describe("bioluminescence", () => {
  it("bathypelagic has most bioluminescence", () => {
    expect(bioluminescence("bathypelagic")).toBeGreaterThan(
      bioluminescence("epipelagic")
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
  it("all zones have been explored", () => {
    expect(humanExplored("hadopelagic")).toBe(true);
    expect(humanExplored("epipelagic")).toBe(true);
  });
});

describe("commonName", () => {
  it("epipelagic is sunlight zone", () => {
    expect(commonName("epipelagic")).toBe("sunlight_zone");
  });
});

describe("explorationDifficulty", () => {
  it("hadopelagic is hardest to explore", () => {
    expect(explorationDifficulty("hadopelagic")).toBeGreaterThan(
      explorationDifficulty("epipelagic")
    );
  });
});

describe("deepSeaZones", () => {
  it("returns 5 zones", () => {
    expect(deepSeaZones()).toHaveLength(5);
  });
});
