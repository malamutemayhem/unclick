import { describe, it, expect } from "vitest";
import {
  speed, yieldRecovery, cutAccuracy, logDiameter,
  sbCost, resaw, forHardwood, blade,
  bestUse, sawmillBladeTypes,
} from "../sawmill-blade-calc.js";

describe("speed", () => {
  it("circular head rig fastest", () => {
    expect(speed("circular_head_rig")).toBeGreaterThan(speed("bandsaw_horizontal"));
  });
});

describe("yieldRecovery", () => {
  it("bandsaw horizontal best yield recovery", () => {
    expect(yieldRecovery("bandsaw_horizontal")).toBeGreaterThan(yieldRecovery("circular_head_rig"));
  });
});

describe("cutAccuracy", () => {
  it("bandsaw vertical best cut accuracy", () => {
    expect(cutAccuracy("bandsaw_vertical")).toBeGreaterThan(cutAccuracy("circular_head_rig"));
  });
});

describe("logDiameter", () => {
  it("bandsaw vertical largest log diameter", () => {
    expect(logDiameter("bandsaw_vertical")).toBeGreaterThan(logDiameter("thin_kerf_circular"));
  });
});

describe("sbCost", () => {
  it("thin kerf circular most expensive", () => {
    expect(sbCost("thin_kerf_circular")).toBeGreaterThan(sbCost("circular_head_rig"));
  });
});

describe("resaw", () => {
  it("bandsaw horizontal can resaw", () => {
    expect(resaw("bandsaw_horizontal")).toBe(true);
  });
  it("circular head rig cannot resaw", () => {
    expect(resaw("circular_head_rig")).toBe(false);
  });
});

describe("forHardwood", () => {
  it("bandsaw horizontal for hardwood", () => {
    expect(forHardwood("bandsaw_horizontal")).toBe(true);
  });
  it("circular head rig not for hardwood", () => {
    expect(forHardwood("circular_head_rig")).toBe(false);
  });
});

describe("blade", () => {
  it("frame gang uses multiple parallel blades", () => {
    expect(blade("frame_gang")).toBe("multiple_parallel_blades_frame_reciprocate_multi_cut_pass");
  });
});

describe("bestUse", () => {
  it("circular head rig for softwood pine", () => {
    expect(bestUse("circular_head_rig")).toBe("softwood_pine_dimension_lumber_high_speed_production_mill");
  });
});

describe("sawmillBladeTypes", () => {
  it("returns 5 types", () => {
    expect(sawmillBladeTypes()).toHaveLength(5);
  });
});
