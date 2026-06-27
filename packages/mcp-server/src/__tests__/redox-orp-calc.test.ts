import { describe, it, expect } from "vitest";
import {
  accuracy, response, poisonResist, maintenance,
  roCost, combination, forChlorination, electrode,
  bestUse, redoxOrpTypes,
} from "../redox-orp-calc.js";

describe("accuracy", () => {
  it("differential orp most accurate", () => {
    expect(accuracy("differential_orp_dual")).toBeGreaterThan(accuracy("silver_silver_chloride"));
  });
});

describe("response", () => {
  it("combination gel fastest response", () => {
    expect(response("combination_orp_gel")).toBeGreaterThan(response("silver_silver_chloride"));
  });
});

describe("poisonResist", () => {
  it("differential orp best poison resistance", () => {
    expect(poisonResist("differential_orp_dual")).toBeGreaterThan(poisonResist("combination_orp_gel"));
  });
});

describe("maintenance", () => {
  it("combination gel lowest maintenance", () => {
    expect(maintenance("combination_orp_gel")).toBeGreaterThan(maintenance("silver_silver_chloride"));
  });
});

describe("roCost", () => {
  it("differential orp most expensive", () => {
    expect(roCost("differential_orp_dual")).toBeGreaterThan(roCost("silver_silver_chloride"));
  });
});

describe("combination", () => {
  it("combination gel is combination electrode", () => {
    expect(combination("combination_orp_gel")).toBe(true);
  });
  it("platinum band not combination", () => {
    expect(combination("platinum_band_standard")).toBe(false);
  });
});

describe("forChlorination", () => {
  it("platinum band for chlorination", () => {
    expect(forChlorination("platinum_band_standard")).toBe(true);
  });
  it("gold ring not for chlorination", () => {
    expect(forChlorination("gold_ring_noble")).toBe(false);
  });
});

describe("electrode", () => {
  it("gold ring uses noble metal", () => {
    expect(electrode("gold_ring_noble")).toBe("gold_ring_sensing_noble_metal_inert");
  });
});

describe("bestUse", () => {
  it("platinum band for water treatment chlorination", () => {
    expect(bestUse("platinum_band_standard")).toBe("water_treatment_chlorination_control");
  });
});

describe("redoxOrpTypes", () => {
  it("returns 5 types", () => {
    expect(redoxOrpTypes()).toHaveLength(5);
  });
});
