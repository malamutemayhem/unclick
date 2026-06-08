import { describe, it, expect } from "vitest";
import { ok, err, Ok, Err, tryCatch, tryCatchAsync } from "../result.js";

describe("Result", () => {
  it("ok wraps a value", () => {
    const r = ok(42);
    expect(r.isOk()).toBe(true);
    expect(r.isErr()).toBe(false);
    expect(r.unwrap()).toBe(42);
  });

  it("err wraps an error", () => {
    const r = err("bad");
    expect(r.isOk()).toBe(false);
    expect(r.isErr()).toBe(true);
    expect(r.unwrapErr()).toBe("bad");
  });

  it("unwrap on err throws", () => {
    expect(() => err(new Error("oops")).unwrap()).toThrow("oops");
  });

  it("unwrapErr on ok throws", () => {
    expect(() => ok(1).unwrapErr()).toThrow("Called unwrapErr on Ok");
  });

  it("unwrapOr returns value on ok", () => {
    expect(ok(5).unwrapOr(10)).toBe(5);
  });

  it("unwrapOr returns fallback on err", () => {
    expect(err("fail").unwrapOr(10)).toBe(10);
  });

  it("map transforms ok value", () => {
    const r = ok(2).map((x) => x * 3);
    expect(r.unwrap()).toBe(6);
  });

  it("map is no-op on err", () => {
    const r = err("bad").map(() => 99);
    expect(r.isErr()).toBe(true);
  });

  it("mapErr transforms err value", () => {
    const r = err("bad").mapErr((e) => e.toUpperCase());
    expect(r.unwrapErr()).toBe("BAD");
  });

  it("mapErr is no-op on ok", () => {
    const r = ok(1).mapErr(() => "never");
    expect(r.unwrap()).toBe(1);
  });

  it("andThen chains ok results", () => {
    const r = ok(5).andThen((x) => x > 3 ? ok(x * 2) : err("too small"));
    expect(r.unwrap()).toBe(10);
  });

  it("andThen short-circuits on err", () => {
    const r = err("stop").andThen(() => ok(99));
    expect(r.isErr()).toBe(true);
  });

  it("ok flag is true/false", () => {
    expect(ok(1).ok).toBe(true);
    expect(err("x").ok).toBe(false);
  });
});

describe("tryCatch", () => {
  it("catches sync success", () => {
    const r = tryCatch(() => 42);
    expect(r.isOk()).toBe(true);
    expect(r.unwrap()).toBe(42);
  });

  it("catches sync error", () => {
    const r = tryCatch(() => { throw new Error("fail"); });
    expect(r.isErr()).toBe(true);
    expect((r as Err<Error>).error.message).toBe("fail");
  });
});

describe("tryCatchAsync", () => {
  it("catches async success", async () => {
    const r = await tryCatchAsync(async () => "ok");
    expect(r.isOk()).toBe(true);
  });

  it("catches async error", async () => {
    const r = await tryCatchAsync(async () => { throw new Error("async fail"); });
    expect(r.isErr()).toBe(true);
  });
});
