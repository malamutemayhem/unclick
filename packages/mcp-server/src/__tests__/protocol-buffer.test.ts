import { describe, it, expect } from "vitest";
import { ProtoWriter, ProtoReader, fieldToString, fieldToFloat } from "../protocol-buffer.js";

describe("ProtoWriter / ProtoReader", () => {
  it("roundtrips int32", () => {
    const writer = new ProtoWriter();
    writer.writeInt32(1, 42);
    const reader = new ProtoReader(writer.finish());
    const field = reader.readField()!;
    expect(field.fieldNumber).toBe(1);
    expect(field.value).toBe(42);
  });

  it("roundtrips string", () => {
    const writer = new ProtoWriter();
    writer.writeString(2, "hello world");
    const reader = new ProtoReader(writer.finish());
    const field = reader.readField()!;
    expect(field.fieldNumber).toBe(2);
    expect(fieldToString(field)).toBe("hello world");
  });

  it("roundtrips bool", () => {
    const writer = new ProtoWriter();
    writer.writeBool(3, true);
    writer.writeBool(4, false);
    const reader = new ProtoReader(writer.finish());
    const f1 = reader.readField()!;
    const f2 = reader.readField()!;
    expect(f1.value).toBe(1);
    expect(f2.value).toBe(0);
  });

  it("roundtrips float", () => {
    const writer = new ProtoWriter();
    writer.writeFloat(5, 3.14);
    const reader = new ProtoReader(writer.finish());
    const field = reader.readField()!;
    expect(fieldToFloat(field)).toBeCloseTo(3.14, 2);
  });

  it("roundtrips double", () => {
    const writer = new ProtoWriter();
    writer.writeDouble(6, Math.PI);
    const reader = new ProtoReader(writer.finish());
    const field = reader.readField()!;
    expect(fieldToFloat(field)).toBeCloseTo(Math.PI);
  });

  it("roundtrips multiple fields", () => {
    const writer = new ProtoWriter();
    writer.writeInt32(1, 100);
    writer.writeString(2, "name");
    writer.writeBool(3, true);
    const reader = new ProtoReader(writer.finish());
    const fields = reader.readAllFields();
    expect(fields).toHaveLength(3);
    expect(fields[0].fieldNumber).toBe(1);
    expect(fields[1].fieldNumber).toBe(2);
    expect(fields[2].fieldNumber).toBe(3);
  });

  it("roundtrips embedded message", () => {
    const inner = new ProtoWriter();
    inner.writeInt32(1, 99);
    const outer = new ProtoWriter();
    outer.writeEmbedded(1, inner);
    const reader = new ProtoReader(outer.finish());
    const field = reader.readField()!;
    expect(field.wireType).toBe(2);
    const innerReader = new ProtoReader(field.value as Uint8Array);
    const innerField = innerReader.readField()!;
    expect(innerField.value).toBe(99);
  });

  it("tracks remaining bytes", () => {
    const writer = new ProtoWriter();
    writer.writeInt32(1, 1);
    const reader = new ProtoReader(writer.finish());
    expect(reader.remaining).toBeGreaterThan(0);
    reader.readField();
    expect(reader.remaining).toBe(0);
  });
});
