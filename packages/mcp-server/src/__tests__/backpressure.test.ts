import { describe, it, expect } from "vitest";
import { BackpressureController } from "../backpressure.js";

describe("BackpressureController", () => {
  it("push and pull work in FIFO order", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 10, lowWatermark: 5, strategy: "buffer",
    });
    bp.push(1);
    bp.push(2);
    expect(bp.pull()).toBe(1);
    expect(bp.pull()).toBe(2);
  });

  it("pauses when buffer exceeds highWatermark", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 3, lowWatermark: 1, strategy: "buffer",
    });
    bp.push(1);
    bp.push(2);
    bp.push(3);
    expect(bp.isPaused()).toBe(false);
    bp.push(4);
    expect(bp.isPaused()).toBe(true);
  });

  it("resumes when buffer drops to lowWatermark", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 3, lowWatermark: 1, strategy: "buffer",
    });
    bp.push(1); bp.push(2); bp.push(3); bp.push(4);
    expect(bp.isPaused()).toBe(true);
    bp.pull(); bp.pull(); bp.pull();
    expect(bp.isPaused()).toBe(false);
  });

  it("drop strategy drops items when full", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 2, lowWatermark: 0, strategy: "drop",
    });
    bp.push(1); bp.push(2);
    expect(bp.push(3)).toBe(false);
    expect(bp.stats().dropped).toBe(1);
  });

  it("pullBatch retrieves multiple items", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 100, lowWatermark: 0, strategy: "buffer",
    });
    for (let i = 0; i < 5; i++) bp.push(i);
    const batch = bp.pullBatch(3);
    expect(batch).toEqual([0, 1, 2]);
  });

  it("pressure returns ratio", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 10, lowWatermark: 0, strategy: "buffer",
    });
    bp.push(1); bp.push(2); bp.push(3); bp.push(4); bp.push(5);
    expect(bp.pressure()).toBeCloseTo(0.5);
  });

  it("drain empties buffer", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 10, lowWatermark: 0, strategy: "buffer",
    });
    bp.push(1); bp.push(2);
    const items = bp.drain();
    expect(items).toEqual([1, 2]);
    expect(bp.bufferSize()).toBe(0);
  });

  it("stats returns accurate counts", () => {
    const bp = new BackpressureController<number>({
      highWatermark: 10, lowWatermark: 0, strategy: "buffer",
    });
    bp.push(1); bp.push(2); bp.pull();
    const s = bp.stats();
    expect(s.buffered).toBe(1);
    expect(s.processed).toBe(1);
    expect(s.dropped).toBe(0);
  });
});
