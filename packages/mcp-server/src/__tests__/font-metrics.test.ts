import { describe, it, expect } from "vitest";
import { FontMetrics } from "../font-metrics.js";

describe("FontMetrics", () => {
  it("measureText returns width and height", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    const m = fm.measureText("Hello");
    expect(m.width).toBe(40);
    expect(m.height).toBe(16);
  });

  it("measureText handles multiline", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    const m = fm.measureText("Hi\nWorld");
    expect(m.height).toBe(32);
  });

  it("custom char widths override default", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    fm.setCharWidth("W", 12);
    expect(fm.charWidth("W")).toBe(12);
    expect(fm.charWidth("a")).toBe(8);
  });

  it("wrapText breaks at word boundaries", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    const lines = fm.wrapText("Hello World Foo Bar", 80);
    expect(lines.length).toBeGreaterThan(1);
    expect(lines[0]).toContain("Hello");
  });

  it("truncate adds ellipsis", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    const result = fm.truncate("Hello World", 64);
    expect(result).toContain("...");
    expect(result.length).toBeLessThan("Hello World".length);
  });

  it("truncate returns original if fits", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    const result = fm.truncate("Hi", 100);
    expect(result).toBe("Hi");
  });

  it("characterIndex finds position", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    const idx = fm.characterIndex("Hello", 20);
    expect(idx).toBe(3);
  });

  it("caretPosition returns x offset", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    expect(fm.caretPosition("Hello", 3)).toBe(24);
  });

  it("lineCount counts wrapped lines", () => {
    const fm = new FontMetrics(16, 12, 4, 8);
    expect(fm.lineCount("one two three four", 80)).toBeGreaterThan(1);
  });
});
