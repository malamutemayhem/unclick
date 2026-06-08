import { describe, it, expect } from "vitest";
import { Observable, BehaviorSubject } from "../observable.js";

describe("Observable", () => {
  it("notifies subscribers", () => {
    const obs = new Observable<number>();
    const values: number[] = [];
    obs.subscribe((v) => values.push(v));
    obs.next(1);
    obs.next(2);
    expect(values).toEqual([1, 2]);
  });

  it("unsubscribe stops notifications", () => {
    const obs = new Observable<number>();
    const values: number[] = [];
    const unsub = obs.subscribe((v) => values.push(v));
    obs.next(1);
    unsub();
    obs.next(2);
    expect(values).toEqual([1]);
  });

  it("subscriberCount tracks observers", () => {
    const obs = new Observable<number>();
    expect(obs.subscriberCount).toBe(0);
    const unsub = obs.subscribe(() => {});
    expect(obs.subscriberCount).toBe(1);
    unsub();
    expect(obs.subscriberCount).toBe(0);
  });

  it("pipe transforms values", () => {
    const obs = new Observable<number>();
    const doubled = obs.pipe((x) => x * 2);
    const values: number[] = [];
    doubled.subscribe((v) => values.push(v));
    obs.next(3);
    obs.next(5);
    expect(values).toEqual([6, 10]);
  });

  it("filter passes matching values", () => {
    const obs = new Observable<number>();
    const evens = obs.filter((x) => x % 2 === 0);
    const values: number[] = [];
    evens.subscribe((v) => values.push(v));
    obs.next(1);
    obs.next(2);
    obs.next(3);
    obs.next(4);
    expect(values).toEqual([2, 4]);
  });

  it("take limits emissions", () => {
    const obs = new Observable<number>();
    const first2 = obs.take(2);
    const values: number[] = [];
    first2.subscribe((v) => values.push(v));
    obs.next(1);
    obs.next(2);
    obs.next(3);
    expect(values).toEqual([1, 2]);
  });

  it("merge combines observables", () => {
    const a = new Observable<number>();
    const b = new Observable<number>();
    const merged = Observable.merge(a, b);
    const values: number[] = [];
    merged.subscribe((v) => values.push(v));
    a.next(1);
    b.next(2);
    a.next(3);
    expect(values).toEqual([1, 2, 3]);
  });
});

describe("BehaviorSubject", () => {
  it("emits current value on subscribe", () => {
    const bs = new BehaviorSubject(42);
    const values: number[] = [];
    bs.subscribe((v) => values.push(v));
    expect(values).toEqual([42]);
  });

  it("emits new values", () => {
    const bs = new BehaviorSubject(0);
    const values: number[] = [];
    bs.subscribe((v) => values.push(v));
    bs.next(1);
    bs.next(2);
    expect(values).toEqual([0, 1, 2]);
  });

  it("value getter returns current", () => {
    const bs = new BehaviorSubject("hello");
    bs.next("world");
    expect(bs.value).toBe("world");
  });
});
