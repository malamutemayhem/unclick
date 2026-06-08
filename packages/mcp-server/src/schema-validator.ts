export type SchemaType = "string" | "number" | "boolean" | "array" | "object" | "null" | "any";

export interface SchemaRule {
  type?: SchemaType | SchemaType[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  items?: SchemaRule;
  properties?: Record<string, SchemaRule>;
  enum?: unknown[];
  custom?: (value: unknown) => boolean;
}

export interface ValidationError {
  path: string;
  message: string;
}

export function validate(value: unknown, schema: SchemaRule, path = "$"): ValidationError[] {
  const errors: ValidationError[] = [];

  if (value === undefined || value === null) {
    if (schema.required) {
      errors.push({ path, message: "required" });
    }
    if (value === null && schema.type === "null") return errors;
    if (value === undefined || value === null) return errors;
  }

  if (schema.type && schema.type !== "any") {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actualType = getType(value);
    if (!types.includes(actualType)) {
      errors.push({ path, message: `expected ${types.join("|")}, got ${actualType}` });
      return errors;
    }
  }

  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push({ path, message: `minLength ${schema.minLength}` });
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push({ path, message: `maxLength ${schema.maxLength}` });
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
      errors.push({ path, message: `pattern ${schema.pattern}` });
    }
  }

  if (typeof value === "number") {
    if (schema.min !== undefined && value < schema.min) {
      errors.push({ path, message: `min ${schema.min}` });
    }
    if (schema.max !== undefined && value > schema.max) {
      errors.push({ path, message: `max ${schema.max}` });
    }
  }

  if (Array.isArray(value) && schema.items) {
    for (let i = 0; i < value.length; i++) {
      errors.push(...validate(value[i], schema.items, `${path}[${i}]`));
    }
  }

  if (schema.properties && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    for (const [key, rule] of Object.entries(schema.properties)) {
      errors.push(...validate(obj[key], rule, `${path}.${key}`));
    }
  }

  if (schema.enum !== undefined) {
    if (!schema.enum.includes(value)) {
      errors.push({ path, message: `must be one of: ${schema.enum.join(", ")}` });
    }
  }

  if (schema.custom && !schema.custom(value)) {
    errors.push({ path, message: "custom validation failed" });
  }

  return errors;
}

export function isValid(value: unknown, schema: SchemaRule): boolean {
  return validate(value, schema).length === 0;
}

function getType(value: unknown): SchemaType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === "object") return t;
  return "any";
}
