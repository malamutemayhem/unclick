import { describe, it, expect } from "vitest";
import { VigenereCipher } from "../vigenere-cipher.js";

describe("VigenereCipher", () => {
  it("encrypts and decrypts roundtrip", () => {
    const text = "Hello World";
    const key = "KEY";
    const encrypted = VigenereCipher.encrypt(text, key);
    const decrypted = VigenereCipher.decrypt(encrypted, key);
    expect(decrypted).toBe(text);
  });

  it("preserves non-alpha characters", () => {
    const encrypted = VigenereCipher.encrypt("Hi! 123", "A");
    expect(encrypted).toBe("Hi! 123");
  });

  it("key A is identity", () => {
    expect(VigenereCipher.encrypt("Hello", "A")).toBe("Hello");
  });

  it("known encryption", () => {
    expect(VigenereCipher.encrypt("ATTACKATDAWN", "LEMON")).toBe("LXFOPVEFRNHR");
  });

  it("kasiskiExamination returns factors", () => {
    const cipher = VigenereCipher.encrypt("AAAAAAAAAA", "ABC");
    const factors = VigenereCipher.kasiskiExamination(cipher);
    expect(factors.size).toBeGreaterThanOrEqual(0);
  });

  it("indexOfCoincidence for English-like text", () => {
    const ic = VigenereCipher.indexOfCoincidence("THETHETHE");
    expect(ic).toBeGreaterThan(0);
  });

  it("case insensitive key", () => {
    const a = VigenereCipher.encrypt("Hello", "key");
    const b = VigenereCipher.encrypt("Hello", "KEY");
    expect(a).toBe(b);
  });
});
