import { describe, it, expect } from "vitest";
import { join, normalize, basename, dirname, extname, isAbsolute, relative } from "../path-utils.js";

describe("path-utils", () => {
  it("join combines parts", () => {
    expect(join("a", "b", "c")).toBe("a/b/c");
    expect(join("/a", "b", "c")).toBe("/a/b/c");
    expect(join("a", "", "b")).toBe("a/b");
  });

  it("normalize resolves . and ..", () => {
    expect(normalize("a/./b/../c")).toBe("a/c");
    expect(normalize("/a/b/../c")).toBe("/a/c");
    expect(normalize("a/b/../../c")).toBe("c");
    expect(normalize("")).toBe(".");
  });

  it("basename extracts filename", () => {
    expect(basename("/foo/bar/baz.txt")).toBe("baz.txt");
    expect(basename("/foo/bar/baz.txt", ".txt")).toBe("baz");
  });

  it("dirname extracts directory", () => {
    expect(dirname("/foo/bar/baz.txt")).toBe("/foo/bar");
    expect(dirname("/foo")).toBe("/");
    expect(dirname("foo")).toBe(".");
  });

  it("extname extracts extension", () => {
    expect(extname("file.ts")).toBe(".ts");
    expect(extname("file.test.ts")).toBe(".ts");
    expect(extname("noext")).toBe("");
    expect(extname(".hidden")).toBe("");
  });

  it("isAbsolute checks leading slash", () => {
    expect(isAbsolute("/foo")).toBe(true);
    expect(isAbsolute("foo")).toBe(false);
  });

  it("relative computes path between two", () => {
    expect(relative("/a/b", "/a/b/c/d")).toBe("c/d");
    expect(relative("/a/b/c", "/a/d")).toBe("../../d");
    expect(relative("/a/b", "/a/b")).toBe(".");
  });
});
