import { describe, it, expect } from "vitest";
import { FixedTimestep, GameClock, TickScheduler, SimulationRunner } from "../game-loop.js";

describe("FixedTimestep", () => {
  it("runs correct number of steps", () => {
    const ts = new FixedTimestep(60);
    let count = 0;
    ts.advance(1 / 30, () => { count++; });
    expect(count).toBe(2);
  });

  it("accumulates partial frames", () => {
    const ts = new FixedTimestep(60);
    let count = 0;
    ts.advance(1 / 120, () => { count++; });
    expect(count).toBe(0);
    ts.advance(1 / 120, () => { count++; });
    expect(count).toBe(1);
  });

  it("tracks tick count", () => {
    const ts = new FixedTimestep(10);
    ts.advance(0.5, () => {});
    expect(ts.ticks).toBe(5);
  });

  it("alpha gives interpolation factor", () => {
    const ts = new FixedTimestep(10);
    ts.advance(0.15, () => {});
    expect(ts.alpha).toBeCloseTo(0.5, 1);
  });

  it("reset clears state", () => {
    const ts = new FixedTimestep(10);
    ts.advance(1, () => {});
    ts.reset();
    expect(ts.ticks).toBe(0);
    expect(ts.alpha).toBe(0);
  });
});

describe("GameClock", () => {
  it("computes delta time", () => {
    const clock = new GameClock(0);
    const dt = clock.tick(0.016);
    expect(dt).toBeCloseTo(0.016, 4);
  });

  it("pause returns zero dt", () => {
    const clock = new GameClock(0);
    clock.tick(1);
    clock.pause();
    const dt = clock.tick(2);
    expect(dt).toBe(0);
  });

  it("resume continues from pause", () => {
    const clock = new GameClock(0);
    clock.tick(1);
    clock.pause();
    clock.tick(5);
    clock.resume();
    const dt = clock.tick(6);
    expect(dt).toBeCloseTo(1, 4);
  });

  it("time scale multiplies dt", () => {
    const clock = new GameClock(0);
    clock.setScale(2);
    const dt = clock.tick(1);
    expect(dt).toBeCloseTo(2, 4);
  });

  it("tracks total elapsed", () => {
    const clock = new GameClock(0);
    clock.tick(1);
    clock.tick(2);
    expect(clock.totalElapsed).toBeCloseTo(2, 4);
  });

  it("isPaused reflects state", () => {
    const clock = new GameClock(0);
    expect(clock.isPaused).toBe(false);
    clock.pause();
    expect(clock.isPaused).toBe(true);
  });
});

describe("TickScheduler", () => {
  it("runs tasks at intervals", () => {
    const sched = new TickScheduler();
    let count = 0;
    sched.schedule("test", 0.5, () => { count++; });
    sched.update(0.3);
    expect(count).toBe(0);
    sched.update(0.3);
    expect(count).toBe(1);
  });

  it("unschedules tasks", () => {
    const sched = new TickScheduler();
    sched.schedule("a", 1, () => {});
    expect(sched.taskCount).toBe(1);
    sched.unschedule("a");
    expect(sched.taskCount).toBe(0);
  });

  it("returns names of executed tasks", () => {
    const sched = new TickScheduler();
    sched.schedule("alpha", 0.1, () => {});
    sched.schedule("beta", 10, () => {});
    const ran = sched.update(1);
    expect(ran).toContain("alpha");
    expect(ran).not.toContain("beta");
  });

  it("tracks current time", () => {
    const sched = new TickScheduler();
    sched.update(1.5);
    sched.update(0.5);
    expect(sched.time).toBeCloseTo(2, 4);
  });
});

describe("SimulationRunner", () => {
  it("runs given number of steps", () => {
    const runner = new SimulationRunner();
    let steps: number[] = [];
    const stats = runner.run(5, (step) => { steps.push(step); return 0.01; });
    expect(steps).toEqual([0, 1, 2, 3, 4]);
    expect(stats.ticks).toBe(5);
  });

  it("tracks min/max/avg tick time", () => {
    const runner = new SimulationRunner();
    const times = [0.01, 0.05, 0.02];
    let i = 0;
    const stats = runner.run(3, () => times[i++]);
    expect(stats.minTickTime).toBeCloseTo(0.01, 4);
    expect(stats.maxTickTime).toBeCloseTo(0.05, 4);
    expect(stats.avgTickTime).toBeCloseTo(0.0267, 2);
  });

  it("reset clears stats", () => {
    const runner = new SimulationRunner();
    runner.run(10, () => 0.01);
    runner.reset();
    const stats = runner.getStats();
    expect(stats.ticks).toBe(0);
  });
});
