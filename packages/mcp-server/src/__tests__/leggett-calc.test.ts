import { describe, it, expect } from "vitest";
import {
  pushForce, reachDepth, sparGrip, speedWork,
  leggettCost, cranked, forLongStraw, prongStyle,
  bestUse, leggetts,
} from "../leggett-calc.js";

describe("pushForce", () => {
  it("double prong fork strongest push", () => {
    expect(pushForce("double_prong_fork")).toBeGreaterThan(pushForce("lightweight_alloy_fast"));
  });
});

describe("reachDepth", () => {
  it("cranked angle reach deepest", () => {
    expect(reachDepth("cranked_angle_reach")).toBeGreaterThan(reachDepth("straight_push_standard"));
  });
});

describe("sparGrip", () => {
  it("spiral twist grip best grip", () => {
    expect(sparGrip("spiral_twist_grip")).toBeGreaterThan(sparGrip("lightweight_alloy_fast"));
  });
});

describe("speedWork", () => {
  it("lightweight alloy fast fastest", () => {
    expect(speedWork("lightweight_alloy_fast")).toBeGreaterThan(speedWork("spiral_twist_grip"));
  });
});

describe("leggettCost", () => {
  it("lightweight alloy fast most expensive", () => {
    expect(leggettCost("lightweight_alloy_fast")).toBeGreaterThan(leggettCost("straight_push_standard"));
  });
});

describe("cranked", () => {
  it("cranked angle reach is cranked", () => {
    expect(cranked("cranked_angle_reach")).toBe(true);
  });
  it("straight push standard not cranked", () => {
    expect(cranked("straight_push_standard")).toBe(false);
  });
});

describe("forLongStraw", () => {
  it("cranked angle reach is for long straw", () => {
    expect(forLongStraw("cranked_angle_reach")).toBe(true);
  });
  it("straight push standard not for long straw", () => {
    expect(forLongStraw("straight_push_standard")).toBe(false);
  });
});

describe("prongStyle", () => {
  it("double prong fork uses twin fork spread", () => {
    expect(prongStyle("double_prong_fork")).toBe("twin_fork_spread");
  });
});

describe("bestUse", () => {
  it("spiral twist grip best for secure spar lock", () => {
    expect(bestUse("spiral_twist_grip")).toBe("secure_spar_lock");
  });
});

describe("leggetts", () => {
  it("returns 5 types", () => {
    expect(leggetts()).toHaveLength(5);
  });
});
