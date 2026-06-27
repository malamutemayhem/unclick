import { describe, it, expect } from "vitest";
import { format, parse, toKB, toMB, toGB, toKiB, toMiB, toGiB } from "../byte-size.js";

describe("format", () => {
  it("formats bytes", () => {
    expect(format(0)).toBe("0 B");
    expect(format(500)).toBe("500 B");
    expect(format(1500)).toBe("1.5 KB");
    expect(format(1500000)).toBe("1.5 MB");
    expect(format(1500000000)).toBe("1.5 GB");
  });

  it("binary format", () => {
    expect(format(1024, true)).toBe("1.0 KiB");
    expect(format(1048576, true)).toBe("1.0 MiB");
  });
});

describe("parse", () => {
  it("parses various units", () => {
    expect(parse("1 KB")).toBe(1000);
    expect(parse("1 MB")).toBe(1000000);
    expect(parse("1 KiB")).toBe(1024);
    expect(parse("500 B")).toBe(500);
  });

  it("throws on invalid", () => {
    expect(() => parse("abc")).toThrow("Invalid");
  });
});

describe("conversion helpers", () => {
  it("toKB", () => { expect(toKB(5000)).toBe(5); });
  it("toMB", () => { expect(toMB(5000000)).toBe(5); });
  it("toGB", () => { expect(toGB(5000000000)).toBe(5); });
  it("toKiB", () => { expect(toKiB(2048)).toBe(2); });
  it("toMiB", () => { expect(toMiB(1048576)).toBe(1); });
  it("toGiB", () => { expect(toGiB(1073741824)).toBe(1); });
});
