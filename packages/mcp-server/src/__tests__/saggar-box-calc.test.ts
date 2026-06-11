import { describe, it, expect } from "vitest";
import {
  sealTight, heatEven, fumeContain, reuseLife,
  saggarCost, reusable, forRaku, wallType,
  bestUse, saggarBoxes,
} from "../saggar-box-calc.js";

describe("sealTight", () => {
  it("brick chamber custom tightest seal", () => {
    expect(sealTight("brick_chamber_custom")).toBeGreaterThan(sealTight("fiber_blanket_wrap"));
  });
});

describe("heatEven", () => {
  it("brick chamber custom most even heat", () => {
    expect(heatEven("brick_chamber_custom")).toBeGreaterThan(heatEven("foil_saggar_disposable"));
  });
});

describe("fumeContain", () => {
  it("brick chamber custom best fume contain", () => {
    expect(fumeContain("brick_chamber_custom")).toBeGreaterThan(fumeContain("foil_saggar_disposable"));
  });
});

describe("reuseLife", () => {
  it("brick chamber custom longest reuse life", () => {
    expect(reuseLife("brick_chamber_custom")).toBeGreaterThan(reuseLife("foil_saggar_disposable"));
  });
});

describe("saggarCost", () => {
  it("brick chamber custom most expensive", () => {
    expect(saggarCost("brick_chamber_custom")).toBeGreaterThan(saggarCost("foil_saggar_disposable"));
  });
});

describe("reusable", () => {
  it("clay round traditional is reusable", () => {
    expect(reusable("clay_round_traditional")).toBe(true);
  });
  it("fiber blanket wrap not reusable", () => {
    expect(reusable("fiber_blanket_wrap")).toBe(false);
  });
});

describe("forRaku", () => {
  it("fiber blanket wrap is for raku", () => {
    expect(forRaku("fiber_blanket_wrap")).toBe(true);
  });
  it("clay round traditional not for raku", () => {
    expect(forRaku("clay_round_traditional")).toBe(false);
  });
});

describe("wallType", () => {
  it("steel canister reuse uses steel can wall", () => {
    expect(wallType("steel_canister_reuse")).toBe("steel_can_wall");
  });
});

describe("bestUse", () => {
  it("brick chamber custom best for permanent saggar kiln", () => {
    expect(bestUse("brick_chamber_custom")).toBe("permanent_saggar_kiln");
  });
});

describe("saggarBoxes", () => {
  it("returns 5 types", () => {
    expect(saggarBoxes()).toHaveLength(5);
  });
});
