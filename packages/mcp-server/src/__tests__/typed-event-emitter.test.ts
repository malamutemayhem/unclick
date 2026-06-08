import { describe, it, expect } from "vitest";
import { TypedEventEmitter } from "../typed-event-emitter.js";

type TestEvents = {
  message: string;
  count: number;
  data: { id: number; value: string };
};

describe("TypedEventEmitter", () => {
  it("emits and receives events", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    let received = "";
    emitter.on("message", (msg) => { received = msg; });
    emitter.emit("message", "hello");
    expect(received).toBe("hello");
  });

  it("supports multiple listeners", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const calls: string[] = [];
    emitter.on("message", (msg) => calls.push("a:" + msg));
    emitter.on("message", (msg) => calls.push("b:" + msg));
    emitter.emit("message", "hi");
    expect(calls).toEqual(["a:hi", "b:hi"]);
  });

  it("once fires only once", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    let count = 0;
    emitter.once("count", () => { count++; });
    emitter.emit("count", 1);
    emitter.emit("count", 2);
    expect(count).toBe(1);
  });

  it("off removes listener", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    let received = "";
    const unsub = emitter.on("message", (msg) => { received = msg; });
    unsub();
    emitter.emit("message", "hello");
    expect(received).toBe("");
  });

  it("returns listener count from emit", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    emitter.on("message", () => {});
    emitter.on("message", () => {});
    expect(emitter.emit("message", "hi")).toBe(2);
  });

  it("tracks listener count", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    expect(emitter.listenerCount("message")).toBe(0);
    emitter.on("message", () => {});
    emitter.once("message", () => {});
    expect(emitter.listenerCount("message")).toBe(2);
  });

  it("lists event names", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    emitter.on("message", () => {});
    emitter.on("count", () => {});
    expect(emitter.eventNames().sort()).toEqual(["count", "message"]);
  });

  it("records history", () => {
    const emitter = new TypedEventEmitter<TestEvents>(5);
    emitter.emit("message", "a");
    emitter.emit("count", 1);
    const history = emitter.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].event).toBe("message");
  });

  it("limits history size", () => {
    const emitter = new TypedEventEmitter<TestEvents>(2);
    emitter.emit("count", 1);
    emitter.emit("count", 2);
    emitter.emit("count", 3);
    expect(emitter.getHistory().length).toBe(2);
  });

  it("clear removes everything", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    emitter.on("message", () => {});
    emitter.emit("message", "hi");
    emitter.clear();
    expect(emitter.listenerCount("message")).toBe(0);
    expect(emitter.getHistory().length).toBe(0);
  });

  it("removeAllListeners for specific event", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    emitter.on("message", () => {});
    emitter.on("count", () => {});
    emitter.removeAllListeners("message");
    expect(emitter.listenerCount("message")).toBe(0);
    expect(emitter.listenerCount("count")).toBe(1);
  });
});
