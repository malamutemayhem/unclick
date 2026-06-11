import { describe, it, expect } from "vitest";
import {
  purity, reliability, capacity, safety,
  mgCost, redundant, forSurgical, supply,
  bestUse, medicalGasTypes,
} from "../medical-gas-calc.js";

describe("purity", () => {
  it("oxygen highest purity", () => {
    expect(purity("oxygen_bulk_liquid")).toBeGreaterThan(purity("vacuum_rotary_pump"));
  });
});

describe("reliability", () => {
  it("oxygen most reliable", () => {
    expect(reliability("oxygen_bulk_liquid")).toBeGreaterThan(reliability("nitrous_oxide_manifold"));
  });
});

describe("capacity", () => {
  it("oxygen highest capacity", () => {
    expect(capacity("oxygen_bulk_liquid")).toBeGreaterThan(capacity("nitrous_oxide_manifold"));
  });
});

describe("safety", () => {
  it("oxygen safest", () => {
    expect(safety("oxygen_bulk_liquid")).toBeGreaterThan(safety("vacuum_rotary_pump"));
  });
});

describe("mgCost", () => {
  it("nitrogen most expensive", () => {
    expect(mgCost("nitrogen_generator_psa")).toBeGreaterThan(mgCost("nitrous_oxide_manifold"));
  });
});

describe("redundant", () => {
  it("oxygen is redundant", () => {
    expect(redundant("oxygen_bulk_liquid")).toBe(true);
  });
  it("nitrous not redundant", () => {
    expect(redundant("nitrous_oxide_manifold")).toBe(false);
  });
});

describe("forSurgical", () => {
  it("vacuum for surgical", () => {
    expect(forSurgical("vacuum_rotary_pump")).toBe(true);
  });
  it("nitrogen not surgical", () => {
    expect(forSurgical("nitrogen_generator_psa")).toBe(false);
  });
});

describe("supply", () => {
  it("nitrous uses manifold", () => {
    expect(supply("nitrous_oxide_manifold")).toBe("cylinder_manifold_auto_switchover");
  });
});

describe("bestUse", () => {
  it("oxygen for large hospital", () => {
    expect(bestUse("oxygen_bulk_liquid")).toBe("large_hospital_campus_main");
  });
});

describe("medicalGasTypes", () => {
  it("returns 5 types", () => {
    expect(medicalGasTypes()).toHaveLength(5);
  });
});
