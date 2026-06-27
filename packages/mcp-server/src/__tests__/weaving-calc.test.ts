import { describe, it, expect } from "vitest";
import {
  warpLength, warpEnds, totalWarp, weftLength, sett,
  reedSize, heddleCount, shaftsNeeded, shrinkagePercent,
  finishedSize, yarnWeight, weavingTime, costPerMeter,
  weaveStructures,
} from "../weaving-calc.js";

describe("warpLength", () => {
  it("longer than finished length", () => {
    expect(warpLength(100)).toBeGreaterThan(100);
  });
});

describe("warpEnds", () => {
  it("positive count", () => {
    expect(warpEnds(50, 12)).toBeGreaterThan(100);
  });
});

describe("totalWarp", () => {
  it("returns meters", () => {
    expect(totalWarp(200, 240)).toBeGreaterThan(0);
  });
});

describe("weftLength", () => {
  it("positive meters", () => {
    expect(weftLength(50, 12, 100)).toBeGreaterThan(0);
  });
});

describe("sett", () => {
  it("twill denser than plain", () => {
    expect(sett(20, "twill")).toBeGreaterThan(sett(20, "plain"));
  });
});

describe("reedSize", () => {
  it("returns standard size", () => {
    const sizes = [8, 10, 12, 15, 20, 24];
    expect(sizes).toContain(reedSize(10));
  });
});

describe("heddleCount", () => {
  it("sums to warp ends", () => {
    const heddles = heddleCount(240, 4);
    expect(heddles.reduce((s, h) => s + h, 0)).toBe(240);
  });

  it("has correct number of shafts", () => {
    expect(heddleCount(100, 4)).toHaveLength(4);
  });
});

describe("shaftsNeeded", () => {
  it("plain needs 2", () => {
    expect(shaftsNeeded("plain")).toBe(2);
  });

  it("twill needs 4", () => {
    expect(shaftsNeeded("twill")).toBe(4);
  });
});

describe("shrinkagePercent", () => {
  it("wool shrinks most", () => {
    expect(shrinkagePercent("wool")).toBeGreaterThan(shrinkagePercent("cotton"));
  });
});

describe("finishedSize", () => {
  it("smaller than raw", () => {
    const finished = finishedSize(50, 100, "cotton");
    expect(finished.widthCm).toBeLessThan(50);
    expect(finished.lengthCm).toBeLessThan(100);
  });
});

describe("yarnWeight", () => {
  it("positive grams", () => {
    expect(yarnWeight(100, 12)).toBeGreaterThan(0);
  });
});

describe("weavingTime", () => {
  it("positive hours", () => {
    expect(weavingTime(50, 100, 12)).toBeGreaterThan(0);
  });
});

describe("costPerMeter", () => {
  it("positive cost", () => {
    expect(costPerMeter(30, 25, 50, 40)).toBeGreaterThan(0);
  });
});

describe("weaveStructures", () => {
  it("returns 5 structures", () => {
    expect(weaveStructures()).toHaveLength(5);
    expect(weaveStructures()).toContain("twill");
  });
});
