import { describe, it, expect } from "vitest";
import { OutlierDetector } from "../outlier-detector.js";

describe("OutlierDetector", () => {
  const data = [10, 12, 11, 13, 12, 11, 100, 10, 12, 11];

  it("zScore detects extreme values", () => {
    const results = OutlierDetector.zScore(data, 2);
    const outliers = results.filter((r) => r.isOutlier);
    expect(outliers.length).toBe(1);
    expect(outliers[0].value).toBe(100);
  });

  it("iqr detects outliers using interquartile range", () => {
    const results = OutlierDetector.iqr(data);
    const outliers = results.filter((r) => r.isOutlier);
    expect(outliers.length).toBeGreaterThan(0);
    expect(outliers[0].value).toBe(100);
  });

  it("modifiedZScore uses median-based detection", () => {
    const results = OutlierDetector.modifiedZScore(data);
    const outliers = results.filter((r) => r.isOutlier);
    expect(outliers.length).toBeGreaterThan(0);
  });

  it("getOutliers returns outlier values", () => {
    const outliers = OutlierDetector.getOutliers(data);
    expect(outliers).toContain(100);
  });

  it("removeOutliers returns clean data", () => {
    const clean = OutlierDetector.removeOutliers(data);
    expect(clean).not.toContain(100);
    expect(clean.length).toBeLessThan(data.length);
  });

  it("bounds returns IQR boundaries", () => {
    const b = OutlierDetector.bounds(data);
    expect(b.lower).toBeLessThan(10);
    expect(b.upper).toBeGreaterThan(13);
  });

  it("handles uniform data", () => {
    const uniform = [5, 5, 5, 5, 5];
    const results = OutlierDetector.zScore(uniform);
    expect(results.every((r) => !r.isOutlier)).toBe(true);
  });

  it("uses different methods via getOutliers", () => {
    const zOutliers = OutlierDetector.getOutliers(data, "zscore");
    const iqrOutliers = OutlierDetector.getOutliers(data, "iqr");
    expect(zOutliers.length).toBeGreaterThan(0);
    expect(iqrOutliers.length).toBeGreaterThan(0);
  });
});
