import { describe, it, expect } from "vitest";
import {
  cuttingDepth, precisionControl, versatility, easeOfUse,
  routerCost, plungeCapable, tableMount, colletSize,
  bestProject, routerTools,
} from "../router-tool-calc.js";

describe("cuttingDepth", () => {
  it("plunge base deepest cutting", () => {
    expect(cuttingDepth("plunge_base")).toBeGreaterThan(cuttingDepth("trim_compact"));
  });
});

describe("precisionControl", () => {
  it("cnc desktop most precise", () => {
    expect(precisionControl("cnc_desktop")).toBeGreaterThan(precisionControl("trim_compact"));
  });
});

describe("versatility", () => {
  it("combo kit most versatile", () => {
    expect(versatility("combo_kit")).toBeGreaterThan(versatility("trim_compact"));
  });
});

describe("easeOfUse", () => {
  it("trim compact easiest to use", () => {
    expect(easeOfUse("trim_compact")).toBeGreaterThan(easeOfUse("cnc_desktop"));
  });
});

describe("routerCost", () => {
  it("cnc desktop most expensive", () => {
    expect(routerCost("cnc_desktop")).toBeGreaterThan(routerCost("trim_compact"));
  });
});

describe("plungeCapable", () => {
  it("plunge base is plunge capable", () => {
    expect(plungeCapable("plunge_base")).toBe(true);
  });
  it("fixed base is not", () => {
    expect(plungeCapable("fixed_base")).toBe(false);
  });
});

describe("tableMount", () => {
  it("fixed base can table mount", () => {
    expect(tableMount("fixed_base")).toBe(true);
  });
  it("trim compact cannot", () => {
    expect(tableMount("trim_compact")).toBe(false);
  });
});

describe("colletSize", () => {
  it("trim compact uses quarter inch only", () => {
    expect(colletSize("trim_compact")).toBe("quarter_inch_only");
  });
});

describe("bestProject", () => {
  it("cnc desktop for sign carving engraving", () => {
    expect(bestProject("cnc_desktop")).toBe("sign_carving_engraving");
  });
});

describe("routerTools", () => {
  it("returns 5 types", () => {
    expect(routerTools()).toHaveLength(5);
  });
});
