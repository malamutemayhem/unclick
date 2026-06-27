export interface Span {
  id: string;
  name: string;
  parentId?: string;
  startTime: number;
  endTime?: number;
  attributes: Record<string, string | number | boolean>;
  events: SpanEvent[];
  status: "ok" | "error" | "running";
}

export interface SpanEvent {
  name: string;
  timestamp: number;
  attributes?: Record<string, string | number | boolean>;
}

let spanCounter = 0;

function generateId(): string {
  return `span_${++spanCounter}_${Date.now()}`;
}

export class TraceLogger {
  private spans = new Map<string, Span>();
  private activeSpan: string | null = null;

  startSpan(name: string, attributes: Record<string, string | number | boolean> = {}): string {
    const id = generateId();
    const span: Span = {
      id,
      name,
      parentId: this.activeSpan ?? undefined,
      startTime: Date.now(),
      attributes,
      events: [],
      status: "running",
    };
    this.spans.set(id, span);
    this.activeSpan = id;
    return id;
  }

  endSpan(id: string, status: "ok" | "error" = "ok"): void {
    const span = this.spans.get(id);
    if (!span) return;
    span.endTime = Date.now();
    span.status = status;
    if (this.activeSpan === id) {
      this.activeSpan = span.parentId ?? null;
    }
  }

  addEvent(spanId: string, name: string, attributes?: Record<string, string | number | boolean>): void {
    const span = this.spans.get(spanId);
    if (!span) return;
    span.events.push({ name, timestamp: Date.now(), attributes });
  }

  setAttribute(spanId: string, key: string, value: string | number | boolean): void {
    const span = this.spans.get(spanId);
    if (span) span.attributes[key] = value;
  }

  getSpan(id: string): Span | undefined {
    return this.spans.get(id);
  }

  getChildren(parentId: string): Span[] {
    return [...this.spans.values()].filter((s) => s.parentId === parentId);
  }

  getTrace(rootId: string): Span[] {
    const result: Span[] = [];
    const root = this.spans.get(rootId);
    if (!root) return result;
    result.push(root);
    const children = this.getChildren(rootId);
    for (const child of children) {
      result.push(...this.getTrace(child.id));
    }
    return result;
  }

  get activeSpanId(): string | null {
    return this.activeSpan;
  }

  durationMs(id: string): number | undefined {
    const span = this.spans.get(id);
    if (!span || !span.endTime) return undefined;
    return span.endTime - span.startTime;
  }

  allSpans(): Span[] {
    return [...this.spans.values()];
  }

  clear(): void {
    this.spans.clear();
    this.activeSpan = null;
  }
}
