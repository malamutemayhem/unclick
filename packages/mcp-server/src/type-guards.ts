export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function isPromise(value: unknown): value is Promise<unknown> {
  return isObject(value) && isFunction((value as Record<string, unknown>).then);
}

export function isNonEmpty(value: string | unknown[] | null | undefined): boolean {
  if (isNil(value)) return false;
  return value.length > 0;
}

export function hasProperty<K extends string>(
  obj: unknown,
  key: K,
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
