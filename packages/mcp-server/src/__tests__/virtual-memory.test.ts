import { describe, it, expect } from "vitest";
import { VirtualMemory } from "../virtual-memory.js";

describe("VirtualMemory", () => {
  it("first access is a page fault", () => {
    const vm = new VirtualMemory(4, "lru");
    const result = vm.access(0);
    expect(result.hit).toBe(false);
    expect(vm.faultCount).toBe(1);
  });

  it("second access to same page is a hit", () => {
    const vm = new VirtualMemory(4, "lru");
    vm.access(0);
    const result = vm.access(0);
    expect(result.hit).toBe(true);
    expect(vm.hitCount).toBe(1);
  });

  it("LRU evicts least recently used", () => {
    const vm = new VirtualMemory(3, "lru");
    vm.access(0);
    vm.access(1);
    vm.access(2);
    vm.access(0);
    vm.access(3);
    expect(vm.isResident(0)).toBe(true);
    expect(vm.isResident(1)).toBe(false);
  });

  it("FIFO evicts in order", () => {
    const vm = new VirtualMemory(3, "fifo");
    vm.access(0);
    vm.access(1);
    vm.access(2);
    vm.access(3);
    expect(vm.isResident(0)).toBe(false);
    expect(vm.isResident(3)).toBe(true);
  });

  it("clock algorithm works", () => {
    const vm = new VirtualMemory(3, "clock");
    vm.access(0);
    vm.access(1);
    vm.access(2);
    vm.access(3);
    expect(vm.faultCount).toBe(4);
    expect(vm.residentPages).toBe(3);
  });

  it("write marks page dirty", () => {
    const vm = new VirtualMemory(4, "lru");
    vm.access(0, true);
    const entry = vm.getPageEntry(0);
    expect(entry!.dirty).toBe(true);
  });

  it("hitRate calculated correctly", () => {
    const vm = new VirtualMemory(4, "lru");
    vm.access(0);
    vm.access(1);
    vm.access(0);
    vm.access(1);
    expect(vm.hitRate).toBe(0.5);
  });

  it("residentPages tracks count", () => {
    const vm = new VirtualMemory(4, "lru");
    expect(vm.residentPages).toBe(0);
    vm.access(0);
    vm.access(1);
    expect(vm.residentPages).toBe(2);
  });

  it("totalFrames returns frame count", () => {
    const vm = new VirtualMemory(8, "lru");
    expect(vm.totalFrames).toBe(8);
  });

  it("reset clears everything", () => {
    const vm = new VirtualMemory(4, "lru");
    vm.access(0);
    vm.access(1);
    vm.reset();
    expect(vm.faultCount).toBe(0);
    expect(vm.hitCount).toBe(0);
    expect(vm.residentPages).toBe(0);
  });

  it("hitRate zero when no accesses", () => {
    const vm = new VirtualMemory(4, "lru");
    expect(vm.hitRate).toBe(0);
  });
});
