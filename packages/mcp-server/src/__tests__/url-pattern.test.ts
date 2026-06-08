import { describe, it, expect } from "vitest";
import { UrlPattern, UrlRouter } from "../url-pattern.js";

describe("UrlPattern", () => {
  it("matches literal paths", () => {
    const p = new UrlPattern("/users");
    expect(p.test("/users")).toBe(true);
    expect(p.test("/items")).toBe(false);
  });

  it("extracts named parameters", () => {
    const p = new UrlPattern("/users/:id");
    const result = p.match("/users/42");
    expect(result.matched).toBe(true);
    expect(result.params.id).toBe("42");
  });

  it("matches multiple params", () => {
    const p = new UrlPattern("/users/:userId/posts/:postId");
    const result = p.match("/users/5/posts/99");
    expect(result.matched).toBe(true);
    expect(result.params.userId).toBe("5");
    expect(result.params.postId).toBe("99");
  });

  it("matches wildcard", () => {
    const p = new UrlPattern("/files/*");
    const result = p.match("/files/docs/readme.md");
    expect(result.matched).toBe(true);
    expect(result.params["*"]).toBe("docs/readme.md");
  });

  it("returns non-match correctly", () => {
    const p = new UrlPattern("/users/:id");
    const result = p.match("/items/42");
    expect(result.matched).toBe(false);
  });

  it("lists param names", () => {
    const p = new UrlPattern("/api/:version/users/:id");
    expect(p.getParamNames()).toEqual(["version", "id"]);
  });

  it("builds URL from params", () => {
    const p = new UrlPattern("/users/:id/posts/:postId");
    expect(p.build({ id: "10", postId: "5" })).toBe("/users/10/posts/5");
  });

  it("returns pattern string", () => {
    const p = new UrlPattern("/api/:v");
    expect(p.getPattern()).toBe("/api/:v");
  });
});

describe("UrlRouter", () => {
  it("matches routes in order", () => {
    const router = new UrlRouter<string>();
    router.add("/users", "list");
    router.add("/users/:id", "detail");
    const result = router.match("/users/42");
    expect(result).not.toBeNull();
    expect(result!.handler).toBe("detail");
    expect(result!.params.id).toBe("42");
  });

  it("returns null for no match", () => {
    const router = new UrlRouter<string>();
    router.add("/users", "list");
    expect(router.match("/items")).toBeNull();
  });

  it("tracks route count", () => {
    const router = new UrlRouter();
    router.add("/a", 1);
    router.add("/b", 2);
    expect(router.routeCount()).toBe(2);
  });

  it("lists all patterns", () => {
    const router = new UrlRouter();
    router.add("/users", 1);
    router.add("/items/:id", 2);
    expect(router.allPatterns()).toEqual(["/users", "/items/:id"]);
  });
});
