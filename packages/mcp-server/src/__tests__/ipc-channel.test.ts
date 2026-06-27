import { describe, it, expect } from "vitest";
import { MessageQueue, PubSub, Pipe } from "../ipc-channel.js";

describe("MessageQueue", () => {
  it("send and receive", () => {
    const mq = new MessageQueue();
    mq.send("A", "B", "hello", { text: "hi" });
    const msg = mq.receive("B");
    expect(msg).not.toBeNull();
    expect(msg!.from).toBe("A");
    expect(msg!.payload).toEqual({ text: "hi" });
  });

  it("receive returns null when empty", () => {
    const mq = new MessageQueue();
    expect(mq.receive("X")).toBeNull();
  });

  it("receiveAll gets all messages", () => {
    const mq = new MessageQueue();
    mq.send("A", "B", "t1", 1);
    mq.send("A", "B", "t2", 2);
    mq.send("A", "C", "t3", 3);
    const msgs = mq.receiveAll("B");
    expect(msgs).toHaveLength(2);
    expect(mq.size).toBe(1);
  });

  it("peek does not remove", () => {
    const mq = new MessageQueue();
    mq.send("A", "B", "t", null);
    expect(mq.peek("B")).not.toBeNull();
    expect(mq.size).toBe(1);
  });

  it("respects max size", () => {
    const mq = new MessageQueue(2);
    mq.send("A", "B", "t", 1);
    mq.send("A", "B", "t", 2);
    expect(mq.send("A", "B", "t", 3)).toBeNull();
  });

  it("tracks sent and received counts", () => {
    const mq = new MessageQueue();
    mq.send("A", "B", "t", 1);
    mq.send("A", "B", "t", 2);
    mq.receive("B");
    expect(mq.sent).toBe(2);
    expect(mq.received).toBe(1);
  });
});

describe("PubSub", () => {
  it("subscribe and publish", () => {
    const ps = new PubSub();
    const received: unknown[] = [];
    ps.subscribe("news", msg => received.push(msg.payload));
    ps.publish("src", "news", "breaking");
    expect(received).toEqual(["breaking"]);
  });

  it("unsubscribe stops delivery", () => {
    const ps = new PubSub();
    const received: unknown[] = [];
    const unsub = ps.subscribe("topic", msg => received.push(msg.payload));
    ps.publish("src", "topic", 1);
    unsub();
    ps.publish("src", "topic", 2);
    expect(received).toEqual([1]);
  });

  it("publish returns subscriber count", () => {
    const ps = new PubSub();
    ps.subscribe("t", () => {});
    ps.subscribe("t", () => {});
    expect(ps.publish("src", "t", null)).toBe(2);
  });

  it("getHistory returns messages", () => {
    const ps = new PubSub();
    ps.publish("src", "a", 1);
    ps.publish("src", "b", 2);
    expect(ps.getHistory()).toHaveLength(2);
    expect(ps.getHistory("a")).toHaveLength(1);
  });

  it("topics lists subscribed topics", () => {
    const ps = new PubSub();
    ps.subscribe("a", () => {});
    ps.subscribe("b", () => {});
    expect(ps.topics).toContain("a");
    expect(ps.topics).toContain("b");
  });
});

describe("Pipe", () => {
  it("write and read", () => {
    const pipe = new Pipe();
    pipe.write("hello");
    expect(pipe.read()).toBe("hello");
  });

  it("read returns null when empty", () => {
    const pipe = new Pipe();
    expect(pipe.read()).toBeNull();
  });

  it("respects FIFO order", () => {
    const pipe = new Pipe();
    pipe.write(1);
    pipe.write(2);
    pipe.write(3);
    expect(pipe.read()).toBe(1);
    expect(pipe.read()).toBe(2);
  });

  it("close prevents writes", () => {
    const pipe = new Pipe();
    pipe.close();
    expect(pipe.write("x")).toBe(false);
    expect(pipe.isClosed).toBe(true);
  });

  it("capacity limits writes", () => {
    const pipe = new Pipe(2);
    expect(pipe.write(1)).toBe(true);
    expect(pipe.write(2)).toBe(true);
    expect(pipe.write(3)).toBe(false);
  });

  it("available and capacity", () => {
    const pipe = new Pipe(5);
    pipe.write(1);
    pipe.write(2);
    expect(pipe.available).toBe(2);
    expect(pipe.capacity).toBe(3);
  });
});
