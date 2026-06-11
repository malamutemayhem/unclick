import { describe, it, expect } from "vitest";
import {
  coatingThickness, throughput, hardness, corrosionResist,
  alCost, dyeable, forAerospace, lineConfig,
  bestUse, anodizingLineTypes,
} from "../anodizing-line-calc.js";

describe("coatingThickness", () => {
  it("hard coat best coating thickness", () => {
    expect(coatingThickness("hard_coat_anodize")).toBeGreaterThan(coatingThickness("phosphoric_anodize"));
  });
});

describe("throughput", () => {
  it("sulfuric anodize highest throughput", () => {
    expect(throughput("sulfuric_anodize")).toBeGreaterThan(throughput("hard_coat_anodize"));
  });
});

describe("hardness", () => {
  it("hard coat best hardness", () => {
    expect(hardness("hard_coat_anodize")).toBeGreaterThan(hardness("sulfuric_anodize"));
  });
});

describe("corrosionResist", () => {
  it("hard coat best corrosion resist", () => {
    expect(corrosionResist("hard_coat_anodize")).toBeGreaterThan(corrosionResist("phosphoric_anodize"));
  });
});

describe("alCost", () => {
  it("chromic anodize most expensive", () => {
    expect(alCost("chromic_anodize")).toBeGreaterThan(alCost("sulfuric_anodize"));
  });
});

describe("dyeable", () => {
  it("sulfuric anodize is dyeable", () => {
    expect(dyeable("sulfuric_anodize")).toBe(true);
  });
  it("hard coat not dyeable", () => {
    expect(dyeable("hard_coat_anodize")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("hard coat for aerospace", () => {
    expect(forAerospace("hard_coat_anodize")).toBe(true);
  });
  it("sulfuric anodize not for aerospace", () => {
    expect(forAerospace("sulfuric_anodize")).toBe(false);
  });
});

describe("lineConfig", () => {
  it("boric sulfuric uses chromium free replace type i compliant", () => {
    expect(lineConfig("boric_sulfuric")).toBe("boric_sulfuric_anodize_line_chromium_free_replace_type_i_compliant");
  });
});

describe("bestUse", () => {
  it("hard coat for hydraulic cylinder wear resist dense thick", () => {
    expect(bestUse("hard_coat_anodize")).toBe("hydraulic_cylinder_hard_coat_anodize_line_wear_resist_dense_thick");
  });
});

describe("anodizingLineTypes", () => {
  it("returns 5 types", () => {
    expect(anodizingLineTypes()).toHaveLength(5);
  });
});
