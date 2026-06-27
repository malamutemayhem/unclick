import { describe, it, expect } from "vitest";
import { StreamBuffer } from "../stream-buffer.js";

describe("StreamBuffer", () => {
  it("buffers items until chunk size", () => {
    const sb = new StreamBuffer<number>(3);
    sb.write(1);
    sb.write(2);
    expect(sb.buffered).toBe(2);
    expect(sb.chunkCount).toBe(0);
    sb.write(3);
    expect(sb.buffered).toBe(0);
    expect(sb.chunkCount).toBe(1);
  });

  it("flush forces chunk creation", () => {
    const sb = new StreamBuffer<number>(10);
    sb.write(1);
    const chunk = sb.flush();
    expect(chunk).toEqual([1]);
    expect(sb.buffered).toBe(0);
  });

  it("flush returns empty for empty buffer", () => {
    const sb = new StreamBuffer<number>(10);
    expect(sb.flush()).toEqual([]);
  });

  it("writeBatch adds multiple items", () => {
    const sb = new StreamBuffer<number>(2);
    sb.writeBatch([1, 2, 3, 4, 5]);
    expect(sb.chunkCount).toBe(2);
    expect(sb.buffered).toBe(1);
  });

  it("totalFlushed tracks count", () => {
    const sb = new StreamBuffer<number>(2);
    sb.write(1); sb.write(2);
    sb.write(3); sb.write(4);
    expect(sb.totalFlushed).toBe(4);
  });

  it("getChunk returns copy", () => {
    const sb = new StreamBuffer<number>(2);
    sb.write(1); sb.write(2);
    expect(sb.getChunk(0)).toEqual([1, 2]);
  });

  it("drain returns all and resets", () => {
    const sb = new StreamBuffer<number>(3);
    sb.writeBatch([1, 2, 3, 4, 5]);
    const all = sb.drain();
    expect(all).toEqual([1, 2, 3, 4, 5]);
    expect(sb.chunkCount).toBe(0);
    expect(sb.totalFlushed).toBe(0);
  });
});
