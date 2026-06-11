import { describe, it, expect } from "vitest";
import {
  blowForce, uniformity, airConsumption, noiseLevel,
  akCost, adjustable, forDrying, airPattern,
  bestUse, airKnifeTypes,
} from "../air-knife-calc.js";

describe("blowForce", () => {
  it("super air amplifier highest blow force", () => {
    expect(blowForce("super_air_amplifier")).toBeGreaterThan(blowForce("ionizing_static"));
  });
});

describe("uniformity", () => {
  it("circular annular best uniformity", () => {
    expect(uniformity("circular_annular")).toBeGreaterThan(uniformity("super_air_amplifier"));
  });
});

describe("airConsumption", () => {
  it("super air amplifier best air consumption efficiency", () => {
    expect(airConsumption("super_air_amplifier")).toBeGreaterThan(airConsumption("heated_hot_air"));
  });
});

describe("noiseLevel", () => {
  it("super air amplifier quietest", () => {
    expect(noiseLevel("super_air_amplifier")).toBeGreaterThan(noiseLevel("heated_hot_air"));
  });
});

describe("akCost", () => {
  it("ionizing static most expensive", () => {
    expect(akCost("ionizing_static")).toBeGreaterThan(akCost("super_air_amplifier"));
  });
});

describe("adjustable", () => {
  it("flat jet standard is adjustable", () => {
    expect(adjustable("flat_jet_standard")).toBe(true);
  });
  it("circular annular not adjustable", () => {
    expect(adjustable("circular_annular")).toBe(false);
  });
});

describe("forDrying", () => {
  it("flat jet standard for drying", () => {
    expect(forDrying("flat_jet_standard")).toBe(true);
  });
  it("ionizing static not for drying", () => {
    expect(forDrying("ionizing_static")).toBe(false);
  });
});

describe("airPattern", () => {
  it("circular annular 360 degree ring", () => {
    expect(airPattern("circular_annular")).toBe("360_degree_annular_ring_uniform_blow_around_wire_tube_rod");
  });
});

describe("bestUse", () => {
  it("ionizing static for electronics assembly", () => {
    expect(bestUse("ionizing_static")).toBe("electronics_assembly_film_packaging_static_elimination_clean");
  });
});

describe("airKnifeTypes", () => {
  it("returns 5 types", () => {
    expect(airKnifeTypes()).toHaveLength(5);
  });
});
