export const SYSTEM_CONNECTOR_PROVIDERS = ["gitea", "vercel", "supabase"] as const;

export type SystemConnectorProvider = typeof SYSTEM_CONNECTOR_PROVIDERS[number];

export type SystemConnectorField = Readonly<{
  key: string;
  label: string;
  secret: boolean;
  placeholder: string;
}>;

export const SYSTEM_CONNECTOR_SPECS: Readonly<Record<SystemConnectorProvider, {
  name: string;
  fields: readonly SystemConnectorField[];
}>> = {
  gitea: {
    name: "Gitea",
    fields: [
      { key: "base_url", label: "Forge base URL", secret: false, placeholder: "https://git.example.com" },
      { key: "access_token", label: "Access token", secret: true, placeholder: "Leave blank to retain the master token" },
    ],
  },
  vercel: {
    name: "Vercel",
    fields: [{ key: "api_key", label: "Project token", secret: true, placeholder: "Leave blank to retain the master token" }],
  },
  supabase: {
    name: "Supabase",
    fields: [{ key: "access_token", label: "Management token", secret: true, placeholder: "Leave blank to retain the master token" }],
  },
};

export function isSystemConnectorProvider(value: unknown): value is SystemConnectorProvider {
  return typeof value === "string" && (SYSTEM_CONNECTOR_PROVIDERS as readonly string[]).includes(value);
}

function strings(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, candidate]) => typeof candidate === "string")
      .map(([key, candidate]) => [key, (candidate as string).trim()])
      .filter(([, candidate]) => candidate),
  );
}

export function acceptedSystemConnectorPatch(
  provider: SystemConnectorProvider,
  value: unknown,
): Record<string, string> {
  const raw = strings(value);
  const allowed = new Set(SYSTEM_CONNECTOR_SPECS[provider].fields.map((field) => field.key));
  return Object.fromEntries(Object.entries(raw).filter(([key]) => allowed.has(key)));
}

export function completeSystemConnectorCredentials(
  provider: SystemConnectorProvider,
  existing: unknown,
  patch: unknown,
): { credentials: Record<string, string> } | { error: string } {
  const credentials = {
    ...acceptedSystemConnectorPatch(provider, existing),
    ...acceptedSystemConnectorPatch(provider, patch),
  };
  const missing = SYSTEM_CONNECTOR_SPECS[provider].fields
    .filter((field) => !credentials[field.key])
    .map((field) => field.label);
  return missing.length ? { error: `Missing required master value: ${missing.join(", ")}.` } : { credentials };
}

export function publicSystemConnectorValues(
  provider: SystemConnectorProvider,
  credentials: unknown,
): Record<string, string> {
  const values = acceptedSystemConnectorPatch(provider, credentials);
  return Object.fromEntries(
    SYSTEM_CONNECTOR_SPECS[provider].fields
      .filter((field) => !field.secret && values[field.key])
      .map((field) => [field.key, values[field.key]]),
  );
}

/** Existing deployment variables are a server-only bridge during rollout. */
export function deploymentSystemConnectorDefaults(
  provider: SystemConnectorProvider,
  env: NodeJS.ProcessEnv = process.env,
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of SYSTEM_CONNECTOR_SPECS[provider].fields) {
    const current = env[`UNCLICK_SYSTEM_${provider.toUpperCase()}_${field.key.toUpperCase()}`]?.trim();
    if (current) values[field.key] = current;
  }
  if (provider === "gitea") {
    const baseUrl = env.UNCLICK_GITEA_BASE_URL?.trim() || env.GITEA_BASE_URL?.trim();
    const token = env.GITEA_TOKEN?.trim();
    if (baseUrl) values.base_url = baseUrl;
    if (token) values.access_token = token;
  }
  const complete = completeSystemConnectorCredentials(provider, {}, values);
  return "credentials" in complete ? complete.credentials : {};
}
