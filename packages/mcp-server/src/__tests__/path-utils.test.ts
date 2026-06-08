import { describe, it, expect } from "vitest";
import { join, normalize, dirname, basename, extname, isAbsolute, relative } from "../path-utils.js";

describe("path-utils", () => {
  it("join combines paths", () => {
    expect(join("a", "b", "c")).toBe("a/b/c");
    expect(join("/a", "b", "c")).toBe("/a/b/c");
    expect(join("a", "", "b")).toBe("a/b");
  });

  it("normalize resolves dots", () => {
    expect(normalize("a/b/../c")).toBe("a/c");
    expect(normalize("a/./b")).toBe("a/b");
    expect(normalize("/a/b/../c")).toBe("/a/c");
    expect(normalize("")).toBe(".");
  });

  it("dirname returns parent", () => {
    expect(dirname("/a/b/c")).toBe("/a/b");
    expect(dirname("a/b")).toBe("a");
    expect(dirname("file.txt")).toBe(".");
    expect(dirname("/file.txt")).toBe("/");
  });

  it("basename returns filename", () => {
    expect(basename("/a/b/file.txt")).toBe("file.txt");
    expect(basename("/a/b/file.txt", ".txt")).toBe("file");
    expect(basename("file.txt")).toBe("file.txt");
  });

  it("extname returns extension", () => {
    expect(extname("file.txt")).toBe(".txt");
    expect(extname("file.tar.gz")).toBe(".gz");
    expect(extname("file")).toBe("");
    expect(extname(".hidden")).toBe("");
  });

  it("isAbsolute", () => {
    expect(isAbsolute("/a/b")).toBe(true);
    expect(isAbsolute("a/b")).toBe(false);
  });

  it("relative", () => {
    expect(relative("/a/b", "/a/c")).toBe("../c");
    expect(relative("/a/b/c", "/a/b/c")).toBe(".");
    expect(relative("/a/b", "/a/b/c/d")).toBe("c/d");
  });
});
