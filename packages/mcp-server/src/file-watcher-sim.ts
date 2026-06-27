export type EventType = "create" | "modify" | "delete" | "rename";

export interface FSEvent {
  type: EventType;
  path: string;
  oldPath?: string;
  timestamp: number;
}

export type WatchCallback = (event: FSEvent) => void;

export interface WatchRule {
  id: string;
  pattern: string;
  callback: WatchCallback;
  recursive: boolean;
}

export class FileWatcher {
  private rules: WatchRule[] = [];
  private nextId = 1;
  private events: FSEvent[] = [];
  private debounceMs: number;
  private pending = new Map<string, { event: FSEvent; timer: number }>();
  private clock = 0;

  constructor(debounceMs = 0) {
    this.debounceMs = debounceMs;
  }

  watch(pattern: string, callback: WatchCallback, recursive = false): string {
    const id = `watch_${this.nextId++}`;
    this.rules.push({ id, pattern, callback, recursive });
    return id;
  }

  unwatch(id: string): boolean {
    const idx = this.rules.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    this.rules.splice(idx, 1);
    return true;
  }

  emit(type: EventType, path: string, oldPath?: string): void {
    const event: FSEvent = { type, path, oldPath, timestamp: this.clock++ };
    this.events.push(event);

    if (this.debounceMs > 0) {
      this.pending.set(path, { event, timer: event.timestamp });
    } else {
      this.dispatch(event);
    }
  }

  flush(): void {
    for (const { event } of this.pending.values()) {
      this.dispatch(event);
    }
    this.pending.clear();
  }

  private dispatch(event: FSEvent): void {
    for (const rule of this.rules) {
      if (this.matchPattern(rule.pattern, event.path, rule.recursive)) {
        rule.callback(event);
      }
    }
  }

  private matchPattern(pattern: string, path: string, recursive: boolean): boolean {
    if (pattern === "**") return true;

    if (pattern.startsWith("*.")) {
      const ext = pattern.slice(1);
      if (recursive) return path.endsWith(ext);
      return path.endsWith(ext) && !path.slice(0, -ext.length).includes("/", 1);
    }

    if (pattern.endsWith("/*")) {
      const dir = pattern.slice(0, -2);
      if (recursive) return path.startsWith(dir + "/");
      const rest = path.slice(dir.length + 1);
      return path.startsWith(dir + "/") && !rest.includes("/");
    }

    return path === pattern || path.startsWith(pattern + "/");
  }

  getEvents(): FSEvent[] {
    return [...this.events];
  }

  eventCount(): number {
    return this.events.length;
  }

  ruleCount(): number {
    return this.rules.length;
  }

  clearEvents(): void {
    this.events = [];
  }
}

export class BatchProcessor {
  private batch: FSEvent[] = [];
  private batchSize: number;
  private processor: (events: FSEvent[]) => void;

  constructor(batchSize: number, processor: (events: FSEvent[]) => void) {
    this.batchSize = batchSize;
    this.processor = processor;
  }

  add(event: FSEvent): boolean {
    this.batch.push(event);
    if (this.batch.length >= this.batchSize) {
      this.processor([...this.batch]);
      this.batch = [];
      return true;
    }
    return false;
  }

  flush(): void {
    if (this.batch.length > 0) {
      this.processor([...this.batch]);
      this.batch = [];
    }
  }

  pending(): number {
    return this.batch.length;
  }
}
