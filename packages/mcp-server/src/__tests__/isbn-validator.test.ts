import { describe, it, expect } from "vitest";
import { isValidISBN10, isValidISBN13, isValidISBN, isbn10to13, isbn13to10, formatISBN13, getISBNInfo, generateCheckDigit10, generateCheckDigit13 } from "../isbn-validator.js";

describe("ISBN-10", () => {
  it("validates correct ISBN-10", () => {
    expect(isValidISBN10("0306406152")).toBe(true);
    expect(isValidISBN10("0-306-40615-2")).toBe(true);
  });

  it("validates ISBN-10 with X check digit", () => {
    expect(isValidISBN10("080442957X")).toBe(true);
  });

  it("rejects invalid ISBN-10", () => {
    expect(isValidISBN10("0306406153")).toBe(false);
    expect(isValidISBN10("12345")).toBe(false);
  });
});

describe("ISBN-13", () => {
  it("validates correct ISBN-13", () => {
    expect(isValidISBN13("9780306406157")).toBe(true);
    expect(isValidISBN13("978-0-306-40615-7")).toBe(true);
  });

  it("rejects invalid ISBN-13", () => {
    expect(isValidISBN13("9780306406158")).toBe(false);
  });
});

describe("isValidISBN", () => {
  it("accepts both formats", () => {
    expect(isValidISBN("0306406152")).toBe(true);
    expect(isValidISBN("9780306406157")).toBe(true);
  });

  it("rejects invalid", () => {
    expect(isValidISBN("abc")).toBe(false);
  });
});

describe("conversion", () => {
  it("isbn10to13 converts correctly", () => {
    expect(isbn10to13("0306406152")).toBe("9780306406157");
  });

  it("isbn13to10 converts correctly", () => {
    expect(isbn13to10("9780306406157")).toBe("0306406152");
  });

  it("isbn13to10 returns null for non-978", () => {
    expect(isbn13to10("9790000000003")).toBeNull();
  });
});

describe("formatISBN13", () => {
  it("formats with hyphens", () => {
    const formatted = formatISBN13("9780306406157");
    expect(formatted).toBe("978-0-30640-615-7");
  });
});

describe("getISBNInfo", () => {
  it("identifies ISBN-10", () => {
    const info = getISBNInfo("0306406152");
    expect(info.valid).toBe(true);
    expect(info.type).toBe("ISBN-10");
  });

  it("identifies ISBN-13 with prefix", () => {
    const info = getISBNInfo("9780306406157");
    expect(info.valid).toBe(true);
    expect(info.type).toBe("ISBN-13");
    expect(info.prefix).toBe("978");
  });
});

describe("check digit generation", () => {
  it("generates ISBN-10 check digit", () => {
    expect(generateCheckDigit10("030640615")).toBe("2");
  });

  it("generates ISBN-13 check digit", () => {
    expect(generateCheckDigit13("978030640615")).toBe(7);
  });
});
