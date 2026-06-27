import { describe, it, expect } from "vitest";
import {
  normalize, getCountryCode, getCheckDigits, getBBAN,
  validateChecksum, validateLength, validateFormat,
  validate, computeCheckDigits, formatIBAN,
  getSupportedCountries, getExpectedLength,
} from "../iban-validator.js";

describe("normalize", () => {
  it("removes spaces and uppercases", () => {
    expect(normalize("gb29 nwbk 6016 1331 9268 19")).toBe("GB29NWBK60161331926819");
  });
});

describe("getCountryCode", () => {
  it("extracts country", () => {
    expect(getCountryCode("DE89370400440532013000")).toBe("DE");
  });
});

describe("getCheckDigits", () => {
  it("extracts check digits", () => {
    expect(getCheckDigits("DE89370400440532013000")).toBe("89");
  });
});

describe("getBBAN", () => {
  it("extracts BBAN", () => {
    expect(getBBAN("DE89370400440532013000")).toBe("370400440532013000");
  });
});

describe("validateFormat", () => {
  it("accepts valid format", () => {
    expect(validateFormat("DE89370400440532013000")).toBe(true);
  });

  it("rejects lowercase-only without normalization", () => {
    expect(validateFormat("de89370400440532013000")).toBe(true);
  });

  it("rejects too short", () => {
    expect(validateFormat("DE89")).toBe(false);
  });
});

describe("validateLength", () => {
  it("accepts correct length", () => {
    expect(validateLength("DE89370400440532013000")).toBe(true);
  });

  it("rejects wrong length", () => {
    expect(validateLength("DE8937040044053201300")).toBe(false);
  });
});

describe("validateChecksum", () => {
  it("valid German IBAN", () => {
    expect(validateChecksum("DE89370400440532013000")).toBe(true);
  });

  it("valid GB IBAN", () => {
    expect(validateChecksum("GB29NWBK60161331926819")).toBe(true);
  });

  it("invalid checksum", () => {
    expect(validateChecksum("DE00370400440532013000")).toBe(false);
  });
});

describe("validate", () => {
  it("validates correct IBAN", () => {
    const result = validate("DE89370400440532013000");
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
    expect(result.country).toBe("DE");
  });

  it("reports invalid checksum", () => {
    const result = validate("DE00370400440532013000");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("reports unknown country", () => {
    const result = validate("XX123456789012345678");
    expect(result.valid).toBe(false);
  });
});

describe("computeCheckDigits", () => {
  it("computes correct check digits for DE", () => {
    const check = computeCheckDigits("DE", "370400440532013000");
    expect(check).toBe("89");
  });
});

describe("formatIBAN", () => {
  it("formats in groups of 4", () => {
    expect(formatIBAN("DE89370400440532013000")).toBe("DE89 3704 0044 0532 0130 00");
  });
});

describe("getSupportedCountries", () => {
  it("returns sorted list", () => {
    const countries = getSupportedCountries();
    expect(countries.length).toBeGreaterThan(30);
    expect(countries).toContain("DE");
    expect(countries).toContain("GB");
  });
});

describe("getExpectedLength", () => {
  it("returns length for known country", () => {
    expect(getExpectedLength("DE")).toBe(22);
    expect(getExpectedLength("GB")).toBe(22);
  });

  it("returns null for unknown", () => {
    expect(getExpectedLength("XX")).toBeNull();
  });
});
