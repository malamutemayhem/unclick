import { describe, it, expect } from "vitest";
import { get, set, has, remove, compile } from "../json-pointer.js";

const doc = { foo: { bar: [1, 2, 3] }, baz: "hello" };

describe("get", () => {
  it("gets root", () => {
    expect(get(doc, "")).toEqual(doc);
  });

  it("gets nested value", () => {
    expect(get(doc, "/foo/bar/1")).toBe(2);
  });

  it("gets string value", () => {
    expect(get(doc, "/baz")).toBe("hello");
  });

  it("returns undefined for missing", () => {
    expect(get(doc, "/missing/path")).toBeUndefined();
  });
});

describe("set", () => {
  it("sets a value", () => {
    const obj = { a: { b: 1 } };
    set(obj, "/a/b", 42);
    expect(obj.a.b).toBe(42);
  });

  it("sets array element", () => {
    const obj = { items: [1, 2, 3] };
    set(obj, "/items/1", 99);
    expect(obj.items[1]).toBe(99);
  });

  it("appends to array with -", () => {
    const obj = { items: [1, 2] };
    set(obj, "/items/-", 3);
    expect(obj.items).toEqual([1, 2, 3]);
  });
});

describe("has", () => {
  it("returns true for existing", () => {
    expect(has(doc, "/foo/bar")).toBe(true);
  });

  it("returns false for missing", () => {
    expect(has(doc, "/nope")).toBe(false);
  });
});

describe("remove", () => {
  it("removes object property", () => {
    const obj = { a: 1, b: 2 };
    remove(obj, "/b");
    expect(obj).toEqual({ a: 1 });
  });

  it("removes array element", () => {
    const obj = { items: [1, 2, 3] };
    remove(obj, "/items/1");
    expect(obj.items).toEqual([1, 3]);
  });
});

describe("compile", () => {
  it("compiles pointer for reuse", () => {
    const ptr = compile("/foo/bar/0");
    expect(ptr.get(doc)).toBe(1);
    expect(ptr.has(doc)).toBe(true);
  });
});
