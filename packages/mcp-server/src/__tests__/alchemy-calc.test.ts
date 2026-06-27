import { describe, it, expect } from "vitest";
import {
  calcination, dissolution, separation, conjunction,
  fermentation, distillation, coagulation, sublimation,
  philosopherStoneSteps, elementalBalance, elements,
} from "../alchemy-calc.js";

describe("calcination", () => {
  it("positive result", () => {
    expect(calcination(500, 10)).toBeGreaterThan(0);
  });
});

describe("dissolution", () => {
  it("positive concentration", () => {
    expect(dissolution(10, 100)).toBeGreaterThan(0);
  });
  it("zero solvent = 0", () => {
    expect(dissolution(10, 0)).toBe(0);
  });
});

describe("separation", () => {
  it("fraction of mixture", () => {
    expect(separation(100, 80)).toBe(80);
  });
});

describe("conjunction", () => {
  it("weighted blend", () => {
    expect(conjunction(100, 50, 0.5)).toBe(75);
  });
});

describe("fermentation", () => {
  it("positive product", () => {
    expect(fermentation(100, 10, 48)).toBeGreaterThan(0);
  });
});

describe("distillation", () => {
  it("zero below boiling", () => {
    expect(distillation(100, 100, 50)).toBe(0);
  });
  it("positive above boiling", () => {
    expect(distillation(100, 100, 150)).toBeGreaterThan(0);
  });
});

describe("coagulation", () => {
  it("true when hot and concentrated", () => {
    expect(coagulation(70, 15)).toBe(true);
  });
  it("false when cool", () => {
    expect(coagulation(50, 15)).toBe(false);
  });
});

describe("sublimation", () => {
  it("zero below temp", () => {
    expect(sublimation(100, 50, 100)).toBe(0);
  });
  it("positive above temp", () => {
    expect(sublimation(100, 150, 100)).toBeGreaterThan(0);
  });
});

describe("philosopherStoneSteps", () => {
  it("12 steps", () => {
    expect(philosopherStoneSteps()).toBe(12);
  });
});

describe("elementalBalance", () => {
  it("returns dominant element", () => {
    expect(elementalBalance({ earth: 1, water: 5, fire: 2, air: 3, aether: 0 })).toBe("water");
  });
});

describe("elements", () => {
  it("returns 5 elements", () => {
    expect(elements()).toHaveLength(5);
  });
});
