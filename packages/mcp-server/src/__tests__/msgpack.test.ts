import { describe, it, expect } from "vitest";
import { encode, decode } from "../msgpack.js";

describe("msgpack roundtrip", () => {
  it("encodes/decodes null", () => {
    expect(decode(encode(null))).toBeNull();
  });

  it("encodes/decodes booleans", () => {
    expect(decode(encode(true))).toBe(true);
    expect(decode(encode(false))).toBe(false);
  });

  it("encodes/decodes small positive int", () => {
    expect(decode(encode(42))).toBe(42);
  });

  it("encodes/decodes negative int", () => {
    expect(decode(encode(-10))).toBe(-10);
  });

  it("encodes/decodes uint8", () => {
    expect(decode(encode(200))).toBe(200);
  });

  it("encodes/decodes uint16", () => {
    expect(decode(encode(1000))).toBe(1000);
  });

  it("encodes/decodes float64", () => {
    const result = decode(encode(3.14));
    expect(result).toBeCloseTo(3.14);
  });

  it("encodes/decodes strings", () => {
    expect(decode(encode("hello"))).toBe("hello");
  });

  it("encodes/decodes arrays", () => {
    expect(decode(encode([1, "two", true]))).toEqual([1, "two", true]);
  });

  it("encodes/decodes objects", () => {
    const obj = { name: "test", value: 42 };
    expect(decode(encode(obj))).toEqual(obj);
  });

  it("encodes/decodes nested structures", () => {
    const data = { items: [1, 2, 3], meta: { ok: true } };
    expect(decode(encode(data))).toEqual(data);
  });

  it("encodes/decodes empty array", () => {
    expect(decode(encode([]))).toEqual([]);
  });

  it("encodes/decodes empty object", () => {
    expect(decode(encode({}))).toEqual({});
  });
});
