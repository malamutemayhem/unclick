import { describe, it, expect } from "vitest";
import { TournamentBracket } from "../tournament-bracket.js";

describe("TournamentBracket", () => {
  it("singleElimination creates correct rounds for 4 players", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B", "C", "D"]);
    expect(bracket.totalRounds).toBe(2);
    expect(bracket.rounds[0].length).toBe(2);
    expect(bracket.rounds[1].length).toBe(1);
  });

  it("singleElimination pads to power of 2", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B", "C"]);
    expect(bracket.totalRounds).toBe(2);
    expect(bracket.rounds[0].length).toBe(2);
  });

  it("reportResult advances winner to next round", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B", "C", "D"]);
    TournamentBracket.reportResult(bracket, 1, 0, "A");
    expect(bracket.rounds[0][0].winner).toBe("A");
    expect(bracket.rounds[1][0].player1).toBe("A");
  });

  it("reportResult fills correct slot", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B", "C", "D"]);
    TournamentBracket.reportResult(bracket, 1, 1, "D");
    expect(bracket.rounds[1][0].player2).toBe("D");
  });

  it("roundRobin generates all pairings", () => {
    const pairs = TournamentBracket.roundRobin(["A", "B", "C", "D"]);
    expect(pairs.length).toBe(6);
  });

  it("roundRobin handles odd number of players", () => {
    const pairs = TournamentBracket.roundRobin(["A", "B", "C"]);
    expect(pairs.length).toBe(3);
  });

  it("swiss pairs by standings", () => {
    const standings = new Map([["A", 3], ["B", 1], ["C", 2], ["D", 0]]);
    const pairs = TournamentBracket.swiss(["A", "B", "C", "D"], standings);
    expect(pairs.length).toBe(2);
    expect(pairs[0][0]).toBe("A");
    expect(pairs[0][1]).toBe("C");
  });

  it("render produces readable output", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B", "C", "D"]);
    const output = TournamentBracket.render(bracket);
    expect(output).toContain("Round 1:");
    expect(output).toContain("Round 2:");
    expect(output).toContain("A vs B");
  });

  it("champion returns null before completion", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B"]);
    expect(TournamentBracket.champion(bracket)).toBeNull();
  });

  it("champion returns winner after completion", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B"]);
    TournamentBracket.reportResult(bracket, 1, 0, "A");
    expect(TournamentBracket.champion(bracket)).toBe("A");
  });

  it("isComplete reports correctly", () => {
    const bracket = TournamentBracket.singleElimination(["A", "B"]);
    expect(TournamentBracket.isComplete(bracket)).toBe(false);
    TournamentBracket.reportResult(bracket, 1, 0, "B");
    expect(TournamentBracket.isComplete(bracket)).toBe(true);
  });
});
