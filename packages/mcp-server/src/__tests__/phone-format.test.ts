import { describe, it, expect } from "vitest";
import { PhoneFormat } from "../phone-format.js";

describe("PhoneFormat", () => {
  it("strips formatting", () => {
    expect(PhoneFormat.stripFormatting("(555) 123-4567")).toBe("5551234567");
    expect(PhoneFormat.stripFormatting("+1-555-123-4567")).toBe("+15551234567");
  });

  it("extracts digits", () => {
    expect(PhoneFormat.digits("+1 (555) 123-4567")).toBe("15551234567");
  });

  it("formats US numbers", () => {
    expect(PhoneFormat.formatUS("5551234567")).toBe("(555) 123-4567");
    expect(PhoneFormat.formatUS("15551234567")).toBe("(555) 123-4567");
  });

  it("converts to E.164", () => {
    expect(PhoneFormat.toE164("5551234567", "1")).toBe("+15551234567");
    expect(PhoneFormat.toE164("15551234567", "1")).toBe("+15551234567");
  });

  it("parses E.164", () => {
    const result = PhoneFormat.fromE164("+441234567890");
    expect(result).not.toBeNull();
    expect(result!.countryCode).toBe("441");
    expect(result!.number).toBe("234567890");
  });

  it("validates phone numbers", () => {
    expect(PhoneFormat.isValid("5551234567")).toBe(true);
    expect(PhoneFormat.isValid("123")).toBe(false);
  });

  it("masks phone numbers", () => {
    expect(PhoneFormat.mask("5551234567")).toBe("******4567");
  });

  it("detects US numbers", () => {
    expect(PhoneFormat.isUS("5551234567")).toBe(true);
    expect(PhoneFormat.isUS("123")).toBe(false);
  });

  it("detects toll-free numbers", () => {
    expect(PhoneFormat.isTollFree("8001234567")).toBe(true);
    expect(PhoneFormat.isTollFree("5551234567")).toBe(false);
  });

  it("extracts area code", () => {
    expect(PhoneFormat.areaCode("5551234567")).toBe("555");
    expect(PhoneFormat.areaCode("15551234567")).toBe("555");
  });

  it("compares phone numbers", () => {
    expect(PhoneFormat.compare("5551234567", "15551234567")).toBe(true);
    expect(PhoneFormat.compare("5551234567", "5559999999")).toBe(false);
  });
});
