import { describe, it, expect } from "vitest";
import { buildEndpoint, apiUrl, restResource, withPagination } from "../endpoint-builder.js";

describe("buildEndpoint", () => {
  it("joins base and path", () => {
    expect(buildEndpoint({ base: "https://api.example.com", path: "/users" }))
      .toBe("https://api.example.com/users");
  });

  it("strips trailing slash from base", () => {
    expect(buildEndpoint({ base: "https://api.example.com/", path: "/users" }))
      .toBe("https://api.example.com/users");
  });

  it("adds leading slash to path if missing", () => {
    expect(buildEndpoint({ base: "https://api.example.com", path: "users" }))
      .toBe("https://api.example.com/users");
  });

  it("substitutes :param path parameters", () => {
    expect(buildEndpoint({
      base: "https://api.example.com",
      path: "/users/:id/posts/:postId",
      pathParams: { id: 42, postId: "abc" },
    })).toBe("https://api.example.com/users/42/posts/abc");
  });

  it("substitutes {param} path parameters", () => {
    expect(buildEndpoint({
      base: "https://api.example.com",
      path: "/users/{id}",
      pathParams: { id: 99 },
    })).toBe("https://api.example.com/users/99");
  });

  it("encodes path parameters", () => {
    const result = buildEndpoint({
      base: "https://api.example.com",
      path: "/search/:query",
      pathParams: { query: "hello world" },
    });
    expect(result).toContain("hello%20world");
  });

  it("adds query parameters", () => {
    const result = buildEndpoint({
      base: "https://api.example.com",
      path: "/search",
      queryParams: { q: "test", limit: 10, active: true },
    });
    expect(result).toContain("q=test");
    expect(result).toContain("limit=10");
    expect(result).toContain("active=true");
  });

  it("skips null and undefined query params", () => {
    const result = buildEndpoint({
      base: "https://api.example.com",
      path: "/search",
      queryParams: { q: "test", filter: undefined, sort: null },
    });
    expect(result).toContain("q=test");
    expect(result).not.toContain("filter");
    expect(result).not.toContain("sort");
  });

  it("adds trailing slash when requested", () => {
    expect(buildEndpoint({
      base: "https://api.example.com",
      path: "/users",
      trailingSlash: true,
    })).toBe("https://api.example.com/users/");
  });

  it("removes trailing slash when explicitly false", () => {
    expect(buildEndpoint({
      base: "https://api.example.com",
      path: "/users/",
      trailingSlash: false,
    })).toBe("https://api.example.com/users");
  });

  it("works with base only", () => {
    expect(buildEndpoint({ base: "https://api.example.com" }))
      .toBe("https://api.example.com");
  });
});

describe("apiUrl", () => {
  it("builds a simple API URL", () => {
    expect(apiUrl("https://api.example.com", "/v1/users"))
      .toBe("https://api.example.com/v1/users");
  });

  it("includes query params", () => {
    const result = apiUrl("https://api.example.com", "/search", { q: "test" });
    expect(result).toBe("https://api.example.com/search?q=test");
  });
});

describe("restResource", () => {
  it("builds a collection URL", () => {
    expect(restResource("https://api.example.com", "users"))
      .toBe("https://api.example.com/users");
  });

  it("builds a resource URL with ID", () => {
    expect(restResource("https://api.example.com", "users", 42))
      .toBe("https://api.example.com/users/42");
  });

  it("handles string IDs", () => {
    expect(restResource("https://api.example.com", "users", "abc"))
      .toBe("https://api.example.com/users/abc");
  });
});

describe("withPagination", () => {
  it("adds pagination params to URL without query string", () => {
    const result = withPagination("https://api.example.com/users", { limit: 20, offset: 40 });
    expect(result).toBe("https://api.example.com/users?limit=20&offset=40");
  });

  it("appends to existing query string", () => {
    const result = withPagination("https://api.example.com/users?active=true", { page: 2 });
    expect(result).toBe("https://api.example.com/users?active=true&page=2");
  });

  it("handles cursor pagination", () => {
    const result = withPagination("https://api.example.com/items", { cursor: "abc123", limit: 50 });
    expect(result).toContain("cursor=abc123");
    expect(result).toContain("limit=50");
  });

  it("returns URL unchanged when no params given", () => {
    expect(withPagination("https://api.example.com/users", {}))
      .toBe("https://api.example.com/users");
  });
});
