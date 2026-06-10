import { describe, it, expect } from "vitest";
import {
  letterToPositions, positionsToAngle, flagLength, signalRate,
  transmissionTime, maxRange, alphabetSize, errorRate,
  trainingHours, anglesBetween,
} from "../flag-semaphore.js";

describe("letterToPositions", () => {
  it("A returns positions", () => {
    const pos = letterToPositions("A");
    expect(pos).not.toBeNull();
    expect(pos).toHaveLength(2);
  });
  it("unknown returns null", () => {
    expect(letterToPositions("1")).toBeNull();
  });
});

describe("positionsToAngle", () => {
  it("position 1 = 0 degrees", () => {
    expect(positionsToAngle(1)).toBe(0);
  });
  it("position 3 = 90 degrees", () => {
    expect(positionsToAngle(3)).toBe(90);
  });
});

describe("flagLength", () => {
  it("close = 45cm", () => {
    expect(flagLength(100)).toBe(45);
  });
  it("far = 90cm", () => {
    expect(flagLength(600)).toBe(90);
  });
});

describe("signalRate", () => {
  it("chars per min", () => {
    expect(signalRate(10)).toBe(50);
  });
});

describe("transmissionTime", () => {
  it("positive minutes", () => {
    expect(transmissionTime(100, 50)).toBe(2);
  });
  it("zero rate = 0", () => {
    expect(transmissionTime(100, 0)).toBe(0);
  });
});

describe("maxRange", () => {
  it("poor visibility shorter", () => {
    expect(maxRange(60, "poor")).toBeLessThan(maxRange(60, "good"));
  });
});

describe("alphabetSize", () => {
  it("is 26", () => {
    expect(alphabetSize()).toBe(26);
  });
});

describe("errorRate", () => {
  it("increases with distance", () => {
    expect(errorRate(500)).toBeGreaterThan(errorRate(50));
  });
});

describe("trainingHours", () => {
  it("basic = 4", () => {
    expect(trainingHours("basic")).toBe(4);
  });
});

describe("anglesBetween", () => {
  it("positions 1 and 3 = 90", () => {
    expect(anglesBetween(1, 3)).toBe(90);
  });
});
