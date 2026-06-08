export type ValidationError = { path: string; message: string };
export type ValidationResult = { valid: boolean; errors: ValidationError[] };
export type Schema = StringSchema | NumberSchema | BooleanSchema | ArraySchema | ObjectSchema | EnumSchema | UnionSchema;

interface BaseSchema { optional?: boolean }

export interface StringSchema extends BaseSchema {
  type: "string";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface NumberSchema extends BaseSchema {
  type: "number";
  min?: number;
  max?: number;
  integer?: boolean;
}

export interface BooleanSchema extends BaseSchema {
  type: "boolean";
}

export interface ArraySchema extends BaseSchema {
  type: "array";
  items: Schema;
  minItems?: number;
  maxItems?: number;
}

export interface ObjectSchema extends BaseSchema {
  type: "object";
  properties: Record<string, Schema>;
  additionalProperties?: boolean;
}

export interface EnumSchema extends BaseSchema {
  type: "enum";
  values: (string | number | boolean)[];
}

export interface UnionSchema extends BaseSchema {
  type: "union";
  schemas: Schema[];
}

export function validate(value: unknown, schema: Schema, path = ""): ValidationResult {
  const errors: ValidationError[] = [];

  if (value === undefined || value === null) {
    if (schema.optional) return { valid: true, errors: [] };
    errors.push({ path: path || "(root)", message: "Required value is missing" });
    return { valid: false, errors };
  }

  switch (schema.type) {
    case "string": {
      if (typeof value !== "string") {
        errors.push({ path: path || "(root)", message: `Expected string, got ${typeof value}` });
        break;
      }
      const s = schema as StringSchema;
      if (s.minLength !== undefined && value.length < s.minLength) {
        errors.push({ path: path || "(root)", message: `String too short (min ${s.minLength})` });
      }
      if (s.maxLength !== undefined && value.length > s.maxLength) {
        errors.push({ path: path || "(root)", message: `String too long (max ${s.maxLength})` });
      }
      if (s.pattern && !new RegExp(s.pattern).test(value)) {
        errors.push({ path: path || "(root)", message: `Does not match pattern ${s.pattern}` });
      }
      break;
    }
    case "number": {
      if (typeof value !== "number") {
        errors.push({ path: path || "(root)", message: `Expected number, got ${typeof value}` });
        break;
      }
      const n = schema as NumberSchema;
      if (n.integer && !Number.isInteger(value)) {
        errors.push({ path: path || "(root)", message: "Expected integer" });
      }
      if (n.min !== undefined && value < n.min) {
        errors.push({ path: path || "(root)", message: `Value below minimum ${n.min}` });
      }
      if (n.max !== undefined && value > n.max) {
        errors.push({ path: path || "(root)", message: `Value above maximum ${n.max}` });
      }
      break;
    }
    case "boolean": {
      if (typeof value !== "boolean") {
        errors.push({ path: path || "(root)", message: `Expected boolean, got ${typeof value}` });
      }
      break;
    }
    case "array": {
      if (!Array.isArray(value)) {
        errors.push({ path: path || "(root)", message: `Expected array, got ${typeof value}` });
        break;
      }
      const a = schema as ArraySchema;
      if (a.minItems !== undefined && value.length < a.minItems) {
        errors.push({ path: path || "(root)", message: `Too few items (min ${a.minItems})` });
      }
      if (a.maxItems !== undefined && value.length > a.maxItems) {
        errors.push({ path: path || "(root)", message: `Too many items (max ${a.maxItems})` });
      }
      for (let i = 0; i < value.length; i++) {
        const itemResult = validate(value[i], a.items, `${path}[${i}]`);
        errors.push(...itemResult.errors);
      }
      break;
    }
    case "object": {
      if (typeof value !== "object" || Array.isArray(value)) {
        errors.push({ path: path || "(root)", message: `Expected object, got ${Array.isArray(value) ? "array" : typeof value}` });
        break;
      }
      const o = schema as ObjectSchema;
      const obj = value as Record<string, unknown>;
      for (const [key, propSchema] of Object.entries(o.properties)) {
        const propPath = path ? `${path}.${key}` : key;
        const propResult = validate(obj[key], propSchema, propPath);
        errors.push(...propResult.errors);
      }
      if (o.additionalProperties === false) {
        for (const key of Object.keys(obj)) {
          if (!(key in o.properties)) {
            const propPath = path ? `${path}.${key}` : key;
            errors.push({ path: propPath, message: "Additional property not allowed" });
          }
        }
      }
      break;
    }
    case "enum": {
      const e = schema as EnumSchema;
      if (!e.values.includes(value as string | number | boolean)) {
        errors.push({ path: path || "(root)", message: `Value not in enum: ${JSON.stringify(e.values)}` });
      }
      break;
    }
    case "union": {
      const u = schema as UnionSchema;
      const anyValid = u.schemas.some((s) => validate(value, s, path).valid);
      if (!anyValid) {
        errors.push({ path: path || "(root)", message: "Does not match any union variant" });
      }
      break;
    }
  }

  return { valid: errors.length === 0, errors };
}

export function isValid(value: unknown, schema: Schema): boolean {
  return validate(value, schema).valid;
}
