// ─── Credential Broker: vault-bridge ─────────────────────────────────────────
// Resolves platform credentials before any tool call.
// Resolution order (first match wins):
//   1. Inline args    - credentials already in the tool call (pass-through)
//   2. Env vars       - UNCLICK_{SLUG}_{FIELD} (e.g., UNCLICK_XERO_ACCESS_TOKEN)
//   3. Local vault    - keys "{slug}/{field}" in ~/.unclick/vault.enc
//                       requires UNCLICK_VAULT_PASSWORD env var to auto-unlock
//   4. UnClick API    - encrypted credentials stored via unclick.world/connect/{slug}
//                       requires UNCLICK_API_KEY env var (the user's UnClick API key)
//                       OR, on a keyless login session, UNCLICK_MCP_SESSION_TOKEN
//                       (a verifiable MCP OAuth access token) to read this
//                       account's server-scheme rows; fetches from
//                       https://unclick.world/api/credentials
//   5. Keychain       - legacy single-value credentials saved from admin Apps
//
// If nothing found: returns a structured error with setup instructions.
//
// Vault key convention:  "{slug}/{field_key}"  e.g.  "xero/access_token"
// Env var convention:    "UNCLICK_{SLUG}_{FIELD}"     e.g. "UNCLICK_XERO_ACCESS_TOKEN"

import { vaultAction }                   from "./vault-tool.js";
import { CONNECTORS, type ConnectorConfig } from "./connectors/index.js";
import { keychainGetCredential }         from "./keychain-tool.js";
import { isBackstagePassVaultEnabled }    from "./memory/tenant-settings.js";

// ─── Helpers ───────────────────────────────────────────

const UNCLICK_CREDENTIAL_SOURCE = "__unclick_credential_source";

export function credentialResolvedFromUnClick(args: Record<string, unknown>): boolean {
  return args[UNCLICK_CREDENTIAL_SOURCE] === "user_credentials";
}

// Client-side mirror of the server UNCLICK_LOGIN_CONNECT_ENABLED flag (default
// OFF). The keyless session-token fallback to /api/credentials is only taken
// when this is on, so with it off behaviour is byte-identical to the api-key
// only original. Matches the api/ flag readers (oauth-init.ts, credentials.ts).
function loginConnectEnabled(): boolean {
  const v = String(process.env.UNCLICK_LOGIN_CONNECT_ENABLED ?? "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}

export async function markCredentialLiveTested(slug: string): Promise<void> {
  const apiKey = process.env.UNCLICK_API_KEY?.trim();
  if (!apiKey) return;

  const apiBase = (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");
  try {
    await fetch(`${apiBase}/api/credentials`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ platform: slug }),
    });
  } catch {
    // Proof stamping is best-effort; the successful provider call still returns.
  }
}

function envKey(slug: string, fieldKey: string): string {
  return `UNCLICK_${slug.toUpperCase().replace(/-/g, "_")}_${fieldKey.toUpperCase().replace(/-/g, "_")}`;
}

function vaultKey(slug: string, fieldKey: string): string {
  return `${slug}/${fieldKey}`;
}

function hasResolvedCredential(resolved: Record<string, unknown>, key: string): boolean {
  return Boolean(resolved[key] && String(resolved[key]).trim() !== "");
}

function unresolvedFields(
  fields: ConnectorConfig["credentialFields"],
  resolved: Record<string, unknown>,
): ConnectorConfig["credentialFields"] {
  return fields.filter((field) => !hasResolvedCredential(resolved, field.key));
}

async function tryResolveFromKeychain(
  slug: string,
  connector: ConnectorConfig,
  resolved: Record<string, unknown>,
  stillMissing: ConnectorConfig["credentialFields"],
): Promise<ConnectorConfig["credentialFields"]> {
  // The admin Apps quick-connect path stores one encrypted credential in
  // platform_credentials. That shape fits single-field key connectors such as
  // Clockify and Notion. OAuth connectors use this only as a fallback after the
  // newer /connect credential row has had first chance, so reconnects win.
  if (connector.credentialFields.length !== 1 || stillMissing.length === 0) {
    return stillMissing;
  }

  const field = connector.credentialFields[0];
  if (!stillMissing.some((f) => f.key === field.key)) return stillMissing;

  try {
    const val = await keychainGetCredential(slug);
    if (val && val.trim() !== "") {
      resolved[field.key] = val.trim();
    }
  } catch {
    // keychain miss - continue to the /connect credential API
  }

  return unresolvedFields(stillMissing, resolved);
}

async function tryResolveFromUnClickApi(
  slug: string,
  resolved: Record<string, unknown>,
  stillMissing: ConnectorConfig["credentialFields"],
): Promise<ConnectorConfig["credentialFields"]> {
  const apiKey  = process.env.UNCLICK_API_KEY?.trim();
  const apiBase = (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");

  // Authorization for the credentials read. The plaintext UnClick api key wins
  // first: it unlocks the apikey-scheme PBKDF2 rows (the zero-knowledge agent
  // path). Only when NO plaintext key is present do we fall back to a verifiable
  // MCP OAuth access token (UNCLICK_MCP_SESSION_TOKEN) minted for a keyless login
  // session, and only when the login-connect flag is on. That token resolves the
  // caller's lane SERVER-SIDE (after cryptographic verification) and reaches the
  // enc_scheme='server' rows only. We NEVER forward UNCLICK_API_KEY_HASH: a bare
  // lane/hash must never authorize a decrypt (it leaks via room membership).
  let bearer = apiKey;
  if (!bearer) {
    const sessionToken = process.env.UNCLICK_MCP_SESSION_TOKEN?.trim();
    if (sessionToken && loginConnectEnabled()) {
      bearer = sessionToken;
    }
  }
  if (!bearer) return stillMissing;

  // BackstagePass vault toggle: when OFF, skip the vault lookup so inline /
  // env / local creds stand on their own (still functional, fewer benefits).
  if (!(await isBackstagePassVaultEnabled())) return stillMissing;

  try {
    const res = await fetch(`${apiBase}/api/credentials?platform=${encodeURIComponent(slug)}`, {
      headers: { Authorization: `Bearer ${bearer}` },
    });
    if (res.ok) {
      const data = (await res.json()) as Record<string, unknown>;
      for (const field of stillMissing) {
        if (data[field.key] && String(data[field.key]).trim() !== "") {
          resolved[field.key] = data[field.key];
        }
      }
      const nextMissing = unresolvedFields(stillMissing, resolved);
      if (nextMissing.length === 0) {
        resolved[UNCLICK_CREDENTIAL_SOURCE] = "user_credentials";
      }
      return nextMissing;
    }
  } catch {
    // network miss - fall through to the next credential source
  }

  return stillMissing;
}

// ─── Core: resolveCredentials ───────────────────────────────────────

/**
 * Resolves missing credentials for a platform tool call.
 *
 * Returns enriched args (with credentials injected) on success.
 * Returns `{ error: string, setup: {...} }` if credentials cannot be found.
 *
 * Usage in a tool file:
 *   const resolved = await resolveCredentials("xero", args);
 *   if ("error" in resolved) return resolved;
 *   // use resolved.access_token, resolved.tenant_id, etc.
 */
export async function resolveCredentials(
  slug: string,
  args: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const connector = CONNECTORS[slug];
  if (!connector) {
    return { error: `No connector config found for platform "${slug}".` };
  }

  // Which fields are missing from the incoming args?
  const missing = connector.credentialFields.filter(
    (f) => !args[f.key] || String(args[f.key]).trim() === ""
  );

  // All present inline - pass straight through.
  if (missing.length === 0) return args;

  const resolved: Record<string, unknown> = { ...args };
  let stillMissing = [...missing];

  // ── 1. Env vars ────────────────────────────────────
  for (const field of stillMissing) {
    const val = process.env[envKey(slug, field.key)];
    if (val && val.trim() !== "") {
      resolved[field.key] = val.trim();
    }
  }
  stillMissing = unresolvedFields(stillMissing, resolved);
  if (stillMissing.length === 0) return resolved;

  // ── 2. Local vault ──────────────────────────────────
  const vaultPassword = process.env.UNCLICK_VAULT_PASSWORD?.trim();
  if (vaultPassword) {
    for (const field of stillMissing) {
      try {
        const result = await vaultAction("vault_retrieve", {
          master_password: vaultPassword,
          key:             vaultKey(slug, field.key),
          reveal:          true,
        });
        if (
          result &&
          typeof result === "object" &&
          "value" in (result as object) &&
          typeof (result as { value: unknown }).value === "string" &&
          (result as { value: string }).value.trim() !== ""
        ) {
          resolved[field.key] = (result as { value: string }).value;
        }
      } catch {
        // vault miss - continue to next source
      }
    }
    stillMissing = unresolvedFields(stillMissing, resolved);
    if (stillMissing.length === 0) return resolved;
  }

  // ── 3. UnClick API and Keychain ─────────────────────────
  //
  // OAuth reconnects write a fresh /connect row in user_credentials. Prefer that
  // path before legacy platform_credentials so an old quick-connect token cannot
  // silently shadow a newly completed provider login.
  if (connector.authType === "oauth2") {
    stillMissing = await tryResolveFromUnClickApi(slug, resolved, stillMissing);
    if (stillMissing.length === 0) return resolved;
    stillMissing = await tryResolveFromKeychain(slug, connector, resolved, stillMissing);
    if (stillMissing.length === 0) return resolved;
  } else {
    stillMissing = await tryResolveFromKeychain(slug, connector, resolved, stillMissing);
    if (stillMissing.length === 0) return resolved;
    stillMissing = await tryResolveFromUnClickApi(slug, resolved, stillMissing);
    if (stillMissing.length === 0) return resolved;
  }

  // ── 4. Return actionable error ──────────────────────────
  return buildSetupError(connector, slug, stillMissing.map((f) => f.key));
}

// ─── Error builder ─────────────────────────────────────────

function buildSetupError(
  connector: ConnectorConfig,
  slug:      string,
  missingKeys: string[]
): Record<string, unknown> {
  const fields = connector.credentialFields.filter((f) => missingKeys.includes(f.key));

  const vaultCommands = fields
    .filter((f) => f.secret)
    .map((f) => `vault_store key="${vaultKey(slug, f.key)}" value="YOUR_${f.key.toUpperCase()}"`)
    .concat(
      fields
        .filter((f) => !f.secret)
        .map((f) => `vault_store key="${vaultKey(slug, f.key)}" value="YOUR_${f.key.toUpperCase()}"`)
    );

  const envVars = fields.map((f) => `${envKey(slug, f.key)}=your_value`);

  return {
    error:   `${connector.name} credentials not configured. Missing: ${missingKeys.join(", ")}.`,
    setup: {
      web:       `https://unclick.world/connect/${slug}`,
      vault:     vaultCommands,
      env_vars:  envVars,
      note:      connector.authType === "oauth2"
        ? `Visit the setup URL to complete the OAuth2 flow. Your token will be stored automatically.`
        : `Paste your credentials at the setup URL or store them directly in the vault.`,
    },
  };
}

// ─── Convenience: connectorFor ───────────────────────────────────────

/** Returns the connector config for a slug, or null. */
export function connectorFor(slug: string): ConnectorConfig | null {
  return CONNECTORS[slug] ?? null;
}
