import { describe, it, expect } from "vitest";
import { normalizeError, isNormalizedError, errorSummary } from "../error-normalizer.js";
import type { NormalizedError } from "../error-normalizer.js";

describe("normalizeError", () => {
  it("passes through already-normalized errors", () => {
    const err: NormalizedError = { code: "TIMEOUT", message: "timed out", retriable: true };
    expect(normalizeError(err)).toBe(err);
  });

  it("normalizes a string to UNKNOWN", () => {
    const result = normalizeError("something broke");
    expect(result.code).toBe("UNKNOWN");
    expect(result.message).toBe("something broke");
    expect(result.retriable).toBe(false);
  });

  it("normalizes an { error } object", () => {
    const result = normalizeError({ error: "bad request" });
    expect(result.message).toBe("bad request");
  });

  it("classifies timeout errors", () => {
    const result = normalizeError(new Error("Request timeout after 30s"));
    expect(result.code).toBe("TIMEOUT");
    expect(result.retriable).toBe(true);
  });

  it("classifies AbortError", () => {
    const err = new Error("aborted");
    err.name = "AbortError";
    const result = normalizeError(err);
    expect(result.code).toBe("TIMEOUT");
    expect(result.retriable).toBe(true);
  });

  it("classifies network errors", () => {
    const result = normalizeError(new Error("ECONNRESET: connection reset"));
    expect(result.code).toBe("NETWORK");
    expect(result.retriable).toBe(true);
  });

  it("classifies ECONNREFUSED", () => {
    const result = normalizeError(new Error("connect ECONNREFUSED 127.0.0.1:3000"));
    expect(result.code).toBe("NETWORK");
  });

  it("classifies auth errors from message text", () => {
    const result = normalizeError(new Error("unauthorized access"));
    expect(result.code).toBe("AUTH_INVALID");
    expect(result.retriable).toBe(false);
  });

  it("classifies expired token errors", () => {
    const result = normalizeError(new Error("Token has expired"));
    expect(result.code).toBe("AUTH_EXPIRED");
    expect(result.retriable).toBe(false);
  });

  it("classifies HTTP 401 response-like objects", () => {
    const result = normalizeError({ status: 401, body: "Unauthorized" });
    expect(result.code).toBe("AUTH_INVALID");
    expect(result.upstream?.status).toBe(401);
  });

  it("classifies HTTP 403", () => {
    const result = normalizeError({ status: 403 });
    expect(result.code).toBe("PERMISSION");
  });

  it("classifies HTTP 404", () => {
    const result = normalizeError({ status: 404 });
    expect(result.code).toBe("NOT_FOUND");
  });

  it("classifies HTTP 429 with retry-after header", () => {
    const result = normalizeError({
      status: 429,
      headers: { get: (name: string) => name === "retry-after" ? "5" : null },
    });
    expect(result.code).toBe("RATE_LIMITED");
    expect(result.retriable).toBe(true);
    expect(result.retryAfterMs).toBe(5000);
  });

  it("classifies HTTP 500+", () => {
    const result = normalizeError({ status: 502 });
    expect(result.code).toBe("UPSTREAM");
    expect(result.retriable).toBe(true);
  });

  it("handles unknown types", () => {
    const result = normalizeError(42);
    expect(result.code).toBe("UNKNOWN");
    expect(result.message).toBe("42");
  });
});

describe("isNormalizedError", () => {
  it("returns true for valid shape", () => {
    expect(isNormalizedError({ code: "TIMEOUT", message: "x", retriable: true })).toBe(true);
  });

  it("returns false for missing fields", () => {
    expect(isNormalizedError({ code: "TIMEOUT" })).toBe(false);
    expect(isNormalizedError(null)).toBe(false);
    expect(isNormalizedError("string")).toBe(false);
  });
});

describe("errorSummary", () => {
  it("formats a basic error", () => {
    expect(errorSummary({ code: "TIMEOUT", message: "timed out", retriable: false }))
      .toBe("TIMEOUT - timed out");
  });

  it("includes retriable flag", () => {
    const summary = errorSummary({ code: "NETWORK", message: "ECONNRESET", retriable: true });
    expect(summary).toContain("(retriable)");
  });

  it("includes retry-after", () => {
    const summary = errorSummary({ code: "RATE_LIMITED", message: "slow down", retriable: true, retryAfterMs: 5000 });
    expect(summary).toContain("retry in 5s");
  });
});
