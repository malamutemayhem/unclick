import { describe, it, expect, vi } from "vitest";
import { PubSub } from "../pubsub.js";

interface Topics {
  [key: string]: unknown;
  message: string;
  count: number;
}

describe("PubSub", () => {
  it("publish and subscribe", () => {
    const ps = new PubSub<Topics>();
    const fn = vi.fn();
    ps.subscribe("message", fn);
    ps.publish("message", "hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("multiple subscribers", () => {
    const ps = new PubSub<Topics>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    ps.subscribe("message", fn1);
    ps.subscribe("message", fn2);
    ps.publish("message", "x");
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });

  it("unsubscribe via return", () => {
    const ps = new PubSub<Topics>();
    const fn = vi.fn();
    const unsub = ps.subscribe("message", fn);
    unsub();
    ps.publish("message", "x");
    expect(fn).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const ps = new PubSub<Topics>();
    const fn = vi.fn();
    ps.once("message", fn);
    ps.publish("message", "a");
    ps.publish("message", "b");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("history stores messages", () => {
    const ps = new PubSub<Topics>({ maxHistory: 3 });
    ps.publish("message", "a");
    ps.publish("message", "b");
    expect(ps.getHistory("message")).toEqual(["a", "b"]);
  });

  it("history caps at maxHistory", () => {
    const ps = new PubSub<Topics>({ maxHistory: 2 });
    ps.publish("message", "a");
    ps.publish("message", "b");
    ps.publish("message", "c");
    expect(ps.getHistory("message")).toEqual(["b", "c"]);
  });

  it("clearHistory", () => {
    const ps = new PubSub<Topics>({ maxHistory: 5 });
    ps.publish("message", "a");
    ps.clearHistory("message");
    expect(ps.getHistory("message")).toEqual([]);
  });

  it("subscriberCount", () => {
    const ps = new PubSub<Topics>();
    ps.subscribe("message", () => {});
    ps.subscribe("count", () => {});
    expect(ps.subscriberCount("message")).toBe(1);
    expect(ps.subscriberCount()).toBe(2);
  });

  it("topics returns active topics", () => {
    const ps = new PubSub<Topics>();
    ps.subscribe("message", () => {});
    ps.subscribe("count", () => {});
    expect(ps.topics().sort()).toEqual(["count", "message"]);
  });

  it("clear removes everything", () => {
    const ps = new PubSub<Topics>({ maxHistory: 5 });
    ps.subscribe("message", () => {});
    ps.publish("message", "x");
    ps.clear();
    expect(ps.subscriberCount()).toBe(0);
    expect(ps.getHistory("message")).toEqual([]);
  });
});
