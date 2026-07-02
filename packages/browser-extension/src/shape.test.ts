import { describe, expect, it } from "vitest";
import { extractShape, inferSchema, looksLikeId, templatePath } from "./shape.js";
import type { CapturedExchange } from "./types.js";

describe("looksLikeId", () => {
  it("flags numeric, uuid, hex, and opaque ids", () => {
    expect(looksLikeId("998877")).toBe(true);
    expect(looksLikeId("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(looksLikeId("a1b2c3d4e5f60718")).toBe(true);
    expect(looksLikeId("evt-9f8a7b6c5d4e3f2a1b0c")).toBe(true);
  });

  it("keeps static segments", () => {
    expect(looksLikeId("event")).toBe(false);
    expect(looksLikeId("v1")).toBe(false);
    expect(looksLikeId("guests")).toBe(false);
  });
});

describe("templatePath", () => {
  it("templates id-like segments to {id}", () => {
    expect(templatePath("/event/998877/guests")).toBe("/event/{id}/guests");
    expect(templatePath("/api/v1/users/550e8400-e29b-41d4-a716-446655440000")).toBe(
      "/api/v1/users/{id}",
    );
  });
});

describe("inferSchema", () => {
  it("returns types only, never values", () => {
    const schema = inferSchema({ name: "Alice", age: 30, ok: true, tags: ["x"] });
    expect(schema).toEqual({
      type: "object",
      fields: {
        age: { type: "number" },
        name: { type: "string" },
        ok: { type: "boolean" },
        tags: { type: "array", items: { type: "string" } },
      },
    });
  });

  it("collapses id-keyed maps so key values do not leak", () => {
    const schema = inferSchema({
      "12345": { title: "secret-a" },
      "67890": { title: "secret-b" },
    });
    expect(schema.type).toBe("object");
    expect(schema.keyTemplate).toBe("{id}");
    expect(schema.items).toEqual({ type: "object", fields: { title: { type: "string" } } });
    expect(JSON.stringify(schema)).not.toContain("12345");
    expect(JSON.stringify(schema)).not.toContain("secret-a");
  });
});

describe("extractShape", () => {
  const exchange: CapturedExchange = {
    method: "get",
    url: "https://api.lu.ma/event/998877/guests?email=alice@example.com&token=SUPERSECRET",
    requestHeaders: {
      Authorization: "Bearer XYZ.TOKEN.value",
      Cookie: "session=abc123",
      Accept: "application/json",
    },
    requestBody: JSON.stringify({ password: "hunter2", card: "4111111111111111" }),
    status: 200,
    responseHeaders: { "Content-Type": "application/json" },
    responseBody: {
      user: { name: "Alice", ssn: "123-45-6789" },
      items: [{ id: 1, title: "Widget" }],
    },
  };

  it("keeps structure: method, host, templated path, query names", () => {
    const shape = extractShape(exchange);
    expect(shape.method).toBe("GET");
    expect(shape.host).toBe("api.lu.ma");
    expect(shape.pathTemplate).toBe("/event/{id}/guests");
    expect(shape.queryParams).toEqual(["email", "token"]);
    expect(shape.statusClass).toBe("2xx");
  });

  it("keeps header names but never header values", () => {
    const shape = extractShape(exchange);
    expect(shape.requestHeaderNames).toContain("authorization");
    expect(shape.responseHeaderNames).toContain("content-type");
  });

  it("infers response structure as types only", () => {
    const shape = extractShape(exchange);
    expect(shape.responseSchema).toEqual({
      type: "object",
      fields: {
        items: {
          type: "array",
          items: {
            type: "object",
            fields: { id: { type: "number" }, title: { type: "string" } },
          },
        },
        user: {
          type: "object",
          fields: { name: { type: "string" }, ssn: { type: "string" } },
        },
      },
    });
  });

  it("CANARY: no captured value survives anywhere in the shape", () => {
    const serialized = JSON.stringify(extractShape(exchange));
    const secrets = [
      "alice@example.com",
      "SUPERSECRET",
      "Bearer",
      "XYZ.TOKEN.value",
      "session=abc123",
      "abc123",
      "hunter2",
      "4111111111111111",
      "Alice",
      "123-45-6789",
      "Widget",
      "998877",
    ];
    for (const secret of secrets) {
      expect(serialized).not.toContain(secret);
    }
  });

  it("strips form-encoded bodies to key names with no values", () => {
    const shape = extractShape({
      method: "POST",
      url: "https://example.com/login",
      requestBody: "username=bob&password=hunter2",
    });
    expect(shape.requestSchema).toEqual({
      type: "object",
      fields: { password: { type: "string" }, username: { type: "string" } },
    });
    expect(JSON.stringify(shape)).not.toContain("bob");
    expect(JSON.stringify(shape)).not.toContain("hunter2");
  });

  it("reduces opaque non-JSON bodies to a placeholder", () => {
    const shape = extractShape({
      method: "POST",
      url: "https://example.com/upload",
      requestBody: "this is a private note about my health",
    });
    expect(shape.requestSchema).toEqual({ type: "string" });
    expect(JSON.stringify(shape)).not.toContain("health");
  });
});
