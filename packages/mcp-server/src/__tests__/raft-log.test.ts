import { describe, it, expect } from "vitest";
import { RaftLog } from "../raft-log.js";

describe("RaftLog", () => {
  it("appends entries with correct indices", () => {
    const log = new RaftLog<string>();
    const e1 = log.append(1, "set x=1");
    const e2 = log.append(1, "set y=2");
    expect(e1.index).toBe(0);
    expect(e2.index).toBe(1);
    expect(log.length()).toBe(2);
  });

  it("lastIndex and lastTerm", () => {
    const log = new RaftLog<string>();
    expect(log.lastIndex()).toBe(-1);
    expect(log.lastTerm()).toBe(0);
    log.append(1, "a");
    log.append(2, "b");
    expect(log.lastIndex()).toBe(1);
    expect(log.lastTerm()).toBe(2);
  });

  it("commit and apply", () => {
    const log = new RaftLog<string>();
    log.append(1, "a");
    log.append(1, "b");
    log.commit(1);
    expect(log.getCommitIndex()).toBe(1);
    const e1 = log.applyNext();
    expect(e1!.command).toBe("a");
    const e2 = log.applyNext();
    expect(e2!.command).toBe("b");
    expect(log.applyNext()).toBeNull();
  });

  it("appendEntries succeeds with matching prev", () => {
    const log = new RaftLog<string>();
    log.append(1, "a");
    const ok = log.appendEntries(0, 1, [{ term: 1, index: 1, command: "b" }]);
    expect(ok).toBe(true);
    expect(log.length()).toBe(2);
  });

  it("appendEntries fails on prev mismatch", () => {
    const log = new RaftLog<string>();
    log.append(1, "a");
    const ok = log.appendEntries(0, 2, [{ term: 2, index: 1, command: "b" }]);
    expect(ok).toBe(false);
  });

  it("appendEntries truncates conflicting entries", () => {
    const log = new RaftLog<string>();
    log.append(1, "a");
    log.append(1, "old");
    const ok = log.appendEntries(0, 1, [{ term: 2, index: 1, command: "new" }]);
    expect(ok).toBe(true);
    expect(log.get(1)!.command).toBe("new");
    expect(log.get(1)!.term).toBe(2);
  });

  it("isUpToDate compares log freshness", () => {
    const log = new RaftLog<string>();
    log.append(1, "a");
    log.append(2, "b");
    expect(log.isUpToDate(1, 2)).toBe(true);
    expect(log.isUpToDate(0, 2)).toBe(false);
    expect(log.isUpToDate(5, 3)).toBe(true);
    expect(log.isUpToDate(5, 1)).toBe(false);
  });

  it("slice returns range of entries", () => {
    const log = new RaftLog<string>();
    log.append(1, "a");
    log.append(1, "b");
    log.append(2, "c");
    const sl = log.slice(1, 3);
    expect(sl.length).toBe(2);
    expect(sl[0].command).toBe("b");
  });
});
