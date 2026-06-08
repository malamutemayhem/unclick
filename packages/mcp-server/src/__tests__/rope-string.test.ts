import { describe, it, expect } from "vitest";
import { Rope } from "../rope-string.js";

describe("Rope", () => {
  it("creates from string", () => {
    const r = new Rope("hello");
    expect(r.toString()).toBe("hello");
    expect(r.length).toBe(5);
  });

  it("creates empty rope", () => {
    const r = new Rope();
    expect(r.toString()).toBe("");
    expect(r.length).toBe(0);
  });

  it("charAt returns correct character", () => {
    const r = new Rope("abcdef");
    expect(r.charAt(0)).toBe("a");
    expect(r.charAt(3)).toBe("d");
    expect(r.charAt(5)).toBe("f");
  });

  it("charAt returns empty for out of bounds", () => {
    const r = new Rope("abc");
    expect(r.charAt(-1)).toBe("");
    expect(r.charAt(3)).toBe("");
  });

  it("concat joins two ropes", () => {
    const a = new Rope("hello ");
    const b = new Rope("world");
    const c = a.concat(b);
    expect(c.toString()).toBe("hello world");
    expect(c.length).toBe(11);
  });

  it("substring extracts range", () => {
    const r = new Rope("hello world");
    expect(r.substring(0, 5)).toBe("hello");
    expect(r.substring(6)).toBe("world");
    expect(r.substring(3, 8)).toBe("lo wo");
  });

  it("insert adds text at position", () => {
    const r = new Rope("helo");
    const result = r.insert(2, "l");
    expect(result.toString()).toBe("hello");
  });

  it("delete removes range", () => {
    const r = new Rope("hello world");
    const result = r.delete(5, 11);
    expect(result.toString()).toBe("hello");
  });

  it("fromChunks builds balanced rope", () => {
    const r = Rope.fromChunks(["he", "ll", "o ", "wo", "rl", "d"]);
    expect(r.toString()).toBe("hello world");
    expect(r.length).toBe(11);
  });

  it("charAt works on concatenated ropes", () => {
    const a = new Rope("abc");
    const b = new Rope("def");
    const c = a.concat(b);
    expect(c.charAt(0)).toBe("a");
    expect(c.charAt(3)).toBe("d");
    expect(c.charAt(5)).toBe("f");
  });

  it("handles chain of operations", () => {
    let r = new Rope("hello");
    r = r.insert(5, " world");
    r = r.delete(0, 6);
    expect(r.toString()).toBe("world");
  });
});
