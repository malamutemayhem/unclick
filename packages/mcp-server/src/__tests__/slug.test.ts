import { describe, it, expect } from "vitest";
import { slugify, deslugify, camelCase, pascalCase, snakeCase, kebabCase, titleCase, constantCase } from "../slug.js";

describe("slugify", () => {
  it("lowercases and replaces spaces", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("trims separators", () => {
    expect(slugify("  Hello  ")).toBe("hello");
  });

  it("custom separator", () => {
    expect(slugify("Hello World", "_")).toBe("hello_world");
  });

  it("handles accents", () => {
    expect(slugify("cafe")).toBe("cafe");
  });
});

describe("deslugify", () => {
  it("converts slug to title words", () => {
    expect(deslugify("hello-world")).toBe("Hello World");
  });
});

describe("camelCase", () => {
  it("converts to camelCase", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
  });

  it("handles already-separated", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
  });
});

describe("pascalCase", () => {
  it("converts to PascalCase", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
  });
});

describe("snakeCase", () => {
  it("converts to snake_case", () => {
    expect(snakeCase("Hello World")).toBe("hello_world");
  });
});

describe("kebabCase", () => {
  it("converts to kebab-case", () => {
    expect(kebabCase("Hello World")).toBe("hello-world");
  });
});

describe("titleCase", () => {
  it("converts to Title Case", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });
});

describe("constantCase", () => {
  it("converts to CONSTANT_CASE", () => {
    expect(constantCase("Hello World")).toBe("HELLO_WORLD");
  });
});
