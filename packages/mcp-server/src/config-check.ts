// Config validation and self-healing utilities.
// Inspired by OpenClaw's config/io.invalid-config.ts and doctor pattern.
// Gives connectors and the server a standard way to validate config,
// report problems with helpful messages, and auto-fix what can be fixed.

export interface ConfigIssue {
  path: string;
  message: string;
  severity: "error" | "warning";
  autofix?: () => void;
}

export interface ConfigCheckResult {
  valid: boolean;
  issues: ConfigIssue[];
}

// Validate a config object against a set of rules.
export function checkConfig(
  config: Record<string, unknown>,
  rules: ConfigRule[],
): ConfigCheckResult {
  const issues: ConfigIssue[] = [];

  for (const rule of rules) {
    const result = rule.check(config);
    if (result) issues.push(result);
  }

  return {
    valid: issues.filter((i) => i.severity === "error").length === 0,
    issues,
  };
}

export interface ConfigRule {
  check(config: Record<string, unknown>): ConfigIssue | null;
}

// Built-in rules that are useful everywhere.

// Check that a required field exists and is non-empty.
export function requiredField(path: string, description?: string): ConfigRule {
  return {
    check(config) {
      const value = getNestedValue(config, path);
      if (value === undefined || value === null || value === "") {
        return {
          path,
          message: description ?? `Required field "${path}" is missing.`,
          severity: "error",
        };
      }
      return null;
    },
  };
}

// Check that a field, if present, matches one of the allowed values.
export function allowedValues(path: string, allowed: readonly unknown[]): ConfigRule {
  return {
    check(config) {
      const value = getNestedValue(config, path);
      if (value === undefined || value === null) return null;
      if (!allowed.includes(value)) {
        return {
          path,
          message: `"${path}" must be one of: ${allowed.join(", ")}. Got: ${String(value)}`,
          severity: "error",
        };
      }
      return null;
    },
  };
}

// Check that a numeric field falls within a range.
export function numberRange(path: string, min: number, max: number): ConfigRule {
  return {
    check(config) {
      const value = getNestedValue(config, path);
      if (value === undefined || value === null) return null;
      const num = Number(value);
      if (!Number.isFinite(num) || num < min || num > max) {
        return {
          path,
          message: `"${path}" must be between ${min} and ${max}. Got: ${String(value)}`,
          severity: "error",
        };
      }
      return null;
    },
  };
}

// Warn about deprecated fields and suggest the replacement.
export function deprecatedField(oldPath: string, newPath: string): ConfigRule {
  return {
    check(config) {
      const value = getNestedValue(config, oldPath);
      if (value !== undefined && value !== null) {
        return {
          path: oldPath,
          message: `"${oldPath}" is deprecated. Use "${newPath}" instead.`,
          severity: "warning",
          autofix: () => {
            setNestedValue(config, newPath, value);
            deleteNestedValue(config, oldPath);
          },
        };
      }
      return null;
    },
  };
}

// Helper: read a dotted path from an object.
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

// Helper: set a dotted path in an object.
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== "object") {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}

// Helper: delete a dotted path from an object.
function deleteNestedValue(obj: Record<string, unknown>, path: string): void {
  const parts = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== "object") return;
    current = current[part] as Record<string, unknown>;
  }
  delete current[parts[parts.length - 1]];
}
