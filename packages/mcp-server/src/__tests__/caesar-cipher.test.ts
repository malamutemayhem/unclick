import { describe, it, expect } from "vitest";
import { CaesarCipher } from "../caesar-cipher.js";

describe("CaesarCipher", () => {
  it("encrypts with shift", () => {
    expect(CaesarCipher.encrypt("ABC", 3)).toBe("DEF");
  });

  it("decrypts reverses encrypt", () => {
    const text = "Hello World!";
    const encrypted = CaesarCipher.encrypt(text, 7);
    expect(CaesarCipher.decrypt(encrypted, 7)).toBe(text);
  });

  it("wraps around alphabet", () => {
    expect(CaesarCipher.encrypt("XYZ", 3)).toBe("ABC");
  });

  it("preserves non-alpha characters", () => {
    expect(CaesarCipher.encrypt("Hi! 123", 1)).toBe("Ij! 123");
  });

  it("rot13 is self-inverse", () => {
    const text = "Hello World";
    expect(CaesarCipher.rot13(CaesarCipher.rot13(text))).toBe(text);
  });

  it("bruteForce returns 26 options", () => {
    const options = CaesarCipher.bruteForce("Khoor");
    expect(options.length).toBe(26);
    expect(options[3]).toBe("Hello");
  });

  it("frequencyAnalysis returns sorted frequencies", () => {
    const analysis = CaesarCipher.frequencyAnalysis("AAABBC");
    expect(analysis[0].letter).toBe("A");
    expect(analysis[0].frequency).toBeCloseTo(0.5, 5);
  });

  it("guessShift estimates shift", () => {
    const text = "the the the the the the the the the the the";
    const encrypted = CaesarCipher.encrypt(text, 5);
    const guess = CaesarCipher.guessShift(encrypted);
    expect(guess).toBe(5);
  });
});
