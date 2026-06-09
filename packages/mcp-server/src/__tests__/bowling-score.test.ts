import { describe, it, expect } from "vitest";
import {
  scoreGame, perfectGame, gutterGame, allSpares,
  frameCount, currentFrame, isStrike, isSpareRoll,
  maxPossibleScore, strikeCount, spareCount, openFrameCount,
  pinsPerBall, averageFrameScore, formatScorecard,
} from "../bowling-score.js";

describe("scoreGame", () => {
  it("perfect game is 300", () => {
    const result = scoreGame(perfectGame());
    expect(result.totalScore).toBe(300);
    expect(result.isPerfect).toBe(true);
  });

  it("gutter game is 0", () => {
    expect(scoreGame(gutterGame()).totalScore).toBe(0);
  });

  it("all spares with 5s", () => {
    const result = scoreGame(allSpares(5));
    expect(result.totalScore).toBe(150);
  });

  it("simple game no marks", () => {
    const rolls = [3, 4, 2, 5, 1, 1, 0, 0, 4, 3, 2, 2, 3, 3, 1, 1, 4, 4, 2, 3];
    const result = scoreGame(rolls);
    expect(result.totalScore).toBe(48);
  });

  it("single strike in frame 1", () => {
    const rolls = [10, 3, 4, ...Array(16).fill(0)];
    const result = scoreGame(rolls);
    expect(result.frames[0].score).toBe(17);
  });
});

describe("perfectGame / gutterGame / allSpares", () => {
  it("perfect game has 12 rolls", () => {
    expect(perfectGame().length).toBe(12);
  });

  it("gutter game has 20 rolls", () => {
    expect(gutterGame().length).toBe(20);
  });

  it("all spares has 21 rolls", () => {
    expect(allSpares(5).length).toBe(21);
  });
});

describe("frameCount / currentFrame", () => {
  it("counts frames in progress", () => {
    expect(frameCount([10, 10, 3, 4])).toBe(3);
  });

  it("current frame capped at 10", () => {
    expect(currentFrame(perfectGame())).toBe(10);
  });
});

describe("isStrike / isSpareRoll", () => {
  it("10 is a strike", () => {
    expect(isStrike(10)).toBe(true);
  });

  it("5 is not a strike", () => {
    expect(isStrike(5)).toBe(false);
  });

  it("3+7 is a spare", () => {
    expect(isSpareRoll(3, 7)).toBe(true);
  });

  it("3+4 is not a spare", () => {
    expect(isSpareRoll(3, 4)).toBe(false);
  });
});

describe("strikeCount / spareCount / openFrameCount", () => {
  it("perfect game has 10 strikes", () => {
    expect(strikeCount(perfectGame())).toBe(10);
  });

  it("all spares has 10 spares", () => {
    expect(spareCount(allSpares(5))).toBe(10);
  });

  it("gutter game has 10 open frames", () => {
    expect(openFrameCount(gutterGame())).toBe(10);
  });
});

describe("pinsPerBall", () => {
  it("perfect game 10 pins per ball", () => {
    expect(pinsPerBall(perfectGame())).toBeCloseTo(10);
  });

  it("gutter game 0 pins per ball", () => {
    expect(pinsPerBall(gutterGame())).toBe(0);
  });
});

describe("averageFrameScore", () => {
  it("perfect game 30 per frame", () => {
    expect(averageFrameScore(perfectGame())).toBeCloseTo(30);
  });
});

describe("maxPossibleScore", () => {
  it("empty game can still be 300", () => {
    expect(maxPossibleScore([])).toBe(300);
  });
});

describe("formatScorecard", () => {
  it("formats perfect game", () => {
    const s = formatScorecard(perfectGame());
    expect(s).toContain("300");
    expect(s).toContain("X");
  });

  it("formats gutter game", () => {
    const s = formatScorecard(gutterGame());
    expect(s).toContain("0");
  });
});
