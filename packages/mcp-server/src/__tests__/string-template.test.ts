import { describe, it, expect } from "vitest";
import { template, tagged, dedent, indent, oneLine, commaList, pluralize } from "../string-template.js";

describe("template", () => {
  it("substitutes variables", () => {
    expect(template("Hello ${name}!", { name: "World" })).toBe("Hello World!");
  });

  it("nested dot paths", () => {
    expect(template("${user.name}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("missing vars become empty string", () => {
    expect(template("${missing}", {})).toBe("");
  });
});

describe("tagged", () => {
  it("creates reusable template function", () => {
    const greet = tagged`Hello ${"name"}!`;
    expect(greet({ name: "World" })).toBe("Hello World!");
    expect(greet({ name: "Alice" })).toBe("Hello Alice!");
  });
});

describe("dedent", () => {
  it("removes common leading whitespace", () => {
    const result = dedent(`
      hello
      world
    `);
    expect(result).toBe("hello\nworld");
  });

  it("handles mixed indentation", () => {
    const result = dedent(`
      a
        b
      c
    `);
    expect(result).toBe("a\n  b\nc");
  });
});

describe("indent", () => {
  it("adds spaces to each line", () => {
    expect(indent("a\nb", 4)).toBe("    a\n    b");
  });
});

describe("oneLine", () => {
  it("collapses multiline to single", () => {
    expect(oneLine(`
      hello
      world
    `)).toBe("hello world");
  });
});

describe("commaList", () => {
  it("no items", () => expect(commaList([])).toBe(""));
  it("one item", () => expect(commaList(["a"])).toBe("a"));
  it("two items", () => expect(commaList(["a", "b"])).toBe("a and b"));
  it("three items", () => expect(commaList(["a", "b", "c"])).toBe("a, b, and c"));
  it("custom conjunction", () => expect(commaList(["a", "b"], "or")).toBe("a or b"));
});

describe("pluralize", () => {
  it("singular", () => expect(pluralize(1, "item")).toBe("1 item"));
  it("plural", () => expect(pluralize(3, "item")).toBe("3 items"));
  it("custom plural", () => expect(pluralize(2, "child", "children")).toBe("2 children"));
});
