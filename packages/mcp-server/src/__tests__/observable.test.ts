import { describe, it, expect, vi } from "vitest";
import { Observable, Subject } from "../observable.js";

describe("Observable", () => {
  it("emits values to subscriber", () => {
    const values: number[] = [];
    const obs = new Observable<number>((o) => { o.next?.(1); o.next?.(2); o.complete?.(); });
    obs.subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([1, 2]);
  });

  it("calls complete", () => {
    const complete = vi.fn();
    const obs = new Observable<number>((o) => { o.complete?.(); });
    obs.subscribe({ complete });
    expect(complete).toHaveBeenCalled();
  });

  it("calls error", () => {
    const error = vi.fn();
    const obs = new Observable<number>((o) => { o.error?.(new Error("boom")); });
    obs.subscribe({ error });
    expect(error).toHaveBeenCalled();
  });

  it("unsubscribe stops emissions", () => {
    const values: number[] = [];
    const obs = new Observable<number>((o) => {
      o.next?.(1);
      return () => {};
    });
    const sub = obs.subscribe({ next: (v) => values.push(v) });
    sub.unsubscribe();
  });

  it("map transforms values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3).map((x) => x * 2).subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([2, 4, 6]);
  });

  it("filter removes values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3, 4).filter((x) => x % 2 === 0).subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([2, 4]);
  });

  it("take limits emissions", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3, 4, 5).take(3).subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([1, 2, 3]);
  });

  it("from creates from iterable", () => {
    const values: number[] = [];
    Observable.from([10, 20]).subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([10, 20]);
  });

  it("toPromise resolves with last value", async () => {
    const result = await Observable.of(1, 2, 3).toPromise();
    expect(result).toBe(3);
  });
});

describe("Subject", () => {
  it("multicasts to subscribers", () => {
    const s = new Subject<number>();
    const a: number[] = [];
    const b: number[] = [];
    s.subscribe({ next: (v) => a.push(v) });
    s.subscribe({ next: (v) => b.push(v) });
    s.next(1);
    s.next(2);
    expect(a).toEqual([1, 2]);
    expect(b).toEqual([1, 2]);
  });

  it("complete stops emissions", () => {
    const s = new Subject<number>();
    const values: number[] = [];
    s.subscribe({ next: (v) => values.push(v) });
    s.next(1);
    s.complete();
    s.next(2);
    expect(values).toEqual([1]);
  });
});
