import { describe, it, expect } from "vitest";
import {
  Subject, map, filter, scan, merge, take, collect,
} from "../reactive-stream.js";

describe("Subject", () => {
  it("emits values to subscribers", () => {
    const s = new Subject<number>();
    const values: number[] = [];
    s.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    s.next(2);
    expect(values).toEqual([1, 2]);
  });

  it("supports unsubscribe", () => {
    const s = new Subject<number>();
    const values: number[] = [];
    const unsub = s.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    unsub();
    s.next(2);
    expect(values).toEqual([1]);
  });

  it("calls complete", () => {
    const s = new Subject<number>();
    let completed = false;
    s.subscribe({ next: () => {}, complete: () => { completed = true; } });
    s.complete();
    expect(completed).toBe(true);
    expect(s.isComplete).toBe(true);
  });

  it("calls error handler", () => {
    const s = new Subject<number>();
    let msg = "";
    s.subscribe({ next: () => {}, error: (e) => { msg = e.message; } });
    s.error(new Error("test"));
    expect(msg).toBe("test");
  });

  it("stops emitting after complete", () => {
    const s = new Subject<number>();
    const values: number[] = [];
    s.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    s.complete();
    s.next(2);
    expect(values).toEqual([1]);
  });

  it("tracks subscriber count", () => {
    const s = new Subject<number>();
    expect(s.subscriberCount).toBe(0);
    const unsub = s.subscribe({ next: () => {} });
    expect(s.subscriberCount).toBe(1);
    unsub();
    expect(s.subscriberCount).toBe(0);
  });
});

describe("map", () => {
  it("transforms values", () => {
    const s = new Subject<number>();
    const mapped = map(s, (v) => v * 2);
    const values: number[] = [];
    mapped.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    s.next(2);
    expect(values).toEqual([2, 4]);
  });
});

describe("filter", () => {
  it("filters values", () => {
    const s = new Subject<number>();
    const filtered = filter(s, (v) => v > 2);
    const values: number[] = [];
    filtered.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    s.next(3);
    s.next(2);
    s.next(4);
    expect(values).toEqual([3, 4]);
  });
});

describe("scan", () => {
  it("accumulates values", () => {
    const s = new Subject<number>();
    const summed = scan(s, (acc, v) => acc + v, 0);
    const values: number[] = [];
    summed.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    s.next(2);
    s.next(3);
    expect(values).toEqual([1, 3, 6]);
  });
});

describe("merge", () => {
  it("merges multiple subjects", () => {
    const a = new Subject<number>();
    const b = new Subject<number>();
    const merged = merge(a, b);
    const values: number[] = [];
    merged.subscribe({ next: (v) => values.push(v) });
    a.next(1);
    b.next(2);
    a.next(3);
    expect(values).toEqual([1, 2, 3]);
  });

  it("completes when all sources complete", () => {
    const a = new Subject<number>();
    const b = new Subject<number>();
    const merged = merge(a, b);
    let completed = false;
    merged.subscribe({ next: () => {}, complete: () => { completed = true; } });
    a.complete();
    expect(completed).toBe(false);
    b.complete();
    expect(completed).toBe(true);
  });
});

describe("take", () => {
  it("takes only n values", () => {
    const s = new Subject<number>();
    const taken = take(s, 2);
    const values: number[] = [];
    taken.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    s.next(2);
    s.next(3);
    expect(values).toEqual([1, 2]);
  });
});

describe("collect", () => {
  it("collects all values into array", async () => {
    const s = new Subject<number>();
    const promise = collect(s);
    s.next(1);
    s.next(2);
    s.next(3);
    s.complete();
    const result = await promise;
    expect(result).toEqual([1, 2, 3]);
  });
});
