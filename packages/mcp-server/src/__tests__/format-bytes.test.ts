import { describe, it, expect } from "vitest";
import { formatBytes, formatBytesSI, parseBytes, formatBits, formatTransferRate } from "../format-bytes.js";

describe("format-bytes", () => {
  describe("formatBytes", () => {
    it("formats zero", () => { expect(formatBytes(0)).toBe("0 B"); });
    it("formats bytes", () => { expect(formatBytes(500)).toBe("500.00 B"); });
    it("formats KB", () => { expect(formatBytes(1024)).toBe("1.00 KB"); });
    it("formats MB", () => { expect(formatBytes(1048576)).toBe("1.00 MB"); });
    it("formats GB", () => { expect(formatBytes(1073741824)).toBe("1.00 GB"); });
    it("respects decimals", () => { expect(formatBytes(1536, 1)).toBe("1.5 KB"); });
    it("handles negative", () => { expect(formatBytes(-1024)).toBe("-1.00 KB"); });
  });

  describe("formatBytesSI", () => {
    it("formats zero", () => { expect(formatBytesSI(0)).toBe("0 B"); });
    it("uses 1000 base", () => { expect(formatBytesSI(1000)).toBe("1.00 kB"); });
    it("formats MB SI", () => { expect(formatBytesSI(1000000)).toBe("1.00 MB"); });
  });

  describe("parseBytes", () => {
    it("parses plain bytes", () => { expect(parseBytes("100")).toBe(100); });
    it("parses B suffix", () => { expect(parseBytes("100 B")).toBe(100); });
    it("parses KB", () => { expect(parseBytes("1 KB")).toBe(1024); });
    it("parses MB", () => { expect(parseBytes("1 MB")).toBe(1048576); });
    it("parses GB", () => { expect(parseBytes("2 GB")).toBe(2147483648); });
    it("parses fractional", () => { expect(parseBytes("1.5 KB")).toBe(1536); });
    it("is case insensitive", () => { expect(parseBytes("1 kb")).toBe(1024); });
    it("throws on invalid", () => { expect(() => parseBytes("abc")).toThrow(); });
  });

  describe("formatBits", () => {
    it("formats bits from bytes", () => {
      const result = formatBits(8);
      expect(result).toContain("b");
    });
  });

  describe("formatTransferRate", () => {
    it("appends /s", () => {
      expect(formatTransferRate(1024)).toBe("1.00 KB/s");
    });
    it("formats zero", () => {
      expect(formatTransferRate(0)).toBe("0 B/s");
    });
  });
});
