import { describe, it, expect } from "vitest";
import {
  trackLength, marbleSpeed, runTime, heightNeeded,
  marbleWeight, loopMinHeight, jumpDistance, funnelRevolutions,
  switchTracks, parallelCapacity, chainReactionDelay,
  pieceCount, trackPieces,
} from "../marble-run.js";

describe("trackLength", () => {
  it("sums pieces", () => {
    const pieces = new Map<any, number>([["straight", 3], ["curve", 2]]);
    expect(trackLength(pieces)).toBe(3 * 15 + 2 * 12);
  });
});

describe("marbleSpeed", () => {
  it("faster from higher", () => {
    expect(marbleSpeed(50)).toBeGreaterThan(marbleSpeed(20));
  });
});

describe("runTime", () => {
  it("positive seconds", () => {
    expect(runTime(200, 50)).toBeGreaterThan(0);
  });

  it("0 for no speed", () => {
    expect(runTime(200, 0)).toBe(0);
  });
});

describe("heightNeeded", () => {
  it("positive cm", () => {
    expect(heightNeeded(100)).toBeGreaterThan(0);
  });
});

describe("marbleWeight", () => {
  it("metal heaviest", () => {
    expect(marbleWeight(16, "metal")).toBeGreaterThan(marbleWeight(16, "glass"));
  });
});

describe("loopMinHeight", () => {
  it("2.5x loop diameter", () => {
    expect(loopMinHeight(10)).toBe(25);
  });
});

describe("jumpDistance", () => {
  it("positive cm", () => {
    expect(jumpDistance(150, 30)).toBeGreaterThan(0);
  });
});

describe("funnelRevolutions", () => {
  it("positive revolutions", () => {
    expect(funnelRevolutions(10, 100)).toBeGreaterThan(0);
  });
});

describe("switchTracks", () => {
  it("true for heavy marble", () => {
    expect(switchTracks(10, 8)).toBe(true);
  });

  it("false for light marble", () => {
    expect(switchTracks(5, 8)).toBe(false);
  });
});

describe("parallelCapacity", () => {
  it("positive count", () => {
    expect(parallelCapacity(5, 16)).toBeGreaterThan(0);
  });
});

describe("chainReactionDelay", () => {
  it("positive seconds", () => {
    expect(chainReactionDelay(10, 3)).toBeGreaterThan(0);
  });
});

describe("pieceCount", () => {
  it("sums all", () => {
    const pieces = new Map<any, number>([["straight", 5], ["curve", 3]]);
    expect(pieceCount(pieces)).toBe(8);
  });
});

describe("trackPieces", () => {
  it("returns 6 pieces", () => {
    expect(trackPieces()).toHaveLength(6);
  });
});
