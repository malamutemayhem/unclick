import { describe, it, expect } from "vitest";
import { execute, stackToString } from "../forth-interpreter.js";

describe("Forth interpreter", () => {
  it("pushes numbers", () => {
    const s = execute("1 2 3");
    expect(s.stack).toEqual([1, 2, 3]);
  });

  it("performs arithmetic", () => {
    const s = execute("3 4 + 2 *");
    expect(s.stack).toEqual([14]);
  });

  it("handles subtraction and division", () => {
    expect(execute("10 3 -").stack).toEqual([7]);
    expect(execute("10 3 /").stack).toEqual([3]);
    expect(execute("10 3 mod").stack).toEqual([1]);
  });

  it("handles stack operations", () => {
    expect(execute("5 dup").stack).toEqual([5, 5]);
    expect(execute("1 2 swap").stack).toEqual([2, 1]);
    expect(execute("1 2 over").stack).toEqual([1, 2, 1]);
    expect(execute("1 2 3 rot").stack).toEqual([2, 3, 1]);
    expect(execute("1 2 drop").stack).toEqual([1]);
  });

  it("prints with dot", () => {
    const s = execute("42 .");
    expect(s.output).toContain("42");
    expect(s.stack).toEqual([]);
  });

  it("defines and calls words", () => {
    const s = execute(": square dup * ; 5 square");
    expect(s.stack).toEqual([25]);
  });

  it("handles if-then-else", () => {
    const t = execute("1 if 42 then");
    expect(t.stack).toEqual([42]);
    const f = execute("0 if 42 else 99 then");
    expect(f.stack).toEqual([99]);
  });

  it("handles do-loop", () => {
    const s = execute("0 5 0 do i + loop");
    expect(s.stack).toEqual([10]);
  });

  it("handles comparison", () => {
    expect(execute("3 5 <").stack).toEqual([-1]);
    expect(execute("5 3 <").stack).toEqual([0]);
    expect(execute("3 3 =").stack).toEqual([-1]);
  });

  it("handles negate and abs", () => {
    expect(execute("5 negate").stack).toEqual([-5]);
    expect(execute("-3 abs").stack).toEqual([3]);
  });

  it("handles depth", () => {
    expect(execute("1 2 3 depth").stack).toEqual([1, 2, 3, 3]);
  });

  it("halts on bye", () => {
    const s = execute("1 bye 2");
    expect(s.stack).toEqual([1]);
    expect(s.halted).toBe(true);
  });

  it("stackToString formats output", () => {
    const s = execute("1 2 3");
    expect(stackToString(s)).toBe("1 2 3");
  });
});
