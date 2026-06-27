import { describe, it, expect } from "vitest";
import { maskEmail, maskPhone, maskCreditCard, maskString, anonymizeObject, hashForAnonymity, redactPII } from "../data-anonymizer.js";

describe("maskEmail", () => {
  it("masks local part", () => {
    expect(maskEmail("alice@example.com")).toBe("a***e@example.com");
  });

  it("handles short local", () => {
    expect(maskEmail("ab@example.com")).toBe("**@example.com");
  });
});

describe("maskPhone", () => {
  it("shows last 4 digits", () => {
    expect(maskPhone("555-123-4567")).toBe("******4567");
  });
});

describe("maskCreditCard", () => {
  it("shows last 4 digits", () => {
    expect(maskCreditCard("4111 1111 1111 1111")).toBe("************1111");
  });
});

describe("maskString", () => {
  it("masks middle", () => {
    expect(maskString("secret", 1, 1)).toBe("s****t");
  });

  it("masks all if too short", () => {
    expect(maskString("ab", 3, 3)).toBe("**");
  });
});

describe("anonymizeObject", () => {
  it("masks specified fields", () => {
    const obj = { name: "Alice", email: "alice@test.com", age: 30 };
    const result = anonymizeObject(obj, ["name", "email"]);
    expect(result.name).toBe("A***e");
    expect(result.email).toBe("a************m");
    expect(result.age).toBe(30);
  });
});

describe("hashForAnonymity", () => {
  it("produces consistent hash", () => {
    const h1 = hashForAnonymity("test");
    const h2 = hashForAnonymity("test");
    expect(h1).toBe(h2);
  });

  it("different inputs give different hashes", () => {
    expect(hashForAnonymity("a")).not.toBe(hashForAnonymity("b"));
  });
});

describe("redactPII", () => {
  it("redacts emails", () => {
    expect(redactPII("Contact alice@example.com")).toBe("Contact [EMAIL]");
  });

  it("redacts SSNs", () => {
    expect(redactPII("SSN: 123-45-6789")).toBe("SSN: [SSN]");
  });
});
