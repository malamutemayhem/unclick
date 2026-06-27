import { describe, it, expect, vi } from "vitest";
import { BehaviorSubject, ReplaySubject } from "../behavior-subject.js";

describe("BehaviorSubject", () => {
  it("emits initial value on subscribe", () => {
    const subject = new BehaviorSubject(42);
    const fn = vi.fn();
    subject.subscribe(fn);
    expect(fn).toHaveBeenCalledWith(42);
  });

  it("emits new values to subscribers", () => {
    const subject = new BehaviorSubject(0);
    const values: number[] = [];
    subject.subscribe((v) => values.push(v));
    subject.next(1);
    subject.next(2);
    expect(values).toEqual([0, 1, 2]);
  });

  it("unsubscribe stops delivery", () => {
    const subject = new BehaviorSubject("a");
    const values: string[] = [];
    const unsub = subject.subscribe((v) => values.push(v));
    subject.next("b");
    unsub();
    subject.next("c");
    expect(values).toEqual(["a", "b"]);
  });

  it("complete stops emissions", () => {
    const subject = new BehaviorSubject(1);
    subject.complete();
    expect(subject.isCompleted).toBe(true);
    const fn = vi.fn();
    subject.subscribe(fn);
    expect(fn).toHaveBeenCalledWith(1);
    subject.next(2);
    expect(subject.value).toBe(1);
  });

  it("map transforms values", () => {
    const subject = new BehaviorSubject(5);
    const doubled = subject.map((x) => x * 2);
    expect(doubled.value).toBe(10);
    subject.next(10);
    expect(doubled.value).toBe(20);
  });

  it("distinctUntilChanged filters duplicates", () => {
    const subject = new BehaviorSubject(1);
    const values: number[] = [];
    const distinct = subject.distinctUntilChanged();
    distinct.subscribe((v) => values.push(v));
    subject.next(1);
    subject.next(2);
    subject.next(2);
    subject.next(3);
    expect(values).toEqual([1, 2, 3]);
  });

  it("combine merges two subjects", () => {
    const a = new BehaviorSubject(1);
    const b = new BehaviorSubject("x");
    const combined = BehaviorSubject.combine(a, b);
    expect(combined.value).toEqual([1, "x"]);
    a.next(2);
    expect(combined.value).toEqual([2, "x"]);
  });
});

describe("ReplaySubject", () => {
  it("replays buffered values to new subscribers", () => {
    const subject = new ReplaySubject<number>(3);
    subject.next(1);
    subject.next(2);
    subject.next(3);
    const values: number[] = [];
    subject.subscribe((v) => values.push(v));
    expect(values).toEqual([1, 2, 3]);
  });

  it("respects buffer size limit", () => {
    const subject = new ReplaySubject<number>(2);
    subject.next(1);
    subject.next(2);
    subject.next(3);
    const values: number[] = [];
    subject.subscribe((v) => values.push(v));
    expect(values).toEqual([2, 3]);
    expect(subject.bufferLength).toBe(2);
  });
});
