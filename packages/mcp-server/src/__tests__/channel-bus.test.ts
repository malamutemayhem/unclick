import { describe, it, expect, vi } from "vitest";
import { ChannelBus } from "../channel-bus.js";

describe("ChannelBus", () => {
  it("emits to subscribed handlers", () => {
    const bus = new ChannelBus();
    const fn = vi.fn();
    bus.on("test", fn);
    bus.emit("test", "hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("does not cross channels", () => {
    const bus = new ChannelBus();
    const fn = vi.fn();
    bus.on("a", fn);
    bus.emit("b", "msg");
    expect(fn).not.toHaveBeenCalled();
  });

  it("supports multiple handlers on same channel", () => {
    const bus = new ChannelBus();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    bus.on("ch", fn1);
    bus.on("ch", fn2);
    bus.emit("ch", 42);
    expect(fn1).toHaveBeenCalledWith(42);
    expect(fn2).toHaveBeenCalledWith(42);
  });

  it("unsubscribes a handler", () => {
    const bus = new ChannelBus();
    const fn = vi.fn();
    const off = bus.on("ch", fn);
    off();
    bus.emit("ch", "x");
    expect(fn).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const bus = new ChannelBus();
    const fn = vi.fn();
    bus.once("ch", fn);
    bus.emit("ch", 1);
    bus.emit("ch", 2);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("once can be cancelled before firing", () => {
    const bus = new ChannelBus();
    const fn = vi.fn();
    const off = bus.once("ch", fn);
    off();
    bus.emit("ch", 1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("reports listener count", () => {
    const bus = new ChannelBus();
    expect(bus.listenerCount("ch")).toBe(0);
    bus.on("ch", () => {});
    bus.on("ch", () => {});
    expect(bus.listenerCount("ch")).toBe(2);
  });

  it("lists active channels", () => {
    const bus = new ChannelBus();
    bus.on("a", () => {});
    bus.on("b", () => {});
    expect(bus.channels_list().sort()).toEqual(["a", "b"]);
  });

  it("clears a specific channel", () => {
    const bus = new ChannelBus();
    const fn = vi.fn();
    bus.on("a", fn);
    bus.on("b", () => {});
    bus.clear("a");
    bus.emit("a", 1);
    expect(fn).not.toHaveBeenCalled();
    expect(bus.listenerCount("a")).toBe(0);
    expect(bus.listenerCount("b")).toBe(1);
  });

  it("clears all channels", () => {
    const bus = new ChannelBus();
    bus.on("a", () => {});
    bus.on("b", () => {});
    bus.clear();
    expect(bus.channels_list()).toEqual([]);
  });

  it("emitting to non-existent channel is safe", () => {
    const bus = new ChannelBus();
    expect(() => bus.emit("nope", "x")).not.toThrow();
  });
});
