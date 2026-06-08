import { describe, it, expect } from "vitest";
import { MessageBus } from "../message-bus.js";

describe("MessageBus", () => {
  it("publish and subscribe", () => {
    const bus = new MessageBus();
    const received: string[] = [];
    bus.subscribe("test", (msg: string) => received.push(msg));
    bus.publish("test", "hello");
    expect(received).toEqual(["hello"]);
  });

  it("multiple subscribers", () => {
    const bus = new MessageBus();
    const r1: string[] = [];
    const r2: string[] = [];
    bus.subscribe("topic", (m: string) => r1.push(m));
    bus.subscribe("topic", (m: string) => r2.push(m));
    bus.publish("topic", "msg");
    expect(r1).toEqual(["msg"]);
    expect(r2).toEqual(["msg"]);
  });

  it("unsubscribe stops delivery", () => {
    const bus = new MessageBus();
    const received: string[] = [];
    const sub = bus.subscribe("test", (m: string) => received.push(m));
    bus.publish("test", "a");
    sub.unsubscribe();
    bus.publish("test", "b");
    expect(received).toEqual(["a"]);
  });

  it("subscribeAll receives from all topics", () => {
    const bus = new MessageBus();
    const received: Array<{ msg: unknown; topic: string }> = [];
    bus.subscribeAll((msg, topic) => received.push({ msg, topic }));
    bus.publish("a", 1);
    bus.publish("b", 2);
    expect(received.length).toBe(2);
    expect(received[0].topic).toBe("a");
    expect(received[1].topic).toBe("b");
  });

  it("once fires only once", () => {
    const bus = new MessageBus();
    let count = 0;
    bus.once("test", () => count++);
    bus.publish("test", "a");
    bus.publish("test", "b");
    expect(count).toBe(1);
  });

  it("tracks message history", () => {
    const bus = new MessageBus();
    bus.publish("a", 1);
    bus.publish("b", 2);
    bus.publish("a", 3);
    expect(bus.getHistory().length).toBe(3);
    expect(bus.getHistory("a").length).toBe(2);
  });

  it("limits history size", () => {
    const bus = new MessageBus(5);
    for (let i = 0; i < 10; i++) bus.publish("t", i);
    expect(bus.getHistory().length).toBe(5);
  });

  it("topics returns subscribed topics", () => {
    const bus = new MessageBus();
    bus.subscribe("alpha", () => {});
    bus.subscribe("beta", () => {});
    expect(bus.topics().sort()).toEqual(["alpha", "beta"]);
  });

  it("subscriberCount includes wildcards", () => {
    const bus = new MessageBus();
    bus.subscribe("test", () => {});
    bus.subscribeAll(() => {});
    expect(bus.subscriberCount("test")).toBe(2);
  });

  it("clear removes everything", () => {
    const bus = new MessageBus();
    bus.subscribe("test", () => {});
    bus.publish("test", "x");
    bus.clear();
    expect(bus.topics().length).toBe(0);
    expect(bus.getHistory().length).toBe(0);
  });
});
