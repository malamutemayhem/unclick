import { describe, it, expect } from "vitest";
import { pipeline, tap, filter, mapStep, sortBy, groupBy, unique, take, skip } from "../data-pipeline.js";

describe("Pipeline", () => {
  it("chains steps", async () => {
    const p = pipeline((x: number) => x * 2).pipe((x) => x + 1);
    expect(await p.execute(5)).toBe(11);
  });

  it("handles async steps", async () => {
    const p = pipeline(async (x: number) => x * 2).pipe(async (x: number | Promise<number>) => (await x) + 1);
    expect(await p.execute(5)).toBe(11);
  });

  it("executeBatch processes array", async () => {
    const p = pipeline((x: number) => x * 2);
    const results = await p.executeBatch([1, 2, 3]);
    expect(results).toEqual([2, 4, 6]);
  });

  it("reports length", () => {
    const p = pipeline((x: number) => x).pipe((x) => x).pipe((x) => x);
    expect(p.length).toBe(3);
  });
});

describe("helpers", () => {
  it("tap passes through", () => {
    const log: number[] = [];
    const result = tap<number>((v) => log.push(v))(42);
    expect(result).toBe(42);
    expect(log).toEqual([42]);
  });

  it("filter removes items", () => {
    expect(filter<number>((x) => x > 2)([1, 2, 3, 4])).toEqual([3, 4]);
  });

  it("mapStep transforms", () => {
    expect(mapStep<number, string>((x) => String(x))([1, 2])).toEqual(["1", "2"]);
  });

  it("sortBy sorts ascending", () => {
    const items = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(sortBy<{ n: number }>("n")(items).map((i) => i.n)).toEqual([1, 2, 3]);
  });

  it("sortBy sorts descending", () => {
    const items = [{ n: 1 }, { n: 3 }, { n: 2 }];
    expect(sortBy<{ n: number }>("n", "desc")(items).map((i) => i.n)).toEqual([3, 2, 1]);
  });

  it("groupBy groups", () => {
    const items = [{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }];
    const result = groupBy<typeof items[0]>("type")(items);
    expect(result.a.length).toBe(2);
    expect(result.b.length).toBe(1);
  });

  it("unique deduplicates", () => {
    expect(unique<number>()([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  it("unique by key", () => {
    const items = [{ id: 1, n: "a" }, { id: 2, n: "b" }, { id: 1, n: "c" }];
    expect(unique<typeof items[0]>("id")(items).length).toBe(2);
  });

  it("take and skip", () => {
    expect(take<number>(2)([1, 2, 3, 4])).toEqual([1, 2]);
    expect(skip<number>(2)([1, 2, 3, 4])).toEqual([3, 4]);
  });
});
