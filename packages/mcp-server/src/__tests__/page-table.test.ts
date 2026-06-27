import { describe, it, expect } from "vitest";
import { PageTable } from "../page-table.js";

describe("PageTable", () => {
  it("access causes page fault on first access", () => {
    const pt = new PageTable(4, 4096);
    pt.access(0);
    expect(pt.faults).toBe(1);
    expect(pt.hits).toBe(0);
  });

  it("second access is a hit", () => {
    const pt = new PageTable(4, 4096);
    pt.access(0);
    pt.access(0);
    expect(pt.hits).toBe(1);
    expect(pt.faults).toBe(1);
  });

  it("translate returns physical address", () => {
    const pt = new PageTable(4, 4096);
    pt.access(5);
    const phys = pt.translate(5 * 4096 + 100);
    expect(phys).not.toBeNull();
    expect(phys! % 4096).toBe(100);
  });

  it("translate returns null for invalid page", () => {
    const pt = new PageTable(4, 4096);
    expect(pt.translate(99999)).toBeNull();
  });

  it("evicts LRU page when full", () => {
    const pt = new PageTable(2, 4096);
    pt.access(0, "lru");
    pt.access(1, "lru");
    pt.access(0, "lru");
    pt.access(2, "lru");
    expect(pt.translate(1 * 4096)).toBeNull();
    expect(pt.translate(0 * 4096)).not.toBeNull();
  });

  it("FIFO eviction", () => {
    const pt = new PageTable(2, 4096);
    pt.access(0, "fifo");
    pt.access(1, "fifo");
    pt.access(2, "fifo");
    expect(pt.translate(0 * 4096)).toBeNull();
  });

  it("setDirty marks page", () => {
    const pt = new PageTable(4, 4096);
    const entry = pt.access(0);
    expect(entry.dirty).toBe(false);
    pt.setDirty(0);
    const entry2 = pt.access(0);
    expect(entry2.dirty).toBe(true);
  });

  it("invalidate frees frame", () => {
    const pt = new PageTable(4, 4096);
    pt.access(0);
    expect(pt.usedFrames).toBe(1);
    pt.invalidate(0);
    expect(pt.usedFrames).toBe(0);
    expect(pt.freeFrames).toBe(4);
  });

  it("hitRate calculation", () => {
    const pt = new PageTable(4, 4096);
    pt.access(0);
    pt.access(0);
    pt.access(0);
    expect(pt.hitRate).toBeCloseTo(2 / 3);
  });

  it("reset clears state", () => {
    const pt = new PageTable(4, 4096);
    pt.access(0);
    pt.access(1);
    pt.reset();
    expect(pt.faults).toBe(0);
    expect(pt.hits).toBe(0);
    expect(pt.usedFrames).toBe(0);
  });

  it("setProtection changes protection", () => {
    const pt = new PageTable(4, 4096);
    pt.access(0);
    pt.setProtection(0, "rx");
    const entry = pt.access(0);
    expect(entry.protection).toBe("rx");
  });
});
