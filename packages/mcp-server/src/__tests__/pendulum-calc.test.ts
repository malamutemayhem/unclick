import { describe, it, expect } from "vitest";
import {
  period, frequency, lengthFromPeriod, maxVelocity,
  maxAcceleration, energy, dampingTime, foucaultRotation,
  foucaultFullRotation, bobWeight, stringTension, ticksPerDay,
  pendulumTypes,
} from "../pendulum-calc.js";

describe("period", () => {
  it("1m ~ 2 seconds", () => {
    expect(period(1)).toBeCloseTo(2.006, 1);
  });
  it("longer = slower", () => {
    expect(period(4)).toBeGreaterThan(period(1));
  });
});

describe("frequency", () => {
  it("inverse of period", () => {
    expect(frequency(2)).toBe(0.5);
  });
  it("zero period returns 0", () => {
    expect(frequency(0)).toBe(0);
  });
});

describe("lengthFromPeriod", () => {
  it("round trip with period", () => {
    const len = 1;
    const p = period(len);
    expect(lengthFromPeriod(p)).toBeCloseTo(len, 2);
  });
});

describe("maxVelocity", () => {
  it("positive m/s", () => {
    expect(maxVelocity(1, 10)).toBeGreaterThan(0);
  });
});

describe("maxAcceleration", () => {
  it("positive m/s2", () => {
    expect(maxAcceleration(1, 10)).toBeGreaterThan(0);
  });
});

describe("energy", () => {
  it("positive joules", () => {
    expect(energy(1, 1, 10)).toBeGreaterThan(0);
  });
});

describe("dampingTime", () => {
  it("higher Q = longer damping", () => {
    expect(dampingTime(2, 100)).toBeGreaterThan(dampingTime(2, 10));
  });
});

describe("foucaultRotation", () => {
  it("positive at non-zero latitude", () => {
    expect(foucaultRotation(45, 1)).toBeGreaterThan(0);
  });
});

describe("foucaultFullRotation", () => {
  it("24 hours at pole", () => {
    expect(foucaultFullRotation(90)).toBeCloseTo(24, 0);
  });
  it("equator = infinity", () => {
    expect(foucaultFullRotation(0)).toBe(Infinity);
  });
});

describe("bobWeight", () => {
  it("positive kg", () => {
    expect(bobWeight(1)).toBeGreaterThan(0);
  });
});

describe("stringTension", () => {
  it("returns number", () => {
    expect(typeof stringTension(1, 10)).toBe("number");
  });
});

describe("ticksPerDay", () => {
  it("positive ticks", () => {
    expect(ticksPerDay(2)).toBeGreaterThan(0);
  });
  it("zero period returns 0", () => {
    expect(ticksPerDay(0)).toBe(0);
  });
});

describe("pendulumTypes", () => {
  it("returns 6 types", () => {
    expect(pendulumTypes()).toHaveLength(6);
  });
});
