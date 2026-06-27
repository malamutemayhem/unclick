import { describe, it, expect } from "vitest";
import { VirtualFS } from "../virtual-fs.js";

describe("VirtualFS", () => {
  it("writes and reads files", () => {
    const fs = new VirtualFS();
    expect(fs.writeFile("/hello.txt", "world")).toBe(true);
    expect(fs.readFile("/hello.txt")).toBe("world");
  });

  it("returns null for missing file", () => {
    const fs = new VirtualFS();
    expect(fs.readFile("/missing.txt")).toBeNull();
  });

  it("creates directories", () => {
    const fs = new VirtualFS();
    expect(fs.mkdir("/docs")).toBe(true);
    expect(fs.isDirectory("/docs")).toBe(true);
  });

  it("writes files in subdirectories", () => {
    const fs = new VirtualFS();
    fs.mkdir("/src");
    fs.writeFile("/src/main.ts", "console.log('hi')");
    expect(fs.readFile("/src/main.ts")).toBe("console.log('hi')");
  });

  it("lists directory contents", () => {
    const fs = new VirtualFS();
    fs.writeFile("/a.txt", "a");
    fs.writeFile("/b.txt", "b");
    expect(fs.ls("/")).toEqual(["a.txt", "b.txt"]);
  });

  it("checks existence", () => {
    const fs = new VirtualFS();
    expect(fs.exists("/nope")).toBe(false);
    fs.writeFile("/yes.txt", "");
    expect(fs.exists("/yes.txt")).toBe(true);
  });

  it("distinguishes files and directories", () => {
    const fs = new VirtualFS();
    fs.mkdir("/dir");
    fs.writeFile("/file.txt", "data");
    expect(fs.isFile("/dir")).toBe(false);
    expect(fs.isDirectory("/file.txt")).toBe(false);
    expect(fs.isFile("/file.txt")).toBe(true);
    expect(fs.isDirectory("/dir")).toBe(true);
  });

  it("removes files", () => {
    const fs = new VirtualFS();
    fs.writeFile("/tmp.txt", "temp");
    expect(fs.rm("/tmp.txt")).toBe(true);
    expect(fs.exists("/tmp.txt")).toBe(false);
  });

  it("updates file content", () => {
    const fs = new VirtualFS();
    fs.writeFile("/data.txt", "v1");
    fs.writeFile("/data.txt", "v2");
    expect(fs.readFile("/data.txt")).toBe("v2");
  });

  it("returns stat info", () => {
    const fs = new VirtualFS();
    fs.writeFile("/info.txt", "hello");
    const s = fs.stat("/info.txt");
    expect(s).not.toBeNull();
    expect(s!.type).toBe("file");
    expect(s!.size).toBe(5);
  });

  it("renames files", () => {
    const fs = new VirtualFS();
    fs.writeFile("/old.txt", "content");
    expect(fs.rename("/old.txt", "/new.txt")).toBe(true);
    expect(fs.exists("/old.txt")).toBe(false);
    expect(fs.readFile("/new.txt")).toBe("content");
  });

  it("calculates total size", () => {
    const fs = new VirtualFS();
    fs.writeFile("/a.txt", "abc");
    fs.writeFile("/b.txt", "de");
    expect(fs.totalSize()).toBe(5);
  });

  it("counts files", () => {
    const fs = new VirtualFS();
    fs.mkdir("/dir");
    fs.writeFile("/dir/a.txt", "a");
    fs.writeFile("/dir/b.txt", "b");
    fs.writeFile("/c.txt", "c");
    expect(fs.fileCount()).toBe(3);
  });

  it("prevents writing over a directory", () => {
    const fs = new VirtualFS();
    fs.mkdir("/dir");
    expect(fs.writeFile("/dir", "bad")).toBe(false);
  });
});
