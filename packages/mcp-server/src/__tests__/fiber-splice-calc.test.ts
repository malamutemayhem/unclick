import { describe, it, expect } from "vitest";
import {
  insertionLoss, returnLoss, spliceSpeed, reliability,
  spliceCost, permanent, forRibbon, alignMethod,
  bestUse, fiberSplices,
} from "../fiber-splice-calc.js";

describe("insertionLoss", () => {
  it("fusion arc welder lowest insertion loss", () => {
    expect(insertionLoss("fusion_arc_welder")).toBeGreaterThan(insertionLoss("mechanical_crimp_align"));
  });
});

describe("returnLoss", () => {
  it("fusion arc welder best return loss", () => {
    expect(returnLoss("fusion_arc_welder")).toBeGreaterThan(returnLoss("mechanical_crimp_align"));
  });
});

describe("spliceSpeed", () => {
  it("ribbon mass fusion fastest splice", () => {
    expect(spliceSpeed("ribbon_mass_fusion")).toBeGreaterThan(spliceSpeed("fusion_arc_welder"));
  });
});

describe("reliability", () => {
  it("fusion arc welder most reliable", () => {
    expect(reliability("fusion_arc_welder")).toBeGreaterThan(reliability("pre_polished_splice"));
  });
});

describe("spliceCost", () => {
  it("fusion arc welder most expensive", () => {
    expect(spliceCost("fusion_arc_welder")).toBeGreaterThan(spliceCost("mechanical_crimp_align"));
  });
});

describe("permanent", () => {
  it("fusion arc welder is permanent", () => {
    expect(permanent("fusion_arc_welder")).toBe(true);
  });
  it("mechanical crimp not permanent", () => {
    expect(permanent("mechanical_crimp_align")).toBe(false);
  });
});

describe("forRibbon", () => {
  it("ribbon mass fusion is for ribbon", () => {
    expect(forRibbon("ribbon_mass_fusion")).toBe(true);
  });
  it("fusion arc welder not for ribbon", () => {
    expect(forRibbon("fusion_arc_welder")).toBe(false);
  });
});

describe("alignMethod", () => {
  it("mechanical crimp uses v groove index match", () => {
    expect(alignMethod("mechanical_crimp_align")).toBe("v_groove_index_match");
  });
});

describe("bestUse", () => {
  it("pre polished splice best for fttx drop terminate", () => {
    expect(bestUse("pre_polished_splice")).toBe("fttx_drop_terminate");
  });
});

describe("fiberSplices", () => {
  it("returns 5 types", () => {
    expect(fiberSplices()).toHaveLength(5);
  });
});
