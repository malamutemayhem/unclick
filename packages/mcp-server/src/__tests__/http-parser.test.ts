import { describe, it, expect } from "vitest";
import { parseRequest, parseResponse, buildRequest, buildResponse, getStatusText, URLParser } from "../http-parser.js";

describe("parseRequest", () => {
  it("parses GET request", () => {
    const raw = "GET /index.html HTTP/1.1\r\nHost: example.com\r\n\r\n";
    const req = parseRequest(raw);
    expect(req).not.toBeNull();
    expect(req!.method).toBe("GET");
    expect(req!.path).toBe("/index.html");
    expect(req!.headers.get("host")).toBe("example.com");
  });

  it("parses query parameters", () => {
    const raw = "GET /search?q=hello&page=2 HTTP/1.1\r\n\r\n";
    const req = parseRequest(raw);
    expect(req!.queryParams.get("q")).toBe("hello");
    expect(req!.queryParams.get("page")).toBe("2");
  });

  it("parses POST with body", () => {
    const raw = "POST /api/data HTTP/1.1\r\nContent-Type: application/json\r\n\r\n{\"key\":\"val\"}";
    const req = parseRequest(raw);
    expect(req!.method).toBe("POST");
    expect(req!.body).toBe("{\"key\":\"val\"}");
  });

  it("returns null for invalid input", () => {
    expect(parseRequest("")).toBeNull();
    expect(parseRequest("INVALID")).toBeNull();
  });
});

describe("parseResponse", () => {
  it("parses 200 OK response", () => {
    const raw = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html></html>";
    const res = parseResponse(raw);
    expect(res).not.toBeNull();
    expect(res!.statusCode).toBe(200);
    expect(res!.statusText).toBe("OK");
    expect(res!.body).toBe("<html></html>");
  });

  it("parses headers case-insensitively", () => {
    const raw = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n";
    const res = parseResponse(raw);
    expect(res!.headers.get("content-type")).toBe("text/plain");
  });
});

describe("buildRequest", () => {
  it("builds valid HTTP request", () => {
    const raw = buildRequest("GET", "/api/data", { Host: "example.com" });
    expect(raw).toContain("GET /api/data HTTP/1.1");
    expect(raw).toContain("Host: example.com");
  });

  it("adds content-length for body", () => {
    const raw = buildRequest("POST", "/submit", {}, "hello");
    expect(raw).toContain("Content-Length: 5");
    expect(raw).toContain("hello");
  });
});

describe("buildResponse", () => {
  it("builds valid HTTP response", () => {
    const raw = buildResponse(404, "Not Found", {}, "");
    expect(raw).toContain("HTTP/1.1 404 Not Found");
  });
});

describe("getStatusText", () => {
  it("returns known status texts", () => {
    expect(getStatusText(200)).toBe("OK");
    expect(getStatusText(404)).toBe("Not Found");
    expect(getStatusText(500)).toBe("Internal Server Error");
  });

  it("returns Unknown for unrecognized codes", () => {
    expect(getStatusText(999)).toBe("Unknown");
  });
});

describe("URLParser", () => {
  it("parses full URL", () => {
    const url = new URLParser("https://example.com:8443/path/to/resource?key=val#section");
    expect(url.protocol).toBe("https");
    expect(url.host).toBe("example.com");
    expect(url.port).toBe(8443);
    expect(url.path).toBe("/path/to/resource");
    expect(url.query.get("key")).toBe("val");
    expect(url.fragment).toBe("section");
  });

  it("uses default ports", () => {
    expect(new URLParser("http://example.com/").port).toBe(80);
    expect(new URLParser("https://example.com/").port).toBe(443);
  });

  it("toString reconstructs URL", () => {
    const url = new URLParser("https://example.com/path?a=1#frag");
    const str = url.toString();
    expect(str).toContain("https://example.com/path");
    expect(str).toContain("a=1");
    expect(str).toContain("#frag");
  });
});
