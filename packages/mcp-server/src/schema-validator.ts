export type Schema =
  | { type: "string"; minLength?: number; maxLength?: number; pattern?: string; enum?: string[] }
  | { type: "number"; min?: number; max?: number; integer?: boolean }
  | { type: "boolean" }
  | { type: "null" }
  | { type: "array"; items?: Schema; minItems?: number; maxItems?: number }
  | { type: "object"; properties?: Record<string, Schema>; required?: string[]; additionalProperties?: boolean }
  | { type: "union"; schemas: Schema[] };

export interface ValidationError {
  path: string;
  message: string;
}

export function validate(value: unknown, schema: Schema, path = ""): ValidationError[] {
  const errors: ValidationError[] = [];

  switch (schema.type) {
    case "string":
      if (typeof value !== "string") { errors.push({ path, message: "Expected string" }); break; }
      if (schema.minLength !== undefined && value.length < schema.minLength)
        errors.push({ path, message: `String too short (min ${schema.minLength})` });
      if (schema.maxLength !== undefined && value.length > schema.maxLength)
        errors.push({ path, message: `String too long (max ${schema.maxLength})` });
      if (schema.pattern && !new RegExp(schema.pattern).test(value))
        errors.push({ path, message: `Does not match pattern ${schema.pattern}` });
      if (schema.enum && !schema.enum.includes(value))
        errors.push({ path, message: `Must be one of: ${schema.enum.join(", ")}` });
      break;

    case "number":
      if (typeof value !== "number") { errors.push({ path, message: "Expected number" }); break; }
      if (schema.integer && !Number.isInteger(value))
        errors.push({ path, message: "Expected integer" });
      if (schema.min !== undefined && value < schema.min)
        errors.push({ path, message: `Must be >= ${schema.min}` });
      if (schema.max !== undefined && value > schema.max)
        errors.push({ path, message: `Must be <= ${schema.max}` });
      break;

    case "boolean":
      if (typeof value !== "boolean") errors.push({ path, message: "Expected boolean" });
      break;

    case "null":
      if (value !== null) errors.push({ path, message: "Expected null" });
      break;

    case "array":
      if (!Array.isArray(value)) { errors.push({ path, message: "Expected array" }); break; }
      if (schema.minItems !== undefined && value.length < schema.minItems)
        errors.push({ path, message: `Array too short (min ${schema.minItems})` });
      if (schema.maxItems !== undefined && value.length > schema.maxItems)
        errors.push({ path, message: `Array too long (max ${schema.maxItems})` });
      if (schema.items) {
        for (let i = 0; i < value.length; i++) {
          errors.push(...validate(value[i], schema.items, `${path}[${i}]`));
        }
      }
      break;

    case "object":
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        errors.push({ path, message: "Expected object" }); break;
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
      if (schema.additionalProperties === false && schema.properties) {
        for (const key of Object.keys(obj)) {
          if (!(key in schema.properties))
            errors.push({ path: `${path}.${key}`, message: "Additional property not allowed" });
        }
      }
      break;

    case "union": {
      const allErrors = schema.schemas.map((s) => validate(value, s, path));
      if (allErrors.every((e) => e.length > 0)) {
        errors.push({ path, message: "Does not match any schema in union" });
      }
      break;
    }
  }

  return errors;
}

export function isValid(value: unknown, schema: Schema): boolean {
  return validate(value, schema).length === 0;
}
