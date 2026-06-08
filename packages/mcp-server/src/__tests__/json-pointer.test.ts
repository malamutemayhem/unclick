import { describe, it, expect } from "vitest";
import { get, set, remove, has, compile, toPointer } from "../json-pointer.js";

describe("json-pointer", () => {
  const doc = { foo: { bar: [1, 2, 3] }, baz: "hello" };

  it("get retrieves nested value", () => {
    expect(get(doc, "/foo/bar/1")).toBe(2);
    expect(get(doc, "/baz")).toBe("hello");
  });

  it("get returns undefined for missing path", () => {
    expect(get(doc, "/nope")).toBeUndefined();
    expect(get(doc, "/foo/bar/99")).toBeUndefined();
  });

  it("set creates new value at path", () => {
    const result = set(doc, "/foo/bar/1", 42) as typeof doc;
    expect(result.foo.bar[1]).toBe(42);
    expect(doc.foo.bar[1]).toBe(2);
  });

  it("remove deletes a key", () => {
    const result = remove(doc, "/baz") as Record<string, unknown>;
    expect(result.baz).toBeUndefined();
    expect(doc.baz).toBe("hello");
  });

  it("remove deletes array element", () => {
    const result = remove(doc, "/foo/bar/0") as typeof doc;
    expect(result.foo.bar).toEqual([2, 3]);
  });

  it("has checks existence", () => {
    expect(has(doc, "/foo/bar")).toBe(true);
    expect(has(doc, "/nope")).toBe(false);
  });

  it("handles escaped characters", () => {
    const obj = { "a/b": { "c~d": 42 } };
    expect(get(obj, "/a~1b/c~0d")).toBe(42);
  });

  it("compile converts dot path to pointer", () => {
    expect(compile("foo.bar.baz")).toBe("/foo/bar/baz");
  });

  it("toPointer builds from array", () => {
    expect(toPointer(["foo", "bar"])).toBe("/foo/bar");
  });
});
