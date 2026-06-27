import { describe, it, expect } from "vitest";
import {
  patternLift, threadSafe, speedPick, warpCount,
  stickCost, hasPoint, hooked, stickMaterial,
  bestUse, pickupSticks,
} from "../pickup-stick-calc.js";

describe("patternLift", () => {
  it("pointed bamboo fine best pattern lift", () => {
    expect(patternLift("pointed_bamboo_fine")).toBeGreaterThan(patternLift("wide_paddle_broad"));
  });
});

describe("threadSafe", () => {
  it("wide paddle broad most thread safe", () => {
    expect(threadSafe("wide_paddle_broad")).toBeGreaterThan(threadSafe("metal_tip_durable"));
  });
});

describe("speedPick", () => {
  it("curved hook grab fastest pick", () => {
    expect(speedPick("curved_hook_grab")).toBeGreaterThan(speedPick("wide_paddle_broad"));
  });
});

describe("warpCount", () => {
  it("pointed bamboo fine highest warp count", () => {
    expect(warpCount("pointed_bamboo_fine")).toBeGreaterThan(warpCount("wide_paddle_broad"));
  });
});

describe("stickCost", () => {
  it("metal tip durable more expensive", () => {
    expect(stickCost("metal_tip_durable")).toBeGreaterThan(stickCost("flat_wood_basic"));
  });
});

describe("hasPoint", () => {
  it("pointed bamboo fine has point", () => {
    expect(hasPoint("pointed_bamboo_fine")).toBe(true);
  });
  it("flat wood basic has no point", () => {
    expect(hasPoint("flat_wood_basic")).toBe(false);
  });
});

describe("hooked", () => {
  it("curved hook grab is hooked", () => {
    expect(hooked("curved_hook_grab")).toBe(true);
  });
  it("pointed bamboo fine not hooked", () => {
    expect(hooked("pointed_bamboo_fine")).toBe(false);
  });
});

describe("stickMaterial", () => {
  it("flat wood basic uses hardwood flat sand", () => {
    expect(stickMaterial("flat_wood_basic")).toBe("hardwood_flat_sand");
  });
});

describe("bestUse", () => {
  it("curved hook grab best for fast hook pull", () => {
    expect(bestUse("curved_hook_grab")).toBe("fast_hook_pull");
  });
});

describe("pickupSticks", () => {
  it("returns 5 types", () => {
    expect(pickupSticks()).toHaveLength(5);
  });
});
