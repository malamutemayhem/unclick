import { describe, it, expect } from "vitest";
import {
  mortiseChop, wasteRemove, controlSwing, edgeKeep,
  twybillCost, doubleBit, forDeep, headPattern,
  bestUse, twybills,
} from "../twybill-calc.js";

describe("mortiseChop", () => {
  it("heavy pattern large strongest mortise chop", () => {
    expect(mortiseChop("heavy_pattern_large")).toBeGreaterThan(mortiseChop("curved_edge_scoop"));
  });
});

describe("wasteRemove", () => {
  it("wide mortise broad best waste remove", () => {
    expect(wasteRemove("wide_mortise_broad")).toBeGreaterThan(wasteRemove("narrow_mortise_deep"));
  });
});

describe("controlSwing", () => {
  it("standard double axe best control swing", () => {
    expect(controlSwing("standard_double_axe")).toBeGreaterThan(controlSwing("heavy_pattern_large"));
  });
});

describe("edgeKeep", () => {
  it("heavy pattern large best edge keep", () => {
    expect(edgeKeep("heavy_pattern_large")).toBeGreaterThan(edgeKeep("curved_edge_scoop"));
  });
});

describe("twybillCost", () => {
  it("heavy pattern large most expensive", () => {
    expect(twybillCost("heavy_pattern_large")).toBeGreaterThan(twybillCost("standard_double_axe"));
  });
});

describe("doubleBit", () => {
  it("standard double axe has double bit", () => {
    expect(doubleBit("standard_double_axe")).toBe(true);
  });
});

describe("forDeep", () => {
  it("narrow mortise deep is for deep", () => {
    expect(forDeep("narrow_mortise_deep")).toBe(true);
  });
  it("standard double axe not for deep", () => {
    expect(forDeep("standard_double_axe")).toBe(false);
  });
});

describe("headPattern", () => {
  it("curved edge scoop uses curved scoop edge", () => {
    expect(headPattern("curved_edge_scoop")).toBe("curved_scoop_edge");
  });
});

describe("bestUse", () => {
  it("heavy pattern large best for heavy beam mortise", () => {
    expect(bestUse("heavy_pattern_large")).toBe("heavy_beam_mortise");
  });
});

describe("twybills", () => {
  it("returns 5 types", () => {
    expect(twybills()).toHaveLength(5);
  });
});
