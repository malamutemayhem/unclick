import { describe, it, expect } from "vitest";
import { EloRating } from "../elo-rating.js";

describe("EloRating", () => {
  it("expectedScore returns 0.5 for equal ratings", () => {
    expect(EloRating.expectedScore(1500, 1500)).toBe(0.5);
  });

  it("expectedScore favors higher-rated player", () => {
    const score = EloRating.expectedScore(1800, 1400);
    expect(score).toBeGreaterThan(0.5);
  });

  it("newRating increases for a win", () => {
    const updated = EloRating.newRating(1500, 0.5, 1, 32);
    expect(updated).toBeGreaterThan(1500);
  });

  it("newRating decreases for a loss", () => {
    const updated = EloRating.newRating(1500, 0.5, 0, 32);
    expect(updated).toBeLessThan(1500);
  });

  it("match adjusts both players", () => {
    const result = EloRating.match(1500, 1500, 32);
    expect(result.winner).toBeGreaterThan(1500);
    expect(result.loser).toBeLessThan(1500);
    expect(result.winner + result.loser).toBe(3000);
  });

  it("draw adjusts toward the middle", () => {
    const result = EloRating.draw(1600, 1400, 32);
    expect(result.a).toBeLessThan(1600);
    expect(result.b).toBeGreaterThan(1400);
  });

  it("processMatch updates player records", () => {
    const players = new Map();
    players.set("a", EloRating.createPlayer("a", 1500));
    players.set("b", EloRating.createPlayer("b", 1500));
    const result = EloRating.processMatch(players, "a", "b");
    expect(result.winnerDelta).toBeGreaterThan(0);
    expect(result.loserDelta).toBeLessThan(0);
    expect(players.get("a")!.wins).toBe(1);
    expect(players.get("b")!.losses).toBe(1);
  });

  it("rankings sorts by rating descending", () => {
    const players = new Map();
    players.set("low", EloRating.createPlayer("low", 1200));
    players.set("high", EloRating.createPlayer("high", 1800));
    players.set("mid", EloRating.createPlayer("mid", 1500));
    const ranked = EloRating.rankings(players);
    expect(ranked[0].id).toBe("high");
    expect(ranked[2].id).toBe("low");
  });

  it("winProbability returns a value between 0 and 1", () => {
    const prob = EloRating.winProbability(1500, 1500);
    expect(prob).toBe(0.5);
  });

  it("ratingClass returns correct class", () => {
    expect(EloRating.ratingClass(2500)).toBe("Grandmaster");
    expect(EloRating.ratingClass(1500)).toBe("Class C");
    expect(EloRating.ratingClass(1000)).toBe("Beginner");
  });

  it("kFactor varies by experience and rating", () => {
    expect(EloRating.kFactor(1500, 10)).toBe(40);
    expect(EloRating.kFactor(1500, 50)).toBe(20);
    expect(EloRating.kFactor(2500, 50)).toBe(10);
  });
});
