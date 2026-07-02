import { describe, expect, it } from "vitest";
import { describeRedaction } from "./redaction-report.js";
import type { CapturedExchange } from "./types.js";

const exchange: CapturedExchange = {
  method: "GET",
  url: "https://api.lu.ma/event/998877/guests?email=alice@example.com&token=SUPERSECRET",
  requestHeaders: { Authorization: "Bearer XYZ", Accept: "application/json" },
  status: 200,
  responseHeaders: { "Content-Type": "application/json" },
  responseBody: { user: { name: "Alice", ssn: "123-45-6789" }, items: [{ id: 1 }] },
};

describe("describeRedaction", () => {
  it("reports kept names and counts dropped values", () => {
    const report = describeRedaction(exchange);
    expect(report.pathTemplated).toBe(true);
    expect(report.queryParamsKept).toEqual(["email", "token"]);
    expect(report.requestHeadersKept).toContain("authorization");
    expect(report.responseHeadersKept).toContain("content-type");
    expect(report.bodyFieldsKept).toContain("response.user.name");
    expect(report.valuesDropped).toBeGreaterThan(0);
  });

  it("CANARY: the report itself contains no captured values", () => {
    const serialized = JSON.stringify(describeRedaction(exchange));
    for (const secret of [
      "alice@example.com",
      "SUPERSECRET",
      "Bearer",
      "XYZ",
      "Alice",
      "123-45-6789",
      "998877",
    ]) {
      expect(serialized).not.toContain(secret);
    }
  });
});
