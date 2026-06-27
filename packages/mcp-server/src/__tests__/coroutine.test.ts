import { describe, it, expect } from "vitest";
import { Coroutine, Scheduler, range, take, zip, chain, collect } from "../coroutine.js";

describe("Coroutine", () => {
  it("creates and runs to completion", () => {
    const co = Coroutine.create(function* () {
      yield 1;
      yield 2;
      return 3;
    });
    const result = co.runToCompletion();
    expect(result).toBe(3);
    expect(co.isDone).toBe(true);
  });

  it("resumes step by step", () => {
    const co = Coroutine.create(function* () {
      yield "a";
      yield "b";
      return "done";
    });
    expect(co.state).toBe("ready");
    const r1 = co.resume();
    expect(r1.done).toBe(false);
    expect(r1.yielded).toBe("a");
    expect(co.state).toBe("suspended");
    const r2 = co.resume();
    expect(r2.done).toBe(false);
    expect(r2.yielded).toBe("b");
    const r3 = co.resume();
    expect(r3.done).toBe(true);
    expect(co.result).toBe("done");
  });

  it("passes values on resume", () => {
    const co = Coroutine.create(function* () {
      const a = yield "first";
      const b = yield "second";
      return `${a}-${b}`;
    });
    co.resume();
    co.resume("hello");
    co.resume("world");
    expect(co.result).toBe("hello-world");
  });

  it("catches errors", () => {
    const co = Coroutine.create(function* (): Generator<unknown, string, unknown> {
      throw new Error("boom");
    });
    expect(() => co.resume()).toThrow("boom");
    expect(co.state).toBe("done");
    expect(co.error?.message).toBe("boom");
  });

  it("cannot resume after completion", () => {
    const co = Coroutine.create(function* () { return 1; });
    co.runToCompletion();
    expect(() => co.resume()).toThrow("Cannot resume");
  });
});

describe("Scheduler", () => {
  it("runs coroutines with priority", () => {
    const sched = new Scheduler();
    const order: string[] = [];
    sched.add(Coroutine.create(function* () {
      order.push("low");
      yield;
      order.push("low");
    }) as Coroutine<unknown>, 0);
    sched.add(Coroutine.create(function* () {
      order.push("high");
      yield;
      order.push("high");
    }) as Coroutine<unknown>, 10);
    sched.run();
    expect(order[0]).toBe("high");
    expect(order[1]).toBe("high");
  });

  it("round robin scheduling", () => {
    const sched = new Scheduler();
    const order: string[] = [];
    sched.add(Coroutine.create(function* () {
      order.push("a1"); yield;
      order.push("a2"); yield;
    }) as Coroutine<unknown>);
    sched.add(Coroutine.create(function* () {
      order.push("b1"); yield;
      order.push("b2"); yield;
    }) as Coroutine<unknown>);
    sched.runRoundRobin();
    expect(order).toEqual(["a1", "b1", "a2", "b2"]);
  });

  it("tracks ticks", () => {
    const sched = new Scheduler();
    sched.add(Coroutine.create(function* () { yield; yield; }) as Coroutine<unknown>);
    sched.run();
    expect(sched.ticks).toBe(3);
  });

  it("respects maxTicks", () => {
    const sched = new Scheduler();
    sched.add(Coroutine.create(function* () { while (true) yield; }) as Coroutine<unknown>);
    const ran = sched.run(5);
    expect(ran).toBe(5);
  });
});

describe("Generator utilities", () => {
  it("range generates sequence", () => {
    expect(collect(range(0, 5))).toEqual([0, 1, 2, 3, 4]);
  });

  it("take limits output", () => {
    expect(collect(take(range(0, 100), 3))).toEqual([0, 1, 2]);
  });

  it("zip combines generators", () => {
    expect(collect(zip(range(1, 4), range(10, 13)))).toEqual([[1, 10], [2, 11], [3, 12]]);
  });

  it("chain concatenates generators", () => {
    expect(collect(chain(range(0, 2), range(10, 12)))).toEqual([0, 1, 10, 11]);
  });
});
