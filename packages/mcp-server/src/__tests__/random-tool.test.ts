import { describe, expect, it } from "vitest";

import {
  generateUuid,
  generateRandomNumber,
  generateRandomString,
  pickRandomFromList,
  flipCoin,
  rollDice,
  shuffleList,
  generateLoremIpsum,
} from "../random-tool.js";

describe("generateUuid", () => {
  it("returns a valid v4 UUID format", () => {
    const result = generateUuid({}) as any;
    expect(result.uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(result.version).toBe(4);
  });

  it("generates unique UUIDs", () => {
    const a = (generateUuid({}) as any).uuid;
    const b = (generateUuid({}) as any).uuid;
    expect(a).not.toBe(b);
  });
});

describe("generateRandomNumber", () => {
  it("returns a number within the default range", () => {
    const result = generateRandomNumber({}) as any;
    expect(result.min).toBe(1);
    expect(result.max).toBe(100);
    expect(result.numbers[0]).toBeGreaterThanOrEqual(1);
    expect(result.numbers[0]).toBeLessThanOrEqual(100);
  });

  it("returns integers when min and max are integers", () => {
    const result = generateRandomNumber({ min: 1, max: 10, count: 5 }) as any;
    expect(result.type).toBe("integer");
    for (const n of result.numbers) {
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(10);
    }
  });

  it("returns error when min > max", () => {
    const result = generateRandomNumber({ min: 10, max: 5 }) as any;
    expect(result.error).toBeTruthy();
  });

  it("returns single when count is 1", () => {
    const result = generateRandomNumber({ count: 1 }) as any;
    expect(result.single).toBeDefined();
    expect(result.count).toBe(1);
  });

  it("clamps count to at most 100", () => {
    const result = generateRandomNumber({ count: 200 }) as any;
    expect(result.count).toBe(100);
  });
});

describe("generateRandomString", () => {
  it("generates a string of the requested length", () => {
    const result = generateRandomString({ length: 32 }) as any;
    expect(result.result).toHaveLength(32);
    expect(result.length).toBe(32);
  });

  it("defaults to alphanumeric charset", () => {
    const result = generateRandomString({}) as any;
    expect(result.charset).toBe("alphanumeric");
    expect(result.result).toMatch(/^[A-Za-z0-9]+$/);
  });

  it("supports hex charset", () => {
    const result = generateRandomString({ charset: "hex", length: 20 }) as any;
    expect(result.result).toMatch(/^[0-9a-f]+$/);
  });

  it("returns error for unsupported charset", () => {
    const result = generateRandomString({ charset: "emoji" }) as any;
    expect(result.error).toBeTruthy();
    expect(result.supported).toContain("alphanumeric");
  });

  it("clamps length to max 1000", () => {
    const result = generateRandomString({ length: 5000 }) as any;
    expect(result.length).toBe(1000);
  });
});

describe("pickRandomFromList", () => {
  it("picks one item by default", () => {
    const result = pickRandomFromList({ items: [1, 2, 3] }) as any;
    expect(result.count_requested).toBe(1);
    expect(result.single).toBeDefined();
    expect([1, 2, 3]).toContain(result.single);
  });

  it("picks multiple items without replacement", () => {
    const result = pickRandomFromList({ items: [1, 2, 3, 4, 5], count: 3 }) as any;
    expect(result.picked).toHaveLength(3);
    const unique = new Set(result.picked);
    expect(unique.size).toBe(3);
  });

  it("returns error for non-array items", () => {
    const result = pickRandomFromList({ items: "not an array" }) as any;
    expect(result.error).toBeTruthy();
  });

  it("returns error for empty array", () => {
    const result = pickRandomFromList({ items: [] }) as any;
    expect(result.error).toBeTruthy();
  });

  it("clamps count to array length", () => {
    const result = pickRandomFromList({ items: [1, 2], count: 10 }) as any;
    expect(result.count_requested).toBe(2);
  });
});

describe("flipCoin", () => {
  it("returns heads or tails for single flip", () => {
    const result = flipCoin({}) as any;
    expect(["heads", "tails"]).toContain(result.result);
    expect(result.count).toBe(1);
  });

  it("returns stats for multiple flips", () => {
    const result = flipCoin({ count: 100 }) as any;
    expect(result.count).toBe(100);
    expect(result.heads + result.tails).toBe(100);
    expect(result.results).toHaveLength(100);
    expect(result.heads_percent + result.tails_percent).toBeCloseTo(100, 0);
  });
});

describe("rollDice", () => {
  it("rolls a d6 by default", () => {
    const result = rollDice({}) as any;
    expect(result.sides).toBe(6);
    expect(result.count).toBe(1);
    expect(result.rolls[0]).toBeGreaterThanOrEqual(1);
    expect(result.rolls[0]).toBeLessThanOrEqual(6);
    expect(result.dice).toBe("1d6");
  });

  it("supports valid dice types", () => {
    for (const sides of [4, 6, 8, 10, 12, 20, 100]) {
      const result = rollDice({ sides, count: 3 }) as any;
      expect(result.sides).toBe(sides);
      for (const roll of result.rolls) {
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(sides);
      }
    }
  });

  it("returns error for invalid sides", () => {
    const result = rollDice({ sides: 7 }) as any;
    expect(result.error).toBeTruthy();
  });

  it("computes total and average", () => {
    const result = rollDice({ sides: 6, count: 3 }) as any;
    expect(result.total).toBe(result.rolls.reduce((a: number, b: number) => a + b, 0));
    expect(result.average).toBeCloseTo(result.total / 3, 1);
  });

  it("reports min and max possible", () => {
    const result = rollDice({ sides: 6, count: 2 }) as any;
    expect(result.min_possible).toBe(2);
    expect(result.max_possible).toBe(12);
  });
});

describe("shuffleList", () => {
  it("returns shuffled array of same length", () => {
    const items = [1, 2, 3, 4, 5];
    const result = shuffleList({ items }) as any;
    expect(result.shuffled).toHaveLength(5);
    expect(result.original_length).toBe(5);
    expect(result.shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns error for non-array items", () => {
    const result = shuffleList({ items: "string" }) as any;
    expect(result.error).toBeTruthy();
  });

  it("handles empty array", () => {
    const result = shuffleList({ items: [] }) as any;
    expect(result.shuffled).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const items = [1, 2, 3];
    shuffleList({ items });
    expect(items).toEqual([1, 2, 3]);
  });
});

describe("generateLoremIpsum", () => {
  it("starts with the classic opener", () => {
    const result = generateLoremIpsum({}) as any;
    expect(result.text).toMatch(/^Lorem ipsum dolor sit amet/);
  });

  it("generates requested number of paragraphs", () => {
    const result = generateLoremIpsum({ paragraphs: 3 }) as any;
    expect(result.paragraphs).toBe(3);
    expect(result.paragraph_array).toHaveLength(3);
  });

  it("separates paragraphs with double newlines", () => {
    const result = generateLoremIpsum({ paragraphs: 2 }) as any;
    expect(result.text).toContain("\n\n");
  });

  it("reports word count", () => {
    const result = generateLoremIpsum({}) as any;
    expect(result.word_count).toBeGreaterThan(0);
  });

  it("clamps paragraphs to max 10", () => {
    const result = generateLoremIpsum({ paragraphs: 20 }) as any;
    expect(result.paragraphs).toBe(10);
  });
});
