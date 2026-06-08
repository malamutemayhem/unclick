import { describe, it, expect } from "vitest";
import { BandwidthCalculator } from "../bandwidth-calc.js";

describe("BandwidthCalculator", () => {
  it("converts data units", () => {
    expect(BandwidthCalculator.convertData(1, "MB", "KB")).toBeCloseTo(1024);
    expect(BandwidthCalculator.convertData(1, "GB", "MB")).toBeCloseTo(1024);
    expect(BandwidthCalculator.convertData(1, "bytes", "bits")).toBeCloseTo(8);
  });

  it("calculates transfer time", () => {
    const time = BandwidthCalculator.transferTime(100, "MB", 10, "MB", "seconds");
    expect(time).toBeCloseTo(10);
  });

  it("calculates required bandwidth", () => {
    const bw = BandwidthCalculator.requiredBandwidth(600, "MB", 1, "minutes", "MB");
    expect(bw).toBeCloseTo(10, 0);
  });

  it("calculates throughput", () => {
    const tp = BandwidthCalculator.throughput(1, "GB", 100, "seconds", "MB");
    expect(tp).toBeCloseTo(10.24, 0);
  });

  it("calculates monthly usage", () => {
    const usage = BandwidthCalculator.monthlyUsage(1, "MB", 24, "GB");
    expect(usage).toBeGreaterThan(0);
  });

  it("formats file size", () => {
    expect(BandwidthCalculator.formatSize(1024)).toBe("1.00 KB");
    expect(BandwidthCalculator.formatSize(1048576)).toBe("1.00 MB");
    expect(BandwidthCalculator.formatSize(500)).toBe("500.00 B");
  });

  it("formats bit rate", () => {
    expect(BandwidthCalculator.formatBitRate(1000000)).toBe("1.00 Mbps");
    expect(BandwidthCalculator.formatBitRate(500)).toBe("500.00 bps");
  });

  it("calculates latency impact", () => {
    const result = BandwidthCalculator.latencyImpact(100, "MB", 50);
    expect(result.effectiveThroughput).toBeGreaterThan(0);
    expect(result.overhead).toBeGreaterThanOrEqual(0);
    expect(result.overhead).toBeLessThanOrEqual(1);
  });

  it("handles large transfers", () => {
    const time = BandwidthCalculator.transferTime(1, "TB", 100, "MB", "hours");
    expect(time).toBeGreaterThan(0);
  });
});
