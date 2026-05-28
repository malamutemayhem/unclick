import { afterEach, describe, expect, it, vi } from "vitest";
import {
  canUseTestPassRunPack,
  resolveTestPassRunActor,
  resolveTestPassTargetToken,
  resolveTestPassTargetVercelBypassSecret,
  withTestPassTargetToken,
  withTestPassTargetVercelBypassSecret,
} from "./testpass-run";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

function mockJsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("resolveTestPassRunActor", () => {
  it("scopes CI pack access to system packs or the actor's own packs", () => {
    expect(canUseTestPassRunPack({ owner_user_id: null }, "user-1")).toBe(true);
    expect(canUseTestPassRunPack({ owner_user_id: "user-1" }, "user-1")).toBe(true);
    expect(canUseTestPassRunPack({ owner_user_id: "user-2" }, "user-1")).toBe(false);
  });

  it("accepts active UnClick API keys linked to a user", async () => {
    const fetchMock = vi.fn(async () => mockJsonResponse(200, [
      { user_id: "user-123", is_active: true },
    ]));
    globalThis.fetch = fetchMock as typeof fetch;

    const result = await resolveTestPassRunActor(
      "https://example.supabase.co",
      "service-role",
      "uc_test_key",
    );

    expect(result).toEqual({ ok: true, actorUserId: "user-123", tokenKind: "api_key" });
    expect(String(fetchMock.mock.calls[0][0])).toContain("/rest/v1/api_keys?");
    expect(String(fetchMock.mock.calls[0][0])).toContain("key_hash=eq.");
  });

  it("explains inactive API keys", async () => {
    globalThis.fetch = vi.fn(async () => mockJsonResponse(200, [
      { user_id: "user-123", is_active: false },
    ])) as typeof fetch;

    const result = await resolveTestPassRunActor(
      "https://example.supabase.co",
      "service-role",
      "uc_inactive_key",
    );

    expect(result).toMatchObject({
      ok: false,
      status: 401,
      auth_reason: "api_key_inactive",
    });
  });

  it("explains unlinked API keys", async () => {
    globalThis.fetch = vi.fn(async () => mockJsonResponse(200, [
      { user_id: null, is_active: true },
    ])) as typeof fetch;

    const result = await resolveTestPassRunActor(
      "https://example.supabase.co",
      "service-role",
      "uc_unlinked_key",
    );

    expect(result).toMatchObject({
      ok: false,
      status: 401,
      auth_reason: "api_key_unlinked",
    });
  });

  it("still accepts Supabase session tokens", async () => {
    globalThis.fetch = vi.fn(async () => mockJsonResponse(200, { id: "session-user" })) as typeof fetch;

    const result = await resolveTestPassRunActor(
      "https://example.supabase.co",
      "service-role",
      "jwt-token",
    );

    expect(result).toEqual({ ok: true, actorUserId: "session-user", tokenKind: "session" });
  });
});

describe("TestPass target token forwarding", () => {
  const originalToken = process.env.TESTPASS_TOKEN;
  const originalVercelBypass = process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET;
  const originalAutomationBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

  afterEach(() => {
    if (originalToken === undefined) delete process.env.TESTPASS_TOKEN;
    else process.env.TESTPASS_TOKEN = originalToken;
    if (originalVercelBypass === undefined) delete process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET;
    else process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET = originalVercelBypass;
    if (originalAutomationBypass === undefined) delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    else process.env.VERCEL_AUTOMATION_BYPASS_SECRET = originalAutomationBypass;
  });

  it("uses the inbound UnClick API key for PR smoke target calls", () => {
    expect(resolveTestPassTargetToken({
      incomingToken: "uc_ci_key",
      isCron: false,
      configuredToken: "uc_stale_env_key",
    })).toBe("uc_ci_key");
  });

  it("does not treat cron secrets or browser sessions as MCP target API keys", () => {
    expect(resolveTestPassTargetToken({
      incomingToken: "cron-secret",
      isCron: true,
      configuredToken: "uc_configured_target_key",
    })).toBe("uc_configured_target_key");

    expect(resolveTestPassTargetToken({
      incomingToken: "supabase.jwt.token",
      isCron: false,
      configuredToken: "uc_configured_target_key",
    })).toBe("uc_configured_target_key");
  });

  it("temporarily exposes the selected token to the TestPass dispatcher and restores it", async () => {
    process.env.TESTPASS_TOKEN = "uc_previous";

    const seen = await withTestPassTargetToken("uc_current", async () => process.env.TESTPASS_TOKEN);

    expect(seen).toBe("uc_current");
    expect(process.env.TESTPASS_TOKEN).toBe("uc_previous");
  });

  it("uses the explicit preview bypass secret before env fallbacks", () => {
    expect(resolveTestPassTargetVercelBypassSecret({
      inputSecret: " input-bypass ",
      configuredSecret: "configured-bypass",
      vercelAutomationSecret: "automation-bypass",
    })).toBe("input-bypass");
  });

  it("falls back to configured preview bypass secrets", () => {
    expect(resolveTestPassTargetVercelBypassSecret({
      inputSecret: "",
      configuredSecret: " configured-bypass ",
      vercelAutomationSecret: "automation-bypass",
    })).toBe("configured-bypass");

    expect(resolveTestPassTargetVercelBypassSecret({
      inputSecret: "",
      configuredSecret: "",
      vercelAutomationSecret: " automation-bypass ",
    })).toBe("automation-bypass");
  });

  it("temporarily exposes the preview bypass secret to the TestPass dispatcher and restores it", async () => {
    process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET = "previous-bypass";

    const seen = await withTestPassTargetVercelBypassSecret(
      "current-bypass",
      async () => process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET,
    );

    expect(seen).toBe("current-bypass");
    expect(process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET).toBe("previous-bypass");
  });
});
