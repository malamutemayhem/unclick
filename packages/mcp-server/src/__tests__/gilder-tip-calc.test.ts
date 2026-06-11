import { describe, it, expect } from "vitest";
import {
  pickupClean, controlPlace, staticHold, widthRange,
  tipCost, natural, forDetail, hairSource,
  bestUse, gilderTips,
} from "../gilder-tip-calc.js";

describe("pickupClean", () => {
  it("badger hair fine cleanest pickup", () => {
    expect(pickupClean("badger_hair_fine")).toBeGreaterThan(pickupClean("synthetic_hair_budget"));
  });
});

describe("controlPlace", () => {
  it("narrow tip detail best control placement", () => {
    expect(controlPlace("narrow_tip_detail")).toBeGreaterThan(controlPlace("synthetic_hair_budget"));
  });
});

describe("staticHold", () => {
  it("badger hair fine best static hold", () => {
    expect(staticHold("badger_hair_fine")).toBeGreaterThan(staticHold("synthetic_hair_budget"));
  });
});

describe("widthRange", () => {
  it("wide tip large widest range", () => {
    expect(widthRange("wide_tip_large")).toBeGreaterThan(widthRange("narrow_tip_detail"));
  });
});

describe("tipCost", () => {
  it("badger hair fine most expensive", () => {
    expect(tipCost("badger_hair_fine")).toBeGreaterThan(tipCost("synthetic_hair_budget"));
  });
});

describe("natural", () => {
  it("squirrel hair standard is natural", () => {
    expect(natural("squirrel_hair_standard")).toBe(true);
  });
  it("synthetic hair budget not natural", () => {
    expect(natural("synthetic_hair_budget")).toBe(false);
  });
});

describe("forDetail", () => {
  it("badger hair fine is for detail", () => {
    expect(forDetail("badger_hair_fine")).toBe(true);
  });
  it("squirrel hair standard not for detail", () => {
    expect(forDetail("squirrel_hair_standard")).toBe(false);
  });
});

describe("hairSource", () => {
  it("wide tip large uses squirrel wide cut", () => {
    expect(hairSource("wide_tip_large")).toBe("squirrel_wide_cut");
  });
});

describe("bestUse", () => {
  it("squirrel hair standard best for general leaf pickup", () => {
    expect(bestUse("squirrel_hair_standard")).toBe("general_leaf_pickup");
  });
});

describe("gilderTips", () => {
  it("returns 5 types", () => {
    expect(gilderTips()).toHaveLength(5);
  });
});
