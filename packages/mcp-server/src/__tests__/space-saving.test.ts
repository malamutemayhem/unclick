import { describe, it, expect } from "vitest";
import { SpaceSaving } from "../space-saving.js";

describe("SpaceSaving", () => {
  it("tracks frequent items", () => {
    const ss = new SpaceSaving<string>(3);
    for (let i = 0; i < 100; i++) ss.add("major");
    for (let i = 0; i < 10; i++) ss.add("minor");
    expect(ss.estimate("major")).toBeGreaterThanOrEqual(100);
  });

  it("topK returns highest counts", () => {
    const ss = new SpaceSaving<string>(5);
    for (let i = 0; i < 50; i++) ss.add("a");
    for (let i = 0; i < 30; i++) ss.add("b");
    for (let i = 0; i < 10; i++) ss.add("c");
    const top = ss.topK(2);
    expect(top.length).toBe(2);
    expect(top[0].item).toBe("a");
  });

  it("guaranteed gives lower bound", () => {
    const ss = new SpaceSaving<string>(5);
    for (let i = 0; i < 100; i++) ss.add("definite");
    expect(ss.guaranteed("definite")).toBeGreaterThan(0);
  });

  it("total tracks all additions", () => {
    const ss = new SpaceSaving<string>(3);
    ss.add("a");
    ss.add("b");
    ss.add("c", 5);
    expect(ss.total()).toBe(7);
  });

  it("size respects capacity", () => {
    const ss = new SpaceSaving<string>(3);
    for (let i = 0; i < 20; i++) ss.add(`item-${i}`);
    expect(ss.size()).toBeLessThanOrEqual(3);
  });

  it("contains checks presence", () => {
    const ss = new SpaceSaving<string>(5);
    ss.add("present");
    expect(ss.contains("present")).toBe(true);
    expect(ss.contains("absent")).toBe(false);
  });

  it("replaces minimum on overflow", () => {
    const ss = new SpaceSaving<number>(2);
    ss.add(1, 10);
    ss.add(2, 5);
    ss.add(3, 1);
    expect(ss.size()).toBe(2);
    expect(ss.contains(3)).toBe(true);
  });

  it("estimate of missing item is 0", () => {
    const ss = new SpaceSaving<string>(3);
    expect(ss.estimate("nothing")).toBe(0);
  });
});
