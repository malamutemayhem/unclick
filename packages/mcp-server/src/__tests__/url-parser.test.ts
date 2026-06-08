import { describe, it, expect } from "vitest";
import { parseUrl, parseQueryString, buildQueryString, buildUrl, joinPath } from "../url-parser.js";

describe("parseUrl", () => {
  it("parses full URL", () => {
    const u = parseUrl("https://example.com:8080/path?key=val#frag");
    expect(u.protocol).toBe("https");
    expect(u.hostname).toBe("example.com");
    expect(u.port).toBe("8080");
    expect(u.pathname).toBe("/path");
    expect(u.params.key).toBe("val");
    expect(u.hash).toBe("#frag");
  });

  it("parses simple URL", () => {
    const u = parseUrl("http://example.com");
    expect(u.hostname).toBe("example.com");
    expect(u.pathname).toBe("/");
    expect(u.port).toBe("");
  });

  it("throws for invalid", () => {
    expect(() => parseUrl("not-a-url")).toThrow();
  });
});

describe("parseQueryString", () => {
  it("parses params", () => {
    expect(parseQueryString("a=1&b=2")).toEqual({ a: "1", b: "2" });
  });

  it("handles encoded values", () => {
    expect(parseQueryString("q=hello%20world")).toEqual({ q: "hello world" });
  });

  it("handles empty", () => {
    expect(parseQueryString("")).toEqual({});
  });
});

describe("buildQueryString", () => {
  it("builds from params", () => {
    expect(buildQueryString({ a: "1", b: "2" })).toBe("a=1&b=2");
  });
});

describe("buildUrl", () => {
  it("adds params", () => {
    expect(buildUrl("https://example.com", { q: "test" })).toBe("https://example.com?q=test");
  });

  it("appends to existing params", () => {
    expect(buildUrl("https://example.com?a=1", { b: "2" })).toBe("https://example.com?a=1&b=2");
  });
});

describe("joinPath", () => {
  it("joins segments", () => {
    expect(joinPath("https://example.com", "api", "v1")).toBe("https://example.com/api/v1");
  });

  it("handles extra slashes", () => {
    expect(joinPath("https://example.com/", "/api/", "/v1")).toBe("https://example.com/api/v1");
  });
});
