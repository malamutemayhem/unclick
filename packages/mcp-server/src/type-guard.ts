export function isString(v: unknown): v is string {
  return typeof v === "string";
}

export function isNumber(v: unknown): v is number {
  return typeof v === "number" && !Number.isNaN(v);
}

export function isBoolean(v: unknown): v is boolean {
  return typeof v === "boolean";
}

export function isNull(v: unknown): v is null {
  return v === null;
}

export function isUndefined(v: unknown): v is undefined {
  return v === undefined;
}

export function isNil(v: unknown): v is null | undefined {
  return v == null;
}

export function isArray(v: unknown): v is unknown[] {
  return Array.isArray(v);
}

export function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

export function isFunction(v: unknown): v is (...args: any[]) => any {
  return typeof v === "function";
}

export function isDate(v: unknown): v is Date {
  return v instanceof Date && !Number.isNaN(v.getTime());
}

export function isRegExp(v: unknown): v is RegExp {
  return v instanceof RegExp;
}

export function isPromise(v: unknown): v is Promise<unknown> {
  return v instanceof Promise || (isObject(v) && isFunction((v as any).then));
}

export function assertDefined<T>(v: T | null | undefined, msg?: string): T {
  if (v == null) throw new Error(msg ?? "Expected defined value");
  return v;
}

export function assertType<T>(v: unknown, guard: (v: unknown) => v is T, msg?: string): T {
  if (!guard(v)) throw new Error(msg ?? "Type assertion failed");
  return v;
}
