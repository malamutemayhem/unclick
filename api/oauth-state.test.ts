import { describe, expect, it } from "vitest";
import { createOAuthStateToken, verifyOAuthStateToken } from "./oauth-state.js";

const env = {
  GITHUB_CLIENT_SECRET: "github-secret",
  XERO_CLIENT_SECRET: "xero-secret",
  REDDIT_CLIENT_SECRET: "reddit-secret",
  SHOPIFY_CLIENT_SECRET: "shopify-secret",
  DROPBOX_CLIENT_SECRET: "dropbox-secret",
  GOOGLE_WORKSPACE_CLIENT_SECRET: "google-secret",
  MICROSOFT_GRAPH_CLIENT_SECRET: "microsoft-secret",
} as NodeJS.ProcessEnv;

describe("oauth state token", () => {
  it("round-trips a valid token", () => {
    const token = createOAuthStateToken({
      platform: "github",
      redirectPath: "/connect/github",
      env,
      nowSeconds: 1_000,
    });

    expect(verifyOAuthStateToken(token, env, 1_100)).toMatchObject({
      platform: "github",
      redirectPath: "/connect/github",
      v: 1,
    });
  });

  it("rejects tampered payloads", () => {
    const token = createOAuthStateToken({
      platform: "shopify",
      redirectPath: "/connect/shopify",
      store: "demo-store",
      env,
      nowSeconds: 1_000,
    });

    const [payload, signature] = token.split(".");
    const tampered = `${Buffer.from(
      JSON.stringify({
        ...JSON.parse(Buffer.from(payload, "base64url").toString("utf8")),
        store: "evil-store",
      }),
      "utf8"
    ).toString("base64url")}.${signature}`;

    expect(() => verifyOAuthStateToken(tampered, env, 1_100)).toThrow(
      "OAuth state signature mismatch."
    );
  });

  it("rejects expired tokens", () => {
    const token = createOAuthStateToken({
      platform: "reddit",
      redirectPath: "/connect/reddit",
      env,
      nowSeconds: 1_000,
    });

    expect(() => verifyOAuthStateToken(token, env, 2_000)).toThrow(
      "OAuth state token expired."
    );
  });

  it("can sign state with the shared state secret when a provider has no client secret", () => {
    const noProviderSecretEnv = {
      OAUTH_STATE_SECRET: "state-secret",
    } as NodeJS.ProcessEnv;

    const token = createOAuthStateToken({
      platform: "vercel",
      redirectPath: "/connect/vercel",
      env: noProviderSecretEnv,
      nowSeconds: 1_000,
    });

    expect(verifyOAuthStateToken(token, noProviderSecretEnv, 1_100)).toMatchObject({
      platform: "vercel",
      redirectPath: "/connect/vercel",
      v: 1,
    });
  });

  it("uses the generic OAuth signing secret for public-client providers", () => {
    const publicClientEnv = {
      MCP_OAUTH_SIGNING_SECRET: "generic-secret",
    } as NodeJS.ProcessEnv;
    const token = createOAuthStateToken({
      platform: "higgsfield",
      redirectPath: "/connect/higgsfield",
      env: publicClientEnv,
      nowSeconds: 1_000,
    });

    expect(verifyOAuthStateToken(token, publicClientEnv, 1_100)).toMatchObject({
      platform: "higgsfield",
      redirectPath: "/connect/higgsfield",
    });
  });

  it("round-trips state for mail and file app aliases", () => {
    for (const platform of ["gmail", "google-drive", "dropbox", "onedrive"]) {
      const token = createOAuthStateToken({
        platform,
        redirectPath: `/connect/${platform}`,
        env,
        nowSeconds: 1_000,
      });

      expect(verifyOAuthStateToken(token, env, 1_100)).toMatchObject({
        platform,
        redirectPath: `/connect/${platform}`,
        v: 1,
      });
    }
  });
});
