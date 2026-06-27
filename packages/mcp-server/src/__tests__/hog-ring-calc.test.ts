import { describe, it, expect } from "vitest";
import {
  closeForce, speedFasten, reachDepth, ringVariety,
  ringCost, powered, angled, feedType,
  bestUse, hogRings,
} from "../hog-ring-calc.js";

describe("closeForce", () => {
  it("heavy gauge fence strongest close", () => {
    expect(closeForce("heavy_gauge_fence")).toBeGreaterThan(closeForce("manual_plier_squeeze"));
  });
});

describe("speedFasten", () => {
  it("pneumatic auto fire fastest fasten", () => {
    expect(speedFasten("pneumatic_auto_fire")).toBeGreaterThan(speedFasten("heavy_gauge_fence"));
  });
});

describe("reachDepth", () => {
  it("angled nose reach deepest reach", () => {
    expect(reachDepth("angled_nose_reach")).toBeGreaterThan(reachDepth("heavy_gauge_fence"));
  });
});

describe("ringVariety", () => {
  it("manual plier squeeze most ring variety", () => {
    expect(ringVariety("manual_plier_squeeze")).toBeGreaterThan(ringVariety("heavy_gauge_fence"));
  });
});

describe("ringCost", () => {
  it("pneumatic auto fire most expensive", () => {
    expect(ringCost("pneumatic_auto_fire")).toBeGreaterThan(ringCost("manual_plier_squeeze"));
  });
});

describe("powered", () => {
  it("pneumatic auto fire is powered", () => {
    expect(powered("pneumatic_auto_fire")).toBe(true);
  });
  it("manual plier squeeze not powered", () => {
    expect(powered("manual_plier_squeeze")).toBe(false);
  });
});

describe("angled", () => {
  it("angled nose reach is angled", () => {
    expect(angled("angled_nose_reach")).toBe(true);
  });
  it("manual plier squeeze not angled", () => {
    expect(angled("manual_plier_squeeze")).toBe(false);
  });
});

describe("feedType", () => {
  it("pneumatic auto fire uses magazine strip feed", () => {
    expect(feedType("pneumatic_auto_fire")).toBe("magazine_strip_feed");
  });
});

describe("bestUse", () => {
  it("heavy gauge fence best for fence cage wire", () => {
    expect(bestUse("heavy_gauge_fence")).toBe("fence_cage_wire");
  });
});

describe("hogRings", () => {
  it("returns 5 types", () => {
    expect(hogRings()).toHaveLength(5);
  });
});
