export function invariant(condition: unknown, message?: string): asserts condition {
  if (!condition) throw new Error(message ?? "Invariant violation");
}

export function precondition(condition: unknown, message?: string): asserts condition {
  if (!condition) throw new Error(message ?? "Precondition failed");
}

export function postcondition(condition: unknown, message?: string): asserts condition {
  if (!condition) throw new Error(message ?? "Postcondition failed");
}

export function unreachable(message?: string): never {
  throw new Error(message ?? "Unreachable code reached");
}

export function exhaustiveCheck(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}

export function assertNonNull<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new Error(message ?? "Expected non-null value");
  }
  return value;
}

export function assertDefined<T>(value: T | undefined, message?: string): T {
  if (value === undefined) {
    throw new Error(message ?? "Expected defined value");
  }
  return value;
}

export function check<T>(value: T | null | undefined, message?: string): T {
  return assertNonNull(value, message);
}
