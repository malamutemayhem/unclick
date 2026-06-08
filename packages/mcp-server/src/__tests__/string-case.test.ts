import { describe, it, expect } from "vitest";
import { toCamelCase, toPascalCase, toSnakeCase, toKebabCase, toScreamingSnake, toTitleCase, toSentenceCase, toDotCase, toPathCase, swapCase, detectCase } from "../string-case.js";

describe("string-case", () => {
  it("toCamelCase", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
    expect(toCamelCase("Hello-World")).toBe("helloWorld");
    expect(toCamelCase("HELLO_WORLD")).toBe("helloWorld");
    expect(toCamelCase("helloWorld")).toBe("helloWorld");
  });

  it("toPascalCase", () => {
    expect(toPascalCase("hello world")).toBe("HelloWorld");
    expect(toPascalCase("hello-world")).toBe("HelloWorld");
  });

  it("toSnakeCase", () => {
    expect(toSnakeCase("helloWorld")).toBe("hello_world");
    expect(toSnakeCase("Hello World")).toBe("hello_world");
  });

  it("toKebabCase", () => {
    expect(toKebabCase("helloWorld")).toBe("hello-world");
    expect(toKebabCase("HelloWorld")).toBe("hello-world");
  });

  it("toScreamingSnake", () => {
    expect(toScreamingSnake("helloWorld")).toBe("HELLO_WORLD");
    expect(toScreamingSnake("hello-world")).toBe("HELLO_WORLD");
  });

  it("toTitleCase", () => {
    expect(toTitleCase("hello_world")).toBe("Hello World");
    expect(toTitleCase("helloWorld")).toBe("Hello World");
  });

  it("toSentenceCase", () => {
    expect(toSentenceCase("hello_world")).toBe("Hello world");
  });

  it("toDotCase", () => {
    expect(toDotCase("helloWorld")).toBe("hello.world");
  });

  it("toPathCase", () => {
    expect(toPathCase("hello_world")).toBe("hello/world");
  });

  it("swapCase", () => {
    expect(swapCase("Hello")).toBe("hELLO");
    expect(swapCase("ABC")).toBe("abc");
  });

  it("detectCase", () => {
    expect(detectCase("helloWorld")).toBe("camel");
    expect(detectCase("HelloWorld")).toBe("pascal");
    expect(detectCase("hello_world")).toBe("snake");
    expect(detectCase("HELLO_WORLD")).toBe("screaming_snake");
    expect(detectCase("hello-world")).toBe("kebab");
    expect(detectCase("hello.world")).toBe("dot");
    expect(detectCase("???")).toBe("unknown");
  });

  it("handles empty string", () => {
    expect(toCamelCase("")).toBe("");
    expect(toSnakeCase("")).toBe("");
  });
});
