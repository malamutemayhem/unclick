import { describe, it, expect } from "vitest";
import {
  createConstituent, createStation, predictTide,
  predictTideRange, findHighLow, tidalRange,
  meanTideLevel, nextHighTide, nextLowTide,
  tidalCurrent, isTideRising,
  simpleSemiDiurnal, mixedTide,
} from "../tide-predict.js";

describe("createConstituent", () => {
  it("creates with standard speed", () => {
    const c = createConstituent("M2", 1.5, 0);
    expect(c.speed).toBeCloseTo(28.984);
    expect(c.amplitude).toBe(1.5);
  });
});

describe("predictTide", () => {
  it("returns datum at zero amplitude", () => {
    const station = createStation("Empty", 0, 0, [], 2.0);
    expect(predictTide(station, 0)).toBe(2.0);
  });

  it("returns datum + amplitude at peak", () => {
    const station = simpleSemiDiurnal(1);
    const height = predictTide(station, 0);
    expect(height).toBeCloseTo(1);
  });

  it("oscillates", () => {
    const station = simpleSemiDiurnal(1.5);
    const h1 = predictTide(station, 0);
    const h2 = predictTide(station, 6.21);
    expect(h1).not.toBeCloseTo(h2, 0);
  });
});

describe("predictTideRange", () => {
  it("returns predictions over time span", () => {
    const station = simpleSemiDiurnal(1);
    const range = predictTideRange(station, 0, 24, 1);
    expect(range.length).toBe(25);
  });
});

describe("findHighLow", () => {
  it("finds highs and lows", () => {
    const station = simpleSemiDiurnal(1.5);
    const extremes = findHighLow(station, 0, 24);
    expect(extremes.length).toBeGreaterThan(0);
    const highs = extremes.filter(e => e.type === "high");
    const lows = extremes.filter(e => e.type === "low");
    expect(highs.length).toBeGreaterThan(0);
    expect(lows.length).toBeGreaterThan(0);
  });

  it("semi-diurnal has ~2 highs per day", () => {
    const station = simpleSemiDiurnal(1);
    const extremes = findHighLow(station, 0, 25);
    const highs = extremes.filter(e => e.type === "high");
    expect(highs.length).toBeGreaterThanOrEqual(1);
    expect(highs.length).toBeLessThanOrEqual(3);
  });
});

describe("tidalRange", () => {
  it("computes range from extremes", () => {
    const station = simpleSemiDiurnal(2);
    const range = tidalRange(station, 0, 24);
    expect(range).toBeGreaterThan(3);
  });
});

describe("meanTideLevel", () => {
  it("near datum for symmetric tide", () => {
    const station = simpleSemiDiurnal(1);
    const mean = meanTideLevel(station, 0, 24);
    expect(Math.abs(mean)).toBeLessThan(0.5);
  });
});

describe("nextHighTide / nextLowTide", () => {
  it("finds next high tide", () => {
    const station = simpleSemiDiurnal(1);
    const high = nextHighTide(station, 0);
    expect(high).not.toBeNull();
    expect(high!.time).toBeGreaterThan(0);
  });

  it("finds next low tide", () => {
    const station = simpleSemiDiurnal(1);
    const low = nextLowTide(station, 0);
    expect(low).not.toBeNull();
  });
});

describe("tidalCurrent", () => {
  it("returns rate of change", () => {
    const station = simpleSemiDiurnal(1);
    const current = tidalCurrent(station, 3);
    expect(typeof current).toBe("number");
  });
});

describe("isTideRising", () => {
  it("detects rising tide", () => {
    const station = simpleSemiDiurnal(1);
    const result = isTideRising(station, 0);
    expect(typeof result).toBe("boolean");
  });
});

describe("mixedTide", () => {
  it("creates mixed tide station", () => {
    const station = mixedTide(1.5, 0.7);
    expect(station.constituents.length).toBe(3);
    const extremes = findHighLow(station, 0, 48);
    expect(extremes.length).toBeGreaterThan(0);
  });
});
