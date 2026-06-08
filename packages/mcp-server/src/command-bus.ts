export interface Command {
  type: string;
  payload: unknown;
}

export type CommandHandler = (command: Command) => unknown;
export type Middleware = (command: Command, next: () => unknown) => unknown;

export class CommandBus {
  private handlers = new Map<string, CommandHandler>();
  private middlewares: Middleware[] = [];

  register(type: string, handler: CommandHandler): void {
    this.handlers.set(type, handler);
  }

  unregister(type: string): boolean {
    return this.handlers.delete(type);
  }

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  dispatch(command: Command): unknown {
    const handler = this.handlers.get(command.type);
    if (!handler) throw new Error(`No handler for command: ${command.type}`);
    const chain = this.middlewares.reduceRight<() => unknown>(
      (next, mw) => () => mw(command, next),
      () => handler(command),
    );
    return chain();
  }

  has(type: string): boolean {
    return this.handlers.has(type);
  }

  get registeredTypes(): string[] {
    return [...this.handlers.keys()];
  }
}
