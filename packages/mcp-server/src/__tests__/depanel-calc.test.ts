import { describe, it, expect } from "vitest";
import {
  edgeQuality, boardStress, speed, flexibility,
  systemCost, dustFree, forFlex, cutMethod,
  bestUse, depanels,
} from "../depanel-calc.js";

describe("edgeQuality", () => {
  it("laser depanel best edge quality", () => {
    expect(edgeQuality("laser_depanel")).toBeGreaterThan(edgeQuality("v_score_break"));
  });
});

describe("boardStress", () => {
  it("laser depanel lowest board stress", () => {
    expect(boardStress("laser_depanel")).toBeGreaterThan(boardStress("pizza_cutter_wheel"));
  });
});

describe("speed", () => {
  it("pizza cutter wheel fastest", () => {
    expect(speed("pizza_cutter_wheel")).toBeGreaterThan(speed("router_cnc_cut"));
  });
});

describe("flexibility", () => {
  it("laser depanel most flexible", () => {
    expect(flexibility("laser_depanel")).toBeGreaterThan(flexibility("v_score_break"));
  });
});

describe("systemCost", () => {
  it("laser depanel most expensive", () => {
    expect(systemCost("laser_depanel")).toBeGreaterThan(systemCost("pizza_cutter_wheel"));
  });
});

describe("dustFree", () => {
  it("v score break is dust free", () => {
    expect(dustFree("v_score_break")).toBe(true);
  });
  it("router cnc cut not dust free", () => {
    expect(dustFree("router_cnc_cut")).toBe(false);
  });
});

describe("forFlex", () => {
  it("laser depanel is for flex", () => {
    expect(forFlex("laser_depanel")).toBe(true);
  });
  it("v score break not for flex", () => {
    expect(forFlex("v_score_break")).toBe(false);
  });
});

describe("cutMethod", () => {
  it("router cnc cut uses cnc end mill route", () => {
    expect(cutMethod("router_cnc_cut")).toBe("cnc_end_mill_route");
  });
});

describe("bestUse", () => {
  it("laser depanel best for flex pcb stress free", () => {
    expect(bestUse("laser_depanel")).toBe("flex_pcb_stress_free");
  });
});

describe("depanels", () => {
  it("returns 5 types", () => {
    expect(depanels()).toHaveLength(5);
  });
});
