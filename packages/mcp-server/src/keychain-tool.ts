// ─── UnClick Keychain ─────────────────────────────────────────────────────────
// Encrypted credential vault for platform connections.
// Tenant-isolated by the caller's UNCLICK_API_KEY (SHA-256 hashed for lookups).
// All credential values are AES-256-GCM encrypted at rest.
//
// Required env vars:
//   UNCLICK_API_KEY           - caller's UnClick API key (never stored)
//   SUPABASE_URL              - Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY - service role key (bypasses RLS)

import { encrypt, decrypt, hashKeyFull } from "./keychain-crypto.js";
import { resolveCredential } from "./keychain-secure-input.js";
import { scopesEnabled } from "./memory/scopes.js";

// ─── Supabase helpers ─────────────────────────────────────────────────────────

function sbHeaders(serviceKey: string): Record<string, string> {
  return {
    apikey:         serviceKey,
    Authorization:  `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
    Prefer:         "return=representation",
  };
}

async function sbFetch(
  url:      string,
  method:   string,
  headers:  Record<string, string>,
  body?:    unknown
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let data: unknown;
  try { data = await res.json(); } catch { data = null; }
  return { ok: res.ok, status: res.status, data };
}

// ─── Connection status helpers ───────────────────────────────────────────────

type CredentialStatusSource =
  | "platform_credentials"
  | "user_credentials"
  | "managed_app_connections";

const STALE_CREDENTIAL_TEST_DAYS = 30;

type CredentialConnectionState = "connected" | "untested" | "pending" | "failing" | "stale";
type CredentialHealth = "healthy" | "untested" | "pending" | "failing" | "stale";

interface CredentialStatusRow {
  platform:       string;
  label:          string | null;
  is_valid:       boolean;
  last_tested_at: string | null;
  created_at:     string | null;
  updated_at:     string | null;
  source:         CredentialStatusSource;
  status?:        string | null;
}

function timestampScore(value: unknown): number {
  if (typeof value !== "string" || !value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function credentialScore(row: CredentialStatusRow): number {
  const managedBoost = row.source === "managed_app_connections" ? 100_000_000_000_000 : 0;
  return (row.is_valid ? 1_000_000_000_000_000 : 0)
    + managedBoost
    + (row.last_tested_at ? 1_000_000_000_000 : 0)
    + Math.max(timestampScore(row.updated_at), timestampScore(row.created_at));
}

function mergeCredentialRows(rows: CredentialStatusRow[]): CredentialStatusRow[] {
  const byPlatform = new Map<string, CredentialStatusRow>();
  for (const row of rows) {
    const current = byPlatform.get(row.platform);
    if (!current || credentialScore(row) > credentialScore(current)) {
      byPlatform.set(row.platform, row);
    }
  }
  return [...byPlatform.values()].sort((a, b) => a.platform.localeCompare(b.platform));
}

function hoursSinceIso(value: string | null, now = Date.now()): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return null;
  return Math.max(0, Math.floor((now - parsed) / 3_600_000));
}

function credentialHealth(row: CredentialStatusRow): CredentialHealth {
  if (row.status === "pending") return "pending";
  if (!row.is_valid) return "failing";

  const ageHours = hoursSinceIso(row.last_tested_at);
  if (ageHours === null) return "untested";
  return ageHours >= STALE_CREDENTIAL_TEST_DAYS * 24 ? "stale" : "healthy";
}

function credentialConnectionState(row: CredentialStatusRow): CredentialConnectionState {
  const health = credentialHealth(row);
  return health === "healthy" ? "connected" : health;
}

function credentialIsConnected(row: CredentialStatusRow): boolean {
  return credentialConnectionState(row) === "connected";
}

function credentialStatusMessage(row: CredentialStatusRow): string {
  const state = credentialConnectionState(row);
  if (state === "connected") {
    return `${row.platform} credential has recorded connection proof from ${row.source}.`;
  }
  if (state === "stale") {
    return `${row.platform} credential has old connection proof from ${row.source}; reconnect or test it before trusting it.`;
  }
  if (state === "untested") {
    return `${row.platform} credential is stored in ${row.source}, but has not been live-tested yet.`;
  }
  if (state === "pending") {
    return `${row.platform} connection is pending.`;
  }
  return `${row.platform} credential is saved but not connected.`;
}

async function readCredentialStatusRows(
  supaUrl:    string,
  serviceKey: string,
  keyHash:    string,
  platform:   string | null
): Promise<{ ok: boolean; rows: CredentialStatusRow[] }> {
  const headers = sbHeaders(serviceKey);
  const rows: CredentialStatusRow[] = [];

  let platformUrl =
    `${supaUrl}/rest/v1/platform_credentials?key_hash=eq.${encodeURIComponent(keyHash)}` +
    `&select=platform,label,is_valid,last_tested_at,created_at`;
  if (platform) platformUrl += `&platform=eq.${encodeURIComponent(platform)}`;

  const platformResult = await sbFetch(platformUrl, "GET", headers);
  if (!platformResult.ok) return { ok: false, rows: [] };
  for (const row of platformResult.data as Array<Record<string, unknown>>) {
    rows.push({
      platform:       String(row.platform ?? ""),
      label:          row.label == null ? null : String(row.label),
      is_valid:       row.is_valid !== false,
      last_tested_at: row.last_tested_at == null ? null : String(row.last_tested_at),
      created_at:     row.created_at == null ? null : String(row.created_at),
      updated_at:     null,
      source:         "platform_credentials",
    });
  }

  let userUrl =
    `${supaUrl}/rest/v1/user_credentials?api_key_hash=eq.${encodeURIComponent(keyHash)}` +
    `&select=platform_slug,label,is_valid,last_tested_at,created_at,updated_at`;
  if (platform) userUrl += `&platform_slug=eq.${encodeURIComponent(platform)}`;

  const userResult = await sbFetch(userUrl, "GET", headers);
  if (userResult.ok) {
    for (const row of userResult.data as Array<Record<string, unknown>>) {
      rows.push({
        platform:       String(row.platform_slug ?? ""),
        label:          row.label == null ? null : String(row.label),
        is_valid:       row.is_valid !== false,
        last_tested_at: row.last_tested_at == null ? null : String(row.last_tested_at),
        created_at:     row.created_at == null ? null : String(row.created_at),
        updated_at:     row.updated_at == null ? null : String(row.updated_at),
        source:         "user_credentials",
      });
    }
  }

  let managedUrl =
    `${supaUrl}/rest/v1/managed_app_connections?api_key_hash=eq.${encodeURIComponent(keyHash)}` +
    `&status=in.(connected,pending)` +
    `&select=platform_slug,status,account_label,last_checked_at,connected_at,created_at,updated_at`;
  if (platform) managedUrl += `&platform_slug=eq.${encodeURIComponent(platform)}`;

  const managedResult = await sbFetch(managedUrl, "GET", headers);
  if (managedResult.ok) {
    for (const row of managedResult.data as Array<Record<string, unknown>>) {
      const status = row.status == null ? null : String(row.status);
      rows.push({
        platform:       String(row.platform_slug ?? ""),
        label:          row.account_label == null ? null : String(row.account_label),
        is_valid:       status === "connected",
        last_tested_at: row.last_checked_at == null
          ? (row.connected_at == null ? null : String(row.connected_at))
          : String(row.last_checked_at),
        created_at:     row.created_at == null ? null : String(row.created_at),
        updated_at:     row.updated_at == null ? null : String(row.updated_at),
        source:         "managed_app_connections",
        status,
      });
    }
  }

  return { ok: true, rows: mergeCredentialRows(rows.filter((row) => row.platform)) };
}

// ─── Metering ─────────────────────────────────────────────────────────────────

async function logMeter(
  supabaseUrl:  string,
  serviceKey:   string,
  keyHash:      string,
  platform:     string,
  operation:    string,
  success:      boolean,
  responseMs:   number
): Promise<void> {
  try {
    await sbFetch(
      `${supabaseUrl}/rest/v1/metering_events`,
      "POST",
      { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      {
        key_hash:    keyHash,
        platform,
        operation,
        success,
        response_ms: responseMs,
      }
    );
  } catch {
    // metering failure must never block the caller
  }
}

// ─── Connection test logging ──────────────────────────────────────────────────

async function logConnectionTest(
  supabaseUrl: string,
  serviceKey:  string,
  platform:    string,
  keyHash:     string,
  result: {
    success:        boolean;
    status_code?:   number;
    error_message?: string;
    response_ms:    number;
    auth_method:    string;
    auto_bug_filed: boolean;
  }
): Promise<void> {
  try {
    await sbFetch(
      `${supabaseUrl}/rest/v1/connection_tests`,
      "POST",
      { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      {
        key_hash:       keyHash,
        platform,
        success:        result.success,
        status_code:    result.status_code ?? null,
        error_message:  result.error_message ?? null,
        response_ms:    result.response_ms,
        auth_method:    result.auth_method,
        auto_bug_filed: result.auto_bug_filed,
      }
    );
  } catch {
    // logging must never block the main operation
  }
}

// ─── Auto bug report on connection failure ────────────────────────────────────

async function autoBugReport(
  supabaseUrl:  string,
  serviceKey:   string,
  platform:     string,
  errorMessage: string,
  statusCode?:  number
): Promise<boolean> {
  try {
    // Dedup: skip if a bug for this platform was filed in the last 24 hours
    const cutoff  = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const checkUrl = `${supabaseUrl}/rest/v1/bug_reports?tool_name=eq.${encodeURIComponent(platform)}&created_at=gte.${encodeURIComponent(cutoff)}&select=id&limit=1`;
    const { ok: checkOk, data: checkData } = await sbFetch(checkUrl, "GET", sbHeaders(serviceKey));
    if (checkOk) {
      const existing = checkData as Array<unknown>;
      if (existing && existing.length > 0) return false;
    }

    // Severity: high for auth failures, medium for timeouts, low for other
    let severity = "low";
    const msg = errorMessage.toLowerCase();
    if (statusCode === 401 || statusCode === 403 || msg.includes("unauthorized") || msg.includes("forbidden")) {
      severity = "high";
    } else if (msg.includes("timeout") || msg.includes("timed out") || msg.includes("econnreset") || msg.includes("network")) {
      severity = "medium";
    }

    const { ok } = await sbFetch(
      `${supabaseUrl}/rest/v1/bug_reports`,
      "POST",
      { ...sbHeaders(serviceKey), Prefer: "return=minimal" },
      {
        tool_name:     platform,
        error_message: errorMessage,
        agent_context: "Auto-filed by Keychain connection test",
        severity,
        status:        "open",
      }
    );
    return ok;
  } catch {
    return false;
  }
}

// ─── Platform test configuration ─────────────────────────────────────────────
// Describes how to authenticate against each platform's test endpoint.
// Platforms not listed here default to: GET with Authorization: Bearer <cred>.

interface PlatformTestConfig {
  method?:      "GET" | "POST";
  buildHeaders: (credential: string) => Record<string, string>;
  body?:        unknown;
  skip?:        boolean;  // true for OAuth platforms or those with no testable endpoint
  auth_method?: string;
}

const PLATFORM_TEST_CONFIG: Record<string, PlatformTestConfig> = {
  // Stripe: Basic auth with key as username, empty password
  stripe: {
    auth_method:  "basic",
    buildHeaders: (cred) => ({
      Authorization: `Basic ${Buffer.from(`${cred}:`).toString("base64")}`,
    }),
  },
  // Twilio: Basic auth with AccountSID:AuthToken as a single credential string
  twilio: {
    auth_method:  "basic",
    buildHeaders: (cred) => ({
      Authorization: `Basic ${Buffer.from(cred).toString("base64")}`,
    }),
  },
  // Anthropic: x-api-key header + version header, POST with minimal body
  anthropic: {
    method:       "POST",
    auth_method:  "x-api-key",
    buildHeaders: (cred) => ({
      "x-api-key":          cred,
      "anthropic-version":  "2023-06-01",
      "Content-Type":       "application/json",
    }),
    body: {
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 1,
      messages:   [{ role: "user", content: "hi" }],
    },
  },
  // Notion: Bearer + required Notion-Version header
  notion: {
    auth_method:  "bearer",
    buildHeaders: (cred) => ({
      Authorization:    `Bearer ${cred}`,
      "Notion-Version": "2022-06-28",
    }),
  },
  // Linear: Bearer + POST GraphQL
  linear: {
    method:       "POST",
    auth_method:  "bearer",
    buildHeaders: (cred) => ({
      Authorization:  `Bearer ${cred}`,
      "Content-Type": "application/json",
    }),
    body: { query: "{ viewer { id } }" },
  },
  // Shopify: custom header - but test URL has {store} placeholder so test is skipped
  shopify: {
    skip:         true,
    auth_method:  "custom-header",
    buildHeaders: (cred) => ({ "X-Shopify-Access-Token": cred }),
  },
  // Xero: OAuth2 - cannot test with a bare API key
  xero: {
    skip:         true,
    auth_method:  "oauth2",
    buildHeaders: () => ({}),
  },
  // Railway: Bearer + POST GraphQL
  railway: {
    method:       "POST",
    auth_method:  "bearer",
    buildHeaders: (cred) => ({
      Authorization:  `Bearer ${cred}`,
      "Content-Type": "application/json",
    }),
    body: { query: "{ me { id } }" },
  },
};

function defaultBuildHeaders(cred: string): Record<string, string> {
  return { Authorization: `Bearer ${cred}` };
}

// ─── Credential test ──────────────────────────────────────────────────────────

interface TestResult {
  passed:         boolean;
  skipped:        boolean;
  message:        string;
  status_code?:   number;
  response_ms:    number;
  error_message?: string;
  auth_method:    string;
}

// Exported so the web admin connect flow (api/memory-admin admin_connect_app)
// can run the exact same live proof before storing a credential.
export async function testCredential(
  platform:     string,
  credential:   string,
  testEndpoint: string | null
): Promise<TestResult> {
  const config      = PLATFORM_TEST_CONFIG[platform];
  const auth_method = config?.auth_method ?? "bearer";

  if (!testEndpoint) {
    return { passed: false, skipped: true, message: "No test endpoint configured.", response_ms: 0, auth_method };
  }

  // Skip endpoints with dynamic placeholders (e.g. {project_ref}, {store})
  if (/\{[^}]+\}/.test(testEndpoint)) {
    return {
      passed:      true,
      skipped:     true,
      message:     `${platform} credential accepted without live test (dynamic endpoint).`,
      response_ms: 0,
      auth_method,
    };
  }

  // Skip OAuth or explicitly skipped platforms
  if (config?.skip) {
    return {
      passed:      true,
      skipped:     true,
      message:     `${platform} credential stored (live test not available for this platform type).`,
      response_ms: 0,
      auth_method,
    };
  }

  const start        = Date.now();
  const buildHeaders = config?.buildHeaders ?? defaultBuildHeaders;
  const method       = config?.method ?? "GET";
  const body         = config?.body;

  try {
    const fetchOptions: RequestInit = { method, headers: buildHeaders(credential) };
    if (body !== undefined) {
      fetchOptions.body = JSON.stringify(body);
    }

    const res  = await fetch(testEndpoint, fetchOptions);
    const ms   = Date.now() - start;

    if (res.ok || res.status === 200) {
      return {
        passed:      true,
        skipped:     false,
        message:     `Credential verified in ${ms}ms.`,
        status_code: res.status,
        response_ms: ms,
        auth_method,
      };
    }

    if (res.status === 401 || res.status === 403) {
      const errMsg = `Credential rejected by ${platform} (HTTP ${res.status}). Check your token.`;
      return {
        passed:        false,
        skipped:       false,
        message:       errMsg,
        status_code:   res.status,
        response_ms:   ms,
        error_message: errMsg,
        auth_method,
      };
    }

    // Other non-200s (rate limits, partial responses) - treat as passing
    return {
      passed:      true,
      skipped:     false,
      message:     `${platform} responded with HTTP ${res.status} - credential appears valid.`,
      status_code: res.status,
      response_ms: ms,
      auth_method,
    };
  } catch (err) {
    const ms     = Date.now() - start;
    const errMsg = `Could not reach ${platform} test endpoint: ${err instanceof Error ? err.message : String(err)}`;
    return {
      passed:        false,
      skipped:       false,
      message:       errMsg,
      response_ms:   ms,
      error_message: errMsg,
      auth_method,
    };
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────────

async function keychainConnect(args: Record<string, unknown>): Promise<unknown> {
  const apiKey     = String(process.env.UNCLICK_API_KEY ?? "").trim();
  const supaUrl    = String(process.env.SUPABASE_URL ?? "").trim();
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  if (!apiKey)     return { error: "UNCLICK_API_KEY env var is not set." };
  if (!supaUrl)    return { error: "SUPABASE_URL env var is not set." };
  if (!serviceKey) return { error: "SUPABASE_SERVICE_ROLE_KEY env var is not set." };

  const platform   = String(args.platform   ?? "").trim().toLowerCase();
  const credential = String(args.credential ?? "").trim();
  const label      = String(args.label      ?? "default").trim() || "default";

  if (!platform)   return { error: "platform is required." };
  if (!credential) return { error: "credential is required." };

  const start   = Date.now();
  const keyHash = hashKeyFull(apiKey);

  // Look up the platform connector
  const connectorUrl = `${supaUrl}/rest/v1/platform_connectors?id=eq.${encodeURIComponent(platform)}&select=id,name,test_endpoint`;
  const { ok: cOk, data: cData } = await sbFetch(connectorUrl, "GET", sbHeaders(serviceKey));
  if (!cOk) {
    return { error: "Failed to look up platform connector." };
  }

  const connectors = cData as Array<Record<string, unknown>>;
  if (!connectors || connectors.length === 0) {
    return { error: `Unknown platform "${platform}". Use keychain_list_platforms to see available options.` };
  }

  const connector   = connectors[0];
  const testEndpoint = connector.test_endpoint ? String(connector.test_endpoint) : null;

  // Test the credential before storing
  const test         = await testCredential(platform, credential, testEndpoint);
  const autoBugFiled = !test.passed && !test.skipped
    ? await autoBugReport(supaUrl, serviceKey, platform, test.error_message ?? test.message, test.status_code)
    : false;

  await logConnectionTest(supaUrl, serviceKey, platform, keyHash, {
    success:        test.passed,
    status_code:    test.status_code,
    error_message:  test.error_message,
    response_ms:    test.response_ms,
    auth_method:    test.auth_method,
    auto_bug_filed: autoBugFiled,
  });

  if (!test.passed) {
    await logMeter(supaUrl, serviceKey, keyHash, platform, "connect", false, Date.now() - start);
    return {
      error:    `Credential validation failed for ${platform}.`,
      message:  test.message,
      platform,
      label,
      status:   "rejected",
    };
  }

  // Encrypt and store
  const { encrypted_value, iv, auth_tag } = encrypt(credential, apiKey);
  const now = new Date().toISOString();

  const row = {
    key_hash:        keyHash,
    platform,
    label,
    encrypted_value,
    iv,
    auth_tag,
    is_valid:        true,
    last_tested_at:  now,
    created_at:      now,
  };

  const upsertUrl = `${supaUrl}/rest/v1/platform_credentials`;
  const { ok, status } = await sbFetch(
    upsertUrl,
    "POST",
    { ...sbHeaders(serviceKey), Prefer: "resolution=merge-duplicates,return=minimal" },
    row
  );

  const ms = Date.now() - start;
  await logMeter(supaUrl, serviceKey, keyHash, platform, "connect", ok, ms);

  if (!ok) {
    return { error: `Failed to store credential (HTTP ${status}).` };
  }

  return {
    platform,
    label,
    status:     "connected",
    tested:     !test.skipped,
    tested_at:  now,
    message:    test.message,
  };
}

async function keychainStatus(args: Record<string, unknown>): Promise<unknown> {
  const apiKey     = String(process.env.UNCLICK_API_KEY ?? "").trim();
  const supaUrl    = String(process.env.SUPABASE_URL ?? "").trim();
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  if (!apiKey)     return { error: "UNCLICK_API_KEY env var is not set." };
  if (!supaUrl)    return { error: "SUPABASE_URL env var is not set." };
  if (!serviceKey) return { error: "SUPABASE_SERVICE_ROLE_KEY env var is not set." };

  const start    = Date.now();
  const keyHash  = hashKeyFull(apiKey);
  const platform = args.platform ? String(args.platform).trim().toLowerCase() : null;

  const { ok, rows } = await readCredentialStatusRows(supaUrl, serviceKey, keyHash, platform);

  const ms = Date.now() - start;
  await logMeter(supaUrl, serviceKey, keyHash, platform ?? "all", "status", ok, ms);

  if (!ok) return { error: "Failed to query credentials." };

  if (!rows || rows.length === 0) {
    if (platform) {
      return { platform, connected: false, message: `No credential stored for "${platform}".` };
    }
    return { connected_platforms: [], count: 0 };
  }

  const result = rows.map((r) => {
    const health = credentialHealth(r);
    const verified = health === "healthy";
    return {
      platform:       r.platform,
      label:          r.label,
      is_valid:       r.is_valid,
      credential_saved: true,
      last_tested_at: r.last_tested_at,
      last_tested_age_hours: hoursSinceIso(r.last_tested_at),
      created_at:     r.created_at,
      updated_at:     r.updated_at,
      source:         r.source,
      status:         r.status ?? null,
      health,
      verified,
      connection_state: credentialConnectionState(r),
      connected:      credentialIsConnected(r),
    };
  });

  if (platform) {
    const row = result[0];
    return {
      ...row,
      message:   credentialStatusMessage(rows[0]),
    };
  }

  const unverified = result.filter((row) => row.credential_saved && !row.verified).map((row) => row.platform);
  return {
    connected_platforms: result,
    count: result.length,
    unverified_platforms: unverified,
    warnings: unverified.length > 0
      ? [`Stored credentials need live proof before they are treated as connected: ${unverified.join(", ")}.`]
      : [],
  };
}

async function keychainDisconnect(args: Record<string, unknown>): Promise<unknown> {
  const apiKey     = String(process.env.UNCLICK_API_KEY ?? "").trim();
  const supaUrl    = String(process.env.SUPABASE_URL ?? "").trim();
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  if (!apiKey)     return { error: "UNCLICK_API_KEY env var is not set." };
  if (!supaUrl)    return { error: "SUPABASE_URL env var is not set." };
  if (!serviceKey) return { error: "SUPABASE_SERVICE_ROLE_KEY env var is not set." };

  const platform = String(args.platform ?? "").trim().toLowerCase();
  const label    = args.label ? String(args.label).trim() : null;

  if (!platform) return { error: "platform is required." };

  const start    = Date.now();
  const keyHash  = hashKeyFull(apiKey);

  let deleteUrl = `${supaUrl}/rest/v1/platform_credentials?key_hash=eq.${encodeURIComponent(keyHash)}&platform=eq.${encodeURIComponent(platform)}`;
  if (label) {
    deleteUrl += `&label=eq.${encodeURIComponent(label)}`;
  }

  const { ok, status } = await sbFetch(deleteUrl, "DELETE", sbHeaders(serviceKey));

  const ms = Date.now() - start;
  await logMeter(supaUrl, serviceKey, keyHash, platform, "disconnect", ok, ms);

  if (!ok) {
    return { error: `Failed to remove credential (HTTP ${status}).` };
  }

  // --- lane-04: quarantine memory derived from the revoked credential.
  // Best-effort: the disconnect still succeeds if quarantine fails. No-op
  // unless MEMORY_SCOPES_ENABLED is on. ---
  let memory_quarantined = 0;
  if (scopesEnabled()) {
    try {
      const { getBackend } = await import("./memory/db.js");
      const backend = await getBackend();
      const result = await backend.quarantineCredentialMemory(platform);
      memory_quarantined = result?.quarantined ?? 0;
    } catch (err) {
      console.error("[keychain_disconnect] memory quarantine failed:", err);
    }
  }
  // --- end lane-04 ---

  return {
    platform,
    label:  label ?? "all",
    status: "disconnected",
    memory_quarantined,
  };
}

async function keychainListPlatforms(args: Record<string, unknown>): Promise<unknown> {
  const apiKey     = String(process.env.UNCLICK_API_KEY ?? "").trim();
  const supaUrl    = String(process.env.SUPABASE_URL ?? "").trim();
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  if (!supaUrl)    return { error: "SUPABASE_URL env var is not set." };
  if (!serviceKey) return { error: "SUPABASE_SERVICE_ROLE_KEY env var is not set." };

  const category = args.category ? String(args.category).trim() : null;
  const start    = Date.now();

  let connectorUrl = `${supaUrl}/rest/v1/platform_connectors?select=id,name,category,auth_type,description,setup_url,sort_order&order=sort_order.asc`;
  if (category) {
    connectorUrl += `&category=eq.${encodeURIComponent(category)}`;
  }

  const { ok, data } = await sbFetch(connectorUrl, "GET", sbHeaders(serviceKey));
  if (!ok) return { error: "Failed to query platform connectors." };

  const platforms = data as Array<Record<string, unknown>>;

  // If the caller has an API key, enrich with connection status
  if (apiKey) {
    const keyHash  = hashKeyFull(apiKey);
    const { ok: sOk, rows: statusRows } = await readCredentialStatusRows(supaUrl, serviceKey, keyHash, null);

    const ms = Date.now() - start;
    await logMeter(supaUrl, serviceKey, keyHash, "all", "list_platforms", sOk, ms);

    if (sOk) {
      const statuses = new Map(statusRows.map((row) => [row.platform, row]));
      const platformResults = platforms.map((p) => {
        const statusRow = statuses.get(String(p.id));
        const health = statusRow ? credentialHealth(statusRow) : "untested";
        return {
          ...p,
          id: String(p.id ?? ""),
          connected: statusRow ? credentialIsConnected(statusRow) : false,
          credential_saved: Boolean(statusRow),
          health: statusRow ? health : "missing",
          verified: statusRow ? health === "healthy" : false,
          last_tested_age_hours: statusRow ? hoursSinceIso(statusRow.last_tested_at) : null,
          connection_state: statusRow ? credentialConnectionState(statusRow) : "missing",
          connected_source: statusRow?.source ?? null,
        };
      });
      const unverified = platformResults
        .filter((platform) => platform.credential_saved && !platform.verified)
        .map((platform) => String(platform.id));
      return {
        platforms: platformResults,
        count: platforms.length,
        unverified_platforms: unverified,
        warnings: unverified.length > 0
          ? [`Stored credentials need live proof before they are treated as connected: ${unverified.join(", ")}.`]
          : [],
      };
    }
  }

  return { platforms, count: platforms.length };
}

// ─── Decrypt helper for internal use ─────────────────────────────────────────
// Called by other tools that need to retrieve a stored credential.

export async function keychainGetCredential(platform: string, label = "default"): Promise<string | null> {
  const apiKey     = String(process.env.UNCLICK_API_KEY ?? "").trim();
  const supaUrl    = String(process.env.SUPABASE_URL ?? "").trim();
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  if (!apiKey || !supaUrl || !serviceKey) return null;

  const keyHash = hashKeyFull(apiKey);
  const url     = `${supaUrl}/rest/v1/platform_credentials?key_hash=eq.${encodeURIComponent(keyHash)}&platform=eq.${encodeURIComponent(platform)}&label=eq.${encodeURIComponent(label)}&select=encrypted_value,iv,auth_tag`;

  const { ok, data } = await sbFetch(url, "GET", sbHeaders(serviceKey));
  if (!ok) return null;

  const rows = data as Array<Record<string, string>>;
  if (!rows || rows.length === 0) return null;

  try {
    return decrypt(rows[0].encrypted_value, rows[0].iv, rows[0].auth_tag, apiKey);
  } catch {
    return null;
  }
}

// ─── Secure connect (env detection + localhost input page) ────────────────────

async function keychainSecureConnect(args: Record<string, unknown>): Promise<unknown> {
  const platform = String(args.platform ?? "").trim().toLowerCase();
  const label    = String(args.label    ?? "default").trim() || "default";

  if (!platform) return { error: "platform is required." };

  const state = resolveCredential(platform, args.setup_url ? String(args.setup_url) : undefined);

  if (state.status === "awaiting_input") {
    return {
      status:  "awaiting_input",
      url:     state.url,
      message: state.message,
      next_step: `Open the URL in a browser, paste your key, then call keychain_secure_connect again with the same platform to complete the connection.`,
    };
  }

  // Credential resolved - proceed with the same flow as keychain_connect
  const credential = state.value!;
  return keychainConnect({ ...args, platform, credential, label });
}

// ─── Public dispatcher ────────────────────────────────────────────────────────

export async function keychainAction(
  action: string,
  args:   Record<string, unknown>
): Promise<unknown> {
  try {
    switch (action) {
      case "keychain_connect":        return keychainConnect(args);
      case "keychain_status":         return keychainStatus(args);
      case "keychain_disconnect":     return keychainDisconnect(args);
      case "keychain_list_platforms": return keychainListPlatforms(args);
      case "keychain_secure_connect": return keychainSecureConnect(args);
      default:
        return {
          error: `Unknown keychain action: "${action}". Valid actions: keychain_connect, keychain_status, keychain_disconnect, keychain_list_platforms, keychain_secure_connect.`,
        };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
