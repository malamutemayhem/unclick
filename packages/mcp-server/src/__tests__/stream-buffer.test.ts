import { describe, it, expect } from "vitest";
import { StreamBuffer } from "../stream-buffer.js";

describe("stream-buffer", () => {
  it("push and next work in order", async () => {
    const sb = new StreamBuffer<number>();
    sb.push(1);
    sb.push(2);
    expect((await sb.next()).value).toBe(1);
    expect((await sb.next()).value).toBe(2);
  });

  it("next waits for push when buffer is empty", async () => {
    const sb = new StreamBuffer<string>();
    const p = sb.next();
    sb.push("hello");
    const result = await p;
    expect(result.value).toBe("hello");
    expect(result.done).toBe(false);
  });

  it("end signals done to waiting consumers", async () => {
    const sb = new StreamBuffer<number>();
    const p = sb.next();
    sb.end();
    const result = await p;
    expect(result.done).toBe(true);
  });

  it("isFull reflects high water mark", () => {
    const sb = new StreamBuffer<number>(2);
    sb.push(1);
    expect(sb.isFull).toBe(false);
    sb.push(2);
    expect(sb.isFull).toBe(true);
  });

  it("collect gathers all items", async () => {
    const sb = new StreamBuffer<number>();
    sb.push(1);
    sb.push(2);
    sb.push(3);
    sb.end();
    const items = await sb.collect();
    expect(items).toEqual([1, 2, 3]);
  });

  it("push after end throws", () => {
    const sb = new StreamBuffer<number>();
    sb.end();
    expect(() => sb.push(1)).toThrow("closed");
  });

  it("async iterator works", async () => {
    const sb = new StreamBuffer<number>();
    sb.push(10);
    sb.push(20);
    sb.end();
    const items: number[] = [];
    for await (const item of sb) {
      items.push(item);
    }
    expect(items).toEqual([10, 20]);
  });
});
