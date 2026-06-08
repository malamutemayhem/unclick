import { describe, it, expect } from "vitest";
import {
  encode, decode, buildFrequencyTable,
  compressionRatio, bitsToBytes, bytesToBits,
} from "../arithmetic-coding.js";

describe("buildFrequencyTable", () => {
  it("counts symbol frequencies", () => {
    const data = new Uint8Array([1, 2, 2, 3, 3, 3]);
    const ft = buildFrequencyTable(data);
    expect(ft.symbols.get(1)).toBe(1);
    expect(ft.symbols.get(2)).toBe(2);
    expect(ft.symbols.get(3)).toBe(3);
    expect(ft.total).toBe(6);
  });
});

describe("encode/decode roundtrip", () => {
  it("roundtrips simple data", () => {
    const data = new Uint8Array([1, 2, 3, 1, 2, 3]);
    const { encoded, freq, length } = encode(data);
    const decoded = decode(encoded, freq, length);
    expect(decoded).toEqual(data);
  });

  it("roundtrips single byte", () => {
    const data = new Uint8Array([42]);
    const { encoded, freq, length } = encode(data);
    expect(decode(encoded, freq, length)).toEqual(data);
  });

  it("roundtrips repeated bytes", () => {
    const data = new Uint8Array(20).fill(7);
    const { encoded, freq, length } = encode(data);
    expect(decode(encoded, freq, length)).toEqual(data);
  });

  it("roundtrips all unique bytes", () => {
    const data = new Uint8Array([10, 20, 30, 40, 50]);
    const { encoded, freq, length } = encode(data);
    expect(decode(encoded, freq, length)).toEqual(data);
  });

  it("handles empty data", () => {
    const { encoded, length } = encode(new Uint8Array(0));
    expect(encoded).toEqual([]);
    expect(length).toBe(0);
  });

  it("roundtrips longer data", () => {
    const data = new Uint8Array(100);
    for (let i = 0; i < 100; i++) data[i] = i % 5;
    const { encoded, freq, length } = encode(data);
    expect(decode(encoded, freq, length)).toEqual(data);
  });
});

describe("compressionRatio", () => {
  it("calculates ratio", () => {
    expect(compressionRatio(100, 400)).toBe(0.5);
  });

  it("returns 0 for empty", () => {
    expect(compressionRatio(0, 0)).toBe(0);
  });
});

describe("bitsToBytes / bytesToBits", () => {
  it("roundtrips bits", () => {
    const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1];
    const bytes = bitsToBytes(bits);
    const restored = bytesToBits(bytes, bits.length);
    expect(restored).toEqual(bits);
  });

  it("handles single bit", () => {
    const bits = [1];
    const bytes = bitsToBytes(bits);
    expect(bytesToBits(bytes, 1)).toEqual([1]);
  });
});
