import { describe, expect, it } from "vitest";
import {
  classifyOperation,
  draftConnector,
  endpointKey,
} from "./connector-draft.js";
import type { Shape } from "./types.js";

function shape(partial: Partial<Shape>): Shape {
  return {
    method: "GET",
    host: "api.lu.ma",
    pathTemplate: "/event/{id}/guests",
    queryParams: [],
    requestHeaderNames: [],
    responseHeaderNames: [],
    ...partial,
  };
}

describe("classifyOperation", () => {
  it("treats GET/HEAD/OPTIONS as reads and the rest as writes", () => {
    expect(classifyOperation("get")).toBe("read");
    expect(classifyOperation("HEAD")).toBe("read");
    expect(classifyOperation("POST")).toBe("write");
    expect(classifyOperation("delete")).toBe("write");
  });
});

describe("endpointKey", () => {
  it("groups by method, host, and path template", () => {
    expect(endpointKey(shape({}))).toBe("GET api.lu.ma/event/{id}/guests");
  });
});

describe("draftConnector", () => {
  it("throws without shapes", () => {
    expect(() => draftConnector([])).toThrow();
  });

  it("merges response fields and marks partial fields optional", () => {
    const a = shape({
      responseSchema: {
        type: "object",
        fields: { name: { type: "string" }, count: { type: "number" } },
      },
    });
    const b = shape({
      responseSchema: {
        type: "object",
        fields: { name: { type: "string" } },
      },
    });
    const draft = draftConnector([a, b]);
    expect(draft.observationCount).toBe(2);
    expect(draft.responseSchema?.fields?.name).toEqual({ type: "string" });
    expect(draft.responseSchema?.fields?.count).toEqual({
      type: "number",
      optional: true,
    });
  });

  it("classifies a read as auto-promotable and not consent-gated", () => {
    const draft = draftConnector([shape({ method: "GET" })]);
    expect(draft.operation).toBe("read");
    expect(draft.autoPromotable).toBe(true);
    expect(draft.requiresConsent).toBe(false);
  });

  it("classifies a write as consent-gated and never auto-promotable", () => {
    const draft = draftConnector([shape({ method: "POST" })]);
    expect(draft.operation).toBe("write");
    expect(draft.autoPromotable).toBe(false);
    expect(draft.requiresConsent).toBe(true);
  });

  it("detects auth requirement from observed header names", () => {
    const withAuth = draftConnector([
      shape({ requestHeaderNames: ["authorization", "accept"] }),
    ]);
    const without = draftConnector([shape({ requestHeaderNames: ["accept"] })]);
    expect(withAuth.requiresAuthHeader).toBe(true);
    expect(without.requiresAuthHeader).toBe(false);
  });
});
