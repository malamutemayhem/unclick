// Startup environment validation.
// Runs before the MCP server accepts tool calls to catch misconfiguration
// early. Checks required env vars, warns about missing optional credentials,
// and validates format constraints.

export type Severity = "error" | "warning" | "info";

export interface StartupIssue {
  severity: Severity;
  message: string;
  envVar?: string;
}

export interface StartupCheckResult {
  ok: boolean;
  issues: StartupIssue[];
}

export interface EnvRequirement {
  name: string;
  required?: boolean;
  description?: string;
  validate?: (value: string) => string | null;
}

export function validateStartup(
  requirements: EnvRequirement[],
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>,
): StartupCheckResult {
  const issues: StartupIssue[] = [];

  for (const req of requirements) {
    const value = env[req.name];

    if (!value || value.trim() === "") {
      if (req.required) {
        issues.push({
          severity: "error",
          message: req.description
            ? `Missing required env var ${req.name}: ${req.description}`
            : `Missing required env var: ${req.name}`,
          envVar: req.name,
        });
      } else {
        issues.push({
          severity: "info",
          message: `Optional env var not set: ${req.name}${req.description ? ` (${req.description})` : ""}`,
          envVar: req.name,
        });
      }
      continue;
    }

    if (req.validate) {
      const error = req.validate(value);
      if (error) {
        issues.push({
          severity: "error",
          message: `Invalid ${req.name}: ${error}`,
          envVar: req.name,
        });
      }
    }
  }

  return {
    ok: issues.filter((i) => i.severity === "error").length === 0,
    issues,
  };
}

// Common validators for env var values.

export function isUrl(value: string): string | null {
  try {
    new URL(value);
    return null;
  } catch {
    return "must be a valid URL";
  }
}

export function isPositiveInteger(value: string): string | null {
  const num = Number(value);
  if (!Number.isInteger(num) || num <= 0) return "must be a positive integer";
  return null;
}

export function isOneOf(...allowed: string[]): (value: string) => string | null {
  return (value) => {
    if (!allowed.includes(value)) {
      return `must be one of: ${allowed.join(", ")}`;
    }
    return null;
  };
}

export function matchesPattern(pattern: RegExp, hint: string): (value: string) => string | null {
  return (value) => {
    if (!pattern.test(value)) return hint;
    return null;
  };
}

// Audit which connectors can actually run given current env.
export function auditConnectorReadiness(
  connectorEnvMap: Record<string, string[]>,
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>,
): { ready: string[]; missing: Array<{ connector: string; missingVars: string[] }> } {
  const ready: string[] = [];
  const missing: Array<{ connector: string; missingVars: string[] }> = [];

  for (const [connector, vars] of Object.entries(connectorEnvMap)) {
    const absent = vars.filter((v) => !env[v] || env[v]!.trim() === "");
    if (absent.length === 0) {
      ready.push(connector);
    } else {
      missing.push({ connector, missingVars: absent });
    }
  }

  return { ready, missing };
}
