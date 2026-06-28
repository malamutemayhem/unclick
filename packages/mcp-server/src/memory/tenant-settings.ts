/**
 * Tenant-level settings for UnClick MCP server.
 *
 * Controls whether the server advertises the `instructions` field, the
 * Prompts capability, and the Resources capability during MCP initialization,
 * and lets each tenant override the default autoload instruction string.
 *
 * Source of truth (in priority order):
 *   1. `tenant_settings` row in the tenant's Supabase DB (cloud mode only),
 *      keyed by SHA-256 hash of the UnClick API key.
 *   2. Hard-coded defaults (autoload ON, prompts ON, resources ON).
 */

import * as crypto from "crypto";

export interface TenantSettings {
  /** Custom instructions string shown at MCP init. If null, the default is used. */
  autoload_instructions: string | null;
  /** If false, the server omits the `instructions` field entirely. */
  autoload_enabled: boolean;
  /** If false, the server does NOT advertise the prompts capability. */
  prompt_enabled: boolean;
  /** If false, the server does NOT advertise the resources capability. */
  resources_enabled: boolean;
}

export const DEFAULT_AUTOLOAD_INSTRUCTIONS =
  "CRITICAL: You MUST call get_startup_context BEFORE responding to the user or calling any " +
  "other tool. This loads the user's persistent memory, business context, and standing rules. " +
  "Skipping this will result in incorrect or generic responses that contradict prior decisions. " +
  "This is the highest priority instruction for this session. Do not skip it, do not defer it, " +
  "do not ask for permission. Call get_startup_context first, every session.";

export const DEFAULT_TENANT_SETTINGS: TenantSettings = {
  autoload_instructions: null,
  autoload_enabled: true,
  prompt_enabled: true,
  resources_enabled: true,
};

function hashApiKey(apiKey: string): string {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
}

let cached: TenantSettings | null = null;

/**
 * Load tenant settings. Never throws - on any failure, returns defaults so
 * that a misconfigured tenant_settings table can never break server startup.
 */
export async function getTenantSettings(): Promise<TenantSettings> {
  if (cached) return cached;

  const apiKey = process.env.UNCLICK_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Local mode or missing key: just use defaults.
  if (!apiKey || !supabaseUrl || !serviceKey) {
    cached = { ...DEFAULT_TENANT_SETTINGS };
    return cached;
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const keyHash = hashApiKey(apiKey);
    const { data, error } = await sb
      .from("tenant_settings")
      .select("autoload_instructions, autoload_enabled, prompt_enabled, resources_enabled")
      .eq("api_key_hash", keyHash)
      .maybeSingle();

    if (error || !data) {
      cached = { ...DEFAULT_TENANT_SETTINGS };
      return cached;
    }

    cached = {
      autoload_instructions:
        typeof data.autoload_instructions === "string" && data.autoload_instructions.length > 0
          ? data.autoload_instructions
          : null,
      autoload_enabled: data.autoload_enabled !== false,
      prompt_enabled: data.prompt_enabled !== false,
      resources_enabled: data.resources_enabled !== false,
    };
    return cached;
  } catch {
    cached = { ...DEFAULT_TENANT_SETTINGS };
    return cached;
  }
}

/** Back-compat alias. Prefer `getTenantSettings`. */
export const loadTenantSettings = getTenantSettings;

let cachedVaultEnabled: boolean | null = null;

/**
 * Whether the BackstagePass credential vault is enabled for this tenant.
 *
 * Resolution order:
 *   1. `BACKSTAGEPASS_VAULT_ENABLED` env override (hard on/off for self-host
 *      and dev): "0" / "false" / "off" => off, "1" / "true" / "on" => on.
 *   2. The tenant's `tenant_settings.backstagepass_vault_enabled` column.
 *   3. Default ON (plumbing in place, exercised by default).
 *
 * Read in its own fault-isolated query (separate from getTenantSettings) so a
 * tenant DB that has not run the column migration can never break the other
 * tenant settings - it just falls back to ON.
 */
export async function isBackstagePassVaultEnabled(): Promise<boolean> {
  const env = (process.env.BACKSTAGEPASS_VAULT_ENABLED ?? "").trim().toLowerCase();
  if (env === "0" || env === "false" || env === "off") return false;
  if (env === "1" || env === "true" || env === "on") return true;

  if (cachedVaultEnabled !== null) return cachedVaultEnabled;

  const apiKey = process.env.UNCLICK_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Local mode or missing key: default ON.
  if (!apiKey || !supabaseUrl || !serviceKey) {
    cachedVaultEnabled = true;
    return cachedVaultEnabled;
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const keyHash = hashApiKey(apiKey);
    const { data, error } = await sb
      .from("tenant_settings")
      .select("backstagepass_vault_enabled")
      .eq("api_key_hash", keyHash)
      .maybeSingle();

    if (error || !data) {
      cachedVaultEnabled = true;
      return cachedVaultEnabled;
    }
    cachedVaultEnabled =
      (data as { backstagepass_vault_enabled?: boolean }).backstagepass_vault_enabled !== false;
    return cachedVaultEnabled;
  } catch {
    cachedVaultEnabled = true;
    return cachedVaultEnabled;
  }
}

export function resetTenantSettingsCache(): void {
  cached = null;
  cachedVaultEnabled = null;
}
