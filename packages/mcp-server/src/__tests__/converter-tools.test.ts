import { describe, expect, it } from "vitest";

import {
  markdownToHtml,
  htmlToMarkdown,
  jsonToYaml,
  yamlToJson,
  jsonToXml,
  xmlToJson,
  jsonToToml,
  tomlToJson,
  csvToJson,
  jsonToCsv,
  jsonFormat,
  jsonToJsonl,
  jsonlToJson,
} from "../converter-tools.js";

describe("markdownToHtml", () => {
  it("converts heading", () => {
    const result = markdownToHtml("# Hello");
    expect(result.html).toContain("<h1>");
    expect(result.html).toContain("Hello");
  });

  it("converts bold text", () => {
    const result = markdownToHtml("**bold**");
    expect(result.html).toContain("<strong>bold</strong>");
  });

  it("converts links", () => {
    const result = markdownToHtml("[click](https://example.com)");
    expect(result.html).toContain('href="https://example.com"');
  });
});

describe("htmlToMarkdown", () => {
  it("converts heading", () => {
    const result = htmlToMarkdown("<h1>Hello</h1>");
    expect(result.markdown).toContain("# Hello");
  });

  it("converts bold", () => {
    const result = htmlToMarkdown("<strong>bold</strong>");
    expect(result.markdown).toContain("**bold**");
  });
});

describe("jsonToYaml + yamlToJson roundtrip", () => {
  it("converts simple object", () => {
    const json = '{"name":"Alice","age":30}';
    const yamlResult = jsonToYaml(json);
    expect(yamlResult.yaml).toContain("name: Alice");
    expect(yamlResult.yaml).toContain("age: 30");
  });

  it("roundtrips through yaml and back", () => {
    const original = '{"key":"value","num":42}';
    const yamlStr = jsonToYaml(original).yaml;
    const backToJson = yamlToJson(yamlStr);
    expect(JSON.parse(backToJson.json)).toEqual(JSON.parse(original));
  });

  it("supports custom indent", () => {
    const result = jsonToYaml('{"a":1}', 4);
    expect(result.yaml).toBeTruthy();
  });

  it("throws on invalid JSON", () => {
    expect(() => jsonToYaml("not json")).toThrow();
  });
});

describe("jsonToXml + xmlToJson", () => {
  it("converts simple object to xml", () => {
    const result = jsonToXml('{"name":"Alice"}');
    expect(result.xml).toContain("name");
    expect(result.xml).toContain("Alice");
  });

  it("wraps arrays with a root key", () => {
    const result = jsonToXml("[1,2,3]", "items");
    expect(result.xml).toContain("items");
  });

  it("parses xml back to json", () => {
    const result = xmlToJson("<root><name>Bob</name></root>");
    const parsed = JSON.parse(result.json);
    expect(parsed.root.name).toBe("Bob");
  });
});

describe("jsonToToml + tomlToJson", () => {
  it("converts object to toml", () => {
    const result = jsonToToml('{"title":"TOML Test","owner":"me"}');
    expect(result.toml).toContain("title");
    expect(result.toml).toContain("TOML Test");
  });

  it("roundtrips through toml and back", () => {
    const original = '{"key":"value","count":5}';
    const tomlStr = jsonToToml(original).toml;
    const backToJson = tomlToJson(tomlStr);
    expect(JSON.parse(backToJson.json)).toEqual(JSON.parse(original));
  });

  it("throws for non-object input", () => {
    expect(() => jsonToToml("[1,2,3]")).toThrow("top-level object");
    expect(() => jsonToToml('"string"')).toThrow("top-level object");
  });
});

describe("csvToJson + jsonToCsv", () => {
  it("converts csv with headers to json", () => {
    const csv = "name,age\nAlice,30\nBob,25";
    const result = csvToJson(csv);
    const parsed = JSON.parse(result.json);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].name).toBe("Alice");
    expect(result.rows).toBe(2);
    expect(result.columns).toBe(2);
  });

  it("converts json array to csv", () => {
    const json = '[{"name":"Alice","age":30},{"name":"Bob","age":25}]';
    const result = jsonToCsv(json);
    expect(result.csv).toContain("name");
    expect(result.csv).toContain("Alice");
    expect(result.rows).toBe(2);
  });

  it("throws for non-array json input", () => {
    expect(() => jsonToCsv('{"key":"value"}')).toThrow("JSON array");
  });

  it("supports custom delimiter", () => {
    const csv = "name;age\nAlice;30";
    const result = csvToJson(csv, { delimiter: ";" });
    const parsed = JSON.parse(result.json);
    expect(parsed[0].name).toBe("Alice");
  });
});

describe("jsonFormat", () => {
  it("pretty-prints with default indent", () => {
    const result = jsonFormat('{"a":1,"b":2}');
    expect(result.json).toContain("\n");
    expect(result.json).toContain("  ");
  });

  it("minifies when indent is 'minify'", () => {
    const result = jsonFormat('{"a": 1, "b": 2}', "minify");
    expect(result.json).toBe('{"a":1,"b":2}');
  });

  it("uses tab indent", () => {
    const result = jsonFormat('{"a":1}', "tab");
    expect(result.json).toContain("\t");
  });

  it("throws on invalid json", () => {
    expect(() => jsonFormat("not json")).toThrow();
  });
});

describe("jsonToJsonl + jsonlToJson", () => {
  it("converts json array to jsonl", () => {
    const result = jsonToJsonl('[{"a":1},{"b":2}]');
    expect(result.lines).toBe(2);
    const lines = result.jsonl.split("\n");
    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0])).toEqual({ a: 1 });
  });

  it("throws for non-array input", () => {
    expect(() => jsonToJsonl('{"a":1}')).toThrow("JSON array");
  });

  it("converts jsonl back to json array", () => {
    const jsonl = '{"a":1}\n{"b":2}';
    const result = jsonlToJson(jsonl);
    expect(result.lines).toBe(2);
    const parsed = JSON.parse(result.json);
    expect(parsed).toHaveLength(2);
    expect(parsed[1]).toEqual({ b: 2 });
  });

  it("roundtrips through jsonl and back", () => {
    const original = '[{"x":1},{"y":"hello"}]';
    const jsonl = jsonToJsonl(original).jsonl;
    const backToJson = jsonlToJson(jsonl);
    expect(JSON.parse(backToJson.json)).toEqual(JSON.parse(original));
  });

  it("skips empty lines in jsonl input", () => {
    const jsonl = '{"a":1}\n\n{"b":2}\n';
    const result = jsonlToJson(jsonl);
    expect(result.lines).toBe(2);
  });
});
