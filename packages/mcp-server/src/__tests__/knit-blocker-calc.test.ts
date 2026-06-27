import { describe, it, expect } from "vitest";
import {
  shapeAccuracy, holdStrength, setupSpeed, sizeRange,
  blockerCost, reusable, forLace, blockMethod,
  bestUse, knitBlockers,
} from "../knit-blocker-calc.js";

describe("shapeAccuracy", () => {
  it("blocking board grid most shape accurate", () => {
    expect(shapeAccuracy("blocking_board_grid")).toBeGreaterThan(shapeAccuracy("foam_mat_interlock"));
  });
});

describe("holdStrength", () => {
  it("t pin standard strongest hold", () => {
    expect(holdStrength("t_pin_standard")).toBeGreaterThan(holdStrength("sock_blocker_form"));
  });
});

describe("setupSpeed", () => {
  it("sock blocker form fastest setup", () => {
    expect(setupSpeed("sock_blocker_form")).toBeGreaterThan(setupSpeed("t_pin_standard"));
  });
});

describe("sizeRange", () => {
  it("foam mat interlock widest size range", () => {
    expect(sizeRange("foam_mat_interlock")).toBeGreaterThan(sizeRange("sock_blocker_form"));
  });
});

describe("blockerCost", () => {
  it("blocking board grid most expensive", () => {
    expect(blockerCost("blocking_board_grid")).toBeGreaterThan(blockerCost("t_pin_standard"));
  });
});

describe("reusable", () => {
  it("t pin standard is reusable", () => {
    expect(reusable("t_pin_standard")).toBe(true);
  });
});

describe("forLace", () => {
  it("t pin standard is for lace", () => {
    expect(forLace("t_pin_standard")).toBe(true);
  });
  it("blocking comb multi not for lace", () => {
    expect(forLace("blocking_comb_multi")).toBe(false);
  });
});

describe("blockMethod", () => {
  it("sock blocker form uses shaped wood form", () => {
    expect(blockMethod("sock_blocker_form")).toBe("shaped_wood_form");
  });
});

describe("bestUse", () => {
  it("blocking comb multi best for fast straight edge", () => {
    expect(bestUse("blocking_comb_multi")).toBe("fast_straight_edge");
  });
});

describe("knitBlockers", () => {
  it("returns 5 types", () => {
    expect(knitBlockers()).toHaveLength(5);
  });
});
