import { describe, it, expect } from "vitest";
import {
  ambientLight, taskLight, wallProjection, styleVersatility,
  sconceCost, adjustable, hardwired, finishType,
  bestSpace, wallSconces,
} from "../wall-sconce-calc.js";

describe("ambientLight", () => {
  it("uplighter half shade best ambient light", () => {
    expect(ambientLight("uplighter_half_shade")).toBeGreaterThan(ambientLight("picture_light_gallery"));
  });
});

describe("taskLight", () => {
  it("swing arm reading best task light", () => {
    expect(taskLight("swing_arm_reading")).toBeGreaterThan(taskLight("uplighter_half_shade"));
  });
});

describe("wallProjection", () => {
  it("flush mount modern least wall projection", () => {
    expect(wallProjection("flush_mount_modern")).toBeGreaterThan(wallProjection("swing_arm_reading"));
  });
});

describe("styleVersatility", () => {
  it("flush mount modern most versatile style", () => {
    expect(styleVersatility("flush_mount_modern")).toBeGreaterThan(styleVersatility("picture_light_gallery"));
  });
});

describe("sconceCost", () => {
  it("picture light gallery most expensive", () => {
    expect(sconceCost("picture_light_gallery")).toBeGreaterThan(sconceCost("uplighter_half_shade"));
  });
});

describe("adjustable", () => {
  it("swing arm reading is adjustable", () => {
    expect(adjustable("swing_arm_reading")).toBe(true);
  });
  it("uplighter half shade is not", () => {
    expect(adjustable("uplighter_half_shade")).toBe(false);
  });
});

describe("hardwired", () => {
  it("flush mount modern is hardwired", () => {
    expect(hardwired("flush_mount_modern")).toBe(true);
  });
  it("swing arm reading is not", () => {
    expect(hardwired("swing_arm_reading")).toBe(false);
  });
});

describe("finishType", () => {
  it("candle holder vintage uses wrought iron socket", () => {
    expect(finishType("candle_holder_vintage")).toBe("wrought_iron_socket");
  });
});

describe("bestSpace", () => {
  it("swing arm reading best for bedside reading nook", () => {
    expect(bestSpace("swing_arm_reading")).toBe("bedside_reading_nook");
  });
});

describe("wallSconces", () => {
  it("returns 5 types", () => {
    expect(wallSconces()).toHaveLength(5);
  });
});
