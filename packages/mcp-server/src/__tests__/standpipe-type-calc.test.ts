import { describe, it, expect } from "vitest";
import {
  flow, pressure, coverage, reliability,
  stCost, wet, forHighRise, outlet,
  bestUse, standpipeTypeTypes,
} from "../standpipe-type-calc.js";

describe("flow", () => {
  it("class i highest flow", () => {
    expect(flow("class_i_hose_2_5")).toBeGreaterThan(flow("class_ii_hose_1_5"));
  });
});

describe("pressure", () => {
  it("wet standpipe highest pressure", () => {
    expect(pressure("wet_standpipe_auto")).toBeGreaterThan(pressure("dry_standpipe_fdc"));
  });
});

describe("coverage", () => {
  it("class iii best coverage", () => {
    expect(coverage("class_iii_combined")).toBeGreaterThan(coverage("dry_standpipe_fdc"));
  });
});

describe("reliability", () => {
  it("wet standpipe most reliable", () => {
    expect(reliability("wet_standpipe_auto")).toBeGreaterThan(reliability("dry_standpipe_fdc"));
  });
});

describe("stCost", () => {
  it("class iii most expensive", () => {
    expect(stCost("class_iii_combined")).toBeGreaterThan(stCost("dry_standpipe_fdc"));
  });
});

describe("wet", () => {
  it("class i is wet", () => {
    expect(wet("class_i_hose_2_5")).toBe(true);
  });
  it("dry standpipe not wet", () => {
    expect(wet("dry_standpipe_fdc")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("class iii for high rise", () => {
    expect(forHighRise("class_iii_combined")).toBe(true);
  });
  it("dry standpipe not for high rise", () => {
    expect(forHighRise("dry_standpipe_fdc")).toBe(false);
  });
});

describe("outlet", () => {
  it("class ii uses 1.5 inch", () => {
    expect(outlet("class_ii_hose_1_5")).toBe("1_5_inch_hose_cabinet_rack");
  });
});

describe("bestUse", () => {
  it("dry standpipe for parking garage", () => {
    expect(bestUse("dry_standpipe_fdc")).toBe("parking_garage_unheated_space");
  });
});

describe("standpipeTypeTypes", () => {
  it("returns 5 types", () => {
    expect(standpipeTypeTypes()).toHaveLength(5);
  });
});
