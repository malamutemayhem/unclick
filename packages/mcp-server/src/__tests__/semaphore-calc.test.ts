import { describe, it, expect } from "vitest";
import {
  armPositions, signalCombinations, maxRangeKm, signalRatePerMin,
  towerSpacingKm, towerCount, messageTimeMin, errorRate,
  flagAngle, crewPerTower, semaphoreSystems,
} from "../semaphore-calc.js";

describe("armPositions", () => {
  it("returns 8", () => {
    expect(armPositions()).toBe(8);
  });
});

describe("signalCombinations", () => {
  it("8^2 = 64", () => {
    expect(signalCombinations(8, 2)).toBe(64);
  });
});

describe("maxRangeKm", () => {
  it("clear farther than foggy", () => {
    expect(maxRangeKm(3, "clear")).toBeGreaterThan(maxRangeKm(3, "foggy"));
  });
});

describe("signalRatePerMin", () => {
  it("expert fastest", () => {
    expect(signalRatePerMin("expert")).toBeGreaterThan(signalRatePerMin("novice"));
  });
});

describe("towerSpacingKm", () => {
  it("positive km", () => {
    expect(towerSpacingKm(3)).toBeGreaterThan(0);
  });
});

describe("towerCount", () => {
  it("positive count", () => {
    expect(towerCount(50, 10)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(towerCount(50, 0)).toBe(0);
  });
});

describe("messageTimeMin", () => {
  it("positive time", () => {
    expect(messageTimeMin(20, 5, 3)).toBeGreaterThan(0);
  });
  it("zero rate = 0", () => {
    expect(messageTimeMin(20, 0, 3)).toBe(0);
  });
});

describe("errorRate", () => {
  it("foggy higher error", () => {
    expect(errorRate("foggy", 5)).toBeGreaterThan(errorRate("clear", 5));
  });
});

describe("flagAngle", () => {
  it("position 0 = 0 deg", () => {
    expect(flagAngle(0)).toBe(0);
  });
  it("position 2 = 90 deg", () => {
    expect(flagAngle(2)).toBe(90);
  });
});

describe("crewPerTower", () => {
  it("flag needs 2", () => {
    expect(crewPerTower("flag")).toBe(2);
  });
});

describe("semaphoreSystems", () => {
  it("returns 4 systems", () => {
    expect(semaphoreSystems()).toHaveLength(4);
  });
});
