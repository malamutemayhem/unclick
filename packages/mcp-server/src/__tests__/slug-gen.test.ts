import { describe, it, expect } from "vitest";
import { SlugGenerator } from "../slug-gen.js";

describe("SlugGenerator", () => {
  it("slugifies text", () => {
    expect(SlugGenerator.slugify("Hello World")).toBe("hello-world");
    expect(SlugGenerator.slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
  });

  it("removes special characters", () => {
    expect(SlugGenerator.slugify("Hello & World!")).toBe("hello-world");
  });

  it("supports custom separator", () => {
    expect(SlugGenerator.slugify("Hello World", "_")).toBe("hello_world");
  });

  it("generates unique slugs", () => {
    const existing = ["hello-world", "hello-world-2"];
    expect(SlugGenerator.unique("Hello World", existing)).toBe("hello-world-3");
  });

  it("returns base slug when unique", () => {
    expect(SlugGenerator.unique("Hello World", [])).toBe("hello-world");
  });

  it("converts file path to slug", () => {
    expect(SlugGenerator.fromPath("/path/to/My File.txt")).toBe("my-file");
  });

  it("converts slug to title", () => {
    expect(SlugGenerator.toTitle("hello-world")).toBe("Hello World");
  });

  it("converts to camelCase", () => {
    expect(SlugGenerator.toCamelCase("hello-world")).toBe("helloWorld");
  });

  it("converts to PascalCase", () => {
    expect(SlugGenerator.toPascalCase("hello-world")).toBe("HelloWorld");
  });

  it("converts to snake_case", () => {
    expect(SlugGenerator.toSnakeCase("hello-world")).toBe("hello_world");
  });

  it("converts to kebab-case", () => {
    expect(SlugGenerator.toKebabCase("helloWorld")).toBe("hello-world");
    expect(SlugGenerator.toKebabCase("Hello_World")).toBe("hello-world");
  });

  it("validates slugs", () => {
    expect(SlugGenerator.isValidSlug("hello-world")).toBe(true);
    expect(SlugGenerator.isValidSlug("Hello World")).toBe(false);
    expect(SlugGenerator.isValidSlug("hello--world")).toBe(false);
  });

  it("truncates long slugs", () => {
    const slug = SlugGenerator.truncate("this is a very long title for a slug", 20);
    expect(slug.length).toBeLessThanOrEqual(20);
  });
});
