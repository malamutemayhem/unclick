import { describe, it, expect, beforeEach } from "vitest";
import { validateResponse, shape, logDrift, clearDriftLog } from "../response-validator.js";

describe("validateResponse", () => {
  it("passes valid data", () => {
    const schema = shape("user", { id: "number", name: "string" });
    const result = validateResponse({ id: 1, name: "Alice" }, schema);
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("fails on missing required field", () => {
    const schema = shape("user", { id: "number", name: "string" });
    const result = validateResponse({ id: 1 }, schema);
    expect(result.valid).toBe(false);
    expect(result.issues[0].field).toBe("name");
    expect(result.issues[0].actual).toBe("missing");
  });

  it("fails on wrong type", () => {
    const schema = shape("user", { id: "number", name: "string" });
    const result = validateResponse({ id: "not-a-number", name: "Alice" }, schema);
    expect(result.valid).toBe(false);
    expect(result.issues[0].field).toBe("id");
    expect(result.issues[0].expected).toBe("number");
    expect(result.issues[0].actual).toBe("string");
  });

  it("handles nested paths", () => {
    const schema = shape("repo", { "owner.login": "string", "owner.id": "number" });
    const result = validateResponse({ owner: { login: "alice", id: 42 } }, schema);
    expect(result.valid).toBe(true);
  });

  it("fails on null root", () => {
    const schema = shape("any", { id: "number" });
    const result = validateResponse(null, schema);
    expect(result.valid).toBe(false);
    expect(result.issues[0].field).toBe("(root)");
  });

  it("skips optional missing fields", () => {
    const schema = {
      name: "user",
      fields: [
        { path: "id", type: "number" as const, required: true },
        { path: "bio", type: "string" as const, required: false },
      ],
    };
    const result = validateResponse({ id: 1 }, schema);
    expect(result.valid).toBe(true);
  });

  it("validates arrays", () => {
    const schema = shape("list", { items: "array" });
    expect(validateResponse({ items: [1, 2, 3] }, schema).valid).toBe(true);
    expect(validateResponse({ items: "not-array" }, schema).valid).toBe(false);
  });

  it("accepts 'any' type for any value", () => {
    const schema = shape("flexible", { data: "any" });
    expect(validateResponse({ data: 42 }, schema).valid).toBe(true);
    expect(validateResponse({ data: "str" }, schema).valid).toBe(true);
    expect(validateResponse({ data: [1] }, schema).valid).toBe(true);
  });
});

describe("shape builder", () => {
  it("builds a schema from simple field map", () => {
    const s = shape("test", { id: "number", name: "string" });
    expect(s.name).toBe("test");
    expect(s.fields).toHaveLength(2);
    expect(s.fields[0].required).toBe(true);
  });

  it("supports explicit required flag", () => {
    const s = shape("test", { id: "number", bio: { type: "string", required: false } });
    expect(s.fields[1].required).toBe(false);
  });
});

describe("logDrift", () => {
  beforeEach(() => clearDriftLog());

  it("logs first occurrence", () => {
    expect(logDrift("user", [{ field: "id", expected: "number", actual: "string" }])).toBe(true);
  });

  it("deduplicates same drift", () => {
    const issues = [{ field: "id", expected: "number", actual: "string" }];
    logDrift("user", issues);
    expect(logDrift("user", issues)).toBe(false);
  });

  it("logs different drifts separately", () => {
    logDrift("user", [{ field: "id", expected: "number", actual: "string" }]);
    expect(logDrift("user", [{ field: "name", expected: "string", actual: "number" }])).toBe(true);
  });
});
