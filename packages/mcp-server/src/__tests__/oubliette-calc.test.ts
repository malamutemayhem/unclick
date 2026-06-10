import { describe, it, expect } from "vitest";
import {
  chamberDepth, chamberDiameter, airVolume, airSupplyHours,
  wallThicknessCm, hatchSize, ladderRungs, echoDelay,
  dampness, entryTypes,
} from "../oubliette-calc.js";

describe("chamberDepth", () => {
  it("increases with security", () => {
    expect(chamberDepth(5)).toBeGreaterThan(chamberDepth(1));
  });
});

describe("chamberDiameter", () => {
  it("larger for more occupants", () => {
    expect(chamberDiameter(4)).toBeGreaterThan(chamberDiameter(1));
  });
});

describe("airVolume", () => {
  it("positive m3", () => {
    expect(airVolume(2, 5)).toBeGreaterThan(0);
  });
});

describe("airSupplyHours", () => {
  it("positive hours", () => {
    expect(airSupplyHours(20, 2)).toBeGreaterThan(0);
  });
  it("zero occupants = 0", () => {
    expect(airSupplyHours(20, 0)).toBe(0);
  });
});

describe("wallThicknessCm", () => {
  it("rock thinnest", () => {
    expect(wallThicknessCm(5, "rock")).toBeLessThan(wallThicknessCm(5, "sand"));
  });
});

describe("hatchSize", () => {
  it("returns dimensions", () => {
    const h = hatchSize(100);
    expect(h.width).toBe(60);
    expect(h.length).toBe(80);
  });
});

describe("ladderRungs", () => {
  it("positive count", () => {
    expect(ladderRungs(5, 30)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(ladderRungs(5, 0)).toBe(0);
  });
});

describe("echoDelay", () => {
  it("positive seconds", () => {
    expect(echoDelay(10)).toBeGreaterThan(0);
  });
});

describe("dampness", () => {
  it("100% at water table", () => {
    expect(dampness(10, 10)).toBe(100);
  });
  it("less above water table", () => {
    expect(dampness(5, 10)).toBeLessThan(100);
  });
});

describe("entryTypes", () => {
  it("returns 4 types", () => {
    expect(entryTypes()).toHaveLength(4);
  });
});
