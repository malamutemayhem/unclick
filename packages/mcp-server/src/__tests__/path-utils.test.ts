import { describe, it, expect } from "vitest";
import { join, normalize, dirname, basename, extname, isAbsolute, relative } from "../path-utils.js";

describe("join", () => {
  it("joins path segments", () => {
    expect(join("a", "b", "c")).toBe("a/b/c");
  });

  it("normalizes slashes", () => {
    expect(join("a/", "/b")).toBe("a/b");
  });

  it("resolves dots", () => {
    expect(join("a", ".", "b")).toBe("a/b");
    expect(join("a", "b", "..", "c")).toBe("a/c");
  });

  it("handles absolute paths", () => {
    expect(join("/a", "b")).toBe("/a/b");
  });

  it("handles empty parts", () => {
    expect(join("", "a", "", "b")).toBe("a/b");
  });
});

describe("normalize", () => {
  it("removes double slashes", () => {
    expect(normalize("a//b///c")).toBe("a/b/c");
  });

  it("resolves dot segments", () => {
    expect(normalize("a/./b/../c")).toBe("a/c");
  });

  it("handles absolute paths", () => {
    expect(normalize("/a/../b")).toBe("/b");
  });

  it("returns dot for empty result", () => {
    expect(normalize("")).toBe(".");
    expect(normalize(".")).toBe(".");
  });

  it("preserves leading double-dots for relative", () => {
    expect(normalize("../../a")).toBe("../../a");
  });
});

describe("dirname", () => {
  it("returns parent directory", () => {
    expect(dirname("/a/b/c")).toBe("/a/b");
  });

  it("returns root for top-level", () => {
    expect(dirname("/a")).toBe("/");
  });

  it("returns dot for no directory", () => {
    expect(dirname("file.txt")).toBe(".");
  });
});

describe("basename", () => {
  it("returns filename", () => {
    expect(basename("/a/b/file.txt")).toBe("file.txt");
  });

  it("strips extension if provided", () => {
    expect(basename("/a/b/file.txt", ".txt")).toBe("file");
  });

  it("handles no directory", () => {
    expect(basename("file.txt")).toBe("file.txt");
  });
});

describe("extname", () => {
  it("returns extension", () => {
    expect(extname("file.txt")).toBe(".txt");
  });

  it("returns last extension", () => {
    expect(extname("file.test.ts")).toBe(".ts");
  });

  it("returns empty for no extension", () => {
    expect(extname("Makefile")).toBe("");
  });

  it("returns empty for dotfile", () => {
    expect(extname(".gitignore")).toBe("");
  });
});

describe("isAbsolute", () => {
  it("returns true for absolute paths", () => {
    expect(isAbsolute("/a/b")).toBe(true);
  });

  it("returns false for relative paths", () => {
    expect(isAbsolute("a/b")).toBe(false);
  });
});

describe("relative", () => {
  it("computes relative path", () => {
    expect(relative("/a/b", "/a/c")).toBe("../c");
  });

  it("returns dot for same path", () => {
    expect(relative("/a/b", "/a/b")).toBe(".");
  });

  it("handles deeper target", () => {
    expect(relative("/a", "/a/b/c")).toBe("b/c");
  });

  it("handles shallower target", () => {
    expect(relative("/a/b/c", "/a")).toBe("../..");
  });
});
