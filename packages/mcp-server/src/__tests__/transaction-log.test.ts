import { describe, it, expect } from "vitest";
import { TransactionLog } from "../transaction-log.js";

describe("TransactionLog", () => {
  it("begins a transaction", () => {
    const log = new TransactionLog();
    const txId = log.begin();
    expect(txId).toBe(1);
    expect(log.txStatus(txId)).toBe("pending");
  });

  it("reads and writes within transaction", () => {
    const log = new TransactionLog();
    const tx = log.begin();
    log.write(tx, "key1", "value1");
    expect(log.read(tx, "key1")).toBe("value1");
  });

  it("commits transaction to store", () => {
    const log = new TransactionLog();
    const tx = log.begin();
    log.write(tx, "x", "100");
    log.commit(tx);
    expect(log.txStatus(tx)).toBe("committed");
    expect(log.getStore().get("x")).toBe("100");
  });

  it("aborts transaction without applying", () => {
    const log = new TransactionLog();
    const tx = log.begin();
    log.write(tx, "y", "200");
    log.abort(tx);
    expect(log.txStatus(tx)).toBe("aborted");
    expect(log.getStore().has("y")).toBe(false);
  });

  it("reads committed data from other transactions", () => {
    const log = new TransactionLog();
    const tx1 = log.begin();
    log.write(tx1, "shared", "hello");
    log.commit(tx1);

    const tx2 = log.begin();
    expect(log.read(tx2, "shared")).toBe("hello");
  });

  it("tracks active transactions", () => {
    const log = new TransactionLog();
    log.begin();
    log.begin();
    const tx3 = log.begin();
    log.commit(tx3);
    expect(log.activeTransactions()).toBe(2);
  });

  it("recovers by aborting pending transactions", () => {
    const log = new TransactionLog();
    log.begin();
    log.begin();
    const recovered = log.recover();
    expect(recovered).toBe(2);
    expect(log.activeTransactions()).toBe(0);
  });

  it("records log entries", () => {
    const log = new TransactionLog();
    const tx = log.begin();
    log.write(tx, "a", "1");
    log.commit(tx);
    expect(log.logSize()).toBeGreaterThan(0);
    const entries = log.getLog();
    expect(entries.some((e) => e.operation === "begin")).toBe(true);
    expect(entries.some((e) => e.operation === "commit")).toBe(true);
  });

  it("checkpoints", () => {
    const log = new TransactionLog();
    log.checkpoint();
    expect(log.getLog().some((e) => e.operation === "checkpoint")).toBe(true);
  });

  it("rejects writes to committed transaction", () => {
    const log = new TransactionLog();
    const tx = log.begin();
    log.commit(tx);
    expect(log.write(tx, "x", "v")).toBe(false);
  });

  it("handles multiple writes to same key", () => {
    const log = new TransactionLog();
    const tx = log.begin();
    log.write(tx, "k", "v1");
    log.write(tx, "k", "v2");
    log.commit(tx);
    expect(log.getStore().get("k")).toBe("v2");
  });
});
