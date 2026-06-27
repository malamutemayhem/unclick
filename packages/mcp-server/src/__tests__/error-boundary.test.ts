import { describe, it, expect } from "vitest";
import { tryCatch, tryCatchAsync, tryCatchWith, ignoreErrors, wrapSafe } from "../error-boundary.js";

describe("tryCatch", () => {
  it("returns result on success", () => {
    expect(tryCatch(() => 42, 0)).toBe(42);
  });

  it("returns fallback on error", () => {
    expect(tryCatch(() => { throw new Error(); }, "default")).toBe("default");
  });
});

describe("tryCatchAsync", () => {
  it("returns result on success", async () => {
    expect(await tryCatchAsync(async () => 42, 0)).toBe(42);
  });

  it("returns fallback on error", async () => {
    expect(await tryCatchAsync(async () => { throw new Error(); }, "default")).toBe("default");
  });
});

describe("tryCatchWith", () => {
  it("calls onError with the thrown error", () => {
    const result = tryCatchWith(
      () => { throw new Error("boom"); },
      (err) => (err as Error).message,
    );
    expect(result).toBe("boom");
  });
});

describe("ignoreErrors", () => {
  it("silently catches errors", () => {
    expect(() => ignoreErrors(() => { throw new Error(); })).not.toThrow();
  });
});

describe("wrapSafe", () => {
  it("wraps a function to return fallback on error", () => {
    const risky = (x: number) => {
      if (x === 0) throw new Error("zero");
      return 100 / x;
    };
    const safe = wrapSafe(risky, -1);
    expect(safe(10)).toBe(10);
    expect(safe(0)).toBe(-1);
  });
});
