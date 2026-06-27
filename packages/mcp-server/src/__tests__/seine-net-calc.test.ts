import { describe, it, expect } from "vitest";
import {
  netLengthMeters, depthMeters, catchCapacityTonnes,
  crewSize, vesselRequired, meshSizeCm,
  deployTimeMinutes, targetSpeciesCount, costEstimate, seineTypes,
} from "../seine-net-calc.js";

describe("netLengthMeters", () => {
  it("purse seine has longest net", () => {
    expect(netLengthMeters("purse_seine")).toBeGreaterThan(
      netLengthMeters("beach_seine")
    );
  });
});

describe("depthMeters", () => {
  it("purse seine works deepest", () => {
    expect(depthMeters("purse_seine")).toBeGreaterThan(
      depthMeters("beach_seine")
    );
  });
});

describe("catchCapacityTonnes", () => {
  it("purse seine catches most", () => {
    expect(catchCapacityTonnes("purse_seine")).toBeGreaterThan(
      catchCapacityTonnes("beach_seine")
    );
  });
});

describe("crewSize", () => {
  it("purse seine needs largest crew", () => {
    expect(crewSize("purse_seine")).toBeGreaterThan(
      crewSize("danish_seine")
    );
  });
});

describe("vesselRequired", () => {
  it("purse seine requires vessel", () => {
    expect(vesselRequired("purse_seine")).toBe(true);
  });
  it("beach seine does not", () => {
    expect(vesselRequired("beach_seine")).toBe(false);
  });
});

describe("meshSizeCm", () => {
  it("danish seine has largest mesh", () => {
    expect(meshSizeCm("danish_seine")).toBeGreaterThan(
      meshSizeCm("beach_seine")
    );
  });
});

describe("deployTimeMinutes", () => {
  it("danish seine takes longest to deploy", () => {
    expect(deployTimeMinutes("danish_seine")).toBeGreaterThan(
      deployTimeMinutes("purse_seine")
    );
  });
});

describe("targetSpeciesCount", () => {
  it("beach seine targets most species", () => {
    expect(targetSpeciesCount("beach_seine")).toBeGreaterThan(
      targetSpeciesCount("purse_seine")
    );
  });
});

describe("costEstimate", () => {
  it("purse seine is most expensive", () => {
    expect(costEstimate("purse_seine")).toBeGreaterThan(
      costEstimate("beach_seine")
    );
  });
});

describe("seineTypes", () => {
  it("returns 5 types", () => {
    expect(seineTypes()).toHaveLength(5);
  });
});
