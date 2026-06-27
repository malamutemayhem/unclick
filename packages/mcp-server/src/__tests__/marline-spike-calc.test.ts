import { describe, it, expect } from "vitest";
import {
  separateForce, knotWork, controlGrip, durability,
  spikeCost, folding, forHeavy, spikeShape,
  bestUse, marlineSpikes,
} from "../marline-spike-calc.js";

describe("separateForce", () => {
  it("swedish pattern heavy strongest separate force", () => {
    expect(separateForce("swedish_pattern_heavy")).toBeGreaterThan(separateForce("folding_pocket_travel"));
  });
});

describe("knotWork", () => {
  it("hollow fid tubular best knot work", () => {
    expect(knotWork("hollow_fid_tubular")).toBeGreaterThan(knotWork("folding_pocket_travel"));
  });
});

describe("controlGrip", () => {
  it("wood handle comfort best control grip", () => {
    expect(controlGrip("wood_handle_comfort")).toBeGreaterThan(controlGrip("steel_straight_standard"));
  });
});

describe("durability", () => {
  it("swedish pattern heavy most durable", () => {
    expect(durability("swedish_pattern_heavy")).toBeGreaterThan(durability("folding_pocket_travel"));
  });
});

describe("spikeCost", () => {
  it("swedish pattern heavy most expensive", () => {
    expect(spikeCost("swedish_pattern_heavy")).toBeGreaterThan(spikeCost("steel_straight_standard"));
  });
});

describe("folding", () => {
  it("folding pocket travel is folding", () => {
    expect(folding("folding_pocket_travel")).toBe(true);
  });
  it("steel straight standard not folding", () => {
    expect(folding("steel_straight_standard")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("swedish pattern heavy is for heavy", () => {
    expect(forHeavy("swedish_pattern_heavy")).toBe(true);
  });
  it("hollow fid tubular not for heavy", () => {
    expect(forHeavy("hollow_fid_tubular")).toBe(false);
  });
});

describe("spikeShape", () => {
  it("hollow fid tubular has hollow tube end shape", () => {
    expect(spikeShape("hollow_fid_tubular")).toBe("hollow_tube_end");
  });
});

describe("bestUse", () => {
  it("hollow fid tubular best for braided rope splice", () => {
    expect(bestUse("hollow_fid_tubular")).toBe("braided_rope_splice");
  });
});

describe("marlineSpikes", () => {
  it("returns 5 types", () => {
    expect(marlineSpikes()).toHaveLength(5);
  });
});
