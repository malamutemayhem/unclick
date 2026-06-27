import { describe, it, expect } from "vitest";
import { randomInt, randomFloat, randomElement, randomElements, shuffle, weightedRandom, randomString, randomColor, coinFlip, diceRoll, gaussian } from "../random.js";

describe("random", () => {
  it("randomInt in range", () => {
    for (let i = 0; i < 50; i++) {
      const v = randomInt(1, 10);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(10);
      expect(Number.isInteger(v)).toBe(true);
    }
  });
  it("randomFloat in range", () => {
    const v = randomFloat(0, 1);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(1);
  });
  it("randomElement returns item from array", () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(randomElement(arr));
  });
  it("randomElement undefined for empty", () => {
    expect(randomElement([])).toBeUndefined();
  });
  it("randomElements returns subset", () => {
    const result = randomElements([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
    result.forEach((v) => expect([1, 2, 3, 4, 5]).toContain(v));
  });
  it("shuffle returns same elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const s = shuffle(arr);
    expect(s.sort()).toEqual([1, 2, 3, 4, 5]);
  });
  it("shuffle does not mutate original", () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr).toEqual([1, 2, 3]);
  });
  it("weightedRandom returns from items", () => {
    const items = [{ value: "a", weight: 1 }, { value: "b", weight: 99 }];
    const v = weightedRandom(items);
    expect(["a", "b"]).toContain(v);
  });
  it("weightedRandom undefined for empty", () => {
    expect(weightedRandom([])).toBeUndefined();
  });
  it("randomString generates correct length", () => {
    expect(randomString(10)).toHaveLength(10);
  });
  it("randomColor returns hex", () => {
    expect(randomColor()).toMatch(/^#[0-9a-f]{6}$/);
  });
  it("coinFlip returns boolean", () => {
    expect(typeof coinFlip()).toBe("boolean");
  });
  it("diceRoll in range", () => {
    const v = diceRoll();
    expect(v).toBeGreaterThanOrEqual(1);
    expect(v).toBeLessThanOrEqual(6);
  });
  it("gaussian returns number", () => {
    expect(typeof gaussian()).toBe("number");
  });
});
