// Tool gating: hides the tools of apps a tenant has turned OFF in the admin Apps
// page, so "off" actually stops the AI from using an app (not just a saved
// preference). The disabled set lives in tenant_app_state, keyed by api_key_hash.
//
// Design notes:
//   - Fail-safe: any error, missing table, or missing key => empty disabled set
//     => no filtering => current behaviour. Turning enforcement on can never
//     break tool access.
//   - Only catalog apps' tools are gateable. Internal/meta/memory tools are not
//     in the tool index, so they are always kept.

import { createClient } from "@supabase/supabase-js";
import { TOOL_INDEX } from "./memory/tool-index.generated.js";

// tool name -> app slug, built once from the generated tool index.
let toolAppMap: Map<string, string> | null = null;

export function getToolAppMap(): Map<string, string> {
  if (toolAppMap) return toolAppMap;
  const map = new Map<string, string>();
  for (const entry of TOOL_INDEX) {
    for (const tool of entry.tools) map.set(tool.name, entry.app);
  }
  toolAppMap = map;
  return map;
}

export function appForTool(toolName: string): string | undefined {
  return getToolAppMap().get(toolName);
}

/** A tool is blocked when its app is in the disabled set. Unmapped tools are never blocked. */
export function isToolDisabled(toolName: string, disabled: Set<string>): boolean {
  if (disabled.size === 0) return false;
  const app = getToolAppMap().get(toolName);
  return app !== undefined && disabled.has(app);
}

/** Filter a list of tool-definition objects (anything with a `name`) by the disabled set. */
export function filterDisabledTools<T extends { name: string }>(tools: T[], disabled: Set<string>): T[] {
  if (disabled.size === 0) return tools;
  return tools.filter((t) => !isToolDisabled(t.name, disabled));
}

// ─── Disabled-set source (tenant_app_state via service-role Supabase) ───────────

interface CacheEntry {
  value: Set<string>;
  at: number;
}
const cache = new Map<string, CacheEntry>();
const TTL_MS = Number(process.env.UNCLICK_APP_STATE_TTL_MS) || 30_000;

function serviceClient() {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";
  if (!url || !key) return null;
  return createClient(url, key);
}

/** Returns the set of app slugs this tenant has turned off. Fail-safe: empty on any problem. */
export async function getDisabledApps(apiKeyHash: string | null): Promise<Set<string>> {
  if (!apiKeyHash) return new Set();
  const cached = cache.get(apiKeyHash);
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;

  let value = new Set<string>();
  try {
    const supabase = serviceClient();
    if (supabase) {
      const { data } = await supabase
        .from("tenant_app_state")
        .select("disabled_apps")
        .eq("api_key_hash", apiKeyHash)
        .maybeSingle();
      const slugs = (data?.disabled_apps as string[] | undefined) ?? [];
      value = new Set(slugs.filter((s): s is string => typeof s === "string"));
    }
  } catch {
    // fail-safe: treat as nothing disabled so tool access is never broken.
    value = new Set();
  }
  cache.set(apiKeyHash, { value, at: Date.now() });
  return value;
}

/** Test/runtime hook to clear the short-lived cache. */
export function clearDisabledAppsCache(): void {
  cache.clear();
}
