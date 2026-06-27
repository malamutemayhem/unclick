import { describe, it, expect } from "vitest";
import {
  beatForce, evenness, controlFeel, fabricRange,
  beaterCost, freeSwing, forTapestry, swingPath,
  bestUse, beaterBars,
} from "../beater-bar-calc.js";

describe("beatForce", () => {
  it("weighted bar heavy strongest beat", () => {
    expect(beatForce("weighted_bar_heavy")).toBeGreaterThan(beatForce("tapestry_fork_fine"));
  });
});

describe("evenness", () => {
  it("overhead beater pivot most even", () => {
    expect(evenness("overhead_beater_pivot")).toBeGreaterThan(evenness("bottom_swing_pendulum"));
  });
});

describe("controlFeel", () => {
  it("tapestry fork fine best control", () => {
    expect(controlFeel("tapestry_fork_fine")).toBeGreaterThan(controlFeel("weighted_bar_heavy"));
  });
});

describe("fabricRange", () => {
  it("overhead beater pivot widest fabric range", () => {
    expect(fabricRange("overhead_beater_pivot")).toBeGreaterThan(fabricRange("tapestry_fork_fine"));
  });
});

describe("beaterCost", () => {
  it("overhead beater pivot most expensive", () => {
    expect(beaterCost("overhead_beater_pivot")).toBeGreaterThan(beaterCost("hand_beater_comb"));
  });
});

describe("freeSwing", () => {
  it("overhead beater pivot is free swing", () => {
    expect(freeSwing("overhead_beater_pivot")).toBe(true);
  });
  it("hand beater comb not free swing", () => {
    expect(freeSwing("hand_beater_comb")).toBe(false);
  });
});

describe("forTapestry", () => {
  it("tapestry fork fine is for tapestry", () => {
    expect(forTapestry("tapestry_fork_fine")).toBe(true);
  });
  it("overhead beater pivot not for tapestry", () => {
    expect(forTapestry("overhead_beater_pivot")).toBe(false);
  });
});

describe("swingPath", () => {
  it("weighted bar heavy uses gravity weight drop", () => {
    expect(swingPath("weighted_bar_heavy")).toBe("gravity_weight_drop");
  });
});

describe("bestUse", () => {
  it("tapestry fork fine best for tapestry weft pack", () => {
    expect(bestUse("tapestry_fork_fine")).toBe("tapestry_weft_pack");
  });
});

describe("beaterBars", () => {
  it("returns 5 types", () => {
    expect(beaterBars()).toHaveLength(5);
  });
});
