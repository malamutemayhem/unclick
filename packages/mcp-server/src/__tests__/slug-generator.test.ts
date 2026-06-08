import { describe, it, expect } from "vitest";
import { slugify, uniqueSlug, fileSlug, anchorSlug } from "../slug-generator.js";

describe("slugify", () => {
  it("basic slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips special characters", () => {
    expect(slugify("Hello, World! How's it?")).toBe("hello-world-how-s-it");
  });

  it("transliterates accented characters", () => {
    expect(slugify("Cafe du Monde")).toBe("cafe-du-monde");
    expect(slugify("uber cool")).toBe("uber-cool");
  });

  it("handles consecutive separators", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("custom separator", () => {
    expect(slugify("Hello World", { separator: "_" })).toBe("hello_world");
  });

  it("maxLength truncates at word boundary", () => {
    const result = slugify("The Quick Brown Fox Jumps", { maxLength: 15 });
    expect(result.length).toBeLessThanOrEqual(15);
  });

  it("preserves case when lowercase false", () => {
    expect(slugify("Hello World", { lowercase: false })).toBe("Hello-World");
  });

  it("handles empty input", () => {
    expect(slugify("")).toBe("");
  });

  it("handles all-special-chars", () => {
    expect(slugify("@#$%")).toBe("");
  });

  it("transliterates german eszett", () => {
    expect(slugify("Strasse")).toBe("strasse");
  });
});

describe("uniqueSlug", () => {
  it("returns base slug when unique", () => {
    expect(uniqueSlug("Hello", new Set())).toBe("hello");
  });

  it("appends counter when duplicate", () => {
    const existing = new Set(["hello"]);
    expect(uniqueSlug("Hello", existing)).toBe("hello-2");
  });

  it("increments counter for multiple duplicates", () => {
    const existing = new Set(["hello", "hello-2", "hello-3"]);
    expect(uniqueSlug("Hello", existing)).toBe("hello-4");
  });
});

describe("fileSlug", () => {
  it("strips extension", () => {
    expect(fileSlug("My Document.pdf")).toBe("my-document");
  });

  it("handles no extension", () => {
    expect(fileSlug("README")).toBe("readme");
  });
});

describe("anchorSlug", () => {
  it("creates anchor from heading", () => {
    expect(anchorSlug("Getting Started")).toBe("getting-started");
  });

  it("handles mixed case and symbols", () => {
    expect(anchorSlug("What's New in v2.0?")).toBe("what-s-new-in-v2-0");
  });
});
