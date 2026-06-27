export type ShutdownHandler = () => void | Promise<void>;

export class ShutdownManager {
  private handlers: Array<{ name: string; fn: ShutdownHandler }> = [];
  private shutdownStarted = false;
  private registered = false;

  register(name: string, fn: ShutdownHandler): void {
    this.handlers.push({ name, fn });
  }

  async shutdown(reason = "manual"): Promise<{ success: string[]; failed: Array<{ name: string; error: string }> }> {
    if (this.shutdownStarted) return { success: [], failed: [] };
    this.shutdownStarted = true;

    const success: string[] = [];
    const failed: Array<{ name: string; error: string }> = [];

    for (const handler of [...this.handlers].reverse()) {
      try {
        await handler.fn();
        success.push(handler.name);
      } catch (err) {
        failed.push({ name: handler.name, error: err instanceof Error ? err.message : String(err) });
      }
    }

    this.handlers = [];
    return { success, failed };
  }

  installSignalHandlers(): void {
    if (this.registered) return;
    this.registered = true;

    const handler = () => {
      void this.shutdown("signal").then(() => process.exit(0));
    };
    process.on("SIGINT", handler);
    process.on("SIGTERM", handler);
  }

  get isShuttingDown(): boolean {
    return this.shutdownStarted;
  }

  get handlerCount(): number {
    return this.handlers.length;
  }
}
