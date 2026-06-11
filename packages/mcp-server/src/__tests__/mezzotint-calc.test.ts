import { describe, it, expect } from "vitest";
import {
  toneRange, detailFine, speedPrep, durability,
  mezzCost, forLarge, forSmoothing, toothPattern,
  bestUse, mezzotints,
} from "../mezzotint-calc.js";

describe("toneRange", () => {
  it("burnisher smooth tone widest tone range", () => {
    expect(toneRange("burnisher_smooth_tone")).toBeGreaterThan(toneRange("roulette_mezzotint_texture"));
  });
});

describe("detailFine", () => {
  it("fine rocker detail finest detail", () => {
    expect(detailFine("fine_rocker_detail")).toBeGreaterThan(detailFine("coarse_rocker_bold"));
  });
});

describe("speedPrep", () => {
  it("roulette mezzotint texture fastest prep", () => {
    expect(speedPrep("roulette_mezzotint_texture")).toBeGreaterThan(speedPrep("fine_rocker_detail"));
  });
});

describe("durability", () => {
  it("burnisher smooth tone most durable", () => {
    expect(durability("burnisher_smooth_tone")).toBeGreaterThan(durability("fine_rocker_detail"));
  });
});

describe("mezzCost", () => {
  it("fine rocker detail most expensive", () => {
    expect(mezzCost("fine_rocker_detail")).toBeGreaterThan(mezzCost("roulette_mezzotint_texture"));
  });
});

describe("forLarge", () => {
  it("standard rocker medium is for large", () => {
    expect(forLarge("standard_rocker_medium")).toBe(true);
  });
  it("fine rocker detail not for large", () => {
    expect(forLarge("fine_rocker_detail")).toBe(false);
  });
});

describe("forSmoothing", () => {
  it("burnisher smooth tone is for smoothing", () => {
    expect(forSmoothing("burnisher_smooth_tone")).toBe(true);
  });
  it("standard rocker medium not for smoothing", () => {
    expect(forSmoothing("standard_rocker_medium")).toBe(false);
  });
});

describe("toothPattern", () => {
  it("coarse rocker bold uses coarse pitch teeth", () => {
    expect(toothPattern("coarse_rocker_bold")).toBe("coarse_pitch_teeth");
  });
});

describe("bestUse", () => {
  it("standard rocker medium best for general mezzotint ground", () => {
    expect(bestUse("standard_rocker_medium")).toBe("general_mezzotint_ground");
  });
});

describe("mezzotints", () => {
  it("returns 5 types", () => {
    expect(mezzotints()).toHaveLength(5);
  });
});
