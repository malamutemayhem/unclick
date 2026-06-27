import { describe, it, expect } from "vitest";
import { buildHeaders, bearerHeaders, apiKeyHeaders, basicAuthHeaders } from "../header-builder.js";

describe("buildHeaders", () => {
  it("sets default user-agent", () => {
    const h = buildHeaders();
    expect(h["User-Agent"]).toBe("UnClick-MCP/1.0");
  });

  it("sets bearer auth", () => {
    const h = buildHeaders({ auth: { type: "bearer", token: "tok123" } });
    expect(h["Authorization"]).toBe("Bearer tok123");
  });

  it("sets basic auth", () => {
    const h = buildHeaders({ auth: { type: "basic", username: "user", password: "pass" } });
    expect(h["Authorization"]).toMatch(/^Basic /);
  });

  it("sets API key auth in custom header", () => {
    const h = buildHeaders({ auth: { type: "apikey", headerName: "X-API-Key", value: "abc" } });
    expect(h["X-API-Key"]).toBe("abc");
  });

  it("sets custom auth headers", () => {
    const h = buildHeaders({ auth: { type: "custom", headers: { "X-Token": "foo", "X-Secret": "bar" } } });
    expect(h["X-Token"]).toBe("foo");
    expect(h["X-Secret"]).toBe("bar");
  });

  it("sets content-type and accept", () => {
    const h = buildHeaders({ contentType: "application/json", accept: "text/plain" });
    expect(h["Content-Type"]).toBe("application/json");
    expect(h["Accept"]).toBe("text/plain");
  });

  it("merges extra headers", () => {
    const h = buildHeaders({ extra: { "X-Custom": "val" } });
    expect(h["X-Custom"]).toBe("val");
  });

  it("allows custom user-agent", () => {
    const h = buildHeaders({ userAgent: "MyApp/2.0" });
    expect(h["User-Agent"]).toBe("MyApp/2.0");
  });
});

describe("bearerHeaders", () => {
  it("builds complete bearer header set", () => {
    const h = bearerHeaders("mytoken");
    expect(h["Authorization"]).toBe("Bearer mytoken");
    expect(h["Content-Type"]).toBe("application/json");
    expect(h["Accept"]).toBe("application/json");
  });

  it("includes extra headers", () => {
    const h = bearerHeaders("tok", { "X-Org": "123" });
    expect(h["X-Org"]).toBe("123");
  });
});

describe("apiKeyHeaders", () => {
  it("builds API key header set", () => {
    const h = apiKeyHeaders("X-API-Key", "sk_123");
    expect(h["X-API-Key"]).toBe("sk_123");
    expect(h["Content-Type"]).toBe("application/json");
  });
});

describe("basicAuthHeaders", () => {
  it("builds basic auth header set", () => {
    const h = basicAuthHeaders("admin", "secret");
    expect(h["Authorization"]).toMatch(/^Basic /);
    expect(h["Content-Type"]).toBe("application/json");
  });
});
