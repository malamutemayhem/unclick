import { describe, it, expect } from "vitest";
import {
  estimatedMinutes, turnTime, roundCount, setupMinutes,
  teardownMinutes, totalSessionMinutes, chessClockTime,
  incrementSeconds, apScore, gamesPerEvening, playerDowntime,
  optimalPlayerCount, gameWeights,
} from "../board-game-timer.js";

describe("estimatedMinutes", () => {
  it("heavier = longer", () => {
    expect(estimatedMinutes(3, "heavy")).toBeGreaterThan(estimatedMinutes(3, "light"));
  });
  it("more players = longer", () => {
    expect(estimatedMinutes(5, "medium")).toBeGreaterThan(estimatedMinutes(2, "medium"));
  });
});

describe("turnTime", () => {
  it("positive minutes", () => {
    expect(turnTime(60, 4, 10)).toBeGreaterThan(0);
  });
  it("zero players returns 0", () => {
    expect(turnTime(60, 0, 10)).toBe(0);
  });
});

describe("roundCount", () => {
  it("filler has fewest rounds", () => {
    expect(roundCount("filler")).toBeLessThan(roundCount("epic"));
  });
});

describe("setupMinutes", () => {
  it("epic takes longest", () => {
    expect(setupMinutes("epic")).toBeGreaterThan(setupMinutes("filler"));
  });
});

describe("teardownMinutes", () => {
  it("positive minutes", () => {
    expect(teardownMinutes("medium")).toBeGreaterThan(0);
  });
});

describe("totalSessionMinutes", () => {
  it("includes setup and teardown", () => {
    const total = totalSessionMinutes(3, "medium");
    const game = estimatedMinutes(3, "medium");
    expect(total).toBeGreaterThan(game);
  });
});

describe("chessClockTime", () => {
  it("splits evenly", () => {
    expect(chessClockTime(60, 2)).toBe(30);
  });
  it("zero players returns 0", () => {
    expect(chessClockTime(60, 0)).toBe(0);
  });
});

describe("incrementSeconds", () => {
  it("heavier = more increment", () => {
    expect(incrementSeconds("heavy")).toBeGreaterThan(incrementSeconds("filler"));
  });
});

describe("apScore", () => {
  it("positive seconds", () => {
    expect(apScore(4, 60)).toBeGreaterThan(0);
  });
});

describe("gamesPerEvening", () => {
  it("positive count", () => {
    expect(gamesPerEvening(4, 60)).toBeGreaterThan(0);
  });
  it("zero game time returns 0", () => {
    expect(gamesPerEvening(4, 0)).toBe(0);
  });
});

describe("playerDowntime", () => {
  it("more players = more downtime", () => {
    expect(playerDowntime(2, 5)).toBeGreaterThan(playerDowntime(2, 3));
  });
});

describe("optimalPlayerCount", () => {
  it("returns min and max", () => {
    const opt = optimalPlayerCount("medium");
    expect(opt.min).toBeGreaterThan(0);
    expect(opt.max).toBeGreaterThan(opt.min);
  });
  it("epic has smallest max", () => {
    expect(optimalPlayerCount("epic").max).toBeLessThanOrEqual(optimalPlayerCount("filler").max);
  });
});

describe("gameWeights", () => {
  it("returns 5 weights", () => {
    expect(gameWeights()).toHaveLength(5);
  });
});
