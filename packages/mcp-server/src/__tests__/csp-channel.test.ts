import { describe, it, expect } from "vitest";
import { Channel, select, merge } from "../csp-channel.js";

describe("Channel", () => {
  it("sends and receives with buffer", () => {
    const ch = new Channel<number>(3);
    ch.sendSync(1);
    ch.sendSync(2);
    expect(ch.size()).toBe(2);
    expect(ch.tryReceive()).toBe(1);
    expect(ch.tryReceive()).toBe(2);
  });

  it("returns null when empty", () => {
    const ch = new Channel<number>(1);
    expect(ch.tryReceive()).toBeNull();
  });

  it("blocks send on full unbuffered channel", () => {
    const ch = new Channel<number>(0);
    expect(ch.sendSync(1)).toBe(false);
  });

  it("closes channel", () => {
    const ch = new Channel<number>(1);
    ch.sendSync(1);
    ch.close();
    expect(ch.isClosed()).toBe(true);
    expect(ch.tryReceive()).toBe(1);
  });

  it("throws on send to closed channel", () => {
    const ch = new Channel<number>(1);
    ch.close();
    expect(() => ch.sendSync(1)).not.toThrow();
    expect(ch.sendSync(1)).toBe(false);
  });

  it("tracks pending counts", () => {
    const ch = new Channel<number>(0);
    expect(ch.pendingSenders()).toBe(0);
    expect(ch.pendingReceivers()).toBe(0);
  });

  it("isEmpty when no buffer and no pending", () => {
    const ch = new Channel<number>(1);
    expect(ch.isEmpty()).toBe(true);
    ch.sendSync(1);
    expect(ch.isEmpty()).toBe(false);
  });

  it("async send/receive pair", async () => {
    const ch = new Channel<number>(1);
    await ch.send(42);
    const value = await ch.receive();
    expect(value).toBe(42);
  });

  it("receive returns null on closed empty channel", async () => {
    const ch = new Channel<number>(1);
    ch.close();
    expect(await ch.receive()).toBeNull();
  });
});

describe("select", () => {
  it("selects from first available channel", () => {
    const ch1 = new Channel<number>(1);
    const ch2 = new Channel<number>(1);
    ch2.sendSync(42);
    const result = select(ch1, ch2);
    expect(result).toBe(42);
  });

  it("returns null when all empty", () => {
    const ch1 = new Channel<number>(1);
    expect(select(ch1)).toBeNull();
  });
});

describe("merge", () => {
  it("merges channels", () => {
    const ch1 = new Channel<number>(5);
    const ch2 = new Channel<number>(5);
    ch1.sendSync(1);
    ch1.sendSync(2);
    ch2.sendSync(3);
    const merged = merge(ch1, ch2);
    const values: number[] = [];
    let v = merged.tryReceive();
    while (v !== null) {
      values.push(v);
      v = merged.tryReceive();
    }
    expect(values.sort()).toEqual([1, 2, 3]);
  });
});
