import { describe, it, expect } from "vitest";
import { parseToolCall, parseMultipleToolCalls, formatToolResult, validateToolCall } from "../tool-call-parser.js";

describe("parseToolCall", () => {
  it("parses JSON format", () => {
    const text = '{"name": "search", "arguments": {"query": "hello"}}';
    const result = parseToolCall(text);
    expect(result).toEqual({ name: "search", arguments: { query: "hello" }, id: undefined });
  });

  it("parses XML format", () => {
    const text = '<tool_call><name>search</name><arguments>{"query": "hello"}</arguments></tool_call>';
    const result = parseToolCall(text);
    expect(result).toEqual({ name: "search", arguments: { query: "hello" } });
  });

  it("returns null for no match", () => {
    expect(parseToolCall("just plain text")).toBeNull();
  });
});

describe("parseMultipleToolCalls", () => {
  it("finds multiple JSON calls", () => {
    const text = 'First: {"name": "a", "arguments": {"x": 1}} then {"name": "b", "arguments": {"y": 2}}';
    const results = parseMultipleToolCalls(text);
    expect(results.length).toBe(2);
    expect(results[0].name).toBe("a");
    expect(results[1].name).toBe("b");
  });
});

describe("formatToolResult", () => {
  it("formats result JSON", () => {
    const result = formatToolResult("call_1", { data: "hello" });
    const parsed = JSON.parse(result);
    expect(parsed.tool_call_id).toBe("call_1");
    expect(parsed.output.data).toBe("hello");
  });
});

describe("validateToolCall", () => {
  it("returns empty for valid call", () => {
    const errors = validateToolCall(
      { name: "test", arguments: { q: "hello", n: 5 } },
      { q: { type: "string", required: true }, n: { type: "number" } }
    );
    expect(errors).toEqual([]);
  });

  it("reports missing required params", () => {
    const errors = validateToolCall(
      { name: "test", arguments: {} },
      { q: { type: "string", required: true } }
    );
    expect(errors).toContain("Missing required parameter: q");
  });

  it("reports type mismatches", () => {
    const errors = validateToolCall(
      { name: "test", arguments: { q: 123 } },
      { q: { type: "string" } }
    );
    expect(errors).toContain("q must be a string");
  });
});
