import { describe, it, expect } from "vitest";
import {
  toothCount, cutSpeed, cutSmoothness,
  versatility, kerfWidth, canCutCurves,
  tablesSawCompatible, primaryCut, toothGeometry, sawBlades,
} from "../saw-blade-calc.js";

describe("toothCount", () => {
  it("crosscut most teeth", () => {
    expect(toothCount("crosscut")).toBeGreaterThan(
      toothCount("rip")
    );
  });
});

describe("cutSpeed", () => {
  it("rip blade fastest cut", () => {
    expect(cutSpeed("rip")).toBeGreaterThan(
      cutSpeed("scroll")
    );
  });
});

describe("cutSmoothness", () => {
  it("crosscut smoothest cut", () => {
    expect(cutSmoothness("crosscut")).toBeGreaterThan(
      cutSmoothness("rip")
    );
  });
});

describe("versatility", () => {
  it("combination most versatile", () => {
    expect(versatility("combination")).toBeGreaterThan(
      versatility("dado")
    );
  });
});

describe("kerfWidth", () => {
  it("dado widest kerf", () => {
    expect(kerfWidth("dado")).toBeGreaterThan(
      kerfWidth("scroll")
    );
  });
});

describe("canCutCurves", () => {
  it("scroll can cut curves", () => {
    expect(canCutCurves("scroll")).toBe(true);
  });
  it("rip cannot", () => {
    expect(canCutCurves("rip")).toBe(false);
  });
});

describe("tablesSawCompatible", () => {
  it("rip is table saw compatible", () => {
    expect(tablesSawCompatible("rip")).toBe(true);
  });
  it("scroll is not", () => {
    expect(tablesSawCompatible("scroll")).toBe(false);
  });
});

describe("primaryCut", () => {
  it("rip cuts along grain", () => {
    expect(primaryCut("rip")).toBe("along_grain");
  });
});

describe("toothGeometry", () => {
  it("crosscut is alternate top bevel", () => {
    expect(toothGeometry("crosscut")).toBe("alternate_top_bevel");
  });
});

describe("sawBlades", () => {
  it("returns 5 blades", () => {
    expect(sawBlades()).toHaveLength(5);
  });
});
