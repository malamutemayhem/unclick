import { describe, it, expect } from "vitest";
import {
  warpThreads, weftPicks, warpLength, threadWeight, reedDent,
  shaftCount, treadleCount, weavingTime, shrinkage,
  yarnMetersNeeded, loomTypes,
} from "../loom-calc.js";

describe("warpThreads", () => {
  it("positive threads", () => {
    expect(warpThreads(50, 20)).toBeGreaterThan(0);
  });
});

describe("weftPicks", () => {
  it("positive picks", () => {
    expect(weftPicks(100, 15)).toBeGreaterThan(0);
  });
});

describe("warpLength", () => {
  it("longer than finished", () => {
    expect(warpLength(100, 30, 10)).toBeGreaterThan(100);
  });
});

describe("threadWeight", () => {
  it("positive grams", () => {
    expect(threadWeight(100, 50)).toBeGreaterThan(0);
  });
});

describe("reedDent", () => {
  it("1 for coarse", () => {
    expect(reedDent(6)).toBe(1);
  });
  it("3 for fine", () => {
    expect(reedDent(20)).toBe(3);
  });
});

describe("shaftCount", () => {
  it("jacquard most", () => {
    expect(shaftCount("jacquard")).toBeGreaterThan(shaftCount("floor"));
  });
});

describe("treadleCount", () => {
  it("2x shafts capped at 14", () => {
    expect(treadleCount(8)).toBe(14);
  });
});

describe("weavingTime", () => {
  it("positive minutes", () => {
    expect(weavingTime(500, 10)).toBeGreaterThan(0);
  });
  it("zero ppm = 0", () => {
    expect(weavingTime(500, 0)).toBe(0);
  });
});

describe("shrinkage", () => {
  it("wool shrinks most", () => {
    expect(shrinkage("wool")).toBeGreaterThan(shrinkage("silk"));
  });
});

describe("yarnMetersNeeded", () => {
  it("positive meters", () => {
    expect(yarnMetersNeeded(200, 150)).toBeGreaterThan(0);
  });
});

describe("loomTypes", () => {
  it("returns 6 types", () => {
    expect(loomTypes()).toHaveLength(6);
  });
});
