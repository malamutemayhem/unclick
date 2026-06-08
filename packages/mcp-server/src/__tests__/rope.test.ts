import { describe, it, expect } from "vitest";
import { Rope } from "../rope.js";

describe("rope", () => {
  it("toString returns original text", () => {
    const r = new Rope("hello world");
    expect(r.toString()).toBe("hello world");
  });

  it("charAt returns correct character", () => {
    const r = new Rope("abcdef");
    expect(r.charAt(0)).toBe("a");
    expect(r.charAt(5)).toBe("f");
  });

  it("length returns correct count", () => {
    const r = new Rope("hello");
    expect(r.length).toBe(5);
  });

  it("concat joins two ropes", () => {
    const a = new Rope("hello ");
    const b = new Rope("world");
    const c = a.concat(b);
    expect(c.toString()).toBe("hello world");
    expect(c.length).toBe(11);
  });

  it("slice extracts substring", () => {
    const r = new Rope("hello world");
    expect(r.slice(0, 5)).toBe("hello");
    expect(r.slice(6)).toBe("world");
  });

  it("insert adds text at position", () => {
    const r = new Rope("helo world");
    const result = r.insert(3, "l");
    expect(result.toString()).toBe("hello world");
  });

  it("delete removes range", () => {
    const r = new Rope("hello beautiful world");
    const result = r.delete(5, 15);
    expect(result.toString()).toBe("hello world");
  });

  it("empty rope works", () => {
    const r = new Rope();
    expect(r.length).toBe(0);
    expect(r.toString()).toBe("");
  });
});
