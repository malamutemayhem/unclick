import { describe, it, expect } from "vitest";
import { PubSub } from "../pub-sub.js";

describe("PubSub", () => {
  it("delivers messages to subscribers", () => {
    const bus = new PubSub();
    const received: string[] = [];
    bus.subscribe<string>("chat", (msg) => received.push(msg));
    bus.publish("chat", "hello");
    expect(received).toEqual(["hello"]);
  });

  it("returns handler count from publish", () => {
    const bus = new PubSub();
    bus.subscribe("t", () => {});
    bus.subscribe("t", () => {});
    expect(bus.publish("t", "x")).toBe(2);
  });

  it("returns 0 when publishing to empty topic", () => {
    const bus = new PubSub();
    expect(bus.publish("nope", "x")).toBe(0);
  });

  it("unsubscribe stops delivery", () => {
    const bus = new PubSub();
    const received: number[] = [];
    const unsub = bus.subscribe<number>("n", (v) => received.push(v));
    bus.publish("n", 1);
    unsub();
    bus.publish("n", 2);
    expect(received).toEqual([1]);
  });

  it("publishToAll sends to every topic", () => {
    const bus = new PubSub();
    const a: unknown[] = [];
    const b: unknown[] = [];
    bus.subscribe("x", (v) => a.push(v));
    bus.subscribe("y", (v) => b.push(v));
    const count = bus.publishToAll("broadcast");
    expect(count).toBe(2);
    expect(a).toEqual(["broadcast"]);
    expect(b).toEqual(["broadcast"]);
  });

  it("listTopics returns all topic names", () => {
    const bus = new PubSub();
    bus.subscribe("alpha", () => {});
    bus.subscribe("beta", () => {});
    expect(bus.listTopics().sort()).toEqual(["alpha", "beta"]);
  });

  it("subscriberCount tracks per topic", () => {
    const bus = new PubSub();
    bus.subscribe("t", () => {});
    bus.subscribe("t", () => {});
    bus.subscribe("other", () => {});
    expect(bus.subscriberCount("t")).toBe(2);
    expect(bus.subscriberCount("other")).toBe(1);
    expect(bus.subscriberCount("missing")).toBe(0);
  });

  it("clear removes specific topic", () => {
    const bus = new PubSub();
    bus.subscribe("a", () => {});
    bus.subscribe("b", () => {});
    bus.clear("a");
    expect(bus.subscriberCount("a")).toBe(0);
    expect(bus.subscriberCount("b")).toBe(1);
  });

  it("clear with no args removes all topics", () => {
    const bus = new PubSub();
    bus.subscribe("a", () => {});
    bus.subscribe("b", () => {});
    bus.clear();
    expect(bus.listTopics()).toEqual([]);
  });

  it("swallows handler errors without stopping delivery", () => {
    const bus = new PubSub();
    const received: string[] = [];
    bus.subscribe("t", () => { throw new Error("boom"); });
    bus.subscribe<string>("t", (v) => received.push(v));
    const count = bus.publish("t", "ok");
    expect(count).toBe(1);
    expect(received).toEqual(["ok"]);
  });
});
