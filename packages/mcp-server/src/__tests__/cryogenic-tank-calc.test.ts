import { describe, it, expect } from "vitest";
import {
  boilOffRate, capacity, insulation, safety,
  ctCost, transportable, forLng, containment,
  bestUse, cryogenicTankTypes,
} from "../cryogenic-tank-calc.js";

describe("boilOffRate", () => {
  it("double wall vacuum best boil off", () => {
    expect(boilOffRate("double_wall_vacuum")).toBeGreaterThan(boilOffRate("micro_bulk_portable"));
  });
});

describe("capacity", () => {
  it("flat bottom lng highest capacity", () => {
    expect(capacity("flat_bottom_lng")).toBeGreaterThan(capacity("micro_bulk_portable"));
  });
});

describe("insulation", () => {
  it("double wall vacuum best insulation", () => {
    expect(insulation("double_wall_vacuum")).toBeGreaterThan(insulation("micro_bulk_portable"));
  });
});

describe("safety", () => {
  it("flat bottom lng highest safety", () => {
    expect(safety("flat_bottom_lng")).toBeGreaterThanOrEqual(safety("double_wall_vacuum"));
  });
});

describe("ctCost", () => {
  it("spherical lng moss most expensive", () => {
    expect(ctCost("spherical_lng_moss")).toBeGreaterThan(ctCost("micro_bulk_portable"));
  });
});

describe("transportable", () => {
  it("spherical lng moss is transportable", () => {
    expect(transportable("spherical_lng_moss")).toBe(true);
  });
  it("double wall vacuum not transportable", () => {
    expect(transportable("double_wall_vacuum")).toBe(false);
  });
});

describe("forLng", () => {
  it("flat bottom for lng", () => {
    expect(forLng("flat_bottom_lng")).toBe(true);
  });
  it("double wall vacuum not for lng", () => {
    expect(forLng("double_wall_vacuum")).toBe(false);
  });
});

describe("containment", () => {
  it("membrane lng uses membrane liner", () => {
    expect(containment("membrane_lng_ship")).toBe("membrane_liner_insulation_ship_hull_primary");
  });
});

describe("bestUse", () => {
  it("micro bulk for hospital lab", () => {
    expect(bestUse("micro_bulk_portable")).toBe("hospital_lab_small_user_liquid_nitrogen_delivery");
  });
});

describe("cryogenicTankTypes", () => {
  it("returns 5 types", () => {
    expect(cryogenicTankTypes()).toHaveLength(5);
  });
});
