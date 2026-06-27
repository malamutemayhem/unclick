export type ValidationRule<T = unknown> = (value: T) => string | null;

export interface ValidationResult {
  valid: boolean;
  errors: { field: string; message: string }[];
}

export function required(message = "Required"): ValidationRule {
  return (value) => (value == null || value === "" ? message : null);
}

export function minLength(min: number, message?: string): ValidationRule<string> {
  return (value) => (value.length < min ? (message || `Must be at least ${min} characters`) : null);
}

export function maxLength(max: number, message?: string): ValidationRule<string> {
  return (value) => (value.length > max ? (message || `Must be at most ${max} characters`) : null);
}

export function pattern(regex: RegExp, message = "Invalid format"): ValidationRule<string> {
  return (value) => (regex.test(value) ? null : message);
}

export function minValue(min: number, message?: string): ValidationRule<number> {
  return (value) => (value < min ? (message || `Must be at least ${min}`) : null);
}

export function maxValue(max: number, message?: string): ValidationRule<number> {
  return (value) => (value > max ? (message || `Must be at most ${max}`) : null);
}

export function oneOf<T>(allowed: T[], message?: string): ValidationRule<T> {
  return (value) => (allowed.includes(value) ? null : (message || `Must be one of: ${allowed.join(", ")}`));
}

export function email(message = "Invalid email"): ValidationRule<string> {
  return pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message);
}

export function url(message = "Invalid URL"): ValidationRule<string> {
  return pattern(/^https?:\/\/.+/, message);
}

export function integer(message = "Must be an integer"): ValidationRule<number> {
  return (value) => (Number.isInteger(value) ? null : message);
}

export function validate(
  data: Record<string, unknown>,
  rules: Record<string, ValidationRule<any>[]>
): ValidationResult {
  const errors: { field: string; message: string }[] = [];

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors.push({ field, message: error });
        break;
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export function compose(...rules: ValidationRule<any>[]): ValidationRule {
  return (value) => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };
}
