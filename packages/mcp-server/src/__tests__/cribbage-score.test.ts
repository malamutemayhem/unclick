import { describe, it, expect } from "vitest";
import {
  cardValue, cardOrder, createCard, parseCard, formatCard,
  countFifteens, countPairs, countRuns, countFlush, countNobs,
  scoreHand, pegPoints, maxPossibleHandScore, bestDiscard,
} from "../cribbage-score.js";

describe("cardValue / cardOrder", () => {
  it("ace is 1", () => {
    expect(cardValue(createCard("A", "H"))).toBe(1);
  });

  it("face cards are 10", () => {
    expect(cardValue(createCard("K", "S"))).toBe(10);
    expect(cardValue(createCard("Q", "D"))).toBe(10);
  });

  it("order of jack is 11", () => {
    expect(cardOrder(createCard("J", "H"))).toBe(11);
  });
});

describe("parseCard / formatCard", () => {
  it("round-trips", () => {
    const card = parseCard("5H");
    expect(formatCard(card)).toBe("5H");
  });
});

describe("countFifteens", () => {
  it("two cards making 15", () => {
    const cards = [createCard("5", "H"), createCard("T", "D")];
    expect(countFifteens(cards)).toBe(2);
  });

  it("no fifteens", () => {
    const cards = [createCard("A", "H"), createCard("2", "D")];
    expect(countFifteens(cards)).toBe(0);
  });
});

describe("countPairs", () => {
  it("one pair", () => {
    const cards = [createCard("5", "H"), createCard("5", "D")];
    expect(countPairs(cards)).toBe(2);
  });

  it("three of a kind = 3 pairs", () => {
    const cards = [createCard("5", "H"), createCard("5", "D"), createCard("5", "C")];
    expect(countPairs(cards)).toBe(6);
  });
});

describe("countRuns", () => {
  it("3-card run", () => {
    const cards = [createCard("3", "H"), createCard("4", "D"), createCard("5", "C")];
    expect(countRuns(cards)).toBe(3);
  });

  it("double run", () => {
    const cards = [createCard("3", "H"), createCard("3", "D"), createCard("4", "C"), createCard("5", "S")];
    expect(countRuns(cards)).toBe(6);
  });
});

describe("countFlush", () => {
  it("4-card flush", () => {
    const hand = [createCard("2", "H"), createCard("5", "H"), createCard("7", "H"), createCard("9", "H")];
    expect(countFlush(hand, createCard("K", "D"), false)).toBe(4);
  });

  it("5-card flush with starter", () => {
    const hand = [createCard("2", "H"), createCard("5", "H"), createCard("7", "H"), createCard("9", "H")];
    expect(countFlush(hand, createCard("K", "H"), false)).toBe(5);
  });

  it("no flush in crib without 5", () => {
    const hand = [createCard("2", "H"), createCard("5", "H"), createCard("7", "H"), createCard("9", "H")];
    expect(countFlush(hand, createCard("K", "D"), true)).toBe(0);
  });
});

describe("countNobs", () => {
  it("nobs when jack matches starter suit", () => {
    const hand = [createCard("J", "H"), createCard("5", "D")];
    expect(countNobs(hand, createCard("K", "H"))).toBe(1);
  });

  it("no nobs when suits differ", () => {
    const hand = [createCard("J", "H"), createCard("5", "D")];
    expect(countNobs(hand, createCard("K", "D"))).toBe(0);
  });
});

describe("scoreHand", () => {
  it("scores a known hand", () => {
    const hand = [createCard("5", "H"), createCard("5", "D"), createCard("5", "C"), createCard("J", "S")];
    const starter = createCard("5", "S");
    const result = scoreHand(hand, starter);
    expect(result.total).toBe(29);
  });

  it("empty fifteens/pairs/runs", () => {
    const hand = [createCard("A", "H"), createCard("3", "D"), createCard("7", "C"), createCard("9", "S")];
    const starter = createCard("K", "H");
    const result = scoreHand(hand, starter);
    expect(result.total).toBeGreaterThanOrEqual(0);
  });
});

describe("pegPoints", () => {
  it("scores 15", () => {
    const played = [createCard("5", "H"), createCard("T", "D")];
    expect(pegPoints(played)).toBe(2);
  });

  it("scores pair", () => {
    const played = [createCard("5", "H"), createCard("5", "D")];
    expect(pegPoints(played)).toBe(2);
  });
});

describe("maxPossibleHandScore", () => {
  it("is 29", () => {
    expect(maxPossibleHandScore()).toBe(29);
  });
});

describe("bestDiscard", () => {
  it("returns keep and discard arrays", () => {
    const hand = [createCard("5", "H"), createCard("5", "D"), createCard("5", "C"), createCard("J", "S"), createCard("2", "H"), createCard("7", "D")];
    const result = bestDiscard(hand);
    expect(result.keep.length).toBe(4);
    expect(result.discard.length).toBe(2);
  });
});
