import { describe, it, expect } from "vitest";
import {
  pure, bind, map, run, callCC, sequence,
  cpsPure, cpsBind, cpsMap, cpsAll, cpsRace,
  trampoline, thunk,
} from "../continuation-passing.js";

describe("Cont monad", () => {
  it("pure wraps value", () => {
    expect(run(pure(42))).toBe(42);
  });

  it("bind chains computations", () => {
    const result = run(bind(pure(5), (x) => pure(x * 2)));
    expect(result).toBe(10);
  });

  it("map transforms value", () => {
    const result = run(map(pure(3), (x) => x + 1));
    expect(result).toBe(4);
  });

  it("multiple binds", () => {
    const result = run(
      bind(pure(1), (a) =>
        bind(pure(2), (b) =>
          pure(a + b)
        )
      )
    );
    expect(result).toBe(3);
  });

  it("callCC enables early exit", () => {
    const result = run(
      callCC<number, number>((exit) =>
        bind(pure(10), (x) => {
          if (x > 5) return exit(99);
          return pure(x);
        })
      )
    );
    expect(result).toBe(99);
  });

  it("callCC without exit continues normally", () => {
    const result = run(
      callCC<number, number>((_exit) => pure(42))
    );
    expect(result).toBe(42);
  });

  it("sequence collects results", () => {
    const result = run(sequence([pure(1), pure(2), pure(3)]));
    expect(result).toEqual([1, 2, 3]);
  });
});

describe("CPS utilities", () => {
  it("cpsPure delivers value", () => {
    let result: number | undefined;
    cpsPure(42)((v) => { result = v; });
    expect(result).toBe(42);
  });

  it("cpsBind chains", () => {
    let result: number | undefined;
    cpsBind(cpsPure(5), (x) => cpsPure(x * 3))((v) => { result = v; });
    expect(result).toBe(15);
  });

  it("cpsMap transforms", () => {
    let result: string | undefined;
    cpsMap(cpsPure(42), (x) => `val:${x}`)((v) => { result = v; });
    expect(result).toBe("val:42");
  });

  it("cpsAll collects all results", () => {
    let result: number[] | undefined;
    cpsAll([cpsPure(1), cpsPure(2), cpsPure(3)])((v) => { result = v; });
    expect(result).toEqual([1, 2, 3]);
  });

  it("cpsAll handles empty", () => {
    let result: number[] | undefined;
    cpsAll<number>([])((v) => { result = v; });
    expect(result).toEqual([]);
  });

  it("cpsRace returns first", () => {
    let result: number | undefined;
    cpsRace([cpsPure(1), cpsPure(2)])((v) => { result = v; });
    expect(result).toBe(1);
  });
});

describe("trampoline", () => {
  it("evaluates direct value", () => {
    expect(trampoline(() => 42)).toBe(42);
  });

  it("bounces thunks", () => {
    let count = 0;
    const result = trampoline(() => {
      count++;
      if (count < 5) return () => count * 10;
      return count * 10;
    });
    expect(typeof result).toBe("number");
  });
});

describe("thunk", () => {
  it("lazy evaluation", () => {
    let calls = 0;
    const lazy = thunk(() => { calls++; return 42; });
    expect(calls).toBe(0);
    expect(lazy()).toBe(42);
    expect(calls).toBe(1);
  });

  it("caches result", () => {
    let calls = 0;
    const lazy = thunk(() => { calls++; return "hello"; });
    lazy();
    lazy();
    lazy();
    expect(calls).toBe(1);
  });
});
