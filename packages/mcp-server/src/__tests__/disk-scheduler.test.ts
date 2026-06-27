import { describe, it, expect } from "vitest";
import { DiskScheduler } from "../disk-scheduler.js";

const requests = [
  { track: 98, id: 1 },
  { track: 183, id: 2 },
  { track: 37, id: 3 },
  { track: 122, id: 4 },
  { track: 14, id: 5 },
  { track: 124, id: 6 },
  { track: 65, id: 7 },
  { track: 67, id: 8 },
];

describe("DiskScheduler", () => {
  it("FCFS processes in order", () => {
    const sched = new DiskScheduler(199, 53);
    const result = sched.schedule(requests, "fcfs");
    expect(result.order).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(result.totalSeek).toBeGreaterThan(0);
  });

  it("SSTF picks nearest", () => {
    const sched = new DiskScheduler(199, 53);
    const result = sched.schedule(requests, "sstf");
    expect(result.order[0]).toBe(7);
    expect(result.totalSeek).toBeLessThan(
      sched.schedule(requests, "fcfs").totalSeek
    );
  });

  it("SCAN sweeps in direction then reverses", () => {
    const sched = new DiskScheduler(199, 53, "up");
    const result = sched.schedule(requests, "scan");
    expect(result.order.length).toBe(requests.length);
    expect(result.totalSeek).toBeGreaterThan(0);
  });

  it("CSCAN wraps around", () => {
    const sched = new DiskScheduler(199, 53, "up");
    const result = sched.schedule(requests, "cscan");
    expect(result.order.length).toBe(requests.length);
  });

  it("LOOK reverses without going to end", () => {
    const sched = new DiskScheduler(199, 53, "up");
    const result = sched.schedule(requests, "look");
    expect(result.totalSeek).toBeLessThanOrEqual(
      sched.schedule(requests, "scan").totalSeek
    );
  });

  it("CLOOK wraps without going to end", () => {
    const sched = new DiskScheduler(199, 53, "up");
    const result = sched.schedule(requests, "clook");
    expect(result.order.length).toBe(requests.length);
  });

  it("empty requests returns empty", () => {
    const sched = new DiskScheduler(199, 53);
    const result = sched.schedule([], "fcfs");
    expect(result.order).toEqual([]);
    expect(result.totalSeek).toBe(0);
  });

  it("single request", () => {
    const sched = new DiskScheduler(199, 50);
    const result = sched.schedule([{ track: 100, id: 1 }], "sstf");
    expect(result.order).toEqual([1]);
    expect(result.totalSeek).toBe(50);
  });

  it("setPosition changes start", () => {
    const sched = new DiskScheduler(199, 0);
    sched.setPosition(100);
    const result = sched.schedule([{ track: 50, id: 1 }], "fcfs");
    expect(result.totalSeek).toBe(50);
  });

  it("setDirection changes scan direction", () => {
    const sched = new DiskScheduler(199, 100, "up");
    sched.setDirection("down");
    const result = sched.schedule(requests, "look");
    expect(result.order.length).toBe(requests.length);
  });
});
