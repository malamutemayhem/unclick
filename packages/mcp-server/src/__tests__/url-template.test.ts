import { describe, it, expect } from "vitest";
import { expand, extractVarNames, isTemplate } from "../url-template.js";

describe("url-template", () => {
  describe("expand", () => {
    it("simple substitution", () => {
      expect(expand("/users/{id}", { id: "42" })).toBe("/users/42");
    });

    it("multiple vars", () => {
      expect(expand("/{x}/{y}", { x: "a", y: "b" })).toBe("/a/b");
    });

    it("skips undefined vars", () => {
      expect(expand("/{x}{y}", { x: "hello", y: undefined })).toBe("/hello");
    });

    it("reserved expansion (+)", () => {
      expect(expand("{+path}", { path: "/foo/bar" })).toBe("/foo/bar");
    });

    it("fragment expansion (#)", () => {
      expect(expand("{#anchor}", { anchor: "top" })).toBe("#top");
    });

    it("dot expansion (.)", () => {
      expect(expand("{.ext}", { ext: "json" })).toBe(".json");
    });

    it("path expansion (/)", () => {
      expect(expand("{/path}", { path: "users" })).toBe("/users");
    });

    it("semicolon expansion (;)", () => {
      expect(expand("{;color}", { color: "red" })).toBe(";color=red");
    });

    it("query expansion (?)", () => {
      expect(expand("{?q}", { q: "search" })).toBe("?q=search");
    });

    it("continuation expansion (&)", () => {
      expect(expand("{&page}", { page: 2 })).toBe("&page=2");
    });

    it("encodes values in simple expansion", () => {
      expect(expand("{q}", { q: "hello world" })).toBe("hello%20world");
    });

    it("array values", () => {
      expect(expand("{list}", { list: ["a", "b", "c"] })).toBe("a,b,c");
    });
  });

  describe("extractVarNames", () => {
    it("extracts variable names", () => {
      expect(extractVarNames("/users/{id}/posts/{postId}").sort()).toEqual(["id", "postId"]);
    });

    it("handles operators", () => {
      expect(extractVarNames("{+path}{?q}").sort()).toEqual(["path", "q"]);
    });

    it("strips explode marker", () => {
      expect(extractVarNames("{list*}")).toEqual(["list"]);
    });
  });

  describe("isTemplate", () => {
    it("returns true for templates", () => {
      expect(isTemplate("/users/{id}")).toBe(true);
    });

    it("returns false for plain strings", () => {
      expect(isTemplate("/users/123")).toBe(false);
    });
  });
});
