import { describe, it, expect } from "vitest";
import { TimeSlotManager } from "../time-slot.js";

describe("TimeSlotManager", () => {
  it("adds non-overlapping slots", () => {
    const mgr = new TimeSlotManager();
    expect(mgr.addSlot(0, 60, "Meeting")).toBe(true);
    expect(mgr.addSlot(60, 120, "Lunch")).toBe(true);
    expect(mgr.slotCount()).toBe(2);
  });

  it("rejects overlapping slots", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(0, 60);
    expect(mgr.addSlot(30, 90)).toBe(false);
  });

  it("rejects invalid time range", () => {
    const mgr = new TimeSlotManager();
    expect(mgr.addSlot(60, 30)).toBe(false);
  });

  it("finds free slots", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(30, 60);
    mgr.addSlot(90, 120);
    const free = mgr.findFreeSlots(0, 150);
    expect(free.length).toBe(3);
    expect(free[0]).toEqual({ start: 0, end: 30 });
  });

  it("finds free slots with min duration", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(10, 50);
    mgr.addSlot(55, 90);
    const free = mgr.findFreeSlots(0, 100, 10);
    expect(free.every((f) => f.end - f.start >= 10)).toBe(true);
  });

  it("calculates utilization", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(0, 50);
    expect(mgr.utilization(0, 100)).toBeCloseTo(0.5);
  });

  it("removes slots", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(0, 60);
    expect(mgr.removeSlot(0)).toBe(true);
    expect(mgr.slotCount()).toBe(0);
  });

  it("finds slot at given time", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(0, 60, "Work");
    expect(mgr.findSlot(30)!.label).toBe("Work");
    expect(mgr.findSlot(70)).toBeNull();
  });

  it("calculates total booked time", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(0, 30);
    mgr.addSlot(60, 90);
    expect(mgr.totalBooked()).toBe(60);
  });

  it("calculates total free time", () => {
    const mgr = new TimeSlotManager();
    mgr.addSlot(0, 30);
    expect(mgr.totalFree(0, 100)).toBe(70);
  });
});
