import { describe, it, expect } from "vitest";
import { parseUrl, parseQueryString, buildQueryString, joinUrl } from "../url-parser.js";

describe("parseUrl", () => {
  it("parses full URL", () => {
    const parsed = parseUrl("https://example.com:8080/path?q=1&r=2#section");
    expect(parsed.protocol).toBe("https");
    expect(parsed.hostname).toBe("example.com");
    expect(parsed.port).toBe("8080");
    expect(parsed.pathname).toBe("/path");
    expect(parsed.search).toBe("?q=1&r=2");
    expect(parsed.hash).toBe("#section");
    expect(parsed.params).toEqual({ q: "1", r: "2" });
  });

  it("parses URL without port", () => {
    const parsed = parseUrl("http://example.com/page");
    expect(parsed.hostname).toBe("example.com");
    expect(parsed.port).toBe("");
    expect(parsed.pathname).toBe("/page");
  });

  it("handles URL with no path", () => {
    const parsed = parseUrl("https://example.com");
    expect(parsed.hostname).toBe("example.com");
    expect(parsed.pathname).toBe("/");
  });
});

describe("parseQueryString", () => {
  it("parses key=value pairs", () => {
    expect(parseQueryString("a=1&b=2")).toEqual({ a: "1", b: "2" });
  });

  it("handles encoded values", () => {
    expect(parseQueryString("q=hello%20world")).toEqual({ q: "hello world" });
  });

  it("handles empty string", () => {
    expect(parseQueryString("")).toEqual({});
  });
});

describe("buildQueryString", () => {
  it("builds from object", () => {
    expect(buildQueryString({ a: "1", b: "2" })).toBe("a=1&b=2");
  });

  it("encodes special chars", () => {
    expect(buildQueryString({ q: "hello world" })).toBe("q=hello%20world");
  });
});

describe("joinUrl", () => {
  it("joins base and path", () => {
    expect(joinUrl("https://example.com", "/api/v1")).toBe("https://example.com/api/v1");
    expect(joinUrl("https://example.com/", "api/v1")).toBe("https://example.com/api/v1");
  });
});
