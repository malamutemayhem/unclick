import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  authorizationServerMetadata,
  createMcpOAuthAccessToken,
  createMcpOAuthAuthorizationCode,
  createMcpOAuthRefreshToken,
  isSafeOAuthRedirectUri,
  MCP_OAUTH_RESOURCE,
  protectedResourceMetadata,
  verifyMcpOAuthToken,
  verifyPkceS256,
} from "./lib/mcp-oauth";

function s256(verifier: string) {
  return createHash("sha256").update(verifier, "utf8").digest("base64url");
}

describe("MCP OAuth generic URL support", () => {
  it("publishes protected-resource and authorization-server metadata for the generic MCP URL", () => {
    const resource = protectedResourceMetadata();
    const auth = authorizationServerMetadata();

    expect(resource.resource).toBe("https://unclick.world/api/mcp");
    expect(resource.authorization_servers).toEqual(["https://unclick.world"]);
    expect(resource.bearer_methods_supported).toContain("header");
    expect(auth.authorization_endpoint).toBe("https://unclick.world/mcp/authorize");
    expect(auth.token_endpoint).toBe("https://unclick.world/api/mcp/oauth/token");
    expect(auth.registration_endpoint).toBe("https://unclick.world/api/mcp/oauth/register");
    expect(auth.code_challenge_methods_supported).toEqual(["S256"]);
  });

  it("signs OAuth codes and bearer tokens against the MCP resource", () => {
    const env = { MCP_OAUTH_SIGNING_SECRET: "test-secret" } as NodeJS.ProcessEnv;
    const verifier = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
    const code = createMcpOAuthAuthorizationCode(
      {
        clientId: "client-1",
        codeChallenge: s256(verifier),
        redirectUri: "https://client.example/callback",
        userId: "user-1",
      },
      env,
    );

    const codePayload = verifyMcpOAuthToken(code, "code", env);
    expect(codePayload.aud).toBe(MCP_OAUTH_RESOURCE);
    expect(codePayload.client_id).toBe("client-1");
    expect(codePayload.redirect_uri).toBe("https://client.example/callback");
    expect(verifyPkceS256(verifier, codePayload.code_challenge ?? "")).toBe(true);

    const access = createMcpOAuthAccessToken({ userId: "user-1" }, env);
    const refresh = createMcpOAuthRefreshToken({ userId: "user-1" }, env);
    expect(verifyMcpOAuthToken(access.access_token, "access", env).sub).toBe("user-1");
    expect(verifyMcpOAuthToken(refresh.refresh_token, "refresh", env).sub).toBe("user-1");
  });

  it("keeps redirect URIs constrained enough for dynamic MCP clients", () => {
    expect(isSafeOAuthRedirectUri("https://chatgpt.com/callback")).toBe(true);
    expect(isSafeOAuthRedirectUri("https://grok.com/callback")).toBe(true);
    expect(isSafeOAuthRedirectUri("http://localhost:1234/callback")).toBe(true);
    expect(isSafeOAuthRedirectUri("http://127.0.0.1:1234/callback")).toBe(true);
    expect(isSafeOAuthRedirectUri("http://evil.example/callback")).toBe(false);
    expect(isSafeOAuthRedirectUri("javascript:alert(1)")).toBe(false);
  });

  it("routes OAuth discovery and token endpoints before the app fallback", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
      rewrites?: Array<{ source: string; destination: string }>;
    };
    const rewrites = config.rewrites ?? [];
    const sources = rewrites.map((rewrite) => rewrite.source);
    const fallbackIndex = sources.indexOf("/((?!.*\\.).*)");

    for (const source of [
      "/.well-known/oauth-protected-resource/api/mcp",
      "/.well-known/oauth-authorization-server",
      "/api/mcp/oauth/authorize",
      "/api/mcp/oauth/register",
      "/api/mcp/oauth/token",
    ]) {
      const index = sources.indexOf(source);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(fallbackIndex);
    }
  });
});
