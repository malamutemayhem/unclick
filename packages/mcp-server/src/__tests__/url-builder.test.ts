import { describe, it, expect } from "vitest";
import { URLBuilder, parseQueryString, buildQueryString } from "../url-builder.js";

describe("URLBuilder", () => {
  it("builds base URL", () => {
    expect(new URLBuilder("https://api.example.com").toString()).toBe("https://api.example.com");
  });

  it("appends path segments", () => {
    const url = new URLBuilder("https://api.example.com")
      .path("users", "123")
      .toString();
    expect(url).toBe("https://api.example.com/users/123");
  });

  it("encodes path segments", () => {
    const url = new URLBuilder("https://example.com")
      .path("hello world")
      .toString();
    expect(url).toContain("hello%20world");
  });

  it("rawPath skips encoding", () => {
    const url = new URLBuilder("https://example.com")
      .rawPath("v1/users")
      .toString();
    expect(url).toBe("https://example.com/v1/users");
  });

  it("adds query params", () => {
    const url = new URLBuilder("https://example.com")
      .query("page", 1)
      .query("limit", 10)
      .toString();
    expect(url).toBe("https://example.com?page=1&limit=10");
  });

  it("queryIf conditional", () => {
    const url = new URLBuilder("https://example.com")
      .queryIf(true, "a", 1)
      .queryIf(false, "b", 2)
      .toString();
    expect(url).toContain("a=1");
    expect(url).not.toContain("b=2");
  });

  it("adds hash", () => {
    const url = new URLBuilder("https://example.com")
      .hash("section")
      .toString();
    expect(url).toBe("https://example.com#section");
  });

  it("clone is independent", () => {
    const base = new URLBuilder("https://example.com").query("a", 1);
    const copy = base.clone().query("b", 2);
    expect(base.toString()).not.toContain("b=2");
    expect(copy.toString()).toContain("b=2");
  });

  it("strips trailing slash from base", () => {
    expect(new URLBuilder("https://example.com/").path("x").toString()).toBe("https://example.com/x");
  });
});

describe("parseQueryString", () => {
  it("parses query string", () => {
    expect(parseQueryString("?a=1&b=hello")).toEqual({ a: "1", b: "hello" });
  });

  it("handles no leading ?", () => {
    expect(parseQueryString("x=1")).toEqual({ x: "1" });
  });

  it("returns empty for empty string", () => {
    expect(parseQueryString("")).toEqual({});
  });
});

describe("buildQueryString", () => {
  it("builds from object", () => {
    expect(buildQueryString({ a: "1", b: true })).toBe("a=1&b=true");
  });
});
