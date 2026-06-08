export type SignalHandler = (...args: unknown[]) => void;

export class SignalBus {
  private handlers: Map<string, { handler: SignalHandler; once: boolean; priority: number }[]> = new Map();
  private history: { signal: string; args: unknown[]; timestamp: number }[] = [];

  on(signal: string, handler: SignalHandler, priority = 0): void {
    if (!this.handlers.has(signal)) this.handlers.set(signal, []);
    this.handlers.get(signal)!.push({ handler, once: false, priority });
    this.handlers.get(signal)!.sort((a, b) => b.priority - a.priority);
  }

  once(signal: string, handler: SignalHandler, priority = 0): void {
    if (!this.handlers.has(signal)) this.handlers.set(signal, []);
    this.handlers.get(signal)!.push({ handler, once: true, priority });
    this.handlers.get(signal)!.sort((a, b) => b.priority - a.priority);
  }

  off(signal: string, handler: SignalHandler): void {
    const list = this.handlers.get(signal);
    if (!list) return;
    const idx = list.findIndex(e => e.handler === handler);
    if (idx >= 0) list.splice(idx, 1);
  }

  emit(signal: string, ...args: unknown[]): number {
    this.history.push({ signal, args, timestamp: Date.now() });
    const list = this.handlers.get(signal);
    if (!list || list.length === 0) return 0;

    let count = 0;
    const toRemove: number[] = [];
    for (let i = 0; i < list.length; i++) {
      list[i].handler(...args);
      count++;
      if (list[i].once) toRemove.push(i);
    }
    for (let i = toRemove.length - 1; i >= 0; i--) {
      list.splice(toRemove[i], 1);
    }
    return count;
  }

  listenerCount(signal: string): number {
    return this.handlers.get(signal)?.length ?? 0;
  }

  signals(): string[] {
    return [...this.handlers.keys()];
  }

  clear(signal?: string): void {
    if (signal) {
      this.handlers.delete(signal);
    } else {
      this.handlers.clear();
    }
  }

  getHistory(signal?: string): { signal: string; args: unknown[]; timestamp: number }[] {
    if (signal) return this.history.filter(e => e.signal === signal);
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }

  pipe(target: SignalBus, ...signals: string[]): void {
    for (const signal of signals) {
      this.on(signal, (...args) => target.emit(signal, ...args));
    }
  }
}
