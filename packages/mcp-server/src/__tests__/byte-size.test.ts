import { describe, it, expect } from "vitest";
import { formatBytes, formatBytesIEC, parseBytes } from "../byte-size.js";

describe("byte-size", () => {
  it("formatBytes formats SI units", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(500)).toBe("500.00 B");
    expect(formatBytes(1000)).toBe("1.00 KB");
    expect(formatBytes(1500000)).toBe("1.50 MB");
    expect(formatBytes(1000000000)).toBe("1.00 GB");
  });

  it("formatBytes handles custom decimals", () => {
    expect(formatBytes(1234, 0)).toBe("1 KB");
    expect(formatBytes(1234, 3)).toBe("1.234 KB");
  });

  it("formatBytesIEC uses 1024 base", () => {
    expect(formatBytesIEC(1024)).toBe("1.00 KiB");
    expect(formatBytesIEC(1048576)).toBe("1.00 MiB");
    expect(formatBytesIEC(1073741824)).toBe("1.00 GiB");
  });

  it("parseBytes parses SI strings", () => {
    expect(parseBytes("1 KB")).toBe(1000);
    expect(parseBytes("2.5 MB")).toBe(2500000);
    expect(parseBytes("1 GB")).toBe(1000000000);
  });

  it("parseBytes parses IEC strings", () => {
    expect(parseBytes("1 KiB")).toBe(1024);
    expect(parseBytes("1 MiB")).toBe(1048576);
  });

  it("parseBytes handles bare bytes", () => {
    expect(parseBytes("100")).toBe(100);
    expect(parseBytes("100 B")).toBe(100);
  });

  it("parseBytes throws on invalid input", () => {
    expect(() => parseBytes("not-a-size")).toThrow();
  });

  it("formatBytes handles negative values", () => {
    expect(formatBytes(-1500)).toBe("-1.50 KB");
  });

  it("roundtrip parse/format is close", () => {
    const original = 1500000;
    const formatted = formatBytes(original, 2);
    const parsed = parseBytes(formatted);
    expect(Math.abs(parsed - original)).toBeLessThan(original * 0.01);
  });
});
