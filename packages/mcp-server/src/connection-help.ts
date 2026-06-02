// ─── Shared connector onboarding helper ──────────────────────────────────────
// One consistent shape for every connector's "you are not connected yet"
// response, so an agent (and, later, the Wizard surface) always knows how to
// guide the user from a dead end to a finished connection.
//
// Connections are per UnClick account. A credential stored via
// keychain_secure_connect is encrypted against the caller's UNCLICK_API_KEY, so
// connecting once covers every future session on that account (and is shared by
// everyone who signs in under the same account/email). This helper only
// standardises the message; it never stores, reads, or echoes a secret.
//
// Reference for the "do better, consistently" rule: docs/connector-standard.md.

export interface NotConnectedOptions {
  /** Machine id of the connector / keychain platform, e.g. "stripe". */
  connector: string;
  /** Human name used in messages, e.g. "Stripe". Defaults to a title-cased id. */
  displayName?: string;
  /** What the credential is called, e.g. "secret key" or "API key". */
  credential?: string;
  /** The request argument that supplies it, e.g. "secret_key". */
  arg?: string;
  /** The documented environment variable, e.g. "STRIPE_SECRET_KEY". */
  envVar?: string;
  /** Provider page where the user obtains the credential. */
  setupUrl?: string;
  /** Optional extra one-line hint (no em dashes). */
  note?: string;
}

export interface NotConnectedResult {
  /** Plain one-line message. Kept as `error` for backward compatibility. */
  error: string;
  /** Machine flag so a surface can render a "Connect" card, not a failure. */
  not_connected: true;
  /** The connector / keychain platform id. */
  connector: string;
  /** Ordered, human-readable steps to finish connecting. */
  how_to_connect: string[];
}

function titleCase(id: string): string {
  return id
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Build a consistent "not connected" result for a connector whose credential is
 * missing. Use this in the input-validation lane (return it, do not throw) so
 * the bug pipeline never mistakes a setup gap for a connector fault.
 */
export function notConnected(opts: NotConnectedOptions): NotConnectedResult {
  const name = opts.displayName ?? titleCase(opts.connector);
  const credential = opts.credential ?? "credential";

  const steps: string[] = [];

  // 1) The per-account path: connect once, reused across every future session.
  steps.push(
    `Recommended: connect ${name} once to your UnClick account by calling ` +
      `keychain_secure_connect with platform="${opts.connector}". The ${credential} ` +
      `is stored encrypted and reused automatically next time.`,
  );

  // 2) The direct path: pass it in or set the documented env var for this call.
  const direct: string[] = [];
  if (opts.arg) direct.push(`pass ${opts.arg}`);
  if (opts.envVar) direct.push(`set ${opts.envVar}`);
  if (direct.length > 0) {
    steps.push(`For a one-off call you can instead ${direct.join(" or ")}.`);
  }

  // 3) Where to get the credential.
  if (opts.setupUrl) {
    steps.push(`Get a ${credential} from ${opts.setupUrl}`);
  }

  if (opts.note) steps.push(opts.note);

  const error = `Not connected to ${name}: no ${credential} provided. Connect ${name} to your UnClick account, or supply it for this call (see how_to_connect).`;

  return { error, not_connected: true, connector: opts.connector, how_to_connect: steps };
}

/**
 * Not-connected result for tools that need the UnClick install key itself
 * (UNCLICK_API_KEY) rather than a third-party connector credential. The keychain
 * path does NOT apply here: this key IS the install config the keychain encrypts
 * against, so it must be set as an environment variable. These internal tools
 * (keychain, crews, sloppass, testpass, uxpass) sit outside the connector
 * registry by design (see docs/connect-me-rollout.md); this helper lets them
 * return the same structured shape instead of throwing, so a setup gap is never
 * mistaken for a tool fault.
 */
export function unclickNotConfigured(): NotConnectedResult {
  return {
    error: "UNCLICK_API_KEY env var is not set. Get your install config at https://unclick.world",
    not_connected: true,
    connector: "unclick",
    how_to_connect: [
      "Set the UNCLICK_API_KEY environment variable to your UnClick install key.",
      "Get your install config (which includes UNCLICK_API_KEY) at https://unclick.world",
    ],
  };
}
