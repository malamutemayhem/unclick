import { describe, it, expect } from "vitest";
import {
  pockets, houseEdge, payout, probability, expectedValue,
  kellyFraction, spinsPerHour, expectedLoss, isRed,
  hotNumbers, wheelTypes,
} from "../roulette-calc.js";

describe("pockets", () => {
  it("european has 37", () => {
    expect(pockets("european")).toBe(37);
  });
  it("american has 38", () => {
    expect(pockets("american")).toBe(38);
  });
});

describe("houseEdge", () => {
  it("french lowest", () => {
    expect(houseEdge("french")).toBeLessThan(houseEdge("european"));
  });
  it("american highest", () => {
    expect(houseEdge("american")).toBeGreaterThan(houseEdge("european"));
  });
});

describe("payout", () => {
  it("straight pays 35:1", () => {
    expect(payout("straight")).toBe(35);
  });
  it("red/black pays 1:1", () => {
    expect(payout("red_black")).toBe(1);
  });
});

describe("probability", () => {
  it("straight < dozen", () => {
    expect(probability("straight", "european")).toBeLessThan(probability("dozen", "european"));
  });
});

describe("expectedValue", () => {
  it("always negative", () => {
    expect(expectedValue(10, "straight", "european")).toBeLessThan(0);
  });
});

describe("kellyFraction", () => {
  it("0 for negative edge", () => {
    expect(kellyFraction(2.7, 35)).toBe(0);
  });
});

describe("spinsPerHour", () => {
  it("fast > slow", () => {
    expect(spinsPerHour("fast")).toBeGreaterThan(spinsPerHour("slow"));
  });
});

describe("expectedLoss", () => {
  it("positive loss", () => {
    expect(expectedLoss(10, 100, 2.7)).toBeGreaterThan(0);
  });
});

describe("isRed", () => {
  it("1 is red", () => {
    expect(isRed(1)).toBe(true);
  });
  it("2 is not red", () => {
    expect(isRed(2)).toBe(false);
  });
});

describe("hotNumbers", () => {
  it("returns most frequent", () => {
    const spins = [7, 7, 7, 14, 14, 3];
    expect(hotNumbers(spins, 2)).toEqual([7, 14]);
  });
});

describe("wheelTypes", () => {
  it("returns 3 types", () => {
    expect(wheelTypes()).toHaveLength(3);
  });
});
