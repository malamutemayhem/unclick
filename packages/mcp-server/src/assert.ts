export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

export function assert(condition: unknown, message = "Assertion failed"): asserts condition {
  if (!condition) throw new AssertionError(message);
}

export function assertDefined<T>(value: T | null | undefined, name = "value"): asserts value is T {
  if (value === null || value === undefined) {
    throw new AssertionError(`Expected ${name} to be defined, got ${value}`);
  }
}

export function assertString(value: unknown, name = "value"): asserts value is string {
  if (typeof value !== "string") {
    throw new AssertionError(`Expected ${name} to be string, got ${typeof value}`);
  }
}

export function assertNumber(value: unknown, name = "value"): asserts value is number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new AssertionError(`Expected ${name} to be number, got ${typeof value}`);
  }
}

export function assertOneOf<T>(value: T, allowed: readonly T[], name = "value"): void {
  if (!allowed.includes(value)) {
    throw new AssertionError(`Expected ${name} to be one of [${allowed.join(", ")}], got ${value}`);
  }
}

export function assertRange(value: number, min: number, max: number, name = "value"): void {
  if (value < min || value > max) {
    throw new AssertionError(`Expected ${name} to be between ${min} and ${max}, got ${value}`);
  }
}

export function assertNonEmpty(value: string | unknown[], name = "value"): void {
  if (value.length === 0) {
    throw new AssertionError(`Expected ${name} to be non-empty`);
  }
}

export function assertMatch(value: string, pattern: RegExp, name = "value"): void {
  if (!pattern.test(value)) {
    throw new AssertionError(`Expected ${name} to match ${pattern}, got "${value}"`);
  }
}
