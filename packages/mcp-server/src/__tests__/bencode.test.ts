import { describe, it, expect } from "vitest";
import { encode, decode } from "../bencode.js";

describe("bencode", () => {
  it("encodes integer", () => {
    expect(encode(42)).toBe("i42e");
  });

  it("encodes string", () => {
    expect(encode("spam")).toBe("4:spam");
  });

  it("encodes list", () => {
    expect(encode(["spam", 42])).toBe("l4:spami42ee");
  });

  it("encodes dict", () => {
    const dict = new Map([["cow", "moo"], ["spam", "eggs"]]);
    expect(encode(dict)).toBe("d3:cow3:moo4:spam4:eggse");
  });

  it("decodes integer", () => {
    expect(decode("i42e")).toBe(42);
  });

  it("decodes string", () => {
    expect(decode("4:spam")).toBe("spam");
  });

  it("decodes list", () => {
    const result = decode("l4:spami42ee");
    expect(result).toEqual(["spam", 42]);
  });

  it("decodes dict", () => {
    const result = decode("d3:cow3:moo4:spam4:eggse") as Map<string, any>;
    expect(result.get("cow")).toBe("moo");
    expect(result.get("spam")).toBe("eggs");
  });

  it("encode/decode roundtrip", () => {
    const original: any = ["test", 123, new Map([["key", "value"]])];
    const encoded = encode(original);
    const decoded = decode(encoded);
    expect(decoded).toEqual(original);
  });

  it("nested structures", () => {
    const nested: any = new Map([["list", [1, 2, 3]]]);
    const encoded = encode(nested);
    const decoded = decode(encoded) as Map<string, any>;
    expect(decoded.get("list")).toEqual([1, 2, 3]);
  });
});
