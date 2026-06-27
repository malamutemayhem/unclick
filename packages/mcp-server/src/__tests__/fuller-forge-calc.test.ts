import { describe, it, expect } from "vitest";
import {
  grooveDepth, spreadControl, speedWork, radiusRange,
  fullerCost, topTool, springAction, fullerProfile,
  bestUse, fullerForges,
} from "../fuller-forge-calc.js";

describe("grooveDepth", () => {
  it("guillotine fuller set deepest groove", () => {
    expect(grooveDepth("guillotine_fuller_set")).toBeGreaterThan(grooveDepth("half_round_fuller"));
  });
});

describe("spreadControl", () => {
  it("guillotine fuller set best spread control", () => {
    expect(spreadControl("guillotine_fuller_set")).toBeGreaterThan(spreadControl("bottom_fuller_hardy"));
  });
});

describe("speedWork", () => {
  it("spring fuller combo fastest work", () => {
    expect(speedWork("spring_fuller_combo")).toBeGreaterThan(speedWork("top_fuller_hand"));
  });
});

describe("radiusRange", () => {
  it("half round fuller best radius range", () => {
    expect(radiusRange("half_round_fuller")).toBeGreaterThan(radiusRange("bottom_fuller_hardy"));
  });
});

describe("fullerCost", () => {
  it("guillotine fuller set most expensive", () => {
    expect(fullerCost("guillotine_fuller_set")).toBeGreaterThan(fullerCost("top_fuller_hand"));
  });
});

describe("topTool", () => {
  it("top fuller hand is top tool", () => {
    expect(topTool("top_fuller_hand")).toBe(true);
  });
  it("bottom fuller hardy not top tool", () => {
    expect(topTool("bottom_fuller_hardy")).toBe(false);
  });
});

describe("springAction", () => {
  it("spring fuller combo has spring action", () => {
    expect(springAction("spring_fuller_combo")).toBe(true);
  });
  it("top fuller hand no spring action", () => {
    expect(springAction("top_fuller_hand")).toBe(false);
  });
});

describe("fullerProfile", () => {
  it("guillotine fuller set uses guillotine guide", () => {
    expect(fullerProfile("guillotine_fuller_set")).toBe("guillotine_guide");
  });
});

describe("bestUse", () => {
  it("spring fuller combo best for fast shoulder work", () => {
    expect(bestUse("spring_fuller_combo")).toBe("fast_shoulder_work");
  });
});

describe("fullerForges", () => {
  it("returns 5 types", () => {
    expect(fullerForges()).toHaveLength(5);
  });
});
