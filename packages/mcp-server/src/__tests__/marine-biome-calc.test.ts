import { describe, it, expect } from "vitest";
import {
  productivityScore, speciesRichness, carbonStorage,
  threatLevel, depthRange, photosynthesisBased,
  coastalZone, keyFoundationSpecies, primaryEnergySource, marineBiomes,
} from "../marine-biome-calc.js";

describe("productivityScore", () => {
  it("coral reef most productive", () => {
    expect(productivityScore("coral_reef")).toBeGreaterThan(
      productivityScore("open_ocean")
    );
  });
});

describe("speciesRichness", () => {
  it("coral reef has most species", () => {
    expect(speciesRichness("coral_reef")).toBeGreaterThan(
      speciesRichness("deep_sea_vent")
    );
  });
});

describe("carbonStorage", () => {
  it("mangrove stores most carbon", () => {
    expect(carbonStorage("mangrove")).toBeGreaterThan(
      carbonStorage("deep_sea_vent")
    );
  });
});

describe("threatLevel", () => {
  it("coral reef most threatened", () => {
    expect(threatLevel("coral_reef")).toBeGreaterThan(
      threatLevel("deep_sea_vent")
    );
  });
});

describe("depthRange", () => {
  it("open ocean deepest range", () => {
    expect(depthRange("open_ocean")).toBeGreaterThan(
      depthRange("mangrove")
    );
  });
});

describe("photosynthesisBased", () => {
  it("kelp forest is photosynthesis based", () => {
    expect(photosynthesisBased("kelp_forest")).toBe(true);
  });
  it("deep sea vent is not", () => {
    expect(photosynthesisBased("deep_sea_vent")).toBe(false);
  });
});

describe("coastalZone", () => {
  it("mangrove is coastal", () => {
    expect(coastalZone("mangrove")).toBe(true);
  });
  it("open ocean is not", () => {
    expect(coastalZone("open_ocean")).toBe(false);
  });
});

describe("keyFoundationSpecies", () => {
  it("deep sea vent has tube worms", () => {
    expect(keyFoundationSpecies("deep_sea_vent")).toBe("tube_worm");
  });
});

describe("primaryEnergySource", () => {
  it("deep sea vent uses chemosynthesis", () => {
    expect(primaryEnergySource("deep_sea_vent")).toBe("chemosynthesis");
  });
});

describe("marineBiomes", () => {
  it("returns 5 biomes", () => {
    expect(marineBiomes()).toHaveLength(5);
  });
});
