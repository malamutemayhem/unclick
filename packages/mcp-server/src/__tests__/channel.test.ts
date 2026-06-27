import { describe, it, expect } from "vitest";
import { Channel } from "../channel.js";

describe("channel", () => {
  it("unbuffered send blocks until recv", async () => {
    const ch = new Channel<number>();
    let received = 0;
    const sendP = ch.send(42);
    const recvP = ch.recv().then((v) => { received = v; });
    await Promise.all([sendP, recvP]);
    expect(received).toBe(42);
  });

  it("buffered channel stores values up to capacity", async () => {
    const ch = new Channel<number>(2);
    await ch.send(1);
    await ch.send(2);
    expect(ch.length).toBe(2);
    expect(await ch.recv()).toBe(1);
    expect(await ch.recv()).toBe(2);
  });

  it("tryRecv returns undefined when empty", () => {
    const ch = new Channel<number>(1);
    expect(ch.tryRecv()).toBeUndefined();
  });

  it("tryRecv returns buffered value", async () => {
    const ch = new Channel<number>(1);
    await ch.send(99);
    expect(ch.tryRecv()).toBe(99);
  });

  it("close prevents new sends", async () => {
    const ch = new Channel<number>(1);
    ch.close();
    expect(ch.isClosed).toBe(true);
    await expect(ch.send(1)).rejects.toThrow("closed");
  });

  it("close rejects waiting receivers", async () => {
    const ch = new Channel<number>();
    const recvP = ch.recv();
    ch.close();
    await expect(recvP).rejects.toThrow("closed");
  });

  it("recv after close with empty buffer throws", async () => {
    const ch = new Channel<number>();
    ch.close();
    await expect(ch.recv()).rejects.toThrow("closed");
  });
});
