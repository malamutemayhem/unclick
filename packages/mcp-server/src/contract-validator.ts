export type Validator = (value: unknown) => { valid: boolean; error?: string };

export class ContractValidator {
  static string(): Validator {
    return (v) => typeof v === "string" ? { valid: true } : { valid: false, error: "expected string" };
  }

  static number(): Validator {
    return (v) => typeof v === "number" && !isNaN(v) ? { valid: true } : { valid: false, error: "expected number" };
  }

  static boolean(): Validator {
    return (v) => typeof v === "boolean" ? { valid: true } : { valid: false, error: "expected boolean" };
  }

  static minLength(min: number): Validator {
    return (v) => {
      if (typeof v !== "string") return { valid: false, error: "expected string" };
      return v.length >= min ? { valid: true } : { valid: false, error: `minimum length is ${min}` };
    };
  }

  static maxLength(max: number): Validator {
    return (v) => {
      if (typeof v !== "string") return { valid: false, error: "expected string" };
      return v.length <= max ? { valid: true } : { valid: false, error: `maximum length is ${max}` };
    };
  }

  static range(min: number, max: number): Validator {
    return (v) => {
      if (typeof v !== "number") return { valid: false, error: "expected number" };
      return v >= min && v <= max ? { valid: true } : { valid: false, error: `must be between ${min} and ${max}` };
    };
  }

  static pattern(regex: RegExp): Validator {
    return (v) => {
      if (typeof v !== "string") return { valid: false, error: "expected string" };
      return regex.test(v) ? { valid: true } : { valid: false, error: "pattern mismatch" };
    };
  }

  static oneOf(values: unknown[]): Validator {
    return (v) => values.includes(v) ? { valid: true } : { valid: false, error: `must be one of: ${values.join(", ")}` };
  }

  static array(itemValidator?: Validator): Validator {
    return (v) => {
      if (!Array.isArray(v)) return { valid: false, error: "expected array" };
      if (itemValidator) {
        for (let i = 0; i < v.length; i++) {
          const result = itemValidator(v[i]);
          if (!result.valid) return { valid: false, error: `item[${i}]: ${result.error}` };
        }
      }
      return { valid: true };
    };
  }

  static object(schema: Record<string, Validator>): Validator {
    return (v) => {
      if (typeof v !== "object" || v === null || Array.isArray(v)) {
        return { valid: false, error: "expected object" };
      }
      const obj = v as Record<string, unknown>;
      for (const [key, validator] of Object.entries(schema)) {
        const result = validator(obj[key]);
        if (!result.valid) return { valid: false, error: `${key}: ${result.error}` };
      }
      return { valid: true };
    };
  }

  static optional(validator: Validator): Validator {
    return (v) => {
      if (v === undefined || v === null) return { valid: true };
      return validator(v);
    };
  }

  static all(...validators: Validator[]): Validator {
    return (v) => {
      for (const validator of validators) {
        const result = validator(v);
        if (!result.valid) return result;
      }
      return { valid: true };
    };
  }

  static any(...validators: Validator[]): Validator {
    return (v) => {
      const errors: string[] = [];
      for (const validator of validators) {
        const result = validator(v);
        if (result.valid) return { valid: true };
        if (result.error) errors.push(result.error);
      }
      return { valid: false, error: errors.join(" or ") };
    };
  }

  static validate(value: unknown, validator: Validator): { valid: boolean; error?: string } {
    return validator(value);
  }
}
