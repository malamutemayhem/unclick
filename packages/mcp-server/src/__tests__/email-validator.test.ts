import { describe, it, expect } from "vitest";
import { EmailValidator } from "../email-validator.js";

describe("EmailValidator", () => {
  it("validates correct emails", () => {
    expect(EmailValidator.isValid("user@example.com")).toBe(true);
    expect(EmailValidator.isValid("user+tag@example.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(EmailValidator.isValid("not-email")).toBe(false);
    expect(EmailValidator.isValid("@example.com")).toBe(false);
    expect(EmailValidator.isValid("user@")).toBe(false);
  });

  it("parses email parts", () => {
    const parts = EmailValidator.parse("user@example.com");
    expect(parts).not.toBeNull();
    expect(parts!.local).toBe("user");
    expect(parts!.domain).toBe("example.com");
    expect(parts!.tld).toBe("com");
  });

  it("normalizes gmail addresses", () => {
    expect(EmailValidator.normalize("u.s.e.r+tag@gmail.com")).toBe("user@gmail.com");
  });

  it("normalizes non-gmail addresses", () => {
    expect(EmailValidator.normalize("user+tag@example.com")).toBe("user@example.com");
  });

  it("identifies common providers", () => {
    expect(EmailValidator.isCommonProvider("user@gmail.com")).toBe(true);
    expect(EmailValidator.isCommonProvider("user@company.com")).toBe(false);
  });

  it("detects likely disposable emails", () => {
    expect(EmailValidator.isLikelyDisposable("user@tempmail.com")).toBe(true);
    expect(EmailValidator.isLikelyDisposable("user@gmail.com")).toBe(false);
  });

  it("identifies corporate emails", () => {
    expect(EmailValidator.isCorporate("user@company.com")).toBe(true);
    expect(EmailValidator.isCorporate("user@gmail.com")).toBe(false);
  });

  it("extracts domain", () => {
    expect(EmailValidator.extractDomain("user@example.com")).toBe("example.com");
    expect(EmailValidator.extractDomain("invalid")).toBeNull();
  });

  it("obfuscates email", () => {
    expect(EmailValidator.obfuscate("hello@example.com")).toBe("h***o@example.com");
  });

  it("generates variants", () => {
    const variants = EmailValidator.generateVariants("user@example.com");
    expect(variants.length).toBe(3);
    expect(variants).toContain("user@example.com");
  });
});
