import { describe, it, expect } from "vitest";
import { CountMinSketch } from "../count-min-sketch.js";

describe("CountMinSketch", () => {
  it("estimates counts accurately for frequent items", () => {
    const cms = new CountMinSketch(256, 4);
    for (let i = 0; i < 100; i++) cms.add("apple");
    for (let i = 0; i < 50; i++) cms.add("banana");
    expect(cms.estimate("apple")).toBeGreaterThanOrEqual(100);
    expect(cms.estimate("banana")).toBeGreaterThanOrEqual(50);
  });

  it("never underestimates", () => {
    const cms = new CountMinSketch(128, 3);
    cms.add("x", 10);
    expect(cms.estimate("x")).toBeGreaterThanOrEqual(10);
  });

  it("unseen items have low estimate", () => {
    const cms = new CountMinSketch(1024, 4);
    cms.add("a", 5);
    expect(cms.estimate("never_added")).toBeLessThan(10);
  });

  it("merge combines sketches", () => {
    const a = new CountMinSketch(64, 2);
    const b = new CountMinSketch(64, 2);
    a.add("x", 10);
    b.add("x", 20);
    const merged = a.merge(b);
    expect(merged.estimate("x")).toBeGreaterThanOrEqual(30);
  });

  it("merge throws on dimension mismatch", () => {
    const a = new CountMinSketch(64, 2);
    const b = new CountMinSketch(128, 2);
    expect(() => a.merge(b)).toThrow("Dimensions");
  });

  it("reset clears all", () => {
    const cms = new CountMinSketch(64, 2);
    cms.add("x", 100);
    cms.reset();
    expect(cms.estimate("x")).toBe(0);
  });
});
