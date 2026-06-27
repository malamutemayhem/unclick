import { describe, it, expect } from "vitest";
import {
  cutClean, curveFollow, straightCut, depthControl,
  sawCost, doubleEdge, flushCut, bladeType,
  bestUse, veneerSaws,
} from "../veneer-saw-calc.js";

describe("cutClean", () => {
  it("veneer knife pull cleanest cut", () => {
    expect(cutClean("veneer_knife_pull")).toBeGreaterThan(cutClean("craft_razor_blade"));
  });
});

describe("curveFollow", () => {
  it("craft razor blade best curve follow", () => {
    expect(curveFollow("craft_razor_blade")).toBeGreaterThan(curveFollow("flush_cut_bent"));
  });
});

describe("straightCut", () => {
  it("single edge offset best straight cut", () => {
    expect(straightCut("single_edge_offset")).toBeGreaterThan(straightCut("craft_razor_blade"));
  });
});

describe("depthControl", () => {
  it("flush cut bent best depth control", () => {
    expect(depthControl("flush_cut_bent")).toBeGreaterThan(depthControl("craft_razor_blade"));
  });
});

describe("sawCost", () => {
  it("double edge thin more expensive than razor", () => {
    expect(sawCost("double_edge_thin")).toBeGreaterThan(sawCost("craft_razor_blade"));
  });
});

describe("doubleEdge", () => {
  it("double edge thin is double edge", () => {
    expect(doubleEdge("double_edge_thin")).toBe(true);
  });
  it("single edge offset not double edge", () => {
    expect(doubleEdge("single_edge_offset")).toBe(false);
  });
});

describe("flushCut", () => {
  it("flush cut bent is flush cut", () => {
    expect(flushCut("flush_cut_bent")).toBe(true);
  });
  it("double edge thin not flush cut", () => {
    expect(flushCut("double_edge_thin")).toBe(false);
  });
});

describe("bladeType", () => {
  it("double edge thin uses thin double tooth", () => {
    expect(bladeType("double_edge_thin")).toBe("thin_double_tooth");
  });
});

describe("bestUse", () => {
  it("veneer knife pull best for curved inlay cut", () => {
    expect(bestUse("veneer_knife_pull")).toBe("curved_inlay_cut");
  });
});

describe("veneerSaws", () => {
  it("returns 5 types", () => {
    expect(veneerSaws()).toHaveLength(5);
  });
});
