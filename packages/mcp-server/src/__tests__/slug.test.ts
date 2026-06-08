import { describe, it, expect } from "vitest";
import { slugify, deslugify, camelToSlug, slugToCamel, slugToPascal, isValidSlug, truncateSlug } from "../slug.js";

describe("slugify", () => {
  it("converts basic text", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips special characters", () => {
    expect(slugify("Hello, World! #2024")).toBe("hello-world-2024");
  });

  it("normalizes accented characters", () => {
    expect(slugify("cafe resume")).toBe("cafe-resume");
  });

  it("collapses multiple spaces and dashes", () => {
    expect(slugify("a   b---c")).toBe("a-b-c");
  });

  it("custom separator", () => {
    expect(slugify("hello world", "_")).toBe("hello_world");
  });

  it("trims whitespace", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });
});

describe("deslugify", () => {
  it("converts slug to title", () => {
    expect(deslugify("hello-world")).toBe("Hello World");
  });

  it("handles custom separator", () => {
    expect(deslugify("hello_world", "_")).toBe("Hello World");
  });
});

describe("camelToSlug", () => {
  it("converts camelCase", () => {
    expect(camelToSlug("helloWorld")).toBe("hello-world");
  });

  it("converts PascalCase", () => {
    expect(camelToSlug("MyComponent")).toBe("my-component");
  });

  it("handles consecutive caps", () => {
    expect(camelToSlug("parseHTML")).toBe("parse-html");
  });
});

describe("slugToCamel", () => {
  it("converts slug to camel", () => {
    expect(slugToCamel("hello-world")).toBe("helloWorld");
  });
});

describe("slugToPascal", () => {
  it("converts slug to pascal", () => {
    expect(slugToPascal("hello-world")).toBe("HelloWorld");
  });
});

describe("isValidSlug", () => {
  it("validates correct slug", () => {
    expect(isValidSlug("hello-world")).toBe(true);
  });

  it("rejects uppercase", () => {
    expect(isValidSlug("Hello-World")).toBe(false);
  });

  it("rejects leading dash", () => {
    expect(isValidSlug("-hello")).toBe(false);
  });

  it("rejects trailing dash", () => {
    expect(isValidSlug("hello-")).toBe(false);
  });
});

describe("truncateSlug", () => {
  it("returns short slugs as-is", () => {
    expect(truncateSlug("hello", 20)).toBe("hello");
  });

  it("truncates at last separator within trimmed string", () => {
    expect(truncateSlug("hello-beautiful-world", 14)).toBe("hello");
  });

  it("breaks at separator when trimmed string has one", () => {
    expect(truncateSlug("hello-beautiful-world", 16)).toBe("hello-beautiful");
  });
});
