import { describe, it, expect } from "vitest";
import { Barrier, CountDownLatch } from "../barrier.js";

describe("Barrier", () => {
  it("wait releases all parties when threshold met", async () => {
    const b = new Barrier(3);
    const results: number[] = [];
    const p1 = b.wait().then(() => results.push(1));
    const p2 = b.wait().then(() => results.push(2));
    const p3 = b.wait().then(() => results.push(3));
    await Promise.all([p1, p2, p3]);
    expect(results.length).toBe(3);
  });

  it("arrived and remaining track progress", () => {
    const b = new Barrier(5);
    expect(b.arrived()).toBe(0);
    expect(b.remaining()).toBe(5);
  });

  it("getParties returns the count", () => {
    const b = new Barrier(4);
    expect(b.getParties()).toBe(4);
  });

  it("generation increments after each cycle", async () => {
    const b = new Barrier(2);
    expect(b.getGeneration()).toBe(0);
    const p1 = b.wait();
    const p2 = b.wait();
    await Promise.all([p1, p2]);
    expect(b.getGeneration()).toBe(1);
  });

  it("reset clears state", () => {
    const b = new Barrier(3);
    b.reset();
    expect(b.arrived()).toBe(0);
  });
});

describe("CountDownLatch", () => {
  it("await resolves when count reaches zero", async () => {
    const latch = new CountDownLatch(3);
    let resolved = false;
    const p = latch.await().then(() => { resolved = true; });
    latch.countDown();
    latch.countDown();
    expect(resolved).toBe(false);
    latch.countDown();
    await p;
    expect(resolved).toBe(true);
  });

  it("getCount tracks remaining", () => {
    const latch = new CountDownLatch(5);
    latch.countDown();
    latch.countDown();
    expect(latch.getCount()).toBe(3);
  });

  it("await resolves immediately if count is zero", async () => {
    const latch = new CountDownLatch(0);
    await latch.await();
    expect(latch.getCount()).toBe(0);
  });
});
