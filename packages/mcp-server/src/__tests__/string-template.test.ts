import { describe, it, expect } from "vitest";
import { template, namedTemplate, printf, dedent, indent } from "../string-template.js";

describe("template", () => {
  it("replaces ${var} syntax", () => {
    expect(template("Hello ${name}!", { name: "World" })).toBe("Hello World!");
  });

  it("resolves nested paths", () => {
    expect(template("${user.name}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("returns empty for missing vars", () => {
    expect(template("${missing}", {})).toBe("");
  });
});

describe("namedTemplate", () => {
  it("replaces :name params", () => {
    expect(namedTemplate("/users/:id/posts/:postId", { id: "42", postId: "7" }))
      .toBe("/users/42/posts/7");
  });

  it("keeps unmatched params", () => {
    expect(namedTemplate("/users/:id", {})).toBe("/users/:id");
  });
});

describe("printf", () => {
  it("formats %s as string", () => {
    expect(printf("Hello %s", "World")).toBe("Hello World");
  });

  it("formats %d as number", () => {
    expect(printf("Count: %d", 42)).toBe("Count: 42");
  });

  it("formats %o as JSON", () => {
    expect(printf("Data: %o", { a: 1 })).toBe('Data: {"a":1}');
  });

  it("escapes %%", () => {
    expect(printf("100%%")).toBe("100%");
  });
});

describe("dedent", () => {
  it("removes common indentation", () => {
    const result = dedent(`
      hello
      world
    `);
    expect(result).toBe("hello\nworld");
  });

  it("preserves relative indentation", () => {
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
    expect(indent("a\nb\nc", 4)).toBe("    a\n    b\n    c");
  });
});
