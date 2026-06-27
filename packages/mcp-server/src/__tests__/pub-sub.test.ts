import { describe, it, expect } from "vitest";
import { PubSub } from "../pub-sub.js";

describe("PubSub", () => {
  it("subscribe and publish", () => {
    const ps = new PubSub<string>();
    const received: string[] = [];
    ps.subscribe("news", (msg) => received.push(msg));
    ps.publish("news", "hello");
    expect(received).toEqual(["hello"]);
  });

  it("publish returns subscriber count", () => {
    const ps = new PubSub<string>();
    ps.subscribe("t", () => {});
    ps.subscribe("t", () => {});
    expect(ps.publish("t", "x")).toBe(2);
  });

  it("publish to empty topic returns 0", () => {
    const ps = new PubSub<string>();
    expect(ps.publish("empty", "x")).toBe(0);
  });

  it("unsubscribe removes listener", () => {
    const ps = new PubSub<number>();
    const fn = () => {};
    ps.subscribe("t", fn);
    expect(ps.unsubscribe("t", fn)).toBe(true);
    expect(ps.subscriberCount("t")).toBe(0);
  });

  it("subscribe returns unsubscribe function", () => {
    const ps = new PubSub<number>();
    const unsub = ps.subscribe("t", () => {});
    unsub();
    expect(ps.subscriberCount("t")).toBe(0);
  });

  it("retains history for new subscribers", () => {
    const ps = new PubSub<number>(2);
    ps.publish("t", 1);
    ps.publish("t", 2);
    ps.publish("t", 3);
    const received: number[] = [];
    ps.subscribe("t", (msg) => received.push(msg));
    expect(received).toEqual([2, 3]);
  });

  it("topics lists active topics", () => {
    const ps = new PubSub<string>();
    ps.subscribe("a", () => {});
    ps.subscribe("b", () => {});
    expect(ps.topics.sort()).toEqual(["a", "b"]);
  });

  it("clear removes everything", () => {
    const ps = new PubSub<string>();
    ps.subscribe("t", () => {});
    ps.clear();
    expect(ps.topics).toEqual([]);
  });
});
