export type SystemCredentialProvider = "github" | "vercel";
export type SystemCredentialSource = "github_actions_secret" | "vercel_env";
export type SystemCredentialRisk = "critical" | "high" | "normal";

export interface SystemCredentialInventoryEntry {
  provider: SystemCredentialProvider;
  source: SystemCredentialSource;
  name: string;
  scope: string;
  workload: string;
  risk: SystemCredentialRisk;
  expected: boolean;
  docsHint: string;
  rotationImpact: string;
}

const BLOCKED_VALUE_FIELDS = new Set([
  "value",
  "encrypted_value",
  "encryptedValue",
  "vsmValue",
  "legacyValue",
  "secret",
  "token",
  "raw",
]);

const EXCLUDED_NAMES = new Set([
  "GITHUB_TOKEN",
  "VERCEL_URL",
]);

const NAME_PATTERN = /^[A-Z][A-Z0-9_]*$/;

export const SYSTEM_CREDENTIAL_INVENTORY: readonly SystemCredentialInventoryEntry[] = Object.freeze([
  {
    provider: "github",
    source: "github_actions_secret",
    name: "TESTPASS_TOKEN",
    scope: "repository actions secret",
    workload: "TestPass PR checks",
    risk: "critical",
    expected: true,
    docsHint: "GitHub Actions secret metadata can confirm name and timestamps without returning the value.",
    rotationImpact: "PR TestPass checks may fail until the new token is saved and a PR check is rerun.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "TESTPASS_CRON_SECRET",
    scope: "repository actions secret",
    workload: "scheduled TestPass smoke",
    risk: "critical",
    expected: true,
    docsHint: "Track by secret name only; scheduled proof should verify the cron gate.",
    rotationImpact: "Scheduled TestPass smoke may return auth errors until the cron secret and matching route gate agree.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "CRON_SECRET",
    scope: "repository actions secret",
    workload: "scheduled job gates",
    risk: "high",
    expected: true,
    docsHint: "Shared cron gates need rotation notes before any key swap.",
    rotationImpact: "Scheduled jobs using this gate may stop until every scheduler and route environment is updated together.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "UXPASS_TOKEN",
    scope: "repository actions secret",
    workload: "UXPass dogfood and scheduled captures",
    risk: "high",
    expected: true,
    docsHint: "Use dogfood receipts for health evidence; never show the token value.",
    rotationImpact: "UXPass dogfood receipts and scheduled captures may stop proving UX health until the replacement token is verified.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "FISHBOWL_WAKE_TOKEN",
    scope: "repository actions secret",
    workload: "Event Wake Router and WakePass handoffs",
    risk: "critical",
    expected: true,
    docsHint: "Wake dispatch proof is the safe health signal.",
    rotationImpact: "Wake Router may stop creating WakePass handoff proof, so missed work can become quiet again.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "FISHBOWL_AUTOCLOSE_TOKEN",
    scope: "repository actions secret",
    workload: "Fishbowl todo auto-close on PR merge",
    risk: "high",
    expected: true,
    docsHint: "Auto-close workflow success proves the credential path without exposing it.",
    rotationImpact: "Merged PRs may stop closing linked Fishbowl todos until auto-close is rerun successfully.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "OPENROUTER_API_KEY",
    scope: "repository actions secret",
    workload: "wake/no-wake classifier and model routing",
    risk: "high",
    expected: true,
    docsHint: "Only static dry-run prompts should be used for future health probes.",
    rotationImpact: "Ambiguous wake/no-wake routing may fall back to rules or fail closed until classifier access is restored.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "ANTHROPIC_API_KEY",
    scope: "repository actions secret",
    workload: "Claude model workflows",
    risk: "normal",
    expected: false,
    docsHint: "Optional model key; track presence by metadata only.",
    rotationImpact: "Optional Claude workflows may be unavailable until the replacement key is saved.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "SUPABASE_ACCESS_TOKEN",
    scope: "repository actions secret",
    workload: "Supabase CLI automation",
    risk: "high",
    expected: false,
    docsHint: "Supabase automation should use metadata and successful job evidence only.",
    rotationImpact: "Supabase CLI automation may fail until the token is refreshed and a safe metadata probe passes.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "SUPABASE_PROJECT_REF",
    scope: "repository actions secret",
    workload: "Supabase CLI project targeting",
    risk: "normal",
    expected: false,
    docsHint: "Project references are identifiers, but still useful for ownership mapping.",
    rotationImpact: "Supabase automation may target the wrong project or fail until the project reference is confirmed.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "SUPABASE_DB_PASSWORD",
    scope: "repository actions secret",
    workload: "Supabase database automation",
    risk: "critical",
    expected: false,
    docsHint: "Database password rotation needs explicit human approval.",
    rotationImpact: "Database jobs can fail or lock out automation; rotate only with human approval and rollback notes.",
  },
  {
    provider: "github",
    source: "github_actions_secret",
    name: "VAULT_PLAN_JSON",
    scope: "repository actions secret",
    workload: "vault planning workflows",
    risk: "high",
    expected: false,
    docsHint: "Treat as sensitive structured payload; inventory must never copy the contents.",
    rotationImpact: "Vault planning workflows may lose their intended plan context until the payload is replaced safely.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "SUPABASE_URL",
    scope: "project environment variable",
    workload: "admin APIs and runtime Supabase access",
    risk: "normal",
    expected: true,
    docsHint: "Vercel metadata may include value-shaped fields; sanitize before display.",
    rotationImpact: "Admin APIs may fail to reach Supabase if the runtime URL is changed incorrectly.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "SUPABASE_SERVICE_ROLE_KEY",
    scope: "project environment variable",
    workload: "privileged admin/server operations",
    risk: "critical",
    expected: true,
    docsHint: "Service-role rotation needs human review and deploy coordination.",
    rotationImpact: "Privileged admin operations can fail immediately; rotate only with deploy coordination and smoke proof.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "VITE_SUPABASE_URL",
    scope: "project environment variable",
    workload: "browser Supabase configuration",
    risk: "normal",
    expected: true,
    docsHint: "Public runtime names can still help explain which app surface depends on them.",
    rotationImpact: "Browser login and Supabase reads may fail if the public URL points at the wrong project.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "VITE_SUPABASE_ANON_KEY",
    scope: "project environment variable",
    workload: "browser Supabase anon access",
    risk: "normal",
    expected: true,
    docsHint: "Anon keys are not service-role secrets, but rotation can still break login flows.",
    rotationImpact: "Browser auth and public Supabase access may fail until the anon key and project URL match.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "OPENAI_API_KEY",
    scope: "project environment variable",
    workload: "OpenAI model calls",
    risk: "high",
    expected: false,
    docsHint: "Future probes should use read-only model metadata, not user prompts.",
    rotationImpact: "OpenAI-backed features may fail until a replacement key passes a read-only model metadata check.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "ANTHROPIC_API_KEY",
    scope: "project environment variable",
    workload: "Claude model calls",
    risk: "high",
    expected: false,
    docsHint: "Track project ownership and last successful model metadata check.",
    rotationImpact: "Claude-backed features may fail until a replacement key passes a read-only metadata check.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "OPENROUTER_API_KEY",
    scope: "project environment variable",
    workload: "model routing",
    risk: "high",
    expected: false,
    docsHint: "Inventory by name only; never copy Vercel env values into RotatePass.",
    rotationImpact: "Model routing may lose fallback capacity until OpenRouter access is verified.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "CRON_SECRET",
    scope: "project environment variable",
    workload: "scheduled route gates",
    risk: "critical",
    expected: true,
    docsHint: "Cron gate changes can break scheduled Pass receipts.",
    rotationImpact: "Scheduled route calls can fail auth until Vercel env and scheduler secrets are changed together.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "TESTPASS_CRON_USER_ID",
    scope: "project environment variable",
    workload: "scheduled TestPass identity",
    risk: "normal",
    expected: false,
    docsHint: "Identifier only; useful for ownership and blast-radius notes.",
    rotationImpact: "Scheduled TestPass receipts may be attributed to the wrong identity until the ID is corrected.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "UXPASS_CRON_USER_ID",
    scope: "project environment variable",
    workload: "scheduled UXPass identity",
    risk: "normal",
    expected: false,
    docsHint: "Identifier only; pair with scheduled receipt status.",
    rotationImpact: "Scheduled UXPass captures may be attributed to the wrong identity until the ID is corrected.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "POSTHOG_API_KEY",
    scope: "project environment variable",
    workload: "analytics capture",
    risk: "normal",
    expected: false,
    docsHint: "Prefer existing analytics receipt evidence over synthetic events.",
    rotationImpact: "Analytics capture can drop or split events until the project key is corrected.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "POSTHOG_HOST",
    scope: "project environment variable",
    workload: "analytics host routing",
    risk: "normal",
    expected: false,
    docsHint: "Host metadata is safe to show when known.",
    rotationImpact: "Analytics scripts may post to the wrong host or fail until the endpoint is corrected.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "STRIPE_SECRET_KEY",
    scope: "project environment variable",
    workload: "payments",
    risk: "critical",
    expected: false,
    docsHint: "Payments credentials require explicit human approval before any rotation work.",
    rotationImpact: "Payments can fail immediately; rotate only with explicit human approval and Stripe smoke checks.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "STRIPE_WEBHOOK_SECRET",
    scope: "project environment variable",
    workload: "payment webhooks",
    risk: "critical",
    expected: false,
    docsHint: "Webhook secret rotation can break payment event verification.",
    rotationImpact: "Stripe webhook verification can fail until the endpoint secret and provider setting match.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "RESEND_API_KEY",
    scope: "project environment variable",
    workload: "email delivery",
    risk: "high",
    expected: false,
    docsHint: "Email credential health should use delivery metadata only.",
    rotationImpact: "Transactional email may stop sending until delivery metadata confirms the new key.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "ADMIN_NOTIFICATION_EMAIL",
    scope: "project environment variable",
    workload: "admin notifications",
    risk: "normal",
    expected: false,
    docsHint: "Email addresses are metadata, but still avoid broad public display.",
    rotationImpact: "Admin notifications may go to the wrong inbox until the address is corrected.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "UMAMI_WEBSITE_ID",
    scope: "project environment variable",
    workload: "analytics",
    risk: "normal",
    expected: false,
    docsHint: "Identifier only; track with analytics health evidence if used.",
    rotationImpact: "Analytics dashboards may stop matching the site until the website ID is corrected.",
  },
  {
    provider: "vercel",
    source: "vercel_env",
    name: "UMAMI_URL",
    scope: "project environment variable",
    workload: "analytics",
    risk: "normal",
    expected: false,
    docsHint: "Host metadata is safe to show when known.",
    rotationImpact: "Analytics script loading or event capture may fail until the host URL is corrected.",
  },
]);

export function shouldTrackCredentialName(name: string): boolean {
  const normalized = name.trim().toUpperCase();
  return NAME_PATTERN.test(normalized) && !EXCLUDED_NAMES.has(normalized);
}

export function hasSecretValueField(record: Record<string, unknown>): boolean {
  return Object.keys(record).some((key) => BLOCKED_VALUE_FIELDS.has(key));
}

export function sanitizeInventoryRecord(record: Record<string, unknown>): SystemCredentialInventoryEntry | null {
  if (hasSecretValueField(record)) return null;
  const name = typeof record.name === "string" ? record.name.trim().toUpperCase() : "";
  if (!shouldTrackCredentialName(name)) return null;
  if (record.provider !== "github" && record.provider !== "vercel") return null;
  if (record.source !== "github_actions_secret" && record.source !== "vercel_env") return null;

  return {
    provider: record.provider,
    source: record.source,
    name,
    scope: typeof record.scope === "string" ? record.scope : "unknown",
    workload: typeof record.workload === "string" ? record.workload : "unknown",
    risk: record.risk === "critical" || record.risk === "high" ? record.risk : "normal",
    expected: record.expected === true,
    docsHint: typeof record.docsHint === "string" ? record.docsHint : "Metadata only; no secret value is available.",
    rotationImpact: typeof record.rotationImpact === "string"
      ? record.rotationImpact
      : "Dependent workflows may fail until the replacement credential is verified.",
  };
}

export function listSystemCredentialInventory(): readonly SystemCredentialInventoryEntry[] {
  return SYSTEM_CREDENTIAL_INVENTORY;
}
