import { describe, it, expect } from "vitest";
import { formatAsJson, formatAsMarkdownTable, formatAsCsv, formatAsXml, formatAsList, formatAsKeyValue, autoFormat } from "../response-formatter.js";

describe("formatAsJson", () => {
  it("pretty prints", () => {
    const r = formatAsJson({ a: 1 });
    expect(r).toContain("  ");
    expect(JSON.parse(r)).toEqual({ a: 1 });
  });

  it("compact format", () => {
    const r = formatAsJson({ a: 1 }, false);
    expect(r).toBe('{"a":1}');
  });
});

describe("formatAsMarkdownTable", () => {
  it("creates table", () => {
    const r = formatAsMarkdownTable(["Name", "Age"], [["Alice", "30"], ["Bob", "25"]]);
    expect(r).toContain("| Name | Age |");
    expect(r).toContain("| Alice | 30 |");
  });
});

describe("formatAsCsv", () => {
  it("creates CSV", () => {
    const r = formatAsCsv(["name", "city"], [["Alice", "Sydney"]]);
    expect(r).toBe("name,city\nAlice,Sydney");
  });

  it("escapes commas", () => {
    const r = formatAsCsv(["val"], [["a,b"]]);
    expect(r).toContain('"a,b"');
  });
});

describe("formatAsXml", () => {
  it("creates XML", () => {
    const r = formatAsXml("person", { name: "Alice", age: 30 });
    expect(r).toContain("<person>");
    expect(r).toContain("<name>Alice</name>");
  });

  it("escapes special chars", () => {
    const r = formatAsXml("data", { text: "a < b & c" });
    expect(r).toContain("&lt;");
    expect(r).toContain("&amp;");
  });
});

describe("formatAsList", () => {
  it("creates unordered list", () => {
    const r = formatAsList(["a", "b"]);
    expect(r).toBe("- a\n- b");
  });

  it("creates ordered list", () => {
    const r = formatAsList(["a", "b"], true);
    expect(r).toBe("1. a\n2. b");
  });
});

describe("formatAsKeyValue", () => {
  it("creates key-value pairs", () => {
    const r = formatAsKeyValue({ name: "Alice", age: 30 });
    expect(r).toContain("name: Alice");
    expect(r).toContain("age: 30");
  });
});

describe("autoFormat", () => {
  it("formats as JSON", () => {
    const r = autoFormat({ x: 1 }, "json");
    expect(JSON.parse(r)).toEqual({ x: 1 });
  });

  it("formats array as markdown list", () => {
    const r = autoFormat(["a", "b"], "markdown");
    expect(r).toContain("- a");
  });

  it("formats array of objects as CSV", () => {
    const r = autoFormat([{ name: "Alice" }], "csv");
    expect(r).toContain("name");
    expect(r).toContain("Alice");
  });
});
