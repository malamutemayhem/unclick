import { describe, it, expect } from "vitest";
import {
  widthCm, heightCm, depthCm, volumeCm3,
  doorPanelCount, lockRequired, lintelThicknessCm, carvingHours,
  consecrationRequired, restorationCost, aumbryPurposes,
} from "../aumbry-calc.js";

describe("widthCm", () => {
  it("vestments widest", () => {
    expect(widthCm("vestments")).toBeGreaterThan(widthCm("oils"));
  });
});

describe("heightCm", () => {
  it("vestments tallest", () => {
    expect(heightCm("vestments")).toBeGreaterThan(heightCm("oils"));
  });
});

describe("depthCm", () => {
  it("55% of wall", () => {
    expect(depthCm(60)).toBe(33);
  });
});

describe("volumeCm3", () => {
  it("positive volume", () => {
    expect(volumeCm3(30, 35, 33)).toBeGreaterThan(0);
  });
});

describe("doorPanelCount", () => {
  it("vestments has 2 panels", () => {
    expect(doorPanelCount("vestments")).toBe(2);
  });
  it("eucharist has 1 panel", () => {
    expect(doorPanelCount("eucharist")).toBe(1);
  });
});

describe("lockRequired", () => {
  it("eucharist requires lock", () => {
    expect(lockRequired("eucharist")).toBe(true);
  });
  it("vestments no lock", () => {
    expect(lockRequired("vestments")).toBe(false);
  });
});

describe("lintelThicknessCm", () => {
  it("20% of width", () => {
    expect(lintelThicknessCm(30)).toBe(6);
  });
});

describe("carvingHours", () => {
  it("eucharist longest", () => {
    expect(carvingHours("eucharist")).toBeGreaterThan(carvingHours("oils"));
  });
});

describe("consecrationRequired", () => {
  it("eucharist requires consecration", () => {
    expect(consecrationRequired("eucharist")).toBe(true);
  });
  it("books does not", () => {
    expect(consecrationRequired("books")).toBe(false);
  });
});

describe("restorationCost", () => {
  it("positive cost", () => {
    expect(restorationCost("eucharist", 50)).toBeGreaterThan(0);
  });
});

describe("aumbryPurposes", () => {
  it("returns 5 purposes", () => {
    expect(aumbryPurposes()).toHaveLength(5);
  });
});
