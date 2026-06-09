import { describe, it, expect } from "vitest";
import { MemoryModel } from "../memory-model.js";

describe("MemoryModel", () => {
  it("store and load", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 42);
    const { value } = mm.load(0, 0x100);
    expect(value).toBe(42);
  });

  it("load uninitialized returns 0", () => {
    const mm = new MemoryModel();
    const { value } = mm.load(0, 0x200);
    expect(value).toBe(0);
  });

  it("store overwrites previous value", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 10);
    mm.store(0, 0x100, 20);
    expect(mm.getMemory(0x100)).toBe(20);
  });

  it("tracks thread count", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 1);
    mm.store(1, 0x200, 2);
    expect(mm.threadCount).toBe(2);
  });

  it("tracks op count", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 1);
    mm.load(0, 0x100);
    mm.fence(0);
    expect(mm.opCount).toBe(3);
  });

  it("getOps filters by thread", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 1);
    mm.store(1, 0x200, 2);
    mm.load(0, 0x100);
    expect(mm.getOps(0)).toHaveLength(2);
    expect(mm.getOps(1)).toHaveLength(1);
  });

  it("happensBeforeCheck within same thread", () => {
    const mm = new MemoryModel();
    const op1 = mm.store(0, 0x100, 1);
    const op2 = mm.load(0, 0x100);
    expect(mm.happensBeforeCheck(op1, op2.op)).toBe(true);
    expect(mm.happensBeforeCheck(op2.op, op1)).toBe(false);
  });

  it("happensBeforeCheck with release-acquire", () => {
    const mm = new MemoryModel();
    const op1 = mm.store(0, 0x100, 1, "release");
    const op2 = mm.load(1, 0x100, "acquire");
    expect(mm.happensBeforeCheck(op1, op2.op)).toBe(true);
  });

  it("no happens-before between relaxed ops on different threads", () => {
    const mm = new MemoryModel();
    const op1 = mm.store(0, 0x100, 1, "relaxed");
    const op2 = mm.load(1, 0x100, "relaxed");
    expect(mm.happensBeforeCheck(op1, op2.op)).toBe(false);
  });

  it("hasDataRace detects relaxed concurrent access", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 1, "relaxed");
    mm.store(1, 0x100, 2, "relaxed");
    expect(mm.hasDataRace(0x100)).toBe(true);
  });

  it("getMemoryState returns state info", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 42);
    const state = mm.getMemoryState(0x100)!;
    expect(state.value).toBe(42);
    expect(state.lastWriter).toBe(0);
  });

  it("getMemoryState returns null for unwritten", () => {
    const mm = new MemoryModel();
    expect(mm.getMemoryState(0x100)).toBeNull();
  });

  it("reset clears all state", () => {
    const mm = new MemoryModel();
    mm.store(0, 0x100, 1);
    mm.reset();
    expect(mm.opCount).toBe(0);
    expect(mm.threadCount).toBe(0);
    expect(mm.getMemory(0x100)).toBe(0);
  });
});
