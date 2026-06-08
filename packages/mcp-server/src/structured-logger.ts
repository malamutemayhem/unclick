export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export interface LogEntry {
  level: LogLevel;
  message: string;
  context: Record<string, unknown>;
  timestamp: number;
}

export type LogSink = (entry: LogEntry) => void;

export interface Logger {
  debug(message: string, ctx?: Record<string, unknown>): void;
  info(message: string, ctx?: Record<string, unknown>): void;
  warn(message: string, ctx?: Record<string, unknown>): void;
  error(message: string, ctx?: Record<string, unknown>): void;
  child(defaultCtx: Record<string, unknown>): Logger;
  setLevel(level: LogLevel): void;
}

export function createLogger(opts: {
  level?: LogLevel;
  sink?: LogSink;
  context?: Record<string, unknown>;
} = {}): Logger {
  let minLevel = opts.level ?? "info";
  const sink: LogSink = opts.sink ?? defaultSink;
  const baseCtx = opts.context ?? {};

  function shouldLog(level: LogLevel): boolean {
    return LEVEL_ORDER[level] >= LEVEL_ORDER[minLevel];
  }

  function log(level: LogLevel, message: string, ctx?: Record<string, unknown>): void {
    if (!shouldLog(level)) return;
    sink({
      level,
      message,
      context: { ...baseCtx, ...ctx },
      timestamp: Date.now(),
    });
  }

  return {
    debug: (msg, ctx) => log("debug", msg, ctx),
    info: (msg, ctx) => log("info", msg, ctx),
    warn: (msg, ctx) => log("warn", msg, ctx),
    error: (msg, ctx) => log("error", msg, ctx),
    child(defaultCtx) {
      return createLogger({
        level: minLevel,
        sink,
        context: { ...baseCtx, ...defaultCtx },
      });
    },
    setLevel(level: LogLevel) {
      minLevel = level;
    },
  };
}

function defaultSink(entry: LogEntry): void {
  const ctx = Object.keys(entry.context).length > 0
    ? ` ${JSON.stringify(entry.context)}`
    : "";
  const line = `[${entry.level.toUpperCase()}] ${entry.message}${ctx}`;
  if (entry.level === "error") {
    console.error(line);
  } else if (entry.level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export function collectSink(): { entries: LogEntry[]; sink: LogSink } {
  const entries: LogEntry[] = [];
  return { entries, sink: (e) => entries.push(e) };
}
