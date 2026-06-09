import { describe, it, expect } from "vitest";
import { TCPCongestion, LeakyBucket, TokenBucket } from "../congestion-control.js";

describe("TCPCongestion", () => {
  it("starts in slow-start", () => {
    const cc = new TCPCongestion();
    expect(cc.currentState).toBe("slow-start");
    expect(cc.window).toBe(1);
  });

  it("slow-start doubles window", () => {
    const cc = new TCPCongestion(1, 1, 64);
    cc.onAck();
    expect(cc.window).toBe(2);
    cc.onAck();
    expect(cc.window).toBe(3);
  });

  it("transitions to congestion-avoidance at ssthresh", () => {
    const cc = new TCPCongestion(1, 1, 4);
    cc.onAck();
    cc.onAck();
    cc.onAck();
    expect(cc.currentState).toBe("congestion-avoidance");
  });

  it("timeout resets to slow-start", () => {
    const cc = new TCPCongestion(1, 1, 64);
    for (let i = 0; i < 10; i++) cc.onAck();
    cc.onTimeout();
    expect(cc.currentState).toBe("slow-start");
    expect(cc.window).toBe(1);
  });

  it("3 dup acks trigger fast recovery", () => {
    const cc = new TCPCongestion(1, 1, 64);
    for (let i = 0; i < 10; i++) cc.onAck();
    cc.onDupAck();
    cc.onDupAck();
    cc.onDupAck();
    expect(cc.currentState).toBe("fast-recovery");
  });

  it("ack in fast recovery returns to congestion avoidance", () => {
    const cc = new TCPCongestion(1, 1, 64);
    for (let i = 0; i < 10; i++) cc.onAck();
    cc.onDupAck();
    cc.onDupAck();
    cc.onDupAck();
    cc.onAck();
    expect(cc.currentState).toBe("congestion-avoidance");
  });

  it("history tracks changes", () => {
    const cc = new TCPCongestion();
    cc.onAck();
    cc.onAck();
    expect(cc.getHistory().length).toBe(2);
  });

  it("reset clears state", () => {
    const cc = new TCPCongestion();
    cc.onAck();
    cc.reset();
    expect(cc.window).toBe(1);
    expect(cc.currentState).toBe("slow-start");
    expect(cc.getHistory()).toHaveLength(0);
  });
});

describe("LeakyBucket", () => {
  it("accepts within capacity", () => {
    const bucket = new LeakyBucket(10, 1);
    expect(bucket.add(5, 0)).toBe(true);
    expect(bucket.currentLevel).toBe(5);
  });

  it("rejects over capacity", () => {
    const bucket = new LeakyBucket(10, 1);
    expect(bucket.add(11, 0)).toBe(false);
  });

  it("drains over time", () => {
    const bucket = new LeakyBucket(10, 1);
    bucket.add(5, 0);
    expect(bucket.add(5, 3)).toBe(true);
  });

  it("available reports remaining capacity", () => {
    const bucket = new LeakyBucket(10, 1);
    bucket.add(4, 0);
    expect(bucket.available).toBe(6);
  });
});

describe("TokenBucket", () => {
  it("starts full", () => {
    const bucket = new TokenBucket(10, 1);
    expect(bucket.availableTokens).toBe(10);
  });

  it("consume reduces tokens", () => {
    const bucket = new TokenBucket(10, 1);
    expect(bucket.consume(3, 0)).toBe(true);
    expect(bucket.availableTokens).toBe(7);
  });

  it("rejects insufficient tokens", () => {
    const bucket = new TokenBucket(5, 1);
    expect(bucket.consume(6, 0)).toBe(false);
  });

  it("refills over time", () => {
    const bucket = new TokenBucket(10, 2);
    bucket.consume(8, 0);
    expect(bucket.consume(3, 2)).toBe(true);
  });
});
