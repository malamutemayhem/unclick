import { describe, it, expect } from "vitest";
import {
  cutPrecision, lineWidth, depthControl, steelHardness,
  graverCost, forShading, forBright, crossSection,
  bestUse, graverBurins,
} from "../graver-burin-calc.js";

describe("cutPrecision", () => {
  it("onglette graver point most precise cut", () => {
    expect(cutPrecision("onglette_graver_point")).toBeGreaterThan(cutPrecision("round_graver_shade"));
  });
});

describe("lineWidth", () => {
  it("bevel graver bright widest line", () => {
    expect(lineWidth("bevel_graver_bright")).toBeGreaterThan(lineWidth("onglette_graver_point"));
  });
});

describe("depthControl", () => {
  it("bevel graver bright best depth control", () => {
    expect(depthControl("bevel_graver_bright")).toBeGreaterThan(depthControl("round_graver_shade"));
  });
});

describe("steelHardness", () => {
  it("onglette graver point hardest steel", () => {
    expect(steelHardness("onglette_graver_point")).toBeGreaterThan(steelHardness("flat_graver_line"));
  });
});

describe("graverCost", () => {
  it("bevel graver bright most expensive", () => {
    expect(graverCost("bevel_graver_bright")).toBeGreaterThan(graverCost("flat_graver_line"));
  });
});

describe("forShading", () => {
  it("round graver shade is for shading", () => {
    expect(forShading("round_graver_shade")).toBe(true);
  });
  it("flat graver line not for shading", () => {
    expect(forShading("flat_graver_line")).toBe(false);
  });
});

describe("forBright", () => {
  it("bevel graver bright is for bright", () => {
    expect(forBright("bevel_graver_bright")).toBe(true);
  });
  it("flat graver line not for bright", () => {
    expect(forBright("flat_graver_line")).toBe(false);
  });
});

describe("crossSection", () => {
  it("onglette graver point uses diamond point fine", () => {
    expect(crossSection("onglette_graver_point")).toBe("diamond_point_fine");
  });
});

describe("bestUse", () => {
  it("bevel graver bright best for bright cut facet", () => {
    expect(bestUse("bevel_graver_bright")).toBe("bright_cut_facet");
  });
});

describe("graverBurins", () => {
  it("returns 5 types", () => {
    expect(graverBurins()).toHaveLength(5);
  });
});
