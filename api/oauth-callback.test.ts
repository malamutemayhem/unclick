import { afterEach, describe, expect, it, vi } from "vitest";
import handler, { resolveCredentialStorageBaseUrl } from "./oauth-callback.js";
import { createOAuthStateToken } from "./oauth-state.js";

function createResponse() {
  const headers = new Map<string, string | string[]>();
  let statusCode = 200;
  let payload: unknown;
  let redirectUrl = "";

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
      redirect(code: number, url: string) {
        statusCode = code;
        redirectUrl = url;
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
    get redirectUrl() {
      return redirectUrl;
    },
  };
}

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

describe("oauth callback credential storage origin", () => {
  const previousEnv = { ...process.env };

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...previousEnv };
  });

  it("uses the canonical production origin instead of the Vercel deployment host", () => {
    expect(
      resolveCredentialStorageBaseUrl({
        VERCEL_ENV: "production",
        VERCEL_URL: "unclick-git-main-example.vercel.app",
      } as NodeJS.ProcessEnv)
    ).toBe("https://unclick.world");
  });

  it("keeps preview callbacks on their own deployment host", () => {
    expect(
      resolveCredentialStorageBaseUrl({
        VERCEL_ENV: "preview",
        VERCEL_URL: "unclick-git-branch-example.vercel.app",
      } as NodeJS.ProcessEnv)
    ).toBe("https://unclick-git-branch-example.vercel.app");
  });

  it("allows an explicit app origin override", () => {
    expect(
      resolveCredentialStorageBaseUrl({
        VERCEL_ENV: "production",
        VERCEL_URL: "unclick-git-main-example.vercel.app",
        UNCLICK_APP_ORIGIN: "https://app.example.com/",
      } as NodeJS.ProcessEnv)
    ).toBe("https://app.example.com");
  });

  it("exchanges a Vercel login code and stores the connected account token", async () => {
    process.env.VERCEL_CLIENT_ID = "vercel-client";
    process.env.VERCEL_CLIENT_SECRET = "vercel-secret";
    process.env.VERCEL_REDIRECT_URI = "https://unclick.world/api/oauth-callback";
    process.env.UNCLICK_APP_ORIGIN = "https://unclick.world";
    const state = createOAuthStateToken({
      platform: "vercel",
      redirectPath: "/connect/vercel",
      env: process.env,
    });

    const fetchMock = vi.fn(async (url: string | URL, init?: RequestInit) => {
      const href = String(url);
      if (href === "https://api.vercel.com/login/oauth/token") {
        expect(String(init?.body)).toContain("code_verifier=verifier");
        expect(String(init?.body)).toContain("client_id=vercel-client");
        expect(String(init?.body)).toContain("client_secret=vercel-secret");
        return {
          ok: true,
          json: async () => ({ access_token: "vercel-access", refresh_token: "vercel-refresh", expires_in: 3600 }),
        };
      }
      if (href === "https://unclick.world/api/credentials") {
        const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        expect(body).toMatchObject({
          platform: "vercel",
          api_key: "uc_test_account_key",
        });
        expect(body.credentials).toMatchObject({
          api_key: "vercel-access",
          access_token: "vercel-access",
          refresh_token: "vercel-refresh",
        });
        return { ok: true, json: async () => ({ success: true }) };
      }
      throw new Error(`Unexpected fetch ${href}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = createResponse();
    await handler(
      {
        method: "POST",
        body: {
          platform: "vercel",
          code: "oauth-code",
          api_key: "uc_test_account_key",
          state,
          code_verifier: "verifier",
        },
        headers: {},
      } as never,
      response.res as never
    );

    expect(response.statusCode).toBe(200);
    expect(response.payload).toMatchObject({ success: true, platform: "vercel" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("supports Vercel PKCE clients that do not issue a client secret", async () => {
    process.env.VERCEL_CLIENT_ID = "vercel-client";
    delete process.env.VERCEL_CLIENT_SECRET;
    process.env.VERCEL_REDIRECT_URI = "https://unclick.world/api/oauth-callback";
    process.env.OAUTH_STATE_SECRET = "state-secret";
    process.env.UNCLICK_APP_ORIGIN = "https://unclick.world";
    const state = createOAuthStateToken({
      platform: "vercel",
      redirectPath: "/connect/vercel",
      env: process.env,
    });

    const fetchMock = vi.fn(async (url: string | URL, init?: RequestInit) => {
      const href = String(url);
      if (href === "https://api.vercel.com/login/oauth/token") {
        expect(String(init?.body)).toContain("code_verifier=verifier");
        expect(String(init?.body)).toContain("client_id=vercel-client");
        expect(String(init?.body)).not.toContain("client_secret=");
        return {
          ok: true,
          json: async () => ({ access_token: "vercel-access" }),
        };
      }
      if (href === "https://unclick.world/api/credentials") {
        const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        expect(body).toMatchObject({
          platform: "vercel",
          api_key: "uc_test_account_key",
        });
        expect(body.credentials).toMatchObject({
          api_key: "vercel-access",
          access_token: "vercel-access",
        });
        return { ok: true, json: async () => ({ success: true }) };
      }
      throw new Error(`Unexpected fetch ${href}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = createResponse();
    await handler(
      {
        method: "POST",
        body: {
          platform: "vercel",
          code: "oauth-code",
          api_key: "uc_test_account_key",
          state,
          code_verifier: "verifier",
        },
        headers: {},
      } as never,
      response.res as never
    );

    expect(response.statusCode).toBe(200);
    expect(response.payload).toMatchObject({ success: true, platform: "vercel" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("exchanges a Supabase login code with Basic auth and stores the OAuth token", async () => {
    process.env.SUPABASE_OAUTH_CLIENT_ID = "supabase-client";
    process.env.SUPABASE_OAUTH_CLIENT_SECRET = "supabase-secret";
    process.env.SUPABASE_OAUTH_REDIRECT_URI = "https://unclick.world/api/oauth-callback";
    process.env.UNCLICK_APP_ORIGIN = "https://unclick.world";
    const state = createOAuthStateToken({
      platform: "supabase",
      redirectPath: "/connect/supabase",
      env: process.env,
    });

    const fetchMock = vi.fn(async (url: string | URL, init?: RequestInit) => {
      const href = String(url);
      if (href === "https://api.supabase.com/v1/oauth/token") {
        expect(String(init?.body)).toContain("code_verifier=verifier");
        expect(String(init?.body)).not.toContain("client_secret=supabase-secret");
        expect((init?.headers as Record<string, string>).Authorization).toBe(
          `Basic ${Buffer.from("supabase-client:supabase-secret", "utf8").toString("base64")}`
        );
        return {
          ok: true,
          json: async () => ({ access_token: "supabase-access", refresh_token: "supabase-refresh", expires_in: 3600 }),
        };
      }
      if (href === "https://unclick.world/api/credentials") {
        const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        expect(body).toMatchObject({
          platform: "supabase",
          api_key: "uc_test_account_key",
        });
        expect(body.credentials).toMatchObject({
          access_token: "supabase-access",
          refresh_token: "supabase-refresh",
        });
        return { ok: true, json: async () => ({ success: true }) };
      }
      throw new Error(`Unexpected fetch ${href}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = createResponse();
    await handler(
      {
        method: "POST",
        body: {
          platform: "supabase",
          code: "oauth-code",
          api_key: "uc_test_account_key",
          state,
          code_verifier: "verifier",
        },
        headers: {},
      } as never,
      response.res as never
    );

    expect(response.statusCode).toBe(200);
    expect(response.payload).toMatchObject({ success: true, platform: "supabase" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe("oauth callback Higgsfield MCP login", () => {
  it("exchanges the hosted MCP code and stores a connected Higgsfield credential", async () => {
    const previousSecret = process.env.MCP_OAUTH_SIGNING_SECRET;
    const previousVercelEnv = process.env.VERCEL_ENV;
    const previousOrigin = process.env.UNCLICK_APP_ORIGIN;
    process.env.MCP_OAUTH_SIGNING_SECRET = "oauth-state-secret";
    process.env.VERCEL_ENV = "production";
    delete process.env.UNCLICK_APP_ORIGIN;

    const state = createOAuthStateToken({
      platform: "higgsfield",
      redirectPath: "/connect/higgsfield",
      env: process.env,
    });
    const flow = Buffer.from(JSON.stringify({
      state,
      client_id: "hf-client",
      redirect_uri: "https://unclick.world/api/oauth-callback",
      code_verifier: "pkce-verifier",
    }), "utf8").toString("base64url");

    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://mcp.higgsfield.ai/oauth2/token") {
        expect(String(init?.body)).toContain("code=hf-code");
        expect(String(init?.body)).toContain("code_verifier=pkce-verifier");
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            access_token: "hf-access-token",
            refresh_token: "hf-refresh-token",
            expires_in: 3600,
            token_type: "Bearer",
            scope: "openid email offline_access",
          }),
        });
      }
      if (url === "https://unclick.world/api/credentials") {
        const body = JSON.parse(String(init?.body));
        expect(body).toMatchObject({
          platform: "higgsfield",
          api_key: "uc_test_account_key",
          credentials: {
            access_token: "hf-access-token",
            refresh_token: "hf-refresh-token",
            client_id: "hf-client",
            mcp_url: "https://mcp.higgsfield.ai/mcp",
            credential_kind: "higgsfield_mcp_oauth",
          },
        });
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ success: true }),
        });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    try {
      const response = createResponse();
      await handler(
        {
          method: "GET",
          headers: {
            cookie: [
              "unclick_oauth_api_key=uc_test_account_key",
              `unclick_higgsfield_mcp_oauth=${encodeURIComponent(flow)}`,
            ].join("; "),
          },
          query: { code: "hf-code", state },
        } as never,
        response.res as never,
      );

      expect(response.statusCode).toBe(302);
      expect(response.redirectUrl).toBe("/connect/higgsfield?connected=1");
      expect(fetchMock).toHaveBeenCalledTimes(2);
      const cookieHeader = response.headers.get("Set-Cookie");
      expect(Array.isArray(cookieHeader) ? cookieHeader.join(";") : String(cookieHeader)).toContain("unclick_higgsfield_mcp_oauth=");
    } finally {
      restoreEnv("MCP_OAUTH_SIGNING_SECRET", previousSecret);
      restoreEnv("VERCEL_ENV", previousVercelEnv);
      restoreEnv("UNCLICK_APP_ORIGIN", previousOrigin);
      vi.unstubAllGlobals();
    }
  });
});
