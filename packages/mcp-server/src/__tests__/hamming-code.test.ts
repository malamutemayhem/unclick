import { describe, it, expect } from "vitest";
import { HammingCode } from "../hamming-code.js";

describe("HammingCode", () => {
  it("encode and decode roundtrip", () => {
    const data = [1, 0, 1, 1];
    const encoded = HammingCode.encode(data);
    const { data: decoded, errorPosition } = HammingCode.decode(encoded);
    expect(decoded).toEqual(data);
    expect(errorPosition).toBe(0);
  });

  it("detects and corrects single bit error", () => {
    const data = [1, 0, 1, 1];
    const encoded = HammingCode.encode(data);
    encoded[2] ^= 1;
    const { data: corrected, errorPosition } = HammingCode.decode(encoded);
    expect(corrected).toEqual(data);
    expect(errorPosition).toBe(3);
  });

  it("parityCheck passes for valid codeword", () => {
    const encoded = HammingCode.encode([1, 1, 0, 0]);
    expect(HammingCode.parityCheck(encoded)).toBe(true);
  });

  it("parityCheck fails for corrupted codeword", () => {
    const encoded = HammingCode.encode([1, 1, 0, 0]);
    encoded[0] ^= 1;
    expect(HammingCode.parityCheck(encoded)).toBe(false);
  });

  it("hammingDistance counts differences", () => {
    expect(HammingCode.hammingDistance([1, 0, 1], [0, 0, 1])).toBe(1);
    expect(HammingCode.hammingDistance([1, 1, 1], [0, 0, 0])).toBe(3);
  });

  it("encoded is longer than data", () => {
    const data = [1, 0, 1, 1];
    const encoded = HammingCode.encode(data);
    expect(encoded.length).toBeGreaterThan(data.length);
  });

  it("minDistance is 3", () => {
    expect(HammingCode.minDistance()).toBe(3);
  });

  it("single bit data", () => {
    const data = [1];
    const encoded = HammingCode.encode(data);
    const { data: decoded } = HammingCode.decode(encoded);
    expect(decoded).toEqual(data);
  });
});
