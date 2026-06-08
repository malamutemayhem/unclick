import { describe, it, expect } from "vitest";
import {
  ok, err, fromThrowable, fromPromise,
  unwrap, unwrapOr, map, mapError, flatMap,
  collect, partition,
} from "../result.js";

describe("ok / err", () => {
  it("ok wraps a value", () => {
    const r = ok(42);
    expect(r.ok).toBe(true);
    expect(r.ok && r.value).toBe(42);
  });

  it("err wraps an error", () => {
    const r = err("bad");
    expect(r.ok).toBe(false);
    expect(!r.ok && r.error).toBe("bad");
  });
});

describe("fromThrowable", () => {
  it("returns ok for non-throwing function", () => {
    const r = fromThrowable(() => 42);
    expect(r.ok).toBe(true);
    expect(r.ok && r.value).toBe(42);
  });

  it("returns err for throwing function", () => {
    const r = fromThrowable(() => { throw new Error("boom"); });
    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.message).toBe("boom");
  });

  it("wraps non-Error throws", () => {
    const r = fromThrowable(() => { throw "string error"; });
    expect(r.ok).toBe(false);
    expect(!r.ok && r.error.message).toBe("string error");
  });
});

describe("fromPromise", () => {
  it("returns ok for resolved promise", async () => {
    const r = await fromPromise(Promise.resolve(42));
    expect(r.ok).toBe(true);
  });

  it("returns err for rejected promise", async () => {
    const r = await fromPromise(Promise.reject(new Error("nope")));
    expect(r.ok).toBe(false);
  });
});

describe("unwrap / unwrapOr", () => {
  it("unwrap returns value for ok", () => {
    expect(unwrap(ok(42))).toBe(42);
  });

  it("unwrap throws for err", () => {
    expect(() => unwrap(err(new Error("nope")))).toThrow("nope");
  });

  it("unwrapOr returns value for ok", () => {
    expect(unwrapOr(ok(42), 0)).toBe(42);
  });

  it("unwrapOr returns fallback for err", () => {
    expect(unwrapOr(err("bad"), 99)).toBe(99);
  });
});

describe("map / mapError / flatMap", () => {
  it("map transforms ok value", () => {
    const r = map(ok(5), (v) => v * 2);
    expect(r.ok && r.value).toBe(10);
  });

  it("map passes through err", () => {
    const r = map(err("bad"), (v: number) => v * 2);
    expect(r.ok).toBe(false);
  });

  it("mapError transforms error", () => {
    const r = mapError(err("bad"), (e) => `wrapped: ${e}`);
    expect(!r.ok && r.error).toBe("wrapped: bad");
  });

  it("mapError passes through ok", () => {
    const r = mapError(ok(42), (e: string) => `wrapped: ${e}`);
    expect(r.ok && r.value).toBe(42);
  });

  it("flatMap chains results", () => {
    const r = flatMap(ok(5), (v) => v > 0 ? ok(v * 2) : err("negative"));
    expect(r.ok && r.value).toBe(10);
  });

  it("flatMap short-circuits on err", () => {
    const r = flatMap(err("bad" as string), (v: number) => ok(v * 2));
    expect(r.ok).toBe(false);
  });
});

describe("collect", () => {
  it("collects all ok results", () => {
    const r = collect([ok(1), ok(2), ok(3)]);
    expect(r.ok && r.value).toEqual([1, 2, 3]);
  });

  it("returns first err", () => {
    const r = collect([ok(1), err("bad"), ok(3)]);
    expect(r.ok).toBe(false);
    expect(!r.ok && r.error).toBe("bad");
  });
});

describe("partition", () => {
  it("separates successes and errors", () => {
    const { successes, errors } = partition([ok(1), err("a"), ok(2), err("b")]);
    expect(successes).toEqual([1, 2]);
    expect(errors).toEqual(["a", "b"]);
  });
});
