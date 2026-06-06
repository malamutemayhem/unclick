import { describe, expect, it } from "vitest";
import { resolveChannelStatusAuthOutcome } from "./memory-admin";

describe("admin_channel_status auth outcome", () => {
  it("authorizes a request with a resolved api_key hash", () => {
    expect(
      resolveChannelStatusAuthOutcome({ apiKeyHash: "deadbeef", hasValidSession: true }),
    ).toEqual({ kind: "authorized" });
  });

  it("authorizes on api_key hash even without a session", () => {
    expect(
      resolveChannelStatusAuthOutcome({ apiKeyHash: "deadbeef", hasValidSession: false }),
    ).toEqual({ kind: "authorized" });
  });

  it("returns a soft unconfigured state for a signed-in admin with no linked key", () => {
    expect(
      resolveChannelStatusAuthOutcome({ apiKeyHash: null, hasValidSession: true }),
    ).toEqual({ kind: "soft_unconfigured" });
  });

  it("keeps 401 for a genuinely unauthenticated caller", () => {
    expect(
      resolveChannelStatusAuthOutcome({ apiKeyHash: null, hasValidSession: false }),
    ).toEqual({ kind: "unauthorized" });
  });
});
