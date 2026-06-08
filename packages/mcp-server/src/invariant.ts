export class InvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvariantError";
  }
}

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new InvariantError(message);
}

export function precondition(condition: unknown, message: string): asserts condition {
  if (!condition) throw new InvariantError(`Precondition failed: ${message}`);
}

export function postcondition(condition: unknown, message: string): asserts condition {
  if (!condition) throw new InvariantError(`Postcondition failed: ${message}`);
}

export function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new InvariantError(`Expected ${name} to be defined, got ${value}`);
  }
}

export function assertNever(value: never, message?: string): never {
  throw new InvariantError(message ?? `Unexpected value: ${value}`);
}

export function check<T>(value: T | null | undefined, message: string): T {
  if (value === null || value === undefined) throw new InvariantError(message);
  return value;
}
