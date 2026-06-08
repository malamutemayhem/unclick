import { describe, it, expect, vi } from "vitest";
import { Observable, of, fromArray, merge } from "../observable.js";

describe("Observable", () => {
  it("emits values to subscriber", () => {
    const values: number[] = [];
    const obs = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.complete?.();
    });
    obs.subscribe({ next: (v) => values.push(v) });
    expect(values).toEqual([1, 2]);
  });

  it("supports function subscriber", () => {
    const values: number[] = [];
    of(1, 2, 3).subscribe((v) => values.push(v));
    expect(values).toEqual([1, 2, 3]);
  });

  it("unsubscribe stops notifications", () => {
    const fn = vi.fn();
    const obs = new Observable<number>((observer) => {
      observer.next(1);
      setTimeout(() => observer.next(2), 10);
    });
    const sub = obs.subscribe(fn);
    sub.unsubscribe();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("map transforms values", () => {
    const values: number[] = [];
    of(1, 2, 3).map((x) => x * 2).subscribe((v) => values.push(v));
    expect(values).toEqual([2, 4, 6]);
  });

  it("filter removes values", () => {
    const values: number[] = [];
    of(1, 2, 3, 4).filter((x) => x % 2 === 0).subscribe((v) => values.push(v));
    expect(values).toEqual([2, 4]);
  });

  it("take limits count", () => {
    const values: number[] = [];
    of(1, 2, 3, 4, 5).take(3).subscribe((v) => values.push(v));
    expect(values).toEqual([1, 2, 3]);
  });

  it("scan accumulates", () => {
    const values: number[] = [];
    of(1, 2, 3).scan((acc, v) => acc + v, 0).subscribe((v) => values.push(v));
    expect(values).toEqual([1, 3, 6]);
  });

  it("toPromise resolves with last value", async () => {
    const result = await of(1, 2, 3).toPromise();
    expect(result).toBe(3);
  });
});

describe("fromArray", () => {
  it("emits array elements", () => {
    const values: string[] = [];
    fromArray(["a", "b"]).subscribe((v) => values.push(v));
    expect(values).toEqual(["a", "b"]);
  });
});

describe("merge", () => {
  it("combines observables", () => {
    const values: number[] = [];
    merge(of(1, 2), of(3, 4)).subscribe((v) => values.push(v));
    expect(values.sort()).toEqual([1, 2, 3, 4]);
  });
});
