import { describe, it, expect } from "vitest";
import {
  cutPrecision, lineVariation, edgeRetention, handleFeel,
  graverCost, carbideTip, forBrightCut, heelAngle,
  bestUse, lozengeGravers,
} from "../lozenge-graver-calc.js";

describe("cutPrecision", () => {
  it("elongated narrow fine most precise", () => {
    expect(cutPrecision("elongated_narrow_fine")).toBeGreaterThan(cutPrecision("stub_short_control"));
  });
});

describe("lineVariation", () => {
  it("flexible spring temper most variation", () => {
    expect(lineVariation("flexible_spring_temper")).toBeGreaterThan(lineVariation("elongated_narrow_fine"));
  });
});

describe("edgeRetention", () => {
  it("carbide tip hard best edge retention", () => {
    expect(edgeRetention("carbide_tip_hard")).toBeGreaterThan(edgeRetention("flexible_spring_temper"));
  });
});

describe("handleFeel", () => {
  it("stub short control best handle feel", () => {
    expect(handleFeel("stub_short_control")).toBeGreaterThan(handleFeel("carbide_tip_hard"));
  });
});

describe("graverCost", () => {
  it("carbide tip hard most expensive", () => {
    expect(graverCost("carbide_tip_hard")).toBeGreaterThan(graverCost("standard_diamond_cut"));
  });
});

describe("carbideTip", () => {
  it("carbide tip hard has carbide tip", () => {
    expect(carbideTip("carbide_tip_hard")).toBe(true);
  });
  it("standard diamond cut no carbide tip", () => {
    expect(carbideTip("standard_diamond_cut")).toBe(false);
  });
});

describe("forBrightCut", () => {
  it("standard diamond cut is for bright cut", () => {
    expect(forBrightCut("standard_diamond_cut")).toBe(true);
  });
  it("stub short control not for bright cut", () => {
    expect(forBrightCut("stub_short_control")).toBe(false);
  });
});

describe("heelAngle", () => {
  it("elongated narrow fine uses thirty degree acute", () => {
    expect(heelAngle("elongated_narrow_fine")).toBe("thirty_degree_acute");
  });
});

describe("bestUse", () => {
  it("carbide tip hard best for hardened steel engrave", () => {
    expect(bestUse("carbide_tip_hard")).toBe("hardened_steel_engrave");
  });
});

describe("lozengeGravers", () => {
  it("returns 5 types", () => {
    expect(lozengeGravers()).toHaveLength(5);
  });
});
