import { describe, it, expect } from "vitest";
import {
  coatingWeight, corrosionResist, speed, uniformity,
  hdCost, continuous, forStructural, alloy,
  bestUse, hotDipGalvanizeTypes,
} from "../hot-dip-galvanize-calc.js";

describe("coatingWeight", () => {
  it("batch kettle heaviest coating", () => {
    expect(coatingWeight("batch_kettle_structural")).toBeGreaterThan(coatingWeight("continuous_sheet_coil"));
  });
});

describe("corrosionResist", () => {
  it("batch kettle best corrosion resistance", () => {
    expect(corrosionResist("batch_kettle_structural")).toBeGreaterThan(corrosionResist("galvanneal_zinc_iron"));
  });
});

describe("speed", () => {
  it("continuous sheet fastest", () => {
    expect(speed("continuous_sheet_coil")).toBeGreaterThan(speed("batch_kettle_structural"));
  });
});

describe("uniformity", () => {
  it("continuous sheet most uniform", () => {
    expect(uniformity("continuous_sheet_coil")).toBeGreaterThan(uniformity("spin_centrifuge_fastener"));
  });
});

describe("hdCost", () => {
  it("galvanneal more expensive than batch", () => {
    expect(hdCost("galvanneal_zinc_iron")).toBeGreaterThan(hdCost("batch_kettle_structural"));
  });
});

describe("continuous", () => {
  it("continuous sheet is continuous", () => {
    expect(continuous("continuous_sheet_coil")).toBe(true);
  });
  it("batch kettle not continuous", () => {
    expect(continuous("batch_kettle_structural")).toBe(false);
  });
});

describe("forStructural", () => {
  it("batch kettle for structural", () => {
    expect(forStructural("batch_kettle_structural")).toBe(true);
  });
  it("galvanneal not for structural", () => {
    expect(forStructural("galvanneal_zinc_iron")).toBe(false);
  });
});

describe("alloy", () => {
  it("galvanneal uses zinc iron alloy", () => {
    expect(alloy("galvanneal_zinc_iron")).toBe("zinc_iron_alloy_10pct_fe");
  });
});

describe("bestUse", () => {
  it("spin for threaded parts", () => {
    expect(bestUse("spin_centrifuge_fastener")).toBe("bolt_nut_washer_threaded_part");
  });
});

describe("hotDipGalvanizeTypes", () => {
  it("returns 5 types", () => {
    expect(hotDipGalvanizeTypes()).toHaveLength(5);
  });
});
