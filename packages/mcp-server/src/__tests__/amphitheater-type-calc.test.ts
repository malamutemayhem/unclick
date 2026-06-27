import { describe, it, expect } from "vitest";
import {
  seatingCapacity, acousticQuality, architecturalComplexity,
  undergroundStructures, sightlineQuality, roofed,
  fullEllipse, primaryUse, survivingExamples, amphitheaterTypes,
} from "../amphitheater-type-calc.js";

describe("seatingCapacity", () => {
  it("circus has largest capacity", () => {
    expect(seatingCapacity("circus")).toBeGreaterThan(
      seatingCapacity("roman")
    );
  });
});

describe("acousticQuality", () => {
  it("greek has best acoustics", () => {
    expect(acousticQuality("greek")).toBeGreaterThan(
      acousticQuality("circus")
    );
  });
});

describe("architecturalComplexity", () => {
  it("roman is most complex", () => {
    expect(architecturalComplexity("roman")).toBeGreaterThan(
      architecturalComplexity("stadium")
    );
  });
});

describe("undergroundStructures", () => {
  it("roman has most underground", () => {
    expect(undergroundStructures("roman")).toBeGreaterThan(
      undergroundStructures("greek")
    );
  });
});

describe("sightlineQuality", () => {
  it("greek has best sightlines", () => {
    expect(sightlineQuality("greek")).toBeGreaterThan(
      sightlineQuality("circus")
    );
  });
});

describe("roofed", () => {
  it("odeon is roofed", () => {
    expect(roofed("odeon")).toBe(true);
  });
  it("roman is not", () => {
    expect(roofed("roman")).toBe(false);
  });
});

describe("fullEllipse", () => {
  it("roman is full ellipse", () => {
    expect(fullEllipse("roman")).toBe(true);
  });
  it("greek is not", () => {
    expect(fullEllipse("greek")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("roman for gladiatorial", () => {
    expect(primaryUse("roman")).toBe("gladiatorial");
  });
});

describe("survivingExamples", () => {
  it("roman has most surviving examples", () => {
    expect(survivingExamples("roman")).toBeGreaterThan(
      survivingExamples("stadium")
    );
  });
});

describe("amphitheaterTypes", () => {
  it("returns 5 types", () => {
    expect(amphitheaterTypes()).toHaveLength(5);
  });
});
