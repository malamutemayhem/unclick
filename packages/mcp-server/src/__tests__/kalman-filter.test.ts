import { describe, it, expect } from "vitest";
import { KalmanFilter1D, ExponentialSmoothing, MovingAverageFilter } from "../kalman-filter.js";

describe("KalmanFilter1D", () => {
  it("converges toward measurements", () => {
    const kf = new KalmanFilter1D(0, 1, 0.01, 0.1);
    const results = kf.filter([10, 10, 10, 10, 10]);
    expect(results[results.length - 1]).toBeCloseTo(10, 0);
  });

  it("reduces error covariance over time", () => {
    const kf = new KalmanFilter1D(0, 1, 0.01, 0.1);
    const initial = kf.getState().errorCovariance;
    kf.filter([5, 5, 5]);
    expect(kf.getState().errorCovariance).toBeLessThan(initial);
  });

  it("tracks history", () => {
    const kf = new KalmanFilter1D(0, 1, 0.01, 0.1);
    kf.step(5);
    kf.step(5);
    expect(kf.getHistory()).toHaveLength(3);
  });

  it("calculates Kalman gain", () => {
    const kf = new KalmanFilter1D(0, 1, 0.01, 0.1);
    const gain = kf.getKalmanGain();
    expect(gain).toBeGreaterThan(0);
    expect(gain).toBeLessThanOrEqual(1);
  });

  it("resets state", () => {
    const kf = new KalmanFilter1D(0, 1, 0.01, 0.1);
    kf.filter([5, 5, 5]);
    kf.reset(0, 1);
    expect(kf.getState().estimate).toBe(0);
    expect(kf.getHistory()).toHaveLength(1);
  });

  it("handles control input", () => {
    const kf = new KalmanFilter1D(0, 1, 0.01, 0.1);
    const result = kf.step(10, 5);
    expect(result.estimate).toBeGreaterThan(0);
  });
});

describe("ExponentialSmoothing", () => {
  it("smooths toward measurements", () => {
    const es = new ExponentialSmoothing(0.5, 0);
    es.update(10);
    expect(es.getValue()).toBe(5);
    es.update(10);
    expect(es.getValue()).toBe(7.5);
  });

  it("filters array of values", () => {
    const es = new ExponentialSmoothing(0.3, 0);
    const results = es.filter([10, 10, 10, 10]);
    expect(results[results.length - 1]).toBeGreaterThan(0);
    expect(results[results.length - 1]).toBeLessThan(10);
  });

  it("tracks history", () => {
    const es = new ExponentialSmoothing(0.5, 0);
    es.update(10);
    es.update(10);
    expect(es.getHistory()).toHaveLength(3);
  });

  it("throws on invalid alpha", () => {
    expect(() => new ExponentialSmoothing(0)).toThrow();
    expect(() => new ExponentialSmoothing(1.5)).toThrow();
  });

  it("resets value", () => {
    const es = new ExponentialSmoothing(0.5, 10);
    es.update(20);
    es.reset(0);
    expect(es.getValue()).toBe(0);
  });
});

describe("MovingAverageFilter", () => {
  it("computes moving average", () => {
    const ma = new MovingAverageFilter(3);
    expect(ma.update(3)).toBe(3);
    expect(ma.update(6)).toBe(4.5);
    expect(ma.update(9)).toBe(6);
    expect(ma.update(12)).toBe(9);
  });

  it("filters array", () => {
    const ma = new MovingAverageFilter(2);
    const results = ma.filter([2, 4, 6, 8]);
    expect(results).toEqual([2, 3, 5, 7]);
  });

  it("tracks fullness", () => {
    const ma = new MovingAverageFilter(3);
    expect(ma.isFull()).toBe(false);
    ma.update(1);
    ma.update(2);
    expect(ma.isFull()).toBe(false);
    ma.update(3);
    expect(ma.isFull()).toBe(true);
  });

  it("resets state", () => {
    const ma = new MovingAverageFilter(3);
    ma.update(10);
    ma.reset();
    expect(ma.average()).toBe(0);
    expect(ma.isFull()).toBe(false);
  });

  it("throws on invalid size", () => {
    expect(() => new MovingAverageFilter(0)).toThrow();
  });
});
