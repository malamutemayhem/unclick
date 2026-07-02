import { afterEach, describe, expect, it } from "vitest";
import { applyMcpRequestEnv, type ApiKeyContext } from "./mcp";

const ENV_KEYS = [
  "UNCLICK_API_KEY",
  "UNCLICK_API_KEY_HASH",
  "UNCLICK_TIER",
  "UNCLICK_USER_ID",
  "UNCLICK_ACCOUNT_EMAIL",
  "UNCLICK_MEMORY_QUOTA_EXEMPT",
  "UNCLICK_MCP_SESSION_TOKEN",
] as const;

function clearMcpEnv(): void {
  for (const key of ENV_KEYS) delete process.env[key];
}

describe("applyMcpRequestEnv", () => {
  afterEach(clearMcpEnv);

  it("does not expose an unvalidated bearer token to MCP server code", () => {
    process.env.UNCLICK_API_KEY = "stale-key";
    process.env.UNCLICK_API_KEY_HASH = "stale-hash";

    applyMcpRequestEnv("invalid-or-wrong-purpose-token", null, null);

    expect(process.env.UNCLICK_API_KEY).toBeUndefined();
    expect(process.env.UNCLICK_API_KEY_HASH).toBeUndefined();
    expect(process.env.UNCLICK_TIER).toBeUndefined();
  });

  it("sets tenancy context only after key validation succeeds", () => {
    const ctx: ApiKeyContext = {
      api_key_hash: "hash-123",
      tier: "pro",
      user_id: "user-123",
      account_email: "user@example.test",
      memory_quota_exempt: true,
    };

    applyMcpRequestEnv("uc_valid", ctx, null);

    expect(process.env.UNCLICK_API_KEY).toBe("uc_valid");
    expect(process.env.UNCLICK_API_KEY_HASH).toBe("hash-123");
    expect(process.env.UNCLICK_TIER).toBe("pro");
    expect(process.env.UNCLICK_USER_ID).toBe("user-123");
    expect(process.env.UNCLICK_ACCOUNT_EMAIL).toBe("user@example.test");
    expect(process.env.UNCLICK_MEMORY_QUOTA_EXEMPT).toBe("true");
    // The api-key path never carries a session token.
    expect(process.env.UNCLICK_MCP_SESSION_TOKEN).toBeUndefined();
  });

  it("sets the session token on a token-bearing login path", () => {
    const ctx: ApiKeyContext = {
      api_key_hash: "lane-123",
      tier: "free",
      user_id: "user-456",
      account_email: null,
      memory_quota_exempt: false,
    };

    // Login path: no plaintext api key, but a verifiable MCP OAuth token.
    applyMcpRequestEnv("", ctx, "mcp.oauth.session.token");

    // No plaintext key is exposed on the login path.
    expect(process.env.UNCLICK_API_KEY).toBeUndefined();
    // The session token IS exposed so vault-bridge can read server-scheme creds.
    expect(process.env.UNCLICK_MCP_SESSION_TOKEN).toBe("mcp.oauth.session.token");
    expect(process.env.UNCLICK_API_KEY_HASH).toBe("lane-123");
    expect(process.env.UNCLICK_USER_ID).toBe("user-456");
  });

  it("clears a stale session token on any request that does not set one", () => {
    // Warm serverless reuse: a prior login request left a token in the process.
    process.env.UNCLICK_MCP_SESSION_TOKEN = "leftover-token-from-prior-request";

    // A later api-key request (sessionToken = null) must wipe it exhaustively.
    const ctx: ApiKeyContext = {
      api_key_hash: "hash-789",
      tier: "free",
      user_id: "user-789",
      account_email: null,
      memory_quota_exempt: false,
    };
    applyMcpRequestEnv("uc_valid", ctx, null);

    expect(process.env.UNCLICK_MCP_SESSION_TOKEN).toBeUndefined();

    // And an unauthenticated handshake (no key, no ctx, no token) also clears it.
    process.env.UNCLICK_MCP_SESSION_TOKEN = "another-leftover";
    applyMcpRequestEnv("", null, null);
    expect(process.env.UNCLICK_MCP_SESSION_TOKEN).toBeUndefined();
  });
});
