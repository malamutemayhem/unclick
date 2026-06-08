import { describe, it, expect } from "vitest";
import { URLBuilder, parseQuery, buildQuery } from "../url-builder.js";

describe("url-builder", () => {
  describe("URLBuilder", () => {
    it("builds base URL", () => {
      expect(new URLBuilder("https://api.example.com").build()).toBe("https://api.example.com");
    });

    it("strips trailing slash from base", () => {
      expect(new URLBuilder("https://api.example.com/").build()).toBe("https://api.example.com");
    });

    it("appends path segments", () => {
      const url = new URLBuilder("https://api.example.com").path("users", "123").build();
      expect(url).toBe("https://api.example.com/users/123");
    });

    it("adds query params", () => {
      const url = new URLBuilder("https://api.example.com")
        .param("page", 1)
        .param("limit", 10)
        .build();
      expect(url).toBe("https://api.example.com?page=1&limit=10");
    });

    it("adds params from object", () => {
      const url = new URLBuilder("https://api.example.com")
        .params({ q: "test", page: 1 })
        .build();
      expect(url).toContain("q=test");
      expect(url).toContain("page=1");
    });

    it("adds hash", () => {
      const url = new URLBuilder("https://api.example.com").hash("section").build();
      expect(url).toBe("https://api.example.com#section");
    });

    it("combines path, params, and hash", () => {
      const url = new URLBuilder("https://api.example.com")
        .path("docs")
        .param("v", 2)
        .hash("intro")
        .build();
      expect(url).toBe("https://api.example.com/docs?v=2#intro");
    });

    it("encodes special characters", () => {
      const url = new URLBuilder("https://api.example.com")
        .param("q", "hello world")
        .build();
      expect(url).toContain("q=hello%20world");
    });
  });

  describe("parseQuery", () => {
    it("parses query string", () => {
      expect(parseQuery("?a=1&b=2")).toEqual({ a: "1", b: "2" });
    });

    it("handles no leading ?", () => {
      expect(parseQuery("a=1")).toEqual({ a: "1" });
    });

    it("handles empty string", () => {
      expect(parseQuery("")).toEqual({});
    });

    it("decodes encoded values", () => {
      expect(parseQuery("q=hello%20world")).toEqual({ q: "hello world" });
    });
  });

  describe("buildQuery", () => {
    it("builds query string", () => {
      expect(buildQuery({ a: "1", b: "2" })).toBe("a=1&b=2");
    });

    it("encodes values", () => {
      expect(buildQuery({ q: "hello world" })).toBe("q=hello%20world");
    });
  });
});
