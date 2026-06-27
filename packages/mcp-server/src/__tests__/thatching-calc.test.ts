import { describe, it, expect } from "vitest";
import {
  bundlesNeeded, thicknessInches, ridgeLength, lifespanYears,
  sparsPerBundle, layersRequired, laborDays, fixingWireM,
  weightPerM2, fireRetardantL, thatchMaterials,
} from "../thatching-calc.js";

describe("bundlesNeeded", () => {
  it("positive bundles", () => {
    expect(bundlesNeeded(50, "reed")).toBeGreaterThan(0);
  });
  it("straw needs more", () => {
    expect(bundlesNeeded(50, "straw")).toBeGreaterThan(bundlesNeeded(50, "reed"));
  });
});

describe("thicknessInches", () => {
  it("straw thickest", () => {
    expect(thicknessInches("straw")).toBeGreaterThan(thicknessInches("palm"));
  });
});

describe("ridgeLength", () => {
  it("roof + 0.6m", () => {
    expect(ridgeLength(10)).toBe(10.6);
  });
});

describe("lifespanYears", () => {
  it("reed longest", () => {
    expect(lifespanYears("reed")).toBeGreaterThan(lifespanYears("palm"));
  });
});

describe("sparsPerBundle", () => {
  it("3x diameter", () => {
    expect(sparsPerBundle(10)).toBe(30);
  });
});

describe("layersRequired", () => {
  it("steep pitch = fewer layers", () => {
    expect(layersRequired(55)).toBeLessThan(layersRequired(35));
  });
});

describe("laborDays", () => {
  it("positive days", () => {
    expect(laborDays(100, 2)).toBeGreaterThan(0);
  });
  it("zero thatchers = 0", () => {
    expect(laborDays(100, 0)).toBe(0);
  });
});

describe("fixingWireM", () => {
  it("3m per m2", () => {
    expect(fixingWireM(50)).toBe(150);
  });
});

describe("weightPerM2", () => {
  it("heather heaviest", () => {
    expect(weightPerM2("heather")).toBeGreaterThan(weightPerM2("palm"));
  });
});

describe("fireRetardantL", () => {
  it("0.5L per m2", () => {
    expect(fireRetardantL(100)).toBe(50);
  });
});

describe("thatchMaterials", () => {
  it("returns 5 materials", () => {
    expect(thatchMaterials()).toHaveLength(5);
  });
});
