import { describe, it, expect } from "vitest";
import { ok, err, Ok, Err, tryCatch, tryCatchAsync, fromNullable, collect } from "../result.js";

describe("Result", () => {
  describe("Ok", () => {
    it("ok is true", () => { expect(ok(42).ok).toBe(true); });
    it("value holds the value", () => { expect(ok(42).value).toBe(42); });
    it("isOk returns true", () => { expect(ok(1).isOk()).toBe(true); });
    it("isErr returns false", () => { expect(ok(1).isErr()).toBe(false); });
    it("unwrap returns value", () => { expect(ok(10).unwrap()).toBe(10); });
    it("unwrapOr returns value", () => { expect(ok(10).unwrapOr(0)).toBe(10); });
    it("unwrapErr throws", () => { expect(() => ok(1).unwrapErr()).toThrow(); });
    it("map transforms value", () => { expect(ok(2).map((x) => x * 3).unwrap()).toBe(6); });
    it("mapErr is no-op", () => { expect(ok(2).mapErr(() => "x").unwrap()).toBe(2); });
    it("flatMap chains", () => { expect(ok(2).flatMap((x) => ok(x + 1)).unwrap()).toBe(3); });
    it("match calls ok handler", () => {
      expect(ok(5).match({ ok: (v) => v * 2, err: () => 0 })).toBe(10);
    });
  });

  describe("Err", () => {
    it("ok is false", () => { expect(err("fail").ok).toBe(false); });
    it("error holds the error", () => { expect(err("fail").error).toBe("fail"); });
    it("isOk returns false", () => { expect(err("x").isOk()).toBe(false); });
    it("isErr returns true", () => { expect(err("x").isErr()).toBe(true); });
    it("unwrap throws", () => { expect(() => err(new Error("boom")).unwrap()).toThrow("boom"); });
    it("unwrap wraps non-Error", () => { expect(() => err("str").unwrap()).toThrow("str"); });
    it("unwrapOr returns fallback", () => { expect(err("x").unwrapOr(42)).toBe(42); });
    it("unwrapErr returns error", () => { expect(err("x").unwrapErr()).toBe("x"); });
    it("map is no-op", () => { expect(err("x").map(() => 1).isErr()).toBe(true); });
    it("mapErr transforms error", () => { expect(err("x").mapErr((e) => e + "!").unwrapErr()).toBe("x!"); });
    it("flatMap is no-op", () => { expect(err("x").flatMap(() => ok(1)).isErr()).toBe(true); });
    it("match calls err handler", () => {
      expect(err("bad").match({ ok: () => "nope", err: (e) => e })).toBe("bad");
    });
  });

  describe("tryCatch", () => {
    it("returns Ok for success", () => {
      expect(tryCatch(() => 42).unwrap()).toBe(42);
    });
    it("returns Err for throw", () => {
      const r = tryCatch(() => { throw new Error("boom"); });
      expect(r.isErr()).toBe(true);
    });
  });

  describe("tryCatchAsync", () => {
    it("returns Ok for resolved promise", async () => {
      const r = await tryCatchAsync(async () => 42);
      expect(r.unwrap()).toBe(42);
    });
    it("returns Err for rejected promise", async () => {
      const r = await tryCatchAsync(async () => { throw new Error("async fail"); });
      expect(r.isErr()).toBe(true);
    });
  });

  describe("fromNullable", () => {
    it("returns Ok for value", () => { expect(fromNullable(42).unwrap()).toBe(42); });
    it("returns Err for null", () => { expect(fromNullable(null).isErr()).toBe(true); });
    it("returns Err for undefined", () => { expect(fromNullable(undefined).isErr()).toBe(true); });
    it("uses custom error message", () => {
      expect(fromNullable(null, "gone").isErr()).toBe(true);
    });
  });

  describe("collect", () => {
    it("collects all Ok values", () => {
      expect(collect([ok(1), ok(2), ok(3)]).unwrap()).toEqual([1, 2, 3]);
    });
    it("returns first Err", () => {
      const r = collect([ok(1), err("fail"), ok(3)]);
      expect(r.isErr()).toBe(true);
    });
    it("returns Ok for empty array", () => {
      expect(collect([]).unwrap()).toEqual([]);
    });
  });
});
