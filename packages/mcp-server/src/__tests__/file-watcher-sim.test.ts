import { describe, it, expect } from "vitest";
import { FileWatcher, BatchProcessor, type FSEvent } from "../file-watcher-sim.js";

describe("FileWatcher", () => {
  it("emits and dispatches events", () => {
    const watcher = new FileWatcher();
    const events: FSEvent[] = [];
    watcher.watch("**", (e) => events.push(e));
    watcher.emit("create", "/src/main.ts");
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("create");
  });

  it("matches extension patterns", () => {
    const watcher = new FileWatcher();
    const events: FSEvent[] = [];
    watcher.watch("*.ts", (e) => events.push(e), true);
    watcher.emit("modify", "/src/file.ts");
    watcher.emit("modify", "/src/file.js");
    expect(events.length).toBe(1);
  });

  it("matches directory patterns", () => {
    const watcher = new FileWatcher();
    const events: FSEvent[] = [];
    watcher.watch("/src/*", (e) => events.push(e));
    watcher.emit("create", "/src/file.ts");
    watcher.emit("create", "/lib/file.ts");
    expect(events.length).toBe(1);
  });

  it("unwatches by id", () => {
    const watcher = new FileWatcher();
    const events: FSEvent[] = [];
    const id = watcher.watch("**", (e) => events.push(e));
    watcher.unwatch(id);
    watcher.emit("create", "/test.txt");
    expect(events.length).toBe(0);
  });

  it("tracks event history", () => {
    const watcher = new FileWatcher();
    watcher.watch("**", () => {});
    watcher.emit("create", "/a.ts");
    watcher.emit("modify", "/a.ts");
    watcher.emit("delete", "/a.ts");
    expect(watcher.eventCount()).toBe(3);
  });

  it("handles rename events", () => {
    const watcher = new FileWatcher();
    const events: FSEvent[] = [];
    watcher.watch("**", (e) => events.push(e));
    watcher.emit("rename", "/new.ts", "/old.ts");
    expect(events[0].oldPath).toBe("/old.ts");
  });

  it("clears events", () => {
    const watcher = new FileWatcher();
    watcher.emit("create", "/test.ts");
    watcher.clearEvents();
    expect(watcher.eventCount()).toBe(0);
  });

  it("debounces events", () => {
    const watcher = new FileWatcher(100);
    const events: FSEvent[] = [];
    watcher.watch("**", (e) => events.push(e));
    watcher.emit("modify", "/a.ts");
    watcher.emit("modify", "/a.ts");
    expect(events.length).toBe(0);
    watcher.flush();
    expect(events.length).toBe(1);
  });

  it("counts rules", () => {
    const watcher = new FileWatcher();
    watcher.watch("**", () => {});
    watcher.watch("*.ts", () => {});
    expect(watcher.ruleCount()).toBe(2);
  });
});

describe("BatchProcessor", () => {
  it("processes batches at threshold", () => {
    const batches: FSEvent[][] = [];
    const bp = new BatchProcessor(2, (events) => batches.push(events));
    bp.add({ type: "create", path: "/a", timestamp: 0 });
    expect(batches.length).toBe(0);
    bp.add({ type: "create", path: "/b", timestamp: 1 });
    expect(batches.length).toBe(1);
    expect(batches[0].length).toBe(2);
  });

  it("flushes remaining", () => {
    const batches: FSEvent[][] = [];
    const bp = new BatchProcessor(5, (events) => batches.push(events));
    bp.add({ type: "create", path: "/a", timestamp: 0 });
    bp.flush();
    expect(batches.length).toBe(1);
    expect(bp.pending()).toBe(0);
  });
});
