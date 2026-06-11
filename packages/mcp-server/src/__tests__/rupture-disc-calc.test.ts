import { describe, it, expect } from "vitest";
import {
  burstAccuracy, capacity, fatigue, corrosionResist,
  rdCost, reusable, forVacuum, material,
  bestUse, ruptureDiscTypes,
} from "../rupture-disc-calc.js";

describe("burstAccuracy", () => {
  it("scored tension most accurate burst", () => {
    expect(burstAccuracy("scored_tension_pre_cut")).toBeGreaterThan(burstAccuracy("forward_acting_tension"));
  });
});

describe("capacity", () => {
  it("reverse acting highest capacity", () => {
    expect(capacity("reverse_acting_buckle")).toBeGreaterThan(capacity("sanitary_clamp_pharma"));
  });
});

describe("fatigue", () => {
  it("reverse acting best fatigue life", () => {
    expect(fatigue("reverse_acting_buckle")).toBeGreaterThan(fatigue("forward_acting_tension"));
  });
});

describe("corrosionResist", () => {
  it("graphite composite best corrosion resistance", () => {
    expect(corrosionResist("graphite_composite_mono")).toBeGreaterThan(corrosionResist("forward_acting_tension"));
  });
});

describe("rdCost", () => {
  it("sanitary clamp most expensive", () => {
    expect(rdCost("sanitary_clamp_pharma")).toBeGreaterThan(rdCost("forward_acting_tension"));
  });
});

describe("reusable", () => {
  it("no rupture discs are reusable", () => {
    expect(reusable("forward_acting_tension")).toBe(false);
    expect(reusable("reverse_acting_buckle")).toBe(false);
  });
});

describe("forVacuum", () => {
  it("reverse acting for vacuum", () => {
    expect(forVacuum("reverse_acting_buckle")).toBe(true);
  });
  it("forward acting not for vacuum", () => {
    expect(forVacuum("forward_acting_tension")).toBe(false);
  });
});

describe("material", () => {
  it("graphite uses ptfe fluoropolymer", () => {
    expect(material("graphite_composite_mono")).toBe("graphite_ptfe_fluoropolymer_layered");
  });
});

describe("bestUse", () => {
  it("sanitary clamp for pharma biotech", () => {
    expect(bestUse("sanitary_clamp_pharma")).toBe("pharma_biotech_food_sanitary_system");
  });
});

describe("ruptureDiscTypes", () => {
  it("returns 5 types", () => {
    expect(ruptureDiscTypes()).toHaveLength(5);
  });
});
