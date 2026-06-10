import { describe, it, expect } from "vitest";
import {
  holdStrength, decorativeValue, versatility, beadRange,
  pinCost, forHeavyBead, decorativeHead, pinMetal,
  bestUse, headPins,
} from "../head-pin-calc.js";

describe("holdStrength", () => {
  it("paddle head wide strongest hold", () => {
    expect(holdStrength("paddle_head_wide")).toBeGreaterThan(holdStrength("nail_head_thin"));
  });
});

describe("decorativeValue", () => {
  it("ornate head fancy most decorative", () => {
    expect(decorativeValue("ornate_head_fancy")).toBeGreaterThan(decorativeValue("flat_head_standard"));
  });
});

describe("versatility", () => {
  it("flat head standard most versatile", () => {
    expect(versatility("flat_head_standard")).toBeGreaterThan(versatility("ornate_head_fancy"));
  });
});

describe("beadRange", () => {
  it("paddle head wide widest bead range", () => {
    expect(beadRange("paddle_head_wide")).toBeGreaterThan(beadRange("ornate_head_fancy"));
  });
});

describe("pinCost", () => {
  it("ornate head fancy most expensive", () => {
    expect(pinCost("ornate_head_fancy")).toBeGreaterThan(pinCost("flat_head_standard"));
  });
});

describe("forHeavyBead", () => {
  it("paddle head wide is for heavy bead", () => {
    expect(forHeavyBead("paddle_head_wide")).toBe(true);
  });
  it("ball head decorative is not for heavy bead", () => {
    expect(forHeavyBead("ball_head_decorative")).toBe(false);
  });
});

describe("decorativeHead", () => {
  it("ornate head fancy has decorative head", () => {
    expect(decorativeHead("ornate_head_fancy")).toBe(true);
  });
  it("flat head standard has no decorative head", () => {
    expect(decorativeHead("flat_head_standard")).toBe(false);
  });
});

describe("pinMetal", () => {
  it("paddle head wide uses gold filled paddle", () => {
    expect(pinMetal("paddle_head_wide")).toBe("gold_filled_paddle");
  });
});

describe("bestUse", () => {
  it("ball head decorative best for earring drop accent", () => {
    expect(bestUse("ball_head_decorative")).toBe("earring_drop_accent");
  });
});

describe("headPins", () => {
  it("returns 5 types", () => {
    expect(headPins()).toHaveLength(5);
  });
});
