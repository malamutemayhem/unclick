import { describe, it, expect, vi } from "vitest";
import { EventAggregator } from "../event-aggregator.js";

describe("EventAggregator", () => {
  it("flushes when maxSize is reached", () => {
    const batches: Array<{ count: number }> = [];
    const agg = new EventAggregator<string>({
      flush: (b) => batches.push({ count: b.count }),
      maxSize: 3,
      maxWaitMs: 60000,
    });
    agg.push("a");
    agg.push("b");
    expect(batches).toHaveLength(0);
    agg.push("c");
    expect(batches).toHaveLength(1);
    expect(batches[0].count).toBe(3);
  });

  it("flushes on timer", () => {
    vi.useFakeTimers();
    const batches: Array<{ count: number }> = [];
    const agg = new EventAggregator<string>({
      flush: (b) => batches.push({ count: b.count }),
      maxSize: 100,
      maxWaitMs: 500,
    });
    agg.push("a");
    expect(batches).toHaveLength(0);
    vi.advanceTimersByTime(500);
    expect(batches).toHaveLength(1);
    expect(batches[0].count).toBe(1);
    vi.useRealTimers();
  });

  it("manual flush empties buffer", () => {
    const events: string[][] = [];
    const agg = new EventAggregator<string>({
      flush: (b) => events.push(b.events),
      maxSize: 100,
    });
    agg.push("x");
    agg.push("y");
    agg.flush();
    expect(events).toEqual([["x", "y"]]);
    expect(agg.pending).toBe(0);
  });

  it("flush on empty buffer is a no-op", () => {
    let called = false;
    const agg = new EventAggregator<string>({
      flush: () => { called = true; },
    });
    agg.flush();
    expect(called).toBe(false);
  });

  it("dispose flushes remaining events", () => {
    const events: string[][] = [];
    const agg = new EventAggregator<string>({
      flush: (b) => events.push(b.events),
      maxSize: 100,
    });
    agg.push("final");
    agg.dispose();
    expect(events).toEqual([["final"]]);
  });

  it("pending tracks buffered count", () => {
    const agg = new EventAggregator<number>({
      flush: () => {},
      maxSize: 100,
    });
    expect(agg.pending).toBe(0);
    agg.push(1);
    agg.push(2);
    expect(agg.pending).toBe(2);
  });
});
