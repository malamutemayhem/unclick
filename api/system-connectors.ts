/**
 * Project-owned connector credentials for Superusers working on UnClick.
 * Browser responses expose configuration state only. Credential plaintext is
 * released exclusively to the hosted MCP broker after two independent checks.
 */
import * as crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { verifyMcpOAuthToken } from "./lib/mcp-oauth.js";
import { decryptForAccount, encryptForAccount, type EncryptedCredential } from "./lib/chat-crypto.js";
import { canManageSystemConnectors, deriveRole, envAdminEmails, envGodEmails, type AdminRole } from "./lib/admin-roles.js";
import {
  SYSTEM_CONNECTOR_PROVIDERS,
  SYSTEM_CONNECTOR_SPECS,
  acceptedSystemConnectorPatch,
  completeSystemConnectorCredentials,
  deploymentSystemConnectorDefaults,
  isSystemConnectorProvider,
  publicSystemConnectorValues,
  type SystemConnectorProvider,
} from "./lib/system-connectors.js";

const MASTER_LANE = "unclick-system-connectors/v1";
const BROKER_HEADER = "x-unclick-system-connector-broker";

type ActorKind = "session" | "api_key" | "mcp_oauth";
type Actor = { id: string; email: string | null; role: AdminRole; kind: ActorKind };
type StoredMaster = EncryptedCredential & {
  provider: SystemConnectorProvider;
  credential_version: number | null;
  updated_at: string | null;
  updated_by: string | null;
};

function bearerFrom(req: VercelRequest): string {
  return (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
}

function encryptionSecret(env: NodeJS.ProcessEnv = process.env): string {
  return (env.UNCLICK_AI_KEY_SECRET || env.UNCLICK_AI_KEY_SECRET_V2 || "").trim();
}

/** A dedicated broker secret can be rotated independently. The existing server
 * secret is a safe compatibility fallback for deployments that already have it. */
function brokerSecret(env: NodeJS.ProcessEnv = process.env): string {
  return (env.UNCLICK_SYSTEM_CONNECTOR_BROKER_SECRET || encryptionSecret(env)).trim();
}

function matchesSecret(provided: string | string[] | undefined, expected: string): boolean {
  const value = Array.isArray(provided) ? provided[0] : provided;
  if (!value || !expected) return false;
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function encryptedRow(row: Record<string, unknown>): EncryptedCredential {
  return {
    encrypted_data: String(row.encrypted_data ?? ""),
    encryption_iv: String(row.encryption_iv ?? ""),
    encryption_tag: String(row.encryption_tag ?? ""),
    encryption_salt: String(row.encryption_salt ?? ""),
  };
}

function parseCredentials(
  provider: SystemConnectorProvider,
  row: Record<string, unknown>,
): Record<string, string> | null {
  const secret = encryptionSecret();
  if (!secret) return null;
  try {
    const plaintext = decryptForAccount(secret, MASTER_LANE, encryptedRow(row));
    const complete = completeSystemConnectorCredentials(provider, {}, JSON.parse(plaintext));
    return "credentials" in complete ? complete.credentials : null;
  } catch {
    return null;
  }
}

async function resolveActor(
  token: string,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<Actor | null> {
  if (!token) return null;
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  let id: string | null = null;
  let kind: ActorKind | null = null;
  let sessionUser: { id: string; email?: string | null; app_metadata?: unknown } | null = null;

  if (token.startsWith("uc_") || token.startsWith("agt_")) {
    const keyHash = crypto.createHash("sha256").update(token).digest("hex");
    const { data } = await supabase
      .from("api_keys")
      .select("user_id")
      .eq("key_hash", keyHash)
      .eq("is_active", true)
      .maybeSingle();
    id = typeof data?.user_id === "string" ? data.user_id : null;
    kind = id ? "api_key" : null;
  } else {
    try {
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data.user) {
        sessionUser = data.user;
        id = data.user.id;
        kind = "session";
      }
    } catch {
      // A session token can be absent while a signed MCP OAuth token is valid.
    }
    if (!id) {
      try {
        id = verifyMcpOAuthToken(token, "access", process.env).sub;
        kind = "mcp_oauth";
      } catch {
        return null;
      }
    }
  }
  if (!id || !kind) return null;

  const user = sessionUser ?? (await supabase.auth.admin.getUserById(id)).data.user;
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? null,
    role: deriveRole(user.email ?? null, user.app_metadata ?? null),
    kind,
  };
}

async function readMasters(supabase: { from: (table: string) => any }): Promise<StoredMaster[]> {
  const { data, error } = await supabase
    .from("system_connector_credentials")
    .select("provider, encrypted_data, encryption_iv, encryption_tag, encryption_salt, credential_version, updated_at, updated_by");
  if (error) {
    // Deployments may receive this code just before the accompanying database
    // migration. Treat only an absent table as an empty credential store so the
    // existing server-side Gitea deployment credentials remain usable. Do not
    // mask other database failures: the admin panel needs to expose those.
    const code = String((error as { code?: unknown }).code ?? "");
    const message = String((error as { message?: unknown }).message ?? "");
    if (code === "42P01" || (/system_connector_credentials/i.test(message) && /does not exist|relation/i.test(message))) {
      return [];
    }
    throw error;
  }
  return ((data ?? []) as Array<Record<string, unknown>>)
    .filter((row) => isSystemConnectorProvider(row.provider))
    .map((row) => row as unknown as StoredMaster);
}

async function writeMaster(
  supabase: { from: (table: string) => any },
  actor: Actor,
  provider: SystemConnectorProvider,
  credentials: Record<string, string>,
  previousVersion: number | null,
): Promise<void> {
  const secret = encryptionSecret();
  if (!secret) throw new Error("Master encryption is not configured.");
  const encrypted = encryptForAccount(secret, MASTER_LANE, JSON.stringify(credentials));
  const { error } = await supabase.from("system_connector_credentials").upsert({
    provider,
    ...encrypted,
    credential_version: Math.max(1, Number(previousVersion ?? 0) + 1),
    updated_at: new Date().toISOString(),
    updated_by: actor.id,
  }, { onConflict: "provider" });
  if (error) throw error;
}

function statusFor(provider: SystemConnectorProvider, row: StoredMaster | undefined) {
  const credentials = row ? parseCredentials(provider, row as unknown as Record<string, unknown>) : null;
  const fallback = deploymentSystemConnectorDefaults(provider);
  const active = credentials ?? fallback;
  return {
    provider,
    name: SYSTEM_CONNECTOR_SPECS[provider].name,
    source: credentials ? "master" : Object.keys(fallback).length ? "deployment_fallback" : "missing",
    configured: Object.keys(active).length > 0,
    updated_at: row?.updated_at ?? null,
    credential_version: row?.credential_version ?? null,
    fields: SYSTEM_CONNECTOR_SPECS[provider].fields.map((field) => ({
      key: field.key,
      label: field.label,
      secret: field.secret,
      configured: Boolean(active[field.key]),
      public_value: field.secret ? undefined : publicSystemConnectorValues(provider, active)[field.key] ?? "",
      placeholder: field.placeholder,
    })),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!supabaseUrl || !serviceRoleKey) return res.status(500).json({ error: "Server not configured." });
  const actor = await resolveActor(bearerFrom(req), supabaseUrl, serviceRoleKey);
  if (!actor) return res.status(401).json({ error: "Unauthorized." });
  if (actor.role === "user") return res.status(403).json({ error: "Forbidden." });

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const action = typeof req.query.action === "string" ? req.query.action : "";

  try {
    if (action === "status" && req.method === "GET") {
      const rows = await readMasters(supabase);
      const byProvider = new Map(rows.map((row) => [row.provider, row]));
      return res.status(200).json({
        viewer: {
          role: actor.role,
          can_update: actor.kind === "session" && canManageSystemConnectors(actor.role, envAdminEmails(), envGodEmails()),
        },
        connectors: SYSTEM_CONNECTOR_PROVIDERS.map((provider) => statusFor(provider, byProvider.get(provider))),
      });
    }

    if (action === "resolve" && req.method === "GET") {
      const provider = req.query.provider;
      if (!isSystemConnectorProvider(provider)) return res.status(400).json({ error: "Unknown provider." });
      if (actor.kind === "session" || !matchesSecret(req.headers[BROKER_HEADER], brokerSecret())) {
        return res.status(403).json({ error: "Forbidden." });
      }
      const rows = await readMasters(supabase);
      const row = rows.find((candidate) => candidate.provider === provider);
      const credentials = row ? parseCredentials(provider, row as unknown as Record<string, unknown>) : null;
      const fallback = deploymentSystemConnectorDefaults(provider);
      const resolved = credentials ?? fallback;
      if (Object.keys(resolved).length === 0) return res.status(404).json({ error: "No master connector configured." });
      return res.status(200).json({ credentials: resolved });
    }

    if ((action === "upsert" || action === "import_deployment_defaults") && req.method === "POST") {
      if (actor.kind !== "session" || !canManageSystemConnectors(actor.role, envAdminEmails(), envGodEmails())) {
        return res.status(403).json({ error: "Only the master Superuser can update project connectors." });
      }
      const rows = await readMasters(supabase);
      const byProvider = new Map(rows.map((row) => [row.provider, row]));

      if (action === "upsert") {
        const provider = req.body?.provider;
        if (!isSystemConnectorProvider(provider)) return res.status(400).json({ error: "Unknown provider." });
        const previous = byProvider.get(provider);
        const complete = completeSystemConnectorCredentials(
          provider,
          previous ? parseCredentials(provider, previous as unknown as Record<string, unknown>) : {},
          req.body?.credentials,
        );
        if (!("credentials" in complete)) return res.status(400).json({ error: complete.error });
        await writeMaster(supabase, actor, provider, complete.credentials, previous?.credential_version ?? null);
        return res.status(200).json({ success: true, provider, fields: Object.keys(acceptedSystemConnectorPatch(provider, req.body?.credentials)) });
      }

      const imported: SystemConnectorProvider[] = [];
      for (const provider of SYSTEM_CONNECTOR_PROVIDERS) {
        const values = deploymentSystemConnectorDefaults(provider);
        if (!Object.keys(values).length) continue;
        const previous = byProvider.get(provider);
        await writeMaster(supabase, actor, provider, values, previous?.credential_version ?? null);
        imported.push(provider);
      }
      return res.status(200).json({ success: true, imported });
    }

    return res.status(400).json({ error: "Unknown action." });
  } catch (error) {
    console.error("system-connectors failed", error instanceof Error ? error.message : error);
    return res.status(500).json({ error: "Master connector operation failed." });
  }
}
