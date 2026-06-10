import { describe, it, expect } from "vitest";
import {
  grillWeight, liftForceN, chainStrength, liftTimeS,
  counterweightKg, grooveDepthCm, murderHoleCount,
  winchTurns, dropTimeS, gateMethods,
} from "../portcullis-calc.js";

describe("grillWeight", () => {
  it("positive kg", () => {
    expect(grillWeight(3, 3, 5)).toBeGreaterThan(0);
  });
});

describe("liftForceN", () => {
  it("more than weight x g", () => {
    expect(liftForceN(500, 0.1)).toBeGreaterThan(500 * 9.81);
  });
});

describe("chainStrength", () => {
  it("safety factor applied", () => {
    expect(chainStrength(500, 3)).toBeGreaterThan(chainStrength(500, 1));
  });
});

describe("liftTimeS", () => {
  it("positive seconds", () => {
    expect(liftTimeS(3, 0.1)).toBeGreaterThan(0);
  });
  it("zero speed = 0", () => {
    expect(liftTimeS(3, 0)).toBe(0);
  });
});

describe("counterweightKg", () => {
  it("heavier with low efficiency", () => {
    expect(counterweightKg(500, 0.5)).toBeGreaterThan(counterweightKg(500, 0.9));
  });
  it("zero efficiency = 0", () => {
    expect(counterweightKg(500, 0)).toBe(0);
  });
});

describe("grooveDepthCm", () => {
  it("1.5x bar diameter", () => {
    expect(grooveDepthCm(5)).toBe(7.5);
  });
});

describe("murderHoleCount", () => {
  it("positive count", () => {
    expect(murderHoleCount(6, 2)).toBe(3);
  });
  it("zero spacing = 0", () => {
    expect(murderHoleCount(6, 0)).toBe(0);
  });
});

describe("winchTurns", () => {
  it("positive turns", () => {
    expect(winchTurns(3, 30)).toBeGreaterThan(0);
  });
  it("zero drum = 0", () => {
    expect(winchTurns(3, 0)).toBe(0);
  });
});

describe("dropTimeS", () => {
  it("positive seconds", () => {
    expect(dropTimeS(3)).toBeGreaterThan(0);
  });
});

describe("gateMethods", () => {
  it("returns 4 methods", () => {
    expect(gateMethods()).toHaveLength(4);
  });
});
