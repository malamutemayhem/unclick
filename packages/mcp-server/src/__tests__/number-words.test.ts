import { describe, it, expect } from "vitest";
import { wordsToNumber, numberToWords, ordinal } from "../number-words.js";

describe("wordsToNumber", () => {
  it("single digit", () => { expect(wordsToNumber("five")).toBe(5); });
  it("teens", () => { expect(wordsToNumber("thirteen")).toBe(13); });
  it("tens", () => { expect(wordsToNumber("forty")).toBe(40); });
  it("compound", () => { expect(wordsToNumber("twenty-three")).toBe(23); });
  it("hundreds", () => { expect(wordsToNumber("two hundred")).toBe(200); });
  it("complex", () => { expect(wordsToNumber("one thousand two hundred and thirty four")).toBe(1234); });
  it("million", () => { expect(wordsToNumber("three million")).toBe(3000000); });
  it("throws on unknown", () => { expect(() => wordsToNumber("banana")).toThrow(); });
});

describe("numberToWords", () => {
  it("zero", () => { expect(numberToWords(0)).toBe("zero"); });
  it("single digit", () => { expect(numberToWords(7)).toBe("seven"); });
  it("compound", () => { expect(numberToWords(42)).toBe("forty-two"); });
  it("hundreds", () => { expect(numberToWords(100)).toBe("one hundred"); });
  it("thousands", () => { expect(numberToWords(1500)).toBe("one thousand five hundred"); });
  it("negative", () => { expect(numberToWords(-3)).toBe("negative three"); });
});

describe("ordinal", () => {
  it("1st", () => { expect(ordinal(1)).toBe("1st"); });
  it("2nd", () => { expect(ordinal(2)).toBe("2nd"); });
  it("3rd", () => { expect(ordinal(3)).toBe("3rd"); });
  it("11th", () => { expect(ordinal(11)).toBe("11th"); });
  it("21st", () => { expect(ordinal(21)).toBe("21st"); });
});
