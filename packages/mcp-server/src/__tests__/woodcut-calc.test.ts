import { describe, it, expect } from "vitest";
import {
  hardnessRating, detailResolutionLpi, blockThicknessMm, gougeSizesNeeded,
  carvingTimeHoursPerDm2, editionsPerBlock, inkCoverageGPerM2, pressurePsi,
  costPerBlock, woodTypes,
} from "../woodcut-calc.js";

describe("hardnessRating", () => {
  it("boxwood is hardest", () => {
    expect(hardnessRating("boxwood")).toBeGreaterThan(hardnessRating("linden"));
  });
});

describe("detailResolutionLpi", () => {
  it("boxwood has finest detail", () => {
    expect(detailResolutionLpi("boxwood")).toBeGreaterThan(
      detailResolutionLpi("linden")
    );
  });
});

describe("blockThicknessMm", () => {
  it("linden is thickest", () => {
    expect(blockThicknessMm("linden")).toBeGreaterThan(
      blockThicknessMm("boxwood")
    );
  });
});

describe("gougeSizesNeeded", () => {
  it("higher detail needs more gouges", () => {
    expect(gougeSizesNeeded(8)).toBeGreaterThan(gougeSizesNeeded(3));
  });
  it("minimum 3 gouges", () => {
    expect(gougeSizesNeeded(1)).toBeGreaterThanOrEqual(3);
  });
  it("maximum 12 gouges", () => {
    expect(gougeSizesNeeded(20)).toBeLessThanOrEqual(12);
  });
});

describe("carvingTimeHoursPerDm2", () => {
  it("boxwood takes longest", () => {
    expect(carvingTimeHoursPerDm2("boxwood")).toBeGreaterThan(
      carvingTimeHoursPerDm2("linden")
    );
  });
});

describe("editionsPerBlock", () => {
  it("boxwood yields most editions", () => {
    expect(editionsPerBlock("boxwood")).toBeGreaterThan(
      editionsPerBlock("linden")
    );
  });
});

describe("inkCoverageGPerM2", () => {
  it("returns 15", () => {
    expect(inkCoverageGPerM2()).toBe(15);
  });
});

describe("pressurePsi", () => {
  it("returns 100", () => {
    expect(pressurePsi()).toBe(100);
  });
});

describe("costPerBlock", () => {
  it("boxwood is most expensive", () => {
    expect(costPerBlock("boxwood")).toBeGreaterThan(costPerBlock("linden"));
  });
});

describe("woodTypes", () => {
  it("returns 5 types", () => {
    expect(woodTypes()).toHaveLength(5);
  });
});
