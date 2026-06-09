import { describe, it, expect } from "vitest";
import {
  validate, validateDetailed, detectCountry,
  getFormat, getExample, getSupportedCountries,
  normalizeUS, normalizeCA, normalizeGB,
  extractDigits, extractLetters,
} from "../postal-code.js";

describe("validate", () => {
  it("US zip code", () => {
    expect(validate("90210", "US")).toBe(true);
    expect(validate("90210-1234", "US")).toBe(true);
    expect(validate("9021", "US")).toBe(false);
  });

  it("Canadian postal code", () => {
    expect(validate("K1A 0B1", "CA")).toBe(true);
    expect(validate("K1A0B1", "CA")).toBe(true);
    expect(validate("12345", "CA")).toBe(false);
  });

  it("UK postcode", () => {
    expect(validate("SW1A 1AA", "GB")).toBe(true);
    expect(validate("EC1A 1BB", "GB")).toBe(true);
  });

  it("German PLZ", () => {
    expect(validate("10115", "DE")).toBe(true);
    expect(validate("1011", "DE")).toBe(false);
  });

  it("Australian postcode", () => {
    expect(validate("2000", "AU")).toBe(true);
    expect(validate("20000", "AU")).toBe(false);
  });

  it("returns false for unknown country", () => {
    expect(validate("12345", "XX")).toBe(false);
  });
});

describe("validateDetailed", () => {
  it("returns detailed result", () => {
    const r = validateDetailed("90210", "US");
    expect(r.valid).toBe(true);
    expect(r.country).toBe("US");
    expect(r.format).toBe("NNNNN or NNNNN-NNNN");
  });
});

describe("detectCountry", () => {
  it("detects potential countries", () => {
    const countries = detectCountry("90210");
    expect(countries).toContain("US");
  });

  it("multiple matches possible", () => {
    const countries = detectCountry("10115");
    expect(countries.length).toBeGreaterThanOrEqual(1);
  });
});

describe("getFormat", () => {
  it("returns format info", () => {
    const fmt = getFormat("US");
    expect(fmt).not.toBeNull();
    expect(fmt!.example).toBe("90210");
  });

  it("returns null for unknown", () => {
    expect(getFormat("XX")).toBeNull();
  });
});

describe("getExample", () => {
  it("returns example for known country", () => {
    expect(getExample("JP")).toBe("100-0001");
  });
});

describe("getSupportedCountries", () => {
  it("returns sorted list", () => {
    const countries = getSupportedCountries();
    expect(countries.length).toBeGreaterThan(20);
    expect(countries).toContain("US");
  });
});

describe("normalizeUS", () => {
  it("formats 9-digit zip", () => {
    expect(normalizeUS("902101234")).toBe("90210-1234");
  });

  it("passes through 5-digit", () => {
    expect(normalizeUS("90210")).toBe("90210");
  });
});

describe("normalizeCA", () => {
  it("adds space", () => {
    expect(normalizeCA("K1A0B1")).toBe("K1A 0B1");
  });
});

describe("normalizeGB", () => {
  it("formats UK postcode", () => {
    expect(normalizeGB("SW1A1AA")).toBe("SW1A 1AA");
  });
});

describe("extractDigits / extractLetters", () => {
  it("extracts digits", () => {
    expect(extractDigits("K1A 0B1")).toBe("101");
  });

  it("extracts letters", () => {
    expect(extractLetters("K1A 0B1")).toBe("KAB");
  });
});
