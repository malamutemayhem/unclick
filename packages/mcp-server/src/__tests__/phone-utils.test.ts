import { describe, it, expect } from "vitest";
import { formatPhone, normalizePhone, isValidPhone, extractPhoneNumbers, toE164, maskPhone } from "../phone-utils.js";

describe("phone-utils", () => {
  describe("formatPhone", () => {
    it("formats US number", () => { expect(formatPhone("2025551234")).toBe("(202) 555-1234"); });
    it("formats US with country code", () => { expect(formatPhone("12025551234")).toBe("(202) 555-1234"); });
    it("formats AU number", () => { expect(formatPhone("0412345678", "AU")).toBe("0412 345 678"); });
    it("returns original for unknown format", () => { expect(formatPhone("123", "XX")).toBe("123"); });
  });
  describe("normalizePhone", () => {
    it("strips non-digits", () => { expect(normalizePhone("+1 (202) 555-1234")).toBe("12025551234"); });
  });
  describe("isValidPhone", () => {
    it("valid", () => { expect(isValidPhone("2025551234")).toBe(true); });
    it("too short", () => { expect(isValidPhone("123")).toBe(false); });
  });
  describe("extractPhoneNumbers", () => {
    it("extracts from text", () => {
      const nums = extractPhoneNumbers("Call 202-555-1234 or (415) 555-6789");
      expect(nums.length).toBeGreaterThanOrEqual(2);
    });
  });
  describe("toE164", () => {
    it("adds country code", () => { expect(toE164("2025551234")).toBe("+12025551234"); });
    it("keeps existing country code", () => { expect(toE164("12025551234")).toBe("+12025551234"); });
  });
  describe("maskPhone", () => {
    it("masks digits", () => { expect(maskPhone("2025551234")).toBe("******1234"); });
    it("custom visible digits", () => { expect(maskPhone("2025551234", 2)).toBe("********34"); });
  });
});
