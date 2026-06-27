import { describe, it, expect } from "vitest";
import {
  maxDiameterMm, cutCleanliness, effortRequired,
  speedRating, liveWoodSafe, oneHanded,
  bestTask, sharpeningDifficulty, costEstimate, pruningTools,
} from "../pruning-tool-calc.js";

describe("maxDiameterMm", () => {
  it("pruning saw cuts thickest", () => {
    expect(maxDiameterMm("pruning_saw")).toBeGreaterThan(
      maxDiameterMm("bypass_secateurs")
    );
  });
});

describe("cutCleanliness", () => {
  it("bypass secateurs cut cleanest", () => {
    expect(cutCleanliness("bypass_secateurs")).toBeGreaterThan(
      cutCleanliness("hedge_shears")
    );
  });
});

describe("effortRequired", () => {
  it("pruning saw takes most effort", () => {
    expect(effortRequired("pruning_saw")).toBeGreaterThan(
      effortRequired("anvil_secateurs")
    );
  });
});

describe("speedRating", () => {
  it("hedge shears are fastest", () => {
    expect(speedRating("hedge_shears")).toBeGreaterThan(
      speedRating("pruning_saw")
    );
  });
});

describe("liveWoodSafe", () => {
  it("bypass secateurs are safe for live wood", () => {
    expect(liveWoodSafe("bypass_secateurs")).toBe(true);
  });
  it("anvil secateurs are not", () => {
    expect(liveWoodSafe("anvil_secateurs")).toBe(false);
  });
});

describe("oneHanded", () => {
  it("bypass secateurs are one handed", () => {
    expect(oneHanded("bypass_secateurs")).toBe(true);
  });
  it("loppers are not", () => {
    expect(oneHanded("loppers")).toBe(false);
  });
});

describe("bestTask", () => {
  it("bypass secateurs best for rose pruning", () => {
    expect(bestTask("bypass_secateurs")).toBe("rose_pruning");
  });
});

describe("sharpeningDifficulty", () => {
  it("pruning saw hardest to sharpen", () => {
    expect(sharpeningDifficulty("pruning_saw")).toBeGreaterThan(
      sharpeningDifficulty("anvil_secateurs")
    );
  });
});

describe("costEstimate", () => {
  it("loppers cost most", () => {
    expect(costEstimate("loppers")).toBeGreaterThan(
      costEstimate("anvil_secateurs")
    );
  });
});

describe("pruningTools", () => {
  it("returns 5 tools", () => {
    expect(pruningTools()).toHaveLength(5);
  });
});
