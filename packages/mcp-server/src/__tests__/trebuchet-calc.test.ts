import { describe, it, expect } from "vitest";
import {
  counterweightMass, armLength, shortArmLength, longArmLength, slingLength,
  releaseAngle, launchVelocity, maxRange, flightTime, maxHeight,
  efficiency, projectileWeight, projectileTypes,
} from "../trebuchet-calc.js";

describe("counterweightMass", () => {
  it("default 100:1 ratio", () => {
    expect(counterweightMass(5)).toBe(500);
  });
  it("custom ratio", () => {
    expect(counterweightMass(5, 80)).toBe(400);
  });
});

describe("armLength", () => {
  it("3x pivot height", () => {
    expect(armLength(2)).toBe(6);
  });
});

describe("shortArmLength", () => {
  it("25% of total", () => {
    expect(shortArmLength(6)).toBe(1.5);
  });
});

describe("longArmLength", () => {
  it("75% of total", () => {
    expect(longArmLength(6)).toBe(4.5);
  });
});

describe("slingLength", () => {
  it("80% of long arm", () => {
    expect(slingLength(4.5)).toBe(3.6);
  });
});

describe("releaseAngle", () => {
  it("decreases with range", () => {
    expect(releaseAngle(100)).toBeLessThan(releaseAngle(50));
  });
});

describe("launchVelocity", () => {
  it("positive velocity", () => {
    expect(launchVelocity(100, 40)).toBeGreaterThan(0);
  });
  it("zero when sin2a <= 0", () => {
    expect(launchVelocity(100, 0)).toBe(0);
  });
});

describe("maxRange", () => {
  it("positive range", () => {
    expect(maxRange(30, 45)).toBeGreaterThan(0);
  });
});

describe("flightTime", () => {
  it("positive time", () => {
    expect(flightTime(30, 45)).toBeGreaterThan(0);
  });
});

describe("maxHeight", () => {
  it("positive height", () => {
    expect(maxHeight(30, 45)).toBeGreaterThan(0);
  });
});

describe("efficiency", () => {
  it("positive percent", () => {
    expect(efficiency(5, 500, 100, 5)).toBeGreaterThan(0);
  });
  it("zero height = 0", () => {
    expect(efficiency(5, 500, 100, 0)).toBe(0);
  });
});

describe("projectileWeight", () => {
  it("stone = 5 kg", () => {
    expect(projectileWeight("stone")).toBe(5);
  });
  it("tennis_ball = 0.06 kg", () => {
    expect(projectileWeight("tennis_ball")).toBe(0.06);
  });
});

describe("projectileTypes", () => {
  it("returns 5 types", () => {
    expect(projectileTypes()).toHaveLength(5);
  });
});
