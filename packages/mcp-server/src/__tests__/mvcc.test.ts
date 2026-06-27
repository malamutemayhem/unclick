import { describe, it, expect } from "vitest";
import { MVCCStore } from "../mvcc.js";

describe("MVCCStore", () => {
  it("begin returns increasing tx ids", () => {
    const store = new MVCCStore<string>();
    const t1 = store.begin();
    const t2 = store.begin();
    expect(t2).toBeGreaterThan(t1);
  });

  it("write and read within same transaction", () => {
    const store = new MVCCStore<string>();
    const tx = store.begin();
    store.write(tx, "key1", "value1");
    expect(store.read(tx, "key1")).toBe("value1");
  });

  it("uncommitted write not visible to other transactions", () => {
    const store = new MVCCStore<string>();
    const tx1 = store.begin();
    store.write(tx1, "key1", "value1");
    const tx2 = store.begin();
    expect(store.read(tx2, "key1")).toBeNull();
  });

  it("committed write visible to later transactions", () => {
    const store = new MVCCStore<string>();
    const tx1 = store.begin();
    store.write(tx1, "key1", "value1");
    store.commit(tx1);
    const tx2 = store.begin();
    expect(store.read(tx2, "key1")).toBe("value1");
  });

  it("abort rolls back writes", () => {
    const store = new MVCCStore<string>();
    const tx1 = store.begin();
    store.write(tx1, "key1", "value1");
    store.abort(tx1);
    const tx2 = store.begin();
    expect(store.read(tx2, "key1")).toBeNull();
  });

  it("delete removes visible value", () => {
    const store = new MVCCStore<string>();
    const tx1 = store.begin();
    store.write(tx1, "key1", "value1");
    store.commit(tx1);

    const tx2 = store.begin();
    const result = store.delete(tx2, "key1");
    expect(result).toBe(true);
    expect(store.read(tx2, "key1")).toBeNull();
  });

  it("snapshot shows committed state", () => {
    const store = new MVCCStore<string>();
    const tx1 = store.begin();
    store.write(tx1, "a", "1");
    store.write(tx1, "b", "2");
    store.commit(tx1);

    const tx2 = store.begin();
    const snap = store.snapshot(tx2);
    expect(snap.get("a")).toBe("1");
    expect(snap.get("b")).toBe("2");
  });

  it("activeTransactions tracks count", () => {
    const store = new MVCCStore<string>();
    expect(store.activeTransactions).toBe(0);
    const tx1 = store.begin();
    const tx2 = store.begin();
    expect(store.activeTransactions).toBe(2);
    store.commit(tx1);
    expect(store.activeTransactions).toBe(1);
    store.abort(tx2);
    expect(store.activeTransactions).toBe(0);
  });

  it("write throws for inactive transaction", () => {
    const store = new MVCCStore<string>();
    const tx = store.begin();
    store.commit(tx);
    expect(() => store.write(tx, "k", "v")).toThrow();
  });

  it("overwrite updates value", () => {
    const store = new MVCCStore<string>();
    const tx1 = store.begin();
    store.write(tx1, "key1", "v1");
    store.write(tx1, "key1", "v2");
    expect(store.read(tx1, "key1")).toBe("v2");
  });
});
