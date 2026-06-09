import { describe, it, expect } from "vitest";
import {
  computeCheckDigit, validateCheckDigit, validateFormat,
  decodeYear, getCountry, getWMI, getVDS, getVIS, getSerial,
  decode, isValid, normalize, hasInvalidChars,
} from "../vin-decoder.js";

const VALID_VIN = "1HGBH41JXMN109186";

describe("validateFormat", () => {
  it("accepts valid 17-char VIN", () => {
    expect(validateFormat(VALID_VIN)).toBe(true);
  });

  it("rejects too short", () => {
    expect(validateFormat("1HGBH41")).toBe(false);
  });

  it("rejects I, O, Q characters", () => {
    expect(validateFormat("1HGBH41IXMN109186")).toBe(false);
  });
});

describe("computeCheckDigit", () => {
  it("computes check digit for valid VIN", () => {
    const check = computeCheckDigit(VALID_VIN);
    expect(check).toBe(VALID_VIN[8]);
  });
});

describe("validateCheckDigit", () => {
  it("validates correct check digit", () => {
    expect(validateCheckDigit(VALID_VIN)).toBe(true);
  });

  it("rejects wrong check digit", () => {
    const bad = VALID_VIN.substring(0, 8) + "0" + VALID_VIN.substring(9);
    expect(validateCheckDigit(bad)).toBe(false);
  });
});

describe("getCountry", () => {
  it("identifies US VIN", () => {
    expect(getCountry("1HGBH41JXMN109186")).toBe("United States");
  });

  it("identifies Japanese VIN", () => {
    expect(getCountry("JN1TBNT30Z0000001")).toBe("Japan");
  });

  it("identifies German VIN", () => {
    expect(getCountry("WVWZZZ3CZWE000001")).toBe("Germany");
  });
});

describe("getWMI / getVDS / getVIS", () => {
  it("splits VIN correctly", () => {
    expect(getWMI(VALID_VIN)).toBe("1HG");
    expect(getVDS(VALID_VIN)).toBe("BH41JX");
    expect(getVIS(VALID_VIN)).toBe("MN109186");
  });
});

describe("getSerial", () => {
  it("extracts serial number", () => {
    expect(getSerial(VALID_VIN)).toBe("109186");
  });
});

describe("decodeYear", () => {
  it("decodes year code", () => {
    const year = decodeYear(VALID_VIN);
    expect(year).not.toBeNull();
    expect(typeof year).toBe("number");
  });
});

describe("decode", () => {
  it("decodes valid VIN", () => {
    const info = decode(VALID_VIN);
    expect(info.valid).toBe(true);
    expect(info.country).toBe("United States");
    expect(info.wmi).toBe("1HG");
    expect(info.serial).toBe("109186");
  });

  it("handles spaces and dashes", () => {
    const info = decode("1HG-BH41J-XMN109186");
    expect(info.valid).toBe(true);
  });

  it("reports invalid VIN", () => {
    const info = decode("INVALIDVIN1234567");
    expect(info.valid).toBe(false);
  });
});

describe("isValid", () => {
  it("valid VIN", () => {
    expect(isValid(VALID_VIN)).toBe(true);
  });

  it("invalid VIN", () => {
    expect(isValid("00000000100000000")).toBe(false);
  });
});

describe("normalize", () => {
  it("strips spaces and uppercases", () => {
    expect(normalize("1hg bh41j xmn109186")).toBe("1HGBH41JXMN109186");
  });
});

describe("hasInvalidChars", () => {
  it("detects I, O, Q", () => {
    expect(hasInvalidChars("ABCIO")).toBe(true);
    expect(hasInvalidChars("ABCDE")).toBe(false);
  });
});
