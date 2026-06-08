import { describe, it, expect } from "vitest";
import { sql, dedent, oneLine } from "../tagged-template.js";

describe("sql", () => {
  it("parameterizes values", () => {
    const name = "Alice";
    const age = 30;
    const result = sql`SELECT * FROM users WHERE name = ${name} AND age > ${age}`;
    expect(result.text).toBe("SELECT * FROM users WHERE name = $1 AND age > $2");
    expect(result.values).toEqual(["Alice", 30]);
  });

  it("handles no parameters", () => {
    const result = sql`SELECT 1`;
    expect(result.text).toBe("SELECT 1");
    expect(result.values).toEqual([]);
  });
});

describe("dedent", () => {
  it("removes common leading whitespace", () => {
    const result = dedent`
      hello
      world
    `;
    expect(result).toBe("hello\nworld");
  });

  it("preserves relative indentation", () => {
    const result = dedent`
      if (true) {
        doStuff();
      }
    `;
    expect(result).toBe("if (true) {\n  doStuff();\n}");
  });

  it("interpolates values", () => {
    const name = "test";
    const result = dedent`
      hello ${name}
      world
    `;
    expect(result).toBe("hello test\nworld");
  });
});

describe("oneLine", () => {
  it("collapses whitespace into single line", () => {
    const result = oneLine`
      This is a
      multi-line
      string
    `;
    expect(result).toBe("This is a multi-line string");
  });

  it("interpolates values", () => {
    const x = 42;
    expect(oneLine`value is ${x} ok`).toBe("value is 42 ok");
  });
});
