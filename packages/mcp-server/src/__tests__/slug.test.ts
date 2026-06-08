import { describe, it, expect } from "vitest";
import { slugify, deslugify, isSlug, toKebabCase, toSnakeCase, toCamelCase, toPascalCase } from "../slug.js";

describe("slug", () => {
  it("slugify converts to lowercase dashed string", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
  });

  it("slugify strips special characters", () => {
    expect(slugify("What's up?!")).toBe("whats-up");
    expect(slugify("price: $100")).toBe("price-100");
  });

  it("slugify handles underscores", () => {
    expect(slugify("some_variable_name")).toBe("some-variable-name");
  });

  it("deslugify capitalizes words", () => {
    expect(deslugify("hello-world")).toBe("Hello World");
    expect(deslugify("my-cool-thing")).toBe("My Cool Thing");
  });

  it("isSlug validates slug format", () => {
    expect(isSlug("hello-world")).toBe(true);
    expect(isSlug("simple")).toBe(true);
    expect(isSlug("Hello-World")).toBe(false);
    expect(isSlug("has spaces")).toBe(false);
    expect(isSlug("-leading")).toBe(false);
    expect(isSlug("trailing-")).toBe(false);
  });

  it("toKebabCase converts camelCase", () => {
    expect(toKebabCase("myVariableName")).toBe("my-variable-name");
    expect(toKebabCase("myHTTPClient")).toBe("my-httpclient");
  });

  it("toSnakeCase converts camelCase", () => {
    expect(toSnakeCase("myVariableName")).toBe("my_variable_name");
    expect(toSnakeCase("some-kebab-case")).toBe("some_kebab_case");
  });

  it("toCamelCase converts from kebab/snake", () => {
    expect(toCamelCase("my-variable-name")).toBe("myVariableName");
    expect(toCamelCase("some_snake_case")).toBe("someSnakeCase");
  });

  it("toPascalCase capitalizes first letter", () => {
    expect(toPascalCase("my-component")).toBe("MyComponent");
    expect(toPascalCase("hello_world")).toBe("HelloWorld");
  });

  it("handles empty and single word inputs", () => {
    expect(slugify("")).toBe("");
    expect(slugify("hello")).toBe("hello");
    expect(toCamelCase("hello")).toBe("hello");
    expect(toPascalCase("hello")).toBe("Hello");
  });
});
