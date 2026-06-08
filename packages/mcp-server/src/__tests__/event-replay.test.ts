import { describe, it, expect, vi } from "vitest";
import { EventReplayBuffer } from "../event-replay.js";

describe("EventReplayBuffer", () => {
  it("emits to subscribers", () => {
    const buf = new EventReplayBuffer<string>();
    const fn = vi.fn();
    buf.subscribe(fn, false);
    buf.emit("hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("replays history to new subscribers", () => {
    const buf = new EventReplayBuffer<number>();
    buf.emit(1);
    buf.emit(2);
    buf.emit(3);
    const received: number[] = [];
    buf.subscribe((n) => received.push(n));
    expect(received).toEqual([1, 2, 3]);
  });

  it("skip replay when false", () => {
    const buf = new EventReplayBuffer<number>();
    buf.emit(1);
    const received: number[] = [];
    buf.subscribe((n) => received.push(n), false);
    expect(received).toEqual([]);
  });

  it("respects maxSize", () => {
    const buf = new EventReplayBuffer<number>(3);
    buf.emit(1);
    buf.emit(2);
    buf.emit(3);
    buf.emit(4);
    expect(buf.getHistory()).toEqual([2, 3, 4]);
  });

  it("unsubscribe stops notifications", () => {
    const buf = new EventReplayBuffer<string>();
    const fn = vi.fn();
    const unsub = buf.subscribe(fn, false);
    unsub();
    buf.emit("test");
    expect(fn).not.toHaveBeenCalled();
  });

  it("clear empties history", () => {
    const buf = new EventReplayBuffer<number>();
    buf.emit(1);
    buf.clear();
    expect(buf.size).toBe(0);
    expect(buf.getHistory()).toEqual([]);
  });

  it("tracks subscriber count", () => {
    const buf = new EventReplayBuffer<number>();
    expect(buf.subscriberCount).toBe(0);
    const unsub = buf.subscribe(() => {}, false);
    expect(buf.subscriberCount).toBe(1);
    unsub();
    expect(buf.subscriberCount).toBe(0);
  });
});
