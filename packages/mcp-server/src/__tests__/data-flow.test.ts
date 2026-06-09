import { describe, it, expect } from "vitest";
import {
  reachingDefinitions,
  livenessAnalysis,
  availableExpressions,
  useDefChain,
  DataFlowBlock,
} from "../data-flow.js";

function makeBlock(
  id: number,
  defs: string[],
  uses: string[],
  successors: number[],
  predecessors: number[]
): DataFlowBlock {
  return { id, defs: new Set(defs), uses: new Set(uses), successors, predecessors };
}

describe("reachingDefinitions", () => {
  it("propagates defs forward", () => {
    const blocks = [
      makeBlock(0, ["x"], [], [1], []),
      makeBlock(1, [], ["x"], [], [0]),
    ];
    const result = reachingDefinitions(blocks);
    expect(result.out.get(0)!.has("x@0")).toBe(true);
    expect(result.in.get(1)!.has("x@0")).toBe(true);
  });

  it("kills redefinitions", () => {
    const blocks = [
      makeBlock(0, ["x"], [], [1], []),
      makeBlock(1, ["x"], [], [], [0]),
    ];
    const result = reachingDefinitions(blocks);
    expect(result.out.get(1)!.has("x@1")).toBe(true);
    expect(result.out.get(1)!.has("x@0")).toBe(false);
  });

  it("merges at join points", () => {
    const blocks = [
      makeBlock(0, ["x"], [], [1, 2], []),
      makeBlock(1, ["y"], [], [3], [0]),
      makeBlock(2, ["z"], [], [3], [0]),
      makeBlock(3, [], [], [], [1, 2]),
    ];
    const result = reachingDefinitions(blocks);
    const inSet = result.in.get(3)!;
    expect(inSet.has("y@1")).toBe(true);
    expect(inSet.has("z@2")).toBe(true);
  });
});

describe("livenessAnalysis", () => {
  it("variable live from use to def", () => {
    const blocks = [
      makeBlock(0, ["x"], [], [1], []),
      makeBlock(1, [], ["x"], [], [0]),
    ];
    const result = livenessAnalysis(blocks);
    expect(result.out.get(0)!.has("x")).toBe(true);
    expect(result.in.get(1)!.has("x")).toBe(true);
  });

  it("variable dead after last use", () => {
    const blocks = [
      makeBlock(0, ["x"], [], [1], []),
      makeBlock(1, [], ["x"], [2], [0]),
      makeBlock(2, [], [], [], [1]),
    ];
    const result = livenessAnalysis(blocks);
    expect(result.out.get(1)!.has("x")).toBe(false);
  });

  it("def kills liveness", () => {
    const blocks = [
      makeBlock(0, ["x"], [], [1], []),
      makeBlock(1, ["x"], [], [2], [0]),
      makeBlock(2, [], ["x"], [], [1]),
    ];
    const result = livenessAnalysis(blocks);
    expect(result.in.get(1)!.has("x")).toBe(false);
  });

  it("multiple variables tracked independently", () => {
    const blocks = [
      makeBlock(0, ["x", "y"], [], [1], []),
      makeBlock(1, [], ["x"], [2], [0]),
      makeBlock(2, [], ["y"], [], [1]),
    ];
    const result = livenessAnalysis(blocks);
    expect(result.out.get(0)!.has("x")).toBe(true);
    expect(result.out.get(0)!.has("y")).toBe(true);
  });
});

describe("availableExpressions", () => {
  it("expression available after gen", () => {
    const blocks = [
      { id: 0, gen: new Set(["a+b"]), kill: new Set<string>(), successors: [1], predecessors: [] },
      { id: 1, gen: new Set<string>(), kill: new Set<string>(), successors: [], predecessors: [0] },
    ];
    const result = availableExpressions(blocks);
    expect(result.in.get(1)!.has("a+b")).toBe(true);
  });

  it("kill removes expression", () => {
    const blocks = [
      { id: 0, gen: new Set(["a+b"]), kill: new Set<string>(), successors: [1], predecessors: [] },
      { id: 1, gen: new Set<string>(), kill: new Set(["a+b"]), successors: [2], predecessors: [0] },
      { id: 2, gen: new Set<string>(), kill: new Set<string>(), successors: [], predecessors: [1] },
    ];
    const result = availableExpressions(blocks);
    expect(result.out.get(1)!.has("a+b")).toBe(false);
  });

  it("intersection at join", () => {
    const blocks = [
      { id: 0, gen: new Set<string>(), kill: new Set<string>(), successors: [1, 2], predecessors: [] },
      { id: 1, gen: new Set(["a+b"]), kill: new Set<string>(), successors: [3], predecessors: [0] },
      { id: 2, gen: new Set<string>(), kill: new Set<string>(), successors: [3], predecessors: [0] },
      { id: 3, gen: new Set<string>(), kill: new Set<string>(), successors: [], predecessors: [1, 2] },
    ];
    const result = availableExpressions(blocks);
    expect(result.in.get(3)!.has("a+b")).toBe(false);
  });
});

describe("useDefChain", () => {
  it("builds chains", () => {
    const blocks = [
      makeBlock(0, ["x", "y"], [], [1], []),
      makeBlock(1, [], ["x", "y"], [2], [0]),
      makeBlock(2, ["x"], ["y"], [], [1]),
    ];
    const chains = useDefChain(blocks);
    expect(chains.get("x")!.defs).toEqual([0, 2]);
    expect(chains.get("x")!.uses).toEqual([1]);
    expect(chains.get("y")!.defs).toEqual([0]);
    expect(chains.get("y")!.uses).toEqual([1, 2]);
  });

  it("handles unused variable", () => {
    const blocks = [
      makeBlock(0, ["z"], [], [], []),
    ];
    const chains = useDefChain(blocks);
    expect(chains.get("z")!.defs).toEqual([0]);
    expect(chains.get("z")!.uses).toEqual([]);
  });
});
