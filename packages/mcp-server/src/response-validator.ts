// Response shape validation for upstream API calls.
// Detects when an API changes its response format so errors surface
// early instead of silently corrupting downstream data.

export type FieldType = "string" | "number" | "boolean" | "object" | "array" | "any";

export interface FieldSpec {
  path: string;
  type: FieldType;
  required?: boolean;
}

export interface SchemaSpec {
  name: string;
  fields: FieldSpec[];
}

export interface ValidationIssue {
  field: string;
  expected: string;
  actual: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export function validateResponse(data: unknown, schema: SchemaSpec): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (data === null || data === undefined || typeof data !== "object") {
    return {
      valid: false,
      issues: [{ field: "(root)", expected: "object", actual: String(data) }],
    };
  }

  for (const field of schema.fields) {
    const value = getPath(data as Record<string, unknown>, field.path);

    if (value === undefined) {
      if (field.required !== false) {
        issues.push({
          field: field.path,
          expected: field.type,
          actual: "missing",
        });
      }
      continue;
    }

    if (field.type === "any") continue;

    const actualType = getActualType(value);
    if (actualType !== field.type) {
      issues.push({
        field: field.path,
        expected: field.type,
        actual: actualType,
      });
    }
  }

  return { valid: issues.length === 0, issues };
}

function getPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function getActualType(value: unknown): FieldType {
  if (Array.isArray(value)) return "array";
  if (value === null) return "any";
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === "object") return t as FieldType;
  return "any";
}

// Quick schema builder for common shapes.
export function shape(name: string, fields: Record<string, FieldType | { type: FieldType; required?: boolean }>): SchemaSpec {
  return {
    name,
    fields: Object.entries(fields).map(([path, spec]) => {
      if (typeof spec === "string") {
        return { path, type: spec, required: true };
      }
      return { path, type: spec.type, required: spec.required ?? true };
    }),
  };
}

// Log-once drift detector: tracks which schemas have drifted per session.
const driftLog = new Set<string>();

export function logDrift(schema: string, issues: ValidationIssue[]): boolean {
  const key = `${schema}:${issues.map((i) => i.field).join(",")}`;
  if (driftLog.has(key)) return false;
  driftLog.add(key);
  return true;
}

export function clearDriftLog(): void {
  driftLog.clear();
}
