import { describe, it, expect } from "vitest";
import {
  holeClean, stitchAngle, speedCoverage, curveAbility,
  ironCost, forCurves, multiProng, toothProfile,
  bestUse, stitchingIrons,
} from "../stitching-iron-calc.js";

describe("holeClean", () => {
  it("flat chisel french cleanest hole", () => {
    expect(holeClean("flat_chisel_french")).toBeGreaterThan(holeClean("prong_8_long"));
  });
});

describe("stitchAngle", () => {
  it("flat chisel french best stitch angle", () => {
    expect(stitchAngle("flat_chisel_french")).toBeGreaterThan(stitchAngle("round_point_japan"));
  });
});

describe("speedCoverage", () => {
  it("prong 8 long fastest coverage", () => {
    expect(speedCoverage("prong_8_long")).toBeGreaterThan(speedCoverage("prong_2_start"));
  });
});

describe("curveAbility", () => {
  it("prong 2 start best curve ability", () => {
    expect(curveAbility("prong_2_start")).toBeGreaterThan(curveAbility("prong_8_long"));
  });
});

describe("ironCost", () => {
  it("flat chisel french most expensive", () => {
    expect(ironCost("flat_chisel_french")).toBeGreaterThan(ironCost("prong_2_start"));
  });
});

describe("forCurves", () => {
  it("prong 2 start is for curves", () => {
    expect(forCurves("prong_2_start")).toBe(true);
  });
  it("diamond point euro not for curves", () => {
    expect(forCurves("diamond_point_euro")).toBe(false);
  });
});

describe("multiProng", () => {
  it("diamond point euro is multi prong", () => {
    expect(multiProng("diamond_point_euro")).toBe(true);
  });
  it("prong 2 start not multi prong", () => {
    expect(multiProng("prong_2_start")).toBe(false);
  });
});

describe("toothProfile", () => {
  it("flat chisel french uses flat angled chisel", () => {
    expect(toothProfile("flat_chisel_french")).toBe("flat_angled_chisel");
  });
});

describe("bestUse", () => {
  it("prong 2 start best for corner turn start", () => {
    expect(bestUse("prong_2_start")).toBe("corner_turn_start");
  });
});

describe("stitchingIrons", () => {
  it("returns 5 types", () => {
    expect(stitchingIrons()).toHaveLength(5);
  });
});
