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
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
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

  it("normalizes the stale production GitHub redirect URI to the server callback", () => {
    const previousSecret = process.env.GITHUB_CLIENT_SECRET;
    const previousRedirect = process.env.GITHUB_REDIRECT_URI;
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
      process.env.GITHUB_CLIENT_SECRET = previousSecret;
      process.env.GITHUB_REDIRECT_URI = previousRedirect;
    }
  });
});
