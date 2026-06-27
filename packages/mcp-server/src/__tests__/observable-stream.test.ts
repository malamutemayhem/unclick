import { describe, it, expect } from "vitest";
import { Observable } from "../observable-stream.js";

describe("Observable", () => {
  it("subscribes and receives values", () => {
    const values: number[] = [];
    const obs = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete?.();
    });
    obs.subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([1, 2, 3]);
  });

  it("map transforms values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3)
      .map((x) => x * 2)
      .subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([2, 4, 6]);
  });

  it("filter keeps matching values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3, 4, 5)
      .filter((x) => x % 2 === 0)
      .subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([2, 4]);
  });

  it("take limits emission count", () => {
    const values: number[] = [];
    let completed = false;
    Observable.of(1, 2, 3, 4, 5)
      .take(3)
      .subscribe({
        next: (v) => values.push(v),
        complete: () => { completed = true; },
      });
    expect(values).toEqual([1, 2, 3]);
    expect(completed).toBe(true);
  });

  it("scan accumulates values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3)
      .scan((acc, v) => acc + v, 0)
      .subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([1, 3, 6]);
  });

  it("toArray collects all values", async () => {
    const arr = await Observable.of(10, 20, 30).toArray();
    expect(arr).toEqual([10, 20, 30]);
  });

  it("from creates from iterable", () => {
    const values: string[] = [];
    Observable.from(["a", "b", "c"]).subscribe({
      next: (v) => values.push(v),
    });
    expect(values).toEqual(["a", "b", "c"]);
  });

  it("unsubscribe stops delivery", () => {
    const values: number[] = [];
    let emitFn: ((v: number) => void) | null = null;
    const obs = new Observable<number>((observer) => {
      emitFn = (v: number) => observer.next(v);
    });
    const sub = obs.subscribe((v) => values.push(v));
    emitFn!(1);
    sub.unsubscribe();
    emitFn!(2);
    expect(values).toEqual([1]);
    expect(sub.closed).toBe(true);
  });

  it("merge combines observables", () => {
    const values: number[] = [];
    const merged = Observable.merge(
      Observable.of(1, 2),
      Observable.of(3, 4)
    );
    merged.subscribe({ next: (v) => values.push(v) });
    expect(values.sort()).toEqual([1, 2, 3, 4]);
  });
});
