export class ChainedError extends Error {
  readonly cause: Error | undefined;
  readonly code: string | undefined;
  readonly context: Record<string, unknown>;

  constructor(message: string, options?: { cause?: Error; code?: string; context?: Record<string, unknown> }) {
    super(message);
    this.name = "ChainedError";
    this.cause = options?.cause;
    this.code = options?.code;
    this.context = options?.context ?? {};
  }

  get chain(): Error[] {
    const errors: Error[] = [this];
    let current: Error | undefined = this.cause;
    while (current) {
      errors.push(current);
      current = current instanceof ChainedError ? current.cause : undefined;
    }
    return errors;
  }

  get rootCause(): Error {
    const chain = this.chain;
    return chain[chain.length - 1];
  }

  get depth(): number {
    return this.chain.length;
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      cause: this.cause instanceof ChainedError ? this.cause.toJSON() : this.cause?.message,
    };
  }
}

export function wrap(error: unknown, message: string, context?: Record<string, unknown>): ChainedError {
  const cause = error instanceof Error ? error : new Error(String(error));
  return new ChainedError(message, { cause, context });
}

export function isChainedError(error: unknown): error is ChainedError {
  return error instanceof ChainedError;
}
