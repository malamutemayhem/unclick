import { describe, it, expect } from "vitest";
import { PieceTable } from "../piece-table.js";

describe("PieceTable", () => {
  it("constructs from initial text", () => {
    const pt = new PieceTable("hello");
    expect(pt.toString()).toBe("hello");
    expect(pt.length()).toBe(5);
  });

  it("insert at beginning", () => {
    const pt = new PieceTable("world");
    pt.insert(0, "hello ");
    expect(pt.toString()).toBe("hello world");
  });

  it("insert at end", () => {
    const pt = new PieceTable("hello");
    pt.insert(5, " world");
    expect(pt.toString()).toBe("hello world");
  });

  it("insert in middle", () => {
    const pt = new PieceTable("hllo");
    pt.insert(1, "e");
    expect(pt.toString()).toBe("hello");
  });

  it("delete removes text", () => {
    const pt = new PieceTable("hello world");
    pt.delete(5, 6);
    expect(pt.toString()).toBe("hello");
  });

  it("charAt returns correct character", () => {
    const pt = new PieceTable("abcdef");
    expect(pt.charAt(0)).toBe("a");
    expect(pt.charAt(5)).toBe("f");
  });

  it("substring extracts range", () => {
    const pt = new PieceTable("hello world");
    expect(pt.substring(6, 11)).toBe("world");
  });

  it("lineCount counts lines", () => {
    const pt = new PieceTable("line1\nline2\nline3");
    expect(pt.lineCount()).toBe(3);
  });

  it("empty table has length 0", () => {
    const pt = new PieceTable();
    expect(pt.length()).toBe(0);
    expect(pt.toString()).toBe("");
  });

  it("multiple inserts and deletes work", () => {
    const pt = new PieceTable("ac");
    pt.insert(1, "b");
    expect(pt.toString()).toBe("abc");
    pt.delete(0, 1);
    expect(pt.toString()).toBe("bc");
  });
});
