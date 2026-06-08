type TypeDef =
  | { kind: "string" }
  | { kind: "number" }
  | { kind: "boolean" }
  | { kind: "null" }
  | { kind: "undefined" }
  | { kind: "array"; items: TypeDef }
  | { kind: "object"; properties: Record<string, TypeDef>; required?: string[] }
  | { kind: "union"; types: TypeDef[] }
  | { kind: "literal"; value: string | number | boolean }
  | { kind: "any" };

export interface ValidationError {
  path: string;
  expected: string;
  received: string;
}

export class RuntimeTypeChecker {
  static check(value: unknown, type: TypeDef, path: string = "$"): ValidationError[] {
    const errors: ValidationError[] = [];
    this.validate(value, type, path, errors);
    return errors;
  }

  static isValid(value: unknown, type: TypeDef): boolean {
    return this.check(value, type).length === 0;
  }

  private static validate(value: unknown, type: TypeDef, path: string, errors: ValidationError[]): void {
    switch (type.kind) {
      case "string":
        if (typeof value !== "string") errors.push({ path, expected: "string", received: typeof value });
        break;
      case "number":
        if (typeof value !== "number") errors.push({ path, expected: "number", received: typeof value });
        break;
      case "boolean":
        if (typeof value !== "boolean") errors.push({ path, expected: "boolean", received: typeof value });
        break;
      case "null":
        if (value !== null) errors.push({ path, expected: "null", received: typeof value });
        break;
      case "undefined":
        if (value !== undefined) errors.push({ path, expected: "undefined", received: typeof value });
        break;
      case "any":
        break;
      case "literal":
        if (value !== type.value) errors.push({ path, expected: `literal(${type.value})`, received: String(value) });
        break;
      case "array":
        if (!Array.isArray(value)) {
          errors.push({ path, expected: "array", received: typeof value });
        } else {
          for (let i = 0; i < value.length; i++) {
            this.validate(value[i], type.items, `${path}[${i}]`, errors);
          }
        }
        break;
      case "object":
        if (value === null || typeof value !== "object" || Array.isArray(value)) {
          errors.push({ path, expected: "object", received: value === null ? "null" : typeof value });
        } else {
          const obj = value as Record<string, unknown>;
          const required = new Set(type.required ?? Object.keys(type.properties));
          for (const key of required) {
            if (!(key in obj)) {
              errors.push({ path: `${path}.${key}`, expected: "present", received: "missing" });
            }
          }
          for (const [key, propType] of Object.entries(type.properties)) {
            if (key in obj) {
              this.validate(obj[key], propType, `${path}.${key}`, errors);
            }
          }
        }
        break;
      case "union": {
        const allErrors = type.types.map((t) => {
          const e: ValidationError[] = [];
          this.validate(value, t, path, e);
          return e;
        });
        if (allErrors.every((e) => e.length > 0)) {
          errors.push({ path, expected: `union`, received: typeof value });
        }
        break;
      }
    }
  }

  static t = {
    string: (): TypeDef => ({ kind: "string" }),
    number: (): TypeDef => ({ kind: "number" }),
    boolean: (): TypeDef => ({ kind: "boolean" }),
    null: (): TypeDef => ({ kind: "null" }),
    undefined: (): TypeDef => ({ kind: "undefined" }),
    any: (): TypeDef => ({ kind: "any" }),
    literal: (value: string | number | boolean): TypeDef => ({ kind: "literal", value }),
    array: (items: TypeDef): TypeDef => ({ kind: "array", items }),
    object: (properties: Record<string, TypeDef>, required?: string[]): TypeDef => ({ kind: "object", properties, required }),
    union: (...types: TypeDef[]): TypeDef => ({ kind: "union", types }),
  };
}
