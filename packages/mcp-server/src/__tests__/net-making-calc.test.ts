import { describe, it, expect } from "vitest";
import {
  meshSizeCm, twineWeightGPerM2, knotsPerM2, meshesPerRow,
  shuttleLoads, breakingStrengthKg, repairTimeMinsPerHole,
  lifespanYears, costPerM2, netTypes,
} from "../net-making-calc.js";

describe("meshSizeCm", () => {
  it("cargo has largest mesh", () => {
    expect(meshSizeCm("cargo")).toBeGreaterThan(meshSizeCm("seine"));
  });
});

describe("twineWeightGPerM2", () => {
  it("cargo is heaviest", () => {
    expect(twineWeightGPerM2("cargo")).toBeGreaterThan(
      twineWeightGPerM2("gill")
    );
  });
});

describe("knotsPerM2", () => {
  it("seine has most knots", () => {
    expect(knotsPerM2("seine")).toBeGreaterThan(knotsPerM2("cargo"));
  });
});

describe("meshesPerRow", () => {
  it("wider net has more meshes", () => {
    expect(meshesPerRow(100, 5)).toBeGreaterThan(meshesPerRow(50, 5));
  });
  it("zero mesh size returns 0", () => {
    expect(meshesPerRow(100, 0)).toBe(0);
  });
});

describe("shuttleLoads", () => {
  it("more meshes need more loads", () => {
    expect(shuttleLoads(500)).toBeGreaterThan(shuttleLoads(100));
  });
});

describe("breakingStrengthKg", () => {
  it("cargo is strongest", () => {
    expect(breakingStrengthKg("cargo")).toBeGreaterThan(
      breakingStrengthKg("cast")
    );
  });
});

describe("repairTimeMinsPerHole", () => {
  it("cargo takes longest to repair", () => {
    expect(repairTimeMinsPerHole("cargo")).toBeGreaterThan(
      repairTimeMinsPerHole("seine")
    );
  });
});

describe("lifespanYears", () => {
  it("cargo lasts longest", () => {
    expect(lifespanYears("cargo")).toBeGreaterThan(
      lifespanYears("gill")
    );
  });
});

describe("costPerM2", () => {
  it("cargo is most expensive", () => {
    expect(costPerM2("cargo")).toBeGreaterThan(costPerM2("gill"));
  });
});

describe("netTypes", () => {
  it("returns 5 types", () => {
    expect(netTypes()).toHaveLength(5);
  });
});
