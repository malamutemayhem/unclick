import { describe, it, expect } from "vitest";
import { DiceRoller } from "../dice-roller.js";

describe("DiceRoller", () => {
  it("roll returns valid results", () => {
    const result = DiceRoller.roll(6);
    expect(result.rolls.length).toBe(1);
    expect(result.total).toBeGreaterThanOrEqual(1);
    expect(result.total).toBeLessThanOrEqual(6);
  });

  it("roll multiple dice", () => {
    const result = DiceRoller.roll(6, 3);
    expect(result.rolls.length).toBe(3);
    expect(result.total).toBeGreaterThanOrEqual(3);
    expect(result.total).toBeLessThanOrEqual(18);
  });

  it("parse handles standard notation", () => {
    const result = DiceRoller.parse("2d6");
    expect(result.rolls.length).toBe(2);
    expect(result.total).toBeGreaterThanOrEqual(2);
    expect(result.total).toBeLessThanOrEqual(12);
  });

  it("parse handles modifier", () => {
    const result = DiceRoller.parse("1d6+5");
    expect(result.total).toBeGreaterThanOrEqual(6);
    expect(result.total).toBeLessThanOrEqual(11);
  });

  it("parse throws on invalid notation", () => {
    expect(() => DiceRoller.parse("bad")).toThrow();
  });

  it("probability for single die", () => {
    expect(DiceRoller.probability(6, 3)).toBeCloseTo(1 / 6, 4);
    expect(DiceRoller.probability(6, 7)).toBe(0);
    expect(DiceRoller.probability(6, 0)).toBe(0);
  });

  it("probability for multiple dice", () => {
    const p7 = DiceRoller.probability(6, 7, 2);
    expect(p7).toBeCloseTo(6 / 36, 3);
  });

  it("expectedValue calculates correctly", () => {
    expect(DiceRoller.expectedValue(6, 1)).toBe(3.5);
    expect(DiceRoller.expectedValue(6, 2)).toBe(7);
  });

  it("distribution sums to 1", () => {
    const dist = DiceRoller.distribution(6, 2);
    const totalProb = dist.reduce((s, d) => s + d.probability, 0);
    expect(totalProb).toBeCloseTo(1, 2);
    expect(dist.length).toBe(11);
  });

  it("advantage keeps higher roll", () => {
    const result = DiceRoller.advantage(20);
    expect(result.rolls.length).toBe(2);
    expect(result.total).toBe(Math.max(...result.rolls));
  });

  it("disadvantage keeps lower roll", () => {
    const result = DiceRoller.disadvantage(20);
    expect(result.rolls.length).toBe(2);
    expect(result.total).toBe(Math.min(...result.rolls));
  });

  it("dropLowest removes lowest dice", () => {
    const result = DiceRoller.dropLowest(6, 4, 1);
    expect(result.rolls.length).toBe(4);
  });

  it("exploding can produce extra rolls", () => {
    const result = DiceRoller.exploding(6, 5);
    expect(result.rolls.length).toBeGreaterThanOrEqual(5);
    expect(result.total).toBeGreaterThanOrEqual(5);
  });
});
