import { describe, expect, it } from "vitest";
import { resolveChannelStatusAuthOutcome } from "./memory-admin";

// Job 80b5c54a: stop /api/memory-admin?action=admin_channel_status from
// emitting a 401 on every 60s presence poll (AIChatPanel) when a signed-in
// admin simply has no linked api_key yet. 401 must remain ONLY for genuinely
// unauthenticated callers.
describe("admin_channel_status auth outcome", () => {
  it("authorizes a request with a resolved api_key hash", () => {
    expect(
      resolveChannelStatusAuthOutcome({ apiKeyHash: "deadbeef", hasValidSession: true }),
    ).toEqual({ kind: "authorized" });
  });

  it("authorizes on api_key hash even without a session (BYOD uc_ key path)", () => {
    expect(
      resolveChannelStatusAuthOutcome({ apiKeyHash: "deadbeef", hasValidSession: false }),
    ).toEqual({ kind: "authorized" });
  });

  it("returns a soft unconfigured state for a signed-in admin with no linked key", () => {
    // This is the every-minute-401 case before the fix.
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
