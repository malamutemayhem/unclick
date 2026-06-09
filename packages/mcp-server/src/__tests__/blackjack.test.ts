import { describe, it, expect } from "vitest";
import {
  createDeck, shuffleDeck, cardValue, handValue,
  isBust, isBlackjack, newGame, hit, stand,
  cardToString, handToString, gameStatus,
} from "../blackjack.js";

describe("createDeck", () => {
  it("creates 52 cards", () => {
    const deck = createDeck();
    expect(deck.length).toBe(52);
  });

  it("has 4 suits", () => {
    const deck = createDeck();
    const suits = new Set(deck.map(c => c.suit));
    expect(suits.size).toBe(4);
  });

  it("has 13 ranks per suit", () => {
    const deck = createDeck();
    const hearts = deck.filter(c => c.suit === "hearts");
    expect(hearts.length).toBe(13);
  });
});

describe("shuffleDeck", () => {
  it("returns same length", () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    expect(shuffled.length).toBe(52);
  });

  it("is deterministic with same seed", () => {
    const a = shuffleDeck(createDeck(), 123);
    const b = shuffleDeck(createDeck(), 123);
    expect(a.map(cardToString)).toEqual(b.map(cardToString));
  });
});

describe("cardValue", () => {
  it("returns 11 for ace", () => {
    expect(cardValue("A")).toBe(11);
  });

  it("returns 10 for face cards", () => {
    expect(cardValue("J")).toBe(10);
    expect(cardValue("Q")).toBe(10);
    expect(cardValue("K")).toBe(10);
  });

  it("returns number for number cards", () => {
    expect(cardValue("5")).toBe(5);
    expect(cardValue("10")).toBe(10);
  });
});

describe("handValue", () => {
  it("sums card values", () => {
    const hand = { cards: [{ rank: "5" as const, suit: "hearts" as const }, { rank: "K" as const, suit: "spades" as const }] };
    expect(handValue(hand)).toBe(15);
  });

  it("reduces ace from 11 to 1 when busting", () => {
    const hand = { cards: [
      { rank: "A" as const, suit: "hearts" as const },
      { rank: "9" as const, suit: "spades" as const },
      { rank: "5" as const, suit: "clubs" as const },
    ]};
    expect(handValue(hand)).toBe(15);
  });

  it("handles two aces", () => {
    const hand = { cards: [
      { rank: "A" as const, suit: "hearts" as const },
      { rank: "A" as const, suit: "spades" as const },
    ]};
    expect(handValue(hand)).toBe(12);
  });
});

describe("isBust", () => {
  it("detects bust", () => {
    const hand = { cards: [
      { rank: "K" as const, suit: "hearts" as const },
      { rank: "Q" as const, suit: "spades" as const },
      { rank: "5" as const, suit: "clubs" as const },
    ]};
    expect(isBust(hand)).toBe(true);
  });
});

describe("isBlackjack", () => {
  it("detects blackjack", () => {
    const hand = { cards: [
      { rank: "A" as const, suit: "hearts" as const },
      { rank: "K" as const, suit: "spades" as const },
    ]};
    expect(isBlackjack(hand)).toBe(true);
  });

  it("rejects non-blackjack 21", () => {
    const hand = { cards: [
      { rank: "7" as const, suit: "hearts" as const },
      { rank: "7" as const, suit: "spades" as const },
      { rank: "7" as const, suit: "clubs" as const },
    ]};
    expect(isBlackjack(hand)).toBe(false);
  });
});

describe("newGame", () => {
  it("deals 2 cards each", () => {
    const g = newGame();
    expect(g.player.cards.length).toBe(2);
    expect(g.dealer.cards.length).toBe(2);
  });

  it("starts in playing or done state", () => {
    const g = newGame();
    expect(["playing", "done"]).toContain(g.state);
  });
});

describe("hit", () => {
  it("adds card to player hand", () => {
    const g = newGame(100);
    if (g.state === "playing") {
      const card = hit(g);
      expect(card).not.toBeNull();
      expect(g.player.cards.length).toBe(3);
    }
  });

  it("returns null when not playing", () => {
    const g = newGame();
    g.state = "done";
    expect(hit(g)).toBeNull();
  });
});

describe("stand", () => {
  it("ends the game", () => {
    const g = newGame(100);
    if (g.state === "playing") {
      stand(g);
      expect(g.state).toBe("done");
      expect(g.result).not.toBeNull();
    }
  });

  it("dealer draws to 17+", () => {
    const g = newGame(100);
    if (g.state === "playing") {
      stand(g);
      expect(handValue(g.dealer)).toBeGreaterThanOrEqual(17);
    }
  });
});

describe("cardToString", () => {
  it("formats card", () => {
    expect(cardToString({ rank: "A", suit: "spades" })).toBe("AS");
    expect(cardToString({ rank: "10", suit: "hearts" })).toBe("10H");
  });
});

describe("gameStatus", () => {
  it("shows game info", () => {
    const g = newGame();
    const status = gameStatus(g);
    expect(status).toContain("Player:");
    expect(status).toContain("Dealer:");
  });
});
