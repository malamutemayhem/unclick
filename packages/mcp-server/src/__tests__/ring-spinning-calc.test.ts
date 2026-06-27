import { describe, it, expect } from "vitest";
import {
  yarnStrength, spindleSpeed, yarnHairiness, countRange,
  rsCost, compact, forFine, draftSystem,
  bestUse, ringSpinningTypes,
} from "../ring-spinning-calc.js";

describe("yarnStrength", () => {
  it("compact suction strongest yarn", () => {
    expect(yarnStrength("compact_suction")).toBeGreaterThan(yarnStrength("conventional_ring"));
  });
});

describe("spindleSpeed", () => {
  it("traveller modified fastest spindle speed", () => {
    expect(spindleSpeed("traveller_modified")).toBeGreaterThan(spindleSpeed("long_staple_worsted"));
  });
});

describe("yarnHairiness", () => {
  it("compact suction best hairiness control", () => {
    expect(yarnHairiness("compact_suction")).toBeGreaterThan(yarnHairiness("conventional_ring"));
  });
});

describe("countRange", () => {
  it("conventional ring widest count range", () => {
    expect(countRange("conventional_ring")).toBeGreaterThan(countRange("long_staple_worsted"));
  });
});

describe("rsCost", () => {
  it("compact suction most expensive", () => {
    expect(rsCost("compact_suction")).toBeGreaterThan(rsCost("conventional_ring"));
  });
});

describe("compact", () => {
  it("compact suction is compact", () => {
    expect(compact("compact_suction")).toBe(true);
  });
  it("conventional ring not compact", () => {
    expect(compact("conventional_ring")).toBe(false);
  });
});

describe("forFine", () => {
  it("compact suction for fine yarn", () => {
    expect(forFine("compact_suction")).toBe(true);
  });
  it("conventional ring not for fine", () => {
    expect(forFine("conventional_ring")).toBe(false);
  });
});

describe("draftSystem", () => {
  it("siro twin strand uses twin roving feed", () => {
    expect(draftSystem("siro_twin_strand")).toBe("twin_roving_feed_parallel_draft_ply_twist_single_spindle_siro");
  });
});

describe("bestUse", () => {
  it("long staple worsted for wool suiting", () => {
    expect(bestUse("long_staple_worsted")).toBe("worsted_wool_yarn_suiting_knitwear_long_staple_smooth_finish");
  });
});

describe("ringSpinningTypes", () => {
  it("returns 5 types", () => {
    expect(ringSpinningTypes()).toHaveLength(5);
  });
});
