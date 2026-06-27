import { describe, it, expect } from "vitest";
import {
  repairToolArgs,
  extractPlainTextToolCalls,
  stripToolCallBlocks,
} from "../tool-call-repair.js";

describe("repairToolArgs", () => {
  it("parses valid JSON without repair", () => {
    const result = repairToolArgs('{"name": "test", "value": 42}');
    expect(result.repaired).toBe(false);
    expect(result.args).toEqual({ name: "test", value: 42 });
  });

  it("returns empty args for empty input", () => {
    expect(repairToolArgs("").args).toEqual({});
    expect(repairToolArgs("{}").args).toEqual({});
  });

  it("strips trailing commas", () => {
    const result = repairToolArgs('{"name": "test", "value": 42,}');
    expect(result.repaired).toBe(true);
    expect(result.args).toEqual({ name: "test", value: 42 });
    expect(result.warning).toContain("trailing commas");
  });

  it("quotes unquoted keys", () => {
    const result = repairToolArgs('{name: "test", value: 42}');
    expect(result.repaired).toBe(true);
    expect(result.args).toEqual({ name: "test", value: 42 });
    expect(result.warning).toContain("bare keys");
  });

  it("closes truncated JSON", () => {
    const result = repairToolArgs('{"name": "test", "nested": {"a": 1}');
    expect(result.repaired).toBe(true);
    expect(result.args.name).toBe("test");
    expect(result.warning).toContain("truncated");
  });

  it("applies multiple repairs in sequence", () => {
    const result = repairToolArgs('{name: "test", value: 42,');
    expect(result.repaired).toBe(true);
    expect(result.args).toEqual({ name: "test", value: 42 });
  });

  it("returns warning for unparseable input", () => {
    const result = repairToolArgs("not json at all");
    expect(result.warning).toContain("could not be parsed");
  });

  it("handles nested objects with trailing commas", () => {
    const result = repairToolArgs('{"a": {"b": 1,}, "c": [1, 2,]}');
    expect(result.repaired).toBe(true);
    expect(result.args).toEqual({ a: { b: 1 }, c: [1, 2] });
  });

  it("rejects arrays (not a valid tool args shape)", () => {
    const result = repairToolArgs("[1, 2, 3]");
    expect(result.warning).toContain("could not be parsed");
  });
});

describe("extractPlainTextToolCalls", () => {
  it("extracts tool calls from code blocks", () => {
    const text = `Here's what I'll do:

\`\`\`json
{"name": "search_memory", "arguments": {"query": "project status"}}
\`\`\`

Let me run that for you.`;

    const calls = extractPlainTextToolCalls(text);
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("search_memory");
    expect(calls[0].args).toEqual({ query: "project status" });
  });

  it("extracts from tool_call-labeled blocks", () => {
    const text = `\`\`\`tool_call
{"name": "save_fact", "arguments": {"fact": "user prefers dark mode"}}
\`\`\``;

    const calls = extractPlainTextToolCalls(text);
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("save_fact");
  });

  it("returns empty array for no tool calls", () => {
    expect(extractPlainTextToolCalls("Just regular text")).toEqual([]);
  });

  it("handles multiple tool calls", () => {
    const text = `\`\`\`json
{"name": "tool_a", "args": {"x": 1}}
\`\`\`
some text
\`\`\`json
{"name": "tool_b", "args": {"y": 2}}
\`\`\``;

    const calls = extractPlainTextToolCalls(text);
    expect(calls).toHaveLength(2);
  });
});

describe("stripToolCallBlocks", () => {
  it("removes tool call blocks from text", () => {
    const text = `Before
\`\`\`json
{"name": "tool", "arguments": {}}
\`\`\`
After`;

    const stripped = stripToolCallBlocks(text);
    expect(stripped).toContain("Before");
    expect(stripped).toContain("After");
    expect(stripped).not.toContain("tool");
  });
});
