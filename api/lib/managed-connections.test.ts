import * as crypto from "crypto";
import { describe, expect, it, vi } from "vitest";

import {
  beginManagedConnection,
  fetchManagedConnectionCredentials,
  managedConnectionAvailableForPlatform,
  managedConnectionsConfigured,
  normalizeManagedCredentials,
  providerConfigKeyForPlatform,
  verifyNangoWebhookSignature,
} from "./managed-connections";

const TENANT = {
  apiKeyHash: "hash_123",
  userId: "user_123",
  email: "person@example.com",
};

describe("managed connections broker helper", () => {
  it("stays off until a broker secret is configured", async () => {
    expect(managedConnectionsConfigured({})).toBe(false);
    const result = await beginManagedConnection({
      platform: "higgsfield",
      appName: "Higgsfield",
      tenant: TENANT,
      returnUrl: "https://unclick.world/admin/apps?lens=connected",
      env: {},
    });
    expect(result).toMatchObject({ ok: false, code: "broker_not_configured" });
  });

  it("uses platform-specific provider config overrides", () => {
    expect(providerConfigKeyForPlatform("higgsfield", { NANGO_PROVIDER_CONFIG_HIGGSFIELD: "hf-prod" })).toBe("hf-prod");
    expect(providerConfigKeyForPlatform("higgsfield", { NANGO_PROVIDER_CONFIG_PREFIX: "unclick-" })).toBe("unclick-higgsfield");
    expect(providerConfigKeyForPlatform("higgsfield", {})).toBe("higgsfield");
  });

  it("only enables the broker UI for configured or allowlisted apps", () => {
    expect(managedConnectionAvailableForPlatform("higgsfield", { NANGO_SECRET_KEY: "secret" })).toBe(false);
    expect(managedConnectionAvailableForPlatform("higgsfield", {
      NANGO_SECRET_KEY: "secret",
      NANGO_PROVIDER_CONFIG_HIGGSFIELD: "higgsfield-prod",
    })).toBe(true);
    expect(managedConnectionAvailableForPlatform("github", {
      NANGO_SECRET_KEY: "secret",
      NANGO_MANAGED_PLATFORMS: "higgsfield, github",
    })).toBe(true);
    expect(managedConnectionAvailableForPlatform("slack", {
      NANGO_SECRET_KEY: "secret",
      NANGO_MANAGED_PLATFORMS: "higgsfield, github",
    })).toBe(false);
  });

  it("creates a connect session without sending customer secrets", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          data: {
            connect_link: "https://connect.nango.dev/session/abc",
            expires_at: "2026-06-16T09:00:00Z",
          },
        }),
      }),
    );

    const result = await beginManagedConnection({
      platform: "higgsfield",
      appName: "Higgsfield",
      tenant: TENANT,
      returnUrl: "https://unclick.world/admin/apps?lens=connected",
      env: { NANGO_SECRET_KEY: "secret", NANGO_PROVIDER_CONFIG_HIGGSFIELD: "higgsfield-prod" },
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    expect(result).toMatchObject({
      ok: true,
      provider_config_key: "higgsfield-prod",
      connect_url: "https://connect.nango.dev/session/abc",
    });
    const requestInit = fetchMock.mock.calls[0][1] as RequestInit;
    const request = JSON.parse(String(requestInit.body));
    expect(request.allowed_integrations).toEqual(["higgsfield-prod"]);
    expect(request.tags).toMatchObject({
      unclick_api_key_hash: "hash_123",
      unclick_platform_slug: "higgsfield",
    });
    expect(JSON.stringify(request)).not.toContain("secret");
    expect(JSON.stringify(request)).not.toMatch(/password|access_token|refresh_token/i);
  });

  it("normalizes common broker credential shapes for existing tools", () => {
    expect(normalizeManagedCredentials({
      credentials: {
        accessToken: "access",
        refreshToken: "refresh",
        apiKey: "key",
        raw: { tenant_id: "tenant" },
      },
    })).toEqual({
      access_token: "access",
      refresh_token: "refresh",
      api_key: "key",
      tenant_id: "tenant",
    });
  });

  it("does not mistake connection metadata for credentials", () => {
    expect(normalizeManagedCredentials({
      id: "conn_123",
      provider_config_key: "higgsfield-prod",
      platform_slug: "higgsfield",
    })).toEqual({});
  });

  it("fetches managed credentials with the provider config header", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: { credentials: { apiKey: "hf-key" } } }),
      }),
    );

    const result = await fetchManagedConnectionCredentials({
      connection: {
        platform_slug: "higgsfield",
        provider: "nango",
        provider_config_key: "higgsfield-prod",
        external_connection_id: "conn_123",
        status: "connected",
      },
      env: { NANGO_SECRET_KEY: "secret" },
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    expect(result).toMatchObject({ ok: true, credentials: { api_key: "hf-key" } });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.nango.dev/connection/conn_123",
      expect.objectContaining({
        headers: expect.objectContaining({ "Provider-Config-Key": "higgsfield-prod" }),
      }),
    );
  });

  it("verifies signed webhook bodies", () => {
    const rawBody = Buffer.from(JSON.stringify({ hello: "world" }));
    const secret = "webhook-secret";
    const signature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    expect(verifyNangoWebhookSignature({ rawBody, signature, secret })).toBe(true);
    expect(verifyNangoWebhookSignature({ rawBody, signature: "00", secret })).toBe(false);
  });
});
