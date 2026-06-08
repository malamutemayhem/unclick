import { describe, it, expect, vi } from "vitest";
import { Observable, Subject } from "../observable.js";

describe("Observable", () => {
  it("emits values to subscriber", () => {
    const values: number[] = [];
    const obs = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
    });
    obs.subscribe((v: number) => values.push(v));
    expect(values).toEqual([1, 2, 3]);
  });

  it("supports unsubscribe", () => {
    const values: number[] = [];
    const obs = new Observable<number>((observer) => {
      observer.next(1);
      return () => {};
    });
    const sub = obs.subscribe((v: number) => values.push(v));
    sub.unsubscribe();
    expect(values).toEqual([1]);
  });

  it("map transforms values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3)
      .map((n: number) => n * 2)
      .subscribe((v: number) => values.push(v));
    expect(values).toEqual([2, 4, 6]);
  });

  it("filter removes values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3, 4, 5)
      .filter((n: number) => n % 2 === 0)
      .subscribe((v: number) => values.push(v));
    expect(values).toEqual([2, 4]);
  });

  it("take limits values", () => {
    const values: number[] = [];
    Observable.of(1, 2, 3, 4, 5)
      .take(3)
      .subscribe((v: number) => values.push(v));
    expect(values).toEqual([1, 2, 3]);
  });

  it("of creates from values", () => {
    const values: string[] = [];
    Observable.of("a", "b").subscribe((v: string) => values.push(v));
    expect(values).toEqual(["a", "b"]);
  });

  it("from creates from iterable", () => {
    const values: number[] = [];
    Observable.from([10, 20, 30]).subscribe((v: number) => values.push(v));
    expect(values).toEqual([10, 20, 30]);
  });

  it("calls complete", () => {
    const complete = vi.fn();
    Observable.of(1).subscribe({ next: () => {}, complete });
    expect(complete).toHaveBeenCalled();
  });
});

describe("Subject", () => {
  it("multicast to multiple observers", () => {
    const subject = new Subject<number>();
    const a: number[] = [];
    const b: number[] = [];
    subject.subscribe((v: number) => a.push(v));
    subject.subscribe((v: number) => b.push(v));
    subject.next(1);
    subject.next(2);
    expect(a).toEqual([1, 2]);
    expect(b).toEqual([1, 2]);
  });

  it("unsubscribe removes observer", () => {
    const subject = new Subject<number>();
    const values: number[] = [];
    const sub = subject.subscribe((v: number) => values.push(v));
    subject.next(1);
    sub.unsubscribe();
    subject.next(2);
    expect(values).toEqual([1]);
  });

  it("calls error on observers", () => {
    const subject = new Subject<number>();
    const errors: any[] = [];
    subject.subscribe({ next: () => {}, error: (e: any) => errors.push(e) });
    subject.error("boom");
    expect(errors).toEqual(["boom"]);
  });
});
