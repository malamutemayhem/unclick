import { afterEach, describe, expect, it } from "vitest";
import { applyMcpRequestEnv, type ApiKeyContext } from "./mcp";

const ENV_KEYS = [
  "UNCLICK_API_KEY",
  "UNCLICK_API_KEY_HASH",
  "UNCLICK_TIER",
  "UNCLICK_USER_ID",
  "UNCLICK_ACCOUNT_EMAIL",
  "UNCLICK_MEMORY_QUOTA_EXEMPT",
] as const;

function clearMcpEnv(): void {
  for (const key of ENV_KEYS) delete process.env[key];
}

describe("applyMcpRequestEnv", () => {
  afterEach(clearMcpEnv);

  it("does not expose an unvalidated bearer token to MCP server code", () => {
    process.env.UNCLICK_API_KEY = "stale-key";
    process.env.UNCLICK_API_KEY_HASH = "stale-hash";

    applyMcpRequestEnv("invalid-or-wrong-purpose-token", null);

    expect(process.env.UNCLICK_API_KEY).toBeUndefined();
    expect(process.env.UNCLICK_API_KEY_HASH).toBeUndefined();
    expect(process.env.UNCLICK_TIER).toBeUndefined();
  });

  it("sets tenancy context only after key validation succeeds", () => {
    const ctx: ApiKeyContext = {
      api_key_hash: "hash-123",
      tier: "pro",
      user_id: "user-123",
      account_email: "chris@example.test",
      memory_quota_exempt: true,
    };

    applyMcpRequestEnv("uc_valid", ctx);

    expect(process.env.UNCLICK_API_KEY).toBe("uc_valid");
    expect(process.env.UNCLICK_API_KEY_HASH).toBe("hash-123");
    expect(process.env.UNCLICK_TIER).toBe("pro");
    expect(process.env.UNCLICK_USER_ID).toBe("user-123");
    expect(process.env.UNCLICK_ACCOUNT_EMAIL).toBe("chris@example.test");
    expect(process.env.UNCLICK_MEMORY_QUOTA_EXEMPT).toBe("true");
  });
});
