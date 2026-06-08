import { describe, it, expect } from "vitest";
import { majority, weightedMajority, unanimous, quorum, Vote } from "../consensus-voter.js";

describe("majority", () => {
  it("picks the most common choice", () => {
    const votes: Vote<string>[] = [
      { agent: "a1", choice: "yes", confidence: 1 },
      { agent: "a2", choice: "no", confidence: 1 },
      { agent: "a3", choice: "yes", confidence: 1 },
    ];
    const r = majority(votes);
    expect(r.winner).toBe("yes");
    expect(r.votes).toBe(2);
    expect(r.agreement).toBeCloseTo(2 / 3);
  });

  it("handles empty votes", () => {
    const r = majority([]);
    expect(r.winner).toBeUndefined();
    expect(r.total).toBe(0);
  });

  it("builds tally map", () => {
    const votes: Vote<string>[] = [
      { agent: "a1", choice: "a", confidence: 1 },
      { agent: "a2", choice: "b", confidence: 1 },
      { agent: "a3", choice: "a", confidence: 1 },
    ];
    const r = majority(votes);
    expect(r.tally.get("a")).toBe(2);
    expect(r.tally.get("b")).toBe(1);
  });
});

describe("weightedMajority", () => {
  it("weights by confidence", () => {
    const votes: Vote<string>[] = [
      { agent: "a1", choice: "yes", confidence: 0.9 },
      { agent: "a2", choice: "no", confidence: 0.5 },
      { agent: "a3", choice: "no", confidence: 0.3 },
    ];
    const r = weightedMajority(votes);
    expect(r.winner).toBe("yes");
  });

  it("handles empty votes", () => {
    const r = weightedMajority([]);
    expect(r.winner).toBeUndefined();
  });
});

describe("unanimous", () => {
  it("returns true when all agree", () => {
    const votes: Vote<string>[] = [
      { agent: "a1", choice: "yes", confidence: 1 },
      { agent: "a2", choice: "yes", confidence: 0.8 },
    ];
    expect(unanimous(votes)).toBe(true);
  });

  it("returns false when disagreement", () => {
    const votes: Vote<string>[] = [
      { agent: "a1", choice: "yes", confidence: 1 },
      { agent: "a2", choice: "no", confidence: 1 },
    ];
    expect(unanimous(votes)).toBe(false);
  });

  it("returns false for empty", () => {
    expect(unanimous([])).toBe(false);
  });
});

describe("quorum", () => {
  it("returns true when enough votes", () => {
    const votes: Vote<string>[] = [
      { agent: "a1", choice: "yes", confidence: 1 },
      { agent: "a2", choice: "no", confidence: 1 },
      { agent: "a3", choice: "yes", confidence: 1 },
    ];
    expect(quorum(votes, 3)).toBe(true);
  });

  it("returns false when not enough votes", () => {
    const votes: Vote<string>[] = [
      { agent: "a1", choice: "yes", confidence: 1 },
    ];
    expect(quorum(votes, 3)).toBe(false);
  });
});
