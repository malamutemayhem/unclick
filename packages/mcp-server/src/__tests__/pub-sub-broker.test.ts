import { describe, it, expect } from "vitest";
import { PubSubBroker } from "../pub-sub-broker.js";

describe("PubSubBroker", () => {
  it("subscribes and publishes", () => {
    const broker = new PubSubBroker<string>();
    const received: string[] = [];
    broker.subscribe("news", (msg) => received.push(msg));
    broker.publish("news", "hello");
    expect(received).toEqual(["hello"]);
  });

  it("delivers to multiple subscribers", () => {
    const broker = new PubSubBroker<number>();
    const a: number[] = [];
    const b: number[] = [];
    broker.subscribe("data", (msg) => a.push(msg));
    broker.subscribe("data", (msg) => b.push(msg));
    expect(broker.publish("data", 42)).toBe(2);
    expect(a).toEqual([42]);
    expect(b).toEqual([42]);
  });

  it("unsubscribes", () => {
    const broker = new PubSubBroker<string>();
    const received: string[] = [];
    const id = broker.subscribe("topic", (msg) => received.push(msg));
    broker.unsubscribe(id);
    broker.publish("topic", "missed");
    expect(received).toEqual([]);
  });

  it("matches wildcard patterns", () => {
    const broker = new PubSubBroker<string>();
    const received: string[] = [];
    broker.subscribePattern("events.*", (msg) => received.push(msg));
    broker.publish("events.click", "clicked");
    expect(received).toEqual(["clicked"]);
  });

  it("matches hash pattern for all", () => {
    const broker = new PubSubBroker<string>();
    const received: string[] = [];
    broker.subscribePattern("#", (msg) => received.push(msg));
    broker.publish("any.topic.here", "msg");
    expect(received).toEqual(["msg"]);
  });

  it("does not match non-matching patterns", () => {
    const broker = new PubSubBroker<string>();
    const received: string[] = [];
    broker.subscribePattern("events.*", (msg) => received.push(msg));
    broker.publish("logs.error", "err");
    expect(received).toEqual([]);
  });

  it("keeps history", () => {
    const broker = new PubSubBroker<string>();
    broker.publish("a", "msg1");
    broker.publish("b", "msg2");
    expect(broker.getHistory().length).toBe(2);
    expect(broker.getHistory("a").length).toBe(1);
  });

  it("lists topics", () => {
    const broker = new PubSubBroker<string>();
    broker.subscribe("b", () => {});
    broker.subscribe("a", () => {});
    expect(broker.topics()).toEqual(["a", "b"]);
  });

  it("counts subscribers", () => {
    const broker = new PubSubBroker<string>();
    broker.subscribe("topic", () => {});
    broker.subscribe("topic", () => {});
    expect(broker.subscriberCount("topic")).toBe(2);
  });

  it("counts total subscribers", () => {
    const broker = new PubSubBroker<string>();
    broker.subscribe("a", () => {});
    broker.subscribe("b", () => {});
    broker.subscribePattern("c.*", () => {});
    expect(broker.totalSubscribers()).toBe(3);
  });
});
