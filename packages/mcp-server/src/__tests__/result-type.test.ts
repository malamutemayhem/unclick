import { describe, it, expect } from "vitest";
import { ok, err, tryCatch, fromNullable, collect, Ok, Err } from "../result-type.js";

describe("Ok", () => {
  it("unwrap returns value", () => {
    expect(ok(42).unwrap()).toBe(42);
  });

  it("map transforms value", () => {
    expect(ok(5).map((x) => x * 2).unwrap()).toBe(10);
  });

  it("flatMap chains", () => {
    const result = ok(5).flatMap((x) => ok(x * 2));
    expect(result.unwrap()).toBe(10);
  });

  it("unwrapOr returns value", () => {
    expect(ok(5).unwrapOr(0)).toBe(5);
  });

  it("unwrapErr throws", () => {
    expect(() => ok(5).unwrapErr()).toThrow();
  });

  it("match calls ok handler", () => {
    const result = ok(5).match({ ok: (v) => v * 2, err: () => 0 });
    expect(result).toBe(10);
  });

  it("ok is true, err is false", () => {
    const r = ok(1);
    expect(r.ok).toBe(true);
    expect(r.err).toBe(false);
  });
});

describe("Err", () => {
  it("unwrap throws", () => {
    expect(() => err(new Error("fail")).unwrap()).toThrow("fail");
  });

  it("mapErr transforms error", () => {
    const r = err("bad").mapErr((e) => `Error: ${e}`);
    expect(r.unwrapErr()).toBe("Error: bad");
  });

  it("unwrapOr returns fallback", () => {
    expect(err("fail").unwrapOr(42)).toBe(42);
  });

  it("map is no-op on Err", () => {
    const r = err("fail").map(() => 42);
    expect(r.err).toBe(true);
  });

  it("match calls err handler", () => {
    const result = err("bad").match({ ok: () => "none", err: (e) => `got: ${e}` });
    expect(result).toBe("got: bad");
  });
});

describe("tryCatch", () => {
  it("catches to Ok", () => {
    const r = tryCatch(() => 42);
    expect(r.ok).toBe(true);
    expect(r.unwrap()).toBe(42);
  });

  it("catches to Err", () => {
    const r = tryCatch(() => { throw new Error("boom"); });
    expect(r.err).toBe(true);
  });
});

describe("fromNullable", () => {
  it("wraps value", () => {
    expect(fromNullable(42).unwrap()).toBe(42);
  });

  it("wraps null as err", () => {
    expect(fromNullable(null).err).toBe(true);
  });

  it("wraps undefined as err", () => {
    expect(fromNullable(undefined).err).toBe(true);
  });
});

describe("collect", () => {
  it("collects all Ok", () => {
    const r = collect([ok(1), ok(2), ok(3)]);
    expect(r.unwrap()).toEqual([1, 2, 3]);
  });

  it("returns first Err", () => {
    const r = collect([ok(1), err("fail"), ok(3)]);
    expect(r.err).toBe(true);
  });
});
