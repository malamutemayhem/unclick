import { describe, it, expect } from "vitest";
import { FilterDesign } from "../filter-design.js";

describe("FilterDesign", () => {
  it("lowPass creates coefficients", () => {
    const filter = FilterDesign.lowPass(100, 1000, 5);
    expect(filter.b.length).toBe(5);
    expect(filter.a).toEqual([1]);
  });

  it("lowPass coefficients sum to approximately 1", () => {
    const filter = FilterDesign.lowPass(100, 1000, 7);
    const sum = filter.b.reduce((s, v) => s + v, 0);
    expect(sum).toBeCloseTo(1, 1);
  });

  it("highPass creates coefficients", () => {
    const filter = FilterDesign.highPass(100, 1000, 5);
    expect(filter.b.length).toBe(5);
  });

  it("bandPass creates coefficients", () => {
    const filter = FilterDesign.bandPass(100, 400, 1000, 5);
    expect(filter.b.length).toBe(5);
  });

  it("apply filters a signal", () => {
    const filter = FilterDesign.movingAverage(3);
    const signal = [1, 5, 1, 5, 1, 5, 1];
    const result = FilterDesign.apply(signal, filter);
    expect(result.length).toBe(signal.length);
  });

  it("apply with movingAverage smooths", () => {
    const filter = FilterDesign.movingAverage(3);
    const signal = [0, 0, 3, 0, 0];
    const result = FilterDesign.apply(signal, filter);
    expect(result[2]).toBeCloseTo(1, 0);
  });

  it("frequencyResponse returns correct number of points", () => {
    const filter = FilterDesign.lowPass(100, 1000, 5);
    const response = FilterDesign.frequencyResponse(filter, 32);
    expect(response.length).toBe(32);
    expect(response[0].frequency).toBe(0);
  });

  it("movingAverage creates uniform coefficients", () => {
    const filter = FilterDesign.movingAverage(4);
    expect(filter.b.length).toBe(4);
    expect(filter.b[0]).toBe(0.25);
  });

  it("exponentialSmoothing creates IIR filter", () => {
    const filter = FilterDesign.exponentialSmoothing(0.3);
    expect(filter.b[0]).toBe(0.3);
    expect(filter.a.length).toBe(2);
    expect(filter.a[1]).toBeCloseTo(-0.7, 3);
  });

  it("exponentialSmoothing applies correctly", () => {
    const filter = FilterDesign.exponentialSmoothing(0.5);
    const signal = [10, 20, 30, 40, 50];
    const result = FilterDesign.apply(signal, filter);
    expect(result[0]).toBe(5);
    expect(result.length).toBe(5);
  });
});
