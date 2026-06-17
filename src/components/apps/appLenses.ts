/**
 * App lenses: the one-list-many-lenses brain for the admin Apps page.
 *
 * Operator's rule (docs/prd/connections-apps-holistic.md): there is exactly
 * one Apps list; every view is a filter of it, selected through ONE state
 * shared by the side rail and the top chips. These are the pure parts so the
 * taxonomy is testable without a DOM.
 */

import type { AppEntry } from "@/lib/appCatalog";

export type AppLens = "all" | "popular" | "connected" | "not-connected" | "signin" | "key" | "builtin";

export type SetupKind = "signin" | "key" | "builtin";

/** Minimal connector shape the lenses need; matches the admin_tools API rows. */
export interface LensConnector {
  auth_type?: "oauth2" | "api_key" | "bot_token";
  supports_managed_connection?: boolean;
  supports_hosted_mcp_connection?: boolean;
  credential: {
    id?: string | null;
    is_valid: boolean;
    last_tested_at: string | null;
    source?: "platform_credentials" | "user_credentials" | "managed_app_connections" | "mixed";
  } | null;
}

/** One source array drives the rail, the chips, and the URL contract. */
export const LENSES: ReadonlyArray<{ id: AppLens; label: string; group: "Library" | "Status" | "Setup" }> = [
  { id: "all", label: "All", group: "Library" },
  { id: "popular", label: "Popular", group: "Library" },
  { id: "connected", label: "Connected", group: "Status" },
  { id: "not-connected", label: "Not connected", group: "Status" },
  { id: "signin", label: "Sign-in apps", group: "Setup" },
  { id: "key", label: "Key apps", group: "Setup" },
  { id: "builtin", label: "Built-in", group: "Setup" },
];

/**
 * Curated starter set, not usage data (we do not have per-app usage analytics
 * yet; when we do, this becomes a computed list). Checked against catalog
 * membership at runtime so a stale slug degrades to nothing, never an error.
 */
export const POPULAR_SLUGS: ReadonlySet<string> = new Set([
  "github", "openai", "anthropic", "slack", "notion", "stripe", "discord",
  "spotify", "vercel", "supabase", "telegram", "reddit", "shopify", "linear",
  "email", "weather",
]);

export function setupKindOf(connector: LensConnector | undefined): SetupKind {
  if (!connector?.auth_type) return "builtin";
  if (connector.supports_managed_connection || connector.supports_hosted_mcp_connection) return "signin";
  return connector.auth_type === "oauth2" ? "signin" : "key";
}

/** Connected = a working credential is on file. The status pill still distinguishes proven (tested) from saved. */
export function isConnected(connector: LensConnector | undefined): boolean {
  return Boolean(connector?.credential?.is_valid);
}

/**
 * The action button label: buttons say the action, pills say the truth.
 * null = nothing to do (built-in apps).
 */
export function actionLabelFor(connector: LensConnector | undefined): "Connect" | "Add key" | "Manage" | null {
  const kind = setupKindOf(connector);
  if (kind === "builtin") return null;
  if (isConnected(connector)) return "Manage";
  return kind === "signin" ? "Connect" : "Add key";
}

export function matchesLens(app: AppEntry, lens: AppLens, connector: LensConnector | undefined): boolean {
  switch (lens) {
    case "all": return true;
    case "popular": return POPULAR_SLUGS.has(app.slug);
    case "connected": return isConnected(connector);
    case "not-connected": return Boolean(connector) && !isConnected(connector);
    case "signin": return setupKindOf(connector) === "signin";
    case "key": return setupKindOf(connector) === "key";
    case "builtin": return setupKindOf(connector) === "builtin";
  }
}

export function applyLens(apps: AppEntry[], lens: AppLens, connectorBySlug: Map<string, LensConnector>): AppEntry[] {
  if (lens === "all") return apps;
  return apps.filter((app) => matchesLens(app, lens, connectorBySlug.get(app.slug)));
}

export function lensCounts(apps: AppEntry[], connectorBySlug: Map<string, LensConnector>): Record<AppLens, number> {
  const counts = Object.fromEntries(LENSES.map((l) => [l.id, 0])) as Record<AppLens, number>;
  for (const app of apps) {
    const connector = connectorBySlug.get(app.slug);
    for (const { id } of LENSES) {
      if (matchesLens(app, id, connector)) counts[id] += 1;
    }
  }
  return counts;
}

export function parseAppLens(value: string | null | undefined): AppLens {
  return (LENSES.some((l) => l.id === value) ? value : "all") as AppLens;
}
