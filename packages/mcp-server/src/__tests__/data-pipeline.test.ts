import { describe, it, expect } from "vitest";
import { DataPipeline, createPipeline, mapTransform, filterTransform, groupByTransform, sortTransform } from "../data-pipeline.js";

describe("DataPipeline", () => {
  it("runs a single step", () => {
    const p = createPipeline<number>().pipe("double", (n) => n * 2);
    expect(p.run(5)).toBe(10);
  });

  it("chains multiple steps", () => {
    const p = createPipeline<number>()
      .pipe("add1", (n) => n + 1)
      .pipe("double", (n) => n * 2)
      .pipe("toString", (n) => `val:${n}`);
    expect(p.run(3)).toBe("val:8");
  });

  it("runs batch", () => {
    const p = createPipeline<number>().pipe("square", (n) => n * n);
    expect(p.runBatch([2, 3, 4])).toEqual([4, 9, 16]);
  });

  it("tracks step count", () => {
    const p = createPipeline<number>().pipe("a", (n) => n).pipe("b", (n) => n);
    expect(p.stepCount).toBe(2);
  });

  it("returns step names", () => {
    const p = createPipeline<number>().pipe("first", (n) => n).pipe("second", (n) => n);
    expect(p.stepNames()).toEqual(["first", "second"]);
  });

  it("empty pipeline returns input", () => {
    const p = createPipeline<string>();
    expect(p.run("hello")).toBe("hello");
  });
});

describe("mapTransform", () => {
  it("maps array items", () => {
    const t = mapTransform<number, string>((n) => `#${n}`);
    expect(t([1, 2, 3])).toEqual(["#1", "#2", "#3"]);
  });
});

describe("filterTransform", () => {
  it("filters array items", () => {
    const t = filterTransform<number>((n) => n > 2);
    expect(t([1, 2, 3, 4])).toEqual([3, 4]);
  });
});

describe("groupByTransform", () => {
  it("groups by key", () => {
    const t = groupByTransform<{ type: string; name: string }>((i) => i.type);
    const result = t([
      { type: "a", name: "x" },
      { type: "b", name: "y" },
      { type: "a", name: "z" },
    ]);
    expect(result.a.length).toBe(2);
    expect(result.b.length).toBe(1);
  });
});

describe("sortTransform", () => {
  it("sorts array", () => {
    const t = sortTransform<number>((a, b) => a - b);
    expect(t([3, 1, 2])).toEqual([1, 2, 3]);
  });

  it("does not mutate original", () => {
    const t = sortTransform<number>((a, b) => b - a);
    const orig = [1, 2, 3];
    t(orig);
    expect(orig).toEqual([1, 2, 3]);
  });
});

describe("pipeline with transforms", () => {
  it("composes transforms in a pipeline", () => {
    const p = createPipeline<number[]>()
      .pipe("filter", filterTransform((n: number) => n > 1))
      .pipe("map", mapTransform((n: number) => n * 10))
      .pipe("sort", sortTransform((a: number, b: number) => b - a));
    expect(p.run([3, 1, 2, 4])).toEqual([40, 30, 20]);
  });
});
