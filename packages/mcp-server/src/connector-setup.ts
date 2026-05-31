// ─── Connector setup registry ────────────────────────────────────────────────
// The single place each connector declares its UNIQUE setup variables.
//
// Two files, two jobs:
//   - connection-help.ts  = the master template (how the "not connected" message
//                           is worded and structured). Tweak it once and every
//                           connector's message changes.
//   - connector-setup.ts  = this file. One row per connector holding only the
//                           bits that differ (display name, the credential's
//                           arg/env var, where to get it). Edit one row to change
//                           a single connector; nothing is copy-pasted per call.
//
// A connector then declares nothing but its id:
//   const key = requireCredential("stripe", args);
//   if (typeof key !== "string") return key;   // not-connected card, already built
//
// This mirrors docs/connectors/setup-metadata-vocabulary.md and the
// platform_connectors registry, kept in code so the local (DB-less) MCP path
// works the same as the hosted one.

import {
  notConnected,
  type NotConnectedOptions,
  type NotConnectedResult,
} from "./connection-help.js";

/** Per-connector unique variables. Everything except the connector id, which is the map key. */
export type ConnectorSetup = Omit<NotConnectedOptions, "connector">;

export const CONNECTOR_SETUP: Record<string, ConnectorSetup> = {
  stripe: {
    displayName: "Stripe",
    credential:  "secret key",
    arg:         "secret_key",
    envVar:      "STRIPE_SECRET_KEY",
    setupUrl:    "https://dashboard.stripe.com/apikeys",
    note:        "The Stripe secret key starts with sk_live_ or sk_test_.",
  },
  etsy: {
    displayName: "Etsy",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ETSY_API_KEY",
    setupUrl:    "https://www.etsy.com/developers/your-apps",
  },
  foursquare: {
    displayName: "Foursquare",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "FOURSQUARE_API_KEY",
    setupUrl:    "https://foursquare.com/developers/home",
  },
  airtable: {
    displayName: "Airtable",
    credential:  "personal access token",
    arg:         "access_token",
    envVar:      "AIRTABLE_API_KEY",
    setupUrl:    "https://airtable.com/create/tokens",
    note:        "Give the token a base scope plus data.records:read (add data.records:write to edit).",
  },
  algolia: {
    displayName: "Algolia",
    credential:  "Admin API key",
    arg:         "api_key",
    envVar:      "ALGOLIA_API_KEY",
    setupUrl:    "https://dashboard.algolia.com/account/api-keys/all",
    note:        "Algolia also needs the Application ID (app_id); both sit on the API keys page.",
  },
  anthropic: {
    displayName: "Anthropic",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ANTHROPIC_API_KEY",
    setupUrl:    "https://console.anthropic.com/settings/keys",
    note:        "The Anthropic API key starts with sk-ant-.",
  },
  assemblyai: {
    displayName: "AssemblyAI",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ASSEMBLYAI_API_KEY",
    setupUrl:    "https://www.assemblyai.com/dashboard",
  },
  abuseipdb: {
    displayName: "AbuseIPDB",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "ABUSEIPDB_API_KEY",
    setupUrl:    "https://www.abuseipdb.com/account/api",
    note:        "The key sits under Account, then the API tab.",
  },
  amber: {
    displayName: "Amber Electric",
    credential:  "API token",
    arg:         "api_key",
    envVar:      "AMBER_API_KEY",
    setupUrl:    "https://app.amber.com.au/developers",
    note:        "Turn on Developers Mode, then generate a token; it starts with psk_.",
  },
  asana: {
    displayName: "Asana",
    credential:  "personal access token",
    arg:         "api_key",
    envVar:      "ASANA_API_KEY",
    setupUrl:    "https://app.asana.com/0/my-apps",
  },
  bandsintown: {
    displayName: "Bandsintown",
    credential:  "app ID",
    arg:         "app_id",
    envVar:      "BANDSINTOWN_APP_ID",
    setupUrl:    "https://www.bandsintown.com/api/requests",
    note:        "The app_id is a public identifier, not a secret; requests are reviewed within a month.",
  },
  brickset: {
    displayName: "Brickset",
    credential:  "API key",
    arg:         "brickset_api_key",
    envVar:      "BRICKSET_API_KEY",
    setupUrl:    "https://brickset.com/tools/webservices/requestkey",
  },
  bungie: {
    displayName: "Bungie",
    credential:  "API key",
    arg:         "api_key",
    envVar:      "BUNGIE_API_KEY",
    setupUrl:    "https://www.bungie.net/en/Application",
    note:        "Create an application to get an X-API-Key for the Destiny 2 API.",
  },
};

/**
 * Build the standard not-connected result for a connector from its registry row.
 * Pass `overrides` for the rare per-call tweak (for example a different credential
 * label on one action). Unknown ids still produce a sensible generic message.
 */
export function notConnectedFor(
  connector: string,
  overrides?: Partial<ConnectorSetup>,
): NotConnectedResult {
  const base = CONNECTOR_SETUP[connector] ?? {};
  return notConnected({ connector, ...base, ...overrides });
}

/**
 * Resolve a connector's credential from the request args or its documented env
 * var (in that order), using the registry. Returns the credential string when
 * present, or a ready-to-return not-connected result when it is missing.
 *
 * Covers the common single-credential connector. Multi-credential connectors
 * (OAuth client id + secret, account sid + token) read their own values and call
 * `notConnectedFor(id)` directly.
 */
export function requireCredential(
  connector: string,
  args: Record<string, unknown>,
  overrides?: Partial<ConnectorSetup>,
): string | NotConnectedResult {
  const setup = { ...CONNECTOR_SETUP[connector], ...overrides };
  const fromArg = setup.arg ? String(args[setup.arg] ?? "").trim() : "";
  const fromEnv = setup.envVar ? String(process.env[setup.envVar] ?? "").trim() : "";
  const value = fromArg || fromEnv;
  if (!value) return notConnected({ connector, ...setup });
  return value;
}
