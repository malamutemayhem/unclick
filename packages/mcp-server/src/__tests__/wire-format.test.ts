import { describe, it, expect } from "vitest";
import { encodeVarInt, decodeVarInt, encodeLength, decodeLength, packFields, unpackFields, cobs, uncobs } from "../wire-format.js";

describe("varint", () => {
  it("encodes small values in one byte", () => {
    expect(encodeVarInt(0)).toEqual([0]);
    expect(encodeVarInt(127)).toEqual([127]);
  });

  it("encodes larger values in multiple bytes", () => {
    const encoded = encodeVarInt(300);
    expect(encoded.length).toBeGreaterThan(1);
  });

  it("roundtrips", () => {
    for (const val of [0, 1, 127, 128, 300, 65535, 1000000]) {
      const encoded = encodeVarInt(val);
      const decoded = decodeVarInt(encoded);
      expect(decoded.value).toBe(val);
      expect(decoded.bytesRead).toBe(encoded.length);
    }
  });
});

describe("length-prefixed", () => {
  it("encodes and decodes", () => {
    const encoded = encodeLength(5, "hello");
    expect(encoded).toBe("5:hello");
    const decoded = decodeLength(encoded);
    expect(decoded.data).toBe("hello");
    expect(decoded.length).toBe(5);
  });
});

describe("packFields", () => {
  it("packs and unpacks", () => {
    const fields = [{ tag: 1, value: "hello" }, { tag: 2, value: "world" }];
    const packed = packFields(fields);
    const unpacked = unpackFields(packed);
    expect(unpacked).toEqual(fields);
  });

  it("handles empty", () => {
    expect(unpackFields("")).toEqual([]);
  });
});

describe("COBS", () => {
  it("encodes and decodes without zeros", () => {
    const data = [1, 2, 3, 4, 5];
    const encoded = cobs(data);
    expect(encoded).not.toContain(0);
    const decoded = uncobs(encoded);
    expect(decoded).toEqual(data);
  });

  it("encodes and decodes with zeros", () => {
    const data = [1, 0, 2, 0, 3];
    const encoded = cobs(data);
    const decoded = uncobs(encoded);
    expect(decoded).toEqual(data);
  });

  it("handles empty data", () => {
    const data: number[] = [];
    const encoded = cobs(data);
    const decoded = uncobs(encoded);
    expect(decoded).toEqual(data);
  });
});
