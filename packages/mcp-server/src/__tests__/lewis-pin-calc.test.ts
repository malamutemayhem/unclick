import { describe, it, expect } from "vitest";
import {
  liftCapacity, gripSecure, setupSpeed, stoneRange,
  lewisCost, reusable, forHeavy, gripMethod,
  bestUse, lewisPins,
} from "../lewis-pin-calc.js";

describe("liftCapacity", () => {
  it("chain lewis heavy most lift capacity", () => {
    expect(liftCapacity("chain_lewis_heavy")).toBeGreaterThan(liftCapacity("two_piece_simple"));
  });
});

describe("gripSecure", () => {
  it("three piece standard most secure grip", () => {
    expect(gripSecure("three_piece_standard")).toBeGreaterThan(gripSecure("two_piece_simple"));
  });
});

describe("setupSpeed", () => {
  it("scissor grip clamp fastest setup", () => {
    expect(setupSpeed("scissor_grip_clamp")).toBeGreaterThan(setupSpeed("chain_lewis_heavy"));
  });
});

describe("stoneRange", () => {
  it("chain lewis heavy best stone range", () => {
    expect(stoneRange("chain_lewis_heavy")).toBeGreaterThan(stoneRange("two_piece_simple"));
  });
});

describe("lewisCost", () => {
  it("chain lewis heavy most expensive", () => {
    expect(lewisCost("chain_lewis_heavy")).toBeGreaterThan(lewisCost("two_piece_simple"));
  });
});

describe("reusable", () => {
  it("three piece standard is reusable", () => {
    expect(reusable("three_piece_standard")).toBe(true);
  });
  it("all lewis pins are reusable", () => {
    expect(reusable("scissor_grip_clamp")).toBe(true);
  });
});

describe("forHeavy", () => {
  it("chain lewis heavy is for heavy", () => {
    expect(forHeavy("chain_lewis_heavy")).toBe(true);
  });
  it("two piece simple not for heavy", () => {
    expect(forHeavy("two_piece_simple")).toBe(false);
  });
});

describe("gripMethod", () => {
  it("scissor grip clamp uses scissor clamp grip", () => {
    expect(gripMethod("scissor_grip_clamp")).toBe("scissor_clamp_grip");
  });
});

describe("bestUse", () => {
  it("chain lewis heavy best for heavy quarry lift", () => {
    expect(bestUse("chain_lewis_heavy")).toBe("heavy_quarry_lift");
  });
});

describe("lewisPins", () => {
  it("returns 5 types", () => {
    expect(lewisPins()).toHaveLength(5);
  });
});
