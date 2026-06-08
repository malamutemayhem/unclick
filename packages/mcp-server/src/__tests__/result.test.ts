import { describe, it, expect } from "vitest";
import { ok, err, isOk, isErr, unwrap, unwrapOr, map, mapErr, flatMap, tryCatch, tryCatchAsync } from "../result.js";

describe("Result", () => {
  it("ok creates success result", () => {
    const r = ok(42);
    expect(r.ok).toBe(true);
    expect(isOk(r)).toBe(true);
    expect(isErr(r)).toBe(false);
  });

  it("err creates failure result", () => {
    const r = err("fail");
    expect(r.ok).toBe(false);
    expect(isErr(r)).toBe(true);
  });

  it("unwrap returns value on ok", () => {
    expect(unwrap(ok(42))).toBe(42);
  });

  it("unwrap throws on err", () => {
    expect(() => unwrap(err(new Error("boom")))).toThrow("boom");
  });

  it("unwrapOr returns fallback on err", () => {
    expect(unwrapOr(err("fail"), 0)).toBe(0);
    expect(unwrapOr(ok(42), 0)).toBe(42);
  });

  it("map transforms ok value", () => {
    const r = map(ok(2), (x: number) => x * 3);
    expect(unwrap(r)).toBe(6);
  });

  it("map passes through err", () => {
    const r = map(err("fail"), (x: number) => x * 3);
    expect(isErr(r)).toBe(true);
  });

  it("mapErr transforms error", () => {
    const r = mapErr(err("fail"), (e: string) => e.toUpperCase());
    if (!r.ok) expect(r.error).toBe("FAIL");
  });

  it("flatMap chains results", () => {
    const divide = (a: number, b: number) => b === 0 ? err("div by zero") : ok(a / b);
    const r = flatMap(ok(10), (x: number) => divide(x, 2));
    expect(unwrap(r)).toBe(5);
  });

  it("tryCatch catches errors", () => {
    const r = tryCatch(() => { throw new Error("oops"); });
    expect(isErr(r)).toBe(true);
  });

  it("tryCatch wraps success", () => {
    const r = tryCatch(() => 42);
    expect(unwrap(r)).toBe(42);
  });

  it("tryCatchAsync works with promises", async () => {
    const r = await tryCatchAsync(async () => 42);
    expect(unwrap(r)).toBe(42);
    const r2 = await tryCatchAsync(async () => { throw new Error("async oops"); });
    expect(isErr(r2)).toBe(true);
  });
});
