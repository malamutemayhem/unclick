import { describe, it, expect } from "vitest";
import { Deck, Hand } from "../card-deck.js";

describe("Deck", () => {
  it("creates standard 52-card deck", () => {
    const deck = new Deck();
    expect(deck.remaining()).toBe(52);
  });

  it("creates multi-deck", () => {
    const deck = new Deck(2);
    expect(deck.remaining()).toBe(104);
  });

  it("draws cards from top", () => {
    const deck = new Deck();
    const card = deck.draw();
    expect(card).toBeDefined();
    expect(deck.remaining()).toBe(51);
  });

  it("draws many cards", () => {
    const deck = new Deck();
    const cards = deck.drawMany(5);
    expect(cards.length).toBe(5);
    expect(deck.remaining()).toBe(47);
  });

  it("peeks without removing", () => {
    const deck = new Deck();
    const peeked = deck.peek();
    expect(peeked).toBeDefined();
    expect(deck.remaining()).toBe(52);
  });

  it("shuffles the deck", () => {
    const deck = new Deck();
    const before = deck.toArray().map((c) => `${c.rank}${c.suit}`).join(",");
    deck.shuffle();
    const after = deck.toArray().map((c) => `${c.rank}${c.suit}`).join(",");
    expect(after).not.toBe(before);
  });

  it("adds cards to top and bottom", () => {
    const deck = new Deck();
    const card = deck.draw()!;
    deck.addToBottom(card);
    expect(deck.remaining()).toBe(52);
  });

  it("cuts the deck", () => {
    const deck = new Deck();
    const topBefore = deck.peek();
    deck.cut(10);
    const topAfter = deck.peek();
    expect(topAfter).not.toEqual(topBefore);
  });

  it("resets the deck", () => {
    const deck = new Deck();
    deck.drawMany(20);
    deck.reset();
    expect(deck.remaining()).toBe(52);
  });

  it("computes card value and name", () => {
    const card = { suit: "hearts" as const, rank: "A" as const };
    expect(Deck.cardValue(card)).toBe(14);
    expect(Deck.cardName(card)).toBe("A of hearts");
  });

  it("reports empty", () => {
    const deck = new Deck();
    deck.drawMany(52);
    expect(deck.isEmpty()).toBe(true);
  });
});

describe("Hand", () => {
  it("adds and gets cards", () => {
    const hand = new Hand();
    hand.add({ suit: "spades", rank: "K" });
    expect(hand.size()).toBe(1);
    expect(hand.get(0)!.rank).toBe("K");
  });

  it("removes cards", () => {
    const hand = new Hand();
    hand.add({ suit: "hearts", rank: "5" });
    hand.add({ suit: "clubs", rank: "10" });
    const removed = hand.remove(0);
    expect(removed!.rank).toBe("5");
    expect(hand.size()).toBe(1);
  });

  it("sorts by value", () => {
    const hand = new Hand();
    hand.add({ suit: "hearts", rank: "A" });
    hand.add({ suit: "clubs", rank: "2" });
    hand.add({ suit: "diamonds", rank: "K" });
    hand.sort();
    expect(hand.get(0)!.rank).toBe("2");
    expect(hand.get(2)!.rank).toBe("A");
  });

  it("clears and returns all cards", () => {
    const hand = new Hand();
    hand.add({ suit: "hearts", rank: "3" });
    hand.add({ suit: "clubs", rank: "7" });
    const all = hand.clear();
    expect(all.length).toBe(2);
    expect(hand.size()).toBe(0);
  });

  it("generates string representation", () => {
    const hand = new Hand();
    hand.add({ suit: "hearts", rank: "A" });
    expect(hand.toString()).toBe("A of hearts");
  });
});
