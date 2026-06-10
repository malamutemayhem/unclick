import { describe, it, expect } from "vitest";
import {
  harvestWindowDays, cleaningMethod, dryingDays,
  viabilityYears, storageHumidityPercent, coldStratificationRequired,
  germinationRatePercent, processingDifficulty, seedsPerGram, seedTypes,
} from "../seed-saving-calc.js";

describe("harvestWindowDays", () => {
  it("dry seed has longest window", () => {
    expect(harvestWindowDays("dry_seed")).toBeGreaterThan(
      harvestWindowDays("wind_dispersed")
    );
  });
});

describe("cleaningMethod", () => {
  it("wet seed uses fermentation", () => {
    expect(cleaningMethod("wet_seed")).toBe("fermentation");
  });
});

describe("dryingDays", () => {
  it("wet seed takes longest to dry", () => {
    expect(dryingDays("wet_seed")).toBeGreaterThan(
      dryingDays("wind_dispersed")
    );
  });
});

describe("viabilityYears", () => {
  it("dry seed stays viable longest", () => {
    expect(viabilityYears("dry_seed")).toBeGreaterThan(
      viabilityYears("wind_dispersed")
    );
  });
});

describe("storageHumidityPercent", () => {
  it("berry seed needs most humidity", () => {
    expect(storageHumidityPercent("berry_seed")).toBeGreaterThan(
      storageHumidityPercent("wind_dispersed")
    );
  });
});

describe("coldStratificationRequired", () => {
  it("berry seed needs stratification", () => {
    expect(coldStratificationRequired("berry_seed")).toBe(true);
  });
  it("dry seed does not", () => {
    expect(coldStratificationRequired("dry_seed")).toBe(false);
  });
});

describe("germinationRatePercent", () => {
  it("dry seed germinates best", () => {
    expect(germinationRatePercent("dry_seed")).toBeGreaterThan(
      germinationRatePercent("wind_dispersed")
    );
  });
});

describe("processingDifficulty", () => {
  it("berry seed is hardest to process", () => {
    expect(processingDifficulty("berry_seed")).toBeGreaterThan(
      processingDifficulty("dry_seed")
    );
  });
});

describe("seedsPerGram", () => {
  it("wind dispersed has most per gram", () => {
    expect(seedsPerGram("wind_dispersed")).toBeGreaterThan(
      seedsPerGram("pod_seed")
    );
  });
});

describe("seedTypes", () => {
  it("returns 5 types", () => {
    expect(seedTypes()).toHaveLength(5);
  });
});
