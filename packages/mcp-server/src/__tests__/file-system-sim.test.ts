import { describe, it, expect } from "vitest";
import { FileSystemSim } from "../file-system-sim.js";

describe("FileSystemSim", () => {
  it("mkdir creates directory", () => {
    const fs = new FileSystemSim();
    expect(fs.mkdir("/home")).toBe(true);
    expect(fs.isDirectory("/home")).toBe(true);
  });

  it("mkdir fails for duplicate", () => {
    const fs = new FileSystemSim();
    fs.mkdir("/home");
    expect(fs.mkdir("/home")).toBe(false);
  });

  it("writeFile and readFile", () => {
    const fs = new FileSystemSim();
    fs.writeFile("/hello.txt", "world");
    expect(fs.readFile("/hello.txt")).toBe("world");
  });

  it("writeFile updates existing", () => {
    const fs = new FileSystemSim();
    fs.writeFile("/f.txt", "v1");
    fs.writeFile("/f.txt", "v2");
    expect(fs.readFile("/f.txt")).toBe("v2");
  });

  it("readFile returns null for missing", () => {
    const fs = new FileSystemSim();
    expect(fs.readFile("/nope")).toBeNull();
  });

  it("exists checks path", () => {
    const fs = new FileSystemSim();
    fs.writeFile("/a.txt", "data");
    expect(fs.exists("/a.txt")).toBe(true);
    expect(fs.exists("/b.txt")).toBe(false);
  });

  it("isFile and isDirectory", () => {
    const fs = new FileSystemSim();
    fs.mkdir("/dir");
    fs.writeFile("/dir/f.txt", "x");
    expect(fs.isFile("/dir/f.txt")).toBe(true);
    expect(fs.isDirectory("/dir/f.txt")).toBe(false);
    expect(fs.isDirectory("/dir")).toBe(true);
  });

  it("ls lists directory contents", () => {
    const fs = new FileSystemSim();
    fs.writeFile("/b.txt", "");
    fs.writeFile("/a.txt", "");
    const listing = fs.ls("/");
    expect(listing).toEqual(["a.txt", "b.txt"]);
  });

  it("ls returns null for file", () => {
    const fs = new FileSystemSim();
    fs.writeFile("/f.txt", "");
    expect(fs.ls("/f.txt")).toBeNull();
  });

  it("rm removes file", () => {
    const fs = new FileSystemSim();
    fs.writeFile("/f.txt", "data");
    expect(fs.rm("/f.txt")).toBe(true);
    expect(fs.exists("/f.txt")).toBe(false);
  });

  it("stat returns file info", () => {
    const fs = new FileSystemSim();
    fs.writeFile("/f.txt", "hello");
    const s = fs.stat("/f.txt");
    expect(s).not.toBeNull();
    expect(s!.type).toBe("file");
    expect(s!.size).toBe(5);
  });

  it("du computes total size", () => {
    const fs = new FileSystemSim();
    fs.mkdir("/dir");
    fs.writeFile("/dir/a.txt", "abc");
    fs.writeFile("/dir/b.txt", "de");
    expect(fs.du("/dir")).toBe(5);
  });

  it("tree returns tree view", () => {
    const fs = new FileSystemSim();
    fs.mkdir("/src");
    fs.writeFile("/src/main.ts", "code");
    const t = fs.tree("/");
    expect(t.length).toBeGreaterThan(0);
  });

  it("nested directories", () => {
    const fs = new FileSystemSim();
    fs.mkdir("/a");
    fs.mkdir("/a/b");
    fs.writeFile("/a/b/c.txt", "deep");
    expect(fs.readFile("/a/b/c.txt")).toBe("deep");
  });
});
