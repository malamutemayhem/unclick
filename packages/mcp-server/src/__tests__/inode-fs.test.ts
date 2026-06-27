import { describe, it, expect } from "vitest";
import { InodeFS } from "../inode-fs.js";

describe("InodeFS", () => {
  it("creates files", () => {
    const fs = new InodeFS();
    const id = fs.createFile("/hello.txt", "world");
    expect(id).not.toBeNull();
    expect(fs.read("/hello.txt")).toBe("world");
  });

  it("creates directories", () => {
    const fs = new InodeFS();
    const id = fs.mkdir("/docs");
    expect(id).not.toBeNull();
    expect(fs.exists("/docs")).toBe(true);
  });

  it("nested directories", () => {
    const fs = new InodeFS();
    fs.mkdir("/a");
    fs.mkdir("/a/b");
    fs.createFile("/a/b/c.txt", "deep");
    expect(fs.read("/a/b/c.txt")).toBe("deep");
  });

  it("readdir lists entries", () => {
    const fs = new InodeFS();
    fs.createFile("/a.txt", "");
    fs.createFile("/b.txt", "");
    fs.mkdir("/sub");
    const entries = fs.readdir("/");
    expect(entries).toContain("a.txt");
    expect(entries).toContain("b.txt");
    expect(entries).toContain("sub");
  });

  it("write updates content", () => {
    const fs = new InodeFS();
    fs.createFile("/f.txt", "old");
    fs.write("/f.txt", "new");
    expect(fs.read("/f.txt")).toBe("new");
  });

  it("unlink removes file", () => {
    const fs = new InodeFS();
    fs.createFile("/del.txt", "bye");
    expect(fs.unlink("/del.txt")).toBe(true);
    expect(fs.exists("/del.txt")).toBe(false);
  });

  it("unlink fails on directory", () => {
    const fs = new InodeFS();
    fs.mkdir("/dir");
    expect(fs.unlink("/dir")).toBe(false);
  });

  it("stat returns metadata", () => {
    const fs = new InodeFS();
    fs.createFile("/s.txt", "hello");
    const info = fs.stat("/s.txt");
    expect(info).not.toBeNull();
    expect(info!.type).toBe("file");
    expect(info!.size).toBe(5);
  });

  it("stat on root", () => {
    const fs = new InodeFS();
    const info = fs.stat("/");
    expect(info).not.toBeNull();
    expect(info!.type).toBe("directory");
  });

  it("exists checks presence", () => {
    const fs = new InodeFS();
    expect(fs.exists("/")).toBe(true);
    expect(fs.exists("/nope")).toBe(false);
  });

  it("duplicate create fails", () => {
    const fs = new InodeFS();
    fs.createFile("/dup.txt", "a");
    expect(fs.createFile("/dup.txt", "b")).toBeNull();
  });

  it("read nonexistent returns null", () => {
    const fs = new InodeFS();
    expect(fs.read("/missing")).toBeNull();
  });

  it("write nonexistent returns false", () => {
    const fs = new InodeFS();
    expect(fs.write("/missing", "data")).toBe(false);
  });

  it("inodeCount tracks allocations", () => {
    const fs = new InodeFS();
    const initial = fs.inodeCount;
    fs.createFile("/a.txt", "");
    expect(fs.inodeCount).toBe(initial + 1);
  });
});
