import { describe, it, expect } from "vitest";
import { CFG, buildFromStatements } from "../control-flow-graph.js";

describe("CFG", () => {
  it("add blocks and edges", () => {
    const cfg = new CFG();
    const a = cfg.addBlock(["x = 1"], "entry");
    const b = cfg.addBlock(["y = 2"]);
    cfg.addEdge(a, b);
    expect(cfg.blockCount).toBe(2);
    expect(cfg.successors(a)).toEqual([b]);
    expect(cfg.predecessors(b)).toEqual([a]);
  });

  it("entry and getBlock", () => {
    const cfg = new CFG();
    const a = cfg.addBlock(["start"]);
    cfg.setEntry(a);
    expect(cfg.entry).toBe(a);
    expect(cfg.getBlock(a).statements).toEqual(["start"]);
  });

  it("no duplicate edges", () => {
    const cfg = new CFG();
    const a = cfg.addBlock([]);
    const b = cfg.addBlock([]);
    cfg.addEdge(a, b);
    cfg.addEdge(a, b);
    expect(cfg.successors(a)).toEqual([b]);
  });

  it("reverse post order", () => {
    const cfg = new CFG();
    const a = cfg.addBlock([], "A");
    const b = cfg.addBlock([], "B");
    const c = cfg.addBlock([], "C");
    cfg.addEdge(a, b);
    cfg.addEdge(a, c);
    cfg.addEdge(b, c);
    cfg.setEntry(a);
    const rpo = cfg.reversePostOrder();
    expect(rpo[0]).toBe(a);
    expect(rpo.indexOf(b)).toBeLessThan(rpo.indexOf(c));
  });

  it("reachable nodes", () => {
    const cfg = new CFG();
    const a = cfg.addBlock([]);
    const b = cfg.addBlock([]);
    const c = cfg.addBlock([]);
    cfg.addEdge(a, b);
    cfg.setEntry(a);
    const reach = cfg.reachable();
    expect(reach.has(a)).toBe(true);
    expect(reach.has(b)).toBe(true);
    expect(reach.has(c)).toBe(false);
  });

  it("detects back edges", () => {
    const cfg = new CFG();
    const a = cfg.addBlock([], "A");
    const b = cfg.addBlock([], "B");
    cfg.addEdge(a, b);
    cfg.addEdge(b, a);
    cfg.setEntry(a);
    expect(cfg.isBackEdge(b, a)).toBe(true);
    expect(cfg.isBackEdge(a, b)).toBe(false);
  });

  it("finds loops", () => {
    const cfg = new CFG();
    const a = cfg.addBlock([], "entry");
    const b = cfg.addBlock([], "header");
    const c = cfg.addBlock([], "body");
    const d = cfg.addBlock([], "exit");
    cfg.addEdge(a, b);
    cfg.addEdge(b, c);
    cfg.addEdge(c, b);
    cfg.addEdge(b, d);
    cfg.setEntry(a);
    const loops = cfg.loops();
    expect(loops).toHaveLength(1);
    expect(loops[0]).toContain(b);
    expect(loops[0]).toContain(c);
  });

  it("toDot output", () => {
    const cfg = new CFG();
    const a = cfg.addBlock(["x = 1"], "entry");
    const b = cfg.addBlock(["y = 2"]);
    cfg.addEdge(a, b);
    const dot = cfg.toDot("Test");
    expect(dot).toContain("digraph Test");
    expect(dot).toContain("entry");
    expect(dot).toContain(`${a} -> ${b}`);
  });
});

describe("buildFromStatements", () => {
  it("builds linear flow", () => {
    const cfg = buildFromStatements(["a = 1", "b = 2", "c = 3"]);
    expect(cfg.blockCount).toBe(1);
  });

  it("splits on labels", () => {
    const cfg = buildFromStatements([
      "a = 1",
      "label:loop",
      "b = 2",
      "label:end",
      "c = 3",
    ]);
    expect(cfg.blockCount).toBe(3);
  });

  it("goto creates edges", () => {
    const cfg = buildFromStatements([
      "a = 1",
      "goto loop",
      "label:loop",
      "b = 2",
    ]);
    expect(cfg.successors(0)).toContain(1);
  });

  it("if-then-else creates edges", () => {
    const cfg = buildFromStatements([
      "if x then yes else no",
      "label:yes",
      "a = 1",
      "label:no",
      "b = 2",
    ]);
    expect(cfg.successors(0)).toContain(1);
    expect(cfg.successors(0)).toContain(2);
  });

  it("handles empty input", () => {
    const cfg = buildFromStatements([]);
    expect(cfg.blockCount).toBe(1);
  });
});
