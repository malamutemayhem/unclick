export type SchemaType = "string" | "number" | "boolean" | "object" | "array" | "null";

export interface SchemaNode {
  type?: SchemaType | SchemaType[];
  required?: string[];
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  enum?: unknown[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
}

export interface ValidationError {
  path: string;
  message: string;
}

export function validate(value: unknown, schema: SchemaNode, path = ""): ValidationError[] {
  const errors: ValidationError[] = [];

  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actual = typeOf(value);
    if (!types.includes(actual)) {
      errors.push({ path: path || "(root)", message: `expected ${types.join("|")}, got ${actual}` });
      return errors;
    }
  }

  if (schema.enum !== undefined) {
    const match = schema.enum.some((e) => JSON.stringify(e) === JSON.stringify(value));
    if (!match) {
      errors.push({ path: path || "(root)", message: `value not in enum [${schema.enum.map(String).join(", ")}]` });
    }
  }

  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push({ path: path || "(root)", message: `string too short (min ${schema.minLength})` });
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push({ path: path || "(root)", message: `string too long (max ${schema.maxLength})` });
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
      errors.push({ path: path || "(root)", message: `does not match pattern ${schema.pattern}` });
    }
  }

  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push({ path: path || "(root)", message: `below minimum ${schema.minimum}` });
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      errors.push({ path: path || "(root)", message: `above maximum ${schema.maximum}` });
    }
  }

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in obj)) {
          errors.push({ path: joinPath(path, key), message: "required field missing" });
        }
      }
    }
    if (schema.properties) {
      for (const [key, subSchema] of Object.entries(schema.properties)) {
        if (key in obj) {
          errors.push(...validate(obj[key], subSchema, joinPath(path, key)));
        }
      }
    }
  }

  if (Array.isArray(value) && schema.items) {
    for (let i = 0; i < value.length; i++) {
      errors.push(...validate(value[i], schema.items, `${path}[${i}]`));
    }
  }

  return errors;
}

export function isValid(value: unknown, schema: SchemaNode): boolean {
  return validate(value, schema).length === 0;
}

export function assertValid(value: unknown, schema: SchemaNode): void {
  const errors = validate(value, schema);
  if (errors.length > 0) {
    throw new SchemaValidationError(errors);
  }
}

export class SchemaValidationError extends Error {
  readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    const summary = errors.map((e) => `${e.path}: ${e.message}`).join("; ");
    super(`Validation failed: ${summary}`);
    this.name = "SchemaValidationError";
    this.errors = errors;
  }
}

function typeOf(value: unknown): SchemaType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === "object") return t;
  return "string";
}

function joinPath(base: string, key: string): string {
  return base ? `${base}.${key}` : key;
}
