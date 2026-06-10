import { describe, it, expect } from "vitest";
import {
  diameterKm, depthToWidthRatio, centralPeakHeight,
  ejectaBlanketRadius, impactEnergy, hasCentralPeak,
  subsurfaceIceIndicator, exampleCrater, preservationDifficulty, craterTypes,
} from "../crater-type-calc.js";

describe("diameterKm", () => {
  it("multi ring is largest", () => {
    expect(diameterKm("multi_ring")).toBeGreaterThan(
      diameterKm("simple")
    );
  });
});

describe("depthToWidthRatio", () => {
  it("simple has highest ratio", () => {
    expect(depthToWidthRatio("simple")).toBeGreaterThan(
      depthToWidthRatio("multi_ring")
    );
  });
});

describe("centralPeakHeight", () => {
  it("complex has tallest central peak", () => {
    expect(centralPeakHeight("complex")).toBeGreaterThan(
      centralPeakHeight("simple")
    );
  });
});

describe("ejectaBlanketRadius", () => {
  it("multi ring has widest ejecta", () => {
    expect(ejectaBlanketRadius("multi_ring")).toBeGreaterThan(
      ejectaBlanketRadius("simple")
    );
  });
});

describe("impactEnergy", () => {
  it("multi ring has highest impact energy", () => {
    expect(impactEnergy("multi_ring")).toBeGreaterThan(
      impactEnergy("simple")
    );
  });
});

describe("hasCentralPeak", () => {
  it("complex has central peak", () => {
    expect(hasCentralPeak("complex")).toBe(true);
  });
  it("simple does not", () => {
    expect(hasCentralPeak("simple")).toBe(false);
  });
});

describe("subsurfaceIceIndicator", () => {
  it("rampart indicates subsurface ice", () => {
    expect(subsurfaceIceIndicator("rampart")).toBe(true);
  });
  it("simple does not", () => {
    expect(subsurfaceIceIndicator("simple")).toBe(false);
  });
});

describe("exampleCrater", () => {
  it("simple example is meteor crater", () => {
    expect(exampleCrater("simple")).toBe("meteor_crater");
  });
});

describe("preservationDifficulty", () => {
  it("multi ring hardest to preserve", () => {
    expect(preservationDifficulty("multi_ring")).toBeGreaterThan(
      preservationDifficulty("simple")
    );
  });
});

describe("craterTypes", () => {
  it("returns 5 types", () => {
    expect(craterTypes()).toHaveLength(5);
  });
});
