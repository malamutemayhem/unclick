import { describe, it, expect } from "vitest";
import {
  depthMeters, loadCapacityKn, soilTolerance,
  settlementControl, excavationVolume, waterTableSafe,
  heavyEquipmentNeeded, bestStructure, costPerUnit, foundationTypes,
} from "../foundation-type-calc.js";

describe("depthMeters", () => {
  it("caisson goes deepest", () => {
    expect(depthMeters("caisson")).toBeGreaterThan(
      depthMeters("strip")
    );
  });
});

describe("loadCapacityKn", () => {
  it("caisson has highest capacity", () => {
    expect(loadCapacityKn("caisson")).toBeGreaterThan(
      loadCapacityKn("strip")
    );
  });
});

describe("soilTolerance", () => {
  it("caisson tolerates worst soil", () => {
    expect(soilTolerance("caisson")).toBeGreaterThan(
      soilTolerance("strip")
    );
  });
});

describe("settlementControl", () => {
  it("raft controls settlement best", () => {
    expect(settlementControl("raft")).toBeGreaterThan(
      settlementControl("strip")
    );
  });
});

describe("excavationVolume", () => {
  it("raft needs most excavation", () => {
    expect(excavationVolume("raft")).toBeGreaterThan(
      excavationVolume("pile")
    );
  });
});

describe("waterTableSafe", () => {
  it("pile is safe with high water table", () => {
    expect(waterTableSafe("pile")).toBe(true);
  });
  it("strip is not", () => {
    expect(waterTableSafe("strip")).toBe(false);
  });
});

describe("heavyEquipmentNeeded", () => {
  it("caisson needs heavy equipment", () => {
    expect(heavyEquipmentNeeded("caisson")).toBe(true);
  });
  it("strip does not", () => {
    expect(heavyEquipmentNeeded("strip")).toBe(false);
  });
});

describe("bestStructure", () => {
  it("pile best for skyscraper", () => {
    expect(bestStructure("pile")).toBe("skyscraper");
  });
});

describe("costPerUnit", () => {
  it("caisson costs most", () => {
    expect(costPerUnit("caisson")).toBeGreaterThan(
      costPerUnit("strip")
    );
  });
});

describe("foundationTypes", () => {
  it("returns 5 types", () => {
    expect(foundationTypes()).toHaveLength(5);
  });
});
