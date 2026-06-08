import { describe, it, expect } from "vitest";
import { PokerEvaluator } from "../poker-hand.js";
import type { Card } from "../card-deck.js";

function cards(...specs: string[]): Card[] {
  return specs.map((s) => {
    const rank = s.slice(0, -1) as Card["rank"];
    const suitMap: Record<string, Card["suit"]> = {
      h: "hearts", d: "diamonds", c: "clubs", s: "spades",
    };
    return { rank, suit: suitMap[s.slice(-1)] };
  });
}

describe("PokerEvaluator", () => {
  it("detects royal flush", () => {
    const hand = cards("10h", "Jh", "Qh", "Kh", "Ah");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("royal-flush");
  });

  it("detects straight flush", () => {
    const hand = cards("5d", "6d", "7d", "8d", "9d");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("straight-flush");
  });

  it("detects four of a kind", () => {
    const hand = cards("Kh", "Kd", "Kc", "Ks", "2h");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("four-of-a-kind");
  });

  it("detects full house", () => {
    const hand = cards("Ah", "Ad", "Ac", "Kh", "Kd");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("full-house");
  });

  it("detects flush", () => {
    const hand = cards("2h", "5h", "8h", "Jh", "Ah");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("flush");
  });

  it("detects straight", () => {
    const hand = cards("4h", "5d", "6c", "7s", "8h");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("straight");
  });

  it("detects three of a kind", () => {
    const hand = cards("9h", "9d", "9c", "Kh", "2s");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("three-of-a-kind");
  });

  it("detects two pair", () => {
    const hand = cards("Jh", "Jd", "5c", "5s", "2h");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("two-pair");
  });

  it("detects one pair", () => {
    const hand = cards("Ah", "Ad", "Kc", "Qs", "Jh");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("one-pair");
  });

  it("detects high card", () => {
    const hand = cards("2h", "5d", "8c", "Js", "Ah");
    expect(PokerEvaluator.evaluate(hand).rank).toBe("high-card");
  });

  it("compares hands correctly", () => {
    const flush = cards("2h", "5h", "8h", "Jh", "Ah");
    const pair = cards("Ah", "Ad", "Kc", "Qs", "Jh");
    expect(PokerEvaluator.compare(flush, pair)).toBeGreaterThan(0);
  });

  it("returns hand rank value", () => {
    expect(PokerEvaluator.handRankValue("royal-flush")).toBe(9);
    expect(PokerEvaluator.handRankValue("high-card")).toBe(0);
  });
});
