import { describe, it, expect } from "vitest";
import {
  holdSecure, swivel, strandCount, loadCapacity,
  hookCost, hasSwivel, forHawser, hookPattern,
  bestUse, strandHooks,
} from "../strand-hook-calc.js";

describe("holdSecure", () => {
  it("spring loaded tension most secure hold", () => {
    expect(holdSecure("spring_loaded_tension")).toBeGreaterThan(holdSecure("four_hook_hawser"));
  });
});

describe("swivel", () => {
  it("swivel hook standard best swivel", () => {
    expect(swivel("swivel_hook_standard")).toBeGreaterThan(swivel("fixed_hook_simple"));
  });
});

describe("strandCount", () => {
  it("four hook hawser best strand count", () => {
    expect(strandCount("four_hook_hawser")).toBeGreaterThan(strandCount("swivel_hook_standard"));
  });
});

describe("loadCapacity", () => {
  it("four hook hawser best load capacity", () => {
    expect(loadCapacity("four_hook_hawser")).toBeGreaterThan(loadCapacity("swivel_hook_standard"));
  });
});

describe("hookCost", () => {
  it("four hook hawser most expensive", () => {
    expect(hookCost("four_hook_hawser")).toBeGreaterThan(hookCost("fixed_hook_simple"));
  });
});

describe("hasSwivel", () => {
  it("swivel hook standard has swivel", () => {
    expect(hasSwivel("swivel_hook_standard")).toBe(true);
  });
  it("fixed hook simple has no swivel", () => {
    expect(hasSwivel("fixed_hook_simple")).toBe(false);
  });
});

describe("forHawser", () => {
  it("four hook hawser is for hawser", () => {
    expect(forHawser("four_hook_hawser")).toBe(true);
  });
  it("swivel hook standard not for hawser", () => {
    expect(forHawser("swivel_hook_standard")).toBe(false);
  });
});

describe("hookPattern", () => {
  it("triple hook three uses triple arm swivel", () => {
    expect(hookPattern("triple_hook_three")).toBe("triple_arm_swivel");
  });
});

describe("bestUse", () => {
  it("swivel hook standard best for general strand twist", () => {
    expect(bestUse("swivel_hook_standard")).toBe("general_strand_twist");
  });
});

describe("strandHooks", () => {
  it("returns 5 types", () => {
    expect(strandHooks()).toHaveLength(5);
  });
});
