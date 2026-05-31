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
