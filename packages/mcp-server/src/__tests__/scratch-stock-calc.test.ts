import { describe, it, expect } from "vitest";
import {
  grooveClean, profileAccuracy, setupSpeed, bladeRange,
  stockCost, adjustable, forBead, bodyStyle,
  bestUse, scratchStocks,
} from "../scratch-stock-calc.js";

describe("grooveClean", () => {
  it("metal body adjust cleanest groove", () => {
    expect(grooveClean("metal_body_adjust")).toBeGreaterThan(grooveClean("shop_made_simple"));
  });
});

describe("profileAccuracy", () => {
  it("combination plane set best profile accuracy", () => {
    expect(profileAccuracy("combination_plane_set")).toBeGreaterThan(profileAccuracy("shop_made_simple"));
  });
});

describe("setupSpeed", () => {
  it("shop made simple fastest setup", () => {
    expect(setupSpeed("shop_made_simple")).toBeGreaterThan(setupSpeed("combination_plane_set"));
  });
});

describe("bladeRange", () => {
  it("combination plane set best blade range", () => {
    expect(bladeRange("combination_plane_set")).toBeGreaterThan(bladeRange("shop_made_simple"));
  });
});

describe("stockCost", () => {
  it("combination plane set most expensive", () => {
    expect(stockCost("combination_plane_set")).toBeGreaterThan(stockCost("shop_made_simple"));
  });
});

describe("adjustable", () => {
  it("metal body adjust is adjustable", () => {
    expect(adjustable("metal_body_adjust")).toBe(true);
  });
  it("wooden fence holder not adjustable", () => {
    expect(adjustable("wooden_fence_holder")).toBe(false);
  });
});

describe("forBead", () => {
  it("beading tool profile is for bead", () => {
    expect(forBead("beading_tool_profile")).toBe(true);
  });
  it("wooden fence holder not for bead", () => {
    expect(forBead("wooden_fence_holder")).toBe(false);
  });
});

describe("bodyStyle", () => {
  it("shop made simple uses wood block slot", () => {
    expect(bodyStyle("shop_made_simple")).toBe("wood_block_slot");
  });
});

describe("bestUse", () => {
  it("metal body adjust best for precision inlay groove", () => {
    expect(bestUse("metal_body_adjust")).toBe("precision_inlay_groove");
  });
});

describe("scratchStocks", () => {
  it("returns 5 types", () => {
    expect(scratchStocks()).toHaveLength(5);
  });
});
