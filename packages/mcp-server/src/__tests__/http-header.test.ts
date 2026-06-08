import { describe, it, expect } from "vitest";
import { HttpHeader } from "../http-header.js";

describe("HttpHeader", () => {
  it("parses content type with charset", () => {
    const result = HttpHeader.parseContentType("text/html; charset=utf-8");
    expect(result.mediaType).toBe("text/html");
    expect(result.params.charset).toBe("utf-8");
  });

  it("parses content type without params", () => {
    const result = HttpHeader.parseContentType("application/json");
    expect(result.mediaType).toBe("application/json");
    expect(Object.keys(result.params)).toHaveLength(0);
  });

  it("parses accept header with quality", () => {
    const result = HttpHeader.parseAccept("text/html, application/json;q=0.9, text/plain;q=0.5");
    expect(result).toHaveLength(3);
    expect(result[0].mediaType).toBe("text/html");
    expect(result[0].quality).toBe(1);
    expect(result[1].mediaType).toBe("application/json");
    expect(result[1].quality).toBe(0.9);
  });

  it("parses cache control directives", () => {
    const result = HttpHeader.parseCacheControl("max-age=3600, no-store, public");
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ directive: "max-age", value: 3600 });
    expect(result[1]).toEqual({ directive: "no-store" });
  });

  it("parses authorization header", () => {
    const result = HttpHeader.parseAuthorization("Bearer abc123");
    expect(result.scheme).toBe("Bearer");
    expect(result.credentials).toBe("abc123");
  });

  it("builds content type string", () => {
    const result = HttpHeader.buildContentType("text/html", { charset: "utf-8" });
    expect(result).toBe("text/html; charset=utf-8");
  });

  it("builds cache control string", () => {
    const result = HttpHeader.buildCacheControl([
      { directive: "max-age", value: 300 },
      { directive: "public" },
    ]);
    expect(result).toBe("max-age=300, public");
  });

  it("parses link header", () => {
    const result = HttpHeader.parseLinkHeader('<https://api.example.com/items?page=2>; rel="next"');
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://api.example.com/items?page=2");
    expect(result[0].rel).toBe("next");
  });

  it("parses set-cookie header", () => {
    const result = HttpHeader.parseSetCookie("session=abc123; Path=/; HttpOnly; Secure");
    expect(result.name).toBe("session");
    expect(result.value).toBe("abc123");
    expect(result.attributes.path).toBe("/");
    expect(result.attributes.httponly).toBe("true");
    expect(result.attributes.secure).toBe("true");
  });
});
