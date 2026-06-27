import { describe, it, expect } from "vitest";
import { slugify, deslugify, camelToSlug, slugToCamel, slugToPascal, toSnakeCase, toKebabCase, isSlug } from "../slug.js";

describe("slug", () => {
  describe("slugify", () => {
    it("converts to lowercase slug", () => { expect(slugify("Hello World")).toBe("hello-world"); });
    it("removes special chars", () => { expect(slugify("Hello! @World#")).toBe("hello-world"); });
    it("collapses spaces", () => { expect(slugify("  a   b  ")).toBe("a-b"); });
    it("custom separator", () => { expect(slugify("hello world", "_")).toBe("hello_world"); });
    it("handles accented chars", () => { expect(slugify("cafe")).toBe("cafe"); });
  });

  describe("deslugify", () => {
    it("capitalizes words", () => { expect(deslugify("hello-world")).toBe("Hello World"); });
    it("custom separator", () => { expect(deslugify("hello_world", "_")).toBe("Hello World"); });
  });

  describe("camelToSlug", () => {
    it("converts camelCase", () => { expect(camelToSlug("helloWorld")).toBe("hello-world"); });
    it("converts PascalCase", () => { expect(camelToSlug("HelloWorld")).toBe("hello-world"); });
    it("handles acronyms", () => { expect(camelToSlug("getHTMLParser")).toBe("get-html-parser"); });
  });

  describe("slugToCamel", () => {
    it("converts to camelCase", () => { expect(slugToCamel("hello-world")).toBe("helloWorld"); });
    it("custom separator", () => { expect(slugToCamel("hello_world", "_")).toBe("helloWorld"); });
  });

  describe("slugToPascal", () => {
    it("converts to PascalCase", () => { expect(slugToPascal("hello-world")).toBe("HelloWorld"); });
  });

  describe("toSnakeCase", () => {
    it("converts to snake_case", () => { expect(toSnakeCase("Hello World")).toBe("hello_world"); });
  });

  describe("toKebabCase", () => {
    it("converts to kebab-case", () => { expect(toKebabCase("Hello World")).toBe("hello-world"); });
  });

  describe("isSlug", () => {
    it("validates slug", () => { expect(isSlug("hello-world")).toBe(true); });
    it("rejects spaces", () => { expect(isSlug("hello world")).toBe(false); });
    it("rejects uppercase", () => { expect(isSlug("Hello-World")).toBe(false); });
    it("validates with custom separator", () => { expect(isSlug("hello_world", "_")).toBe(true); });
    it("rejects empty string", () => { expect(isSlug("")).toBe(false); });
  });
});
