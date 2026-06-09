import { describe, it, expect } from "vitest";
import {
  computeCheckDigit, validateEAN13, validateEAN8, validateUPC,
  detect, isValid, getCountry, upcToEAN13, generateCheckDigit,
  formatEAN13, formatUPC, getType,
} from "../ean-validator.js";

describe("computeCheckDigit", () => {
  it("computes EAN-13 check digit", () => {
    expect(computeCheckDigit("590123412345")).toBe(7);
  });

  it("computes UPC check digit", () => {
    expect(computeCheckDigit("03600029145")).toBe(2);
  });
});

describe("validateEAN13", () => {
  it("validates correct EAN-13", () => {
    const result = validateEAN13("5901234123457");
    expect(result.valid).toBe(true);
    expect(result.type).toBe("EAN-13");
  });

  it("rejects bad check digit", () => {
    expect(validateEAN13("5901234123450").valid).toBe(false);
  });

  it("detects country", () => {
    const result = validateEAN13("5901234123457");
    expect(result.country).toBe("Poland");
  });
});

describe("validateEAN8", () => {
  it("validates correct EAN-8", () => {
    const result = validateEAN8("96385074");
    expect(result.valid).toBe(true);
    expect(result.type).toBe("EAN-8");
  });

  it("rejects wrong length", () => {
    expect(validateEAN8("1234").valid).toBe(false);
  });
});

describe("validateUPC", () => {
  it("validates correct UPC-A", () => {
    const result = validateUPC("036000291452");
    expect(result.valid).toBe(true);
    expect(result.type).toBe("UPC-A");
  });

  it("rejects bad check digit", () => {
    expect(validateUPC("036000291450").valid).toBe(false);
  });
});

describe("detect", () => {
  it("detects EAN-13", () => {
    expect(detect("5901234123457").type).toBe("EAN-13");
  });

  it("detects UPC-A", () => {
    expect(detect("036000291452").type).toBe("UPC-A");
  });

  it("detects EAN-8", () => {
    expect(detect("96385074").type).toBe("EAN-8");
  });

  it("unknown for wrong length", () => {
    expect(detect("123").type).toBe("unknown");
  });
});

describe("isValid", () => {
  it("true for valid code", () => {
    expect(isValid("5901234123457")).toBe(true);
  });

  it("false for invalid code", () => {
    expect(isValid("5901234123450")).toBe(false);
  });
});

describe("getCountry", () => {
  it("gets country for EAN-13", () => {
    expect(getCountry("4006381333931")).toBe("Germany");
  });
});

describe("upcToEAN13", () => {
  it("converts UPC to EAN-13", () => {
    const ean = upcToEAN13("036000291452");
    expect(ean.length).toBe(13);
    expect(ean.startsWith("0")).toBe(true);
    expect(isValid(ean)).toBe(true);
  });
});

describe("generateCheckDigit", () => {
  it("generates correct check digit", () => {
    expect(generateCheckDigit("590123412345")).toBe(7);
  });
});

describe("formatEAN13 / formatUPC", () => {
  it("formats EAN-13 with spaces", () => {
    expect(formatEAN13("5901234123457")).toBe("5 901234 123457");
  });

  it("formats UPC with spaces", () => {
    expect(formatUPC("036000291452")).toBe("0 36000 29145 2");
  });
});

describe("getType", () => {
  it("returns type string", () => {
    expect(getType("5901234123457")).toBe("EAN-13");
  });
});
