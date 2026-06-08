import { describe, it, expect } from "vitest";
import { BitBuffer } from "../bit-buffer.js";

describe("bit-buffer", () => {
  it("writes and reads single bits", () => {
    const buf = new BitBuffer();
    buf.writeBit(1);
    buf.writeBit(0);
    buf.writeBit(1);
    expect(buf.readBit(0)).toBe(1);
    expect(buf.readBit(1)).toBe(0);
    expect(buf.readBit(2)).toBe(1);
  });

  it("tracks bit and byte length", () => {
    const buf = new BitBuffer();
    buf.writeBits(0xFF, 8);
    expect(buf.bitLength).toBe(8);
    expect(buf.byteLength).toBe(1);
    buf.writeBit(1);
    expect(buf.bitLength).toBe(9);
    expect(buf.byteLength).toBe(2);
  });

  it("writeBits and readBits roundtrip", () => {
    const buf = new BitBuffer();
    buf.writeBits(42, 8);
    expect(buf.readBits(0, 8)).toBe(42);
  });

  it("toUint8Array returns correct bytes", () => {
    const buf = new BitBuffer();
    buf.writeBits(0xAB, 8);
    const arr = buf.toUint8Array();
    expect(arr.length).toBe(1);
    expect(arr[0]).toBe(0xAB);
  });

  it("toBinaryString returns bit string", () => {
    const buf = new BitBuffer();
    buf.writeBit(1);
    buf.writeBit(0);
    buf.writeBit(1);
    buf.writeBit(1);
    expect(buf.toBinaryString()).toBe("1011");
  });

  it("fromBinaryString creates buffer", () => {
    const buf = BitBuffer.fromBinaryString("11010");
    expect(buf.bitLength).toBe(5);
    expect(buf.readBit(0)).toBe(1);
    expect(buf.readBit(2)).toBe(0);
    expect(buf.readBit(4)).toBe(0);
  });

  it("throws on out of bounds read", () => {
    const buf = new BitBuffer();
    buf.writeBit(1);
    expect(() => buf.readBit(5)).toThrow();
  });

  it("handles multi-byte writes", () => {
    const buf = new BitBuffer();
    buf.writeBits(0xCAFE, 16);
    expect(buf.readBits(0, 16)).toBe(0xCAFE);
    expect(buf.byteLength).toBe(2);
  });
});
