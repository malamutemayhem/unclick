import { describe, it, expect } from "vitest";
import { PathRouter, matchPath, buildPath } from "../path-matcher.js";

describe("PathRouter", () => {
  it("matches static routes", () => {
    const router = new PathRouter<string>();
    router.add("/users", "list");
    const m = router.match("/users");
    expect(m?.value).toBe("list");
  });

  it("matches params", () => {
    const router = new PathRouter<string>();
    router.add("/users/:id", "detail");
    const m = router.match("/users/42");
    expect(m?.value).toBe("detail");
    expect(m?.params.id).toBe("42");
  });

  it("matches wildcard", () => {
    const router = new PathRouter<string>();
    router.add("/files/*", "files");
    const m = router.match("/files/a/b/c");
    expect(m?.value).toBe("files");
    expect(m?.params["*"]).toBe("a/b/c");
  });

  it("returns null for no match", () => {
    const router = new PathRouter<string>();
    router.add("/users", "list");
    expect(router.match("/posts")).toBeNull();
  });

  it("matchAll returns all matches", () => {
    const router = new PathRouter<string>();
    router.add("/users/:id", "a");
    router.add("/users/:uid", "b");
    expect(router.matchAll("/users/1").length).toBe(2);
  });

  it("tracks size", () => {
    const router = new PathRouter<string>();
    router.add("/a", "1");
    router.add("/b", "2");
    expect(router.size).toBe(2);
  });
});

describe("matchPath", () => {
  it("matches pattern", () => {
    const params = matchPath("/users/:id/posts/:postId", "/users/5/posts/10");
    expect(params).toEqual({ id: "5", postId: "10" });
  });

  it("returns null on mismatch", () => {
    expect(matchPath("/users/:id", "/posts/1")).toBeNull();
  });
});

describe("buildPath", () => {
  it("fills params", () => {
    expect(buildPath("/users/:id/posts/:pid", { id: "5", pid: "10" })).toBe("/users/5/posts/10");
  });

  it("throws on missing param", () => {
    expect(() => buildPath("/users/:id", {})).toThrow("Missing param");
  });
});
