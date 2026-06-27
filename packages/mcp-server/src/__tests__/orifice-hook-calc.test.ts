import { describe, it, expect } from "vitest";
import {
  threadEase, gripComfort, reachDepth, yarnSafe,
  hookCost, loopThreader, hasHandle, hookShape,
  bestUse, orificeHooks,
} from "../orifice-hook-calc.js";

describe("threadEase", () => {
  it("threader loop pull easiest thread", () => {
    expect(threadEase("threader_loop_pull")).toBeGreaterThan(threadEase("long_reach_deep"));
  });
});

describe("gripComfort", () => {
  it("ergonomic ball end most comfortable", () => {
    expect(gripComfort("ergonomic_ball_end")).toBeGreaterThan(gripComfort("wire_bent_basic"));
  });
});

describe("reachDepth", () => {
  it("long reach deep deepest reach", () => {
    expect(reachDepth("long_reach_deep")).toBeGreaterThan(reachDepth("wire_bent_basic"));
  });
});

describe("yarnSafe", () => {
  it("threader loop pull most yarn safe", () => {
    expect(yarnSafe("threader_loop_pull")).toBeGreaterThan(yarnSafe("long_reach_deep"));
  });
});

describe("hookCost", () => {
  it("ergonomic ball end most expensive", () => {
    expect(hookCost("ergonomic_ball_end")).toBeGreaterThan(hookCost("wire_bent_basic"));
  });
});

describe("loopThreader", () => {
  it("threader loop pull is loop threader", () => {
    expect(loopThreader("threader_loop_pull")).toBe(true);
  });
  it("wire bent basic not loop threader", () => {
    expect(loopThreader("wire_bent_basic")).toBe(false);
  });
});

describe("hasHandle", () => {
  it("wood handle comfort has handle", () => {
    expect(hasHandle("wood_handle_comfort")).toBe(true);
  });
  it("wire bent basic no handle", () => {
    expect(hasHandle("wire_bent_basic")).toBe(false);
  });
});

describe("hookShape", () => {
  it("wire bent basic uses simple bent wire", () => {
    expect(hookShape("wire_bent_basic")).toBe("simple_bent_wire");
  });
});

describe("bestUse", () => {
  it("ergonomic ball end best for arthritis friendly", () => {
    expect(bestUse("ergonomic_ball_end")).toBe("arthritis_friendly");
  });
});

describe("orificeHooks", () => {
  it("returns 5 types", () => {
    expect(orificeHooks()).toHaveLength(5);
  });
});
