import { describe, it, expect } from "vitest";
import { GapBuffer } from "../gap-buffer.js";

describe("GapBuffer", () => {
  it("insert and toString work", () => {
    const gb = new GapBuffer();
    gb.insert(0, "hello");
    expect(gb.toString()).toBe("hello");
  });

  it("insert at middle works", () => {
    const gb = new GapBuffer();
    gb.insert(0, "hllo");
    gb.insert(1, "e");
    expect(gb.toString()).toBe("hello");
  });

  it("delete removes characters", () => {
    const gb = new GapBuffer();
    gb.insert(0, "hello");
    const deleted = gb.delete(1, 2);
    expect(deleted).toBe("el");
    expect(gb.toString()).toBe("hlo");
  });

  it("charAt returns correct character", () => {
    const gb = new GapBuffer();
    gb.insert(0, "abcdef");
    expect(gb.charAt(0)).toBe("a");
    expect(gb.charAt(5)).toBe("f");
  });

  it("length tracks content size", () => {
    const gb = new GapBuffer();
    gb.insert(0, "test");
    expect(gb.length()).toBe(4);
    gb.delete(0, 2);
    expect(gb.length()).toBe(2);
  });

  it("insert at end appends", () => {
    const gb = new GapBuffer();
    gb.insert(0, "abc");
    gb.insert(3, "def");
    expect(gb.toString()).toBe("abcdef");
  });

  it("substring extracts range", () => {
    const gb = new GapBuffer();
    gb.insert(0, "hello world");
    expect(gb.substring(6, 11)).toBe("world");
  });

  it("clear empties the buffer", () => {
    const gb = new GapBuffer();
    gb.insert(0, "text");
    gb.clear();
    expect(gb.length()).toBe(0);
    expect(gb.toString()).toBe("");
  });

  it("handles growth when buffer fills up", () => {
    const gb = new GapBuffer(4);
    gb.insert(0, "this is a longer string that exceeds initial capacity");
    expect(gb.toString()).toBe("this is a longer string that exceeds initial capacity");
  });
});
