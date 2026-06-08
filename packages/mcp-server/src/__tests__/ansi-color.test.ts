import { describe, it, expect } from "vitest";
import { AnsiColor } from "../ansi-color.js";

describe("AnsiColor", () => {
  it("applies red color", () => {
    const result = AnsiColor.red("hello");
    expect(result).toContain("\x1b[31m");
    expect(result).toContain("hello");
    expect(result).toContain("\x1b[39m");
  });

  it("applies bold", () => {
    const result = AnsiColor.bold("test");
    expect(result).toContain("\x1b[1m");
  });

  it("applies underline", () => {
    const result = AnsiColor.underline("test");
    expect(result).toContain("\x1b[4m");
  });

  it("applies background colors", () => {
    const result = AnsiColor.bgRed("warning");
    expect(result).toContain("\x1b[41m");
  });

  it("applies RGB color", () => {
    const result = AnsiColor.rgb("test", 255, 0, 0);
    expect(result).toContain("38;2;255;0;0");
  });

  it("applies 256 color", () => {
    const result = AnsiColor.color256("test", 196);
    expect(result).toContain("38;5;196");
  });

  it("strips ANSI codes", () => {
    const colored = AnsiColor.red(AnsiColor.bold("hello"));
    expect(AnsiColor.strip(colored)).toBe("hello");
  });

  it("wraps with multiple styles", () => {
    const result = AnsiColor.wrap("test", AnsiColor.bold, AnsiColor.red);
    expect(result).toContain("\x1b[1m");
    expect(result).toContain("\x1b[31m");
  });

  it("creates gradient", () => {
    const result = AnsiColor.gradient("Hello", [255, 0, 0], [0, 0, 255]);
    expect(result).toContain("38;2;");
    expect(AnsiColor.strip(result)).toBe("Hello");
  });

  it("creates rainbow text", () => {
    const result = AnsiColor.rainbow("Hello!");
    expect(AnsiColor.strip(result)).toBe("Hello!");
    expect(result).toContain("\x1b[");
  });

  it("handles empty gradient", () => {
    expect(AnsiColor.gradient("", [255, 0, 0], [0, 0, 255])).toBe("");
  });
});
