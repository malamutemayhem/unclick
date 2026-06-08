// Structured request/response logging for tool calls.
// Gives visibility into what was called, how long it took, and what happened,
// with automatic secret masking so logs stay safe to ship.

import { maskSecretsInRecord } from "./mask-secrets.js";
import { redactUrlForLog } from "./url-sanitizer.js";

export interface RequestLogEntry {
  correlationId: string;
  tool: string;
  timestamp: string;
  durationMs: number;
  status: "success" | "error";
  args?: Record<string, unknown>;
  error?: string;
  url?: string;
  httpStatus?: number;
}

export type LogSink = (entry: RequestLogEntry) => void;

let activeSink: LogSink = () => {};

export function setLogSink(sink: LogSink): void {
  activeSink = sink;
}

export function getLogSink(): LogSink {
  return activeSink;
}

let idCounter = 0;

function generateCorrelationId(): string {
  const ts = Date.now().toString(36);
  const seq = (idCounter++).toString(36);
  return `${ts}-${seq}`;
}

export function logToolCall(
  tool: string,
  args: Record<string, unknown> | undefined,
  fn: () => Promise<{ result?: unknown; httpStatus?: number; url?: string }>,
): Promise<{ result?: unknown; httpStatus?: number; url?: string }> {
  const correlationId = generateCorrelationId();
  const start = Date.now();

  return fn().then(
    (res) => {
      const entry: RequestLogEntry = {
        correlationId,
        tool,
        timestamp: new Date(start).toISOString(),
        durationMs: Date.now() - start,
        status: "success",
        httpStatus: res.httpStatus,
      };
      if (args) entry.args = maskSecretsInRecord(args);
      if (res.url) entry.url = redactUrlForLog(res.url);
      activeSink(entry);
      return res;
    },
    (err) => {
      const entry: RequestLogEntry = {
        correlationId,
        tool,
        timestamp: new Date(start).toISOString(),
        durationMs: Date.now() - start,
        status: "error",
        error: err instanceof Error ? err.message : String(err),
      };
      if (args) entry.args = maskSecretsInRecord(args);
      activeSink(entry);
      throw err;
    },
  );
}

// Batch log buffer for high-throughput scenarios.
export class LogBuffer {
  private buffer: RequestLogEntry[] = [];
  private readonly maxSize: number;
  private readonly flushFn: (entries: RequestLogEntry[]) => void;

  constructor(maxSize: number, flushFn: (entries: RequestLogEntry[]) => void) {
    this.maxSize = maxSize;
    this.flushFn = flushFn;
  }

  add(entry: RequestLogEntry): void {
    this.buffer.push(entry);
    if (this.buffer.length >= this.maxSize) {
      this.flush();
    }
  }

  flush(): void {
    if (this.buffer.length === 0) return;
    const batch = this.buffer;
    this.buffer = [];
    this.flushFn(batch);
  }

  get size(): number {
    return this.buffer.length;
  }
}
