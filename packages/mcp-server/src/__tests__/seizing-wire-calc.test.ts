import { describe, it, expect } from "vitest";
import {
  holdStrength, corrosionResist, bendEase, durability,
  wireCost, marine, coated, wireGauge,
  bestUse, seizingWires,
} from "../seizing-wire-calc.js";

describe("holdStrength", () => {
  it("stainless marine grade strongest hold", () => {
    expect(holdStrength("stainless_marine_grade")).toBeGreaterThan(holdStrength("copper_annealed_soft"));
  });
});

describe("corrosionResist", () => {
  it("monel alloy salt best corrosion resist", () => {
    expect(corrosionResist("monel_alloy_salt")).toBeGreaterThan(corrosionResist("soft_iron_standard"));
  });
});

describe("bendEase", () => {
  it("copper annealed soft easiest to bend", () => {
    expect(bendEase("copper_annealed_soft")).toBeGreaterThan(bendEase("stainless_marine_grade"));
  });
});

describe("durability", () => {
  it("monel alloy salt most durable", () => {
    expect(durability("monel_alloy_salt")).toBeGreaterThan(durability("copper_annealed_soft"));
  });
});

describe("wireCost", () => {
  it("monel alloy salt most expensive", () => {
    expect(wireCost("monel_alloy_salt")).toBeGreaterThan(wireCost("soft_iron_standard"));
  });
});

describe("marine", () => {
  it("stainless marine grade is marine", () => {
    expect(marine("stainless_marine_grade")).toBe(true);
  });
  it("soft iron standard not marine", () => {
    expect(marine("soft_iron_standard")).toBe(false);
  });
});

describe("coated", () => {
  it("nylon coated protect is coated", () => {
    expect(coated("nylon_coated_protect")).toBe(true);
  });
  it("stainless marine grade not coated", () => {
    expect(coated("stainless_marine_grade")).toBe(false);
  });
});

describe("wireGauge", () => {
  it("monel alloy salt uses heavy 14 gauge", () => {
    expect(wireGauge("monel_alloy_salt")).toBe("heavy_14_gauge");
  });
});

describe("bestUse", () => {
  it("stainless marine grade best for marine standing rig", () => {
    expect(bestUse("stainless_marine_grade")).toBe("marine_standing_rig");
  });
});

describe("seizingWires", () => {
  it("returns 5 types", () => {
    expect(seizingWires()).toHaveLength(5);
  });
});
