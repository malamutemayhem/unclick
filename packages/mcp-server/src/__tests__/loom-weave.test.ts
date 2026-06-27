import { describe, it, expect } from "vitest";
import {
  warpThreads, warpLength, totalWarpYards, weftYards, sett,
  reedDent, shafts, treadles, weavingSpeed, projectTime,
  shrinkage, finishedWidth, yarnCost, loomTypes,
} from "../loom-weave.js";

describe("warpThreads", () => {
  it("positive count", () => {
    expect(warpThreads(30, 6)).toBeGreaterThan(0);
  });
  it("wider = more threads", () => {
    expect(warpThreads(50, 6)).toBeGreaterThan(warpThreads(30, 6));
  });
});

describe("warpLength", () => {
  it("includes loom waste", () => {
    expect(warpLength(100)).toBeGreaterThan(100);
  });
});

describe("totalWarpYards", () => {
  it("positive yards", () => {
    expect(totalWarpYards(180, 160)).toBeGreaterThan(0);
  });
});

describe("weftYards", () => {
  it("positive yards", () => {
    expect(weftYards(30, 100, 6)).toBeGreaterThan(0);
  });
});

describe("sett", () => {
  it("silk has finest sett", () => {
    expect(sett("silk")).toBeGreaterThan(sett("wool"));
  });
});

describe("reedDent", () => {
  it("positive dent", () => {
    expect(reedDent(6)).toBeGreaterThan(0);
  });
});

describe("shafts", () => {
  it("plain = 2 shafts", () => {
    expect(shafts("plain")).toBe(2);
  });
  it("satin = 5 shafts", () => {
    expect(shafts("satin")).toBe(5);
  });
});

describe("treadles", () => {
  it("overshot = 6", () => {
    expect(treadles("overshot")).toBe(6);
  });
});

describe("weavingSpeed", () => {
  it("increases with experience", () => {
    expect(weavingSpeed(5)).toBeGreaterThan(weavingSpeed(1));
  });
});

describe("projectTime", () => {
  it("positive hours", () => {
    expect(projectTime(600, 5)).toBeGreaterThan(0);
  });
  it("zero speed returns 0", () => {
    expect(projectTime(600, 0)).toBe(0);
  });
});

describe("shrinkage", () => {
  it("wool shrinks most", () => {
    expect(shrinkage("wool")).toBeGreaterThan(shrinkage("silk"));
  });
});

describe("finishedWidth", () => {
  it("smaller after shrinkage", () => {
    expect(finishedWidth(30, 10)).toBeLessThan(30);
  });
});

describe("yarnCost", () => {
  it("positive cost", () => {
    expect(yarnCost(500, 0.05)).toBeGreaterThan(0);
  });
});

describe("loomTypes", () => {
  it("returns 6 types", () => {
    expect(loomTypes()).toHaveLength(6);
  });
});
