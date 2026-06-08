import { describe, it, expect } from "vitest";
import { createLogger, collectSink } from "../structured-logger.js";

describe("createLogger", () => {
  it("logs at or above the configured level", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ level: "warn", sink });
    log.debug("nope");
    log.info("nope");
    log.warn("yes");
    log.error("yes");
    expect(entries).toHaveLength(2);
    expect(entries[0].level).toBe("warn");
    expect(entries[1].level).toBe("error");
  });

  it("defaults to info level", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink });
    log.debug("hidden");
    log.info("shown");
    expect(entries).toHaveLength(1);
  });

  it("includes context in entries", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink });
    log.info("hello", { tool: "github" });
    expect(entries[0].context).toEqual({ tool: "github" });
  });

  it("merges base context with per-call context", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink, context: { service: "mcp" } });
    log.info("test", { tool: "slack" });
    expect(entries[0].context).toEqual({ service: "mcp", tool: "slack" });
  });

  it("child logger inherits and extends context", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink, context: { service: "mcp" } });
    const child = log.child({ connector: "github" });
    child.info("request");
    expect(entries[0].context).toEqual({ service: "mcp", connector: "github" });
  });

  it("child logger inherits level", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink, level: "error" });
    const child = log.child({ x: 1 });
    child.warn("hidden");
    child.error("shown");
    expect(entries).toHaveLength(1);
  });

  it("setLevel changes minimum level", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink, level: "error" });
    log.info("hidden");
    log.setLevel("debug");
    log.debug("shown");
    expect(entries).toHaveLength(1);
    expect(entries[0].message).toBe("shown");
  });

  it("entries have timestamps", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink });
    log.info("test");
    expect(entries[0].timestamp).toBeGreaterThan(0);
  });

  it("works with empty context", () => {
    const { entries, sink } = collectSink();
    const log = createLogger({ sink });
    log.info("no context");
    expect(entries[0].context).toEqual({});
  });
});
