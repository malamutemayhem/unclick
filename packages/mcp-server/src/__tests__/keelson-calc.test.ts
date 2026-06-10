import { describe, it, expect } from "vitest";
import {
  depthCm, widthCm, boltSpacingCm, boltDiameterMm, scarfLengthCm,
  timberSpecies, weightPerMeterKg, installationHoursPerM,
  costPerMeterTimber, keelsonTypes,
} from "../keelson-calc.js";

describe("depthCm", () => {
  it("main keelson is deepest", () => {
    expect(depthCm("main", 100)).toBeGreaterThan(depthCm("bilge", 100));
  });
});

describe("widthCm", () => {
  it("scales with depth", () => {
    expect(widthCm("main", 20)).toBeGreaterThan(widthCm("main", 10));
  });
});

describe("boltSpacingCm", () => {
  it("main has tightest spacing", () => {
    expect(boltSpacingCm("main")).toBeLessThan(boltSpacingCm("bilge"));
  });
});

describe("boltDiameterMm", () => {
  it("deeper keelson = larger bolts", () => {
    expect(boltDiameterMm(15)).toBeGreaterThan(boltDiameterMm(10));
  });
});

describe("scarfLengthCm", () => {
  it("6x depth", () => {
    expect(scarfLengthCm(10)).toBe(60);
  });
});

describe("timberSpecies", () => {
  it("main uses white oak", () => {
    expect(timberSpecies("main")).toBe("white_oak");
  });
});

describe("weightPerMeterKg", () => {
  it("wider and deeper = heavier", () => {
    expect(weightPerMeterKg(20, 15)).toBeGreaterThan(weightPerMeterKg(10, 10));
  });
});

describe("installationHoursPerM", () => {
  it("main takes longest", () => {
    expect(installationHoursPerM("main")).toBeGreaterThan(installationHoursPerM("bilge"));
  });
});

describe("costPerMeterTimber", () => {
  it("main is most expensive", () => {
    expect(costPerMeterTimber("main")).toBeGreaterThan(costPerMeterTimber("bilge"));
  });
});

describe("keelsonTypes", () => {
  it("returns 5 types", () => {
    expect(keelsonTypes()).toHaveLength(5);
  });
});
