import { describe, it, expect } from "vitest";
import {
  glideEfficiency, primaryStability, storageEase, weightCapacity,
  boardCost, deflatable, hasCargoNet, deckPad,
  bestActivity, paddleBoards,
} from "../paddle-board-calc.js";

describe("glideEfficiency", () => {
  it("hardboard race best glide", () => {
    expect(glideEfficiency("hardboard_race")).toBeGreaterThan(glideEfficiency("yoga_wide_deck"));
  });
});

describe("primaryStability", () => {
  it("yoga wide deck most stable", () => {
    expect(primaryStability("yoga_wide_deck")).toBeGreaterThan(primaryStability("hardboard_race"));
  });
});

describe("storageEase", () => {
  it("inflatable touring easiest storage", () => {
    expect(storageEase("inflatable_touring")).toBeGreaterThan(storageEase("hardboard_race"));
  });
});

describe("weightCapacity", () => {
  it("fishing platform highest capacity", () => {
    expect(weightCapacity("fishing_platform")).toBeGreaterThan(weightCapacity("hardboard_race"));
  });
});

describe("boardCost", () => {
  it("hardboard race most expensive", () => {
    expect(boardCost("hardboard_race")).toBeGreaterThan(boardCost("all_around_foam"));
  });
});

describe("deflatable", () => {
  it("inflatable touring is deflatable", () => {
    expect(deflatable("inflatable_touring")).toBe(true);
  });
  it("hardboard race is not", () => {
    expect(deflatable("hardboard_race")).toBe(false);
  });
});

describe("hasCargoNet", () => {
  it("inflatable touring has cargo net", () => {
    expect(hasCargoNet("inflatable_touring")).toBe(true);
  });
  it("yoga wide deck does not", () => {
    expect(hasCargoNet("yoga_wide_deck")).toBe(false);
  });
});

describe("deckPad", () => {
  it("yoga wide deck uses full length cushion pad", () => {
    expect(deckPad("yoga_wide_deck")).toBe("full_length_cushion_pad");
  });
});

describe("bestActivity", () => {
  it("all around foam for beginner casual paddle", () => {
    expect(bestActivity("all_around_foam")).toBe("beginner_casual_paddle");
  });
});

describe("paddleBoards", () => {
  it("returns 5 types", () => {
    expect(paddleBoards()).toHaveLength(5);
  });
});
