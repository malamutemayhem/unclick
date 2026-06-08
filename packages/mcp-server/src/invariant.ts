export function invariant(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message ?? "Invariant violation");
  }
}

export function precondition(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message ?? "Precondition failed");
  }
}

export function postcondition(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message ?? "Postcondition failed");
  }
}

export function unreachable(value?: never): never {
  throw new Error(`Unreachable code reached${value !== undefined ? `: ${value}` : ""}`);
}

export function todo(message?: string): never {
  throw new Error(message ?? "Not yet implemented");
}

export function deprecated(message?: string): void {
  console.warn(`DEPRECATED: ${message ?? "This function is deprecated"}`);
}
