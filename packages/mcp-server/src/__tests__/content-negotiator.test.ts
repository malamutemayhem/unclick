import { describe, it, expect } from "vitest";
import { parseAccept, negotiate, negotiateLanguage, negotiateEncoding } from "../content-negotiator.js";

describe("parseAccept", () => {
  it("parses simple accept header", () => {
    const result = parseAccept("text/html, application/json");
    expect(result.length).toBe(2);
    expect(result[0].type).toBe("text");
    expect(result[0].subtype).toBe("html");
  });

  it("respects quality values", () => {
    const result = parseAccept("text/html;q=0.9, application/json;q=1.0");
    expect(result[0].subtype).toBe("json");
    expect(result[1].subtype).toBe("html");
  });

  it("handles wildcard", () => {
    const result = parseAccept("*/*");
    expect(result[0].type).toBe("*");
  });
});

describe("negotiate", () => {
  it("matches exact type", () => {
    expect(negotiate("application/json", ["text/html", "application/json"])).toBe("application/json");
  });

  it("matches wildcard subtype", () => {
    expect(negotiate("text/*", ["text/html", "application/json"])).toBe("text/html");
  });

  it("returns null for no match", () => {
    expect(negotiate("image/png", ["text/html", "application/json"])).toBeNull();
  });

  it("prefers higher quality", () => {
    expect(negotiate("text/html;q=0.5, application/json;q=1.0", ["text/html", "application/json"])).toBe("application/json");
  });
});

describe("negotiateLanguage", () => {
  it("matches exact language", () => {
    expect(negotiateLanguage("en-US", ["en-US", "fr"])).toBe("en-US");
  });

  it("falls back to prefix", () => {
    expect(negotiateLanguage("en", ["en-US", "fr"])).toBe("en-US");
  });

  it("returns null for no match", () => {
    expect(negotiateLanguage("de", ["en-US", "fr"])).toBeNull();
  });

  it("respects quality", () => {
    expect(negotiateLanguage("fr;q=0.5, en;q=1.0", ["fr", "en-US"])).toBe("en-US");
  });
});

describe("negotiateEncoding", () => {
  it("matches encoding", () => {
    expect(negotiateEncoding("gzip, deflate", ["gzip", "br"])).toBe("gzip");
  });

  it("returns null for no match", () => {
    expect(negotiateEncoding("br", ["gzip"])).toBeNull();
  });
});
