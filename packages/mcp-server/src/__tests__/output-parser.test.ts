import { describe, it, expect } from "vitest";
import { parseJson, parseList, parseKeyValue, parseBoolean, parseNumber, extractBetween, parseCodeBlock } from "../output-parser.js";

describe("parseJson", () => {
  it("parses JSON from code block", () => {
    const text = 'Here is the result:\n```json\n{"name":"Alice","age":30}\n```';
    const r = parseJson(text);
    expect(r.success).toBe(true);
    expect(r.value).toEqual({ name: "Alice", age: 30 });
  });

  it("parses inline JSON", () => {
    const r = parseJson('The answer is {"x": 1}');
    expect(r.success).toBe(true);
    expect(r.value).toEqual({ x: 1 });
  });

  it("fails on no JSON", () => {
    expect(parseJson("no json here").success).toBe(false);
  });
});

describe("parseList", () => {
  it("parses bullet list", () => {
    const text = "- apples\n- bananas\n- cherries";
    const r = parseList(text);
    expect(r.success).toBe(true);
    expect(r.value).toEqual(["apples", "bananas", "cherries"]);
  });

  it("parses numbered list", () => {
    const text = "1. first\n2. second\n3. third";
    const r = parseList(text);
    expect(r.success).toBe(true);
    expect(r.value).toEqual(["first", "second", "third"]);
  });

  it("fails on empty", () => {
    expect(parseList("").success).toBe(false);
  });
});

describe("parseKeyValue", () => {
  it("parses colon-separated pairs", () => {
    const text = "Name: Alice\nAge: 30\nCity: Sydney";
    const r = parseKeyValue(text);
    expect(r.success).toBe(true);
    expect(r.value).toEqual({ Name: "Alice", Age: "30", City: "Sydney" });
  });

  it("handles equals separator", () => {
    const r = parseKeyValue("key = value");
    expect(r.success).toBe(true);
    expect(r.value).toEqual({ key: "value" });
  });
});

describe("parseBoolean", () => {
  it("parses yes/true", () => {
    expect(parseBoolean("Yes, that is correct").value).toBe(true);
    expect(parseBoolean("true").value).toBe(true);
  });

  it("parses no/false", () => {
    expect(parseBoolean("No, not at all").value).toBe(false);
    expect(parseBoolean("false").value).toBe(false);
  });

  it("fails on ambiguous", () => {
    expect(parseBoolean("maybe").success).toBe(false);
  });
});

describe("parseNumber", () => {
  it("extracts number from text", () => {
    expect(parseNumber("The answer is 42").value).toBe(42);
    expect(parseNumber("Price: $3.50").value).toBe(3.50);
  });

  it("handles negative", () => {
    expect(parseNumber("Temperature: -5 degrees").value).toBe(-5);
  });

  it("fails with no number", () => {
    expect(parseNumber("no numbers here").success).toBe(false);
  });
});

describe("extractBetween", () => {
  it("extracts text between markers", () => {
    const r = extractBetween("Start [ANSWER]hello world[/ANSWER] End", "[ANSWER]", "[/ANSWER]");
    expect(r.success).toBe(true);
    expect(r.value).toBe("hello world");
  });

  it("fails when markers missing", () => {
    expect(extractBetween("no markers", "[A]", "[B]").success).toBe(false);
  });
});

describe("parseCodeBlock", () => {
  it("extracts code block", () => {
    const text = "Here:\n```python\nprint('hello')\n```";
    const r = parseCodeBlock(text, "python");
    expect(r.success).toBe(true);
    expect(r.value).toBe("print('hello')");
  });

  it("extracts any code block without language", () => {
    const text = "```\ncode here\n```";
    const r = parseCodeBlock(text);
    expect(r.success).toBe(true);
    expect(r.value).toBe("code here");
  });

  it("fails without code block", () => {
    expect(parseCodeBlock("no code block").success).toBe(false);
  });
});
