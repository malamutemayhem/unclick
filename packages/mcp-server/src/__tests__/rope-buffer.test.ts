import { describe, it, expect } from "vitest";
import { RopeBuffer } from "../rope-buffer.js";

describe("RopeBuffer", () => {
  it("constructor and toString", () => {
    const r = new RopeBuffer("hello world");
    expect(r.toString()).toBe("hello world");
    expect(r.length()).toBe(11);
  });

  it("charAt returns correct character", () => {
    const r = new RopeBuffer("abcdef");
    expect(r.charAt(0)).toBe("a");
    expect(r.charAt(5)).toBe("f");
  });

  it("insert adds text at position", () => {
    const r = new RopeBuffer("helo");
    r.insert(2, "l");
    expect(r.toString()).toBe("hello");
  });

  it("delete removes text range", () => {
    const r = new RopeBuffer("hello world");
    r.delete(5, 6);
    expect(r.toString()).toBe("hello");
  });

  it("substring extracts range", () => {
    const r = new RopeBuffer("hello world");
    expect(r.substring(6, 11)).toBe("world");
  });

  it("append adds to end", () => {
    const r = new RopeBuffer("hello");
    r.append(" world");
    expect(r.toString()).toBe("hello world");
  });

  it("prepend adds to start", () => {
    const r = new RopeBuffer("world");
    r.prepend("hello ");
    expect(r.toString()).toBe("hello world");
  });

  it("empty rope", () => {
    const r = new RopeBuffer();
    expect(r.length()).toBe(0);
    expect(r.toString()).toBe("");
  });

  it("multiple operations", () => {
    const r = new RopeBuffer("ac");
    r.insert(1, "b");
    expect(r.toString()).toBe("abc");
    r.append("d");
    expect(r.toString()).toBe("abcd");
    r.delete(0, 1);
    expect(r.toString()).toBe("bcd");
  });
});
