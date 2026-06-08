import { describe, it, expect } from "vitest";
import { parseINI, stringifyINI } from "../ini-parser.js";

describe("parseINI", () => {
  it("parses key-value pairs", () => {
    const result = parseINI("key = value");
    expect(result[""]).toEqual({ key: "value" });
  });

  it("parses sections", () => {
    const result = parseINI("[section]\nkey = value");
    expect(result.section).toEqual({ key: "value" });
  });

  it("parses multiple sections", () => {
    const input = "[a]\nx = 1\n[b]\ny = 2";
    const result = parseINI(input);
    expect(result.a).toEqual({ x: "1" });
    expect(result.b).toEqual({ y: "2" });
  });

  it("ignores comments with semicolons", () => {
    const result = parseINI("; comment\nkey = value");
    expect(result[""]?.key).toBe("value");
  });

  it("ignores comments with hash", () => {
    const result = parseINI("# comment\nkey = value");
    expect(result[""]?.key).toBe("value");
  });

  it("strips quotes from values", () => {
    const result = parseINI('key = "hello world"');
    expect(result[""]?.key).toBe("hello world");
  });

  it("handles single quotes", () => {
    const result = parseINI("key = 'hello'");
    expect(result[""]?.key).toBe("hello");
  });

  it("ignores blank lines", () => {
    const result = parseINI("\n\nkey = value\n\n");
    expect(result[""]?.key).toBe("value");
  });

  it("removes global section if empty", () => {
    const result = parseINI("[section]\nkey = value");
    expect(result[""]).toBeUndefined();
  });
});

describe("stringifyINI", () => {
  it("stringifies a section", () => {
    const result = stringifyINI({ section: { key: "value" } });
    expect(result).toContain("[section]");
    expect(result).toContain("key = value");
  });

  it("stringifies global keys", () => {
    const result = stringifyINI({ "": { global: "yes" }, section: { a: "1" } });
    expect(result).toContain("global = yes");
    expect(result).toContain("[section]");
  });

  it("roundtrips with parseINI", () => {
    const input = { db: { host: "localhost", port: "5432" } };
    const output = parseINI(stringifyINI(input));
    expect(output.db).toEqual(input.db);
  });
});
