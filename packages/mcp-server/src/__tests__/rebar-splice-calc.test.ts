import { describe, it, expect } from "vitest";
import {
  strength, speed, congestion, reliability,
  rsCost, mechanical, forColumn, method,
  bestUse, rebarSpliceTypes,
} from "../rebar-splice-calc.js";

describe("strength", () => {
  it("mechanical coupler strongest", () => {
    expect(strength("mechanical_coupler_threaded")).toBeGreaterThan(strength("lap_splice_overlap_tie"));
  });
});

describe("speed", () => {
  it("mechanical coupler fastest", () => {
    expect(speed("mechanical_coupler_threaded")).toBeGreaterThan(speed("welded_splice_butt_weld"));
  });
});

describe("congestion", () => {
  it("headed bar best congestion", () => {
    expect(congestion("headed_bar_anchor_plate")).toBeGreaterThan(congestion("lap_splice_overlap_tie"));
  });
});

describe("reliability", () => {
  it("mechanical coupler most reliable", () => {
    expect(reliability("mechanical_coupler_threaded")).toBeGreaterThan(reliability("welded_splice_butt_weld"));
  });
});

describe("rsCost", () => {
  it("mechanical coupler most expensive", () => {
    expect(rsCost("mechanical_coupler_threaded")).toBeGreaterThan(rsCost("lap_splice_overlap_tie"));
  });
});

describe("mechanical", () => {
  it("mechanical coupler is mechanical", () => {
    expect(mechanical("mechanical_coupler_threaded")).toBe(true);
  });
  it("lap splice not mechanical", () => {
    expect(mechanical("lap_splice_overlap_tie")).toBe(false);
  });
});

describe("forColumn", () => {
  it("mechanical coupler for column", () => {
    expect(forColumn("mechanical_coupler_threaded")).toBe(true);
  });
  it("lap splice not for column", () => {
    expect(forColumn("lap_splice_overlap_tie")).toBe(false);
  });
});

describe("method", () => {
  it("cadweld uses exothermic weld", () => {
    expect(method("cadweld_exothermic_fuse")).toBe("exothermic_weld_powder_crucible");
  });
});

describe("bestUse", () => {
  it("headed bar for congested beam column joint", () => {
    expect(bestUse("headed_bar_anchor_plate")).toBe("beam_column_joint_congested_node");
  });
});

describe("rebarSpliceTypes", () => {
  it("returns 5 types", () => {
    expect(rebarSpliceTypes()).toHaveLength(5);
  });
});
