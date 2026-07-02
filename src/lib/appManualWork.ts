// Manual-work classification for every app in the catalog.
//
// Answers one question per app: "what does a human still have to do before this
// app works?" The answer is derived, not hand-typed, by joining three sources
// that already exist:
//   - src/lib/connectors.ts                  (full sign-in / connection-page flows)
//   - src/data/connector-setup.generated.json (paste-a-key setup metadata)
//   - the app catalog entry                  (offline apps need nothing)
//
// The admin AppTesting page renders this as the "Manual work" column so an
// operator can filter to exactly the apps that still need a human step (get an
// API key from a provider, click a sign-in, create a bot, set an env var).
// Free public APIs and offline utilities classify as "none" automatically.

import { CONNECTORS } from "@/lib/connectors";
import connectorSetupData from "@/data/connector-setup.generated.json";
import type { AppEntry } from "@/lib/appCatalog";

export interface ConnectorSetupRow {
  displayName?: string;
  credential?: string;
  arg?: string;
  envVar?: string;
  setupUrl?: string;
  note?: string;
}

const CONNECTOR_SETUP: Record<string, ConnectorSetupRow> =
  (connectorSetupData as { connectors: Record<string, ConnectorSetupRow> }).connectors;

// Catalog slug -> CONNECTOR_SETUP key, where the two disagree. The setup
// registry keys follow the connector's internal id (what its tool file passes
// to notConnectedFor); the catalog uses the user-facing app slug.
const SETUP_KEY_OF_SLUG: Record<string, string> = {
  pandascore: "esports",
};

/** The connector-setup row for a catalog app slug, following known aliases. */
export function connectorSetupFor(slug: string): ConnectorSetupRow | undefined {
  return CONNECTOR_SETUP[slug] ?? CONNECTOR_SETUP[SETUP_KEY_OF_SLUG[slug] ?? ""];
}

// Apps whose credential is an operator-level deployment secret (set once in the
// server environment), not a per-user key pasted on the Apps page.
const ENV_ONLY_SLUGS = new Set<string>(["abn", "bgg", "tab"]);

// Apps that work today without a key; adding one only raises rate limits.
const OPTIONAL_KEY_SLUGS = new Set<string>(["nasa", "coingecko", "nvd"]);

// UnClick-internal tools that never need an outside account. The Quality
// (XPass) category is internal by definition; these live in other categories.
const INTERNAL_EXTRA_SLUGS = new Set<string>(["vault", "keychain", "crews", "jobsmith", "csuite"]);

export type ManualWorkKind =
  | "none"          // works with no human step
  | "signin"        // click Connect on the Apps page and log in with the provider
  | "bot_setup"     // create a bot or app at the provider, then paste its token
  | "provider_key"  // sign up at the provider and get an API key
  | "env_key";      // operator sets a deployment env var once

export interface ManualWork {
  kind: ManualWorkKind;
  /** Short cell label, simple English. */
  label: string;
  /** One extra line: what exactly the human does. */
  detail?: string;
  /** Where the human goes to do it. */
  url?: string;
  /** True when the app already works and a key is only an upgrade. */
  optionalKey?: boolean;
  /** True for UnClick-internal tools (no outside account exists to connect). */
  internal?: boolean;
}

const NONE: ManualWork = { kind: "none", label: "None" };

function hostOf(url?: string): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Classify one catalog app. Deterministic and data-driven: sign-in connectors
 * win over paste-key rows, operator env secrets and optional keys are called
 * out, offline apps and free public APIs fall through to "none".
 */
export function manualWorkFor(
  app: Pick<AppEntry, "slug" | "category" | "network">,
): ManualWork {
  const { slug } = app;

  if (app.category === "Quality (XPass)" || INTERNAL_EXTRA_SLUGS.has(slug)) {
    return {
      kind: "none",
      label: "None (internal)",
      detail: "UnClick-internal tool; there is no outside account to connect.",
      internal: true,
    };
  }

  const connector = CONNECTORS[slug];
  const setup = connectorSetupFor(slug);

  if (connector?.authType === "oauth2") {
    return {
      kind: "signin",
      label: `Sign in with ${connector.name}`,
      detail: "Click Connect on the Apps page and log in. No key to copy.",
      url: `/connect/${slug}`,
    };
  }

  // bot_token and multi-field api_key connectors (Telegram, Discord, Slack,
  // Bluesky, Mastodon) need something created at the provider first.
  if (connector) {
    const firstField = connector.credentialFields[0];
    return {
      kind: "bot_setup",
      label: `Set up ${firstField?.label ?? "credentials"}`,
      detail: `Create it at ${connector.name}, then finish on the connection page.`,
      url: `/connect/${slug}`,
    };
  }

  if (ENV_ONLY_SLUGS.has(slug) && setup) {
    return {
      kind: "env_key",
      label: `Operator: set ${setup.envVar ?? "env var"}`,
      detail: setup.note ?? "Set the env var on the deployment to activate.",
      url: setup.setupUrl,
    };
  }

  if (setup) {
    if (OPTIONAL_KEY_SLUGS.has(slug)) {
      return {
        kind: "none",
        label: "None (key optional)",
        detail: "Works now; add a key only to raise rate limits.",
        url: setup.setupUrl,
        optionalKey: true,
      };
    }
    const from = hostOf(setup.setupUrl);
    return {
      kind: "provider_key",
      label: `Get ${setup.credential ?? "API key"}`,
      detail: from
        ? `From ${from}, then connect it on the Apps page.`
        : "Get it from the provider, then connect it on the Apps page.",
      url: setup.setupUrl,
    };
  }

  if (app.network === "offline") return NONE;

  // Online with no credential metadata anywhere: a free public API.
  return { kind: "none", label: "None", detail: "Free public API; no account needed." };
}

// Presentation metadata per kind (chip tones follow the page's palette).
export const MANUAL_WORK_META: Record<
  ManualWorkKind,
  { label: string; tone: string; description: string }
> = {
  none: {
    label: "None",
    tone: "border-white/10 bg-white/[0.04] text-white/45",
    description: "Works with no human step (or the tool is UnClick-internal).",
  },
  signin: {
    label: "Sign in",
    tone: "border-[#61C1C4]/30 bg-[#61C1C4]/10 text-[#9be4e6]",
    description: "Click Connect on the Apps page and log in with the provider.",
  },
  bot_setup: {
    label: "Bot or app setup",
    tone: "border-violet-300/25 bg-violet-300/10 text-violet-200",
    description: "Create a bot or app password at the provider, then paste it.",
  },
  provider_key: {
    label: "API key",
    tone: "border-amber-300/25 bg-amber-300/10 text-amber-100",
    description: "Sign up at the provider and get an API key from your account.",
  },
  env_key: {
    label: "Env var",
    tone: "border-sky-300/25 bg-sky-300/10 text-sky-200",
    description: "Operator sets a server-side env var once on the deployment.",
  },
};

/** Kinds that mean a human still has to do something. */
export const NEEDS_HUMAN_KINDS: ManualWorkKind[] = [
  "provider_key",
  "signin",
  "bot_setup",
  "env_key",
];
