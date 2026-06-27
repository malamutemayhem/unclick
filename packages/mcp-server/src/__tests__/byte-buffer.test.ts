import { describe, it, expect } from "vitest";
import { ByteBuffer } from "../byte-buffer.js";

describe("ByteBuffer", () => {
  it("writes and reads uint8", () => {
    const buf = new ByteBuffer(16);
    buf.writeUint8(42);
    buf.seek(0);
    expect(buf.readUint8()).toBe(42);
  });

  it("writes and reads uint16", () => {
    const buf = new ByteBuffer(16);
    buf.writeUint16(1000);
    buf.seek(0);
    expect(buf.readUint16()).toBe(1000);
  });

  it("writes and reads uint32", () => {
    const buf = new ByteBuffer(16);
    buf.writeUint32(100000);
    buf.seek(0);
    expect(buf.readUint32()).toBe(100000);
  });

  it("writes and reads float32", () => {
    const buf = new ByteBuffer(16);
    buf.writeFloat32(3.14);
    buf.seek(0);
    expect(buf.readFloat32()).toBeCloseTo(3.14, 2);
  });

  it("writes and reads float64", () => {
    const buf = new ByteBuffer(16);
    buf.writeFloat64(Math.PI);
    buf.seek(0);
    expect(buf.readFloat64()).toBeCloseTo(Math.PI);
  });

  it("writes and reads string", () => {
    const buf = new ByteBuffer(64);
    buf.writeString("hello world");
    buf.seek(0);
    expect(buf.readString()).toBe("hello world");
  });

  it("writes and reads bytes", () => {
    const buf = new ByteBuffer(16);
    const data = new Uint8Array([1, 2, 3, 4]);
    buf.writeBytes(data);
    buf.seek(0);
    expect(buf.readBytes(4)).toEqual(data);
  });

  it("tracks size and offset", () => {
    const buf = new ByteBuffer(16);
    expect(buf.size).toBe(0);
    buf.writeUint8(1);
    buf.writeUint8(2);
    expect(buf.size).toBe(2);
    expect(buf.offset).toBe(2);
  });

  it("grows automatically", () => {
    const buf = new ByteBuffer(4);
    for (let i = 0; i < 100; i++) buf.writeUint8(i);
    expect(buf.size).toBe(100);
    expect(buf.capacity).toBeGreaterThanOrEqual(100);
  });

  it("toUint8Array returns data", () => {
    const buf = new ByteBuffer(16);
    buf.writeUint8(0xDE);
    buf.writeUint8(0xAD);
    const arr = buf.toUint8Array();
    expect(arr).toHaveLength(2);
    expect(arr[0]).toBe(0xDE);
  });

  it("remaining tracks unread bytes", () => {
    const buf = new ByteBuffer(16);
    buf.writeUint8(1);
    buf.writeUint8(2);
    buf.writeUint8(3);
    buf.seek(0);
    expect(buf.remaining).toBe(3);
    buf.readUint8();
    expect(buf.remaining).toBe(2);
  });

  it("creates from Uint8Array", () => {
    const data = new Uint8Array([10, 20, 30]);
    const buf = ByteBuffer.from(data);
    expect(buf.readUint8()).toBe(10);
    expect(buf.readUint8()).toBe(20);
  });
});
