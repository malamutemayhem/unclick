import { describe, it, expect } from "vitest";
import { PubSub } from "../pubsub.js";

describe("PubSub", () => {
  it("subscribe and publish", () => {
    const ps = new PubSub();
    let received: string | null = null;
    ps.subscribe<string>("test", (data: string) => { received = data; });
    ps.publish("test", "hello");
    expect(received).toBe("hello");
  });

  it("multiple subscribers", () => {
    const ps = new PubSub();
    const results: number[] = [];
    ps.subscribe<number>("ch", (d: number) => results.push(d));
    ps.subscribe<number>("ch", (d: number) => results.push(d * 2));
    ps.publish("ch", 5);
    expect(results).toEqual([5, 10]);
  });

  it("unsubscribe", () => {
    const ps = new PubSub();
    let count = 0;
    const unsub = ps.subscribe("ch", () => { count++; });
    ps.publish("ch", null);
    unsub();
    ps.publish("ch", null);
    expect(count).toBe(1);
  });

  it("once fires only once", () => {
    const ps = new PubSub();
    let count = 0;
    ps.once("ch", () => { count++; });
    ps.publish("ch", null);
    ps.publish("ch", null);
    expect(count).toBe(1);
  });

  it("clear channel", () => {
    const ps = new PubSub();
    ps.subscribe("ch1", () => {});
    ps.subscribe("ch2", () => {});
    ps.clear("ch1");
    expect(ps.subscriberCount("ch1")).toBe(0);
    expect(ps.subscriberCount("ch2")).toBe(1);
  });

  it("clear all", () => {
    const ps = new PubSub();
    ps.subscribe("ch1", () => {});
    ps.subscribe("ch2", () => {});
    ps.clear();
    expect(ps.channelCount).toBe(0);
  });

  it("publish to non-existent channel is safe", () => {
    const ps = new PubSub();
    expect(() => ps.publish("nope", "data")).not.toThrow();
  });
});
