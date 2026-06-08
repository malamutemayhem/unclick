import { describe, it, expect } from "vitest";
import { BitWriter, BitReader } from "../bit-stream.js";

describe("BitWriter", () => {
  it("writes individual bits", () => {
    const w = new BitWriter();
    w.writeBit(1);
    w.writeBit(0);
    w.writeBit(1);
    w.writeBit(0);
    w.writeBit(1);
    w.writeBit(0);
    w.writeBit(1);
    w.writeBit(0);
    const data = w.flush();
    expect(data).toEqual([0b10101010]);
  });

  it("writes multiple bits", () => {
    const w = new BitWriter();
    w.writeBits(0b1101, 4);
    w.writeBits(0b0010, 4);
    expect(w.flush()).toEqual([0b11010010]);
  });

  it("writes byte", () => {
    const w = new BitWriter();
    w.writeByte(0xff);
    expect(w.flush()).toEqual([0xff]);
  });

  it("writes uint16", () => {
    const w = new BitWriter();
    w.writeUint16(0x1234);
    expect(w.flush()).toEqual([0x12, 0x34]);
  });

  it("writes uint32", () => {
    const w = new BitWriter();
    w.writeUint32(0x12345678);
    expect(w.flush()).toEqual([0x12, 0x34, 0x56, 0x78]);
  });

  it("reports bit and byte length", () => {
    const w = new BitWriter();
    w.writeBits(0b101, 3);
    expect(w.bitLength).toBe(3);
    expect(w.byteLength).toBe(1);
  });

  it("handles partial bytes in flush", () => {
    const w = new BitWriter();
    w.writeBit(1);
    const data = w.flush();
    expect(data).toEqual([0b10000000]);
  });
});

describe("BitReader", () => {
  it("reads individual bits", () => {
    const r = new BitReader([0b10110000]);
    expect(r.readBit()).toBe(1);
    expect(r.readBit()).toBe(0);
    expect(r.readBit()).toBe(1);
    expect(r.readBit()).toBe(1);
  });

  it("reads multiple bits", () => {
    const r = new BitReader([0b11010010]);
    expect(r.readBits(4)).toBe(0b1101);
    expect(r.readBits(4)).toBe(0b0010);
  });

  it("reads byte", () => {
    const r = new BitReader([0xab]);
    expect(r.readByte()).toBe(0xab);
  });

  it("reads uint16", () => {
    const r = new BitReader([0x12, 0x34]);
    expect(r.readUint16()).toBe(0x1234);
  });

  it("reads uint32", () => {
    const r = new BitReader([0x12, 0x34, 0x56, 0x78]);
    expect(r.readUint32()).toBe(0x12345678);
  });

  it("throws on end of stream", () => {
    const r = new BitReader([]);
    expect(() => r.readBit()).toThrow("End of stream");
  });

  it("reports remaining bits", () => {
    const r = new BitReader([0xff, 0xff]);
    r.readBits(5);
    expect(r.remaining).toBe(11);
  });

  it("reports position", () => {
    const r = new BitReader([0xff]);
    r.readBits(3);
    expect(r.position).toBe(3);
  });

  it("seeks to position", () => {
    const r = new BitReader([0b10000000, 0b01000000]);
    r.seek(8);
    expect(r.readBit()).toBe(0);
    expect(r.readBit()).toBe(1);
  });
});

describe("BitWriter + BitReader roundtrip", () => {
  it("writes and reads back correctly", () => {
    const w = new BitWriter();
    w.writeBits(42, 6);
    w.writeByte(0xab);
    w.writeUint16(1234);
    const data = w.flush();

    const r = new BitReader(data);
    expect(r.readBits(6)).toBe(42);
    expect(r.readByte()).toBe(0xab);
    expect(r.readUint16()).toBe(1234);
  });
});
