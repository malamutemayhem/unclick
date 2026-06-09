import { describe, it, expect } from "vitest";
import {
  roomDuration, teamSize, puzzleCount, timePerPuzzle,
  hintAllowance, escapeRate, lockCombinations, linearVsNonlinear,
  resetTime, costPerPerson, immersionScore, repeatability,
  bookingCapacity, puzzleCategories,
} from "../escape-room.js";

describe("roomDuration", () => {
  it("longer for expert", () => {
    expect(roomDuration("expert")).toBeGreaterThan(roomDuration("beginner"));
  });
});

describe("teamSize", () => {
  it("larger room = bigger team", () => {
    expect(teamSize(30).max).toBeGreaterThan(teamSize(10).max);
  });
});

describe("puzzleCount", () => {
  it("more for harder", () => {
    expect(puzzleCount("expert")).toBeGreaterThan(puzzleCount("beginner"));
  });
});

describe("timePerPuzzle", () => {
  it("positive minutes", () => {
    expect(timePerPuzzle(60, 10)).toBe(6);
  });
});

describe("hintAllowance", () => {
  it("fewer for expert", () => {
    expect(hintAllowance("expert")).toBeLessThan(hintAllowance("beginner"));
  });
});

describe("escapeRate", () => {
  it("lower for harder", () => {
    expect(escapeRate("expert")).toBeLessThan(escapeRate("beginner"));
  });
});

describe("lockCombinations", () => {
  it("10^4 for 4-digit", () => {
    expect(lockCombinations(4, 10)).toBe(10000);
  });
});

describe("linearVsNonlinear", () => {
  it("non-linear for parallel", () => {
    expect(linearVsNonlinear(true)).toContain("non-linear");
  });
});

describe("resetTime", () => {
  it("3 min per puzzle", () => {
    expect(resetTime(10)).toBe(30);
  });
});

describe("costPerPerson", () => {
  it("divides evenly", () => {
    expect(costPerPerson(120, 4)).toBe(30);
  });
});

describe("immersionScore", () => {
  it("average of 4 scores", () => {
    expect(immersionScore(8, 7, 9, 6)).toBe(7.5);
  });
});

describe("repeatability", () => {
  it("percent of randomized", () => {
    expect(repeatability(5, 10)).toBe(50);
  });
});

describe("bookingCapacity", () => {
  it("rooms x slots", () => {
    expect(bookingCapacity(3, 8)).toBe(24);
  });
});

describe("puzzleCategories", () => {
  it("returns 6 categories", () => {
    expect(puzzleCategories()).toHaveLength(6);
  });
});
