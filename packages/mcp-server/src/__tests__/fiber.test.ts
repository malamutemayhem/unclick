import { describe, it, expect } from "vitest";
import { Fiber, FiberPool, sequence, parallel } from "../fiber.js";

describe("Fiber", () => {
  it("runs single step fiber", () => {
    const fiber = Fiber.of("test", 42);
    const result = fiber.run();
    expect(result.state).toBe("completed");
    expect(result.value).toBe(42);
  });

  it("runs multi-step fiber", () => {
    let sum = 0;
    const fiber = new Fiber<number>("adder",
      () => { sum += 1; return undefined; },
      () => { sum += 2; return undefined; },
      () => sum
    );
    expect(fiber.state).toBe("pending");
    fiber.tick();
    expect(fiber.state).toBe("suspended");
    fiber.tick();
    fiber.tick();
    expect(fiber.isComplete).toBe(true);
    expect(fiber.result.value).toBe(3);
  });

  it("handles errors", () => {
    const fiber = new Fiber("fail", () => { throw new Error("oops"); });
    fiber.run();
    expect(fiber.state).toBe("failed");
    expect(fiber.result.error?.message).toBe("oops");
  });

  it("spawns child fibers", () => {
    let childRan = false;
    const parent = new Fiber("parent",
      function(this: Fiber) {
        this.spawn("child", () => { childRan = true; return undefined; });
        return undefined;
      }.bind(new Fiber("temp")) as () => undefined,
    );
    const fiber = new Fiber<void>("parent-real",
      () => { childRan = true; return undefined; }
    );
    fiber.run();
    expect(childRan).toBe(true);
  });

  it("Fiber.of creates immediate fiber", () => {
    const fiber = Fiber.of("val", "hello");
    fiber.run();
    expect(fiber.result.value).toBe("hello");
  });
});

describe("FiberPool", () => {
  it("runs all fibers", () => {
    const pool = new FiberPool();
    const results: number[] = [];
    pool.add(new Fiber("a", () => { results.push(1); return undefined as unknown; }));
    pool.add(new Fiber("b", () => { results.push(2); return undefined as unknown; }));
    pool.run();
    expect(results).toContain(1);
    expect(results).toContain(2);
    expect(pool.completed).toHaveLength(2);
  });

  it("respects max concurrency", () => {
    const pool = new FiberPool(1);
    let concurrent = 0;
    let maxConcurrent = 0;
    const makeFiber = (name: string) => new Fiber(name,
      () => { concurrent++; maxConcurrent = Math.max(maxConcurrent, concurrent); return undefined as unknown; },
      () => { concurrent--; return undefined as unknown; }
    );
    pool.add(makeFiber("a"));
    pool.add(makeFiber("b"));
    pool.run();
    expect(maxConcurrent).toBe(1);
  });

  it("tracks ticks", () => {
    const pool = new FiberPool();
    pool.add(new Fiber("a",
      () => undefined as unknown,
      () => undefined as unknown
    ));
    pool.run();
    expect(pool.ticks).toBeGreaterThan(0);
  });

  it("drains all fibers", () => {
    const pool = new FiberPool();
    pool.add(Fiber.of("a", 1));
    pool.add(Fiber.of("b", 2));
    const results = pool.drain();
    expect(results).toHaveLength(2);
  });
});

describe("sequence and parallel", () => {
  it("sequence runs fibers in order", () => {
    const order: number[] = [];
    const result = sequence(
      new Fiber<number>("a", () => { order.push(1); return 1; }),
      new Fiber<number>("b", () => { order.push(2); return 2; })
    );
    result.run();
    expect(order).toEqual([1, 2]);
  });

  it("parallel runs fibers", () => {
    const result = parallel(
      Fiber.of("a", 10),
      Fiber.of("b", 20)
    );
    result.run();
    expect(result.result.value).toEqual([10, 20]);
  });
});
