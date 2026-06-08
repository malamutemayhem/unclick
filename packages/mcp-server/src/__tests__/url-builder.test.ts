import { describe, it, expect } from "vitest";
import { UrlBuilder, parseQuery, buildQuery } from "../url-builder.js";

describe("UrlBuilder", () => {
  it("builds simple URL", () => {
    expect(new UrlBuilder("https://api.example.com").toString()).toBe("https://api.example.com");
  });

  it("appends path segments", () => {
    expect(new UrlBuilder("https://api.example.com").path("v1", "users").toString()).toBe("https://api.example.com/v1/users");
  });

  it("adds query params", () => {
    const url = new UrlBuilder("https://api.example.com").path("search").param("q", "test").param("page", 1).toString();
    expect(url).toBe("https://api.example.com/search?q=test&page=1");
  });

  it("adds hash", () => {
    expect(new UrlBuilder("https://example.com").hash("section").toString()).toBe("https://example.com#section");
  });

  it("encodes special characters", () => {
    const url = new UrlBuilder("https://api.example.com").param("q", "hello world").toString();
    expect(url).toContain("hello%20world");
  });

  it("handles multiple values for same key", () => {
    const url = new UrlBuilder("https://api.example.com").param("tag", "a").param("tag", "b").toString();
    expect(url).toContain("tag=a&tag=b");
  });

  it("params method adds object", () => {
    const url = new UrlBuilder("https://api.example.com").params({ a: "1", b: 2, c: undefined }).toString();
    expect(url).toContain("a=1");
    expect(url).toContain("b=2");
    expect(url).not.toContain("c=");
  });
});

describe("parseQuery", () => {
  it("parses query string", () => {
    expect(parseQuery("?q=test&page=1")).toEqual({ q: "test", page: "1" });
  });

  it("handles no leading ?", () => {
    expect(parseQuery("a=1&b=2")).toEqual({ a: "1", b: "2" });
  });

  it("handles empty string", () => {
    expect(parseQuery("")).toEqual({});
  });
});

describe("buildQuery", () => {
  it("builds query string", () => {
    expect(buildQuery({ q: "test", page: 1 })).toBe("?q=test&page=1");
  });

  it("skips undefined values", () => {
    expect(buildQuery({ a: "1", b: undefined })).toBe("?a=1");
  });

  it("returns empty for no params", () => {
    expect(buildQuery({})).toBe("");
  });
});
