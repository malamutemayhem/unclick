import { describe, it, expect } from "vitest";
import {
  pureFree, liftF, bindFree, mapFree, interpret,
  print, readLine, kvGet, kvPut, kvDelete, kvInterpreter,
  ConsoleOp, KVOp,
} from "../free-monad.js";

describe("Free monad basics", () => {
  it("pureFree wraps value", () => {
    const program = pureFree<never, number>(42);
    expect(program.kind).toBe("pure");
    if (program.kind === "pure") expect(program.value).toBe(42);
  });

  it("liftF creates suspend", () => {
    const program = liftF({ tag: "test" });
    expect(program.kind).toBe("suspend");
  });

  it("bindFree chains computations", () => {
    const program = bindFree(pureFree<string, number>(5), (x) =>
      pureFree(x * 2)
    );
    expect(interpret(program, () => null)).toBe(10);
  });

  it("mapFree transforms result", () => {
    const program = mapFree(pureFree<string, number>(3), (x) => x + 1);
    expect(interpret(program, () => null)).toBe(4);
  });

  it("interpret runs pure program", () => {
    expect(interpret(pureFree(42), () => null)).toBe(42);
  });
});

describe("Console DSL", () => {
  it("print creates suspend", () => {
    const program = print("hello");
    expect(program.kind).toBe("suspend");
  });

  it("readLine creates suspend", () => {
    const program = readLine(">");
    expect(program.kind).toBe("suspend");
  });

  it("interpret console program", () => {
    const output: string[] = [];
    const program = bindFree(print("hello"), () =>
      bindFree(readLine("> "), (input) =>
        bindFree(print(`Got: ${input}`), () =>
          pureFree<ConsoleOp, string>(input as string)
        )
      )
    );
    const result = interpret(program, (op) => {
      if (op.tag === "print") { output.push(op.message); return undefined; }
      if (op.tag === "readLine") return "world";
      return undefined;
    });
    expect(result).toBe("world");
    expect(output).toEqual(["hello", "Got: world"]);
  });
});

describe("KV DSL", () => {
  it("kvPut and kvGet", () => {
    const { interpreter, store } = kvInterpreter();
    const program = bindFree(kvPut("key", 42), () => kvGet("key"));
    const result = interpret(program, interpreter);
    expect(result).toBe(42);
    expect(store.get("key")).toBe(42);
  });

  it("kvDelete removes key", () => {
    const { interpreter, store } = kvInterpreter();
    const program = bindFree(
      kvPut("x", 1), () =>
      bindFree(kvDelete("x"), () =>
        kvGet("x")
      )
    );
    const result = interpret(program, interpreter);
    expect(result).toBeUndefined();
  });

  it("multiple operations", () => {
    const { interpreter } = kvInterpreter();
    const program = bindFree(
      kvPut("a", 10), () =>
      bindFree(kvPut("b", 20), () =>
        bindFree(kvGet("a"), (a) =>
          bindFree(kvGet("b"), (b) =>
            pureFree<KVOp, number>((a as number) + (b as number))
          )
        )
      )
    );
    expect(interpret(program, interpreter)).toBe(30);
  });

  it("different interpreters isolate state", () => {
    const { interpreter: i1, store: s1 } = kvInterpreter();
    const { interpreter: i2, store: s2 } = kvInterpreter();
    const program = bindFree(kvPut("x", 42), () => kvGet("x"));
    interpret(program, i1);
    const result2 = interpret(program, i2);
    expect(s1.get("x")).toBe(42);
    expect(s2.get("x")).toBe(42);
    expect(result2).toBe(42);
  });
});
