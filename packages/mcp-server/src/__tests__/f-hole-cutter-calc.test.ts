import { describe, it, expect } from "vitest";
import {
  cutClean, curveFollow, speedCut, controlFine,
  cutterCost, heated, powered, bladeProfile,
  bestUse, fHoleCutters,
} from "../f-hole-cutter-calc.js";

describe("cutClean", () => {
  it("heated knife clean cleanest cut", () => {
    expect(cutClean("heated_knife_clean")).toBeGreaterThan(cutClean("scroll_saw_fine"));
  });
});

describe("curveFollow", () => {
  it("miniature gouge curve best curve follow", () => {
    expect(curveFollow("miniature_gouge_curve")).toBeGreaterThan(curveFollow("scroll_saw_fine"));
  });
});

describe("speedCut", () => {
  it("scroll saw fine fastest cut", () => {
    expect(speedCut("scroll_saw_fine")).toBeGreaterThan(speedCut("purfling_pick_detail"));
  });
});

describe("controlFine", () => {
  it("purfling pick detail finest control", () => {
    expect(controlFine("purfling_pick_detail")).toBeGreaterThan(controlFine("scroll_saw_fine"));
  });
});

describe("cutterCost", () => {
  it("scroll saw fine most expensive", () => {
    expect(cutterCost("scroll_saw_fine")).toBeGreaterThan(cutterCost("knife_edge_standard"));
  });
});

describe("heated", () => {
  it("heated knife clean is heated", () => {
    expect(heated("heated_knife_clean")).toBe(true);
  });
  it("knife edge standard not heated", () => {
    expect(heated("knife_edge_standard")).toBe(false);
  });
});

describe("powered", () => {
  it("scroll saw fine is powered", () => {
    expect(powered("scroll_saw_fine")).toBe(true);
  });
  it("knife edge standard not powered", () => {
    expect(powered("knife_edge_standard")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("miniature gouge curve uses small sweep gouge", () => {
    expect(bladeProfile("miniature_gouge_curve")).toBe("small_sweep_gouge");
  });
});

describe("bestUse", () => {
  it("knife edge standard best for general f hole cut", () => {
    expect(bestUse("knife_edge_standard")).toBe("general_f_hole_cut");
  });
});

describe("fHoleCutters", () => {
  it("returns 5 types", () => {
    expect(fHoleCutters()).toHaveLength(5);
  });
});
