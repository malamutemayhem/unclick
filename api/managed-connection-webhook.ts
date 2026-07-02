import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  MANAGED_CONNECTION_PROVIDER,
  readManagedConnectionConfig,
  verifyNangoWebhookSignature,
} from "./lib/managed-connections.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0, must-revalidate");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");

  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const brokerConfig = readManagedConnectionConfig();
  if (!supabaseUrl || !serviceRoleKey || !brokerConfig?.webhookSecret) {
    return res.status(500).json({ error: "Managed connection webhook is not configured." });
  }

  const rawBody = await readRawBody(req);
  const signature =
    req.headers["x-nango-signature"] ??
    req.headers["x-nango-hmac-sha256"] ??
    req.headers["x-signature"];
  if (!verifyNangoWebhookSignature({ rawBody, signature, secret: brokerConfig.webhookSecret })) {
    return res.status(401).json({ error: "Invalid webhook signature." });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody.toString("utf8")) as Record<string, unknown>;
  } catch {
    return res.status(400).json({ error: "Invalid JSON payload." });
  }

  const connection = asRecord(payload.connection) ?? asRecord(payload.data) ?? payload;
  const tags =
    asRecord(payload.tags) ??
    asRecord(connection.tags) ??
    asRecord(asRecord(payload.end_user)?.tags) ??
    {};
  const apiKeyHash = stringField(tags, "unclick_api_key_hash");
  const platform = stringField(tags, "unclick_platform_slug") ?? stringField(connection, "platform_slug");
  const externalConnectionId =
    stringField(connection, "connection_id") ??
    stringField(connection, "connectionId") ??
    stringField(connection, "id") ??
    stringField(payload, "connection_id") ??
    stringField(payload, "connectionId");
  const providerConfigKey =
    stringField(connection, "provider_config_key") ??
    stringField(connection, "providerConfigKey") ??
    stringField(payload, "provider_config_key") ??
    stringField(payload, "providerConfigKey");

  if (!apiKeyHash || !platform || !externalConnectionId) {
    return res.status(202).json({ ignored: true, reason: "Missing UnClick routing tags." });
  }

  const now = new Date().toISOString();
  const event = stringField(payload, "type") ?? stringField(payload, "event") ?? stringField(payload, "operation") ?? "unknown";
  const failed = payload.success === false || Boolean(payload.error) || Boolean(connection.error);
  const deleted = /delete|remove|revoke|disconnect/i.test(event);
  const status = deleted ? "revoked" : failed ? "error" : "connected";
  const accountLabel =
    stringField(connection, "end_user_email") ??
    stringField(connection, "accountName") ??
    stringField(connection, "account_label") ??
    stringField(tags, "unclick_app_name");
  const scopeSummary =
    Array.isArray(connection.scopes) ? connection.scopes.map(String).join(", ") :
    stringField(connection, "scope") ??
    null;

  const row = {
    api_key_hash: apiKeyHash,
    platform_slug: platform,
    provider: MANAGED_CONNECTION_PROVIDER,
    provider_config_key: providerConfigKey,
    external_connection_id: externalConnectionId,
    auth_mode: stringField(connection, "auth_mode") ?? "managed_oauth",
    status,
    account_label: accountLabel,
    scope_summary: scopeSummary,
    last_checked_at: now,
    connected_at: status === "connected" ? now : null,
    updated_at: now,
    metadata: {
      provider_event: event,
      provider_environment: stringField(payload, "environment"),
      provider_config_key: providerConfigKey,
    },
  };

  const url = `${supabaseUrl}/rest/v1/managed_app_connections?on_conflict=api_key_hash,platform_slug,provider,external_connection_id`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    return res.status(502).json({ error: "Could not save managed connection status." });
  }

  return res.status(200).json({ success: true, platform, status });
}

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function stringField(record: Record<string, unknown> | null | undefined, key: string): string | null {
  const value = record?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
