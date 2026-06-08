type Handler<T = unknown> = (data: T) => void;

export class PubSub {
  private channels = new Map<string, Set<Handler>>();

  subscribe<T = unknown>(channel: string, handler: Handler<T>): () => void {
    if (!this.channels.has(channel)) this.channels.set(channel, new Set());
    this.channels.get(channel)!.add(handler as Handler);
    return () => {
      this.channels.get(channel)?.delete(handler as Handler);
    };
  }

  publish<T = unknown>(channel: string, data: T): void {
    const handlers = this.channels.get(channel);
    if (!handlers) return;
    for (const handler of [...handlers]) {
      (handler as Handler<T>)(data);
    }
  }

  once<T = unknown>(channel: string, handler: Handler<T>): () => void {
    const unsub = this.subscribe<T>(channel, (data: T) => {
      unsub();
      handler(data);
    });
    return unsub;
  }

  clear(channel?: string): void {
    if (channel) this.channels.delete(channel);
    else this.channels.clear();
  }

  get channelCount(): number { return this.channels.size; }

  subscriberCount(channel: string): number {
    return this.channels.get(channel)?.size ?? 0;
  }

  channels_list(): string[] {
    return [...this.channels.keys()];
  }
}
