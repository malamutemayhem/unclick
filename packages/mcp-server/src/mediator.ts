type Handler<T = unknown> = (data: T) => unknown;

export class Mediator {
  private handlers = new Map<string, Handler>();

  register<T = unknown>(channel: string, handler: Handler<T>): () => void {
    this.handlers.set(channel, handler as Handler);
    return () => this.handlers.delete(channel);
  }

  send<T = unknown, R = unknown>(channel: string, data: T): R | undefined {
    const handler = this.handlers.get(channel);
    if (!handler) return undefined;
    return handler(data) as R;
  }

  has(channel: string): boolean {
    return this.handlers.has(channel);
  }

  channels(): string[] {
    return [...this.handlers.keys()];
  }

  clear(): void {
    this.handlers.clear();
  }
}

export class AsyncMediator {
  private handlers = new Map<string, (data: unknown) => Promise<unknown>>();

  register<T = unknown, R = unknown>(
    channel: string,
    handler: (data: T) => Promise<R> | R,
  ): () => void {
    this.handlers.set(channel, handler as (data: unknown) => Promise<unknown>);
    return () => this.handlers.delete(channel);
  }

  async send<T = unknown, R = unknown>(channel: string, data: T): Promise<R | undefined> {
    const handler = this.handlers.get(channel);
    if (!handler) return undefined;
    return (await handler(data)) as R;
  }

  has(channel: string): boolean {
    return this.handlers.has(channel);
  }
}
