import { describe, it, expect } from "vitest";
import {
  trackingAccuracy, glideSpeed, wristComfort, durability,
  padCost, washable, stitchedEdge, surfaceMaterial,
  bestUser, mousePads,
} from "../mouse-pad-calc.js";

describe("trackingAccuracy", () => {
  it("glass smooth precision most accurate tracking", () => {
    expect(trackingAccuracy("glass_smooth_precision")).toBeGreaterThan(trackingAccuracy("leather_premium_office"));
  });
});

describe("glideSpeed", () => {
  it("glass smooth precision fastest glide", () => {
    expect(glideSpeed("glass_smooth_precision")).toBeGreaterThan(glideSpeed("cloth_standard_soft"));
  });
});

describe("wristComfort", () => {
  it("extended desk mat most wrist comfort", () => {
    expect(wristComfort("extended_desk_mat")).toBeGreaterThan(wristComfort("glass_smooth_precision"));
  });
});

describe("durability", () => {
  it("glass smooth precision most durable", () => {
    expect(durability("glass_smooth_precision")).toBeGreaterThan(durability("cloth_standard_soft"));
  });
});

describe("padCost", () => {
  it("leather premium office most expensive", () => {
    expect(padCost("leather_premium_office")).toBeGreaterThan(padCost("cloth_standard_soft"));
  });
});

describe("washable", () => {
  it("cloth standard soft is washable", () => {
    expect(washable("cloth_standard_soft")).toBe(true);
  });
  it("leather premium office is not", () => {
    expect(washable("leather_premium_office")).toBe(false);
  });
});

describe("stitchedEdge", () => {
  it("cloth standard soft has stitched edge", () => {
    expect(stitchedEdge("cloth_standard_soft")).toBe(true);
  });
  it("hard plastic speed does not", () => {
    expect(stitchedEdge("hard_plastic_speed")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("glass smooth precision uses tempered frosted glass", () => {
    expect(surfaceMaterial("glass_smooth_precision")).toBe("tempered_frosted_glass");
  });
});

describe("bestUser", () => {
  it("hard plastic speed best for fps gamer competitive", () => {
    expect(bestUser("hard_plastic_speed")).toBe("fps_gamer_competitive");
  });
});

describe("mousePads", () => {
  it("returns 5 types", () => {
    expect(mousePads()).toHaveLength(5);
  });
});
