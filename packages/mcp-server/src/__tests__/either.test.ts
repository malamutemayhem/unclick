import { describe, it, expect } from "vitest";
import { left, right, tryCatch, fromNullable, isLeft, isRight, sequence, Left, Right } from "../either.js";

describe("Either", () => {
  describe("Left", () => {
    it("isLeft returns true", () => {
      expect(left("err").isLeft()).toBe(true);
    });

    it("isRight returns false", () => {
      expect(left("err").isRight()).toBe(false);
    });

    it("map is no-op", () => {
      const e = left("err").map((x: number) => x * 2);
      expect(isLeft(e)).toBe(true);
    });

    it("flatMap is no-op", () => {
      const e = left("err").flatMap((x: number) => right(x * 2));
      expect(isLeft(e)).toBe(true);
    });

    it("mapLeft transforms error", () => {
      const e = left("err").mapLeft((l) => l.toUpperCase());
      expect((e as Left<string>).value).toBe("ERR");
    });

    it("fold calls onLeft", () => {
      expect(left("err").fold((l) => `got: ${l}`, () => "nope")).toBe("got: err");
    });

    it("getOrElse returns fallback", () => {
      expect(left("err").getOrElse(42)).toBe(42);
    });

    it("getOrThrow throws", () => {
      expect(() => left("err").getOrThrow()).toThrow();
    });

    it("toJSON", () => {
      expect(left("err").toJSON()).toEqual({ _tag: "Left", value: "err" });
    });
  });

  describe("Right", () => {
    it("isLeft returns false", () => {
      expect(right(42).isLeft()).toBe(false);
    });

    it("isRight returns true", () => {
      expect(right(42).isRight()).toBe(true);
    });

    it("map transforms value", () => {
      const e = right(5).map((x) => x * 2);
      expect((e as Right<number>).value).toBe(10);
    });

    it("flatMap chains", () => {
      const e = right(5).flatMap((x) => right(x + 1));
      expect((e as Right<number>).value).toBe(6);
    });

    it("fold calls onRight", () => {
      expect(right(42).fold(() => "nope", (r) => `got: ${r}`)).toBe("got: 42");
    });

    it("getOrElse returns value", () => {
      expect(right(42).getOrElse(0)).toBe(42);
    });

    it("getOrThrow returns value", () => {
      expect(right(42).getOrThrow()).toBe(42);
    });

    it("toJSON", () => {
      expect(right(42).toJSON()).toEqual({ _tag: "Right", value: 42 });
    });
  });

  describe("tryCatch", () => {
    it("wraps success in Right", () => {
      const e = tryCatch(() => 42);
      expect(isRight(e)).toBe(true);
      expect((e as Right<number>).value).toBe(42);
    });

    it("wraps thrown Error in Left", () => {
      const e = tryCatch(() => { throw new Error("boom"); });
      expect(isLeft(e)).toBe(true);
      expect((e as Left<Error>).value.message).toBe("boom");
    });

    it("wraps non-Error in Left", () => {
      const e = tryCatch(() => { throw "oops"; });
      expect(isLeft(e)).toBe(true);
    });
  });

  describe("fromNullable", () => {
    it("returns Right for value", () => {
      expect(isRight(fromNullable(5))).toBe(true);
    });

    it("returns Left for null", () => {
      expect(isLeft(fromNullable(null))).toBe(true);
    });

    it("returns Left for undefined", () => {
      expect(isLeft(fromNullable(undefined))).toBe(true);
    });
  });

  describe("sequence", () => {
    it("collects all Rights", () => {
      const result = sequence([right(1), right(2), right(3)]);
      expect(isRight(result)).toBe(true);
      expect((result as Right<number[]>).value).toEqual([1, 2, 3]);
    });

    it("returns first Left", () => {
      const result = sequence([right(1), left("fail"), right(3)]);
      expect(isLeft(result)).toBe(true);
      expect((result as Left<string>).value).toBe("fail");
    });
  });
});
