export type Schema =
  | { type: "string"; minLength?: number; maxLength?: number; pattern?: string }
  | { type: "number"; min?: number; max?: number; integer?: boolean }
  | { type: "boolean" }
  | { type: "array"; items?: Schema; minItems?: number; maxItems?: number }
  | { type: "object"; properties?: Record<string, Schema>; required?: string[] }
  | { type: "null" }
  | { type: "any" };

export interface ValidationError {
  path: string;
  message: string;
}

export function validate(value: unknown, schema: Schema, path = "$"): ValidationError[] {
  const errors: ValidationError[] = [];

  if (schema.type === "any") return errors;

  if (schema.type === "null") {
    if (value !== null) errors.push({ path, message: "Expected null" });
    return errors;
  }

  if (schema.type === "string") {
    if (typeof value !== "string") { errors.push({ path, message: "Expected string" }); return errors; }
    if (schema.minLength !== undefined && value.length < schema.minLength) errors.push({ path, message: `Minimum length ${schema.minLength}` });
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errors.push({ path, message: `Maximum length ${schema.maxLength}` });
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push({ path, message: `Must match pattern ${schema.pattern}` });
    return errors;
  }

  if (schema.type === "number") {
    if (typeof value !== "number") { errors.push({ path, message: "Expected number" }); return errors; }
    if (schema.integer && !Number.isInteger(value)) errors.push({ path, message: "Expected integer" });
    if (schema.min !== undefined && value < schema.min) errors.push({ path, message: `Minimum ${schema.min}` });
    if (schema.max !== undefined && value > schema.max) errors.push({ path, message: `Maximum ${schema.max}` });
    return errors;
  }

  if (schema.type === "boolean") {
    if (typeof value !== "boolean") errors.push({ path, message: "Expected boolean" });
    return errors;
  }

  if (schema.type === "array") {
    if (!Array.isArray(value)) { errors.push({ path, message: "Expected array" }); return errors; }
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push({ path, message: `Minimum ${schema.minItems} items` });
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errors.push({ path, message: `Maximum ${schema.maxItems} items` });
    if (schema.items) {
      value.forEach((item: unknown, i: number) => {
        errors.push(...validate(item, schema.items!, `${path}[${i}]`));
      });
    }
    return errors;
  }

  if (schema.type === "object") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      errors.push({ path, message: "Expected object" });
      return errors;
    }
    const obj = value as Record<string, unknown>;
    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in obj)) errors.push({ path: `${path}.${key}`, message: "Required" });
      }
    }
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in obj) errors.push(...validate(obj[key], propSchema, `${path}.${key}`));
      }
    }
    return errors;
  }

  return errors;
}

export function isValid(value: unknown, schema: Schema): boolean {
  return validate(value, schema).length === 0;
}
