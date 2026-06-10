import { describe, it, expect } from "vitest";
import {
  scoreAccuracy, versatility, portability, repeatability,
  boardCost, makesEnvelopes, diagonalScore, guideType,
  bestProject, scoringBoards,
} from "../scoring-board-calc.js";

describe("scoreAccuracy", () => {
  it("magnetic fence adjust best score accuracy", () => {
    expect(scoreAccuracy("magnetic_fence_adjust")).toBeGreaterThan(scoreAccuracy("mini_travel_compact"));
  });
});

describe("versatility", () => {
  it("metric grid universal most versatile", () => {
    expect(versatility("metric_grid_universal")).toBeGreaterThan(versatility("envelope_punch_guide"));
  });
});

describe("portability", () => {
  it("mini travel compact most portable", () => {
    expect(portability("mini_travel_compact")).toBeGreaterThan(portability("magnetic_fence_adjust"));
  });
});

describe("repeatability", () => {
  it("envelope punch guide best repeatability", () => {
    expect(repeatability("envelope_punch_guide")).toBeGreaterThan(repeatability("diagonal_score_plate"));
  });
});

describe("boardCost", () => {
  it("magnetic fence adjust more expensive than mini travel", () => {
    expect(boardCost("magnetic_fence_adjust")).toBeGreaterThan(boardCost("mini_travel_compact"));
  });
});

describe("makesEnvelopes", () => {
  it("envelope punch guide makes envelopes", () => {
    expect(makesEnvelopes("envelope_punch_guide")).toBe(true);
  });
  it("diagonal score plate does not make envelopes", () => {
    expect(makesEnvelopes("diagonal_score_plate")).toBe(false);
  });
});

describe("diagonalScore", () => {
  it("diagonal score plate has diagonal score", () => {
    expect(diagonalScore("diagonal_score_plate")).toBe(true);
  });
  it("metric grid universal does not have diagonal score", () => {
    expect(diagonalScore("metric_grid_universal")).toBe(false);
  });
});

describe("guideType", () => {
  it("magnetic fence adjust uses sliding magnet rail", () => {
    expect(guideType("magnetic_fence_adjust")).toBe("sliding_magnet_rail");
  });
});

describe("bestProject", () => {
  it("envelope punch guide best for custom envelope batch", () => {
    expect(bestProject("envelope_punch_guide")).toBe("custom_envelope_batch");
  });
});

describe("scoringBoards", () => {
  it("returns 5 types", () => {
    expect(scoringBoards()).toHaveLength(5);
  });
});
