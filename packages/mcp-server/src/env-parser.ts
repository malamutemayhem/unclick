export function parseEnv(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('"')) {
      value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t");
    }

    result[key] = value;
  }

  return result;
}

export function stringifyEnv(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => {
      if (value.includes(" ") || value.includes("#") || value.includes("\n") || value.includes('"')) {
        const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
        return `${key}="${escaped}"`;
      }
      return `${key}=${value}`;
    })
    .join("\n");
}

export function getEnvString(key: string, defaultValue = ""): string {
  return typeof process !== "undefined" && process.env[key] !== undefined ? process.env[key]! : defaultValue;
}

export function getEnvNumber(key: string, defaultValue = 0): number {
  const value = getEnvString(key);
  if (!value) return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function getEnvBoolean(key: string, defaultValue = false): boolean {
  const value = getEnvString(key).toLowerCase();
  if (!value) return defaultValue;
  return value === "true" || value === "1" || value === "yes";
}

export function getEnvArray(key: string, separator = ","): string[] {
  const value = getEnvString(key);
  if (!value) return [];
  return value.split(separator).map((s) => s.trim()).filter(Boolean);
}

export function requireEnv(key: string): string {
  const value = getEnvString(key);
  if (!value) throw new Error(`Required environment variable ${key} is not set`);
  return value;
}

export function interpolateEnv(value: string, vars: Record<string, string>): string {
  return value.replace(/\$\{([^}]+)\}/g, (_, key) => vars[key.trim()] || "");
}
