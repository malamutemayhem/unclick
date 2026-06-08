// Typed event bus for internal extensibility.
// Lets modules subscribe to lifecycle events (tool call start/end,
// auth failure, rate limit hit) without tight coupling.

export type EventHandler<T = unknown> = (payload: T) => void;

export class EventBus<Events extends Record<string, unknown> = Record<string, unknown>> {
  private handlers = new Map<string, Set<EventHandler<unknown>>>();

  on<K extends string & keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler as EventHandler<unknown>);
    return () => set!.delete(handler as EventHandler<unknown>);
  }

  once<K extends string & keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    const wrapper = ((payload: Events[K]) => {
      off();
      handler(payload);
    }) as EventHandler<Events[K]>;
    const off = this.on(event, wrapper);
    return off;
  }

  emit<K extends string & keyof Events>(event: K, payload: Events[K]): void {
    const set = this.handlers.get(event);
    if (!set) return;
    for (const handler of set) {
      try {
        handler(payload);
      } catch {
        // swallow handler errors to prevent cascading failures
      }
    }
  }

  off<K extends string & keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    this.handlers.get(event)?.delete(handler as EventHandler<unknown>);
  }

  removeAll(event?: string): void {
    if (event) {
      this.handlers.delete(event);
    } else {
      this.handlers.clear();
    }
  }

  listenerCount(event: string): number {
    return this.handlers.get(event)?.size ?? 0;
  }
}

// Pre-defined event types for the MCP server lifecycle.
export type McpEvents = {
  "tool:start": { tool: string; args: Record<string, unknown> };
  "tool:end": { tool: string; durationMs: number; success: boolean };
  "auth:failure": { tool: string; reason: string };
  "rate:limited": { tool: string; retryAfterMs?: number };
  "circuit:open": { endpoint: string };
  "circuit:close": { endpoint: string };
};

export function createMcpEventBus(): EventBus<McpEvents> {
  return new EventBus<McpEvents>();
}
