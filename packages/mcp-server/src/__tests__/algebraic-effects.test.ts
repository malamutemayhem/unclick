import { describe, it, expect } from "vitest";
import {
  pure, perform, bind, map, handle, run, sequence,
  effect, EffectRegistry,
} from "../algebraic-effects.js";

describe("Eff basics", () => {
  it("pure returns value", () => {
    expect(run(pure(42))).toBe(42);
  });

  it("map transforms pure", () => {
    expect(run(map(pure(5), (x) => x * 2))).toBe(10);
  });

  it("bind chains pure", () => {
    const result = run(bind(pure(3), (x) => pure(x + 1)));
    expect(result).toBe(4);
  });

  it("perform creates impure effect", () => {
    const eff = perform(effect("log", "hello"));
    expect(eff.kind).toBe("impure");
  });

  it("run throws on unhandled effect", () => {
    expect(() => run(perform(effect("boom", null)))).toThrow("Unhandled");
  });
});

describe("handle", () => {
  it("handles effects with resume", () => {
    const program = bind(
      perform(effect("ask", "name")),
      (name) => pure(`Hello ${name}`)
    );
    const result = handle(program, {
      ask: (_payload, resume) => resume("World"),
    });
    expect(result).toBe("Hello World");
  });

  it("handles return value", () => {
    const result = handle(pure(42), {}, (v) => (v as number) * 2);
    expect(result).toBe(84);
  });

  it("handles multiple effects", () => {
    const program = bind(
      perform(effect("get", "x")),
      (x) => bind(
        perform(effect("get", "y")),
        (y) => pure((x as number) + (y as number))
      )
    );
    const state = new Map([["x", 10], ["y", 20]]);
    const result = handle(program, {
      get: (key, resume) => resume(state.get(key as string)),
    });
    expect(result).toBe(30);
  });

  it("throws on unhandled effect in handler", () => {
    const program = perform(effect("missing", null));
    expect(() => handle(program, {})).toThrow("Unhandled effect: missing");
  });

  it("state effect pattern", () => {
    let state = 0;
    const inc = perform(effect("inc", 1));
    const program = bind(inc, () => bind(inc, () => perform(effect("get", null))));
    const result = handle(program, {
      inc: (amount, resume) => { state += amount as number; return resume(undefined); },
      get: (_payload, resume) => resume(state),
    });
    expect(result).toBe(2);
  });
});

describe("sequence", () => {
  it("sequences pure effects", () => {
    const result = run(sequence([pure(1), pure(2), pure(3)]));
    expect(result).toEqual([1, 2, 3]);
  });

  it("sequences empty list", () => {
    expect(run(sequence([]))).toEqual([]);
  });
});

describe("EffectRegistry", () => {
  it("registers and interprets", () => {
    const reg = new EffectRegistry();
    reg.register("double", (payload) => (payload as number) * 2);
    const program = bind(
      perform(effect("double", 5)),
      (v) => pure(v)
    );
    expect(reg.interpret(program)).toBe(10);
  });

  it("throws on missing handler", () => {
    const reg = new EffectRegistry();
    expect(() => reg.interpret(perform(effect("x", null)))).toThrow("Unhandled");
  });

  it("has checks registration", () => {
    const reg = new EffectRegistry();
    expect(reg.has("x")).toBe(false);
    reg.register("x", () => {});
    expect(reg.has("x")).toBe(true);
  });

  it("tags lists registered effects", () => {
    const reg = new EffectRegistry();
    reg.register("a", () => {});
    reg.register("b", () => {});
    expect(reg.tags).toContain("a");
    expect(reg.tags).toContain("b");
  });

  it("unregister removes handler", () => {
    const reg = new EffectRegistry();
    reg.register("x", () => {});
    reg.unregister("x");
    expect(reg.has("x")).toBe(false);
  });
});
