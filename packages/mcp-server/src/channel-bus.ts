type Handler<T> = (message: T) => void;

export class ChannelBus {
  private channels = new Map<string, Set<Handler<any>>>();

  on<T = unknown>(channel: string, handler: Handler<T>): () => void {
    let set = this.channels.get(channel);
    if (!set) {
      set = new Set();
      this.channels.set(channel, set);
    }
    set.add(handler);
    return () => set!.delete(handler);
  }

  emit<T = unknown>(channel: string, message: T): void {
    const set = this.channels.get(channel);
    if (!set) return;
    for (const handler of set) handler(message);
  }

  once<T = unknown>(channel: string, handler: Handler<T>): () => void {
    const wrapper: Handler<T> = (msg) => {
      off();
      handler(msg);
    };
    const off = this.on(channel, wrapper);
    return off;
  }

  listenerCount(channel: string): number {
    return this.channels.get(channel)?.size ?? 0;
  }

  channels_list(): string[] {
    return [...this.channels.keys()].filter((ch) => this.channels.get(ch)!.size > 0);
  }

  clear(channel?: string): void {
    if (channel) {
      this.channels.delete(channel);
    } else {
      this.channels.clear();
    }
  }
}
