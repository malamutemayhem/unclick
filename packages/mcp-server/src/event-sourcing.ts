export interface DomainEvent {
  type: string;
  payload: unknown;
  timestamp: number;
  version: number;
}

export class EventStore {
  private streams = new Map<string, DomainEvent[]>();

  append(streamId: string, type: string, payload: unknown): DomainEvent {
    if (!this.streams.has(streamId)) this.streams.set(streamId, []);
    const events = this.streams.get(streamId)!;
    const event: DomainEvent = {
      type,
      payload,
      timestamp: Date.now(),
      version: events.length + 1,
    };
    events.push(event);
    return event;
  }

  getStream(streamId: string, fromVersion?: number): DomainEvent[] {
    const events = this.streams.get(streamId) ?? [];
    if (fromVersion !== undefined) {
      return events.filter((e) => e.version >= fromVersion);
    }
    return [...events];
  }

  getLatestVersion(streamId: string): number {
    const events = this.streams.get(streamId);
    return events ? events.length : 0;
  }

  streamIds(): string[] {
    return [...this.streams.keys()];
  }

  get totalEvents(): number {
    let total = 0;
    for (const events of this.streams.values()) total += events.length;
    return total;
  }
}

export function replay<S>(
  events: DomainEvent[],
  reducer: (state: S, event: DomainEvent) => S,
  initial: S
): S {
  return events.reduce(reducer, initial);
}
