import { describe, it, expect } from "vitest";
import { URLBuilder, parseQueryString, buildQueryString } from "../url-builder.js";

describe("URLBuilder", () => {
  it("builds base URL", () => {
    expect(new URLBuilder("https://example.com").build()).toBe("https://example.com");
  });

  it("strips trailing slash from base", () => {
    expect(new URLBuilder("https://example.com/").build()).toBe("https://example.com");
  });

  it("adds path segments (encoded)", () => {
    expect(new URLBuilder("https://api.com").path("users", "john doe").build())
      .toBe("https://api.com/users/john%20doe");
  });

  it("adds raw path segments", () => {
    expect(new URLBuilder("https://api.com").rawPath("v1/users").build())
      .toBe("https://api.com/v1/users");
  });

  it("adds query params", () => {
    expect(new URLBuilder("https://api.com").query("page", 1).query("q", "hello world").build())
      .toBe("https://api.com?page=1&q=hello%20world");
  });

  it("queryObject skips undefined", () => {
    expect(new URLBuilder("https://api.com").queryObject({ a: "1", b: undefined }).build())
      .toBe("https://api.com?a=1");
  });

  it("adds hash fragment", () => {
    expect(new URLBuilder("https://example.com").hash("section").build())
      .toBe("https://example.com#section");
  });

  it("full URL with all parts", () => {
    const url = new URLBuilder("https://api.com")
      .rawPath("v1/search")
      .query("q", "test")
      .hash("results")
      .build();
    expect(url).toBe("https://api.com/v1/search?q=test#results");
  });

  it("toString calls build", () => {
    const b = new URLBuilder("https://x.com").query("a", "1");
    expect(b.toString()).toBe(b.build());
  });
});

describe("parseQueryString", () => {
  it("parses query string", () => {
    expect(parseQueryString("?a=1&b=hello")).toEqual({ a: "1", b: "hello" });
  });

  it("handles no leading ?", () => {
    expect(parseQueryString("x=1")).toEqual({ x: "1" });
  });

  it("handles empty string", () => {
    expect(parseQueryString("")).toEqual({});
  });

  it("decodes encoded values", () => {
    expect(parseQueryString("q=hello%20world")).toEqual({ q: "hello world" });
  });

  it("handles value with =", () => {
    expect(parseQueryString("url=http://x.com?a=1")).toEqual({ url: "http://x.com?a=1" });
  });
});

describe("buildQueryString", () => {
  it("builds query string", () => {
    expect(buildQueryString({ a: "1", b: 2 })).toBe("?a=1&b=2");
  });

  it("skips undefined", () => {
    expect(buildQueryString({ a: "1", b: undefined })).toBe("?a=1");
  });

  it("returns empty for no params", () => {
    expect(buildQueryString({})).toBe("");
  });
});
