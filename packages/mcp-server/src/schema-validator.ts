type SchemaType = "string" | "number" | "boolean" | "object" | "array" | "null" | "any";

export interface Schema {
  type: SchemaType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  enum?: unknown[];
  items?: Schema;
  properties?: Record<string, Schema>;
  requiredFields?: string[];
}

export interface ValidationError {
  path: string;
  message: string;
}

export function validate(value: unknown, schema: Schema, path: string = ""): ValidationError[] {
  const errors: ValidationError[] = [];

  if (value === null) {
    if (schema.type !== "null" && schema.type !== "any") {
      errors.push({ path, message: `Expected ${schema.type}, got null` });
    }
    return errors;
  }

  if (value === undefined) {
    if (schema.required) {
      errors.push({ path, message: "Required field is missing" });
    }
    return errors;
  }

  if (schema.type !== "any") {
    const actualType = Array.isArray(value) ? "array" : typeof value;
    if (actualType !== schema.type) {
      errors.push({ path, message: `Expected ${schema.type}, got ${actualType}` });
      return errors;
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push({ path, message: `Value must be one of: ${schema.enum.join(", ")}` });
  }

  if (schema.type === "string" && typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push({ path, message: `String too short (min ${schema.minLength})` });
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push({ path, message: `String too long (max ${schema.maxLength})` });
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push({ path, message: `Does not match pattern: ${schema.pattern}` });
    }
  }

  if (schema.type === "number" && typeof value === "number") {
    if (schema.min !== undefined && value < schema.min) {
      errors.push({ path, message: `Value below minimum (${schema.min})` });
    }
    if (schema.max !== undefined && value > schema.max) {
      errors.push({ path, message: `Value above maximum (${schema.max})` });
    }
  }

  if (schema.type === "array" && Array.isArray(value)) {
    if (schema.items) {
      for (let i = 0; i < value.length; i++) {
        errors.push(...validate(value[i], schema.items, `${path}[${i}]`));
      }
    }
  }

  if (schema.type === "object" && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    if (schema.requiredFields) {
      for (const field of schema.requiredFields) {
        if (!(field in obj)) {
          errors.push({ path: `${path}.${field}`, message: "Required field is missing" });
        }
      }
    }
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        errors.push(...validate(obj[key], propSchema, path ? `${path}.${key}` : key));
      }
    }
  }

  return errors;
}

export function isValid(value: unknown, schema: Schema): boolean {
  return validate(value, schema).length === 0;
}
