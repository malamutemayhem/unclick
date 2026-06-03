import { describe, it, expect } from "vitest";
import { recordRoutingOutcomes, resolverFromMap, foldScoresByArm } from "./routing-record.js";
import { armLeaderboard, emptyArmTable } from "./router-bandit.js";
import type { LiveJobScore } from "./live-score.js";
import type { RunScore } from "../score-trace.js";

const verified: RunScore = { reward: 1, outcome: "verified_completion", reason: "", signals: [] };
const falseGreen: RunScore = { reward: -1, outcome: "false_green", reason: "", signals: [] };

const scored: LiveJobScore[] = [
  { jobId: "j1", score: verified },
  { jobId: "j2", score: verified },
  { jobId: "j3", score: falseGreen },
  { jobId: "j4", score: verified },
];

describe("recordRoutingOutcomes", () => {
  it("attributes each job's proof outcome to the arm that ran it", () => {
    const resolver = resolverFromMap({ j1: "opus", j2: "opus", j3: "haiku", j4: "haiku" });
    const { table, events, skipped } = recordRoutingOutcomes(scored, resolver);
    expect(skipped).toEqual([]);
    expect(events).toHaveLength(4);
    const board = armLeaderboard(table);
    const opus = board.find((b) => b.arm === "opus")!;
    const haiku = board.find((b) => b.arm === "haiku")!;
    expect(opus.pulls).toBe(2);
    expect(opus.verified).toBe(2);
    expect(opus.meanReward).toBe(1); // +1 +1
    expect(haiku.meanReward).toBe(0); // +1 -1
    expect(board[0].arm).toBe("opus"); // higher mean ranks first
  });

  it("skips jobs with no resolvable arm rather than guessing", () => {
    const resolver = resolverFromMap({ j1: "opus" }); // j2..j4 unknown
    const { table, skipped } = recordRoutingOutcomes(scored, resolver);
    expect(skipped).toEqual(["j2", "j3", "j4"]);
    expect(armLeaderboard(table)).toHaveLength(1);
  });

  it("accumulates onto an existing table", () => {
    const first = foldScoresByArm([{ jobId: "a", score: verified }], { a: "opus" });
    const second = foldScoresByArm([{ jobId: "b", score: verified }], { b: "opus" }, first.table);
    expect(second.table.arms.opus.pulls).toBe(2);
  });

  it("foldScoresByArm with an empty map skips everything", () => {
    const { table, skipped } = foldScoresByArm(scored, {});
    expect(skipped).toHaveLength(4);
    expect(armLeaderboard(table)).toEqual([]);
    expect(table).toEqual(emptyArmTable());
  });
});
