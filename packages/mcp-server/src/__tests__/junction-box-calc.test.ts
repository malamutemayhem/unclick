import { describe, it, expect } from "vitest";
import {
  capacity, installEase, durability, groundingEase,
  boxCost, outdoorRated, needsClamp, boxMaterial,
  bestMount, junctionBoxes,
} from "../junction-box-calc.js";

describe("capacity", () => {
  it("pull box large conduit most capacity", () => {
    expect(capacity("pull_box_large_conduit")).toBeGreaterThan(capacity("pancake_shallow_thin"));
  });
});

describe("installEase", () => {
  it("plastic single gang easiest install", () => {
    expect(installEase("plastic_single_gang")).toBeGreaterThan(installEase("pull_box_large_conduit"));
  });
});

describe("durability", () => {
  it("weatherproof round outdoor most durable", () => {
    expect(durability("weatherproof_round_outdoor")).toBeGreaterThan(durability("plastic_single_gang"));
  });
});

describe("groundingEase", () => {
  it("metal octagon ceiling easiest grounding", () => {
    expect(groundingEase("metal_octagon_ceiling")).toBeGreaterThan(groundingEase("plastic_single_gang"));
  });
});

describe("boxCost", () => {
  it("pull box large conduit most expensive", () => {
    expect(boxCost("pull_box_large_conduit")).toBeGreaterThan(boxCost("plastic_single_gang"));
  });
});

describe("outdoorRated", () => {
  it("weatherproof round outdoor is outdoor rated", () => {
    expect(outdoorRated("weatherproof_round_outdoor")).toBe(true);
  });
  it("plastic single gang is not", () => {
    expect(outdoorRated("plastic_single_gang")).toBe(false);
  });
});

describe("needsClamp", () => {
  it("metal octagon ceiling needs clamp", () => {
    expect(needsClamp("metal_octagon_ceiling")).toBe(true);
  });
  it("plastic single gang does not", () => {
    expect(needsClamp("plastic_single_gang")).toBe(false);
  });
});

describe("boxMaterial", () => {
  it("weatherproof round outdoor uses die cast aluminum", () => {
    expect(boxMaterial("weatherproof_round_outdoor")).toBe("die_cast_aluminum");
  });
});

describe("bestMount", () => {
  it("metal octagon ceiling best for ceiling fan light", () => {
    expect(bestMount("metal_octagon_ceiling")).toBe("ceiling_fan_light");
  });
});

describe("junctionBoxes", () => {
  it("returns 5 types", () => {
    expect(junctionBoxes()).toHaveLength(5);
  });
});
