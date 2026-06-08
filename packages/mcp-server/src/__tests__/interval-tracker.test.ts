import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { IntervalTracker, Stopwatch } from "../interval-tracker.js";

describe("IntervalTracker", () => {
  it("calculates average interval", () => {
    const tracker = new IntervalTracker();
    tracker.record(1000);
    tracker.record(2000);
    tracker.record(3000);
    expect(tracker.averageMs()).toBe(1000);
  });

  it("returns 0 for fewer than 2 samples", () => {
    const tracker = new IntervalTracker();
    expect(tracker.averageMs()).toBe(0);
    tracker.record(1000);
    expect(tracker.averageMs()).toBe(0);
  });

  it("calculates min and max", () => {
    const tracker = new IntervalTracker();
    tracker.record(1000);
    tracker.record(1500);
    tracker.record(3000);
    expect(tracker.minMs()).toBe(500);
    expect(tracker.maxMs()).toBe(1500);
  });

  it("respects maxSamples", () => {
    const tracker = new IntervalTracker(3);
    for (let i = 0; i < 10; i++) tracker.record(i * 100);
    expect(tracker.sampleCount).toBe(3);
  });

  it("reset clears everything", () => {
    const tracker = new IntervalTracker();
    tracker.record(1000);
    tracker.reset();
    expect(tracker.sampleCount).toBe(0);
  });
});

describe("Stopwatch", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("measures elapsed time", () => {
    const sw = new Stopwatch();
    sw.start();
    vi.advanceTimersByTime(500);
    sw.stop();
    expect(sw.elapsedMs).toBe(500);
  });

  it("start is idempotent", () => {
    const sw = new Stopwatch();
    sw.start();
    vi.advanceTimersByTime(100);
    sw.start();
    vi.advanceTimersByTime(100);
    sw.stop();
    expect(sw.elapsedMs).toBe(200);
  });

  it("accumulates across start/stop cycles", () => {
    const sw = new Stopwatch();
    sw.start();
    vi.advanceTimersByTime(100);
    sw.stop();
    sw.start();
    vi.advanceTimersByTime(200);
    sw.stop();
    expect(sw.elapsedMs).toBe(300);
  });

  it("reset clears elapsed", () => {
    const sw = new Stopwatch();
    sw.start();
    vi.advanceTimersByTime(500);
    sw.stop();
    sw.reset();
    expect(sw.elapsedMs).toBe(0);
    expect(sw.isRunning).toBe(false);
  });
});
