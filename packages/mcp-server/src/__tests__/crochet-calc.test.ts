import { describe, it, expect } from "vitest";
import {
  stitchHeight, chainsForWidth, rowsForHeight, totalStitches,
  yarnNeeded, skeinsNeeded, grannySquareSize, squaresForBlanket,
  amigurumiRounds, stuffingAmount, borderLength, hookToUS,
  estimateTime, stitchTypes,
} from "../crochet-calc.js";

describe("stitchHeight", () => {
  it("treble > single", () => {
    expect(stitchHeight("treble", 4)).toBeGreaterThan(stitchHeight("single", 4));
  });
});

describe("chainsForWidth", () => {
  it("positive count", () => {
    expect(chainsForWidth(30, 18)).toBeGreaterThan(50);
  });
});

describe("rowsForHeight", () => {
  it("positive count", () => {
    expect(rowsForHeight(20, 12)).toBeGreaterThan(20);
  });
});

describe("totalStitches", () => {
  it("multiplies", () => {
    expect(totalStitches(50, 30)).toBe(1500);
  });
});

describe("yarnNeeded", () => {
  it("positive meters", () => {
    expect(yarnNeeded(1500, "single", 4)).toBeGreaterThan(0);
  });
});

describe("skeinsNeeded", () => {
  it("rounds up", () => {
    expect(skeinsNeeded(250, 100)).toBe(3);
  });
});

describe("grannySquareSize", () => {
  it("increases with rounds", () => {
    expect(grannySquareSize(5, 4)).toBeGreaterThan(grannySquareSize(3, 4));
  });
});

describe("squaresForBlanket", () => {
  it("positive count", () => {
    expect(squaresForBlanket(120, 150, 15)).toBeGreaterThan(0);
  });
});

describe("amigurumiRounds", () => {
  it("positive rounds", () => {
    expect(amigurumiRounds(10, 18)).toBeGreaterThan(0);
  });
});

describe("stuffingAmount", () => {
  it("positive grams", () => {
    expect(stuffingAmount(500)).toBeGreaterThan(0);
  });
});

describe("borderLength", () => {
  it("perimeter", () => {
    expect(borderLength(30, 40)).toBe(140);
  });
});

describe("hookToUS", () => {
  it("4.0mm = G/6", () => {
    expect(hookToUS(4.0)).toBe("G/6");
  });

  it("unknown = N/A", () => {
    expect(hookToUS(7.0)).toBe("N/A");
  });
});

describe("estimateTime", () => {
  it("positive hours", () => {
    expect(estimateTime(1500)).toBeGreaterThan(0);
  });
});

describe("stitchTypes", () => {
  it("returns 6 types", () => {
    expect(stitchTypes()).toHaveLength(6);
  });
});
