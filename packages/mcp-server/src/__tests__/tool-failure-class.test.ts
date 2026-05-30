import { describe, expect, it } from "vitest";

import { classifyFailure } from "../tool-failure-class.js";

describe("classifyFailure", () => {
  it("flags upstream API errors as owner-actionable", () => {
    const c = classifyFailure("weather_current: HTTP 503 service unavailable");
    expect(c.failureClass).toBe("upstream");
    expect(c.ownerActionable).toBe(true);
  });

  it("flags our own exceptions as tool_bug (critical)", () => {
    const c = classifyFailure("foo_tool: Cannot read properties of undefined (reading 'id')");
    expect(c.failureClass).toBe("tool_bug");
    expect(c.ownerActionable).toBe(true);
    expect(c.severity).toBe("critical");
  });

  it("treats auth problems as user-side config", () => {
    const c = classifyFailure("stripe_charges: HTTP 401 unauthorized");
    expect(c.failureClass).toBe("auth_config");
    expect(c.ownerActionable).toBe(false);
  });

  it("treats timeouts and rate limits as transient", () => {
    expect(classifyFailure("x: request timed out").failureClass).toBe("transient");
    expect(classifyFailure("y: 429 rate limit exceeded").failureClass).toBe("transient");
  });

  it("treats missing args as usage", () => {
    const c = classifyFailure("ptv_departures: stop_id is required.");
    expect(c.failureClass).toBe("usage");
    expect(c.ownerActionable).toBe(false);
  });

  it("defaults unknown failures to owner-actionable so nothing is missed", () => {
    const c = classifyFailure("weird_tool: something went sideways");
    expect(c.failureClass).toBe("unknown");
    expect(c.ownerActionable).toBe(true);
  });
});
