import { describe, it, expect } from "vitest";
import {
  capacity, durability, weight, watertight,
  uvCost, trafficRated, forElectrical, lid,
  bestUse, utilityVaultTypes,
} from "../utility-vault-calc.js";

describe("capacity", () => {
  it("precast concrete largest", () => {
    expect(capacity("precast_concrete_box")).toBeGreaterThan(capacity("hdpe_hand_hole"));
  });
});

describe("durability", () => {
  it("cast in place most durable", () => {
    expect(durability("cast_in_place_custom")).toBeGreaterThan(durability("hdpe_hand_hole"));
  });
});

describe("weight", () => {
  it("hdpe lightest (highest score)", () => {
    expect(weight("hdpe_hand_hole")).toBeGreaterThan(weight("cast_in_place_custom"));
  });
});

describe("watertight", () => {
  it("fiberglass most watertight", () => {
    expect(watertight("fiberglass_direct_bury")).toBeGreaterThan(watertight("precast_concrete_box"));
  });
});

describe("uvCost", () => {
  it("cast in place most expensive", () => {
    expect(uvCost("cast_in_place_custom")).toBeGreaterThan(uvCost("hdpe_hand_hole"));
  });
});

describe("trafficRated", () => {
  it("precast is traffic rated", () => {
    expect(trafficRated("precast_concrete_box")).toBe(true);
  });
  it("hdpe not traffic rated", () => {
    expect(trafficRated("hdpe_hand_hole")).toBe(false);
  });
});

describe("forElectrical", () => {
  it("all types for electrical", () => {
    expect(forElectrical("precast_concrete_box")).toBe(true);
  });
});

describe("lid", () => {
  it("polymer uses flush lid", () => {
    expect(lid("polymer_concrete_splice")).toBe("polymer_concrete_flush_lid");
  });
});

describe("bestUse", () => {
  it("fiberglass for telecom", () => {
    expect(bestUse("fiberglass_direct_bury")).toBe("telecom_fiber_optic_access");
  });
});

describe("utilityVaultTypes", () => {
  it("returns 5 types", () => {
    expect(utilityVaultTypes()).toHaveLength(5);
  });
});
