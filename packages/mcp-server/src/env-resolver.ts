// Environment variable resolver with fallback chains.
// Connectors often need an API key that could be in any of several
// env var names (legacy, new, generic). This resolves the first
// available value from a priority list.

export interface EnvSource {
  get(key: string): string | undefined;
}

const processEnv: EnvSource = {
  get(key: string) {
    return process.env[key];
  },
};

export function resolveEnv(
  keys: string[],
  source: EnvSource = processEnv,
): string | undefined {
  for (const key of keys) {
    const value = source.get(key);
    if (value !== undefined && value.trim() !== "") {
      return value.trim();
    }
  }
  return undefined;
}

export function requireEnv(
  keys: string[],
  label: string,
  source: EnvSource = processEnv,
): string {
  const value = resolveEnv(keys, source);
  if (value === undefined) {
    throw new Error(`Missing required environment variable for ${label}. Checked: ${keys.join(", ")}`);
  }
  return value;
}

export function resolveEnvWithDefault(
  keys: string[],
  defaultValue: string,
  source: EnvSource = processEnv,
): string {
  return resolveEnv(keys, source) ?? defaultValue;
}

export function resolveEnvNumber(
  keys: string[],
  defaultValue: number,
  source: EnvSource = processEnv,
): number {
  const raw = resolveEnv(keys, source);
  if (raw === undefined) return defaultValue;
  const num = Number(raw);
  return Number.isFinite(num) ? num : defaultValue;
}

export function resolveEnvBoolean(
  keys: string[],
  defaultValue: boolean,
  source: EnvSource = processEnv,
): boolean {
  const raw = resolveEnv(keys, source);
  if (raw === undefined) return defaultValue;
  const lower = raw.toLowerCase();
  if (["true", "1", "yes", "on"].includes(lower)) return true;
  if (["false", "0", "no", "off"].includes(lower)) return false;
  return defaultValue;
}

// Build a connector config from env vars in one call.
export function resolveConnectorEnv(
  connector: string,
  fields: Record<string, { keys: string[]; required?: boolean; default?: string }>,
  source: EnvSource = processEnv,
): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};
  const missing: string[] = [];

  for (const [field, spec] of Object.entries(fields)) {
    const value = resolveEnv(spec.keys, source) ?? spec.default;
    if (spec.required && value === undefined) {
      missing.push(`${field} (checked: ${spec.keys.join(", ")})`);
    }
    result[field] = value;
  }

  if (missing.length > 0) {
    throw new Error(`${connector}: missing required config - ${missing.join("; ")}`);
  }

  return result;
}
