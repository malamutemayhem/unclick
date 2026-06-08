export type SchemaType = "string" | "number" | "boolean" | "object" | "array" | "null";

export interface SchemaNode {
  type: SchemaType | SchemaType[];
  description?: string;
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  required?: string[];
  enum?: unknown[];
  default?: unknown;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface ValidationError {
  path: string;
  message: string;
  expected?: string;
  actual?: string;
}

export function validateStructured(data: unknown, schema: SchemaNode, path = "$"): ValidationError[] {
  const errors: ValidationError[] = [];
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];

  const actualType = getType(data);
  if (!types.includes(actualType as SchemaType)) {
    errors.push({ path, message: `Expected ${types.join(" | ")}, got ${actualType}`, expected: types.join(" | "), actual: actualType });
    return errors;
  }

  if (schema.enum !== undefined && !schema.enum.some((v) => JSON.stringify(v) === JSON.stringify(data))) {
    errors.push({ path, message: `Value not in enum`, expected: JSON.stringify(schema.enum), actual: JSON.stringify(data) });
  }

  if (actualType === "string" && typeof data === "string") {
    if (schema.minLength !== undefined && data.length < schema.minLength) {
      errors.push({ path, message: `String too short (min ${schema.minLength})` });
    }
    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      errors.push({ path, message: `String too long (max ${schema.maxLength})` });
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(data)) {
      errors.push({ path, message: `Does not match pattern ${schema.pattern}` });
    }
  }

  if (actualType === "number" && typeof data === "number") {
    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push({ path, message: `Below minimum ${schema.minimum}` });
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push({ path, message: `Above maximum ${schema.maximum}` });
    }
  }

  if (actualType === "object" && typeof data === "object" && data !== null && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in obj)) {
          errors.push({ path: `${path}.${key}`, message: `Required property missing` });
        }
      }
    }
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in obj) {
          errors.push(...validateStructured(obj[key], propSchema, `${path}.${key}`));
        }
      }
    }
  }

  if (actualType === "array" && Array.isArray(data) && schema.items) {
    for (let i = 0; i < data.length; i++) {
      errors.push(...validateStructured(data[i], schema.items, `${path}[${i}]`));
    }
  }

  return errors;
}

function getType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

export function coerce(data: unknown, schema: SchemaNode): unknown {
  const targetType = Array.isArray(schema.type) ? schema.type[0] : schema.type;

  if (targetType === "string" && typeof data !== "string") {
    return String(data);
  }
  if (targetType === "number" && typeof data === "string") {
    const n = Number(data);
    return isNaN(n) ? data : n;
  }
  if (targetType === "boolean") {
    if (data === "true" || data === 1) return true;
    if (data === "false" || data === 0) return false;
  }
  if (targetType === "object" && typeof data === "string") {
    try { return JSON.parse(data); } catch { return data; }
  }
  if (targetType === "array" && !Array.isArray(data)) {
    return [data];
  }
  return data;
}

export function applyDefaults(data: unknown, schema: SchemaNode): unknown {
  if (data === undefined && schema.default !== undefined) {
    return schema.default;
  }
  if (typeof data === "object" && data !== null && !Array.isArray(data) && schema.properties) {
    const obj = { ...(data as Record<string, unknown>) };
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      obj[key] = applyDefaults(obj[key], propSchema);
    }
    return obj;
  }
  return data;
}
