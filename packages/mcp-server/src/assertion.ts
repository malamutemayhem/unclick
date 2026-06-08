export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

export function assert(condition: unknown, message = "Assertion failed"): asserts condition {
  if (!condition) throw new AssertionError(message);
}

export function assertEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual !== expected) throw new AssertionError(message ?? `Expected ${expected}, got ${actual}`);
}

export function assertNotEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual === expected) throw new AssertionError(message ?? `Expected values to be different: ${actual}`);
}

export function assertDefined<T>(value: T | null | undefined, message?: string): asserts value is T {
  if (value === null || value === undefined) throw new AssertionError(message ?? "Expected value to be defined");
}

export function assertType(value: unknown, type: string, message?: string): void {
  if (typeof value !== type) throw new AssertionError(message ?? `Expected typeof ${type}, got ${typeof value}`);
}

export function assertInstanceOf<T>(value: unknown, ctor: new (...args: any[]) => T, message?: string): asserts value is T {
  if (!(value instanceof ctor)) throw new AssertionError(message ?? `Expected instance of ${ctor.name}`);
}

export function assertArrayLength(arr: unknown[], length: number, message?: string): void {
  if (arr.length !== length) throw new AssertionError(message ?? `Expected array length ${length}, got ${arr.length}`);
}

export function assertInRange(value: number, min: number, max: number, message?: string): void {
  if (value < min || value > max) throw new AssertionError(message ?? `Expected ${value} to be in range [${min}, ${max}]`);
}

export function assertMatches(value: string, pattern: RegExp, message?: string): void {
  if (!pattern.test(value)) throw new AssertionError(message ?? `Expected "${value}" to match ${pattern}`);
}

export function unreachable(message = "Unreachable code"): never {
  throw new AssertionError(message);
}
