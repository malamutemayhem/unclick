import { describe, it, expect } from "vitest";
import {
  currentCapacity, consumptionRate, durability, flexibility,
  icCost, inert, forDeepWell, anode,
  bestUse, impressedCurrentTypes,
} from "../impressed-current-calc.js";

describe("currentCapacity", () => {
  it("mmo titanium highest current capacity", () => {
    expect(currentCapacity("mmo_titanium_anode")).toBeGreaterThanOrEqual(currentCapacity("platinum_clad_niobium"));
  });
});

describe("consumptionRate", () => {
  it("mmo titanium best consumption rate", () => {
    expect(consumptionRate("mmo_titanium_anode")).toBeGreaterThan(consumptionRate("graphite_anode_rod"));
  });
});

describe("durability", () => {
  it("platinum clad most durable", () => {
    expect(durability("platinum_clad_niobium")).toBeGreaterThan(durability("graphite_anode_rod"));
  });
});

describe("flexibility", () => {
  it("conductive polymer most flexible", () => {
    expect(flexibility("conductive_polymer_str")).toBeGreaterThan(flexibility("silicon_iron_anode"));
  });
});

describe("icCost", () => {
  it("platinum clad most expensive", () => {
    expect(icCost("platinum_clad_niobium")).toBeGreaterThan(icCost("graphite_anode_rod"));
  });
});

describe("inert", () => {
  it("mmo titanium is inert", () => {
    expect(inert("mmo_titanium_anode")).toBe(true);
  });
  it("graphite not inert", () => {
    expect(inert("graphite_anode_rod")).toBe(false);
  });
});

describe("forDeepWell", () => {
  it("silicon iron for deep well", () => {
    expect(forDeepWell("silicon_iron_anode")).toBe(true);
  });
  it("graphite not for deep well", () => {
    expect(forDeepWell("graphite_anode_rod")).toBe(false);
  });
});

describe("anode", () => {
  it("conductive polymer uses flexible strip", () => {
    expect(anode("conductive_polymer_str")).toBe("conductive_polymer_flexible_strip_distributed");
  });
});

describe("bestUse", () => {
  it("graphite for shallow ground bed", () => {
    expect(bestUse("graphite_anode_rod")).toBe("shallow_ground_bed_low_current_soil_application");
  });
});

describe("impressedCurrentTypes", () => {
  it("returns 5 types", () => {
    expect(impressedCurrentTypes()).toHaveLength(5);
  });
});
