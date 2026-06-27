import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Timer, Stopwatch, debounceTimer } from "../timer.js";

describe("Timer", () => {
  it("starts and stops", () => {
    const t = new Timer();
    t.start();
    expect(t.running).toBe(true);
    const elapsed = t.stop();
    expect(t.running).toBe(false);
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });

  it("accumulates across start/stop cycles", () => {
    const t = new Timer();
    t.start();
    t.stop();
    const first = t.ms;
    t.start();
    t.stop();
    expect(t.ms).toBeGreaterThanOrEqual(first);
  });

  it("reset clears elapsed", () => {
    const t = new Timer();
    t.start();
    t.stop();
    t.reset();
    expect(t.ms).toBe(0);
    expect(t.running).toBe(false);
  });

  it("restart resets and starts", () => {
    const t = new Timer();
    t.start();
    t.stop();
    t.restart();
    expect(t.running).toBe(true);
  });

  it("seconds is ms / 1000", () => {
    const t = new Timer();
    t.start();
    t.stop();
    expect(t.seconds).toBeCloseTo(t.ms / 1000, 5);
  });

  it("ms returns live value when running", () => {
    const t = new Timer();
    t.start();
    const ms1 = t.ms;
    const ms2 = t.ms;
    expect(ms2).toBeGreaterThanOrEqual(ms1);
  });

  it("start is idempotent when already running", () => {
    const t = new Timer();
    t.start();
    const r = t.start();
    expect(r).toBe(t);
    expect(t.running).toBe(true);
  });

  it("stop returns elapsed when not running", () => {
    const t = new Timer();
    expect(t.stop()).toBe(0);
  });

  it("measure times a sync function", () => {
    const elapsed = Timer.measure(() => {
      let x = 0;
      for (let i = 0; i < 1000; i++) x += i;
    });
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });

  it("measureAsync times an async function", async () => {
    const elapsed = await Timer.measureAsync(async () => {
      await new Promise((r) => setTimeout(r, 5));
    });
    expect(elapsed).toBeGreaterThanOrEqual(4);
  });
});

describe("Stopwatch", () => {
  it("records laps", () => {
    const sw = new Stopwatch();
    sw.start();
    const lap1 = sw.lap();
    const lap2 = sw.lap();
    expect(lap1).toBeGreaterThanOrEqual(0);
    expect(lap2).toBeGreaterThanOrEqual(0);
    expect(sw.getLaps()).toHaveLength(2);
  });

  it("stop records a final lap", () => {
    const sw = new Stopwatch();
    sw.start();
    sw.lap();
    sw.stop();
    expect(sw.getLaps()).toHaveLength(2);
  });

  it("total returns overall time", () => {
    const sw = new Stopwatch();
    sw.start();
    sw.lap();
    expect(sw.total).toBeGreaterThanOrEqual(0);
  });

  it("reset clears laps", () => {
    const sw = new Stopwatch();
    sw.start();
    sw.lap();
    sw.reset();
    expect(sw.getLaps()).toHaveLength(0);
  });
});

describe("debounceTimer", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("calls fn after delay", () => {
    const fn = vi.fn();
    const { trigger } = debounceTimer(fn, 100);
    trigger();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("resets on repeated triggers", () => {
    const fn = vi.fn();
    const { trigger } = debounceTimer(fn, 100);
    trigger();
    vi.advanceTimersByTime(50);
    trigger();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancel prevents execution", () => {
    const fn = vi.fn();
    const { trigger, cancel } = debounceTimer(fn, 100);
    trigger();
    cancel();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();
  });
});
