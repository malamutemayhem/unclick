import { describe, it, expect } from "vitest";
import { TimerWheel, Scheduler } from "../timer-wheel.js";

describe("TimerWheel", () => {
  it("fires callback after delay", () => {
    const wheel = new TimerWheel();
    let fired = false;
    wheel.schedule(3, () => { fired = true; });
    wheel.advanceAndRun(2);
    expect(fired).toBe(false);
    wheel.advanceAndRun(1);
    expect(fired).toBe(true);
  });

  it("fires multiple timers in order", () => {
    const wheel = new TimerWheel();
    const order: number[] = [];
    wheel.schedule(2, () => order.push(2));
    wheel.schedule(1, () => order.push(1));
    wheel.schedule(3, () => order.push(3));
    wheel.advanceAndRun(3);
    expect(order).toEqual([1, 2, 3]);
  });

  it("cancels timer", () => {
    const wheel = new TimerWheel();
    let fired = false;
    const id = wheel.schedule(2, () => { fired = true; });
    wheel.cancel(id);
    wheel.advanceAndRun(5);
    expect(fired).toBe(false);
  });

  it("tracks pending count", () => {
    const wheel = new TimerWheel();
    wheel.schedule(1, () => {});
    wheel.schedule(2, () => {});
    expect(wheel.pending()).toBe(2);
    wheel.advanceAndRun(1);
    expect(wheel.pending()).toBe(1);
  });

  it("interval timers repeat", () => {
    const wheel = new TimerWheel();
    let count = 0;
    wheel.scheduleInterval(2, () => { count++; });
    wheel.advanceAndRun(6);
    expect(count).toBe(3);
  });

  it("tracks current tick", () => {
    const wheel = new TimerWheel();
    expect(wheel.tick).toBe(0);
    wheel.advanceAndRun(5);
    expect(wheel.tick).toBe(5);
  });

  it("advance returns callbacks", () => {
    const wheel = new TimerWheel();
    wheel.schedule(1, () => {});
    wheel.schedule(1, () => {});
    const cbs = wheel.advance(1);
    expect(cbs).toHaveLength(2);
  });
});

describe("Scheduler", () => {
  it("fires after delay", () => {
    const sched = new Scheduler();
    let result = 0;
    sched.after(3, () => { result = 42; });
    sched.tick(2);
    expect(result).toBe(0);
    sched.tick(1);
    expect(result).toBe(42);
  });

  it("repeats with every", () => {
    const sched = new Scheduler();
    let count = 0;
    sched.every(2, () => { count++; });
    sched.tick(6);
    expect(count).toBe(3);
  });

  it("cancels scheduled timer", () => {
    const sched = new Scheduler();
    let fired = false;
    const id = sched.after(2, () => { fired = true; });
    sched.cancel(id);
    sched.tick(5);
    expect(fired).toBe(false);
  });

  it("tracks current time", () => {
    const sched = new Scheduler();
    sched.tick(10);
    expect(sched.currentTime).toBe(10);
  });

  it("tracks pending count", () => {
    const sched = new Scheduler();
    sched.after(1, () => {});
    sched.after(2, () => {});
    expect(sched.pending()).toBe(2);
  });
});
