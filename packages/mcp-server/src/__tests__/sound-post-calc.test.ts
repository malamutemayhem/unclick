import { describe, it, expect } from "vitest";
import {
  toneTransfer, fitPrecision, stabilityClimate, warmth,
  postCost, selfAdjusting, traditional, postMaterial,
  bestUse, soundPosts,
} from "../sound-post-calc.js";

describe("toneTransfer", () => {
  it("spruce dowel standard best tone transfer", () => {
    expect(toneTransfer("spruce_dowel_standard")).toBeGreaterThan(toneTransfer("adjustable_brass_thread"));
  });
});

describe("fitPrecision", () => {
  it("adjustable brass thread most precise fit", () => {
    expect(fitPrecision("adjustable_brass_thread")).toBeGreaterThan(fitPrecision("cedar_soft_warm"));
  });
});

describe("stabilityClimate", () => {
  it("carbon fiber modern most climate stable", () => {
    expect(stabilityClimate("carbon_fiber_modern")).toBeGreaterThan(stabilityClimate("cedar_soft_warm"));
  });
});

describe("warmth", () => {
  it("cedar soft warm warmest tone", () => {
    expect(warmth("cedar_soft_warm")).toBeGreaterThan(warmth("adjustable_brass_thread"));
  });
});

describe("postCost", () => {
  it("adjustable brass thread most expensive", () => {
    expect(postCost("adjustable_brass_thread")).toBeGreaterThan(postCost("spruce_dowel_standard"));
  });
});

describe("selfAdjusting", () => {
  it("adjustable brass thread is self adjusting", () => {
    expect(selfAdjusting("adjustable_brass_thread")).toBe(true);
  });
  it("spruce dowel standard not self adjusting", () => {
    expect(selfAdjusting("spruce_dowel_standard")).toBe(false);
  });
});

describe("traditional", () => {
  it("spruce dowel standard is traditional", () => {
    expect(traditional("spruce_dowel_standard")).toBe(true);
  });
  it("carbon fiber modern not traditional", () => {
    expect(traditional("carbon_fiber_modern")).toBe(false);
  });
});

describe("postMaterial", () => {
  it("spruce dowel standard uses quarter sawn spruce", () => {
    expect(postMaterial("spruce_dowel_standard")).toBe("quarter_sawn_spruce");
  });
});

describe("bestUse", () => {
  it("carbon fiber modern best for touring climate stable", () => {
    expect(bestUse("carbon_fiber_modern")).toBe("touring_climate_stable");
  });
});

describe("soundPosts", () => {
  it("returns 5 types", () => {
    expect(soundPosts()).toHaveLength(5);
  });
});
