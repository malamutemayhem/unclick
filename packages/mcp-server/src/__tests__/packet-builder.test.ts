import { describe, it, expect } from "vitest";
import { PacketBuilder } from "../packet-builder.js";

describe("PacketBuilder", () => {
  it("writeUint8 adds single byte", () => {
    const pkt = new PacketBuilder().writeUint8(0xFF).build();
    expect(pkt).toEqual([255]);
  });

  it("writeUint16BE writes big-endian", () => {
    const pkt = new PacketBuilder().writeUint16BE(0x0102).build();
    expect(pkt).toEqual([1, 2]);
  });

  it("writeUint16LE writes little-endian", () => {
    const pkt = new PacketBuilder().writeUint16LE(0x0102).build();
    expect(pkt).toEqual([2, 1]);
  });

  it("writeUint32BE writes big-endian", () => {
    const pkt = new PacketBuilder().writeUint32BE(0x01020304).build();
    expect(pkt).toEqual([1, 2, 3, 4]);
  });

  it("writeString writes characters", () => {
    const pkt = new PacketBuilder().writeString("Hi", 4).build();
    expect(pkt).toEqual([72, 105, 0, 0]);
  });

  it("writeBytes appends raw bytes", () => {
    const pkt = new PacketBuilder().writeBytes([0xAA, 0xBB]).build();
    expect(pkt).toEqual([0xAA, 0xBB]);
  });

  it("length tracks size", () => {
    const pb = new PacketBuilder().writeUint8(1).writeUint16BE(2);
    expect(pb.length()).toBe(3);
  });

  it("toHex produces hex string", () => {
    const hex = new PacketBuilder().writeUint8(0xDE).writeUint8(0xAD).toHex();
    expect(hex).toBe("dead");
  });

  it("fromHex parses hex string", () => {
    expect(PacketBuilder.fromHex("deadbeef")).toEqual([0xDE, 0xAD, 0xBE, 0xEF]);
  });

  it("readUint16BE reads correctly", () => {
    expect(PacketBuilder.readUint16BE([0, 1, 2], 0)).toBe(1);
    expect(PacketBuilder.readUint16BE([0, 1, 2], 1)).toBe(258);
  });

  it("reset clears the buffer", () => {
    const pb = new PacketBuilder().writeUint8(1).writeUint8(2);
    pb.reset();
    expect(pb.length()).toBe(0);
  });
});
