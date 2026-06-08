import { describe, it, expect } from "vitest";
import { ok, err, isOk, isErr, unwrap, unwrapOr, map, mapErr, flatMap, tryCatch, collect } from "../result-type.js";

describe("ok / err", () => {
  it("ok creates success", () => {
    const r = ok(42);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(42);
  });
  it("err creates failure", () => {
    const r = err("bad");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("bad");
  });
});

describe("isOk / isErr", () => {
  it("type guards work", () => {
    expect(isOk(ok(1))).toBe(true);
    expect(isErr(err("x"))).toBe(true);
    expect(isOk(err("x"))).toBe(false);
  });
});

describe("unwrap", () => {
  it("returns value on ok", () => {
    expect(unwrap(ok(42))).toBe(42);
  });
  it("throws on err", () => {
    expect(() => unwrap(err(new Error("fail")))).toThrow("fail");
  });
});

describe("unwrapOr", () => {
  it("returns value on ok", () => {
    expect(unwrapOr(ok(1), 0)).toBe(1);
  });
  it("returns fallback on err", () => {
    expect(unwrapOr(err("x"), 99)).toBe(99);
  });
});

describe("map / mapErr", () => {
  it("map transforms ok value", () => {
    const r = map(ok(2), (v) => v * 3);
    expect(unwrap(r)).toBe(6);
  });
  it("map passes through err", () => {
    const r = map(err("x"), (v: number) => v * 3);
    expect(isErr(r)).toBe(true);
  });
  it("mapErr transforms error", () => {
    const r = mapErr(err("low"), (e) => e.toUpperCase());
    if (!r.ok) expect(r.error).toBe("LOW");
  });
});

describe("flatMap", () => {
  it("chains results", () => {
    const r = flatMap(ok(5), (v) => v > 0 ? ok(v * 2) : err("negative"));
    expect(unwrap(r)).toBe(10);
  });
  it("short-circuits on err", () => {
    const r = flatMap(err("x"), () => ok(1));
    expect(isErr(r)).toBe(true);
  });
});

describe("tryCatch", () => {
  it("captures success", () => {
    const r = tryCatch(() => 42);
    expect(unwrap(r)).toBe(42);
  });
  it("captures error", () => {
    const r = tryCatch(() => { throw new Error("boom"); });
    expect(isErr(r)).toBe(true);
  });
});

describe("collect", () => {
  it("collects all ok", () => {
    const r = collect([ok(1), ok(2), ok(3)]);
    expect(unwrap(r)).toEqual([1, 2, 3]);
  });
  it("returns first err", () => {
    const r = collect([ok(1), err("bad"), ok(3)]);
    expect(isErr(r)).toBe(true);
  });
});
