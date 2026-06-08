import { describe, it, expect } from "vitest";
import { HttpStatus } from "../http-status.js";

describe("HttpStatus", () => {
  it("gets status info", () => {
    const info = HttpStatus.getInfo(200);
    expect(info).not.toBeNull();
    expect(info!.phrase).toBe("OK");
    expect(info!.category).toBe("Success");
  });

  it("returns null for unknown status", () => {
    expect(HttpStatus.getInfo(999)).toBeNull();
  });

  it("gets phrase", () => {
    expect(HttpStatus.phrase(404)).toBe("Not Found");
    expect(HttpStatus.phrase(999)).toBe("Unknown");
  });

  it("categorizes status codes", () => {
    expect(HttpStatus.category(100)).toBe("Informational");
    expect(HttpStatus.category(200)).toBe("Success");
    expect(HttpStatus.category(301)).toBe("Redirection");
    expect(HttpStatus.category(400)).toBe("Client Error");
    expect(HttpStatus.category(500)).toBe("Server Error");
  });

  it("checks success", () => {
    expect(HttpStatus.isSuccess(200)).toBe(true);
    expect(HttpStatus.isSuccess(201)).toBe(true);
    expect(HttpStatus.isSuccess(404)).toBe(false);
  });

  it("checks redirect", () => {
    expect(HttpStatus.isRedirect(301)).toBe(true);
    expect(HttpStatus.isRedirect(200)).toBe(false);
  });

  it("checks client error", () => {
    expect(HttpStatus.isClientError(400)).toBe(true);
    expect(HttpStatus.isClientError(500)).toBe(false);
  });

  it("checks server error", () => {
    expect(HttpStatus.isServerError(500)).toBe(true);
    expect(HttpStatus.isServerError(400)).toBe(false);
  });

  it("checks retryable status", () => {
    expect(HttpStatus.isRetryable(429)).toBe(true);
    expect(HttpStatus.isRetryable(503)).toBe(true);
    expect(HttpStatus.isRetryable(404)).toBe(false);
  });

  it("lists all statuses", () => {
    const all = HttpStatus.list();
    expect(all.length).toBeGreaterThan(20);
  });

  it("filters by category", () => {
    const errors = HttpStatus.list("Client Error");
    expect(errors.every((s) => s.code >= 400 && s.code < 500)).toBe(true);
  });

  it("finds status by phrase", () => {
    expect(HttpStatus.byPhrase("Not Found")).toBe(404);
    expect(HttpStatus.byPhrase("Unknown Phrase")).toBeNull();
  });
});
