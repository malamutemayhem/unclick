import * as crypto from "crypto";

export const MANAGED_CONNECTION_PROVIDER = "nango";

const DEFAULT_NANGO_BASE_URL = "https://api.nango.dev";

export interface ManagedConnectionTenant {
  apiKeyHash: string;
  userId: string | null;
  email?: string | null;
}

export interface ManagedConnectionRow {
  id?: string | null;
  platform_slug: string;
  provider: string | null;
  provider_config_key?: string | null;
  external_connection_id: string;
  auth_mode?: string | null;
  status: string;
  account_label?: string | null;
  scope_summary?: string | null;
  last_checked_at?: string | null;
  connected_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  metadata?: Record<string, unknown> | null;
}

export type ManagedConnectionStartResult =
  | {
      ok: true;
      provider: typeof MANAGED_CONNECTION_PROVIDER;
      provider_config_key: string;
      connect_url: string;
      session_token?: string | null;
      expires_at?: string | null;
    }
  | {
      ok: false;
      status: number;
      code: "broker_not_configured" | "broker_error";
      message: string;
    };

export interface ManagedConnectionCredentialResult {
  ok: boolean;
  status: number;
  credentials?: Record<string, string>;
  error?: string;
}

export interface ManagedConnectionConfig {
  provider: typeof MANAGED_CONNECTION_PROVIDER;
  baseUrl: string;
  secretKey: string;
  webhookSecret: string | null;
}

export function managedConnectionsConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(env.NANGO_SECRET_KEY?.trim());
}

export function readManagedConnectionConfig(env: NodeJS.ProcessEnv = process.env): ManagedConnectionConfig | null {
  const secretKey = env.NANGO_SECRET_KEY?.trim();
  if (!secretKey) return null;
  return {
    provider: MANAGED_CONNECTION_PROVIDER,
    baseUrl: (env.NANGO_BASE_URL ?? DEFAULT_NANGO_BASE_URL).replace(/\/+$/, ""),
    secretKey,
    webhookSecret: env.NANGO_WEBHOOK_SECRET?.trim() || null,
  };
}

export function providerConfigKeyForPlatform(platform: string, env: NodeJS.ProcessEnv = process.env): string {
  const envKey = `NANGO_PROVIDER_CONFIG_${platform.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
  const configured = env[envKey]?.trim();
  if (configured) return configured;
  const prefix = env.NANGO_PROVIDER_CONFIG_PREFIX?.trim() ?? "";
  return `${prefix}${platform}`;
}

export function managedConnectionAvailableForPlatform(platform: string, env: NodeJS.ProcessEnv = process.env): boolean {
  if (!managedConnectionsConfigured(env)) return false;
  const envKey = `NANGO_PROVIDER_CONFIG_${platform.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
  if (env[envKey]?.trim()) return true;
  const allowlist = env.NANGO_MANAGED_PLATFORMS?.trim();
  if (!allowlist) return false;
  if (allowlist === "*") return true;
  const normalized = platform.toLowerCase();
  return allowlist
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(normalized);
}

export async function beginManagedConnection(input: {
  platform: string;
  appName: string;
  tenant: ManagedConnectionTenant;
  returnUrl: string;
  env?: NodeJS.ProcessEnv;
  fetchImpl?: typeof fetch;
}): Promise<ManagedConnectionStartResult> {
  const env = input.env ?? process.env;
  const config = readManagedConnectionConfig(env);
  if (!config) {
    return {
      ok: false,
      status: 501,
      code: "broker_not_configured",
      message: "Managed Connections is not available for this app yet. Nothing was saved.",
    };
  }

  const providerConfigKey = providerConfigKeyForPlatform(input.platform, env);
  const fetcher = input.fetchImpl ?? fetch;
  const tags = {
    unclick_api_key_hash: input.tenant.apiKeyHash,
    unclick_user_id: input.tenant.userId ?? "",
    unclick_platform_slug: input.platform,
    unclick_app_name: input.appName,
  };

  const response = await fetcher(`${config.baseUrl}/connect/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      end_user: {
        id: input.tenant.apiKeyHash,
        ...(input.tenant.email ? { email: input.tenant.email } : {}),
      },
      allowed_integrations: [providerConfigKey],
      tags,
      return_url: input.returnUrl,
    }),
  });

  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      code: "broker_error",
      message: typeof body.error === "string"
        ? body.error
        : `Managed connection provider rejected the request (${response.status}).`,
    };
  }

  const data = isRecord(body.data) ? body.data : body;
  const connectUrl =
    stringField(data, "connect_link") ??
    stringField(data, "connect_url") ??
    stringField(data, "connectUrl") ??
    stringField(data, "url") ??
    stringField(data, "link");

  if (!connectUrl) {
    return {
      ok: false,
      status: 502,
      code: "broker_error",
      message: "Managed connection provider did not return a connect link.",
    };
  }

  return {
    ok: true,
    provider: MANAGED_CONNECTION_PROVIDER,
    provider_config_key: providerConfigKey,
    connect_url: connectUrl,
    session_token: stringField(data, "token") ?? stringField(data, "session_token"),
    expires_at: stringField(data, "expires_at") ?? stringField(data, "expiresAt"),
  };
}

export async function fetchManagedConnectionCredentials(input: {
  connection: ManagedConnectionRow;
  env?: NodeJS.ProcessEnv;
  fetchImpl?: typeof fetch;
}): Promise<ManagedConnectionCredentialResult> {
  const env = input.env ?? process.env;
  const config = readManagedConnectionConfig(env);
  if (!config) {
    return { ok: false, status: 501, error: "Managed connection provider is not configured." };
  }
  if (input.connection.provider && input.connection.provider !== MANAGED_CONNECTION_PROVIDER) {
    return { ok: false, status: 400, error: `Unsupported managed connection provider "${input.connection.provider}".` };
  }

  const providerConfigKey =
    input.connection.provider_config_key ||
    providerConfigKeyForPlatform(input.connection.platform_slug, env);
  const fetcher = input.fetchImpl ?? fetch;
  const url = `${config.baseUrl}/connection/${encodeURIComponent(input.connection.external_connection_id)}`;
  const response = await fetcher(url, {
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      "Provider-Config-Key": providerConfigKey,
    },
  });
  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: typeof body.error === "string" ? body.error : `Managed connection lookup failed (${response.status}).`,
    };
  }

  const credentials = normalizeManagedCredentials(body);
  if (Object.keys(credentials).length === 0) {
    return { ok: false, status: 502, error: "Managed connection returned no usable credential fields." };
  }

  return { ok: true, status: 200, credentials };
}

export async function disconnectManagedConnection(input: {
  connection: ManagedConnectionRow;
  env?: NodeJS.ProcessEnv;
  fetchImpl?: typeof fetch;
}): Promise<{ ok: boolean; status: number; error?: string }> {
  const env = input.env ?? process.env;
  const config = readManagedConnectionConfig(env);
  if (!config) return { ok: true, status: 204 };
  if (input.connection.provider && input.connection.provider !== MANAGED_CONNECTION_PROVIDER) {
    return { ok: true, status: 204 };
  }

  const providerConfigKey =
    input.connection.provider_config_key ||
    providerConfigKeyForPlatform(input.connection.platform_slug, env);
  const fetcher = input.fetchImpl ?? fetch;
  const url = `${config.baseUrl}/connection/${encodeURIComponent(input.connection.external_connection_id)}`;
  const response = await fetcher(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      "Provider-Config-Key": providerConfigKey,
    },
  });
  if (response.ok || response.status === 404) return { ok: true, status: response.status };
  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return {
    ok: false,
    status: response.status,
    error: typeof body.error === "string" ? body.error : `Managed disconnect failed (${response.status}).`,
  };
}

export function normalizeManagedCredentials(payload: Record<string, unknown>): Record<string, string> {
  const data = isRecord(payload.data) ? payload.data : null;
  const connection = isRecord(payload.connection) ? payload.connection : null;
  const dataConnection = data && isRecord(data.connection) ? data.connection : null;
  const source: Record<string, unknown> =
    isRecord(payload.credentials) ? payload.credentials :
    connection && isRecord(connection.credentials) ? connection.credentials :
    data && isRecord(data.credentials) ? data.credentials :
    dataConnection && isRecord(dataConnection.credentials) ? dataConnection.credentials :
    data && hasCredentialLikeField(data) ? data :
    hasCredentialLikeField(payload) ? payload :
    {};

  const out: Record<string, string> = {};
  function copyField(key: string, value: unknown) {
    if (typeof value !== "string" || value.trim() === "") return;
    out[key] = value.trim();
  }

  if (isRecord(source.raw)) {
    for (const [key, value] of Object.entries(source.raw)) copyField(key, value);
  }
  for (const [key, value] of Object.entries(source)) {
    if (key === "raw" || key === "type" || key === "expires_at") continue;
    if (key === "accessToken" || key === "refreshToken" || key === "apiKey") continue;
    copyField(key, value);
  }

  if (!out.access_token) {
    copyField("access_token", source.accessToken);
  }
  if (!out.refresh_token) {
    copyField("refresh_token", source.refreshToken);
  }
  if (!out.api_key) {
    copyField("api_key", source.apiKey ?? source.key ?? source.token ?? source.access_token ?? source.accessToken);
  }

  return out;
}

function hasCredentialLikeField(record: Record<string, unknown>): boolean {
  return [
    "apiKey",
    "api_key",
    "key",
    "token",
    "accessToken",
    "access_token",
    "refreshToken",
    "refresh_token",
    "credentials",
  ].some((key) => typeof record[key] === "string" && record[key].trim() !== "");
}

export function verifyNangoWebhookSignature(input: {
  rawBody: Buffer;
  signature: string | string[] | undefined;
  secret: string;
}): boolean {
  const signature = Array.isArray(input.signature) ? input.signature[0] : input.signature;
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", input.secret)
    .update(input.rawBody)
    .digest("hex");
  const normalized = signature.replace(/^sha256=/i, "");
  const actualBuffer = Buffer.from(normalized, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

function stringField(record: Record<string, unknown>, key: string): string | null {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
