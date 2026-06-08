import { describe, it, expect } from "vitest";
import { Channel, FanOut } from "../channel-queue.js";

describe("Channel", () => {
  it("buffered send and receive", async () => {
    const ch = new Channel<number>(3);
    await ch.send(1);
    await ch.send(2);
    expect(ch.size).toBe(2);
    expect(await ch.receive()).toBe(1);
    expect(await ch.receive()).toBe(2);
  });

  it("unbuffered send blocks until receive", async () => {
    const ch = new Channel<string>(0);
    let received = "";
    const sendPromise = ch.send("hello");
    setTimeout(async () => { received = await ch.receive(); }, 5);
    await sendPromise;
    expect(received).toBe("hello");
  });

  it("tryReceive returns undefined when empty", () => {
    const ch = new Channel<number>(1);
    expect(ch.tryReceive()).toBeUndefined();
  });

  it("tryReceive returns buffered value", async () => {
    const ch = new Channel<number>(2);
    await ch.send(42);
    expect(ch.tryReceive()).toBe(42);
  });

  it("close prevents sending", async () => {
    const ch = new Channel<number>(1);
    ch.close();
    expect(ch.isClosed).toBe(true);
    await expect(ch.send(1)).rejects.toThrow("closed");
  });

  it("tracks sent and received counts", async () => {
    const ch = new Channel<number>(5);
    await ch.send(1);
    await ch.send(2);
    await ch.receive();
    expect(ch.totalSent).toBe(2);
    expect(ch.totalReceived).toBe(1);
  });
});

describe("FanOut", () => {
  it("broadcasts to all channels", async () => {
    const fan = new FanOut<number>();
    const ch1 = fan.addChannel(1);
    const ch2 = fan.addChannel(1);
    await fan.broadcast(42);
    expect(await ch1.receive()).toBe(42);
    expect(await ch2.receive()).toBe(42);
    expect(fan.channelCount).toBe(2);
  });
});
