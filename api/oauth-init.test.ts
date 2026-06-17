import { describe, expect, it } from "vitest";
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
  it("returns the registered callback URI and stores the account key in a short-lived cookie", () => {
    const previousClientId = process.env.GITHUB_CLIENT_ID;
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
    process.env.GITHUB_CLIENT_ID = "github-client";
    process.env.GITHUB_CLIENT_SECRET = "github-secret";
    process.env.GITHUB_REDIRECT_URI = "https://unclick.world/api/oauth-callback";

    try {
      const response = createResponse();
      handler(
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
      process.env.GITHUB_CLIENT_ID = previousClientId;
      process.env.GITHUB_CLIENT_SECRET = previousSecret;
      process.env.GITHUB_REDIRECT_URI = previousRedirect;
    }
  });

  it("normalizes the stale production GitHub redirect URI to the server callback", () => {
    const previousClientId = process.env.GITHUB_CLIENT_ID;
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
    process.env.GITHUB_CLIENT_ID = "github-client";
    process.env.GITHUB_CLIENT_SECRET = "github-secret";
    process.env.GITHUB_REDIRECT_URI = "https://unclick.world/connect/github";

    try {
      const response = createResponse();
      handler(
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
      process.env.GITHUB_CLIENT_ID = previousClientId;
      process.env.GITHUB_CLIENT_SECRET = previousSecret;
      process.env.GITHUB_REDIRECT_URI = previousRedirect;
    }
  });

  it("starts Vercel and Supabase sign-in with PKCE challenge data", () => {
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
        handler(
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
      process.env.VERCEL_CLIENT_ID = previous.VERCEL_CLIENT_ID;
      process.env.VERCEL_CLIENT_SECRET = previous.VERCEL_CLIENT_SECRET;
      process.env.VERCEL_REDIRECT_URI = previous.VERCEL_REDIRECT_URI;
      process.env.SUPABASE_OAUTH_CLIENT_ID = previous.SUPABASE_OAUTH_CLIENT_ID;
      process.env.SUPABASE_OAUTH_CLIENT_SECRET = previous.SUPABASE_OAUTH_CLIENT_SECRET;
      process.env.SUPABASE_OAUTH_REDIRECT_URI = previous.SUPABASE_OAUTH_REDIRECT_URI;
    }
  });
});
