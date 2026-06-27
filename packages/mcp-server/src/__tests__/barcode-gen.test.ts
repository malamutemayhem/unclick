import { describe, it, expect } from "vitest";
import { BarcodeGenerator } from "../barcode-gen.js";

describe("BarcodeGenerator", () => {
  it("calculates EAN-13 check digit", () => {
    expect(BarcodeGenerator.ean13CheckDigit("590123412345")).toBe(7);
  });

  it("generates EAN-13 barcode pattern", () => {
    const result = BarcodeGenerator.ean13("590123412345");
    expect(result.text).toBe("5901234123457");
    expect(result.checkDigit).toBe(7);
    expect(result.bars.length).toBeGreaterThan(0);
    expect(result.bars[0]).toBe(true);
  });

  it("accepts 13-digit EAN", () => {
    const result = BarcodeGenerator.ean13("5901234123457");
    expect(result.text).toBe("5901234123457");
  });

  it("throws on invalid EAN length", () => {
    expect(() => BarcodeGenerator.ean13("123")).toThrow();
  });

  it("validates EAN-13", () => {
    expect(BarcodeGenerator.isValidEan13("5901234123457")).toBe(true);
    expect(BarcodeGenerator.isValidEan13("5901234123450")).toBe(false);
    expect(BarcodeGenerator.isValidEan13("short")).toBe(false);
  });

  it("calculates UPC-A check digit", () => {
    const check = BarcodeGenerator.upcACheckDigit("03600029145");
    expect(typeof check).toBe("number");
    expect(check).toBeGreaterThanOrEqual(0);
    expect(check).toBeLessThan(10);
  });

  it("calculates Code 128 checksum", () => {
    const checksum = BarcodeGenerator.code128Checksum("Hello");
    expect(typeof checksum).toBe("number");
    expect(checksum).toBeGreaterThanOrEqual(0);
    expect(checksum).toBeLessThan(103);
  });

  it("calculates ISBN-10 check digit", () => {
    expect(BarcodeGenerator.isbn10CheckDigit("030640615")).toBe("2");
  });

  it("validates ISBN-10", () => {
    expect(BarcodeGenerator.isValidIsbn10("0306406152")).toBe(true);
    expect(BarcodeGenerator.isValidIsbn10("0306406150")).toBe(false);
  });

  it("generates ASCII art", () => {
    const pattern = BarcodeGenerator.ean13("590123412345");
    const art = BarcodeGenerator.toAsciiArt(pattern, 3);
    const lines = art.split("\n");
    expect(lines).toHaveLength(3);
    expect(lines[0]).toContain("#");
  });

  it("throws on invalid check digit input length", () => {
    expect(() => BarcodeGenerator.ean13CheckDigit("123")).toThrow();
    expect(() => BarcodeGenerator.isbn10CheckDigit("12")).toThrow();
    expect(() => BarcodeGenerator.upcACheckDigit("123")).toThrow();
  });
});
