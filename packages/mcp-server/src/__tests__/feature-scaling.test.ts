import { describe, it, expect } from "vitest";
import { FeatureScaling } from "../feature-scaling.js";

describe("FeatureScaling", () => {
  it("minMax scales to 0-1 range", () => {
    const result = FeatureScaling.minMax([10, 20, 30, 40, 50]);
    expect(result[0]).toBe(0);
    expect(result[4]).toBe(1);
    expect(result[2]).toBe(0.5);
  });

  it("minMax handles uniform data", () => {
    const result = FeatureScaling.minMax([5, 5, 5]);
    expect(result).toEqual([0, 0, 0]);
  });

  it("standardize produces mean 0 and std 1", () => {
    const result = FeatureScaling.standardize([2, 4, 4, 4, 5, 5, 7, 9]);
    const mean = result.reduce((s, v) => s + v, 0) / result.length;
    expect(mean).toBeCloseTo(0, 2);
  });

  it("robust uses median and IQR", () => {
    const result = FeatureScaling.robust([1, 2, 3, 4, 5, 6, 7, 8, 100]);
    expect(result.length).toBe(9);
    const outlierIdx = result.indexOf(Math.max(...result));
    expect(outlierIdx).toBe(8);
  });

  it("maxAbs scales by maximum absolute value", () => {
    const result = FeatureScaling.maxAbs([-10, 5, 10]);
    expect(result[0]).toBe(-1);
    expect(result[2]).toBe(1);
    expect(result[1]).toBe(0.5);
  });

  it("log applies log1p transform", () => {
    const result = FeatureScaling.log([0, 1, 9, 99]);
    expect(result[0]).toBe(0);
    expect(result[1]).toBeCloseTo(0.6931, 3);
  });

  it("l2Normalize produces unit vector", () => {
    const result = FeatureScaling.l2Normalize([3, 4]);
    expect(result[0]).toBe(0.6);
    expect(result[1]).toBe(0.8);
    const norm = Math.sqrt(result.reduce((s, v) => s + v * v, 0));
    expect(norm).toBeCloseTo(1, 3);
  });

  it("batchMinMax scales each dimension independently", () => {
    const data = [[0, 100], [5, 200], [10, 300]];
    const result = FeatureScaling.batchMinMax(data);
    expect(result[0][0]).toBe(0);
    expect(result[2][0]).toBe(1);
    expect(result[0][1]).toBe(0);
    expect(result[2][1]).toBe(1);
  });

  it("batchStandardize scales each dimension", () => {
    const data = [[1, 10], [2, 20], [3, 30]];
    const result = FeatureScaling.batchStandardize(data);
    expect(result.length).toBe(3);
    expect(result[0].length).toBe(2);
  });

  it("l2Normalize handles zero vector", () => {
    const result = FeatureScaling.l2Normalize([0, 0, 0]);
    expect(result).toEqual([0, 0, 0]);
  });
});
