import { describe, it, expect } from "vitest";
import {
  Action, Condition, Sequence, Selector, Inverter,
  Repeater, Succeeder, BehaviorTree,
} from "../behavior-tree.js";

describe("behavior-tree", () => {
  it("Action returns its result", () => {
    const action = new Action(() => "success");
    expect(action.tick(new Map())).toBe("success");
  });

  it("Condition returns success/failure", () => {
    const cond = new Condition((bb) => bb.get("ready") === true);
    const bb = new Map<string, unknown>();
    expect(cond.tick(bb)).toBe("failure");
    bb.set("ready", true);
    expect(cond.tick(bb)).toBe("success");
  });

  it("Sequence succeeds when all children succeed", () => {
    const seq = new Sequence([
      new Action(() => "success"),
      new Action(() => "success"),
    ]);
    expect(seq.tick(new Map())).toBe("success");
  });

  it("Sequence fails on first failure", () => {
    const log: string[] = [];
    const seq = new Sequence([
      new Action(() => { log.push("a"); return "success"; }),
      new Action(() => { log.push("b"); return "failure"; }),
      new Action(() => { log.push("c"); return "success"; }),
    ]);
    expect(seq.tick(new Map())).toBe("failure");
    expect(log).toEqual(["a", "b"]);
  });

  it("Selector succeeds on first success", () => {
    const sel = new Selector([
      new Action(() => "failure"),
      new Action(() => "success"),
      new Action(() => "failure"),
    ]);
    expect(sel.tick(new Map())).toBe("success");
  });

  it("Selector fails when all fail", () => {
    const sel = new Selector([
      new Action(() => "failure"),
      new Action(() => "failure"),
    ]);
    expect(sel.tick(new Map())).toBe("failure");
  });

  it("Inverter flips success/failure", () => {
    const inv = new Inverter(new Action(() => "success"));
    expect(inv.tick(new Map())).toBe("failure");

    const inv2 = new Inverter(new Action(() => "failure"));
    expect(inv2.tick(new Map())).toBe("success");
  });

  it("Inverter passes running through", () => {
    const inv = new Inverter(new Action(() => "running"));
    expect(inv.tick(new Map())).toBe("running");
  });

  it("Repeater repeats N times", () => {
    let count = 0;
    const rep = new Repeater(new Action(() => { count++; return "success"; }), 3);
    expect(rep.tick(new Map())).toBe("success");
    expect(count).toBe(3);
  });

  it("Succeeder converts failure to success", () => {
    const s = new Succeeder(new Action(() => "failure"));
    expect(s.tick(new Map())).toBe("success");
  });

  it("BehaviorTree wraps root", () => {
    const tree = new BehaviorTree(
      new Sequence([
        new Condition(() => true),
        new Action(() => "success"),
      ]),
    );
    expect(tree.tick(new Map())).toBe("success");
  });

  it("reset clears running state", () => {
    let calls = 0;
    const seq = new Sequence([
      new Action(() => { calls++; return "success"; }),
      new Action(() => "running"),
    ]);
    expect(seq.tick(new Map())).toBe("running");
    seq.reset();
    calls = 0;
    expect(seq.tick(new Map())).toBe("running");
    expect(calls).toBe(1);
  });
});
