import { describe, it, expect } from "vitest";
import { VotingSystem } from "../voting-system.js";

describe("VotingSystem", () => {
  it("plurality counts votes correctly", () => {
    const results = VotingSystem.plurality(["A", "B", "A", "C", "A", "B"]);
    expect(results[0].candidate).toBe("A");
    expect(results[0].votes).toBe(3);
    expect(results[0].percentage).toBe(50);
  });

  it("majority detects when no majority exists", () => {
    const result = VotingSystem.majority(["A", "B", "C"]);
    expect(result.winner).toBeNull();
  });

  it("majority detects winner", () => {
    const result = VotingSystem.majority(["A", "A", "A", "B", "C"]);
    expect(result.winner).toBe("A");
  });

  it("runoff selects top-two winner", () => {
    const result = VotingSystem.runoff(["A", "A", "B", "B", "B", "C"]);
    expect(result.winner).toBe("B");
  });

  it("instantRunoff eliminates candidates", () => {
    const ballots = [
      { rankings: ["A", "B", "C"] },
      { rankings: ["A", "B", "C"] },
      { rankings: ["B", "C", "A"] },
      { rankings: ["C", "B", "A"] },
      { rankings: ["C", "B", "A"] },
    ];
    const result = VotingSystem.instantRunoff(ballots);
    expect(result.winner).toBeTruthy();
    expect(result.rounds.length).toBeGreaterThanOrEqual(1);
  });

  it("borda assigns points by rank", () => {
    const ballots = [
      { rankings: ["A", "B", "C"] },
      { rankings: ["B", "A", "C"] },
      { rankings: ["A", "C", "B"] },
    ];
    const results = VotingSystem.borda(ballots);
    expect(results[0].candidate).toBe("A");
  });

  it("approval counts all approved candidates", () => {
    const results = VotingSystem.approval([
      ["A", "B"],
      ["B", "C"],
      ["A", "C"],
    ]);
    expect(results.length).toBe(3);
    const b = results.find((r) => r.candidate === "B")!;
    expect(b.votes).toBe(2);
  });

  it("condorcet finds winner when one exists", () => {
    const ballots = [
      { rankings: ["A", "B", "C"] },
      { rankings: ["A", "B", "C"] },
      { rankings: ["B", "A", "C"] },
    ];
    const winner = VotingSystem.condorcet(ballots);
    expect(winner).toBe("A");
  });

  it("condorcet returns null when no winner exists", () => {
    const ballots = [
      { rankings: ["A", "B", "C"] },
      { rankings: ["B", "C", "A"] },
      { rankings: ["C", "A", "B"] },
    ];
    const winner = VotingSystem.condorcet(ballots);
    expect(winner).toBeNull();
  });

  it("quorum checks participation", () => {
    expect(VotingSystem.quorum(["A", "B", "C"], 6, 0.5)).toBe(true);
    expect(VotingSystem.quorum(["A"], 6, 0.5)).toBe(false);
  });
});
