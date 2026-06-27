import { describe, it, expect } from "vitest";
import {
  tileCount, setSize, totalPips, doublesCount, tilesPerPlayer,
  boneyard, matchingTiles, probability, chainLength, toppleSpeed,
  maxPlayers, scoringMultiple, dominoSets,
} from "../domino-calc.js";

describe("tileCount", () => {
  it("double-six = 28", () => {
    expect(tileCount(6)).toBe(28);
  });
  it("double-nine = 55", () => {
    expect(tileCount(9)).toBe(55);
  });
});

describe("setSize", () => {
  it("double_six = 28", () => {
    expect(setSize("double_six")).toBe(28);
  });
  it("double_twelve = 91", () => {
    expect(setSize("double_twelve")).toBe(91);
  });
});

describe("totalPips", () => {
  it("positive total", () => {
    expect(totalPips(6)).toBeGreaterThan(0);
  });
});

describe("doublesCount", () => {
  it("double-six has 7 doubles", () => {
    expect(doublesCount(6)).toBe(7);
  });
});

describe("tilesPerPlayer", () => {
  it("28 tiles / 4 players = 7", () => {
    expect(tilesPerPlayer(28, 4)).toBe(7);
  });
  it("zero players = 0", () => {
    expect(tilesPerPlayer(28, 0)).toBe(0);
  });
});

describe("boneyard", () => {
  it("correct remainder", () => {
    expect(boneyard(28, 2, 7)).toBe(14);
  });
});

describe("matchingTiles", () => {
  it("6-pip in double-six = 1", () => {
    expect(matchingTiles(6, 6)).toBe(1);
  });
  it("0-pip in double-six = 7", () => {
    expect(matchingTiles(0, 6)).toBe(7);
  });
});

describe("probability", () => {
  it("between 0 and 1", () => {
    const p = probability(3, 6);
    expect(p).toBeGreaterThan(0);
    expect(p).toBeLessThanOrEqual(1);
  });
});

describe("chainLength", () => {
  it("positive length", () => {
    expect(chainLength(28, 5)).toBeGreaterThan(0);
  });
});

describe("toppleSpeed", () => {
  it("positive speed", () => {
    expect(toppleSpeed(3)).toBeGreaterThan(0);
  });
});

describe("maxPlayers", () => {
  it("double_six = 4", () => {
    expect(maxPlayers("double_six")).toBe(4);
  });
});

describe("scoringMultiple", () => {
  it("is 5", () => {
    expect(scoringMultiple()).toBe(5);
  });
});

describe("dominoSets", () => {
  it("returns 5 sets", () => {
    expect(dominoSets()).toHaveLength(5);
  });
});
