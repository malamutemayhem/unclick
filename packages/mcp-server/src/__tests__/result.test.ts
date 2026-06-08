import { describe, it, expect } from "vitest";
import { ok, err, isOk, isErr, unwrap, unwrapOr, map, mapErr, flatMap, tryCatch, tryCatchAsync } from "../result.js";

describe("result", () => {
  it("ok creates success", () => {
    const r = ok(42);
    expect(r.ok).toBe(true);
    expect(isOk(r)).toBe(true);
    expect(isErr(r)).toBe(false);
  });

  it("err creates failure", () => {
    const r = err("bad");
    expect(r.ok).toBe(false);
    expect(isErr(r)).toBe(true);
  });

  it("unwrap returns value on ok", () => {
    expect(unwrap(ok(42))).toBe(42);
  });

  it("unwrap throws on err", () => {
    expect(() => unwrap(err(new Error("fail")))).toThrow("fail");
  });

  it("unwrapOr returns value on ok", () => {
    expect(unwrapOr(ok(42), 0)).toBe(42);
  });

  it("unwrapOr returns fallback on err", () => {
    expect(unwrapOr(err("bad"), 0)).toBe(0);
  });

  it("map transforms ok value", () => {
    const r = map(ok(5), (v: number) => v * 2);
    expect(unwrap(r)).toBe(10);
  });

  it("map passes through err", () => {
    const r = map(err("bad"), (v: number) => v * 2);
    expect(isErr(r)).toBe(true);
  });

  it("mapErr transforms error", () => {
    const r = mapErr(err("bad"), (e: string) => e.toUpperCase());
    expect(isErr(r) && r.ok === false && r.error).toBe("BAD");
  });

  it("flatMap chains ok results", () => {
    const r = flatMap(ok(5), (v: number) => ok(v + 1));
    expect(unwrap(r)).toBe(6);
  });

  it("flatMap short-circuits on err", () => {
    const r = flatMap(err("bad"), (v: number) => ok(v + 1));
    expect(isErr(r)).toBe(true);
  });

  it("tryCatch catches sync errors", () => {
    const r = tryCatch(() => { throw new Error("oops"); });
    expect(isErr(r)).toBe(true);
  });

  it("tryCatch returns ok for success", () => {
    const r = tryCatch(() => 42);
    expect(unwrap(r)).toBe(42);
  });

  it("tryCatchAsync catches async errors", async () => {
    const r = await tryCatchAsync(async () => { throw new Error("oops"); });
    expect(isErr(r)).toBe(true);
  });

  it("tryCatchAsync returns ok for success", async () => {
    const r = await tryCatchAsync(async () => 42);
    expect(unwrap(r)).toBe(42);
  });
});
