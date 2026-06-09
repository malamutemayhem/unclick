import { describe, it, expect } from "vitest";
import { Router, parseQueryString, buildQueryString, parsePath } from "../path-router.js";

describe("PathRouter", () => {
  it("matches static routes", () => {
    const router = new Router<string>();
    router.get("/users", "list-users");
    const match = router.match("GET", "/users");
    expect(match).not.toBeNull();
    expect(match!.handler).toBe("list-users");
  });

  it("matches parameterized routes", () => {
    const router = new Router<string>();
    router.get("/users/:id", "get-user");
    const match = router.match("GET", "/users/123");
    expect(match).not.toBeNull();
    expect(match!.handler).toBe("get-user");
    expect(match!.params.id).toBe("123");
  });

  it("matches multiple params", () => {
    const router = new Router<string>();
    router.get("/users/:userId/posts/:postId", "get-post");
    const match = router.match("GET", "/users/1/posts/42");
    expect(match!.params.userId).toBe("1");
    expect(match!.params.postId).toBe("42");
  });

  it("prefers exact over param", () => {
    const router = new Router<string>();
    router.get("/users/me", "current-user");
    router.get("/users/:id", "get-user");
    expect(router.match("GET", "/users/me")!.handler).toBe("current-user");
    expect(router.match("GET", "/users/123")!.handler).toBe("get-user");
  });

  it("returns null for no match", () => {
    const router = new Router<string>();
    router.get("/users", "list");
    expect(router.match("GET", "/posts")).toBeNull();
  });

  it("supports HTTP methods", () => {
    const router = new Router<string>();
    router.post("/users", "create");
    router.put("/users/:id", "update");
    router.del("/users/:id", "delete");
    expect(router.match("POST", "/users")!.handler).toBe("create");
  });

  it("lists routes", () => {
    const router = new Router<string>();
    router.get("/a", "a");
    router.post("/b", "b");
    const routes = router.listRoutes();
    expect(routes).toHaveLength(2);
  });

  it("lookup is shorthand for GET match", () => {
    const router = new Router<string>();
    router.get("/test", "found");
    expect(router.lookup("/test")!.handler).toBe("found");
  });
});

describe("Query string utilities", () => {
  it("parses query string", () => {
    const params = parseQueryString("?name=alice&age=30");
    expect(params.name).toBe("alice");
    expect(params.age).toBe("30");
  });

  it("builds query string", () => {
    const qs = buildQueryString({ a: "1", b: "2" });
    expect(qs).toContain("a=1");
    expect(qs).toContain("b=2");
    expect(qs.startsWith("?")).toBe(true);
  });

  it("handles empty query string", () => {
    expect(parseQueryString("")).toEqual({});
    expect(buildQueryString({})).toBe("");
  });
});

describe("parsePath", () => {
  it("parses path with query and hash", () => {
    const result = parsePath("/page?key=val#section");
    expect(result.path).toBe("/page");
    expect(result.query.key).toBe("val");
    expect(result.hash).toBe("section");
  });

  it("parses simple path", () => {
    const result = parsePath("/page");
    expect(result.path).toBe("/page");
    expect(result.hash).toBe("");
  });
});
