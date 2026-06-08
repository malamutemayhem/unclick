import { describe, it, expect } from "vitest";
import { TraceLogger } from "../trace-logger.js";

describe("TraceLogger", () => {
  it("starts and ends a span", () => {
    const logger = new TraceLogger();
    const id = logger.startSpan("test");
    expect(logger.getSpan(id)?.status).toBe("running");
    logger.endSpan(id);
    expect(logger.getSpan(id)?.status).toBe("ok");
    expect(logger.durationMs(id)).toBeGreaterThanOrEqual(0);
  });

  it("tracks parent-child relationships", () => {
    const logger = new TraceLogger();
    const parentId = logger.startSpan("parent");
    const childId = logger.startSpan("child");
    expect(logger.getSpan(childId)?.parentId).toBe(parentId);
    logger.endSpan(childId);
    logger.endSpan(parentId);
  });

  it("adds events to spans", () => {
    const logger = new TraceLogger();
    const id = logger.startSpan("test");
    logger.addEvent(id, "checkpoint", { step: 1 });
    expect(logger.getSpan(id)?.events.length).toBe(1);
    expect(logger.getSpan(id)?.events[0].name).toBe("checkpoint");
  });

  it("sets attributes", () => {
    const logger = new TraceLogger();
    const id = logger.startSpan("test");
    logger.setAttribute(id, "model", "gpt-4");
    expect(logger.getSpan(id)?.attributes.model).toBe("gpt-4");
  });

  it("gets children", () => {
    const logger = new TraceLogger();
    const parentId = logger.startSpan("parent");
    logger.startSpan("child1");
    logger.endSpan(logger.activeSpanId!);
    logger.startSpan("child2");
    logger.endSpan(logger.activeSpanId!);
    const children = logger.getChildren(parentId);
    expect(children.length).toBe(2);
  });

  it("gets full trace", () => {
    const logger = new TraceLogger();
    const rootId = logger.startSpan("root");
    const child1 = logger.startSpan("child1");
    logger.endSpan(child1);
    const child2 = logger.startSpan("child2");
    logger.endSpan(child2);
    logger.endSpan(rootId);
    const trace = logger.getTrace(rootId);
    expect(trace.length).toBe(3);
  });

  it("ends span with error status", () => {
    const logger = new TraceLogger();
    const id = logger.startSpan("test");
    logger.endSpan(id, "error");
    expect(logger.getSpan(id)?.status).toBe("error");
  });

  it("allSpans returns everything", () => {
    const logger = new TraceLogger();
    logger.startSpan("a");
    logger.startSpan("b");
    expect(logger.allSpans().length).toBe(2);
  });

  it("clear removes all spans", () => {
    const logger = new TraceLogger();
    logger.startSpan("test");
    logger.clear();
    expect(logger.allSpans().length).toBe(0);
    expect(logger.activeSpanId).toBeNull();
  });
});
