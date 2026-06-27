import { describe, it, expect } from "vitest";
import {
  createGrid, setTemperature, getTemperature, addHeatSource,
  step, stepN, getAverageTemp, getMaxTemp, getMinTemp,
  toAscii, getTotalEnergy,
} from "../heat-diffusion.js";

describe("createGrid", () => {
  it("creates grid with initial temperature", () => {
    const g = createGrid(10, 10, 20);
    expect(getTemperature(g, 0, 0)).toBe(20);
    expect(getAverageTemp(g)).toBe(20);
  });
});

describe("setTemperature/getTemperature", () => {
  it("sets and gets", () => {
    const g = createGrid(10, 10);
    setTemperature(g, 5, 5, 100);
    expect(getTemperature(g, 5, 5)).toBe(100);
  });

  it("returns 0 for out of bounds", () => {
    const g = createGrid(5, 5);
    expect(getTemperature(g, -1, 0)).toBe(0);
  });
});

describe("addHeatSource", () => {
  it("heats a circular area", () => {
    const g = createGrid(20, 20);
    addHeatSource(g, 10, 10, 3, 100);
    expect(getTemperature(g, 10, 10)).toBe(100);
    expect(getTemperature(g, 10, 12)).toBe(100);
    expect(getTemperature(g, 0, 0)).toBe(0);
  });
});

describe("step", () => {
  it("diffuses heat", () => {
    const g = createGrid(10, 10);
    setTemperature(g, 5, 5, 100);
    step(g);
    expect(getTemperature(g, 5, 5)).toBeLessThan(100);
    expect(getTemperature(g, 5, 4)).toBeGreaterThan(0);
  });
});

describe("stepN", () => {
  it("runs multiple steps", () => {
    const g = createGrid(10, 10);
    setTemperature(g, 5, 5, 100);
    stepN(g, 50);
    expect(getMaxTemp(g)).toBeLessThan(100);
    expect(getMinTemp(g)).toBeGreaterThan(-1);
  });
});

describe("getAverageTemp", () => {
  it("averages all cells", () => {
    const g = createGrid(10, 10, 50);
    expect(getAverageTemp(g)).toBe(50);
  });
});

describe("getMaxTemp/getMinTemp", () => {
  it("finds extremes", () => {
    const g = createGrid(5, 5, 20);
    setTemperature(g, 0, 0, 100);
    setTemperature(g, 4, 4, -10);
    expect(getMaxTemp(g)).toBe(100);
    expect(getMinTemp(g)).toBe(-10);
  });
});

describe("toAscii", () => {
  it("renders heatmap", () => {
    const g = createGrid(10, 5, 0);
    setTemperature(g, 5, 2, 100);
    const ascii = toAscii(g);
    expect(ascii.split("\n").length).toBe(5);
  });
});

describe("getTotalEnergy", () => {
  it("sums all temperatures", () => {
    const g = createGrid(2, 2, 25);
    expect(getTotalEnergy(g)).toBe(100);
  });
});
