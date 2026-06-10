import { describe, it, expect } from "vitest";
import {
  lineFineness, waxFlow, heatControl, easeOfUse,
  toolCost, electric, forFilling, spoutMaterial,
  bestUse, tjantingTools,
} from "../tjanting-tool-calc.js";

describe("lineFineness", () => {
  it("canting needle point finest line", () => {
    expect(lineFineness("canting_needle_point")).toBeGreaterThan(lineFineness("brush_wax_apply"));
  });
});

describe("waxFlow", () => {
  it("brush wax apply most wax flow", () => {
    expect(waxFlow("brush_wax_apply")).toBeGreaterThan(waxFlow("canting_needle_point"));
  });
});

describe("heatControl", () => {
  it("electric heat pen best heat control", () => {
    expect(heatControl("electric_heat_pen")).toBeGreaterThan(heatControl("single_spout_fine"));
  });
});

describe("easeOfUse", () => {
  it("electric heat pen easiest to use", () => {
    expect(easeOfUse("electric_heat_pen")).toBeGreaterThan(easeOfUse("canting_needle_point"));
  });
});

describe("toolCost", () => {
  it("electric heat pen most expensive", () => {
    expect(toolCost("electric_heat_pen")).toBeGreaterThan(toolCost("single_spout_fine"));
  });
});

describe("electric", () => {
  it("electric heat pen is electric", () => {
    expect(electric("electric_heat_pen")).toBe(true);
  });
  it("single spout fine not electric", () => {
    expect(electric("single_spout_fine")).toBe(false);
  });
});

describe("forFilling", () => {
  it("brush wax apply is for filling", () => {
    expect(forFilling("brush_wax_apply")).toBe(true);
  });
  it("single spout fine not for filling", () => {
    expect(forFilling("single_spout_fine")).toBe(false);
  });
});

describe("spoutMaterial", () => {
  it("single spout fine uses copper cup spout", () => {
    expect(spoutMaterial("single_spout_fine")).toBe("copper_cup_spout");
  });
});

describe("bestUse", () => {
  it("canting needle point best for ultra fine detail", () => {
    expect(bestUse("canting_needle_point")).toBe("ultra_fine_detail");
  });
});

describe("tjantingTools", () => {
  it("returns 5 types", () => {
    expect(tjantingTools()).toHaveLength(5);
  });
});
