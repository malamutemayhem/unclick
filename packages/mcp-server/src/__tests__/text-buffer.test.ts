import { describe, it, expect } from "vitest";
import { TextBuffer } from "../text-buffer.js";

describe("TextBuffer", () => {
  it("creates from text", () => {
    const buf = new TextBuffer("hello\nworld");
    expect(buf.lineCount).toBe(2);
    expect(buf.getLine(0)).toBe("hello");
    expect(buf.getLine(1)).toBe("world");
  });

  it("creates empty buffer", () => {
    const buf = new TextBuffer();
    expect(buf.lineCount).toBe(1);
    expect(buf.text).toBe("");
  });

  it("inserts text", () => {
    const buf = new TextBuffer("hello world");
    buf.insert(0, 5, " beautiful");
    expect(buf.getLine(0)).toBe("hello beautiful world");
  });

  it("inserts multiline text", () => {
    const buf = new TextBuffer("hello world");
    buf.insert(0, 5, "\nnew\n");
    expect(buf.lineCount).toBe(3);
  });

  it("deletes range", () => {
    const buf = new TextBuffer("hello\nbeautiful\nworld");
    const deleted = buf.delete(0, 5, 1, 9);
    expect(deleted).toBe("\nbeautiful");
    expect(buf.text).toBe("hello\nworld");
  });

  it("gets range", () => {
    const buf = new TextBuffer("line one\nline two\nline three");
    expect(buf.getRange(0, 5, 1, 4)).toBe("one\nline");
  });

  it("replaces line", () => {
    const buf = new TextBuffer("aaa\nbbb\nccc");
    buf.replaceLine(1, "xxx");
    expect(buf.getLine(1)).toBe("xxx");
  });

  it("inserts line", () => {
    const buf = new TextBuffer("a\nb");
    buf.insertLine(1, "inserted");
    expect(buf.lineCount).toBe(3);
    expect(buf.getLine(1)).toBe("inserted");
  });

  it("deletes line", () => {
    const buf = new TextBuffer("a\nb\nc");
    const removed = buf.deleteLine(1);
    expect(removed).toBe("b");
    expect(buf.lineCount).toBe(2);
  });

  it("finds text", () => {
    const buf = new TextBuffer("hello\nworld\nhello again");
    const pos = buf.find("world");
    expect(pos).toEqual({ line: 1, col: 0 });
  });

  it("finds all occurrences", () => {
    const buf = new TextBuffer("aba\naba");
    const results = buf.findAll("a");
    expect(results).toHaveLength(4);
  });

  it("replaces text", () => {
    const buf = new TextBuffer("hello world");
    buf.replace("world", "there");
    expect(buf.text).toBe("hello there");
  });

  it("offset to position", () => {
    const buf = new TextBuffer("abc\ndef");
    expect(buf.offsetToPosition(0)).toEqual({ line: 0, col: 0 });
    expect(buf.offsetToPosition(4)).toEqual({ line: 1, col: 0 });
    expect(buf.offsetToPosition(5)).toEqual({ line: 1, col: 1 });
  });

  it("position to offset", () => {
    const buf = new TextBuffer("abc\ndef");
    expect(buf.positionToOffset(0, 0)).toBe(0);
    expect(buf.positionToOffset(1, 0)).toBe(4);
  });

  it("word at position", () => {
    const buf = new TextBuffer("hello world");
    expect(buf.wordAt(0, 2)).toBe("hello");
    expect(buf.wordAt(0, 7)).toBe("world");
  });

  it("indent and dedent", () => {
    const buf = new TextBuffer("hello");
    buf.indent(0, 4);
    expect(buf.getLine(0)).toBe("    hello");
    buf.dedent(0, 4);
    expect(buf.getLine(0)).toBe("hello");
  });

  it("clone creates independent copy", () => {
    const buf = new TextBuffer("hello");
    const clone = buf.clone();
    clone.insert(0, 5, " world");
    expect(buf.text).toBe("hello");
    expect(clone.text).toBe("hello world");
  });

  it("throws on invalid line", () => {
    const buf = new TextBuffer("hello");
    expect(() => buf.getLine(-1)).toThrow("out of range");
    expect(() => buf.getLine(5)).toThrow("out of range");
  });
});
