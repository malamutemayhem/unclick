import { describe, it, expect } from "vitest";
import { Subject, BehaviorSubject, ReplaySubject } from "../observable.js";

describe("Subject", () => {
  it("notifies subscribers", () => {
    const s = new Subject<number>();
    const values: number[] = [];
    s.subscribe((v: number) => values.push(v));
    s.next(1);
    s.next(2);
    expect(values).toEqual([1, 2]);
  });

  it("unsubscribe stops notifications", () => {
    const s = new Subject<number>();
    const values: number[] = [];
    const unsub = s.subscribe((v: number) => values.push(v));
    s.next(1);
    unsub();
    s.next(2);
    expect(values).toEqual([1]);
  });

  it("tracks last value", () => {
    const s = new Subject<number>();
    expect(s.hasEmitted).toBe(false);
    s.next(42);
    expect(s.value).toBe(42);
    expect(s.hasEmitted).toBe(true);
  });

  it("tracks subscriber count", () => {
    const s = new Subject<number>();
    expect(s.subscriberCount).toBe(0);
    const unsub = s.subscribe(() => {});
    expect(s.subscriberCount).toBe(1);
    unsub();
    expect(s.subscriberCount).toBe(0);
  });
});

describe("BehaviorSubject", () => {
  it("emits current value on subscribe", () => {
    const bs = new BehaviorSubject<number>(10);
    const values: number[] = [];
    bs.subscribe((v: number) => values.push(v));
    expect(values).toEqual([10]);
  });

  it("emits new values after subscribe", () => {
    const bs = new BehaviorSubject<number>(0);
    const values: number[] = [];
    bs.subscribe((v: number) => values.push(v));
    bs.next(1);
    bs.next(2);
    expect(values).toEqual([0, 1, 2]);
  });

  it("value returns current", () => {
    const bs = new BehaviorSubject<string>("hello");
    bs.next("world");
    expect(bs.value).toBe("world");
  });
});

describe("ReplaySubject", () => {
  it("replays buffered values to new subscribers", () => {
    const rs = new ReplaySubject<number>(3);
    rs.next(1);
    rs.next(2);
    rs.next(3);
    rs.next(4);
    const values: number[] = [];
    rs.subscribe((v: number) => values.push(v));
    expect(values).toEqual([2, 3, 4]);
  });

  it("replays partial buffer", () => {
    const rs = new ReplaySubject<number>(5);
    rs.next(1);
    rs.next(2);
    const values: number[] = [];
    rs.subscribe((v: number) => values.push(v));
    expect(values).toEqual([1, 2]);
  });
});

describe("pipe and filter", () => {
  it("pipe transforms values", () => {
    const s = new Subject<number>();
    const doubled = s.pipe((v: number) => v * 2);
    const values: number[] = [];
    doubled.subscribe((v: number) => values.push(v));
    s.next(1);
    s.next(2);
    expect(values).toEqual([2, 4]);
  });

  it("filter keeps matching values", () => {
    const s = new Subject<number>();
    const evens = s.filter((v: number) => v % 2 === 0);
    const values: number[] = [];
    evens.subscribe((v: number) => values.push(v));
    s.next(1);
    s.next(2);
    s.next(3);
    s.next(4);
    expect(values).toEqual([2, 4]);
  });
});
