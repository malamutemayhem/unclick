export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isNonNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function hasProperty<K extends string>(obj: unknown, key: K): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

export function hasProperties<K extends string>(obj: unknown, ...keys: K[]): obj is Record<K, unknown> {
  return isObject(obj) && keys.every((k) => k in obj);
}

export function isInstanceOf<T>(value: unknown, constructor: new (...args: unknown[]) => T): value is T {
  return value instanceof constructor;
}

export function assertType<T>(value: unknown, guard: (v: unknown) => v is T, message?: string): asserts value is T {
  if (!guard(value)) throw new TypeError(message ?? "Type assertion failed");
}

export function narrowType<T>(value: unknown, guard: (v: unknown) => v is T): T | undefined {
  return guard(value) ? value : undefined;
}
