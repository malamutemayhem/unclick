import { describe, it, expect } from "vitest";
import { UrlBuilder, parseQueryString } from "../url-builder.js";

describe("url-builder", () => {
  it("builds simple URL", () => {
    const url = new UrlBuilder("https://api.example.com").build();
    expect(url).toBe("https://api.example.com");
  });

  it("appends path segments", () => {
    const url = new UrlBuilder("https://api.example.com")
      .path("users")
      .path("123")
      .build();
    expect(url).toBe("https://api.example.com/users/123");
  });

  it("encodes path segments", () => {
    const url = new UrlBuilder("https://example.com")
      .path("hello world")
      .build();
    expect(url).toBe("https://example.com/hello%20world");
  });

  it("rawPath skips encoding", () => {
    const url = new UrlBuilder("https://example.com")
      .rawPath("v1/users")
      .build();
    expect(url).toBe("https://example.com/v1/users");
  });

  it("adds query parameters", () => {
    const url = new UrlBuilder("https://api.example.com")
      .query("page", "1")
      .query("limit", 20)
      .build();
    expect(url).toBe("https://api.example.com?page=1&limit=20");
  });

  it("query skips undefined values", () => {
    const url = new UrlBuilder("https://example.com")
      .query("a", "1")
      .query("b", undefined)
      .build();
    expect(url).toBe("https://example.com?a=1");
  });

  it("queryIf conditionally adds", () => {
    const url = new UrlBuilder("https://example.com")
      .queryIf(true, "yes", "1")
      .queryIf(false, "no", "2")
      .build();
    expect(url).toBe("https://example.com?yes=1");
  });

  it("adds hash fragment", () => {
    const url = new UrlBuilder("https://example.com")
      .hash("section")
      .build();
    expect(url).toBe("https://example.com#section");
  });

  it("strips trailing slash from base", () => {
    const url = new UrlBuilder("https://example.com/")
      .path("test")
      .build();
    expect(url).toBe("https://example.com/test");
  });

  it("parseQueryString parses params", () => {
    expect(parseQueryString("?a=1&b=hello")).toEqual({ a: "1", b: "hello" });
    expect(parseQueryString("key=value")).toEqual({ key: "value" });
    expect(parseQueryString("")).toEqual({});
  });
});
