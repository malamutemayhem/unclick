import { describe, it, expect } from "vitest";
import { LSMTree, MemTable, SSTable } from "../log-structured-merge.js";

describe("MemTable", () => {
  it("puts and gets entries", () => {
    const mt = new MemTable(10);
    mt.put("key1", "value1", 1);
    expect(mt.get("key1")?.value).toBe("value1");
  });

  it("signals when full", () => {
    const mt = new MemTable(2);
    mt.put("a", "1", 1);
    expect(mt.put("b", "2", 2)).toBe(true);
    expect(mt.isFull()).toBe(true);
  });

  it("flushes entries sorted by key", () => {
    const mt = new MemTable(10);
    mt.put("c", "3", 3);
    mt.put("a", "1", 1);
    mt.put("b", "2", 2);
    const flushed = mt.flush();
    expect(flushed.map((e) => e.key)).toEqual(["a", "b", "c"]);
    expect(mt.size()).toBe(0);
  });

  it("handles tombstone deletes", () => {
    const mt = new MemTable(10);
    mt.put("key", "val", 1);
    mt.delete("key", 2);
    expect(mt.get("key")?.value).toBeNull();
  });
});

describe("SSTable", () => {
  it("binary searches for keys", () => {
    const entries = [
      { key: "a", value: "1", timestamp: 1 },
      { key: "b", value: "2", timestamp: 2 },
      { key: "c", value: "3", timestamp: 3 },
    ];
    const sst = new SSTable(entries, 0, 0);
    expect(sst.get("b")?.value).toBe("2");
    expect(sst.get("d")).toBeUndefined();
  });

  it("reports min/max keys and size", () => {
    const entries = [
      { key: "alpha", value: "1", timestamp: 1 },
      { key: "beta", value: "2", timestamp: 2 },
    ];
    const sst = new SSTable(entries, 0, 0);
    expect(sst.minKey()).toBe("alpha");
    expect(sst.maxKey()).toBe("beta");
    expect(sst.size()).toBe(2);
  });
});

describe("LSMTree", () => {
  it("puts and gets values", () => {
    const lsm = new LSMTree(10);
    lsm.put("name", "Alice");
    expect(lsm.get("name")).toBe("Alice");
  });

  it("overwrites values", () => {
    const lsm = new LSMTree(10);
    lsm.put("k", "v1");
    lsm.put("k", "v2");
    expect(lsm.get("k")).toBe("v2");
  });

  it("deletes values with tombstones", () => {
    const lsm = new LSMTree(10);
    lsm.put("k", "v");
    lsm.delete("k");
    expect(lsm.get("k")).toBeNull();
  });

  it("returns null for missing keys", () => {
    const lsm = new LSMTree(10);
    expect(lsm.get("missing")).toBeNull();
  });

  it("flushes memtable to sstable when full", () => {
    const lsm = new LSMTree(3);
    lsm.put("a", "1");
    lsm.put("b", "2");
    lsm.put("c", "3");
    expect(lsm.tableCount()).toBeGreaterThanOrEqual(1);
  });

  it("retrieves values after flush", () => {
    const lsm = new LSMTree(2);
    lsm.put("x", "10");
    lsm.put("y", "20");
    lsm.put("z", "30");
    expect(lsm.get("x")).toBe("10");
    expect(lsm.get("z")).toBe("30");
  });

  it("reports stats", () => {
    const lsm = new LSMTree(5);
    lsm.put("a", "1");
    const stats = lsm.stats();
    expect(stats.memtableSize).toBe(1);
  });
});
