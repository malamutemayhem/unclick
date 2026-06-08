import { describe, it, expect } from "vitest";
import { ProtocolParser } from "../protocol-parser.js";

describe("ProtocolParser", () => {
  const fields = [
    { name: "version", type: "uint8" as const },
    { name: "type", type: "uint16" as const },
    { name: "payload", type: "string" as const, length: 5 },
  ];

  it("encode produces correct bytes", () => {
    const bytes = ProtocolParser.encode(fields, { version: 1, type: 256, payload: "hello" });
    expect(bytes[0]).toBe(1);
    expect(bytes[1]).toBe(1);
    expect(bytes[2]).toBe(0);
    expect(bytes.length).toBe(8);
  });

  it("decode recovers values", () => {
    const bytes = ProtocolParser.encode(fields, { version: 2, type: 1024, payload: "test" });
    const result = ProtocolParser.decode(fields, bytes);
    expect(result.version).toBe(2);
    expect(result.type).toBe(1024);
    expect(result.payload).toBe("test");
  });

  it("encode and decode round-trip uint32", () => {
    const f = [{ name: "val", type: "uint32" as const }];
    const bytes = ProtocolParser.encode(f, { val: 305419896 });
    const result = ProtocolParser.decode(f, bytes);
    expect(result.val).toBe(305419896);
  });

  it("signed integers handle negatives", () => {
    const f = [{ name: "val", type: "int16" as const }];
    const bytes = ProtocolParser.encode(f, { val: -100 });
    const result = ProtocolParser.decode(f, bytes);
    expect(result.val).toBe(-100);
  });

  it("bytes field round-trips", () => {
    const f = [{ name: "data", type: "bytes" as const, length: 4 }];
    const bytes = ProtocolParser.encode(f, { data: [0xDE, 0xAD, 0xBE, 0xEF] });
    const result = ProtocolParser.decode(f, bytes);
    expect(result.data).toEqual([0xDE, 0xAD, 0xBE, 0xEF]);
  });

  it("totalSize computes correctly", () => {
    expect(ProtocolParser.totalSize(fields)).toBe(8);
  });

  it("checksum produces complement", () => {
    const data = [1, 2, 3];
    const cs = ProtocolParser.checksum(data);
    expect((1 + 2 + 3 + cs) & 0xFF).toBe(0);
  });

  it("sizeOf returns correct sizes", () => {
    expect(ProtocolParser.sizeOf("uint8")).toBe(1);
    expect(ProtocolParser.sizeOf("uint16")).toBe(2);
    expect(ProtocolParser.sizeOf("uint32")).toBe(4);
    expect(ProtocolParser.sizeOf("string")).toBe(0);
  });
});
