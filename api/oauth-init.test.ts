import { describe, expect, it, vi } from "vitest";
import handler from "./oauth-init.js";

function createResponse() {
  const headers = new Map<string, string | string[]>();
  let statusCode = 200;
  let payload: unknown;

  return {
    res: {
      setHeader(name: string, value: string | string[]) {
        headers.set(name, value);
        return this;
      },
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(value: unknown) {
        payload = value;
        return this;
      },
    },
    get statusCode() {
      return statusCode;
    },
    get payload() {
      return payload;
    },
    get headers() {
      return headers;
    },
  };
}

describe("oauth init", () => {
  it("returns the registered callback URI and stores the account key in a short-lived cookie", async () => {
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
    process.env.GITHUB_CLIENT_SECRET = "github-secret";
    process.env.GITHUB_REDIRECT_URI = "https://unclick.world/api/oauth-callback";

    try {
      const response = createResponse();
      await handler(
        {
          method: "POST",
          body: { platform: "github", api_key: "uc_test_account_key" },
        } as never,
        response.res as never
      );

      expect(response.statusCode).toBe(200);
      expect(response.payload).toMatchObject({
        success: true,
        redirect_uri: "https://unclick.world/api/oauth-callback",
      });
      expect(String(response.headers.get("Set-Cookie"))).toContain("Path=/api/oauth-callback");
      expect(String(response.headers.get("Set-Cookie"))).toContain("HttpOnly");
      expect(String(response.headers.get("Set-Cookie"))).toContain("SameSite=Lax");
      expect(String(response.headers.get("Set-Cookie"))).not.toContain("/connect/github");
    } finally {
      process.env.GITHUB_CLIENT_SECRET = previousSecret;
      process.env.GITHUB_REDIRECT_URI = previousRedirect;
    }
  });

  it("normalizes the stale production GitHub redirect URI to the server callback", async () => {
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
    process.env.GITHUB_CLIENT_SECRET = "github-secret";
    process.env.GITHUB_REDIRECT_URI = "https://unclick.world/connect/github";

    try {
      const response = createResponse();
      await handler(
        {
          method: "POST",
          body: { platform: "github", api_key: "uc_test_account_key" },
        } as never,
        response.res as never
      );

      expect(response.statusCode).toBe(200);
      expect(response.payload).toMatchObject({
        success: true,
        redirect_uri: "https://unclick.world/api/oauth-callback",
      });
    } finally {
      process.env.GITHUB_CLIENT_SECRET = previousSecret;
      process.env.GITHUB_REDIRECT_URI = previousRedirect;
    }
  });

  it("starts Higgsfield MCP OAuth with dynamic registration and PKCE", async () => {
    const previousSigningSecret = process.env.MCP_OAUTH_SIGNING_SECRET;
    process.env.MCP_OAUTH_SIGNING_SECRET = "oauth-state-secret";
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ client_id: "hf-client-123" }),
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    try {
      const response = createResponse();
      await handler(
        {
          method: "POST",
          headers: { origin: "https://unclick.world" },
          body: { platform: "higgsfield", api_key: "uc_test_account_key" },
        } as never,
        response.res as never
      );

      expect(response.statusCode).toBe(200);
      expect(response.payload).toMatchObject({
        success: true,
        redirect_uri: "https://unclick.world/api/oauth-callback",
      });
      const payload = response.payload as { authorization_url?: string };
      expect(payload.authorization_url).toContain("https://mcp.higgsfield.ai/oauth2/authorize");
      expect(payload.authorization_url).toContain("client_id=hf-client-123");
      expect(payload.authorization_url).toContain("code_challenge=");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://mcp.higgsfield.ai/oauth2/register",
        expect.objectContaining({ method: "POST" }),
      );
      const cookieHeader = response.headers.get("Set-Cookie");
      expect(Array.isArray(cookieHeader) ? cookieHeader.join(";") : String(cookieHeader)).toContain("unclick_higgsfield_mcp_oauth");
      expect(Array.isArray(cookieHeader) ? cookieHeader.join(";") : String(cookieHeader)).toContain("HttpOnly");
    } finally {
      process.env.MCP_OAUTH_SIGNING_SECRET = previousSigningSecret;
      vi.unstubAllGlobals();
    }
  });
});
