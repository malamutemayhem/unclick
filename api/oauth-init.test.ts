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

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

describe("oauth init", () => {
  it("returns the registered callback URI and stores the account key in a short-lived cookie", async () => {
    const previousClientId = process.env.GITHUB_CLIENT_ID;
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
    process.env.GITHUB_CLIENT_ID = "github-client";
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
        client_id: "github-client",
      });
      expect(String(response.headers.get("Set-Cookie"))).toContain("Path=/api/oauth-callback");
      expect(String(response.headers.get("Set-Cookie"))).toContain("HttpOnly");
      expect(String(response.headers.get("Set-Cookie"))).toContain("SameSite=Lax");
      expect(String(response.headers.get("Set-Cookie"))).not.toContain("/connect/github");
    } finally {
      restoreEnv("GITHUB_CLIENT_ID", previousClientId);
      restoreEnv("GITHUB_CLIENT_SECRET", previousSecret);
      restoreEnv("GITHUB_REDIRECT_URI", previousRedirect);
    }
  });

  it("normalizes the stale production GitHub redirect URI to the server callback", async () => {
    const previousClientId = process.env.GITHUB_CLIENT_ID;
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
    process.env.GITHUB_CLIENT_ID = "github-client";
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
      restoreEnv("GITHUB_CLIENT_ID", previousClientId);
      restoreEnv("GITHUB_CLIENT_SECRET", previousSecret);
      restoreEnv("GITHUB_REDIRECT_URI", previousRedirect);
    }
  });

  it("starts Vercel and Supabase sign-in with PKCE challenge data", async () => {
    const previous = {
      VERCEL_CLIENT_ID: process.env.VERCEL_CLIENT_ID,
      VERCEL_CLIENT_SECRET: process.env.VERCEL_CLIENT_SECRET,
      VERCEL_REDIRECT_URI: process.env.VERCEL_REDIRECT_URI,
      SUPABASE_OAUTH_CLIENT_ID: process.env.SUPABASE_OAUTH_CLIENT_ID,
      SUPABASE_OAUTH_CLIENT_SECRET: process.env.SUPABASE_OAUTH_CLIENT_SECRET,
      SUPABASE_OAUTH_REDIRECT_URI: process.env.SUPABASE_OAUTH_REDIRECT_URI,
    };
    process.env.VERCEL_CLIENT_ID = "vercel-client";
    process.env.VERCEL_CLIENT_SECRET = "vercel-secret";
    process.env.VERCEL_REDIRECT_URI = "https://unclick.world/api/oauth-callback";
    process.env.SUPABASE_OAUTH_CLIENT_ID = "supabase-client";
    process.env.SUPABASE_OAUTH_CLIENT_SECRET = "supabase-secret";
    process.env.SUPABASE_OAUTH_REDIRECT_URI = "https://unclick.world/api/oauth-callback";

    try {
      for (const platform of ["vercel", "supabase"]) {
        const response = createResponse();
        await handler(
          {
            method: "POST",
            body: { platform, api_key: "uc_test_account_key" },
          } as never,
          response.res as never
        );

        expect(response.statusCode).toBe(200);
        expect(response.payload).toMatchObject({
          success: true,
          redirect_uri: "https://unclick.world/api/oauth-callback",
          client_id: `${platform}-client`,
          code_challenge_method: "S256",
        });
        expect((response.payload as { code_challenge?: string }).code_challenge).toMatch(/^[A-Za-z0-9_-]+$/);
        expect(String(response.headers.get("Set-Cookie"))).toContain("unclick_oauth_pkce_verifier");
      }
    } finally {
      restoreEnv("VERCEL_CLIENT_ID", previous.VERCEL_CLIENT_ID);
      restoreEnv("VERCEL_CLIENT_SECRET", previous.VERCEL_CLIENT_SECRET);
      restoreEnv("VERCEL_REDIRECT_URI", previous.VERCEL_REDIRECT_URI);
      restoreEnv("SUPABASE_OAUTH_CLIENT_ID", previous.SUPABASE_OAUTH_CLIENT_ID);
      restoreEnv("SUPABASE_OAUTH_CLIENT_SECRET", previous.SUPABASE_OAUTH_CLIENT_SECRET);
      restoreEnv("SUPABASE_OAUTH_REDIRECT_URI", previous.SUPABASE_OAUTH_REDIRECT_URI);
    }
  });

  it("returns a user-safe pending setup response when provider OAuth setup is missing", async () => {
    const previous = {
      SUPABASE_OAUTH_CLIENT_ID: process.env.SUPABASE_OAUTH_CLIENT_ID,
      SUPABASE_OAUTH_CLIENT_SECRET: process.env.SUPABASE_OAUTH_CLIENT_SECRET,
      SUPABASE_OAUTH_REDIRECT_URI: process.env.SUPABASE_OAUTH_REDIRECT_URI,
    };
    process.env.SUPABASE_OAUTH_CLIENT_ID = "";
    process.env.SUPABASE_OAUTH_CLIENT_SECRET = "";
    process.env.SUPABASE_OAUTH_REDIRECT_URI = "https://unclick.world/api/oauth-callback";

    try {
      const response = createResponse();
      await handler(
        {
          method: "POST",
          body: { platform: "supabase", api_key: "uc_test_account_key" },
        } as never,
        response.res as never
      );

      expect(response.statusCode).toBe(503);
      expect(response.payload).toMatchObject({
        setup_pending: true,
        provider: "supabase",
        missing: "client_id",
        missing_fields: ["client_id", "client_secret"],
      });
      expect((response.payload as { error?: string }).error).toContain("Supabase login is not switched on yet");
      expect((response.payload as { error?: string }).error).toContain("client ID and client secret");
      expect((response.payload as { error?: string }).error).not.toContain("SUPABASE_OAUTH_CLIENT_ID");
    } finally {
      restoreEnv("SUPABASE_OAUTH_CLIENT_ID", previous.SUPABASE_OAUTH_CLIENT_ID);
      restoreEnv("SUPABASE_OAUTH_CLIENT_SECRET", previous.SUPABASE_OAUTH_CLIENT_SECRET);
      restoreEnv("SUPABASE_OAUTH_REDIRECT_URI", previous.SUPABASE_OAUTH_REDIRECT_URI);
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
      restoreEnv("MCP_OAUTH_SIGNING_SECRET", previousSigningSecret);
      vi.unstubAllGlobals();
    }
  });
});
