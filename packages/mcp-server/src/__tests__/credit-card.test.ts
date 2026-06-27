import { describe, it, expect } from "vitest";
import { luhnCheck, generateCheckDigit, identifyNetwork, isValidCardNumber, formatCardNumber, maskCardNumber, isValidExpiry, isValidCVV, validateCard } from "../credit-card.js";

describe("luhnCheck", () => {
  it("validates correct numbers", () => {
    expect(luhnCheck("4532015112830366")).toBe(true);
    expect(luhnCheck("79927398713")).toBe(true);
  });

  it("rejects incorrect numbers", () => {
    expect(luhnCheck("4532015112830367")).toBe(false);
    expect(luhnCheck("1234567890")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(luhnCheck("")).toBe(false);
  });
});

describe("generateCheckDigit", () => {
  it("generates correct check digit", () => {
    expect(generateCheckDigit("7992739871")).toBe(3);
  });
});

describe("identifyNetwork", () => {
  it("identifies Visa", () => {
    expect(identifyNetwork("4111111111111111")).toBe("visa");
  });

  it("identifies Mastercard", () => {
    expect(identifyNetwork("5500000000000004")).toBe("mastercard");
  });

  it("identifies Amex", () => {
    expect(identifyNetwork("340000000000009")).toBe("amex");
  });

  it("identifies Discover", () => {
    expect(identifyNetwork("6011000000000004")).toBe("discover");
  });

  it("returns unknown for unrecognized", () => {
    expect(identifyNetwork("9999999999999999")).toBe("unknown");
  });
});

describe("isValidCardNumber", () => {
  it("validates test Visa number", () => {
    expect(isValidCardNumber("4532015112830366")).toBe(true);
  });

  it("rejects too short", () => {
    expect(isValidCardNumber("123")).toBe(false);
  });
});

describe("formatCardNumber", () => {
  it("formats in groups of 4", () => {
    expect(formatCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
  });

  it("formats Amex 4-6-5", () => {
    expect(formatCardNumber("340000000000009")).toBe("3400 000000 00009");
  });
});

describe("maskCardNumber", () => {
  it("masks all but last 4", () => {
    const masked = maskCardNumber("4111111111111111");
    expect(masked).toContain("1111");
    expect(masked).toContain("*");
  });
});

describe("isValidExpiry", () => {
  it("accepts future dates", () => {
    expect(isValidExpiry(12, 2027)).toBe(true);
  });

  it("rejects past dates", () => {
    expect(isValidExpiry(1, 2020)).toBe(false);
  });

  it("rejects invalid month", () => {
    expect(isValidExpiry(13, 2027)).toBe(false);
  });
});

describe("isValidCVV", () => {
  it("validates 3-digit CVV", () => {
    expect(isValidCVV("123")).toBe(true);
    expect(isValidCVV("12")).toBe(false);
  });

  it("validates 4-digit Amex CVV", () => {
    expect(isValidCVV("1234", "amex")).toBe(true);
    expect(isValidCVV("123", "amex")).toBe(false);
  });
});

describe("validateCard", () => {
  it("validates complete card info", () => {
    const result = validateCard("4532015112830366");
    expect(result.valid).toBe(true);
    expect(result.network).toBe("visa");
    expect(result.luhnValid).toBe(true);
    expect(result.lengthValid).toBe(true);
  });
});
