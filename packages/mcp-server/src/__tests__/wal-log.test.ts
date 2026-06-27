import { describe, it, expect } from "vitest";
import { WALLog } from "../wal-log.js";

describe("WALLog", () => {
  it("write appends entry", () => {
    const wal = new WALLog();
    const e = wal.write(1, "k1", "old", "new");
    expect(e.op).toBe("write");
    expect(e.lsn).toBe(1);
    expect(wal.size).toBe(1);
  });

  it("LSNs are monotonically increasing", () => {
    const wal = new WALLog();
    const e1 = wal.write(1, "k1", "a", "b");
    const e2 = wal.write(1, "k2", "c", "d");
    expect(e2.lsn).toBeGreaterThan(e1.lsn);
  });

  it("commit marks transaction", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.commit(1);
    expect(wal.isCommitted(1)).toBe(true);
    expect(wal.isAborted(1)).toBe(false);
  });

  it("abort marks transaction", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.abort(1);
    expect(wal.isAborted(1)).toBe(true);
    expect(wal.isCommitted(1)).toBe(false);
  });

  it("redo returns committed writes", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.commit(1);
    wal.write(2, "k2", "c", "d");
    const redos = wal.redo();
    expect(redos).toHaveLength(1);
    expect(redos[0].txId).toBe(1);
  });

  it("undo returns uncommitted writes", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.commit(1);
    wal.write(2, "k2", "c", "d");
    const undos = wal.undo();
    expect(undos).toHaveLength(1);
    expect(undos[0].txId).toBe(2);
  });

  it("undo excludes aborted transactions", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.abort(1);
    const undos = wal.undo();
    expect(undos).toHaveLength(0);
  });

  it("checkpoint sets lastCheckpoint", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.checkpoint();
    expect(wal.lastCheckpoint).toBeGreaterThan(0);
  });

  it("recover uses checkpoint", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.commit(1);
    wal.checkpoint();
    wal.write(2, "k2", "c", "d");
    wal.commit(2);
    const { redo } = wal.recover();
    expect(redo).toHaveLength(1);
    expect(redo[0].txId).toBe(2);
  });

  it("delete appends delete entry", () => {
    const wal = new WALLog();
    const e = wal.delete(1, "k1", "old");
    expect(e.op).toBe("delete");
  });

  it("getEntries filters by txId", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.write(2, "k2", "c", "d");
    wal.write(1, "k3", "e", "f");
    expect(wal.getEntries(1)).toHaveLength(2);
    expect(wal.getEntries(2)).toHaveLength(1);
  });

  it("truncate removes old entries", () => {
    const wal = new WALLog();
    wal.write(1, "k1", "a", "b");
    wal.write(1, "k2", "c", "d");
    const lsn = wal.lastLsn;
    const removed = wal.truncate(lsn);
    expect(removed).toBe(1);
    expect(wal.size).toBe(1);
  });
});
