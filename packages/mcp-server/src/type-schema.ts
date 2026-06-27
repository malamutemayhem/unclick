export type Schema =
  | { type: "string"; minLength?: number; maxLength?: number; pattern?: string }
  | { type: "number"; min?: number; max?: number; integer?: boolean }
  | { type: "boolean" }
  | { type: "array"; items: Schema; minItems?: number; maxItems?: number }
  | { type: "object"; properties: Record<string, Schema>; required?: string[] }
  | { type: "literal"; value: unknown }
  | { type: "union"; schemas: Schema[] }
  | { type: "any" };

export interface ValidationError {
  path: string;
  message: string;
}

export function validate(value: unknown, schema: Schema, path = ""): ValidationError[] {
  const errors: ValidationError[] = [];

  switch (schema.type) {
    case "string":
      if (typeof value !== "string") {
        errors.push({ path, message: "Expected string" });
      } else {
        if (schema.minLength !== undefined && value.length < schema.minLength)
          errors.push({ path, message: `String must be at least ${schema.minLength} characters` });
        if (schema.maxLength !== undefined && value.length > schema.maxLength)
          errors.push({ path, message: `String must be at most ${schema.maxLength} characters` });
        if (schema.pattern && !new RegExp(schema.pattern).test(value))
          errors.push({ path, message: `String must match pattern ${schema.pattern}` });
      }
      break;

    case "number":
      if (typeof value !== "number" || Number.isNaN(value)) {
        errors.push({ path, message: "Expected number" });
      } else {
        if (schema.integer && !Number.isInteger(value))
          errors.push({ path, message: "Expected integer" });
        if (schema.min !== undefined && value < schema.min)
          errors.push({ path, message: `Number must be >= ${schema.min}` });
        if (schema.max !== undefined && value > schema.max)
          errors.push({ path, message: `Number must be <= ${schema.max}` });
      }
      break;

    case "boolean":
      if (typeof value !== "boolean")
        errors.push({ path, message: "Expected boolean" });
      break;

    case "array":
      if (!Array.isArray(value)) {
        errors.push({ path, message: "Expected array" });
      } else {
        if (schema.minItems !== undefined && value.length < schema.minItems)
          errors.push({ path, message: `Array must have at least ${schema.minItems} items` });
        if (schema.maxItems !== undefined && value.length > schema.maxItems)
          errors.push({ path, message: `Array must have at most ${schema.maxItems} items` });
        for (let i = 0; i < value.length; i++) {
          errors.push(...validate(value[i], schema.items, `${path}[${i}]`));
        }
      }
      break;

    case "object":
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        errors.push({ path, message: "Expected object" });
      } else {
        const obj = value as Record<string, unknown>;
        for (const req of schema.required || []) {
          if (!(req in obj)) errors.push({ path: path ? `${path}.${req}` : req, message: "Required" });
        }
        for (const [key, propSchema] of Object.entries(schema.properties)) {
          if (key in obj) {
            errors.push(...validate(obj[key], propSchema, path ? `${path}.${key}` : key));
          }
        }
      }
      break;

    case "literal":
      if (value !== schema.value)
        errors.push({ path, message: `Expected ${JSON.stringify(schema.value)}` });
      break;

    case "union": {
      const allErrors = schema.schemas.map((s) => validate(value, s, path));
      if (allErrors.every((e) => e.length > 0))
        errors.push({ path, message: "Does not match any schema in union" });
      break;
    }

    case "any":
      break;
  }

  return errors;
}

export function isValid(value: unknown, schema: Schema): boolean {
  return validate(value, schema).length === 0;
}

export function string(opts?: Omit<Extract<Schema, { type: "string" }>, "type">): Schema {
  return { type: "string", ...opts };
}

export function number(opts?: Omit<Extract<Schema, { type: "number" }>, "type">): Schema {
  return { type: "number", ...opts };
}

export function boolean(): Schema { return { type: "boolean" }; }

export function array(items: Schema, opts?: { minItems?: number; maxItems?: number }): Schema {
  return { type: "array", items, ...opts };
}

export function object(properties: Record<string, Schema>, required?: string[]): Schema {
  return { type: "object", properties, required };
}

export function literal(value: unknown): Schema { return { type: "literal", value }; }

export function union(...schemas: Schema[]): Schema { return { type: "union", schemas }; }

export function any(): Schema { return { type: "any" }; }
