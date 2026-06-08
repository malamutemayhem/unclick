import { describe, it, expect } from "vitest";
import { v4, validate, version, parse, stringify, nil, isNil } from "../uuid.js";

describe("v4", () => {
  it("generates valid UUID", () => {
    const id = v4();
    expect(validate(id)).toBe(true);
  });

  it("generates unique UUIDs", () => {
    const a = v4();
    const b = v4();
    expect(a).not.toBe(b);
  });

  it("has correct version", () => {
    const id = v4();
    expect(version(id)).toBe(4);
  });

  it("has correct format", () => {
    const id = v4();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });
});

describe("validate", () => {
  it("validates correct UUIDs", () => {
    expect(validate("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
  });

  it("rejects invalid UUIDs", () => {
    expect(validate("not-a-uuid")).toBe(false);
    expect(validate("")).toBe(false);
    expect(validate("550e8400-e29b-41d4-a716")).toBe(false);
  });
});

describe("version", () => {
  it("returns version for valid UUID", () => {
    expect(version("550e8400-e29b-41d4-a716-446655440000")).toBe(4);
  });

  it("returns null for invalid UUID", () => {
    expect(version("bad")).toBeNull();
  });
});

describe("parse and stringify", () => {
  it("roundtrips", () => {
    const id = v4();
    const bytes = parse(id);
    expect(bytes).toHaveLength(16);
    expect(stringify(bytes)).toBe(id);
  });

  it("parse throws for invalid UUID", () => {
    expect(() => parse("nope")).toThrow("Invalid UUID");
  });

  it("stringify throws for wrong length", () => {
    expect(() => stringify(new Uint8Array(8))).toThrow("16 bytes");
  });
});

describe("nil", () => {
  it("returns nil UUID", () => {
    expect(nil()).toBe("00000000-0000-0000-0000-000000000000");
  });
});

describe("isNil", () => {
  it("detects nil UUID", () => {
    expect(isNil("00000000-0000-0000-0000-000000000000")).toBe(true);
  });

  it("rejects non-nil UUID", () => {
    expect(isNil(v4())).toBe(false);
  });
});
