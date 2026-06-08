import { describe, it, expect } from "vitest";
import { measure, measureSync, Stopwatch, Timer } from "../measure.js";

describe("measure", () => {
  it("measures async function duration", async () => {
    const result = await measure(async () => {
      return 42;
    });
    expect(result.result).toBe(42);
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });
});

describe("measureSync", () => {
  it("measures sync function duration", () => {
    const result = measureSync(() => "hello");
    expect(result.result).toBe("hello");
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });
});

describe("Stopwatch", () => {
  it("starts and stops", () => {
    const sw = new Stopwatch();
    sw.start();
    sw.stop();
    expect(sw.elapsed).toBeGreaterThanOrEqual(0);
  });

  it("tracks running state", () => {
    const sw = new Stopwatch();
    expect(sw.isRunning).toBe(false);
    sw.start();
    expect(sw.isRunning).toBe(true);
    sw.stop();
    expect(sw.isRunning).toBe(false);
  });

  it("resets to zero", () => {
    const sw = new Stopwatch();
    sw.start();
    sw.stop();
    sw.reset();
    expect(sw.elapsed).toBe(0);
    expect(sw.isRunning).toBe(false);
  });

  it("ignores double start", () => {
    const sw = new Stopwatch();
    sw.start();
    sw.start();
    expect(sw.isRunning).toBe(true);
  });

  it("stop returns accumulated", () => {
    const sw = new Stopwatch();
    const result = sw.stop();
    expect(result).toBe(0);
  });

  it("lap resets and restarts", () => {
    const sw = new Stopwatch();
    sw.start();
    const lapTime = sw.lap();
    expect(lapTime).toBeGreaterThanOrEqual(0);
    expect(sw.isRunning).toBe(true);
  });
});

describe("Timer", () => {
  it("records and counts samples", () => {
    const t = new Timer();
    t.record(10);
    t.record(20);
    t.record(30);
    expect(t.count).toBe(3);
  });

  it("computes min and max", () => {
    const t = new Timer();
    t.record(5);
    t.record(15);
    t.record(10);
    expect(t.min).toBe(5);
    expect(t.max).toBe(15);
  });

  it("computes mean", () => {
    const t = new Timer();
    t.record(10);
    t.record(20);
    t.record(30);
    expect(t.mean).toBe(20);
  });

  it("computes percentile", () => {
    const t = new Timer();
    for (let i = 1; i <= 100; i++) t.record(i);
    expect(t.percentile(50)).toBeCloseTo(50.5, 1);
    expect(t.percentile(0)).toBe(1);
    expect(t.percentile(100)).toBe(100);
  });

  it("resets samples", () => {
    const t = new Timer();
    t.record(10);
    t.reset();
    expect(t.count).toBe(0);
  });
});
