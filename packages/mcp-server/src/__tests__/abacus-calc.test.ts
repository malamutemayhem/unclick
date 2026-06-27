import { describe, it, expect } from "vitest";
import {
  rodCount, beadsPerRod, maxValue, totalBeads, placeValue,
  additionSteps, multiplicationSteps, complementOf5, complementOf10,
  frameDimensions, proficiencyLevel, learningHours, abacusTypes,
} from "../abacus-calc.js";

describe("rodCount", () => {
  it("soroban has 13 rods", () => {
    expect(rodCount("soroban")).toBe(13);
  });
});

describe("beadsPerRod", () => {
  it("soroban has 1 upper, 4 lower", () => {
    const b = beadsPerRod("soroban");
    expect(b.upper).toBe(1);
    expect(b.lower).toBe(4);
  });
  it("schoty has 10 lower", () => {
    expect(beadsPerRod("schoty").lower).toBe(10);
  });
});

describe("maxValue", () => {
  it("3 rods = 999", () => {
    expect(maxValue(3)).toBe(999);
  });
});

describe("totalBeads", () => {
  it("soroban = 65", () => {
    expect(totalBeads("soroban")).toBe(65);
  });
});

describe("placeValue", () => {
  it("rod 0 = 1", () => {
    expect(placeValue(0)).toBe(1);
  });
  it("rod 3 = 1000", () => {
    expect(placeValue(3)).toBe(1000);
  });
});

describe("additionSteps", () => {
  it("positive steps", () => {
    expect(additionSteps(123, 456)).toBeGreaterThan(0);
  });
});

describe("multiplicationSteps", () => {
  it("2 digit x 3 digit = 6 steps", () => {
    expect(multiplicationSteps(12, 345)).toBe(6);
  });
});

describe("complementOf5", () => {
  it("3 -> 2", () => {
    expect(complementOf5(3)).toBe(2);
  });
});

describe("complementOf10", () => {
  it("7 -> 3", () => {
    expect(complementOf10(7)).toBe(3);
  });
});

describe("frameDimensions", () => {
  it("positive dimensions", () => {
    const d = frameDimensions(13, 10);
    expect(d.widthCm).toBeGreaterThan(0);
    expect(d.heightCm).toBeGreaterThan(0);
  });
});

describe("proficiencyLevel", () => {
  it("20+ = master", () => {
    expect(proficiencyLevel(25)).toBe("master");
  });
  it("2 = beginner", () => {
    expect(proficiencyLevel(2)).toBe("beginner");
  });
});

describe("learningHours", () => {
  it("schoty easiest to learn", () => {
    expect(learningHours("schoty")).toBeLessThan(learningHours("suanpan"));
  });
});

describe("abacusTypes", () => {
  it("returns 5 types", () => {
    expect(abacusTypes()).toHaveLength(5);
  });
});
