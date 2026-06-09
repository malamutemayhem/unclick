import { describe, expect, it } from "vitest";

import {
  flipCoin,
  generateLoremIpsum,
  generateRandomNumber,
  generateRandomString,
  generateUuid,
  pickRandomFromList,
  rollDice,
  shuffleList,
} from "./random-tool.js";

describe("random connector (L2)", () => {
  // ── generate_uuid ──────────────────────────────────────────────────────────

  it("generates a valid v4 UUID", () => {
    const r = generateUuid({}) as Record<string, unknown>;
    expect(r.version).toBe(4);
    expect(r.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  // ── generate_random_number ─────────────────────────────────────────────────

  it("generates a number within the default range", () => {
    const r = generateRandomNumber({}) as Record<string, unknown>;
    expect(r.min).toBe(1);
    expect(r.max).toBe(100);
    expect(r.count).toBe(1);
    expect(r.type).toBe("integer");
    expect(typeof r.single).toBe("number");
  });

  it("returns an error when min > max", () => {
    const r = generateRandomNumber({ min: 10, max: 5 }) as Record<string, unknown>;
    expect(r.error).toMatch(/min must be less than or equal to max/i);
  });

  it("returns an error when min/max are NaN", () => {
    const r = generateRandomNumber({ min: "abc", max: 5 }) as Record<string, unknown>;
    expect(r.error).toMatch(/must be numbers/i);
  });

  it("respects count and caps at 100", () => {
    const r = generateRandomNumber({ min: 1, max: 10, count: 5 }) as Record<string, unknown>;
    expect((r as any).numbers).toHaveLength(5);
    const r2 = generateRandomNumber({ min: 1, max: 10, count: 999 }) as Record<string, unknown>;
    expect((r2 as any).numbers).toHaveLength(100);
  });

  // ── generate_random_string ─────────────────────────────────────────────────

  it("generates a string of default length with alphanumeric charset", () => {
    const r = generateRandomString({}) as Record<string, unknown>;
    expect(r.length).toBe(16);
    expect(r.charset).toBe("alphanumeric");
    expect(typeof r.result).toBe("string");
    expect((r.result as string).length).toBe(16);
  });

  it("returns an error for unsupported charset", () => {
    const r = generateRandomString({ charset: "emoji" }) as Record<string, unknown>;
    expect(r.error).toMatch(/not supported/i);
    expect(r.supported).toBeDefined();
  });

  it("generates hex strings correctly", () => {
    const r = generateRandomString({ length: 32, charset: "hex" }) as Record<string, unknown>;
    expect((r.result as string)).toMatch(/^[0-9a-f]{32}$/);
  });

  // ── pick_random_from_list ──────────────────────────────────────────────────

  it("picks from a list", () => {
    const r = pickRandomFromList({ items: ["a", "b", "c"] }) as Record<string, unknown>;
    expect(r.total_items).toBe(3);
    expect(r.count_requested).toBe(1);
    expect(["a", "b", "c"]).toContain(r.single);
  });

  it("returns an error when items is not an array", () => {
    const r = pickRandomFromList({ items: "not an array" }) as Record<string, unknown>;
    expect(r.error).toMatch(/must be an array/i);
  });

  it("returns an error when items is empty", () => {
    const r = pickRandomFromList({ items: [] }) as Record<string, unknown>;
    expect(r.error).toMatch(/empty/i);
  });

  // ── flip_coin ──────────────────────────────────────────────────────────────

  it("flips a coin with valid result", () => {
    const r = flipCoin({}) as Record<string, unknown>;
    expect(r.count).toBe(1);
    expect(["heads", "tails"]).toContain(r.result);
    expect((r.heads as number) + (r.tails as number)).toBe(1);
  });

  it("flips multiple coins with correct totals", () => {
    const r = flipCoin({ count: 10 }) as Record<string, unknown>;
    expect(r.count).toBe(10);
    expect((r.heads as number) + (r.tails as number)).toBe(10);
    expect(r.result).toBeUndefined();
    expect((r.results as string[])).toHaveLength(10);
  });

  // ── roll_dice ──────────────────────────────────────────────────────────────

  it("rolls a d6 by default", () => {
    const r = rollDice({}) as Record<string, unknown>;
    expect(r.sides).toBe(6);
    expect(r.count).toBe(1);
    expect(r.dice).toBe("1d6");
    const rolls = r.rolls as number[];
    expect(rolls).toHaveLength(1);
    expect(rolls[0]).toBeGreaterThanOrEqual(1);
    expect(rolls[0]).toBeLessThanOrEqual(6);
  });

  it("returns an error for invalid die sides", () => {
    const r = rollDice({ sides: 7 }) as Record<string, unknown>;
    expect(r.error).toMatch(/sides must be one of/i);
  });

  it("rolls multiple d20s correctly", () => {
    const r = rollDice({ sides: 20, count: 5 }) as Record<string, unknown>;
    expect(r.dice).toBe("5d20");
    expect((r.rolls as number[])).toHaveLength(5);
    for (const roll of r.rolls as number[]) {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(20);
    }
    expect(r.total).toBe((r.rolls as number[]).reduce((a, b) => a + b, 0));
  });

  // ── shuffle_list ───────────────────────────────────────────────────────────

  it("shuffles a list preserving all elements", () => {
    const r = shuffleList({ items: [1, 2, 3, 4, 5] }) as Record<string, unknown>;
    expect(r.original_length).toBe(5);
    expect((r.shuffled as number[]).sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns an error when items is not an array", () => {
    const r = shuffleList({ items: "nope" }) as Record<string, unknown>;
    expect(r.error).toMatch(/must be an array/i);
  });

  it("handles an empty array", () => {
    const r = shuffleList({ items: [] }) as Record<string, unknown>;
    expect((r as any).shuffled).toEqual([]);
  });

  // ── generate_lorem_ipsum ───────────────────────────────────────────────────

  it("generates lorem ipsum with classic opener", () => {
    const r = generateLoremIpsum({}) as Record<string, unknown>;
    expect(r.paragraphs).toBe(1);
    expect((r.text as string)).toMatch(/^Lorem ipsum dolor sit amet/);
    expect((r.paragraph_array as string[])).toHaveLength(1);
    expect(r.word_count).toBeGreaterThan(0);
  });

  it("generates multiple paragraphs", () => {
    const r = generateLoremIpsum({ paragraphs: 3 }) as Record<string, unknown>;
    expect(r.paragraphs).toBe(3);
    expect((r.paragraph_array as string[])).toHaveLength(3);
    expect((r.text as string)).toContain("\n\n");
  });
});
