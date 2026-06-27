export interface Event {
  type: string;
  payload: Record<string, unknown>;
  timestamp: number;
  aggregateId: string;
}

export interface Command {
  type: string;
  payload: Record<string, unknown>;
  aggregateId: string;
}

export type EventHandler<S> = (state: S, event: Event) => S;
export type CommandHandler<S> = (state: S, command: Command) => Event[];

export class Aggregate<S> {
  private _state: S;
  private _events: Event[] = [];
  private _version = 0;
  private eventHandlers = new Map<string, EventHandler<S>>();
  private commandHandlers = new Map<string, CommandHandler<S>>();
  readonly id: string;

  constructor(id: string, initialState: S) {
    this.id = id;
    this._state = initialState;
  }

  get state(): S {
    return this._state;
  }

  get version(): number {
    return this._version;
  }

  get events(): Event[] {
    return [...this._events];
  }

  onEvent(type: string, handler: EventHandler<S>): void {
    this.eventHandlers.set(type, handler);
  }

  onCommand(type: string, handler: CommandHandler<S>): void {
    this.commandHandlers.set(type, handler);
  }

  execute(command: Command): Event[] {
    const handler = this.commandHandlers.get(command.type);
    if (!handler) throw new Error(`No handler for command: ${command.type}`);
    const events = handler(this._state, command);
    for (const event of events) {
      this.apply(event);
    }
    return events;
  }

  apply(event: Event): void {
    const handler = this.eventHandlers.get(event.type);
    if (handler) {
      this._state = handler(this._state, event);
    }
    this._events.push(event);
    this._version++;
  }

  replay(events: Event[]): void {
    for (const event of events) {
      this.apply(event);
    }
  }

  snapshot(): { state: S; version: number } {
    return { state: this._state, version: this._version };
  }

  restore(snapshot: { state: S; version: number }): void {
    this._state = snapshot.state;
    this._version = snapshot.version;
  }
}

export class EventStore {
  private streams = new Map<string, Event[]>();
  private subscribers: ((event: Event) => void)[] = [];

  append(aggregateId: string, events: Event[]): void {
    if (!this.streams.has(aggregateId)) {
      this.streams.set(aggregateId, []);
    }
    const stream = this.streams.get(aggregateId)!;
    stream.push(...events);
    for (const event of events) {
      for (const sub of this.subscribers) sub(event);
    }
  }

  getStream(aggregateId: string): Event[] {
    return [...(this.streams.get(aggregateId) || [])];
  }

  getAllEvents(): Event[] {
    const all: Event[] = [];
    for (const stream of this.streams.values()) {
      all.push(...stream);
    }
    return all.sort((a, b) => a.timestamp - b.timestamp);
  }

  subscribe(handler: (event: Event) => void): () => void {
    this.subscribers.push(handler);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== handler);
    };
  }

  streamCount(): number {
    return this.streams.size;
  }

  eventCount(): number {
    let count = 0;
    for (const stream of this.streams.values()) count += stream.length;
    return count;
  }
}

export class Projection<S> {
  private _state: S;
  private handlers = new Map<string, (state: S, event: Event) => S>();

  constructor(initialState: S) {
    this._state = initialState;
  }

  get state(): S {
    return this._state;
  }

  on(eventType: string, handler: (state: S, event: Event) => S): void {
    this.handlers.set(eventType, handler);
  }

  apply(event: Event): void {
    const handler = this.handlers.get(event.type);
    if (handler) {
      this._state = handler(this._state, event);
    }
  }

  replay(events: Event[]): void {
    for (const event of events) {
      this.apply(event);
    }
  }

  reset(state: S): void {
    this._state = state;
  }
}

export function createEvent(type: string, aggregateId: string, payload: Record<string, unknown> = {}): Event {
  return { type, payload, timestamp: Date.now(), aggregateId };
}

export function createCommand(type: string, aggregateId: string, payload: Record<string, unknown> = {}): Command {
  return { type, payload, aggregateId };
}
