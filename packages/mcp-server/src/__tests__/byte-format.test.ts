import { describe, it, expect } from "vitest";
import { ByteFormat } from "../byte-format.js";

describe("ByteFormat", () => {
  it("formats bytes in decimal", () => {
    expect(ByteFormat.format(0)).toBe("0 B");
    expect(ByteFormat.format(500)).toBe("500 B");
    expect(ByteFormat.format(1500)).toBe("1.5 KB");
    expect(ByteFormat.format(1500000)).toBe("1.5 MB");
  });

  it("formats bytes in binary", () => {
    expect(ByteFormat.format(1024, { binary: true })).toBe("1 KiB");
    expect(ByteFormat.format(1048576, { binary: true })).toBe("1 MiB");
  });

  it("respects decimal places", () => {
    expect(ByteFormat.format(1536, { decimals: 1 })).toBe("1.5 KB");
  });

  it("parses byte strings", () => {
    expect(ByteFormat.parse("1 KB")).toBe(1000);
    expect(ByteFormat.parse("1 KiB")).toBe(1024);
    expect(ByteFormat.parse("1.5 MB")).toBe(1500000);
    expect(ByteFormat.parse("100 B")).toBe(100);
  });

  it("converts between units", () => {
    expect(ByteFormat.convert(1048576, "MiB")).toBe(1);
    expect(ByteFormat.convert(1000000, "MB")).toBe(1);
  });

  it("compares byte strings", () => {
    expect(ByteFormat.compare("1 MB", "1 KB")).toBeGreaterThan(0);
    expect(ByteFormat.compare("1 KB", "1 MB")).toBeLessThan(0);
  });

  it("sums byte strings", () => {
    const result = ByteFormat.sum("500 KB", "500 KB");
    expect(result).toBe("1 MB");
  });

  it("validates byte strings", () => {
    expect(ByteFormat.isValidByteString("10 MB")).toBe(true);
    expect(ByteFormat.isValidByteString("not bytes")).toBe(false);
  });
});
