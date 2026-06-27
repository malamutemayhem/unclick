import { describe, it, expect } from "vitest";
import {
  shapeControl, heatResist, reachDepth, detailFine,
  jacksCost, forCutting, forDetail, bladeStyle,
  bestUse, jacksGlasses,
} from "../jacks-glass-calc.js";

describe("shapeControl", () => {
  it("curved blade bowl best shape control", () => {
    expect(shapeControl("curved_blade_bowl")).toBeGreaterThan(shapeControl("tweezers_fine_detail"));
  });
});

describe("heatResist", () => {
  it("paddle flat press best heat resist", () => {
    expect(heatResist("paddle_flat_press")).toBeGreaterThan(heatResist("tweezers_fine_detail"));
  });
});

describe("reachDepth", () => {
  it("straight blade standard deepest reach", () => {
    expect(reachDepth("straight_blade_standard")).toBeGreaterThan(reachDepth("paddle_flat_press"));
  });
});

describe("detailFine", () => {
  it("tweezers fine detail finest detail", () => {
    expect(detailFine("tweezers_fine_detail")).toBeGreaterThan(detailFine("paddle_flat_press"));
  });
});

describe("jacksCost", () => {
  it("diamond shear cut most expensive", () => {
    expect(jacksCost("diamond_shear_cut")).toBeGreaterThan(jacksCost("paddle_flat_press"));
  });
});

describe("forCutting", () => {
  it("diamond shear cut is for cutting", () => {
    expect(forCutting("diamond_shear_cut")).toBe(true);
  });
  it("straight blade standard not for cutting", () => {
    expect(forCutting("straight_blade_standard")).toBe(false);
  });
});

describe("forDetail", () => {
  it("tweezers fine detail is for detail", () => {
    expect(forDetail("tweezers_fine_detail")).toBe(true);
  });
  it("paddle flat press not for detail", () => {
    expect(forDetail("paddle_flat_press")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("curved blade bowl uses curved bowl blade", () => {
    expect(bladeStyle("curved_blade_bowl")).toBe("curved_bowl_blade");
  });
});

describe("bestUse", () => {
  it("tweezers fine detail best for detail pull shape", () => {
    expect(bestUse("tweezers_fine_detail")).toBe("detail_pull_shape");
  });
});

describe("jacksGlasses", () => {
  it("returns 5 types", () => {
    expect(jacksGlasses()).toHaveLength(5);
  });
});
