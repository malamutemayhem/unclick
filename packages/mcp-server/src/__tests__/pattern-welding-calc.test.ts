import { describe, it, expect } from "vitest";
import {
  layerCount, foldCycles, weldTempCelsius,
  etchingTimeMins, patternVisibility, steelTypesRequired,
  difficultyRating, forgeTimeHours, costMultiplier, patternTypes,
} from "../pattern-welding-calc.js";

describe("layerCount", () => {
  it("star has most layers", () => {
    expect(layerCount("star")).toBeGreaterThan(
      layerCount("ladder")
    );
  });
});

describe("foldCycles", () => {
  it("star needs most folds", () => {
    expect(foldCycles("star")).toBeGreaterThan(
      foldCycles("ladder")
    );
  });
});

describe("weldTempCelsius", () => {
  it("star needs highest temp", () => {
    expect(weldTempCelsius("star")).toBeGreaterThan(
      weldTempCelsius("ladder")
    );
  });
});

describe("etchingTimeMins", () => {
  it("star needs longest etching", () => {
    expect(etchingTimeMins("star")).toBeGreaterThan(
      etchingTimeMins("ladder")
    );
  });
});

describe("patternVisibility", () => {
  it("star is most visible", () => {
    expect(patternVisibility("star")).toBeGreaterThan(
      patternVisibility("herringbone")
    );
  });
});

describe("steelTypesRequired", () => {
  it("star needs most steel types", () => {
    expect(steelTypesRequired("star")).toBeGreaterThan(
      steelTypesRequired("twist")
    );
  });
});

describe("difficultyRating", () => {
  it("star is hardest", () => {
    expect(difficultyRating("star")).toBeGreaterThan(
      difficultyRating("ladder")
    );
  });
});

describe("forgeTimeHours", () => {
  it("star takes longest", () => {
    expect(forgeTimeHours("star")).toBeGreaterThan(
      forgeTimeHours("ladder")
    );
  });
});

describe("costMultiplier", () => {
  it("star is most expensive", () => {
    expect(costMultiplier("star")).toBeGreaterThan(
      costMultiplier("ladder")
    );
  });
});

describe("patternTypes", () => {
  it("returns 5 types", () => {
    expect(patternTypes()).toHaveLength(5);
  });
});
