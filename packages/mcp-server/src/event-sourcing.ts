export interface DomainEvent {
  type: string;
  payload: unknown;
  timestamp: number;
  version: number;
}

export type Reducer<S> = (state: S, event: DomainEvent) => S;

export class EventStore<S> {
  private events: DomainEvent[] = [];
  private snapshots: { version: number; state: S }[] = [];
  private reducer: Reducer<S>;
  private initialState: S;
  private snapshotInterval: number;

  constructor(reducer: Reducer<S>, initialState: S, snapshotInterval = 10) {
    this.reducer = reducer;
    this.initialState = initialState;
    this.snapshotInterval = snapshotInterval;
  }

  append(type: string, payload: unknown): DomainEvent {
    const event: DomainEvent = {
      type,
      payload,
      timestamp: Date.now(),
      version: this.events.length + 1,
    };
    this.events.push(event);
    if (this.events.length % this.snapshotInterval === 0) {
      this.snapshots.push({ version: event.version, state: this.currentState });
    }
    return event;
  }

  get currentState(): S {
    return this.stateAt(this.events.length);
  }

  stateAt(version: number): S {
    let state = this.initialState;
    let startIdx = 0;
    for (const snap of this.snapshots) {
      if (snap.version <= version) {
        state = snap.state;
        startIdx = snap.version;
      }
    }
    for (let i = startIdx; i < Math.min(version, this.events.length); i++) {
      state = this.reducer(state, this.events[i]);
    }
    return state;
  }

  get eventLog(): DomainEvent[] {
    return [...this.events];
  }

  get version(): number {
    return this.events.length;
  }

  eventsSince(version: number): DomainEvent[] {
    return this.events.slice(version);
  }

  replay(events: DomainEvent[]): S {
    let state = this.initialState;
    for (const event of events) state = this.reducer(state, event);
    return state;
  }
}
