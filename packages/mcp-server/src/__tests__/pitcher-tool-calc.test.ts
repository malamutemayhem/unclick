import { describe, it, expect } from "vitest";
import {
  splitForce, lineControl, faceSmooth, stoneRange,
  pitcherCost, hydraulic, forThickSlab, edgeProfile,
  bestUse, pitcherTools,
} from "../pitcher-tool-calc.js";

describe("splitForce", () => {
  it("plugs feathers set strongest split", () => {
    expect(splitForce("plugs_feathers_set")).toBeGreaterThan(splitForce("narrow_blade_score"));
  });
});

describe("lineControl", () => {
  it("narrow blade score best line control", () => {
    expect(lineControl("narrow_blade_score")).toBeGreaterThan(lineControl("hydraulic_splitter_press"));
  });
});

describe("faceSmooth", () => {
  it("narrow blade score smoothest face", () => {
    expect(faceSmooth("narrow_blade_score")).toBeGreaterThan(faceSmooth("bolster_broad_flat"));
  });
});

describe("stoneRange", () => {
  it("hydraulic splitter press widest range", () => {
    expect(stoneRange("hydraulic_splitter_press")).toBeGreaterThan(stoneRange("narrow_blade_score"));
  });
});

describe("pitcherCost", () => {
  it("hydraulic splitter press most expensive", () => {
    expect(pitcherCost("hydraulic_splitter_press")).toBeGreaterThan(pitcherCost("wide_blade_split"));
  });
});

describe("hydraulic", () => {
  it("hydraulic splitter press is hydraulic", () => {
    expect(hydraulic("hydraulic_splitter_press")).toBe(true);
  });
  it("wide blade split not hydraulic", () => {
    expect(hydraulic("wide_blade_split")).toBe(false);
  });
});

describe("forThickSlab", () => {
  it("bolster broad flat is for thick slab", () => {
    expect(forThickSlab("bolster_broad_flat")).toBe(true);
  });
  it("narrow blade score not for thick slab", () => {
    expect(forThickSlab("narrow_blade_score")).toBe(false);
  });
});

describe("edgeProfile", () => {
  it("plugs feathers set uses wedge shim pair", () => {
    expect(edgeProfile("plugs_feathers_set")).toBe("wedge_shim_pair");
  });
});

describe("bestUse", () => {
  it("plugs feathers set best for controlled block split", () => {
    expect(bestUse("plugs_feathers_set")).toBe("controlled_block_split");
  });
});

describe("pitcherTools", () => {
  it("returns 5 types", () => {
    expect(pitcherTools()).toHaveLength(5);
  });
});
