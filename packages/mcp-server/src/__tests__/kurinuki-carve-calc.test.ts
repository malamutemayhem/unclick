import { describe, it, expect } from "vitest";
import {
  carveClean, hollowDepth, detailFine, controlSteady,
  carveCost, forHollow, forDetail, edgeProfile,
  bestUse, kurinukiCarves,
} from "../kurinuki-carve-calc.js";

describe("carveClean", () => {
  it("ribbon tool smooth cleanest carve", () => {
    expect(carveClean("ribbon_tool_smooth")).toBeGreaterThan(carveClean("knife_edge_detail"));
  });
});

describe("hollowDepth", () => {
  it("spoon gouge hollow deepest hollow", () => {
    expect(hollowDepth("spoon_gouge_hollow")).toBeGreaterThan(hollowDepth("knife_edge_detail"));
  });
});

describe("detailFine", () => {
  it("knife edge detail finest detail", () => {
    expect(detailFine("knife_edge_detail")).toBeGreaterThan(detailFine("spoon_gouge_hollow"));
  });
});

describe("controlSteady", () => {
  it("knife edge detail steadiest control", () => {
    expect(controlSteady("knife_edge_detail")).toBeGreaterThan(controlSteady("spoon_gouge_hollow"));
  });
});

describe("carveCost", () => {
  it("spoon gouge hollow most expensive", () => {
    expect(carveCost("spoon_gouge_hollow")).toBeGreaterThan(carveCost("wire_tool_fine"));
  });
});

describe("forHollow", () => {
  it("loop tool standard is for hollow", () => {
    expect(forHollow("loop_tool_standard")).toBe(true);
  });
  it("wire tool fine not for hollow", () => {
    expect(forHollow("wire_tool_fine")).toBe(false);
  });
});

describe("forDetail", () => {
  it("knife edge detail is for detail", () => {
    expect(forDetail("knife_edge_detail")).toBe(true);
  });
  it("loop tool standard not for detail", () => {
    expect(forDetail("loop_tool_standard")).toBe(false);
  });
});

describe("edgeProfile", () => {
  it("ribbon tool smooth uses flat ribbon blade", () => {
    expect(edgeProfile("ribbon_tool_smooth")).toBe("flat_ribbon_blade");
  });
});

describe("bestUse", () => {
  it("loop tool standard best for general hollow carve", () => {
    expect(bestUse("loop_tool_standard")).toBe("general_hollow_carve");
  });
});

describe("kurinukiCarves", () => {
  it("returns 5 types", () => {
    expect(kurinukiCarves()).toHaveLength(5);
  });
});
